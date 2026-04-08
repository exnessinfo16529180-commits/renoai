"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/lib/project-store";
import { CONCEPTS } from "@/lib/project-mock";

export default function StepResults() {
  const { selectedConcept, update, setStep } = useProjectStore();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id: string) => {
    update({ selectedConcept: id });
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
        padding: "28px 20px 32px",
        boxSizing: "border-box",
      }}
    >
      {/* Heading with reveal animation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 8 }}
      >
        {/* "Generated for you" badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
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
            Создано специально для вас
          </span>
        </motion.div>

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
          Ваши концепции
        </h2>
        <p style={{ fontSize: 14, color: "#9BA8A3", margin: "8px 0 0", lineHeight: 1.5 }}>
          Выберите направление, которое нравится больше всего
        </p>
      </motion.div>

      {/* Concept cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {CONCEPTS.map((concept, i) => {
          const selected = selectedConcept === concept.id;
          return (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.55,
                delay: 0.15 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ConceptCard
                concept={concept}
                selected={selected}
                onSelect={() => handleSelect(concept.id)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ marginTop: 24 }}
      >
        <AnimatePresence>
          {selectedConcept && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden", marginBottom: 10 }}
            >
              <p style={{ fontSize: 13, color: "#9BA8A3", textAlign: "center", margin: 0 }}>
                Выбрана концепция:{" "}
                <span style={{ color: "#C89B3C", fontWeight: 600 }}>
                  {CONCEPTS.find((c) => c.id === selectedConcept)?.title}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => { if (selectedConcept) setStep(5); }}
          disabled={!selectedConcept}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 16,
            border: "none",
            cursor: selectedConcept ? "pointer" : "not-allowed",
            fontSize: 15,
            fontWeight: 600,
            background: selectedConcept
              ? "linear-gradient(135deg, #C89B3C 0%, #B8892C 100%)"
              : "rgba(30,74,62,0.3)",
            color: selectedConcept ? "#081512" : "#9BA8A3",
            boxShadow: selectedConcept ? "0 6px 24px rgba(200,155,60,0.25)" : "none",
            transition: "all 0.2s ease",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Выбрать и продолжить
        </button>
      </motion.div>
    </div>
  );
}

function ConceptCard({
  concept,
  selected,
  onSelect,
}: {
  concept: (typeof CONCEPTS)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        border: selected
          ? "1.5px solid rgba(200,155,60,0.8)"
          : "1.5px solid rgba(30,74,62,0.4)",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        transition: "all 0.22s ease",
        boxShadow: selected ? "0 0 0 3px rgba(200,155,60,0.12), 0 8px 32px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.3)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Preview area — gradient room impression */}
      <div
        style={{
          width: "100%",
          height: 160,
          background: concept.bgGradient,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Abstract furniture silhouettes */}
        <ConceptPreview concept={concept} />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, rgba(8,21,18,0.7) 100%)",
          }}
        />

        {/* Style badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "4px 10px",
            borderRadius: 100,
            background: "rgba(8,21,18,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span style={{ fontSize: 11, color: "#F5F7F6", fontWeight: 500 }}>
            {concept.style}
          </span>
        </div>

        {/* Selected indicator */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C89B3C, #B8892C)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5L5.2 9.5L11 4" stroke="#081512" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}

        {/* Title overlay */}
        <div style={{ position: "absolute", bottom: 12, left: 14, right: 14 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#F5F7F6",
              letterSpacing: "-0.02em",
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}
          >
            {concept.title}
          </div>
          <div style={{ fontSize: 12, color: "rgba(245,247,246,0.7)", marginTop: 2 }}>
            {concept.subtitle}
          </div>
        </div>
      </div>

      {/* Info row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 14px",
          background: selected ? "rgba(200,155,60,0.06)" : "rgba(13,36,32,0.8)",
          transition: "background 0.2s",
        }}
      >
        {/* Mood */}
        <span
          style={{
            fontSize: 12,
            padding: "3px 8px",
            borderRadius: 100,
            background: "rgba(30,74,62,0.5)",
            color: "#9BA8A3",
          }}
        >
          {concept.mood}
        </span>

        {/* Accent color swatch */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: concept.accentColor,
            flexShrink: 0,
          }}
        />

        {/* Highlights */}
        <div style={{ flex: 1, display: "flex", gap: 5, flexWrap: "wrap" }}>
          {concept.highlights.slice(0, 2).map((h) => (
            <span key={h} style={{ fontSize: 11, color: "#9BA8A3" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Budget */}
        <span
          style={{
            fontSize: 11,
            color: selected ? "#C89B3C" : "#9BA8A3",
            flexShrink: 0,
            fontWeight: selected ? 600 : 400,
          }}
        >
          {concept.budgetLabel}
        </span>
      </div>
    </button>
  );
}

function ConceptPreview({ concept }: { concept: (typeof CONCEPTS)[0] }) {
  // Abstract interior lines for each concept
  if (concept.id === "concept-a") {
    return (
      <svg viewBox="0 0 400 160" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <rect x="60" y="80" width="280" height="50" rx="8" fill="rgba(44,44,44,0.6)"/>
        <rect x="60" y="80" width="280" height="14" rx="6" fill="rgba(56,56,56,0.5)"/>
        <rect x="80" y="86" width="50" height="16" rx="4" fill="rgba(70,70,70,0.6)"/>
        <rect x="140" y="86" width="50" height="16" rx="4" fill="rgba(70,70,70,0.6)"/>
        <rect x="200" y="86" width="50" height="16" rx="4" fill="rgba(70,70,70,0.6)"/>
        <rect x="130" y="102" width="140" height="8" rx="2" fill="rgba(139,155,168,0.4)"/>
        <line x1="320" y1="20" x2="320" y2="80" stroke="rgba(196,190,184,0.4)" strokeWidth="1.5"/>
        <circle cx="320" cy="20" r="8" fill="rgba(232,224,208,0.5)"/>
        <rect x="150" y="20" width="60" height="50" rx="1" fill="none" stroke="rgba(44,44,44,0.3)" strokeWidth="1"/>
      </svg>
    );
  }
  if (concept.id === "concept-b") {
    return (
      <svg viewBox="0 0 400 160" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <path d="M40 155 Q40 105 70 102 L330 102 Q360 105 360 155 Z" fill="rgba(20,20,48,0.7)"/>
        <rect x="40" y="102" width="24" height="53" rx="7" fill="rgba(20,20,48,0.6)"/>
        <rect x="336" y="102" width="24" height="53" rx="7" fill="rgba(20,20,48,0.6)"/>
        <rect x="70" y="112" width="48" height="22" rx="5" fill="rgba(30,30,64,0.8)"/>
        <rect x="128" y="112" width="48" height="22" rx="5" fill="rgba(200,155,60,0.25)"/>
        <rect x="186" y="112" width="48" height="22" rx="5" fill="rgba(30,30,64,0.8)"/>
        <line x1="200" y1="0" x2="200" y2="28" stroke="rgba(200,168,75,0.6)" strokeWidth="1"/>
        <ellipse cx="200" cy="30" rx="22" ry="6" fill="none" stroke="rgba(200,168,75,0.5)" strokeWidth="1"/>
        <rect x="130" y="90" width="140" height="5" rx="1" fill="rgba(200,168,75,0.5)"/>
      </svg>
    );
  }
  // concept-c
  return (
    <svg viewBox="0 0 400 160" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <polygon points="0,128 400,128 400,160 0,160" fill="rgba(200,180,150,0.35)"/>
      <rect x="240" y="8" width="120" height="115" rx="2" fill="rgba(225,238,240,0.25)" stroke="rgba(200,220,200,0.25)" strokeWidth="1"/>
      <rect x="30" y="98" width="200" height="45" rx="8" fill="rgba(230,220,205,0.55)"/>
      <rect x="30" y="98" width="200" height="16" rx="6" fill="rgba(245,235,220,0.45)"/>
      <rect x="48" y="106" width="40" height="20" rx="4" fill="rgba(120,158,126,0.7)"/>
      <rect x="96" y="106" width="40" height="20" rx="4" fill="rgba(240,230,218,0.6)"/>
      <rect x="144" y="106" width="40" height="20" rx="4" fill="rgba(120,158,126,0.5)"/>
      <ellipse cx="22" cy="100" rx="14" ry="18" fill="rgba(90,138,90,0.55)"/>
      <rect x="16" y="108" width="12" height="25" rx="2" fill="rgba(139,105,20,0.5)"/>
    </svg>
  );
}
