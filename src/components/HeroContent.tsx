"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function HeroContent({ onDemoOpen }: { onDemoOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #081512 0%, #0A1B17 100%)" }}
    >
      {/* Ambient glow from above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(18,60,51,0.45) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(18,60,51,0.5)",
            border: "1px solid rgba(200,155,60,0.25)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#C89B3C" }}
          />
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "#C89B3C" }}
          >
            AI-платформа для ремонта
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
          style={{ color: "#F5F7F6", letterSpacing: "-0.03em", lineHeight: "1.1" }}
        >
          Будущее ремонта
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #C89B3C 0%, #D4A84B 60%, #C89B3C 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            уже здесь
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-sm"
          style={{ color: "#9BA8A3" }}
        >
          AI объединяет дизайн, расчёты и реализацию в единую систему —
          быстро, точно и прозрачно.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.34 }}
          className="flex flex-col w-full gap-3"
        >
          {/* Primary */}
          <button
            className="w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #C89B3C 0%, #B8892C 100%)",
              color: "#081512",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 30px rgba(200,155,60,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,155,60,0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,155,60,0.25)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Начать проект
          </button>

          {/* Demo CTA */}
          <button
            onClick={onDemoOpen}
            className="w-full py-4 rounded-2xl text-sm font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: "rgba(8,21,18,0.7)",
              border: "1px solid rgba(200,155,60,0.35)",
              color: "#C89B3C",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,155,60,0.1)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(8,21,18,0.7)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.35)";
            }}
          >
            {/* Play icon */}
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="7.5" stroke="#C89B3C" strokeWidth="1.2" />
              <path d="M7 5.8L12 8.5L7 11.2V5.8Z" fill="#C89B3C" />
            </svg>
            Попробовать демо
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-8 text-xs"
          style={{ color: "rgba(155,168,163,0.55)" }}
        >
          Загрузите планировку и получите дизайн и смету за несколько минут
        </motion.p>
      </div>
    </section>
  );
}
