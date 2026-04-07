"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useProjectStore } from "@/lib/project-store";

// ┌── AI_INTEGRATION_POINT ─────────────────────────────────────────────────
// │ Replace with: GET /api/partner-complexes
// │ Returns: ResidentialComplex[] from CMS / partner DB
// └─────────────────────────────────────────────────────────────────────────
interface ResidentialComplex {
  id: string;
  developer: string;
  name: string;
  city: string;
  accentColor: string;
  bgGradient: string;
  features: string[];
  unitsReady: number; // % of floor plans already in system
}

const COMPLEXES: ResidentialComplex[] = [
  {
    id: "bi-esentai",
    developer: "BI Group",
    name: "Esentai Tower Residences",
    city: "Алматы",
    accentColor: "#C8A84B",
    bgGradient: "linear-gradient(135deg, #0A1520 0%, #0D2030 50%, #0A1825 100%)",
    features: ["Планировки доступны", "Специальные условия", "Приоритетный запуск"],
    unitsReady: 100,
  },
  {
    id: "bazis-symphony",
    developer: "Bazis-A",
    name: "Symphony",
    city: "Алматы",
    accentColor: "#8A9E8A",
    bgGradient: "linear-gradient(135deg, #0A1810 0%, #0D2818 50%, #0A1A12 100%)",
    features: ["Планировки доступны", "Приоритетный запуск"],
    unitsReady: 85,
  },
  {
    id: "bi-expo",
    developer: "BI Group",
    name: "Expo Boulevard",
    city: "Астана",
    accentColor: "#B0A890",
    bgGradient: "linear-gradient(135deg, #181410 0%, #24201A 50%, #1A1810 100%)",
    features: ["Планировки доступны", "Специальные условия"],
    unitsReady: 92,
  },
  {
    id: "mega-center",
    developer: "Mega Residence",
    name: "Park Avenue",
    city: "Астана",
    accentColor: "#7A9AB0",
    bgGradient: "linear-gradient(135deg, #08101A 0%, #0D1A28 50%, #081018 100%)",
    features: ["Планировки доступны", "Специальные условия", "Приоритетный запуск"],
    unitsReady: 78,
  },
  {
    id: "kusto-grand",
    developer: "Kusto Group",
    name: "Grand Almaty",
    city: "Алматы",
    accentColor: "#C89B6A",
    bgGradient: "linear-gradient(135deg, #1A1008 0%, #28180A 50%, #1A1008 100%)",
    features: ["Специальные условия", "Приоритетный запуск"],
    unitsReady: 70,
  },
];

const FEATURE_ICONS: Record<string, string> = {
  "Планировки доступны": "📐",
  "Специальные условия": "⭐",
  "Приоритетный запуск": "⚡",
};

export default function ResidentialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { update } = useProjectStore();

  const handleSelectComplex = (id: string) => {
    update({ selectedComplex: id });
  };

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #081512 0%, #060E0B 60%, #081512 100%)",
        padding: "80px 0 88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glows */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -100,
          left: "20%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(18,60,51,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -80,
          right: "10%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(200,155,60,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Section header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 40, maxWidth: 600 }}
        >
          {/* Premium label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              borderRadius: 100,
              background: "rgba(200,155,60,0.08)",
              border: "1px solid rgba(200,155,60,0.25)",
              marginBottom: 20,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1L7.5 4.3H11L8.3 6.5L9.3 10L6 7.9L2.7 10L3.7 6.5L1 4.3H4.5Z"
                fill="#C89B3C"
              />
            </svg>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#C89B3C",
              }}
            >
              Партнёрские резиденции RenoAI
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(26px, 5vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#F5F7F6",
              margin: "0 0 16px",
            }}
          >
            Выберите свой<br />
            <span
              style={{
                background: "linear-gradient(135deg, #C89B3C 0%, #D4A84B 60%, #C89B3C 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              жилой комплекс
            </span>
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "#9BA8A3",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Для клиентов партнёрских резиденций RenoAI доступен более быстрый
            и привилегированный путь к ремонту — с готовыми планировками,
            специальными условиями и персональным сопровождением проекта.
          </p>
        </motion.div>

        {/* ── Scrollable cards ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              overflowX: "auto",
              paddingBottom: 16,
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              marginLeft: -20,
              marginRight: -20,
              paddingLeft: 20,
              paddingRight: 20,
              touchAction: "pan-x",
            }}
          >
            {COMPLEXES.map((cx, i) => (
              <ComplexCard
                key={cx.id}
                complex={cx}
                index={i}
                inView={inView}
                onSelect={handleSelectComplex}
              />
            ))}
            {/* Trailing spacer */}
            <div style={{ width: 6, flexShrink: 0 }} />
          </div>
        </motion.div>

        {/* ── User value block ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 56 }}
        >
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#F5F7F6",
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Что вы получаете
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {USER_BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.08 }}
                style={{
                  padding: "18px 18px",
                  borderRadius: 18,
                  background: "rgba(13,36,32,0.5)",
                  border: "1px solid rgba(30,74,62,0.4)",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    background: "rgba(200,155,60,0.1)",
                    border: "1px solid rgba(200,155,60,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    fontSize: 18,
                  }}
                >
                  {b.icon}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#F5F7F6",
                    marginBottom: 5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {b.title}
                </div>
                <div style={{ fontSize: 13, color: "#9BA8A3", lineHeight: 1.5 }}>
                  {b.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── B2B block ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.45 }}
          style={{
            marginTop: 56,
            padding: "36px 32px",
            borderRadius: 24,
            background: "rgba(10,24,20,0.8)",
            border: "1px solid rgba(30,74,62,0.5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 280,
              height: 280,
              background: "radial-gradient(circle, rgba(200,155,60,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 24,
              alignItems: "start",
            }}
          >
            <div>
              {/* B2B label */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 100,
                  background: "rgba(30,74,62,0.5)",
                  border: "1px solid rgba(30,74,62,0.6)",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#9BA8A3",
                  }}
                >
                  Для застройщиков
                </span>
              </div>

              <h3
                style={{
                  fontSize: "clamp(18px, 3.5vw, 24px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.25,
                  color: "#F5F7F6",
                  margin: "0 0 12px",
                }}
              >
                Расширьте ценность<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C89B3C, #D4A84B)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  вашего объекта
                </span>
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: "#9BA8A3",
                  lineHeight: 1.65,
                  margin: "0 0 20px",
                  maxWidth: 520,
                }}
              >
                Партнёрство с RenoAI позволяет расширить ценность жилого комплекса
                за пределы продажи квартиры — от передачи ключей до готового пространства.
              </p>

              {/* 3 bullets */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {B2B_BENEFITS.map((b) => (
                  <div
                    key={b}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "rgba(200,155,60,0.12)",
                        border: "1px solid rgba(200,155,60,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path
                          d="M1.5 4.5L3.5 6.5L7.5 2.5"
                          stroke="#C89B3C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#C8D4CF" }}>{b}</span>
                  </div>
                ))}
              </div>

              {/* B2B CTA */}
              <button
                onClick={() => window.open("mailto:partners@renoai.kz", "_blank")}
                style={{
                  padding: "13px 24px",
                  borderRadius: 14,
                  border: "1.5px solid rgba(200,155,60,0.5)",
                  background: "rgba(200,155,60,0.08)",
                  color: "#C89B3C",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "all 0.2s ease",
                  WebkitTapHighlightColor: "transparent",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(200,155,60,0.14)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,155,60,0.75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(200,155,60,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,155,60,0.5)";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M7.5 1L13.5 4.5V10.5L7.5 14L1.5 10.5V4.5L7.5 1Z"
                    stroke="#C89B3C"
                    strokeWidth="1.2"
                    fill="rgba(200,155,60,0.12)"
                  />
                  <circle cx="7.5" cy="7.5" r="1.5" fill="#C89B3C" />
                </svg>
                Стать партнёром RenoAI
              </button>
            </div>

            {/* Right stat column — desktop only */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minWidth: 140,
                flexShrink: 0,
              }}
            >
              {B2B_STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    background: "rgba(30,74,62,0.15)",
                    border: "1px solid rgba(30,74,62,0.3)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      background: "linear-gradient(135deg, #C89B3C, #D4A84B)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: 3,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 11, color: "#9BA8A3", lineHeight: 1.3 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ── Complex Card ────────────────────────────────────────────────────────────

function ComplexCard({
  complex,
  index,
  inView,
  onSelect,
}: {
  complex: ResidentialComplex;
  index: number;
  inView: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.18 + index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ scrollSnapAlign: "start", flexShrink: 0, width: 260 }}
    >
      <div
        style={{
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(30,74,62,0.4)",
          background: complex.bgGradient,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${complex.accentColor}30`;
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* Card top — graphic area */}
        <div
          style={{
            padding: "22px 20px 18px",
            position: "relative",
          }}
        >
          {/* Partner badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 9px",
              borderRadius: 100,
              background: `${complex.accentColor}18`,
              border: `1px solid ${complex.accentColor}40`,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: complex.accentColor,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: complex.accentColor,
              }}
            >
              Партнёр RenoAI
            </span>
          </div>

          {/* Developer + Complex name */}
          <div
            style={{
              fontSize: 11,
              color: "rgba(245,247,246,0.5)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            {complex.developer}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#F5F7F6",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            {complex.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              color: "rgba(245,247,246,0.5)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1C3.57 1 2 2.57 2 4.5C2 7 5.5 10 5.5 10C5.5 10 9 7 9 4.5C9 2.57 7.43 1 5.5 1Z"
                stroke="rgba(245,247,246,0.4)"
                strokeWidth="1"
              />
              <circle cx="5.5" cy="4.5" r="1.2" fill="rgba(245,247,246,0.4)" />
            </svg>
            {complex.city}
          </div>

          {/* Readiness bar */}
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 10, color: "rgba(245,247,246,0.4)", letterSpacing: "0.04em" }}>
                ПЛАНИРОВКИ
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: complex.accentColor,
                }}
              >
                {complex.unitsReady}%
              </span>
            </div>
            <div
              style={{
                height: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${complex.unitsReady}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${complex.accentColor}80, ${complex.accentColor})`,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            margin: "0 0",
          }}
        />

        {/* Feature tags */}
        <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
          {complex.features.map((f) => (
            <div
              key={f}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 13, lineHeight: 1 }}>{FEATURE_ICONS[f] ?? "·"}</span>
              <span style={{ fontSize: 12, color: "rgba(245,247,246,0.65)" }}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding: "0 16px 18px" }}>
          <Link
            href="/project"
            onClick={() => onSelect(complex.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 42,
              borderRadius: 12,
              background: `${complex.accentColor}18`,
              border: `1px solid ${complex.accentColor}45`,
              color: complex.accentColor,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.18s ease",
              gap: 6,
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${complex.accentColor}28`;
              (e.currentTarget as HTMLElement).style.borderColor = `${complex.accentColor}70`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${complex.accentColor}18`;
              (e.currentTarget as HTMLElement).style.borderColor = `${complex.accentColor}45`;
            }}
          >
            Выбрать ЖК
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2.5 6.5H10.5M7.5 3.5L10.5 6.5L7.5 9.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Static data ─────────────────────────────────────────────────────────────

const USER_BENEFITS = [
  {
    icon: "📐",
    title: "Готовые планировки",
    desc: "Ваш ЖК уже в системе — не нужно загружать план квартиры",
  },
  {
    icon: "⭐",
    title: "Специальные условия",
    desc: "Партнёрские скидки на материалы и ремонтные команды",
  },
  {
    icon: "⚡",
    title: "Быстрый запуск",
    desc: "Пропускаете шаги и переходите сразу к выбору дизайна",
  },
];

const B2B_BENEFITS = [
  "Повышение ценности объекта",
  "Новый сервис для резидентов",
  "Интеграция планировок и сценариев ремонта",
];

const B2B_STATS = [
  { value: "5+", label: "ЖК\nв партнёрстве" },
  { value: "2×", label: "быстрее\nзапуск" },
  { value: "94%", label: "довольных\nрезидентов" },
];
