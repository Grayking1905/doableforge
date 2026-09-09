import React from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Orbit, 
  Lock, 
  Database, 
  Zap, 
  Terminal, 
  Workflow, 
  GitBranch, 
  CheckCircle2, 
  Award,
  EyeOff
} from "lucide-react";

const techLogos = [
  { name: "Enterprise AI & pgvector", category: "Vector Retrieval & Agent Memory", icon: Cpu },
  { name: "FastAPI Microservices", category: "15,000+ Req/Sec Async Engine", icon: Terminal },
  { name: "Three.js / WebGPU", category: "Spatial Topology & Shaders", icon: Orbit },
  { name: "Distributed Redis Pipelines", category: "Sub-Millisecond Event Streams", icon: Zap },
  { name: "Isolated Enterprise Vaults", category: "AES-256 Encrypted PostgreSQL", icon: Database },
  { name: "Automated Code Auditing", category: "Continuous Benchmark Pipelines", icon: Workflow },
  { name: "Zero-Leak Cryptography", category: "Argon2 Sovereign Identities", icon: Lock },
  { name: "React 19 Architecture", category: "Zero-Latency Client Dashboards", icon: Layers },
];

const protocolLogos = [
  { name: "Domain Expert Verification", category: "Audited by Senior Tech Leads", icon: Award },
  { name: "Strict Deadline SLA", category: "Guaranteed On-Time Delivery", icon: CheckCircle2 },
  { name: "Zero Pedigree Bias", category: "Verified Code over Resumes", icon: EyeOff },
  { name: "Regulated Milestone Escrow", category: "Pre-Funded Vault Protection", icon: ShieldCheck },
  { name: "Enterprise Clean Room IP", category: "Strict NDA & IP Isolation", icon: Lock },
  { name: "Contribution Benchmarking", category: "Live Architecture & PR Proof", icon: GitBranch },
  { name: "Sovereign Pseudonyms", category: "Zero Employment Conflict", icon: ShieldCheck },
];

export default function LogoMarqueeSection() {
  return (
    <section id="marquee" className="relative w-full py-20 sm:py-28 bg-[#05070f] overflow-hidden border-t border-white/[0.06] select-none">
      
      {/* Subtle Apple Ambient Lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-sky-500/5 blur-[140px]" />

      {/* Section Header: Apple Typography Hierarchy */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center mb-14 sm:mb-18">
        <span className="text-xs font-semibold text-sky-400 tracking-[0.25em] uppercase mb-3">
          Enterprise Standards & Stacks
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white leading-tight">
          Trusted by enterprise teams to ship complex systems.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
          MNCs, high-growth IT enterprises, and AI frontier labs register mission-critical repositories on DoableForge, confident in our domain expert verification and strict deadline guarantees.
        </p>
      </div>

      {/* Stream 1: Forward Marquee (Technology Foundations) */}
      <div className="relative w-full overflow-hidden mb-5 flex items-center">
        {/* Edge Fades for Seamless Infinite Loop */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#05070f] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#05070f] to-transparent z-20" />

        <div className="animate-marquee flex gap-4 sm:gap-5 py-2">
          {[...techLogos, ...techLogos].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`tech-${idx}`}
                className="group shrink-0 flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-sky-400/35 backdrop-blur-xl transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-sky-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] tracking-wide text-zinc-400 group-hover:text-sky-300 transition-colors">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stream 2: Reverse Marquee (Trust & Verification Protocols) */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Edge Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#05070f] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#05070f] to-transparent z-20" />

        <div className="animate-marquee-reverse flex gap-4 sm:gap-5 py-2">
          {[...protocolLogos, ...protocolLogos].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`protocol-${idx}`}
                className="group shrink-0 flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-sky-400/35 backdrop-blur-xl transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-sky-200" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] tracking-wide text-zinc-400 group-hover:text-sky-300 transition-colors">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
