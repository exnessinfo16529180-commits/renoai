"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Navigation      = dynamic(() => import("@/sections/Navigation"),      { ssr: false });
const HeroNew         = dynamic(() => import("@/sections/HeroNew"),         { ssr: false });
const FlowSteps       = dynamic(() => import("@/sections/FlowSteps"),       { ssr: false });
const DashboardPreview= dynamic(() => import("@/sections/DashboardPreview"),{ ssr: false });
const TrustSection    = dynamic(() => import("@/sections/TrustSection"),    { ssr: false });
const AudienceCards   = dynamic(() => import("@/sections/AudienceCards"),   { ssr: false });
const FinalCTA        = dynamic(() => import("@/sections/FinalCTA"),        { ssr: false });
const SiteFooter      = dynamic(() => import("@/sections/SiteFooter"),      { ssr: false });

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#052e16", overflowX: "hidden" }}>
      <Navigation scrollY={scrollY} />

      <main>
        <HeroNew />
        <FlowSteps />
        <DashboardPreview />
        <TrustSection />
        <AudienceCards />
        <FinalCTA />
      </main>

      <SiteFooter />
    </div>
  );
}
