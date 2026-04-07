"use client";

import { motion } from "framer-motion";
import { useProjectStore } from "@/lib/project-store";
import { STYLES, CONCEPTS, STORES, TEAMS } from "@/lib/project-mock";

const ROOM_LABELS: Record<string, string> = {
  kitchen: "Кухня",
  bedroom: "Спальня",
  living: "Гостиная",
  bathroom: "Ванная",
  kids: "Детская",
  other: "Другое",
};
const BUDGET_LABELS: Record<string, string> = {
  minimum: "Минимальный",
  medium: "Средний",
  premium: "Премиум",
};
const TONES_LABELS: Record<string, string> = {
  warm: "Тёплые",
  neutral: "Нейтральные",
  cool: "Холодные",
};

export default function StepSummary() {
  const store = useProjectStore();
  const {
    projectType, scope, roomType, uploadedFile,
    atmosphere, tones, budget,
    selectedStyle, selectedConcept, selectedStore, selectedDelivery, selectedTeam,
    setStep,
  } = store;

  const style = STYLES.find((s) => s.id === selectedStyle);
  const concept = CONCEPTS.find((c) => c.id === selectedConcept);
  const storeData = STORES.find((s) => s.id === selectedStore);
  const team = TEAMS.find((t) => t.id === selectedTeam);

  const sections: { label: string; value: string; step: number; icon: string }[] = [
    {
      label: "Тип проекта",
      value: projectType === "new" ? "Новостройка" : "Готовая квартира",
      step: 1,
      icon: "🏠",
    },
    {
      label: "Объём работ",
      value:
        scope === "full"
          ? "Вся квартира"
          : roomType
          ? ROOM_LABELS[roomType] ?? roomType
          : "Одна комната",
      step: 2,
      icon: "📐",
    },
    {
      label: "Файл",
      value: uploadedFile ? uploadedFile.name : "Не загружен",
      step: 3,
      icon: "📁",
    },
    {
      label: "Атмосфера",
      value: atmosphere ?? "—",
      step: 4,
      icon: "✨",
    },
    {
      label: "Цвета / бюджет",
      value: `${tones ? TONES_LABELS[tones] : "—"} · ${budget ? BUDGET_LABELS[budget] : "—"}`,
      step: 4,
      icon: "🎨",
    },
    {
      label: "Стиль",
      value: style?.name ?? "—",
      step: 5,
      icon: "🏛",
    },
    {
      label: "Концепция",
      value: concept?.title ?? "—",
      step: 7,
      icon: "💡",
    },
    {
      label: "Магазин",
      value: storeData ? `${storeData.name} · ${storeData.estimate}` : "—",
      step: 8,
      icon: "🛍",
    },
    {
      label: "Доставка",
      value: selectedDelivery ?? "—",
      step: 9,
      icon: "🚚",
    },
    {
      label: "Команда",
      value: team ? `${team.name} · ${team.estimate}` : "—",
      step: 10,
      icon: "👷",
    },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
        padding: "28px 20px 32px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 24 }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#F5F7F6",
            margin: 0,
          }}
        >
          Итог проекта
        </h2>
        <p style={{ fontSize: 14, color: "#9BA8A3", margin: "8px 0 0", lineHeight: 1.5 }}>
          Проверьте все детали перед подготовкой договора
        </p>
      </motion.div>

      {/* Summary sections */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {sections.map((section, i) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.28 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 14,
              background: "rgba(13,36,32,0.5)",
              border: "1px solid rgba(30,74,62,0.3)",
            }}
          >
            <span style={{ fontSize: 18, flexShrink: 0, width: 24 }}>{section.icon}</span>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: 11, color: "#9BA8A3", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>
                {section.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: section.value === "—" ? "rgba(155,168,163,0.5)" : "#F5F7F6",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {section.value}
              </div>
            </div>
            {/* Edit button */}
            <button
              onClick={() => setStep(section.step)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                border: "1px solid rgba(30,74,62,0.4)",
                background: "rgba(30,74,62,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                WebkitTapHighlightColor: "transparent",
              }}
              title="Изменить"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M9 2.5L10.5 4L4.5 10H3V8.5L9 2.5Z"
                  stroke="#9BA8A3"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: 24 }}
      >
        <button
          onClick={() => setStep(12)}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 16,
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,
            background: "linear-gradient(135deg, #C89B3C 0%, #B8892C 100%)",
            color: "#081512",
            boxShadow: "0 6px 24px rgba(200,155,60,0.25)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Подготовить договор
        </button>
        <p
          style={{
            fontSize: 12,
            color: "#9BA8A3",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Бесплатно · Без обязательств
        </p>
      </motion.div>
    </div>
  );
}
