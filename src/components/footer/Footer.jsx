import React from "react";
import { ChevronUp, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { name: "Topology", href: "#universe" },
    { name: "Verification", href: "#verification" },
    { name: "Projects", href: "#projects" },
    { name: "Register", href: "#register" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative w-full bg-[#04060c] text-white border-t border-white/[0.08] select-none overflow-hidden">
      {/* Subtle Ambient Apple Sky Blue Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[180px] bg-sky-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-10 sm:py-12 flex flex-col gap-8">
        
        {/* Main Minimal Row: Brand + Navigation Links + Scroll to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Logo (Only Logo) */}
          <div className="flex flex-col gap-1 items-start">
            <img
              src="/logo.png"
              alt="DoableForge"
              className="h-6 sm:h-[26px] md:h-[28px] w-auto object-contain opacity-95 hover:opacity-100 transition-opacity drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]"
            />
            <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
              Enterprise Project Registry
            </span>
          </div>

          {/* Minimal Inline Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Back to Top Minimal Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white font-mono text-xs transition-all duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

        {/* Minimal Sub-Row: Status + Direct Email + Copyright */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Mainnet Escrow Online
            </span>
            <span className="text-zinc-600">•</span>
            <a 
              href="mailto:contact@doableforge.com"
              className="text-sky-400 hover:text-sky-300 transition-colors underline decoration-sky-500/30 underline-offset-4"
            >
              contact@doableforge.com
            </a>
            <span className="text-zinc-600">•</span>
            <span>Pre-Verified by Domain Experts</span>
            <span className="text-zinc-600">•</span>
            <span>Strict Deadline SLA</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} DoableForge. Built for MNCs, IT & AI Leaders.</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
