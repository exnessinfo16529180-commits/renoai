"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/lib/project-store";

// ┌── AI_INTEGRATION_POINT ─────────────────────────────────────────────────
// │ Replace mock submission with:
// │   POST /api/projects/create  { ...projectStore }
// │   Returns: { projectId, contractUrl, estimatedStartDate }
// │   Then redirect to /project/:id/dashboard
// └─────────────────────────────────────────────────────────────────────────

const CONTRACT_STEPS = [
  { label: "Формируем техническое задание", duration: 1200 },
  { label: "Рассчитываем итоговую смету", duration: 1600 },
  { label: "Подготавливаем условия договора", duration: 1400 },
  { label: "Финальная проверка", duration: 800 },
];

type Phase = "idle" | "preparing" | "done";

export default function StepContract() {
  const { reset } = useProjectStore();
  const [phase, setPhase] = useState<Phase>("idle");
  const [prepStep, setPrepStep] = useState(0);
  const [phone, setPhone] = useState("");

  const handleStart = () => {
    setPhase("preparing");
    let step = 0;

    const advance = (s: number) => {
      if (s >= CONTRACT_STEPS.length) {
        setPhase("done");
        return;
      }
      setPrepStep(s);
      setTimeout(() => advance(s + 1), CONTRACT_STEPS[s].duration);
    };
    advance(step);
  };

  if (phase === "done") {
    return <SuccessScreen onReset={reset} />;
  }

  if (phase === "preparing") {
    return <PreparingScreen currentStep={prepStep} />;
  }

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
        style={{ marginBottom: 32 }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 100,
            background: "rgba(200,155,60,0.1)",
            border: "1px solid rgba(200,155,60,0.25)",
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 11, color: "#C89B3C", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Последний шаг
          </span>
        </div>

        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#F5F7F6",
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}
        >
          Подготовка договора
        </h2>
        <p style={{ fontSize: 14, color: "#9BA8A3", margin: 0, lineHeight: 1.6 }}>
          Мы сформируем полное техническое задание и договор с командой. На вашу почту придёт документ для подписания.
        </p>
      </motion.div>

      {/* What's included */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          padding: "18px 18px",
          borderRadius: 18,
          background: "rgba(13,36,32,0.5)",
          border: "1px solid rgba(30,74,62,0.4)",
          marginBottom: 24,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "#9BA8A3",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          В договор войдёт
        </p>
        {[
          "Полное техническое задание",
          "Выбранные материалы и поставщики",
          "Сроки и этапы работ",
          "Гарантийные обязательства команды",
          "График платежей",
          "Условия приёмки",
        ].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: i < 5 ? 10 : 0,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(45,143,90,0.15)",
                border: "1px solid rgba(45,143,90,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#2D8F5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, color: "#C8D4CF" }}>{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Phone input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ marginBottom: 24 }}
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
          Ваш номер телефона
        </p>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          style={{
            width: "100%",
            height: 50,
            padding: "0 16px",
            borderRadius: 14,
            border: "1px solid rgba(30,74,62,0.5)",
            background: "rgba(13,36,32,0.5)",
            color: "#F5F7F6",
            fontSize: 16,
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "inherit",
          }}
        />
        <p style={{ fontSize: 12, color: "#9BA8A3", marginTop: 6 }}>
          Менеджер свяжется для уточнения деталей
        </p>
      </motion.div>

      {/* Submit button */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        onClick={handleStart}
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
          boxShadow: "0 8px 30px rgba(200,155,60,0.3)",
          marginBottom: 10,
          WebkitTapHighlightColor: "transparent",
        }}
      >
        Запустить подготовку договора
      </motion.button>
      <p
        style={{
          fontSize: 12,
          color: "rgba(155,168,163,0.55)",
          textAlign: "center",
        }}
      >
        Нажимая кнопку, вы соглашаетесь с условиями сервиса
      </p>
    </div>
  );
}

function PreparingScreen({ currentStep }: { currentStep: number }) {
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
      {/* Spinning logo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, #C89B3C 0%, #0F3D2E 40%, #C89B3C 80%, #0F3D2E 100%)",
          boxShadow: "0 0 40px rgba(200,155,60,0.25)",
          marginBottom: 32,
        }}
      />

      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#F5F7F6",
          margin: "0 0 8px",
        }}
      >
        Формируем договор
      </h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: 14, color: "#9BA8A3", margin: "0 0 32px" }}
        >
          {CONTRACT_STEPS[currentStep]?.label}
        </motion.p>
      </AnimatePresence>

      <div style={{ width: "100%", height: 3, borderRadius: 2, background: "rgba(30,74,62,0.4)", overflow: "hidden" }}>
        <motion.div
          animate={{ width: `${((currentStep + 0.5) / CONTRACT_STEPS.length) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #C89B3C, #D4A84B)" }}
        />
      </div>
    </div>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
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
      {/* Success orb */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,143,90,0.3) 0%, rgba(45,143,90,0.05) 70%)",
          border: "2px solid rgba(45,143,90,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          boxShadow: "0 0 40px rgba(45,143,90,0.2)",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M10 20L17 27L30 14"
            stroke="#2D8F5A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#F5F7F6",
          margin: "0 0 10px",
        }}
      >
        Проект создан!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: 14, color: "#9BA8A3", margin: "0 0 36px", lineHeight: 1.6, maxWidth: 320 }}
      >
        Договор подготовлен. Наш менеджер свяжется с вами в течение 24 часов для согласования деталей.
      </motion.p>

      {/* What's next */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: 18,
          background: "rgba(13,36,32,0.5)",
          border: "1px solid rgba(30,74,62,0.4)",
          textAlign: "left",
          marginBottom: 28,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "#9BA8A3",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 12,
            fontWeight: 500,
          }}
        >
          Следующие шаги
        </p>
        {[
          "Вам позвонит персональный менеджер",
          "Вы получите договор для ознакомления",
          "Команда согласует точные сроки",
          "Старт проекта после подписания",
        ].map((step, i) => (
          <div
            key={step}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: i < 3 ? 10 : 0,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "rgba(200,155,60,0.15)",
                border: "1px solid rgba(200,155,60,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#C89B3C",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontSize: 13, color: "#C8D4CF", lineHeight: 1.4 }}>{step}</span>
          </div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onReset}
        style={{
          width: "100%",
          height: 48,
          borderRadius: 14,
          border: "1px solid rgba(30,74,62,0.5)",
          background: "transparent",
          color: "#9BA8A3",
          fontSize: 14,
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        Начать новый проект
      </motion.button>
    </div>
  );
}
