"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function FinalCTA() {
  return (
    <section
      style={{
        position: "relative",
        padding: "80px 0",
        overflow: "hidden",
        background: "#052e16",
      }}
    >
      {/* Glow circles */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div
          style={{
            width: 700,
            height: 700,
            background: "rgba(52,211,153,0.07)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          background: "rgba(52,211,153,0.12)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: 32 }}
        >
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
            <Zap size={16} />
            Начните за 5 минут
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 20,
          }}
        >
          Начни ремонт{" "}
          <span className="text-gradient">без стресса</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}
        >
          Загрузите фото квартиры — AI подготовит дизайн и смету за 5 минут.
          Без обязательств, бесплатно.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: 40 }}
        >
          <Link href={`${BASE}/project`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glow-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontSize: 18,
                padding: "18px 40px",
              }}
            >
              Загрузить фото
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, color: "rgba(255,255,255,0.5)" }}
        >
          {[
            { Icon: Zap,    text: "Бесплатно" },
            { Icon: Shield, text: "Без обязательств" },
            { Icon: Clock,  text: "Результат за 5 минут" },
          ].map(({ Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon size={16} color="#6ee7b7" />
              <span style={{ fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
