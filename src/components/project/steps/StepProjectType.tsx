"use client";

import { motion } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore, ProjectType } from "@/lib/project-store";

const OPTIONS: { id: ProjectType; title: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: "new",
    title: "Новостройка",
    sub: "Квартира без отделки — начинаем с нуля",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="14" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M2 16L16 4L30 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="13" y="20" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    id: "renovation",
    title: "Готовая квартира",
    sub: "Редизайн или ремонт существующего жилья",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="5" width="26" height="22" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3 11H29" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M12 11V27" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="22" cy="18" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 16h3M7 20h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function StepProjectType() {
  const { projectType, update, setStep } = useProjectStore();

  const handleSelect = (id: ProjectType) => {
    update({ projectType: id });
    setTimeout(() => setStep(2), 260);
  };

  return (
    <StepWrapper
      title="Какой у вас проект?"
      subtitle="Это поможет нам подобрать правильный подход с первого шага"
      cta={null}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {OPTIONS.map((opt, i) => {
          const selected = projectType === opt.id;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              onClick={() => handleSelect(opt.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "20px 20px",
                borderRadius: 18,
                border: selected
                  ? "1.5px solid rgba(200,155,60,0.7)"
                  : "1.5px solid rgba(30,74,62,0.4)",
                background: selected
                  ? "linear-gradient(135deg, rgba(200,155,60,0.1) 0%, rgba(200,155,60,0.04) 100%)"
                  : "rgba(13,36,32,0.5)",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.22s ease",
                boxShadow: selected ? "0 0 0 1px rgba(200,155,60,0.15), 0 8px 24px rgba(200,155,60,0.08)" : "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: selected ? "rgba(200,155,60,0.15)" : "rgba(30,74,62,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: selected ? "#C89B3C" : "#9BA8A3",
                  flexShrink: 0,
                  transition: "all 0.22s ease",
                }}
              >
                {opt.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: selected ? "#F5F7F6" : "#C8D4CF",
                    letterSpacing: "-0.01em",
                    marginBottom: 4,
                  }}
                >
                  {opt.title}
                </div>
                <div style={{ fontSize: 13, color: "#9BA8A3", lineHeight: 1.4 }}>
                  {opt.sub}
                </div>
              </div>

              {/* Check */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: selected ? "none" : "1.5px solid rgba(30,74,62,0.5)",
                  background: selected
                    ? "linear-gradient(135deg, #C89B3C, #B8892C)"
                    : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.22s ease",
                }}
              >
                {selected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6L5 8.5L9.5 3.5"
                      stroke="#081512"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </StepWrapper>
  );
}
