"use client";

import { motion } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore } from "@/lib/project-store";
import { STORES } from "@/lib/project-mock";

function PriceDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          style={{
            fontSize: 13,
            color: n <= level ? "#C89B3C" : "rgba(155,168,163,0.3)",
          }}
        >
          ₽
        </span>
      ))}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path
            d="M5.5 1.5L6.6 4.3H9.6L7.1 6.1L8 9L5.5 7.3L3 9L3.9 6.1L1.4 4.3H4.4Z"
            fill={n <= full ? "#C89B3C" : "rgba(200,155,60,0.2)"}
          />
        </svg>
      ))}
      <span style={{ fontSize: 11, color: "#9BA8A3", marginLeft: 2 }}>{rating}</span>
    </span>
  );
}

// Budget tier → preferred price level(s)
const BUDGET_PRICE_MATCH: Record<string, number[]> = {
  minimum: [1],
  medium:  [1, 2],
  premium: [2, 3],
};

export default function StepMaterials() {
  const { selectedStore, budget, update, setStep } = useProjectStore();

  // Sort: matching stores first
  const matchLevels = budget ? (BUDGET_PRICE_MATCH[budget] ?? []) : [];
  const sortedStores = [...STORES].sort((a, b) => {
    const aMatch = matchLevels.includes(a.priceLevel) ? 0 : 1;
    const bMatch = matchLevels.includes(b.priceLevel) ? 0 : 1;
    return aMatch - bMatch;
  });

  return (
    <StepWrapper
      title="Магазины материалов"
      subtitle="Подобрали лучшие варианты под ваш проект и бюджет"
      cta={{
        label: "Продолжить",
        disabled: !selectedStore,
        onClick: () => setStep(8),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sortedStores.map((store, i) => {
          const selected = selectedStore === store.id;
          const budgetMatch = matchLevels.includes(store.priceLevel);
          return (
            <motion.button
              key={store.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: i * 0.08 }}
              onClick={() => update({ selectedStore: store.id })}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px 18px",
                borderRadius: 18,
                border: selected
                  ? "1.5px solid rgba(200,155,60,0.7)"
                  : "1.5px solid rgba(30,74,62,0.4)",
                background: selected ? "rgba(200,155,60,0.07)" : "rgba(13,36,32,0.5)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                WebkitTapHighlightColor: "transparent",
                position: "relative",
                boxShadow: selected ? "0 8px 24px rgba(200,155,60,0.1)" : "none",
              }}
            >
              {/* Budget-match badge or original badge */}
              {(budgetMatch || store.badge) && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 16,
                    padding: "3px 8px",
                    borderRadius: 100,
                    background: budgetMatch
                      ? (selected ? "rgba(45,143,90,0.2)" : "rgba(45,143,90,0.12)")
                      : (selected ? "rgba(200,155,60,0.2)" : "rgba(30,74,62,0.5)"),
                    border: `1px solid ${
                      budgetMatch
                        ? "rgba(45,143,90,0.4)"
                        : (selected ? "rgba(200,155,60,0.4)" : "rgba(30,74,62,0.4)")
                    }`,
                    fontSize: 10,
                    color: budgetMatch ? "#2D8F5A" : (selected ? "#C89B3C" : "#9BA8A3"),
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                  }}
                >
                  {budgetMatch ? "✓ Под ваш бюджет" : store.badge}
                </div>
              )}

              {/* Row 1: name + price level */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, paddingRight: store.badge ? 80 : 0 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: selected ? "#F5F7F6" : "#C8D4CF" }}>
                  {store.name}
                </span>
                <PriceDots level={store.priceLevel} />
              </div>

              {/* Row 2: tagline */}
              <p style={{ fontSize: 13, color: "#9BA8A3", margin: "0 0 10px", lineHeight: 1.4 }}>
                {store.tagline}
              </p>

              {/* Row 3: rating + estimate + delivery */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <Stars rating={store.rating} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: selected ? "#C89B3C" : "#9BA8A3",
                  }}
                >
                  {store.estimate}
                </span>
                <span style={{ fontSize: 12, color: "#9BA8A3", display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="3" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                    <path d="M4 2V4M8 2V4M1 6H11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  {store.deliveryDays}
                </span>
              </div>

              {/* Selected check */}
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: 16,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #C89B3C, #B8892C)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2 5.5L4.5 8L9 3" stroke="#081512" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </StepWrapper>
  );
}
