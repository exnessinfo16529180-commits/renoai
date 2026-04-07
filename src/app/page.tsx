"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy/client-only components
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const DemoFlow   = dynamic(() => import("@/components/DemoFlow"),    { ssr: false });
const StickyCTA  = dynamic(() => import("@/components/StickyCTA"),   { ssr: false });

import HeroContent  from "@/components/HeroContent";
import AboutSection from "@/components/AboutSection";
import HowItWorks   from "@/components/HowItWorks";
import ProductFlow  from "@/components/ProductFlow";
import Benefits     from "@/components/Benefits";
import FinalCTA     from "@/components/FinalCTA";
import Footer       from "@/components/Footer";

export default function Home() {
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [demoOpen,     setDemoOpen]     = useState(false);

  // Lock scroll until user explicitly scrolls past the hero
  useEffect(() => {
    if (heroScrolled) return;

    document.documentElement.style.overflow = "hidden";

    // iOS Safari: also block touchmove
    const block = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", block, { passive: false });

    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("touchmove", block);
    };
  }, [heroScrolled]);

  const handleScrollDown = useCallback(() => {
    setHeroScrolled(true);
    // Give browser one frame to release the lock, then smooth-scroll
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }, []);

  return (
    <>
      {/* ── Full-screen video → photo hero ── */}
      <HeroSection onScrollDown={handleScrollDown} />

      {/* ── All content below the hero ── */}
      <main id="main-content">
        {/* Headline + CTAs that appear after scroll */}
        <HeroContent onDemoOpen={() => setDemoOpen(true)} />

        <AboutSection />
        <HowItWorks />
        <ProductFlow />
        <Benefits />
        <FinalCTA />
        <Footer />
      </main>

      {/* ── Interactive demo modal ── */}
      {demoOpen && <DemoFlow onClose={() => setDemoOpen(false)} />}

      {/* ── Sticky bottom CTA (appears after scrolling past hero) ── */}
      <StickyCTA />
    </>
  );
}
