import { useEffect, useState } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import FlowSteps from './sections/FlowSteps';
import DashboardPreview from './sections/DashboardPreview';
import TrustSection from './sections/TrustSection';
import AudienceCards from './sections/AudienceCards';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-emerald-950 overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      
      <main>
        <Hero />
        <FlowSteps />
        <DashboardPreview />
        <TrustSection />
        <AudienceCards />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
