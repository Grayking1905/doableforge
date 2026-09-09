import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function HeroFrame({
  brandName = "DOABLEFORGE",
  supportingDescription = "Built for MNCs, IT enterprises, and AI labs to register mission-critical projects. Executed exclusively by top freelancers pre-verified by domain experts on practical skills, architectural contributions, and strict deadline velocity—never LinkedIn profiles, resumes, or pedigree.",
  ctaPrimaryText = "Register Project",
  ctaSecondaryText = "Expert Verification",
}) {
  const handleScrollTo = (target) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen select-none overflow-hidden">
      
      {/* ========================================================== */}
      {/* LEFT CONTENT: Supporting copy & CTAs at original position  */}
      {/* ========================================================== */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 z-20 pointer-events-none">
        <div className="max-w-xl flex flex-col gap-6 pointer-events-auto">
          
          {/* Enterprise Kicker */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 text-xs font-semibold text-sky-300 tracking-[0.2em] uppercase backdrop-blur-md">
              Enterprise Project Registry
            </span>
          </div>

          {/* Concise Supporting Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200/95 font-normal leading-relaxed max-w-lg tracking-[-0.01em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {supportingDescription}
          </p>

          {/* Action Buttons: Register Project & Expert Verification */}
          <div className="flex items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => handleScrollTo("#register")}
              className="apple-button-primary group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase cursor-pointer"
            >
              <span>{ctaPrimaryText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo("#verification")}
              className="apple-button-glass inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono tracking-wider cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{ctaSecondaryText}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================== */}
      {/* TITLE AT BOTTOM-RIGHT (Exact Original Position)            */}
      {/* ========================================================== */}
      <div className="absolute right-3 sm:right-6 md:right-10 lg:right-12 bottom-12 sm:bottom-14 md:bottom-10 z-10 pointer-events-none select-none">
        <h1 
          className="font-bebas text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-bold leading-[0.8] tracking-[-0.03em] text-right text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-white/70 to-zinc-500/20 drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
        >
          {brandName}
        </h1>
      </div>

      {/* ========================================================== */}
      {/* APPLE SUBTLE SCROLL CUE (Bottom Center)                    */}
      {/* ========================================================== */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-zinc-300">
            Scroll to scrub cinema
          </span>
        </div>
      </div>

    </div>
  );
}
