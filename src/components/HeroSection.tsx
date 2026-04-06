"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// ─── MEDIA PLACEMENT INSTRUCTIONS ───────────────────────────────────────────
// Place your intro video at:  /public/assets/intro-video.mp4
// Place your hero image at:   /public/assets/final-hero-bg.jpg
//
// The component will automatically use the video as the background.
// If the video fails or is missing, it falls back to the static image.
// If the image is also missing, it shows the premium gradient fallback.
// ─────────────────────────────────────────────────────────────────────────────

const VIDEO_SRC = "/assets/intro-video.mp4";
const HERO_IMAGE_SRC = "/assets/final-hero-bg.jpg";

function FallbackBackground() {
  return (
    <div className="absolute inset-0">
      {/* Premium gradient fallback when no media is available */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, #1A5C4A 0%, #0F3D2E 30%, #081512 70%)",
        }}
      />
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,155,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,60,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Center ambient light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(200,155,60,0.08) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setVideoError(true));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── BACKGROUND MEDIA ── */}
      {/* Video background — place video at /public/assets/intro-video.mp4 */}
      {!videoError && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        />
      )}

      {/* Static image fallback — place image at /public/assets/final-hero-bg.jpg */}
      {(videoError || !videoLoaded) && !imageError && (
        <img
          src={HERO_IMAGE_SRC}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}

      {/* Gradient fallback when both video and image are unavailable */}
      {(videoError || !videoLoaded) && imageError && <FallbackBackground />}

      {/* Cinematic overlay gradient */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Ambient glow elements */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(18,60,51,0.35) 0%, transparent 70%)",
        }}
      />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(18,60,51,0.5)",
            border: "1px solid rgba(200,155,60,0.25)",
            backdropFilter: "blur(10px)",
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
          style={{
            color: "#F5F7F6",
            letterSpacing: "-0.03em",
            lineHeight: "1.1",
          }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-sm"
          style={{ color: "#9BA8A3" }}
        >
          AI объединяет дизайн, расчёты и реализацию в единую систему —
          быстро, точно и прозрачно.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col w-full gap-3 mb-8 sm:flex-row sm:justify-center"
        >
          {/* Primary CTA */}
          <button
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #C89B3C 0%, #B8892C 100%)",
              color: "#081512",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 30px rgba(200,155,60,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,155,60,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,155,60,0.25)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Начать проект
          </button>

          {/* Secondary CTA */}
          <button
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: "rgba(8,21,18,0.6)",
              border: "1px solid rgba(200,155,60,0.35)",
              color: "#C89B3C",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,155,60,0.1)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(8,21,18,0.6)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.35)";
            }}
          >
            {/* Play icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#C89B3C" strokeWidth="1.2" />
              <path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill="#C89B3C" />
            </svg>
            Смотреть демо
          </button>
        </motion.div>

        {/* Trust text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-xs leading-relaxed max-w-xs"
          style={{ color: "rgba(155,168,163,0.7)" }}
        >
          Загрузите планировку и получите дизайн и смету за несколько минут
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(200,155,60,0.3)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: "#C89B3C", opacity: 0.6 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
