"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/lib/project-store";
import { STYLES, TEAMS } from "@/lib/project-mock";

const BUDGET_LABELS: Record<string, string> = {
  minimum: "Эконом",
  medium:  "Стандарт",
  premium: "Премиум",
};

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export default function ProjectDashboard() {
  const [expanded, setExpanded] = useState(false);
  const {
    currentStep,
    selectedStyle,
    budget,
    estimate,
    progress,
    selectedContractor,
    setStep,
  } = useProjectStore();

  const styleName      = selectedStyle ? (STYLES.find((s) => s.id === selectedStyle)?.name ?? null) : null;
  const budgetName     = budget ? BUDGET_LABELS[budget] : null;
  const contractorName = selectedContractor ? (TEAMS.find((t) => t.id === selectedContractor)?.name ?? selectedContractor) : null;

  // Only show from step 2 onwards when there's something meaningful to display
  const hasData = styleName || budgetName || estimate || contractorName;
  if (currentStep < 2 || !hasData) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "rgba(8,21,18,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(30,74,62,0.5)",
      }}
    >
      {/* ── Expanded panel ───────────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "16px 20px 4px",
                maxWidth: 640,
                margin: "0 auto",
                boxSizing: "border-box",
              }}
            >
              {/* Metrics grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginBottom: estimate ? 12 : 4,
                }}
              >
                {estimate && (
                  <MetricCard
                    label="Смета"
                    value={`${estimate.currency} ${fmt(estimate.total)}`}
                    accent="#C89B3C"
                    action={
                      currentStep !== 5
                        ? { label: "Пересчитать", onClick: () => { setStep(5); setExpanded(false); } }
                        : undefined
                    }
                  />
                )}
                {styleName && (
                  <MetricCard
                    label="Стиль"
                    value={styleName}
                    action={
                      currentStep !== 2
                        ? { label: "Изменить", onClick: () => { setStep(2); setExpanded(false); } }
                        : undefined
                    }
                  />
                )}
                {budgetName && (
                  <MetricCard
                    label="Бюджет"
                    value={budgetName}
                    action={
                      currentStep !== 6
                        ? { label: "Изменить", onClick: () => { setStep(6); setExpanded(false); } }
                        : undefined
                    }
                  />
                )}
                {contractorName && (
                  <MetricCard
                    label="Подрядчик"
                    value={contractorName}
                    action={
                      currentStep !== 8
                        ? { label: "Изменить", onClick: () => { setStep(8); setExpanded(false); } }
                        : undefined
                    }
                  />
                )}
              </div>

              {/* Renovation progress bar (only when relevant) */}
              {progress > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9BA8A3",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Прогресс ремонта
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#C89B3C" }}>
                      {progress}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: "rgba(30,74,62,0.4)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        background: "linear-gradient(90deg, #C89B3C, #D4A84B)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Compact bar (always visible) ─────────────────────────────── */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 16px",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Свернуть панель" : "Развернуть панель проекта"}
          style={{
            width: "100%",
            height: 50,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {estimate && (
            <Chip
              icon="₸"
              label={`${fmt(Math.round(estimate.total / 1_000_000))}M`}
              accent
            />
          )}

          {styleName && <Chip icon="🎨" label={styleName} />}

          {contractorName && <Chip icon="🏗️" label={contractorName} />}

          {progress > 0 && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 8px",
                borderRadius: 20,
                background: "rgba(45,143,90,0.1)",
                border: "1px solid rgba(45,143,90,0.25)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 11, color: "#2D8F5A", fontWeight: 600 }}>
                {progress}%
              </span>
              <div
                style={{
                  width: 32,
                  height: 3,
                  borderRadius: 2,
                  background: "rgba(30,74,62,0.4)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    borderRadius: 2,
                    background: "#2D8F5A",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ flex: 1 }} />

          {/* Chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ flexShrink: 0, color: "#9BA8A3" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 10L8 6L12 10"
                stroke="#9BA8A3"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* iOS safe area */}
      <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
    </motion.div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Chip({
  icon,
  label,
  accent,
}: {
  icon: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 9px",
        borderRadius: 20,
        background: accent ? "rgba(200,155,60,0.1)" : "rgba(30,74,62,0.25)",
        border: `1px solid ${accent ? "rgba(200,155,60,0.3)" : "rgba(30,74,62,0.4)"}`,
        flexShrink: 0,
        maxWidth: 130,
        overflow: "hidden",
      }}
    >
      <span style={{ fontSize: 11 }}>{icon}</span>
      <span
        style={{
          fontSize: 12,
          fontWeight: accent ? 700 : 500,
          color: accent ? "#C89B3C" : "#C8D4CF",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
  action,
}: {
  label: string;
  value: string;
  accent?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div
      style={{
        padding: "12px 13px",
        borderRadius: 12,
        background: "rgba(13,36,32,0.9)",
        border: "1px solid rgba(30,74,62,0.4)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "#9BA8A3",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: accent ?? "#F5F7F6",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </div>
      {action && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            action.onClick();
          }}
          style={{
            marginTop: 6,
            fontSize: 11,
            color: "#C89B3C",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontWeight: 500,
            WebkitTapHighlightColor: "transparent",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M8 2.5A3.5 3.5 0 1 0 9 5.5"
              stroke="#C89B3C"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path d="M9 2L9 5L6 5" stroke="#C89B3C" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {action.label}
        </button>
      )}
    </div>
  );
}
