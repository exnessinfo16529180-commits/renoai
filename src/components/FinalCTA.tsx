"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#081512" }}
    >
      {/* Dramatic background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(18,60,51,0.45) 0%, transparent 70%)",
        }}
      />

      {/* Gold accent glow top */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,155,60,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Decorative border top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,155,60,0.4), transparent)",
        }}
      />

      <div className="relative max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(18,60,51,0.5)",
            border: "1px solid rgba(200,155,60,0.25)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#C89B3C" }}
          />
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "#C89B3C" }}
          >
            Начните прямо сейчас
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
          style={{ color: "#F5F7F6", letterSpacing: "-0.03em" }}
        >
          Начните проект
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #C89B3C 0%, #D4A84B 60%, #C89B3C 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            с RenoAI
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-base leading-relaxed mb-10 max-w-sm"
          style={{ color: "#9BA8A3" }}
        >
          Загрузите планировку, получите визуализацию и сделайте первый шаг
          к ремонту нового уровня.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.34 }}
          className="flex flex-col w-full gap-3 mb-10"
        >
          {/* Primary */}
          <button
            className="w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #C89B3C 0%, #B8892C 100%)",
              color: "#081512",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 40px rgba(200,155,60,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 50px rgba(200,155,60,0.45)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 40px rgba(200,155,60,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Начать проект
          </button>

          {/* Secondary */}
          <button
            className="w-full py-4 rounded-2xl text-sm font-medium transition-all duration-300 active:scale-95"
            style={{
              background: "rgba(8,21,18,0.6)",
              border: "1px solid rgba(200,155,60,0.3)",
              color: "#C89B3C",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,155,60,0.08)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(8,21,18,0.6)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.3)";
            }}
          >
            Связаться с нами
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-6">
            {[
              { value: "5 мин", label: "до первого дизайна" },
              { value: "0 ₸", label: "для старта" },
              { value: "100%", label: "прозрачность" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-lg font-bold"
                  style={{ color: "#C89B3C", letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "rgba(155,168,163,0.6)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative border */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(30,74,62,0.5), transparent)",
        }}
      />
    </section>
  );
}
