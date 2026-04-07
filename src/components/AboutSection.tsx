"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="#C89B3C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="#C89B3C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="#C89B3C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Прозрачность",
    description:
      "Полная ясность на каждом этапе — от дизайна до финальной сметы. Никаких скрытых цен и неожиданных изменений.",
    accent: "rgba(200,155,60,0.08)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#C89B3C" strokeWidth="1.5" />
        <path
          d="M12 7V12L15.5 15.5"
          stroke="#C89B3C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Экономия времени",
    description:
      "То, что раньше занимало недели согласований, теперь занимает минуты. AI обрабатывает данные мгновенно.",
    accent: "rgba(18,60,51,0.3)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12L11 14L15 10"
          stroke="#C89B3C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
          stroke="#C89B3C"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Уверенность",
    description:
      "Вы видите результат до начала работ. Принимайте решения осознанно, без риска и стресса.",
    accent: "rgba(200,155,60,0.08)",
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#081512" }}
    >
      {/* Background ambience */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(18,60,51,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-lg mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: "#C89B3C" }}
          >
            Что такое RenoAI
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: "#F5F7F6", letterSpacing: "-0.02em" }}
          >
            Ремонт нового уровня —
            <br />
            <span style={{ color: "#9BA8A3", fontWeight: 400 }}>
              без хаоса и неопределённости
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: "rgba(13,36,32,0.8)",
                border: "1px solid rgba(30,74,62,0.5)",
              }}
            >
              {/* Card accent glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: card.accent }}
              />

              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div
                  className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(18,60,51,0.6)",
                    border: "1px solid rgba(200,155,60,0.2)",
                  }}
                >
                  {card.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#F5F7F6", letterSpacing: "-0.01em" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9BA8A3" }}>
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-sm" style={{ color: "rgba(155,168,163,0.6)" }}>
            RenoAI — первая AI-платформа, объединяющая весь процесс ремонта
          </p>
        </motion.div>
      </div>
    </section>
  );
}
