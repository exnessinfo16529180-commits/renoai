"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Загрузите планировку или фото",
    description:
      "Просто сфотографируйте текущее пространство или загрузите план квартиры — AI сделает всё остальное.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="3" stroke="#C89B3C" strokeWidth="1.4" />
        <path
          d="M7 9.5L10 12.5L13 9.5L16 13"
          stroke="#C89B3C"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8" r="1.5" fill="#C89B3C" opacity="0.6" />
        <path
          d="M11 4V2M11 2L9.5 3.5M11 2L12.5 3.5"
          stroke="#C89B3C"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Выберите стиль",
    description:
      "Просмотрите коллекцию стилей — скандинавский, минимализм, лофт, классика. Укажите предпочтения за 30 секунд.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#C89B3C" strokeWidth="1.4" />
        <circle cx="7.5" cy="9" r="2" fill="#C89B3C" opacity="0.4" />
        <circle cx="14.5" cy="9" r="2" fill="#C89B3C" opacity="0.7" />
        <circle cx="11" cy="14" r="2" fill="#C89B3C" opacity="0.9" />
        <path d="M9.5 9L11 14L14.5 9" stroke="#C89B3C" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Получите AI-визуализацию",
    description:
      "Фотореалистичный 3D-рендер вашей квартиры в выбранном стиле — готов через несколько минут.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 7L11 3L19 7V15L11 19L3 15V7Z"
          stroke="#C89B3C"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M11 3V11M11 11L3 7M11 11L19 7"
          stroke="#C89B3C"
          strokeWidth="1.4"
          opacity="0.5"
        />
        <circle cx="11" cy="11" r="2" fill="#C89B3C" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Получите предварительную смету",
    description:
      "Детальный расчёт материалов и работ по рыночным ценам. Прозрачно и без скрытых наценок.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="2" width="14" height="18" rx="3" stroke="#C89B3C" strokeWidth="1.4" />
        <path d="M8 8H14" stroke="#C89B3C" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 12H14" stroke="#C89B3C" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 16H11" stroke="#C89B3C" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14.5" cy="15.5" r="0.8" fill="#C89B3C" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #081512 0%, #0A1B17 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,155,60,0.06) 0%, transparent 70%)",
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
            Как это работает
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "#F5F7F6", letterSpacing: "-0.02em" }}
          >
            Четыре шага
            <br />
            <span style={{ color: "#9BA8A3", fontWeight: 400 }}>к готовому проекту</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.13 }}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[21px] top-[52px] bottom-0 w-px">
                  <div
                    className="w-full h-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(200,155,60,0.3) 0%, rgba(200,155,60,0.05) 100%)",
                    }}
                  />
                </div>
              )}

              {/* Step number + icon */}
              <div className="shrink-0 flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: "rgba(18,60,51,0.7)",
                    border: "1px solid rgba(200,155,60,0.25)",
                  }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1.5">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: "rgba(200,155,60,0.5)" }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "rgba(30,74,62,0.4)" }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2 leading-tight"
                  style={{ color: "#F5F7F6", letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9BA8A3" }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 p-5 rounded-2xl text-center"
          style={{
            background: "rgba(18,60,51,0.25)",
            border: "1px solid rgba(200,155,60,0.15)",
          }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: "#F5F7F6" }}>
            Весь процесс занимает от 5 минут
          </p>
          <p className="text-xs" style={{ color: "#9BA8A3" }}>
            Без созвонов, без ожидания, без бюрократии
          </p>
        </motion.div>
      </div>
    </section>
  );
}
