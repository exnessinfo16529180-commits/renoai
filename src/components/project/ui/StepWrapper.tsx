"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** CTA button at the bottom — pass null to hide */
  cta?: {
    label: string;
    disabled?: boolean;
    onClick: () => void;
  } | null;
  /** Optional secondary action */
  secondary?: {
    label: string;
    onClick: () => void;
  };
}

export default function StepWrapper({ title, subtitle, children, cta, secondary }: Props) {
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
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ marginBottom: 28 }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            color: "#F5F7F6",
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 14,
              color: "#9BA8A3",
              margin: "8px 0 0",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Bottom CTA */}
      {cta !== null && cta !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          style={{ marginTop: 28 }}
        >
          <button
            onClick={cta.onClick}
            disabled={cta.disabled}
            style={{
              width: "100%",
              height: 52,
              borderRadius: 16,
              border: "none",
              cursor: cta.disabled ? "not-allowed" : "pointer",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.01em",
              transition: "all 0.2s ease",
              background: cta.disabled
                ? "rgba(30,74,62,0.3)"
                : "linear-gradient(135deg, #C89B3C 0%, #B8892C 100%)",
              color: cta.disabled ? "#9BA8A3" : "#081512",
              boxShadow: cta.disabled ? "none" : "0 6px 24px rgba(200,155,60,0.25)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {cta.label}
          </button>
          {secondary && (
            <button
              onClick={secondary.onClick}
              style={{
                width: "100%",
                marginTop: 10,
                height: 44,
                borderRadius: 14,
                border: "1px solid rgba(30,74,62,0.4)",
                background: "transparent",
                cursor: "pointer",
                fontSize: 14,
                color: "#9BA8A3",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {secondary.label}
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
