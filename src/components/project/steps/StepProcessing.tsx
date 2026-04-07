"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore, Tones, Budget } from "@/lib/project-store";

// ┌── AI_INTEGRATION_POINT ────────────────────────────────────────────────
// │ Replace ANALYSIS_STEPS mock delays with:
// │   POST /api/analyze-floorplan  { file }
// │   Returns: { rooms, area, layoutType, suggestions }
// └────────────────────────────────────────────────────────────────────────

const ANALYSIS_STEPS = [
  { label: "Читаем файл", duration: 1200 },
  { label: "Анализируем пространство", duration: 1800 },
  { label: "Определяем параметры", duration: 1400 },
];

const ATMOSPHERE_OPTIONS = [
  "Уютный и тёплый",
  "Строгий и деловой",
  "Лёгкий и воздушный",
  "Яркий и энергичный",
  "Спокойный и нейтральный",
  "Тёмный и глубокий",
];

const TONES: { id: Tones; label: string; desc: string; dot: string }[] = [
  { id: "warm", label: "Тёплые", desc: "Песок, терракота, дерево", dot: "#C8A87A" },
  { id: "neutral", label: "Нейтральные", desc: "Серый, бежевый, белый", dot: "#B0B0A8" },
  { id: "cool", label: "Холодные", desc: "Синий, серо-зелёный, сталь", dot: "#7A9AB0" },
];

const BUDGETS: { id: Budget; label: string; range: string }[] = [
  { id: "minimum", label: "Минимальный", range: "до 3 000 000 ₸" },
  { id: "medium", label: "Средний", range: "3 000 000 — 9 000 000 ₸" },
  { id: "premium", label: "Премиум", range: "от 9 000 000 ₸" },
];

export default function StepProcessing() {
  const { atmosphere, tones, budget, wishes, uploadedFile, update, setStep } = useProjectStore();

  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // ── Simulate file analysis running in background ──────────────────────
  useEffect(() => {
    if (!uploadedFile) {
      setAnalysisComplete(true);
      return;
    }

    let step = 0;
    const advance = () => {
      step++;
      if (step >= ANALYSIS_STEPS.length) {
        setAnalysisStep(ANALYSIS_STEPS.length);
        setAnalysisComplete(true);
        return;
      }
      setAnalysisStep(step);
      setTimeout(advance, ANALYSIS_STEPS[step].duration);
    };

    const timer = setTimeout(advance, ANALYSIS_STEPS[0].duration);
    return () => clearTimeout(timer);
  }, [uploadedFile]);

  const canContinue = atmosphere !== null && tones !== null && budget !== null;

  return (
    <StepWrapper
      title="Анализ и предпочтения"
      subtitle="Заполните опросник, пока мы анализируем ваш файл"
      cta={{
        label: analysisComplete ? "Перейти к выбору стиля" : "Анализируем...",
        disabled: !canContinue || !analysisComplete,
        onClick: () => setStep(5),
      }}
    >
      {/* Analysis ticker (only if file was uploaded) */}
      {uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            background: "rgba(13,36,32,0.6)",
            border: "1px solid rgba(30,74,62,0.4)",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: "#9BA8A3", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Обработка файла
            </span>
            <AnimatePresence mode="wait">
              {analysisComplete ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: 12, color: "#2D8F5A", fontWeight: 600 }}
                >
                  ✓ Готово
                </motion.span>
              ) : (
                <motion.span
                  key="running"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: 12, color: "#C89B3C" }}
                >
                  {ANALYSIS_STEPS[Math.min(analysisStep, ANALYSIS_STEPS.length - 1)]?.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 3,
              borderRadius: 2,
              background: "rgba(30,74,62,0.4)",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{
                width: analysisComplete
                  ? "100%"
                  : `${(analysisStep / ANALYSIS_STEPS.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                height: "100%",
                borderRadius: 2,
                background: analysisComplete
                  ? "linear-gradient(90deg, #2D8F5A, #45B070)"
                  : "linear-gradient(90deg, #C89B3C, #D4A84B)",
              }}
            />
          </div>

          {/* Step dots */}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {ANALYSIS_STEPS.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  opacity: i <= analysisStep ? 1 : 0.35,
                  transition: "opacity 0.3s",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background:
                      analysisComplete || i < analysisStep
                        ? "#2D8F5A"
                        : i === analysisStep
                        ? "#C89B3C"
                        : "rgba(30,74,62,0.4)",
                    transition: "background 0.3s",
                  }}
                />
                <span style={{ fontSize: 11, color: "#9BA8A3" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Questionnaire ────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Atmosphere */}
        <Section label="Атмосфера">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ATMOSPHERE_OPTIONS.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={atmosphere === opt}
                onSelect={() => update({ atmosphere: opt })}
              />
            ))}
          </div>
        </Section>

        {/* Tones */}
        <Section label="Цветовой тон">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => update({ tones: t.id })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border:
                    tones === t.id
                      ? "1.5px solid rgba(200,155,60,0.6)"
                      : "1px solid rgba(30,74,62,0.35)",
                  background: tones === t.id ? "rgba(200,155,60,0.07)" : "rgba(13,36,32,0.4)",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  transition: "all 0.18s ease",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: t.dot,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${t.dot}55`,
                  }}
                />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: tones === t.id ? "#F5F7F6" : "#C8D4CF" }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#9BA8A3" }}>{t.desc}</div>
                </div>
                {tones === t.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ marginLeft: "auto", color: "#C89B3C" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </Section>

        {/* Budget */}
        <Section label="Бюджет проекта">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {BUDGETS.map((b, i) => (
              <motion.button
                key={b.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => update({ budget: b.id })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border:
                    budget === b.id
                      ? "1.5px solid rgba(200,155,60,0.6)"
                      : "1px solid rgba(30,74,62,0.35)",
                  background: budget === b.id ? "rgba(200,155,60,0.08)" : "rgba(13,36,32,0.4)",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  transition: "all 0.18s ease",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: budget === b.id ? "#F5F7F6" : "#C8D4CF" }}>
                  {b.label}
                </span>
                <span style={{ fontSize: 13, color: budget === b.id ? "#C89B3C" : "#9BA8A3" }}>
                  {b.range}
                </span>
              </motion.button>
            ))}
          </div>
        </Section>

        {/* Wishes */}
        <Section label="Особые пожелания (необязательно)">
          <textarea
            value={wishes}
            onChange={(e) => update({ wishes: e.target.value })}
            placeholder="Хочу больше естественного света, нужно рабочее место, есть домашние животные..."
            rows={3}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid rgba(30,74,62,0.4)",
              background: "rgba(13,36,32,0.5)",
              color: "#F5F7F6",
              fontSize: 14,
              lineHeight: 1.5,
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </Section>
      </div>
    </StepWrapper>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
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
        {label}
      </p>
      {children}
    </div>
  );
}

function Chip({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      style={{
        padding: "8px 14px",
        borderRadius: 100,
        border: selected ? "1px solid rgba(200,155,60,0.65)" : "1px solid rgba(30,74,62,0.4)",
        background: selected ? "rgba(200,155,60,0.1)" : "rgba(13,36,32,0.5)",
        fontSize: 13,
        color: selected ? "#C89B3C" : "#9BA8A3",
        cursor: "pointer",
        fontWeight: selected ? 600 : 400,
        transition: "all 0.15s ease",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {label}
    </button>
  );
}
