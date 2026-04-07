"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy/client-only components
const HeroSection        = dynamic(() => import("@/components/HeroSection"),        { ssr: false });
const DemoFlow           = dynamic(() => import("@/components/DemoFlow"),            { ssr: false });
const StickyCTA          = dynamic(() => import("@/components/StickyCTA"),           { ssr: false });
const ResidentialSection = dynamic(() => import("@/components/ResidentialSection"), { ssr: false });

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

  // Lock scroll while hero video / photo plays.
  // Uses position:fixed trick to prevent the "snap back to top" bug
  // that occurs when overflow:hidden is released and scrollY resets.
  useEffect(() => {
    if (heroScrolled) return;

    const savedY = window.scrollY;
    document.body.style.position   = "fixed";
    document.body.style.top        = `-${savedY}px`;
    document.body.style.width      = "100%";
    document.body.style.overflowY  = "scroll";

    const block = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", block, { passive: false });

    return () => {
      const restoredY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position  = "";
      document.body.style.top       = "";
      document.body.style.width     = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, restoredY);
      document.removeEventListener("touchmove", block);
    };
  }, [heroScrolled]);

  const handleScrollDown = useCallback(() => {
    setHeroScrolled(true);
    // After the lock-release cleanup restores scroll position,
    // smooth-scroll to main content in the next paint.
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
        <HeroContent onDemoOpen={() => setDemoOpen(true)} />
        <AboutSection />
        <HowItWorks />
        <ProductFlow />

        {/* ── Partner residential complexes ── */}
        <ResidentialSection />

        <Benefits />
        <FinalCTA />
        <Footer />
      </main>

      {demoOpen && <DemoFlow onClose={() => setDemoOpen(false)} />}
      <StickyCTA />
    </>
  );
}
