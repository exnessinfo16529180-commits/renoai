"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy components for better performance
const LoadingIntro = dynamic(() => import("@/components/LoadingIntro"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const StickyCTA = dynamic(() => import("@/components/StickyCTA"), { ssr: false });

import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import ProductFlow from "@/components/ProductFlow";
import Benefits from "@/components/Benefits";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Loading intro — shows on first load */}
      <LoadingIntro onComplete={() => setIntroComplete(true)} />

      {/* Main site content */}
      <main
        className="relative"
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* 1. Hero Section with video/image background */}
        <HeroSection />

        {/* 2. About / Value Section */}
        <AboutSection />

        {/* 3. How It Works */}
        <HowItWorks />

        {/* 4. Product Flow Preview */}
        <ProductFlow />

        {/* 5. Benefits / Why RenoAI */}
        <Benefits />

        {/* 6. Final CTA */}
        <FinalCTA />

        {/* 7. Footer */}
        <Footer />
      </main>

      {/* Sticky mobile CTA — appears after scrolling past hero */}
      <StickyCTA />
    </>
  );
}
