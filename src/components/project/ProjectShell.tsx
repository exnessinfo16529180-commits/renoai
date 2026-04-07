"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useProjectStore, TOTAL_STEPS, STEP_LABELS } from "@/lib/project-store";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ProjectShell({ children }: { children: React.ReactNode }) {
  const { currentStep, setStep } = useProjectStore();

  const canGoBack = currentStep > 1;
  const handleBack = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  const stepLabel = STEP_LABELS[currentStep] ?? "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        background: "#081512",
        overflowX: "hidden",
      }}
    >
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,21,18,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(30,74,62,0.35)",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            padding: "0 20px",
            height: 56,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Back / Close */}
          {canGoBack ? (
            <button
              onClick={handleBack}
              aria-label="Назад"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(30,74,62,0.3)",
                border: "1px solid rgba(30,74,62,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 13L7 9L11 5"
                  stroke="#9BA8A3"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <Link
              href="/"
              aria-label="На главную"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(30,74,62,0.3)",
                border: "1px solid rgba(30,74,62,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 13L7 9L11 5"
                  stroke="#9BA8A3"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}

          {/* Logo + step label */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #C89B3C 0%, #D4A84B 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  flexShrink: 0,
                }}
              >
                RenoAI
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={stepLabel}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: 13,
                    color: "#9BA8A3",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  — {stepLabel}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Step counter */}
          <span
            style={{
              fontSize: 12,
              color: "#9BA8A3",
              flexShrink: 0,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {currentStep} / {TOTAL_STEPS}
          </span>
        </div>

        {/* Progress bar */}
        <ProgressStrip currentStep={currentStep} total={TOTAL_STEPS} />
      </header>

      {/* ── Step content ─────────────────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function ProgressStrip({ currentStep, total }: { currentStep: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        padding: "0 20px 8px",
        maxWidth: 640,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done = n < currentStep;
        const active = n === currentStep;
        return (
          <div
            key={n}
            style={{
              flex: active ? 2.5 : 1,
              height: 3,
              borderRadius: 2,
              background: done
                ? "#2D8F5A"
                : active
                ? "#C89B3C"
                : "rgba(30,74,62,0.4)",
              transition: "flex 0.35s ease, background 0.25s ease",
            }}
          />
        );
      })}
    </div>
  );
}
