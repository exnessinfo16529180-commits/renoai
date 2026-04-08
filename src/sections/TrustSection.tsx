"use client";

import { motion } from "framer-motion";
import { Shield, CreditCard, BadgeCheck, Lock, Eye, FileCheck } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Эскроу-счёт",
    description: "Ваши деньги хранятся на защищённом счёте до завершения работ. Бригада получает оплату только после вашего подтверждения.",
    accent: "#6ee7b7",
    bg: "rgba(52,211,153,0.15)",
  },
  {
    icon: CreditCard,
    title: "Оплата по факту",
    description: "Платите только за выполненные этапы. Никаких предоплат за невыполненную работу — контролируйте каждый шаг.",
    accent: "#fbbf24",
    bg: "rgba(251,191,36,0.15)",
  },
  {
    icon: BadgeCheck,
    title: "Проверенные бригады",
    description: "Все мастера проходят строгую верификацию, имеют подтверждённое портфолио и реальные отзывы клиентов.",
    accent: "#93c5fd",
    bg: "rgba(96,165,250,0.15)",
  },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function TrustSection() {
  return (
    <section
      id="trust"
      style={{
        position: "relative",
        padding: "80px 0",
        background: "#052e16",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at top, rgba(31,122,92,0.1) 0%, transparent 50%)",
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
            Ваши деньги{" "}
            <span className="text-gradient">под защитой</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Мы создали систему, которая защищает вас на каждом этапе ремонта
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}
        >
          {trustFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={itemV}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="glass-card-hover" style={{ padding: 32, height: "100%" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: f.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <Icon size={26} color={f.accent} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}
        >
          {[
            { Icon: Lock,      text: "SSL-шифрование данных" },
            { Icon: Eye,       text: "Прозрачная смета" },
            { Icon: FileCheck, text: "Юридическая поддержка" },
          ].map(({ Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)" }}>
              <Icon size={18} color="#6ee7b7" />
              <span style={{ fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
