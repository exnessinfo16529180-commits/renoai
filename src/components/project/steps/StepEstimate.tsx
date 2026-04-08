"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore, StyleId, Estimate } from "@/lib/project-store";

// Base cost in ₸ per sq.m. by style
const STYLE_BASE: Record<StyleId, number> = {
  modern:       280_000,
  scandinavian: 220_000,
  minimal:      190_000,
  loft:         250_000,
  neoclassic:   350_000,
  luxury:       500_000,
};

const DEFAULT_BASE = 250_000;
const DEFAULT_AREA = 45; // sq.m.

function buildEstimate(style: StyleId | null, budget: string | null): Estimate {
  const base = (style ? STYLE_BASE[style] : DEFAULT_BASE) * DEFAULT_AREA;
  const multiplier = budget === "minimum" ? 0.7 : budget === "premium" ? 1.5 : 1.0;
  const total = Math.round(base * multiplier);

  return {
    total,
    currency: "₸",
    breakdown: [
      { label: "Дизайн-проект",          amount: Math.round(total * 0.15) },
      { label: "Отделочные материалы",   amount: Math.round(total * 0.35) },
      { label: "Строительные работы",    amount: Math.round(total * 0.40) },
      { label: "Логистика и доставка",   amount: Math.round(total * 0.10) },
    ],
  };
}

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export default function StepEstimate() {
  const { selectedStyle, budget, estimate, update, setStep } = useProjectStore();

  // Generate estimate once on mount if not yet set
  useEffect(() => {
    if (!estimate) {
      update({ estimate: buildEstimate(selectedStyle, budget) });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const est = estimate ?? buildEstimate(selectedStyle, budget);

  return (
    <StepWrapper
      title="Предварительная смета"
      subtitle="Расчёт на основе вашего стиля и параметров помещения"
      cta={{
        label: "Перейти к бюджету",
        onClick: () => setStep(6),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Total card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: "22px 20px",
            borderRadius: 20,
            background: "rgba(200,155,60,0.08)",
            border: "1.5px solid rgba(200,155,60,0.3)",
          }}
        >
          <div style={{ fontSize: 12, color: "#9BA8A3", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Итоговая стоимость
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#C89B3C", letterSpacing: "-0.03em" }}>
            {est.currency} {fmt(est.total)}
          </div>
          <div style={{ fontSize: 12, color: "#9BA8A3", marginTop: 4 }}>
            ~{DEFAULT_AREA} м² · {fmt(Math.round(est.total / DEFAULT_AREA))} {est.currency}/м²
          </div>
        </motion.div>

        {/* Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {est.breakdown.map((item, i) => {
            const pct = Math.round((item.amount / est.total) * 100);
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: "rgba(13,36,32,0.6)",
                  border: "1px solid rgba(30,74,62,0.4)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: "#C8D4CF", fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#F5F7F6" }}>
                    {est.currency} {fmt(item.amount)}
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{ height: 3, borderRadius: 2, background: "rgba(30,74,62,0.5)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #C89B3C, #D4A84B)" }}
                  />
                </div>
                <div style={{ fontSize: 11, color: "#9BA8A3", marginTop: 4 }}>{pct}% от сметы</div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ fontSize: 12, color: "#9BA8A3", lineHeight: 1.5, margin: 0, textAlign: "center" }}
        >
          Смета предварительная. Точная стоимость определяется после выезда специалиста.
        </motion.p>
      </div>
    </StepWrapper>
  );
}
