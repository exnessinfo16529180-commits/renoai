"use client";

import { motion } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore } from "@/lib/project-store";
import { TEAMS } from "@/lib/project-mock";

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1.5L7.3 4.7H10.7L8 6.8L9 10L6 8L3 10L4 6.8L1.3 4.7H4.7Z" fill="#C89B3C"/>
      </svg>
      <span style={{ fontSize: 13, color: "#C89B3C", fontWeight: 700 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export default function StepTeams() {
  const { selectedTeam, update, setStep } = useProjectStore();

  return (
    <StepWrapper
      title="Ремонтные команды"
      subtitle="Проверенные профессионалы под ваш тип проекта"
      cta={{
        label: "Продолжить",
        disabled: !selectedTeam,
        onClick: () => setStep(11),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {TEAMS.map((team, i) => {
          const selected = selectedTeam === team.id;
          return (
            <motion.button
              key={team.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              onClick={() => update({ selectedTeam: team.id })}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 18px",
                borderRadius: 20,
                border: selected
                  ? "1.5px solid rgba(200,155,60,0.7)"
                  : "1.5px solid rgba(30,74,62,0.4)",
                background: selected ? "rgba(200,155,60,0.07)" : "rgba(13,36,32,0.5)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.22s ease",
                WebkitTapHighlightColor: "transparent",
                boxShadow: selected ? "0 8px 28px rgba(200,155,60,0.1)" : "none",
                position: "relative",
              }}
            >
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: selected ? "rgba(200,155,60,0.15)" : "rgba(30,74,62,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 20,
                  }}
                >
                  🏗️
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: selected ? "#F5F7F6" : "#C8D4CF",
                      letterSpacing: "-0.01em",
                      marginBottom: 3,
                    }}
                  >
                    {team.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#9BA8A3" }}>{team.specialization}</div>
                </div>

                {/* Check */}
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #C89B3C, #B8892C)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3.5" stroke="#081512" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  color: "#9BA8A3",
                  lineHeight: 1.5,
                  margin: "0 0 12px",
                }}
              >
                {team.description}
              </p>

              {/* Stats row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <StarRating rating={team.rating} />
                <span style={{ fontSize: 12, color: "#9BA8A3" }}>
                  {team.reviewCount} отзывов
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: selected ? "#C89B3C" : "#9BA8A3",
                  }}
                >
                  {team.estimate}
                </span>
                <span style={{ fontSize: 12, color: "#9BA8A3", display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
                    <path d="M6 3v3l2.5 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  {team.duration}
                </span>
              </div>

              {/* Badges */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {team.badges.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      fontSize: 11,
                      padding: "3px 8px",
                      borderRadius: 100,
                      background: selected ? "rgba(200,155,60,0.15)" : "rgba(30,74,62,0.5)",
                      border: `1px solid ${selected ? "rgba(200,155,60,0.3)" : "rgba(30,74,62,0.4)"}`,
                      color: selected ? "#C89B3C" : "#9BA8A3",
                      fontWeight: 500,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </StepWrapper>
  );
}
