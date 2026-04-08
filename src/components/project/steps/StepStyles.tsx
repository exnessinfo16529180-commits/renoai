"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useProjectStore, StyleId } from "@/lib/project-store";
import { STYLES } from "@/lib/project-mock";
import {
  ModernRoom,
  ScandinavianRoom,
  MinimalRoom,
  LoftRoom,
  NeoclassicRoom,
  LuxuryRoom,
} from "@/components/project/ui/StyleIllustrations";

// Maps style id → illustration component
const ILLUSTRATIONS: Record<string, React.ComponentType> = {
  modern:       ModernRoom,
  scandinavian: ScandinavianRoom,
  minimal:      MinimalRoom,
  loft:         LoftRoom,
  neoclassic:   NeoclassicRoom,
  luxury:       LuxuryRoom,
};

export default function StepStyles() {
  const { selectedStyle, update, setStep } = useProjectStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: StyleId) => {
    // Clear stored estimate so it recalculates with the new style
    update({ selectedStyle: id, estimate: null });
  };

  const handleContinue = () => {
    if (selectedStyle) setStep(3);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "28px 20px 20px",
          maxWidth: 640,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
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
            Выберите стиль
          </h2>
          <p style={{ fontSize: 14, color: "#9BA8A3", margin: "8px 0 0", lineHeight: 1.5 }}>
            Каждая концепция будет адаптирована под ваш выбор
          </p>
        </motion.div>
      </div>

      {/* Cards — full-bleed horizontal scroll */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          display: "flex",
          gap: 12,
          padding: "8px 20px 16px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          alignItems: "flex-start",
        }}
      >
        {STYLES.map((style, i) => {
          const Illustration = ILLUSTRATIONS[style.id];
          const selected = selectedStyle === style.id;

          return (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.38, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ scrollSnapAlign: "start", flexShrink: 0 }}
            >
              <StyleCard
                style={style}
                Illustration={Illustration}
                selected={selected}
                onSelect={() => handleSelect(style.id as StyleId)}
              />
            </motion.div>
          );
        })}

        {/* Trailing spacer so last card clears viewport */}
        <div style={{ width: 8, flexShrink: 0 }} />
      </div>

      {/* Scroll hint dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          padding: "4px 0 8px",
        }}
      >
        {STYLES.map((s) => (
          <div
            key={s.id}
            style={{
              width: selectedStyle === s.id ? 20 : 5,
              height: 5,
              borderRadius: 3,
              background: selectedStyle === s.id ? "#C89B3C" : "rgba(30,74,62,0.5)",
              transition: "all 0.25s ease",
            }}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          padding: "8px 20px 32px",
          maxWidth: 640,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {selectedStyle && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(200,155,60,0.08)",
              border: "1px solid rgba(200,155,60,0.25)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 14 }}>✓</span>
            <span style={{ fontSize: 13, color: "#C89B3C", fontWeight: 500 }}>
              Выбрано:{" "}
              <strong>{STYLES.find((s) => s.id === selectedStyle)?.name}</strong>
            </span>
          </motion.div>
        )}

        <motion.button
          animate={selectedStyle ? { opacity: 1 } : { opacity: 0.45 }}
          onClick={handleContinue}
          disabled={!selectedStyle}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 16,
            border: "none",
            cursor: selectedStyle ? "pointer" : "not-allowed",
            fontSize: 15,
            fontWeight: 600,
            background: selectedStyle
              ? "linear-gradient(135deg, #C89B3C 0%, #B8892C 100%)"
              : "rgba(30,74,62,0.3)",
            color: selectedStyle ? "#081512" : "#9BA8A3",
            boxShadow: selectedStyle ? "0 6px 24px rgba(200,155,60,0.25)" : "none",
            transition: "all 0.2s ease",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Продолжить
        </motion.button>
      </div>
    </div>
  );
}

interface StyleCardProps {
  style: (typeof STYLES)[0];
  Illustration: React.ComponentType;
  selected: boolean;
  onSelect: () => void;
}

function StyleCard({ style, Illustration, selected, onSelect }: StyleCardProps) {
  return (
    <button
      onClick={onSelect}
      style={{
        width: 220,
        borderRadius: 20,
        overflow: "hidden",
        border: selected
          ? "2px solid rgba(200,155,60,0.85)"
          : "1.5px solid rgba(30,74,62,0.35)",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: selected
          ? "0 0 0 3px rgba(200,155,60,0.15), 0 12px 32px rgba(200,155,60,0.12)"
          : "0 4px 16px rgba(0,0,0,0.3)",
        transform: selected ? "scale(1.015)" : "scale(1)",
        WebkitTapHighlightColor: "transparent",
        position: "relative",
      }}
    >
      {/* Selected badge */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C89B3C, #B8892C)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(200,155,60,0.4)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7L5.5 10L11.5 4"
              stroke="#081512"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Illustration — replace <Illustration /> with <img> for real photos */}
      <div
        style={{
          width: "100%",
          aspectRatio: "280/180",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Illustration />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(8,21,18,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Card info */}
      <div
        style={{
          padding: "14px 14px 16px",
          background: selected ? "rgba(200,155,60,0.06)" : "rgba(13,36,32,0.85)",
          textAlign: "left",
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: selected ? "#C89B3C" : "#F5F7F6",
            letterSpacing: "-0.01em",
            marginBottom: 5,
            transition: "color 0.2s",
          }}
        >
          {style.name}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#9BA8A3",
            lineHeight: 1.45,
            marginBottom: 10,
          }}
        >
          {style.description}
        </div>

        {/* Palette dots */}
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {style.palette.map((color) => (
            <div
              key={color}
              title={color}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: color,
                border: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
          {style.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: "2px 7px",
                borderRadius: 100,
                background: "rgba(30,74,62,0.5)",
                color: "#9BA8A3",
                letterSpacing: "0.02em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
