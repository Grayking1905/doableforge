import React, { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";

export default function HeroFrame({
  brandName = "DOABLEFORGE",
  supportingDescription = "Built for MNCs, IT enterprises, and AI labs to register mission-critical projects. Executed exclusively by top freelancers pre-verified by domain experts on practical skills, architectural contributions, and strict deadline velocity—never LinkedIn profiles, resumes, or pedigree.",
  ctaPrimaryText = "Register Project",
  ctaSecondaryText = "Expert Verification",
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      const vh = window.innerHeight || 800;
      // Reaches 1 after scrolling 40% of first viewport height
      const progress = Math.min(1, Math.max(0, scrollY / (vh * 0.4)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (target) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      
      {/* ======================================================== */}
      {/* LEFT/CENTER CONTENT                                       */}
      {/* Fades out gracefully as user scrubs into cinema stream    */}
      {/* ======================================================== */}
      <div 
        className="absolute inset-0 flex flex-col justify-center px-5 sm:px-12 md:px-16 lg:px-20 z-20 pointer-events-none pt-12 sm:pt-0 transition-opacity duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 1.4),
          transform: `translateY(-${scrollProgress * 24}px)`,
          pointerEvents: scrollProgress > 0.7 ? "none" : "auto",
        }}
      >
        <div className="max-w-sm sm:max-w-xl flex flex-col gap-3.5 sm:gap-6 pointer-events-auto">
          
          {/* Enterprise Kicker */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 text-[10px] sm:text-xs font-semibold text-sky-300 tracking-[0.15em] sm:tracking-[0.2em] uppercase backdrop-blur-md">
              Enterprise Project Registry
            </span>
          </div>

          {/* Supporting Description */}
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-200/95 font-normal leading-relaxed max-w-lg tracking-[-0.01em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {supportingDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 pt-1">
            <button
              type="button"
              onClick={() => handleScrollTo("#register")}
              className="apple-button-primary group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase cursor-pointer w-full xs:w-auto"
            >
              <span>{ctaPrimaryText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo("#verification")}
              className="apple-button-glass inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-mono tracking-wider cursor-pointer w-full xs:w-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{ctaSecondaryText}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* BRAND TITLE — responsive vw clamped, bottom-right        */}
      {/* ======================================================== */}
      <div 
        className="absolute right-2 sm:right-6 md:right-10 lg:right-12 bottom-6 sm:bottom-12 md:bottom-10 z-10 pointer-events-none select-none transition-opacity duration-300"
        style={{
          opacity: Math.max(0.25, 1 - scrollProgress * 0.75),
        }}
      >
        <h1 
          className="font-bebas leading-[0.8] tracking-[-0.03em] text-right text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-white/70 to-zinc-500/20 drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
          style={{
            fontSize: "clamp(3.5rem, 15vw, 12vw)",
          }}
        >
          {brandName}
        </h1>
      </div>

      {/* ======================================================== */}
      {/* SCROLL CUE (Bottom Center) — Clickable to jump to next   */}
      {/* ======================================================== */}
      <div 
        onClick={() => handleScrollTo("#marquee")}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto cursor-pointer flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-105"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 2.5),
          pointerEvents: scrollProgress > 0.4 ? "none" : "auto",
        }}
      >
        <div className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md shadow-lg hover:border-sky-400/40 hover:bg-black/70 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-zinc-300">
            Scroll to scrub cinema
          </span>
          <ChevronDown className="w-3 h-3 text-zinc-400" />
        </div>
      </div>

    </div>
  );
}
