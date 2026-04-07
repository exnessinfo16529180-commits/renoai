"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore } from "@/lib/project-store";
import { DELIVERY_SLOTS } from "@/lib/project-mock";

export default function StepDelivery() {
  const { selectedDelivery, update, setStep } = useProjectStore();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleTimeSelect = (timeId: string) => {
    update({ selectedDelivery: timeId });
  };

  const selectedSlot = DELIVERY_SLOTS.find((s) => s.id === selectedDay);

  return (
    <StepWrapper
      title="Дата доставки"
      subtitle="Выберите удобное время для доставки материалов"
      cta={{
        label: "Продолжить",
        disabled: !selectedDelivery,
        onClick: () => setStep(10),
      }}
    >
      {/* Day selector */}
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 12,
            color: "#9BA8A3",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          День
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          {DELIVERY_SLOTS.map((slot, i) => {
            const active = selectedDay === slot.id;
            return (
              <motion.button
                key={slot.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setSelectedDay(slot.id);
                  // Reset time when day changes
                  if (selectedDelivery && !selectedDelivery.startsWith(slot.id)) {
                    update({ selectedDelivery: null });
                  }
                }}
                style={{
                  padding: "12px 8px",
                  borderRadius: 14,
                  border: active
                    ? "1.5px solid rgba(200,155,60,0.65)"
                    : "1px solid rgba(30,74,62,0.35)",
                  background: active ? "rgba(200,155,60,0.1)" : "rgba(13,36,32,0.5)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  WebkitTapHighlightColor: "transparent",
                  transition: "all 0.18s ease",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: active ? "#C89B3C" : "#9BA8A3",
                  }}
                >
                  {slot.dayLabel}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: active ? "#C89B3C" : "#9BA8A3",
                    opacity: 0.75,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {slot.date.split(",")[1]?.trim() ?? ""}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <AnimatePresence mode="wait">
        {selectedSlot && (
          <motion.div
            key={selectedSlot.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#9BA8A3",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Время
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {selectedSlot.times.map((time) => {
                const selected = selectedDelivery === time.id;
                return (
                  <motion.button
                    key={time.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => time.available && handleTimeSelect(time.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      borderRadius: 14,
                      border: selected
                        ? "1.5px solid rgba(200,155,60,0.65)"
                        : "1px solid rgba(30,74,62,0.35)",
                      background: selected
                        ? "rgba(200,155,60,0.08)"
                        : time.available
                        ? "rgba(13,36,32,0.5)"
                        : "rgba(8,16,14,0.4)",
                      cursor: time.available ? "pointer" : "not-allowed",
                      opacity: time.available ? 1 : 0.45,
                      transition: "all 0.18s ease",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke={selected ? "#C89B3C" : "#9BA8A3"} strokeWidth="1.2"/>
                        <path d="M8 4.5V8L10.5 10" stroke={selected ? "#C89B3C" : "#9BA8A3"} strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: selected ? 600 : 400,
                          color: selected ? "#F5F7F6" : time.available ? "#C8D4CF" : "#9BA8A3",
                        }}
                      >
                        {time.label}
                      </span>
                    </div>

                    {!time.available ? (
                      <span style={{ fontSize: 12, color: "#9BA8A3" }}>Занято</span>
                    ) : selected ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #C89B3C, #B8892C)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4.2 7.2L8 3" stroke="#081512" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    ) : (
                      <span style={{ fontSize: 12, color: "#9BA8A3" }}>Свободно</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedDay && (
        <p style={{ fontSize: 13, color: "#9BA8A3", textAlign: "center", marginTop: 16 }}>
          Выберите день, чтобы увидеть доступное время
        </p>
      )}
    </StepWrapper>
  );
}
