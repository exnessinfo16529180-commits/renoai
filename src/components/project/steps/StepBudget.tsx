"use client";

import { motion } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore, Budget } from "@/lib/project-store";

interface Tier {
  id: Budget;
  label: string;
  sublabel: string;
  range: string;
  features: string[];
  accent: string;
  bg: string;
  border: string;
}

const TIERS: Tier[] = [
  {
    id: "minimum",
    label: "Эконом",
    sublabel: "Функционально и практично",
    range: "от 3 500 000 ₸",
    features: ["Базовые материалы", "Типовые решения", "Стандартная отделка"],
    accent: "#9BA8A3",
    bg: "rgba(13,36,32,0.5)",
    border: "rgba(30,74,62,0.4)",
  },
  {
    id: "medium",
    label: "Стандарт",
    sublabel: "Оптимальное соотношение качества и цены",
    range: "от 8 500 000 ₸",
    features: ["Материалы среднего класса", "Индивидуальный подход", "Авторский надзор"],
    accent: "#C89B3C",
    bg: "rgba(200,155,60,0.07)",
    border: "rgba(200,155,60,0.35)",
  },
  {
    id: "premium",
    label: "Премиум",
    sublabel: "Элитные материалы и исполнение",
    range: "от 16 000 000 ₸",
    features: ["Премиальные материалы", "Полное сопровождение", "Гарантия 3 года"],
    accent: "#E8D5A3",
    bg: "rgba(232,213,163,0.05)",
    border: "rgba(232,213,163,0.3)",
  },
];

export default function StepBudget() {
  const { budget, update, setStep } = useProjectStore();

  return (
    <StepWrapper
      title="Бюджет проекта"
      subtitle="Выберите ценовой диапазон под ваши возможности"
      cta={{
        label: "Продолжить",
        disabled: !budget,
        onClick: () => {
          // Reset estimate so it gets recalculated with the new budget
          update({ estimate: null });
          setStep(7);
        },
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TIERS.map((tier, i) => {
          const selected = budget === tier.id;
          return (
            <motion.button
              key={tier.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              onClick={() => update({ budget: tier.id, estimate: null })}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 18px",
                borderRadius: 20,
                border: selected ? `1.5px solid ${tier.border}` : "1.5px solid rgba(30,74,62,0.3)",
                background: selected ? tier.bg : "rgba(13,36,32,0.4)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.22s ease",
                WebkitTapHighlightColor: "transparent",
                boxShadow: selected ? `0 8px 28px rgba(0,0,0,0.2)` : "none",
                position: "relative",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: selected ? tier.accent : "#C8D4CF", letterSpacing: "-0.01em" }}>
                    {tier.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#9BA8A3", marginTop: 2 }}>{tier.sublabel}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: selected ? tier.accent : "#9BA8A3" }}>
                    {tier.range}
                  </span>
                  {selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${tier.accent}, ${tier.accent}cc)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2 5.5L4.5 8L9 3" stroke="#081512" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                {tier.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      fontSize: 11,
                      padding: "3px 8px",
                      borderRadius: 100,
                      background: selected ? `${tier.accent}18` : "rgba(30,74,62,0.4)",
                      border: `1px solid ${selected ? `${tier.accent}40` : "rgba(30,74,62,0.3)"}`,
                      color: selected ? tier.accent : "#9BA8A3",
                      fontWeight: 500,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </StepWrapper>
  );
}
