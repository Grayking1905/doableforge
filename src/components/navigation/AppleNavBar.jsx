import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Orbit, 
  Award, 
  Briefcase,
  Mail
} from "lucide-react";

export default function AppleNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ["hero", "universe", "verification", "projects", "register", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Topology", href: "#universe", id: "universe", icon: Orbit },
    { name: "Verification", href: "#verification", id: "verification", icon: Award },
    { name: "Projects", href: "#projects", id: "projects", icon: Briefcase },
    { name: "Register", href: "#register", id: "register", icon: ShieldCheck },
    { name: "Contact", href: "#contact", id: "contact", icon: Mail },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none select-none">
      {/* Floating Apple Liquid Glass Capsule */}
      <nav 
        className={`pointer-events-auto relative w-full max-w-6xl xl:max-w-7xl rounded-full flex items-center justify-between px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 overflow-hidden ${
          scrolled ? "apple-liquid-glass-navbar-scrolled" : "apple-liquid-glass-navbar"
        }`}
      >
        {/* Specular Glint Reflection Line across top curvature */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        
        {/* Subtle Ambient Refractive Sky Glow */}
        <div className="pointer-events-none absolute -top-10 left-1/4 w-48 h-20 bg-sky-400/20 blur-xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-10 right-1/4 w-48 h-20 bg-blue-500/15 blur-xl rounded-full" />

        {/* ======================================================== */}
        {/* LEADING EDGE: Standalone Brand Logo (Icon on Left + Text) */}
        {/* ======================================================== */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "#hero")}
          className="relative z-10 flex items-center group cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98] pointer-events-auto shrink-0"
          aria-label="DoableForge Home"
          title="DoableForge"
        >
          <img
            src="/logo.png"
            alt="DoableForge"
            className="h-[21px] sm:h-[23px] md:h-[26px] w-auto object-contain drop-shadow-[0_0_14px_rgba(56,189,248,0.45)] group-hover:drop-shadow-[0_0_22px_rgba(56,189,248,0.75)] transition-all duration-300"
          />
        </a>

        {/* ======================================================== */}
        {/* CENTER AREA: Apple Segmented Navigation Glass Pill        */}
        {/* ======================================================== */}
        <div className="relative z-10 hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/[0.14] backdrop-blur-xl shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/20 text-white font-semibold border border-white/25 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.35)]"
                    : "text-zinc-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TRAILING EDGE: Telemetry Badge + Prominent Action Button */}
        {/* ======================================================== */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          {/* Live Network Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span className="font-mono text-[10px] text-sky-100 tracking-wider font-medium">
              Escrow Active
            </span>
          </div>

          {/* Prominent Action Button (.prominent role in Apple HIG) */}
          <a
            href="#register"
            onClick={(e) => handleNavClick(e, "#register")}
            className="apple-button-primary inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full font-semibold text-xs tracking-wider uppercase cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.3),0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_6px_28px_rgba(56,189,248,0.55)] active:scale-[0.97]"
          >
            <span>Register Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* ========================================================== */}
      {/* MOBILE LIQUID GLASS DROPDOWN MENU                          */}
      {/* ========================================================== */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-16 sm:top-18 left-3 sm:left-6 right-3 sm:right-6 rounded-[28px] bg-[#0a1224]/95 border border-white/20 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-3xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto -mt-2 mb-1" />
          
          <div className="flex flex-col gap-1 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <link.icon className="w-4 h-4 text-sky-400" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-[11px] text-zinc-400">Zero Resume Bias</span>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">100% Blind Vault</span>
          </div>
        </div>
      )}
    </header>
  );
}
