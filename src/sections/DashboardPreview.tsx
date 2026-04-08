"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, TrendingUp, Clock } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const milestones = [
  { label: "Дизайн",    completed: true },
  { label: "Смета",     completed: true },
  { label: "Материалы", completed: true },
  { label: "Ремонт",    completed: false, current: true },
  { label: "Приёмка",   completed: false },
];

const photos = [
  `${BASE}/images/room-before.jpg`,
  `${BASE}/images/room-after.jpg`,
  `${BASE}/images/style-minimal.jpg`,
  `${BASE}/images/style-scandi.jpg`,
];

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      style={{
        padding: "80px 0",
        background: "linear-gradient(to bottom, #14532d, #052e16)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
        className="dashboard-grid"
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            Ваш проект в{" "}
            <span className="text-gradient">личном кабинете</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 32 }}>
            Отслеживайте прогресс, управляйте бюджетом, общайтесь с бригадой.
            Вся информация о ремонте всегда под рукой.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "Прогресс ремонта в реальном времени",
              "Детальная смета с актуальными ценами",
              "Фотоотчёты с каждого этапа",
              "Прямой чат с бригадой",
            ].map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "rgba(52,211,153,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={14} color="#6ee7b7" />
                </div>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{feat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: "relative" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card"
            style={{ overflow: "hidden" }}
          >
            {/* Window chrome */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(239,68,68,0.8)" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(245,158,11,0.8)" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(34,197,94,0.8)" }} />
              </div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                RenoAI Dashboard
              </div>
            </div>

            {/* Dashboard body */}
            <div style={{ padding: "20px" }}>
              {/* Progress card */}
              <div className="glass-card" style={{ padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>Ремонт в процессе</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>2-комнатная квартира, 65 м²</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#6ee7b7" }}>65%</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>готово</div>
                  </div>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #1f7a5c, #6ee7b7)", borderRadius: 4 }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="glass-card" style={{ padding: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Этапы проекта</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {milestones.map((m, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 6,
                          background: m.completed ? "rgba(52,211,153,0.2)" : m.current ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.1)",
                          border: m.current ? "2px solid rgba(245,158,11,0.5)" : "none",
                        }}
                      >
                        {m.completed ? <CheckCircle2 size={14} color="#6ee7b7" /> : <Circle size={14} color={m.current ? "#fbbf24" : "rgba(255,255,255,0.3)"} />}
                      </div>
                      <span style={{ fontSize: 10, color: (m.completed || m.current) ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="glass-card" style={{ padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Бюджет проекта</div>
                  <TrendingUp size={14} color="#6ee7b7" />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>8 247 000 ₸</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", paddingBottom: 3 }}>/ 11 500 000 ₸</span>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                  <span>Материалы: 4 800 000 ₸</span>
                  <span>Работы: 3 447 000 ₸</span>
                </div>
              </div>

              {/* Photos */}
              <div className="glass-card" style={{ padding: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 10 }}>Последние фото</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {photos.map((src, i) => (
                    <div key={i} style={{ aspectRatio: "1", borderRadius: 8, overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
                      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Next task */}
              <div
                className="glass-card"
                style={{ padding: 16, borderLeft: "3px solid #fbbf24", borderRadius: "0 12px 12px 0" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Clock size={18} color="#fbbf24" />
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Следующая задача</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>Укладка плитки в ванной — завтра, 9:00</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Glow */}
          <div
            style={{
              position: "absolute",
              inset: -16,
              background: "rgba(52,211,153,0.07)",
              borderRadius: 32,
              filter: "blur(40px)",
              zIndex: -1,
            }}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .dashboard-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
