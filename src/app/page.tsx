"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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

  // No scroll locking. No forced repositioning. No overflow manipulation.
  // The hero is a normal full-screen section — users scroll past it naturally.
  // This handler is called only by the "Листайте" button click.
  const handleScrollDown = () => {
    document.getElementById("main-content")?.scrollIntoView();
  };

  return (
    <>
      <HeroSection onScrollDown={handleScrollDown} />

      <main id="main-content">
        <HeroContent onDemoOpen={() => setDemoOpen(true)} />
        <AboutSection />
        <HowItWorks />
        <ProductFlow />
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
