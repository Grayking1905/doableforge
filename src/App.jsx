import React, { useRef } from "react";
import AppleNavBar from "./components/navigation/AppleNavBar";
import ScrollCanvas from "./components/canvas/ScrollCanvas";
import HeroFrame from "./components/hero/HeroFrame";
import LogoMarqueeSection from "./components/sections/LogoMarqueeSection";
import ForgeUniverse from "./components/three/ForgeUniverse";
import BentoGridSection from "./components/sections/BentoGridSection";
import MarketplaceExplorer from "./components/sections/MarketplaceExplorer";
import PseudonymClaimSection from "./components/sections/PseudonymClaimSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/footer/Footer";

export default function App() {
  const containerRef = useRef(null);

  return (
    <main className="relative w-full bg-[#040306] text-white selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Floating Apple Liquid Glass Navigation Pill Header */}
      <AppleNavBar />
      
      {/* ======================================================== */}
      {/* TALL SCROLL SECTION FOR CINEMATIC FRAME SCRUB ANIMATION   */}
      {/* Stays pinned while all 240 frames scrub from 0% to 100%   */}
      {/* ======================================================== */}
      <section id="hero" ref={containerRef} className="relative w-full h-[500vh]">
        
        {/* ====================================================== */}
        {/* FULL-SCREEN PINNED STICKY VIEWPORT                     */}
        {/* ====================================================== */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Full-Screen Sticky HTML5 Canvas Background (Frames 1 to 240) */}
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

      {/* ======================================================== */}
      {/* SECTION 1: INFINITE LOGO MARQUEE CAROUSEL                */}
      {/* Dual marquee streams: Technologies & Verification        */}
      {/* ======================================================== */}
      <LogoMarqueeSection />

      {/* ======================================================== */}
      {/* SECTION 2: THREE.JS INTERACTIVE VISUAL UNIVERSE          */}
      {/* 3D constellation of Talent, Skills, and Escrow Projects */}
      {/* ======================================================== */}
      <ForgeUniverse />

      {/* ======================================================== */}
      {/* SECTION 3: ASYMMETRIC BENTO GRID                         */}
      {/* Skill Passport, Blind Hiring, ForgeScore, AI Matching    */}
      {/* ======================================================== */}
      <BentoGridSection />

      {/* ======================================================== */}
      {/* SECTION 4: ENTERPRISE PROJECT & SPECIALIST REPOSITORIES  */}
      {/* Active escrow projects from MNCs & expert-audited talent */}
      {/* ======================================================== */}
      <MarketplaceExplorer />

      {/* ======================================================== */}
      {/* SECTION 5: ENTERPRISE PROJECT INTAKE & VERIFICATION GATE */}
      {/* Register MNC/AI project or submit code for expert audit  */}
      {/* ======================================================== */}
      <PseudonymClaimSection />

      {/* ======================================================== */}
      {/* SECTION 6: CLIENT & SPECIALIST CONTACT SECTION           */}
      {/* Direct email (contact@doableforge.com) & inquiry composer */}
      {/* ======================================================== */}
      <ContactSection />

      {/* ======================================================== */}
      {/* SECTION 7: INDUSTRY STANDARD COMPREHENSIVE FOOTER        */}
      {/* ======================================================== */}
      <Footer />

    </main>
  );
}
