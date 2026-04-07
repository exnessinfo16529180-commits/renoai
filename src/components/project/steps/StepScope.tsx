"use client";

import { motion, AnimatePresence } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore, Scope, RoomType } from "@/lib/project-store";

const SCOPE_OPTIONS: { id: Scope; title: string; sub: string }[] = [
  { id: "full", title: "Вся квартира", sub: "Комплексный ремонт всех помещений" },
  { id: "room", title: "Одна комната", sub: "Сосредоточимся на конкретном помещении" },
];

const ROOM_OPTIONS: { id: RoomType; label: string; icon: string }[] = [
  { id: "kitchen", label: "Кухня", icon: "🍳" },
  { id: "living", label: "Гостиная", icon: "🛋️" },
  { id: "bedroom", label: "Спальня", icon: "🛏" },
  { id: "bathroom", label: "Ванная", icon: "🚿" },
  { id: "kids", label: "Детская", icon: "🧸" },
  { id: "other", label: "Другое", icon: "📐" },
];

export default function StepScope() {
  const { scope, roomType, update, setStep } = useProjectStore();

  const canContinue = scope === "full" || (scope === "room" && roomType !== null);

  const handleScopeSelect = (id: Scope) => {
    update({ scope: id, roomType: id === "full" ? null : roomType });
  };

  const handleRoomSelect = (id: RoomType) => {
    update({ roomType: id });
  };

  return (
    <StepWrapper
      title="Объём работ"
      subtitle="Определим, что именно мы проектируем"
      cta={{
        label: "Продолжить",
        disabled: !canContinue,
        onClick: () => setStep(3),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SCOPE_OPTIONS.map((opt, i) => {
          const selected = scope === opt.id;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: i * 0.07 }}
              onClick={() => handleScopeSelect(opt.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 18px",
                borderRadius: 16,
                border: selected
                  ? "1.5px solid rgba(200,155,60,0.65)"
                  : "1.5px solid rgba(30,74,62,0.4)",
                background: selected ? "rgba(200,155,60,0.08)" : "rgba(13,36,32,0.5)",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                WebkitTapHighlightColor: "transparent",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: selected ? "none" : "1.5px solid rgba(30,74,62,0.6)",
                  background: selected ? "linear-gradient(135deg, #C89B3C, #B8892C)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {selected && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4.2 7.2L8 3" stroke="#081512" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: selected ? "#F5F7F6" : "#C8D4CF" }}>
                  {opt.title}
                </div>
                <div style={{ fontSize: 13, color: "#9BA8A3", marginTop: 2 }}>{opt.sub}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Room type grid */}
      <AnimatePresence>
        {scope === "room" && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 20 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: 13,
                color: "#9BA8A3",
                marginBottom: 12,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Тип помещения
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {ROOM_OPTIONS.map((room, i) => {
                const selected = roomType === room.id;
                return (
                  <motion.button
                    key={room.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.22, delay: i * 0.04 }}
                    onClick={() => handleRoomSelect(room.id)}
                    style={{
                      padding: "14px 8px",
                      borderRadius: 14,
                      border: selected
                        ? "1.5px solid rgba(200,155,60,0.65)"
                        : "1.5px solid rgba(30,74,62,0.35)",
                      background: selected ? "rgba(200,155,60,0.09)" : "rgba(13,36,32,0.5)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      WebkitTapHighlightColor: "transparent",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{room.icon}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: selected ? 600 : 400,
                        color: selected ? "#C89B3C" : "#9BA8A3",
                      }}
                    >
                      {room.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </StepWrapper>
  );
}
