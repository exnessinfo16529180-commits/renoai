"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show sticky CTA after scrolling past the hero (approx 100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
        >
          {/* Frosted container */}
          <div
            className="max-w-lg mx-auto rounded-2xl p-3 flex items-center gap-3"
            style={{
              background: "rgba(8,21,18,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(30,74,62,0.5)",
              boxShadow: "0 -4px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,155,60,0.05)",
            }}
          >
            {/* Logo mark */}
            <div
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(18,60,51,0.8)",
                border: "1px solid rgba(200,155,60,0.2)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z"
                  stroke="#C89B3C"
                  strokeWidth="1.3"
                  fill="rgba(200,155,60,0.1)"
                />
                <circle cx="10" cy="10" r="2" fill="#C89B3C" opacity="0.8" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#F5F7F6" }}>
                Начните свой ремонт с AI
              </p>
              <p className="text-[10px] truncate" style={{ color: "#9BA8A3" }}>
                Дизайн и смета за 5 минут
              </p>
            </div>

            {/* CTA button */}
            <button
              className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #C89B3C, #B8892C)",
                color: "#081512",
                boxShadow: "0 4px 15px rgba(200,155,60,0.3)",
              }}
            >
              Начать
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
