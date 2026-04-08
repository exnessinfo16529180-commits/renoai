"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroNew() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BASE}/images/hero-bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(5,46,22,0.7) 0%, rgba(5,46,22,0.8) 50%, #052e16 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(31,122,92,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 896,
          margin: "0 auto",
          padding: "80px 20px 60px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <motion.div variants={item} style={{ marginBottom: 24 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 100,
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)",
              color: "#6ee7b7",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <Sparkles size={16} />
            AI-Платформа для ремонта
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Ремонт под{" "}
          <span className="text-gradient">контролем AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: 640,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          Дизайн, смета, материалы и бригада — в одной системе.
          От идеи до заселения за 30 дней.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <Link href={`${BASE}/project`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 16,
                }}
              >
                Начать проект
                <ArrowRight size={18} />
              </motion.button>
            </Link>

            <motion.a
              href="#flow"
              whileHover={{ scale: 1.02 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                padding: "14px 24px",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onHoverStart={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onHoverEnd={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
            >
              Посмотреть как работает
              <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            maxWidth: 420,
            margin: "64px auto 0",
          }}
        >
          {[
            { value: "2 мин", label: "на дизайн" },
            { value: "30%",   label: "экономия" },
            { value: "500+",  label: "проектов" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "6px 0",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
