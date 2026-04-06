"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("reveal"), 200);
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 1200);
          return 100;
        }
        return p + 2;
      });
    }, 24);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "reveal" ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "#081512" }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(18,60,51,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200,155,60,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-3 mb-16"
        >
          {/* Logo mark */}
          <div className="relative">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #123C33 0%, #0F3D2E 100%)",
                border: "1px solid rgba(200,155,60,0.3)",
                boxShadow: "0 0 30px rgba(200,155,60,0.15)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 3L24 8.5V19.5L14 25L4 19.5V8.5L14 3Z"
                  stroke="#C89B3C"
                  strokeWidth="1.5"
                  fill="rgba(200,155,60,0.1)"
                />
                <path
                  d="M14 9L19 11.75V17.25L14 20L9 17.25V11.75L14 9Z"
                  fill="#C89B3C"
                  opacity="0.6"
                />
                <circle cx="14" cy="14" r="2.5" fill="#C89B3C" />
              </svg>
            </div>
          </div>

          {/* Brand name */}
          <div className="text-center">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#F5F7F6", letterSpacing: "-0.02em" }}
            >
              Reno
              <span style={{ color: "#C89B3C" }}>AI</span>
            </span>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4 w-48"
        >
          {/* Progress bar */}
          <div
            className="w-full h-px overflow-hidden"
            style={{ background: "rgba(30,74,62,0.4)" }}
          >
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, #C89B3C, #D4A84B)",
                width: `${progress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress text */}
          <p className="text-xs tracking-widest" style={{ color: "#9BA8A3" }}>
            {progress < 100 ? "ЗАГРУЗКА..." : "ГОТОВО"}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
