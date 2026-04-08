"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/lib/project-store";

// ┌── AI_INTEGRATION_POINT ─────────────────────────────────────────────────
// │ Replace mock delays with:
// │   POST /api/generate-concepts  { style, preferences, fileId }
// │   Poll GET /api/jobs/:id until status === 'complete'
// │   On complete: call setStep(7) and store concept IDs in state
// └─────────────────────────────────────────────────────────────────────────

const GENERATION_STEPS = [
  { label: "Подготавливаем концепцию", detail: "Анализируем ваши предпочтения..." },
  { label: "Создаём визуальные образы", detail: "Генерируем варианты дизайна..." },
  { label: "Подбираем материалы", detail: "Формируем палитру и текстуры..." },
  { label: "Финальная обработка", detail: "Почти готово..." },
];

const STEP_DURATION = 1800;

export default function StepGeneration() {
  const { selectedStyle, setStep } = useProjectStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const advance = (step: number) => {
      if (step >= GENERATION_STEPS.length) {
        setDone(true);
        setTimeout(() => setStep(4), 900);
        return;
      }
      setCurrentStep(step);
      setTimeout(() => advance(step + 1), STEP_DURATION);
    };
    const t = setTimeout(() => advance(0), 400);
    return () => clearTimeout(t);
  }, [setStep]);

  const progress = done ? 100 : ((currentStep + 0.5) / GENERATION_STEPS.length) * 100;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 28px",
        maxWidth: 480,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      {/* Orb */}
      <div style={{ position: "relative", marginBottom: 40 }}>
        {/* Outer pulse rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            animate={{ scale: [1, 1 + ring * 0.25], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, delay: ring * 0.5, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(200,155,60,0.4)",
              width: 96,
              height: 96,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}

        {/* Core orb */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, #C89B3C 0%, #0F3D2E 40%, #C89B3C 80%, #0F3D2E 100%)",
            boxShadow: "0 0 40px rgba(200,155,60,0.3), 0 0 80px rgba(18,60,51,0.3)",
          }}
        />

        {/* Inner circle */}
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            background: "#081512",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={done ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {done ? (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M6 14L11 19L22 9"
                  stroke="#C89B3C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 6v4M14 18v4M6 14H2M26 14h-4M8.34 8.34L5.51 5.51M22.49 22.49l-2.83-2.83M8.34 19.66l-2.83 2.83M22.49 5.51l-2.83 2.83"
                  stroke="#C89B3C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </motion.div>
        </div>
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#F5F7F6",
          margin: "0 0 8px",
        }}
      >
        {done ? "Концепции готовы" : "Генерируем дизайн"}
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.p
          key={done ? "done" : currentStep}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 14, color: "#9BA8A3", margin: "0 0 32px", lineHeight: 1.5 }}
        >
          {done
            ? "Мы создали 3 уникальных концепции специально для вас"
            : GENERATION_STEPS[currentStep]?.detail}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div style={{ width: "100%", marginBottom: 28 }}>
        <div
          style={{
            height: 3,
            borderRadius: 2,
            background: "rgba(30,74,62,0.4)",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              height: "100%",
              borderRadius: 2,
              background: done
                ? "linear-gradient(90deg, #2D8F5A, #45B070)"
                : "linear-gradient(90deg, #C89B3C, #D4A84B)",
            }}
          />
        </div>
      </div>

      {/* Steps list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", textAlign: "left" }}>
        {GENERATION_STEPS.map((step, i) => {
          const isDone = done || i < currentStep;
          const isActive = !done && i === currentStep;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: isDone || isActive ? 1 : 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Indicator */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isDone
                    ? "rgba(45,143,90,0.2)"
                    : isActive
                    ? "rgba(200,155,60,0.15)"
                    : "rgba(30,74,62,0.2)",
                  border: `1px solid ${isDone ? "rgba(45,143,90,0.5)" : isActive ? "rgba(200,155,60,0.4)" : "rgba(30,74,62,0.3)"}`,
                }}
              >
                {isDone ? (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2 5.5L4.5 8L9 3" stroke="#2D8F5A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : isActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#C89B3C" }}
                  />
                ) : (
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(30,74,62,0.5)" }} />
                )}
              </div>

              <span
                style={{
                  fontSize: 13,
                  color: isDone ? "#2D8F5A" : isActive ? "#F5F7F6" : "#9BA8A3",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
