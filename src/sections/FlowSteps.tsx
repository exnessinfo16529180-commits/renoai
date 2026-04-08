"use client";

import { motion } from "framer-motion";
import {
  Upload, Palette, Sparkles, Sliders, Calculator,
  Wallet, Package, Users, CheckCircle,
} from "lucide-react";

const steps = [
  { n: "01", icon: Upload,      title: "Загрузите фото или план",    desc: "Перетащите фото квартиры или загрузите планировку. AI проанализирует пространство.",          color: "rgba(52,211,153,0.15)" },
  { n: "02", icon: Palette,     title: "Выберите стиль",              desc: "Минимализм, скандинавский, лофт, классика — выберите направление дизайна.",                  color: "rgba(96,165,250,0.15)" },
  { n: "03", icon: Sparkles,    title: "AI создаёт дизайн",           desc: "Нейросеть генерирует 3 варианта интерьера с расстановкой мебели за 2 минуты.",              color: "rgba(167,139,250,0.15)" },
  { n: "04", icon: Sliders,     title: "Настройте детали",            desc: "Меняйте материалы, цвета, мебель и декор в один клик в визуальном редакторе.",              color: "rgba(244,114,182,0.15)" },
  { n: "05", icon: Calculator,  title: "Получите смету",              desc: "Детальный расчёт материалов, работ и мебели с ценами от поставщиков.",                      color: "rgba(251,191,36,0.15)" },
  { n: "06", icon: Wallet,      title: "Выберите бюджет",             desc: "Сравните три варианта: Эконом / Стандарт / Премиум с разными материалами.",                 color: "rgba(52,211,153,0.15)" },
  { n: "07", icon: Package,     title: "Материалы и магазины",        desc: "Цены в строительных магазинах, сравнение, заказ с доставкой на объект.",                    color: "rgba(34,211,238,0.15)" },
  { n: "08", icon: Users,       title: "Выберите бригаду",            desc: "Проверенные мастера с рейтингом, отзывами и портфолио выполненных работ.",                  color: "rgba(251,146,60,0.15)" },
  { n: "09", icon: CheckCircle, title: "Контролируйте проект",        desc: "Таймлайн работ, фотоотчёты с объекта, оплата по завершённым этапам.",                       color: "rgba(52,211,153,0.15)" },
];

const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemV = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FlowSteps() {
  return (
    <section
      id="flow"
      className="grid-pattern"
      style={{
        position: "relative",
        padding: "80px 0",
        background: "#14532d",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 64px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}
        >
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Весь ремонт —{" "}
            <span className="text-gradient">в одной системе</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            9 шагов от загрузки фото до заселения. AI берёт на себя всю рутину.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                variants={itemV}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{ position: "relative" }}
              >
                <div
                  className="glass-card-hover"
                  style={{ padding: "28px 24px", height: "100%", position: "relative", overflow: "hidden" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget.querySelector(".hover-bg") as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget.querySelector(".hover-bg") as HTMLElement).style.opacity = "0";
                  }}
                >
                  {/* Gradient on hover */}
                  <div
                    className="hover-bg"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "inherit",
                      background: `radial-gradient(ellipse at 30% 30%, ${step.color}, transparent 70%)`,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                    }}
                  />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Number + icon row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                      <span style={{ fontSize: 40, fontWeight: 700, color: "rgba(255,255,255,0.1)", lineHeight: 1 }}>
                        {step.n}
                      </span>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: "rgba(52,211,153,0.1)",
                          border: "1px solid rgba(52,211,153,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={22} color="#6ee7b7" />
                      </div>
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
