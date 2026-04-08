"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Wrench, Building, ArrowRight, CheckCircle2 } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const audiences = [
  {
    icon: Home,
    title: "Владельцы квартир",
    description: "Сделайте ремонт быстро, качественно и без переплат",
    accent: "#6ee7b7",
    accentBg: "rgba(52,211,153,0.15)",
    topBorder: "#22c55e",
    btnBorder: "rgba(52,211,153,0.3)",
    benefits: ["Сэкономьте до 30% на ремонте", "Контроль качества на каждом этапе", "Прозрачная смета без скрытых расходов"],
    cta: "Начать проект",
    href: `${BASE}/project`,
  },
  {
    icon: Wrench,
    title: "Бригады и мастера",
    description: "Получайте стабильные заказы от проверенных клиентов",
    accent: "#fbbf24",
    accentBg: "rgba(251,191,36,0.15)",
    topBorder: "#f59e0b",
    btnBorder: "rgba(251,191,36,0.3)",
    benefits: ["Постоянный поток заказов", "Гарантированная оплата через эскроу", "Рейтинговая система продвижения"],
    cta: "Стать подрядчиком",
    href: "#",
  },
  {
    icon: Building,
    title: "Застройщики",
    description: "Массовое управление ремонтными проектами",
    accent: "#93c5fd",
    accentBg: "rgba(96,165,250,0.15)",
    topBorder: "#3b82f6",
    btnBorder: "rgba(96,165,250,0.3)",
    benefits: ["Массовое управление проектами", "Интеграция с вашей CRM", "Аналитика и отчётность"],
    cta: "Для бизнеса",
    href: "#",
  },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function AudienceCards() {
  return (
    <section
      id="audience"
      style={{
        position: "relative",
        padding: "80px 0",
        background: "#14532d",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 20%, rgba(31,122,92,0.12) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}
        >
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Для кого создан{" "}
            <span className="text-gradient">RenoAI</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Платформа объединяет всех участников ремонта в одной экосистеме
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}
        >
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                variants={itemV}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div
                  className="glass-card-hover"
                  style={{
                    padding: 32,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: a.topBorder,
                      borderRadius: "1rem 1rem 0 0",
                    }}
                  />

                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: a.accentBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Icon size={26} color={a.accent} />
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 24, lineHeight: 1.6 }}>{a.description}</p>

                  <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, flex: 1 }}>
                    {a.benefits.map((b) => (
                      <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <CheckCircle2 size={18} color={a.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={a.href} style={{ textDecoration: "none" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        borderRadius: 12,
                        border: `1px solid ${a.btnBorder}`,
                        background: a.accentBg,
                        color: a.accent,
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {a.cta}
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
