"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const VIDEO_SRC = `${BASE}/assets/intro-video.mp4`;
const IMAGE_SRC = `${BASE}/assets/final-hero-bg.jpg`;

type Phase = "buffering" | "playing" | "hero";

export default function HeroSection({ onScrollDown }: { onScrollDown: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("buffering");
  const [imgError, setImgError] = useState(false);
  const onScrollRef = useRef(onScrollDown);
  onScrollRef.current = onScrollDown;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const goHero = () => setPhase("hero");
    const fallback = setTimeout(goHero, 14000);

    const onCanPlay = () => v.play().catch(goHero);
    const onPlaying = () => setPhase("playing");

    v.addEventListener("canplaythrough", onCanPlay, { once: true });
    v.addEventListener("playing", onPlaying, { once: true });
    v.addEventListener("ended", goHero, { once: true });
    v.addEventListener("error", goHero, { once: true });

    return () => {
      clearTimeout(fallback);
      v.removeEventListener("canplaythrough", onCanPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("ended", goHero);
      v.removeEventListener("error", goHero);
    };
  }, []);

  // Wheel + swipe to trigger scroll when on hero photo phase
  useEffect(() => {
    if (phase !== "hero") return;
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 10) onScrollRef.current(); };
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (startY - e.changedTouches[0].clientY > 40) onScrollRef.current();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [phase]);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: "#081512" }}>

      {/* ── Buffering spinner ── */}
      <AnimatePresence>
        {phase === "buffering" && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(18,60,51,0.5)", border: "1px solid rgba(200,155,60,0.2)" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2L20 7V15L11 20L2 15V7L11 2Z" stroke="#C89B3C" strokeWidth="1.3"
                  fill="rgba(200,155,60,0.08)" />
                <circle cx="11" cy="11" r="2.5" fill="#C89B3C" opacity="0.8" />
              </svg>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-7 h-7 rounded-full border-2"
              style={{ borderColor: "rgba(200,155,60,0.12)", borderTopColor: "#C89B3C" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Video (pure fullscreen, zero UI overlay) ── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          phase === "playing" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── Hero photo + scroll indicator ── */}
      <AnimatePresence>
        {phase === "hero" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {/* Background image or fallback gradient */}
            {!imgError ? (
              <img
                src={IMAGE_SRC}
                alt=""
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 60% at 50% 20%, #1A5C4A 0%, #0F3D2E 35%, #081512 80%)",
                }}
              />
            )}

            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0 hero-overlay" />

            {/* Logo mark — top center */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(18,60,51,0.65)", border: "1px solid rgba(200,155,60,0.22)" }}
              >
                <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5L16.5 5.5V12.5L9 16.5L1.5 12.5V5.5L9 1.5Z"
                    stroke="#C89B3C" strokeWidth="1.2" fill="rgba(200,155,60,0.08)" />
                  <circle cx="9" cy="9" r="2" fill="#C89B3C" opacity="0.85" />
                </svg>
              </div>
              <span className="text-base font-bold" style={{ color: "#F5F7F6", letterSpacing: "-0.02em" }}>
                Reno<span style={{ color: "#C89B3C" }}>AI</span>
              </span>
            </motion.div>

            {/* Scroll down indicator — bottom center */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              onClick={onScrollDown}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
              aria-label="Листайте вниз"
            >
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
              >
                <p
                  className="text-[10px] font-medium tracking-[0.3em] uppercase"
                  style={{ color: "rgba(200,155,60,0.85)" }}
                >
                  листайте
                </p>
                <div
                  className="w-px h-10 rounded-full"
                  style={{ background: "linear-gradient(to bottom, #C89B3C, transparent)" }}
                />
                <div className="w-2 h-2 rounded-full" style={{ background: "#C89B3C" }} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
