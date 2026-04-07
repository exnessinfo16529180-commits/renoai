"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [demoOpen, setDemoOpen] = useState(false);
  const scrollHandledRef = useRef(false);

  // Lock scroll while the hero plays. The page always starts at Y=0 so
  // simple overflow:hidden is safe — it won't shift scroll position.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleScrollDown = useCallback(() => {
    // Guard against double-fire from wheel/touch events
    if (scrollHandledRef.current) return;
    scrollHandledRef.current = true;
    document.body.style.overflow = "";

    // Scroll to main-content using an instant jump (no smooth animation).
    // Smooth scroll would start an animation that fights mobile momentum and
    // pulls the user back if they've already swiped past the target.
    // Guard: if the user's gesture already carried them past the target
    // (iOS can scroll even through overflow:hidden), don't scroll backward.
    const mainEl = document.getElementById("main-content");
    if (mainEl) {
      const mainTop = mainEl.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY < mainTop) {
        window.scrollTo(0, mainTop);
      }
    }
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
