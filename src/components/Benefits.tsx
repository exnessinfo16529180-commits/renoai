"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="16" rx="3" stroke="#C89B3C" strokeWidth="1.5" />
        <path d="M8 9L11 12L16 7" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="19" r="1" fill="#C89B3C" opacity="0.5" />
        <path d="M9 21H15" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: "Видите результат заранее",
    description:
      "Фотореалистичная 3D-визуализация вашей квартиры до начала любых работ. Принимайте решения с открытыми глазами.",
    tag: "Дизайн",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#C89B3C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="#C89B3C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="#C89B3C" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Понимаете ориентировочный бюджет",
    description:
      "Подробная смета по каждой позиции — материалы, работа, доставка. Никаких сюрпризов в процессе ремонта.",
    tag: "Бюджет",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#C89B3C" strokeWidth="1.5" />
        <rect x="9" y="3" width="6" height="4" rx="1.5" stroke="#C89B3C" strokeWidth="1.5" />
        <path d="M9 12H15M9 16H13" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Получаете понятный путь",
    description:
      "Пошаговый план реализации — от демонтажа до финишной отделки. Каждый этап чётко расписан и понятен.",
    tag: "Планирование",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#C89B3C" strokeWidth="1.5" />
        <path d="M12 8V12L15 15" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 3.33782C8.4491 2.48697 10.1633 2 12 2" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: "Снижаете риск переплат",
    description:
      "AI отслеживает рыночные цены и помогает выбирать поставщиков. Вы платите справедливую цену, не больше.",
    tag: "Экономия",
  },
];

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #081512 0%, #0A1B17 50%, #081512 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(18,60,51,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-60 h-60 -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,155,60,0.06) 0%, transparent 70%)",
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
            Почему RenoAI
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: "#F5F7F6", letterSpacing: "-0.02em" }}
          >
            Ремонт без стресса —
            <br />
            <span style={{ color: "#9BA8A3", fontWeight: 400 }}>это возможно</span>
          </h2>
        </motion.div>

        {/* Benefits grid */}
        <div className="flex flex-col gap-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.1 }}
              className="relative rounded-3xl p-6 overflow-hidden group"
              style={{
                background: "rgba(13,36,32,0.5)",
                border: "1px solid rgba(30,74,62,0.45)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "rgba(200,155,60,0.04)" }}
              />

              <div className="relative flex items-start gap-4">
                {/* Icon container */}
                <div
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(18,60,51,0.7)",
                    border: "1px solid rgba(200,155,60,0.18)",
                  }}
                >
                  {benefit.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3
                      className="text-base font-semibold leading-tight"
                      style={{ color: "#F5F7F6", letterSpacing: "-0.01em" }}
                    >
                      {benefit.title}
                    </h3>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                      style={{
                        background: "rgba(200,155,60,0.12)",
                        color: "#C89B3C",
                        border: "1px solid rgba(200,155,60,0.18)",
                      }}
                    >
                      {benefit.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#9BA8A3" }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          className="mt-10 rounded-2xl p-5 flex gap-4"
          style={{
            background: "rgba(18,60,51,0.2)",
            border: "1px solid rgba(200,155,60,0.12)",
          }}
        >
          <div
            className="w-1 rounded-full shrink-0"
            style={{
              background: "linear-gradient(to bottom, #C89B3C, rgba(200,155,60,0.2))",
            }}
          />
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "#F5F7F6" }}>
              Традиционный ремонт — это хаос
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#9BA8A3" }}>
              Непрозрачные сметы, переплаты, задержки сроков и стресс.
              RenoAI устраняет все эти проблемы — системно и технологично.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
