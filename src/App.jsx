import React, { useRef } from "react";
import AppleNavBar from "./components/navigation/AppleNavBar";
import ScrollCanvas from "./components/canvas/ScrollCanvas";
import HeroFrame from "./components/hero/HeroFrame";
import LogoMarqueeSection from "./components/sections/LogoMarqueeSection";
import BentoGridSection from "./components/sections/BentoGridSection";
import MarketplaceExplorer from "./components/sections/MarketplaceExplorer";
import PseudonymClaimSection from "./components/sections/PseudonymClaimSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/footer/Footer";

export default function App() {
  const containerRef = useRef(null);

  return (
    <main className="relative w-full bg-[#040306] text-white selection:bg-sky-500/30 selection:text-sky-200 overflow-x-clip">
      
      {/* Floating Apple Liquid Glass Navigation Pill Header */}
      <AppleNavBar />
      
      {/* ======================================================== */}
      {/* TALL SCROLL SECTION FOR CINEMATIC FRAME SCRUB ANIMATION   */}
      {/* Carefully calibrated height: responsive, smooth scrubbing */}
      {/* ======================================================== */}
      <section
        id="hero"
        ref={containerRef}
        className="relative w-full h-[220vh] sm:h-[260vh] md:h-[300vh]"
      >
        
        {/* FULL-SCREEN PINNED STICKY VIEWPORT */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center">
          
          {/* Full-Screen Sticky HTML5 Canvas Background */}
          <div className="absolute inset-0 z-0">
            <ScrollCanvas containerRef={containerRef} totalFrames={240} />
          </div>

          {/* Hero Architectural UI Layered on Top */}
          <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto">
            <HeroFrame
              brandName="DOABLEFORGE"
              supportingDescription="Built for MNCs, IT enterprises, and AI labs to register mission-critical projects. Executed exclusively by top freelancers pre-verified by domain experts on practical skills, architectural contributions, and strict deadline velocity—never LinkedIn profiles, resumes, or pedigree."
              ctaPrimaryText="Register Project"
              ctaSecondaryText="Expert Verification"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: INFINITE LOGO MARQUEE CAROUSEL */}
      <LogoMarqueeSection />

      {/* SECTION 2: ASYMMETRIC BENTO GRID */}
      <BentoGridSection />

      {/* SECTION 3: ENTERPRISE PROJECT & SPECIALIST REPOSITORIES */}
      <MarketplaceExplorer />

      {/* SECTION 4: ENTERPRISE PROJECT INTAKE & VERIFICATION GATE */}
      <PseudonymClaimSection />

      {/* SECTION 5: CLIENT & SPECIALIST CONTACT SECTION */}
      <ContactSection />

      {/* SECTION 6: COMPREHENSIVE FOOTER */}
      <Footer />

    </main>
  );
}
