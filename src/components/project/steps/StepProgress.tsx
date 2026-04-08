"use client";

import { motion } from "framer-motion";
import { useProjectStore } from "@/lib/project-store";

interface Stage {
  label: string;
  detail: string;
  icon: string;
}

const STAGES: Stage[] = [
  { label: "Планирование",      detail: "Согласование проекта и документов",  icon: "📋" },
  { label: "Дизайн",            detail: "Утверждение финального дизайна",      icon: "✏️" },
  { label: "Закупка материалов",detail: "Заказ и доставка всех материалов",    icon: "📦" },
  { label: "Ремонтные работы",  detail: "Строительство и отделка помещений",   icon: "🔨" },
  { label: "Сдача объекта",     detail: "Финальная проверка и приёмка работ",  icon: "🏠" },
];

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export default function StepProgress() {
  const { progress, estimate, selectedStyle, selectedContractor, update } = useProjectStore();

  // Determine active stage index from progress (0–100)
  const stageIndex = progress === 100
    ? STAGES.length - 1
    : Math.floor((progress / 100) * STAGES.length);

  const handleSetProgress = (pct: number) => {
    update({ progress: pct });
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
        padding: "28px 20px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ marginBottom: 28 }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 100,
            background: "rgba(45,143,90,0.12)",
            border: "1px solid rgba(45,143,90,0.3)",
            marginBottom: 14,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#2D8F5A" }}
          />
          <span style={{ fontSize: 11, color: "#2D8F5A", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Проект запущен
          </span>
        </div>

        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#F5F7F6",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Прогресс ремонта
        </h2>
        <p style={{ fontSize: 14, color: "#9BA8A3", margin: "8px 0 0", lineHeight: 1.5 }}>
          Следите за ходом выполнения работ в режиме реального времени
        </p>
      </motion.div>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
          padding: "20px 18px",
          borderRadius: 20,
          background: "rgba(13,36,32,0.6)",
          border: "1.5px solid rgba(30,74,62,0.5)",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 14, color: "#9BA8A3" }}>Общий прогресс</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#C89B3C", letterSpacing: "-0.03em" }}>
            {progress}%
          </span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "rgba(30,74,62,0.5)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              height: "100%",
              borderRadius: 4,
              background: progress === 100
                ? "linear-gradient(90deg, #2D8F5A, #45B070)"
                : "linear-gradient(90deg, #C89B3C, #D4A84B)",
            }}
          />
        </div>

        {/* Quick progress buttons */}
        <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
          {[0, 20, 40, 60, 80, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => handleSetProgress(pct)}
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                border: `1px solid ${progress === pct ? "rgba(200,155,60,0.5)" : "rgba(30,74,62,0.4)"}`,
                background: progress === pct ? "rgba(200,155,60,0.12)" : "transparent",
                color: progress === pct ? "#C89B3C" : "#9BA8A3",
                fontSize: 12,
                fontWeight: progress === pct ? 700 : 400,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                transition: "all 0.18s ease",
              }}
            >
              {pct}%
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stage timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {STAGES.map((stage, i) => {
          const isDone = i < stageIndex || progress === 100;
          const isActive = i === stageIndex && progress < 100;
          const isPending = i > stageIndex && progress < 100;

          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
              style={{ display: "flex", gap: 14, position: "relative" }}
            >
              {/* Vertical line */}
              {i < STAGES.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 17,
                    top: 36,
                    bottom: -8,
                    width: 2,
                    background: isDone
                      ? "rgba(45,143,90,0.5)"
                      : "rgba(30,74,62,0.3)",
                    borderRadius: 1,
                    zIndex: 0,
                  }}
                />
              )}

              {/* Node */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isDone
                    ? "rgba(45,143,90,0.15)"
                    : isActive
                    ? "rgba(200,155,60,0.12)"
                    : "rgba(13,36,32,0.6)",
                  border: `2px solid ${
                    isDone
                      ? "rgba(45,143,90,0.5)"
                      : isActive
                      ? "rgba(200,155,60,0.5)"
                      : "rgba(30,74,62,0.3)"
                  }`,
                  zIndex: 1,
                  fontSize: 16,
                  transition: "all 0.3s ease",
                }}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#2D8F5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{ filter: isPending ? "grayscale(1) opacity(0.4)" : "none" }}>
                    {stage.icon}
                  </span>
                )}
              </div>

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  paddingBottom: i < STAGES.length - 1 ? 20 : 0,
                  paddingTop: 6,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                    color: isDone ? "#2D8F5A" : isActive ? "#F5F7F6" : "#9BA8A3",
                    marginBottom: 2,
                    transition: "color 0.2s",
                  }}
                >
                  {stage.label}
                </div>
                <div style={{ fontSize: 12, color: isPending ? "rgba(155,168,163,0.5)" : "#9BA8A3" }}>
                  {stage.detail}
                </div>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 6,
                      padding: "3px 8px",
                      borderRadius: 100,
                      background: "rgba(200,155,60,0.1)",
                      border: "1px solid rgba(200,155,60,0.25)",
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      style={{ width: 5, height: 5, borderRadius: "50%", background: "#C89B3C" }}
                    />
                    <span style={{ fontSize: 11, color: "#C89B3C", fontWeight: 600 }}>В процессе</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary info */}
      {(estimate || selectedContractor) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: 24,
            padding: "16px 18px",
            borderRadius: 16,
            background: "rgba(13,36,32,0.6)",
            border: "1px solid rgba(30,74,62,0.4)",
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {estimate && (
            <div>
              <div style={{ fontSize: 11, color: "#9BA8A3", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>
                Смета
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#C89B3C" }}>
                {estimate.currency} {fmt(estimate.total)}
              </div>
            </div>
          )}
          {selectedContractor && (
            <div>
              <div style={{ fontSize: 11, color: "#9BA8A3", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>
                Подрядчик
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#F5F7F6" }}>
                {selectedContractor}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
