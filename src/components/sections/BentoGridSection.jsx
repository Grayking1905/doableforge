import React, { useState } from "react";
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  Cpu, 
  ArrowUpRight, 
  Send, 
  CheckCircle2, 
  Clock, 
  Workflow, 
  Box, 
  Zap, 
  Activity,
  ShieldCheck, 
  EyeOff,
  Lock,
  Flame,
  Award,
  AlertTriangle,
  FileCheck
} from "lucide-react";

export default function BentoGridSection() {
  const [blindToggle, setBlindToggle] = useState(true); // true = DoableForge Blind Profile, false = Traditional CV
  const [activeSkill, setActiveSkill] = useState("React");
  const [matchingPrompt, setMatchingPrompt] = useState("AI SaaS Dashboard with OpenAI API & Postgres");
  const [matchedCandidate, setMatchedCandidate] = useState({
    name: "Dev_Forge_482",
    match: "96%",
    skills: ["React 19", "Python", "pgvector"],
  });

  const skillScores = {
    React: { score: 92, quality: 94, security: 90, arch: 92 },
    FastAPI: { score: 95, quality: 96, security: 94, arch: 95 },
    "AI / pgvector": { score: 91, quality: 90, security: 89, arch: 94 },
    "System Design": { score: 88, quality: 89, security: 92, arch: 88 },
  };

  return (
    <section id="verification" className="relative w-full py-24 sm:py-32 bg-[#05070f] overflow-hidden border-t border-white/[0.06] select-none">
      
      {/* Subtle Apple Ambient Depth */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[400px] bg-sky-500/5 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-[600px] h-[300px] bg-blue-600/5 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Header: Apple Typography Hierarchy */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="text-xs font-semibold text-sky-400 tracking-[0.25em] uppercase mb-3">
            The Enterprise Verification Standard
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight max-w-4xl">
            Audited skills & deadline velocity. Not LinkedIn or resumes.
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            MNCs, IT enterprises, and AI companies waste months on pedigree filtering and embellished CVs. DoableForge replaces resumes with rigorous domain expert code audits, real architectural contributions, and strict on-time delivery guarantees.
          </p>
        </div>

        {/* ============================================================ */}
        {/* ASYMMETRIC BENTO GRID CONTAINER                              */}
        {/* ============================================================ */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* ========================================================== */}
          {/* CARD 1 (Top-Left, Wide: 50% width / 6 cols)                */}
          {/* EXPERT AUDITED SKILL PASSPORT                              */}
          {/* ========================================================== */}
          <div className="glass-card md:col-span-12 lg:col-span-6 rounded-[32px] p-7 sm:p-9 flex flex-col justify-between overflow-hidden group">
            {/* Top Text Header */}
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-xs font-medium text-sky-400 tracking-wider uppercase">
                Domain Expert Verification
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
                Pre-verified before touching your code.
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
                Every specialist is vetted by senior engineering architects through live code testbeds and pull request audits. Zero self-reported claims.
              </p>
            </div>

            {/* Bottom Visual: Apple Developer Identity Card */}
            <div className="relative w-full rounded-2xl bg-[#090f20]/90 border border-white/[0.12] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] flex flex-col gap-4 mt-auto">
              {/* Passport Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/25 flex items-center justify-center">
                    <Award className="w-4 h-4 text-sky-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white tracking-wide">Expert Audited Capability Profile</span>
                    <span className="text-[10px] font-mono text-zinc-400">ID: Dev_Forge_482 • Pseudonymous Specialist</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 font-mono text-[10px] text-emerald-300 font-medium">
                  Audited by Domain Lead
                </span>
              </div>

              {/* Skill Tabs - Apple Segmented Control */}
              <div className="grid grid-cols-4 gap-1 p-1 rounded-full bg-black/40 border border-white/10 font-mono text-[10px]">
                {Object.keys(skillScores).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setActiveSkill(skill)}
                    className={`py-1.5 px-2 rounded-full transition-all truncate cursor-pointer ${
                      activeSkill === skill
                        ? "bg-white/20 text-white font-medium border border-white/25 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {/* Active Skill Breakdown Bars */}
              <div className="flex flex-col gap-2.5 pt-1 font-mono text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-zinc-300 font-medium">{activeSkill} Domain Benchmark:</span>
                  <span className="text-2xl font-semibold text-sky-300 leading-none">
                    {skillScores[activeSkill].score} / 100
                  </span>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-sky-400 to-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skillScores[activeSkill].score}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-white/10 text-[10px] text-zinc-400">
                  <div>
                    <span className="block text-zinc-500 font-medium">Code Precision</span>
                    <span className="text-white font-semibold">{skillScores[activeSkill].quality}/100</span>
                  </div>
                  <div>
                    <span className="block text-zinc-500 font-medium">Security Harness</span>
                    <span className="text-emerald-400 font-semibold">{skillScores[activeSkill].security}/100</span>
                  </div>
                  <div>
                    <span className="block text-zinc-500 font-medium">Architecture Proof</span>
                    <span className="text-sky-300 font-semibold">{skillScores[activeSkill].arch}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 2 (Top-Middle, Narrow: 25% width / 3 cols)            */}
          {/* ANTI-PEDIGREE PROTOCOL                                     */}
          {/* ========================================================== */}
          <div className="glass-card md:col-span-6 lg:col-span-3 rounded-[32px] p-7 flex flex-col justify-between overflow-hidden group">
            {/* Top Text Header */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-xs font-medium text-sky-400 tracking-wider uppercase">
                Anti-Pedigree Protocol
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
                Zero resume or pedigree bias.
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                Big Tech logos and college brands fail to predict delivery speed. We evaluate purely on live technical execution.
              </p>
            </div>

            {/* Bottom Visual: Interactive Toggle Comparison Card */}
            <div className="relative w-full p-4 rounded-2xl bg-[#090f20]/90 border border-white/[0.12] flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[10px] text-zinc-400 font-medium uppercase font-mono">Evaluation Mode</span>
                <button
                  onClick={() => setBlindToggle(!blindToggle)}
                  className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 text-[9px] font-mono font-medium hover:bg-sky-500/25 transition-colors cursor-pointer"
                >
                  {blindToggle ? "DoableForge Standard" : "Traditional Resume"}
                </button>
              </div>

              {blindToggle ? (
                <div className="flex flex-col gap-2 font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-sky-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>EXPERT AUDITED: Dev_Forge_482</span>
                  </div>
                  <div className="text-zinc-300">CONTRIBUTIONS: 42 PRs Merged</div>
                  <div className="text-emerald-400 font-semibold">ON-TIME DELIVERY: 98.4% (4.9 ⭐)</div>
                  <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-[10px] border border-emerald-500/20">
                    ✓ Skills Verified By Domain Leads
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 font-mono text-[10px] text-zinc-400">
                  <div className="line-through text-red-400">Embellished LinkedIn Profile</div>
                  <div className="line-through text-red-400">Unverified Ex-BigTech Claims</div>
                  <div className="line-through text-red-400">90-Day Agonizing HR Screening</div>
                  <div className="px-2 py-1 rounded-lg bg-red-500/10 text-red-300 text-[9px] border border-red-500/20">
                    ⚠️ Traditional hiring leads to inflated costs & missed deadlines
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 3 (Top-Right, Narrow: 25% width / 3 cols)             */}
          {/* STRICT DEADLINE VELOCITY                                   */}
          {/* ========================================================== */}
          <div className="glass-card md:col-span-6 lg:col-span-3 rounded-[32px] p-7 flex flex-col justify-between overflow-hidden group">
            {/* Top Text Header */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-xs font-medium text-sky-400 tracking-wider uppercase">
                Execution Velocity
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
                Strict deadline velocity.
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                Contributors who miss deadlines are demoted. Our ForgeScore metric strictly enforces enterprise sprint velocity.
              </p>
            </div>

            {/* Bottom Visual: ForgeScore Meter */}
            <div className="relative w-full p-4 rounded-2xl bg-[#090f20]/90 border border-sky-400/20 shadow-xl flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-sky-300 font-medium uppercase tracking-wider">Delivery SLA Rating</span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[9px] font-mono font-semibold">
                  Tier 1 Velocity
                </span>
              </div>

              <div className="flex items-baseline gap-2 my-1">
                <span className="text-5xl font-semibold text-white tracking-tight leading-none">98.4%</span>
                <span className="font-mono text-sm text-sky-400 font-medium">On-Time</span>
              </div>

              {/* Micro Breakdown Bars */}
              <div className="flex flex-col gap-1.5 font-mono text-[10px] text-zinc-400 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Sprint Deadline SLA:</span>
                  <span className="text-emerald-400 font-semibold">99.1% Compliance</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Delivery Velocity:</span>
                  <span className="text-sky-300 font-semibold">2.4 Days Ahead</span>
                </div>
                <div className="flex justify-between">
                  <span>Milestone Acceptance:</span>
                  <span className="text-sky-200 font-semibold">100% 1st Pass</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CENTER FLOATING MEDALLION EMBLEM                           */}
          {/* ========================================================== */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center">
            <div className="relative w-18 h-18 rounded-full bg-[#080e1e]/90 border border-white/25 shadow-[0_0_30px_rgba(56,189,248,0.4),0_0_60px_rgba(2,132,199,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center p-3 backdrop-blur-2xl pointer-events-auto group cursor-pointer hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-500/15 to-cyan-400/20 animate-spin-slow opacity-80" />
              <div className="relative z-10 w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md">
                <Flame className="w-5 h-5 text-sky-600" />
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 4 (Bottom-Left, Narrow: 25% width / 3 cols)           */}
          {/* AI SEMANTIC MATCHING (PGVECTOR)                            */}
          {/* ========================================================== */}
          <div className="glass-card md:col-span-6 lg:col-span-3 rounded-[32px] p-7 flex flex-col justify-between overflow-hidden group">
            {/* Top Visual: pgvector Match Simulator */}
            <div className="relative w-full rounded-2xl bg-[#090f20]/90 border border-white/[0.12] p-4 flex flex-col gap-2.5 mb-4 shadow-xl">
              <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-sky-300 font-semibold">
                  <Cpu className="w-3 h-3 text-sky-400" />
                  Semantic Match
                </span>
                <span className="text-emerald-400">Cosine 0.98</span>
              </div>

              <div className="p-2 rounded-xl bg-black/40 border border-white/10 font-mono text-[10px] text-zinc-300 truncate">
                Enterprise: {matchingPrompt}
              </div>

              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-between font-mono text-[10px]">
                <div>
                  <span className="block text-white font-semibold">{matchedCandidate.name}</span>
                  <span className="text-zinc-400 text-[9px]">FastAPI • pgvector • Python</span>
                </div>
                <span className="text-sm font-semibold text-sky-300">{matchedCandidate.match}</span>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-sky-400 tracking-wider uppercase">
                Vector Matching
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
                Instant project scoping.
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                Enterprise project requirements match automatically with the exact expert-audited specialists suited for the task.
              </p>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 5 (Bottom-Middle, Narrow: 25% width / 3 cols)         */}
          {/* ENTERPRISE IP & CLEAN ROOM PROTECTION                      */}
          {/* ========================================================== */}
          <div className="glass-card md:col-span-6 lg:col-span-3 rounded-[32px] p-7 flex flex-col justify-between overflow-hidden group">
            {/* Top Visual: Conflict Warning Sentry */}
            <div className="relative w-full rounded-2xl bg-[#090f20]/90 border border-sky-400/25 p-4 flex flex-col gap-2 mb-4 shadow-xl">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-[10px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Clean Room IP Sentry</span>
              </div>

              <p className="text-[10px] font-mono text-zinc-300 leading-snug bg-black/40 p-2.5 rounded-lg border border-white/10">
                🔒 Clean Room Enclave: Client IP & NDAs are isolated with non-infringement screening. Zero employment conflict.
              </p>

              <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400 pt-1">
                <span>Code Provenance: Verified</span>
                <span className="text-emerald-400 font-semibold">100% IP Clean</span>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-sky-400 tracking-wider uppercase">
                Enterprise Security
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
                Clean room IP protection.
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                Full intellectual property assignment, clean room code provenance, and ironclad NDA compliance built into every milestone.
              </p>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 6 (Bottom-Right, Wide: 50% width / 6 cols)            */}
          {/* REGULATED MILESTONE ESCROW                                 */}
          {/* ========================================================== */}
          <div className="glass-card md:col-span-12 lg:col-span-6 rounded-[32px] p-7 sm:p-9 flex flex-col justify-between overflow-hidden group">
            {/* Top Visual: Live Milestones Board */}
            <div className="relative w-full rounded-2xl bg-[#090f20]/90 border border-white/[0.12] p-5 flex flex-col gap-3.5 mb-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-white font-semibold">
                  <FileCheck className="w-4 h-4 text-sky-400" />
                  <span>Enterprise Escrow: AI SaaS Architecture</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 font-mono text-[10px] font-semibold border border-sky-500/30">
                  $3,500 Locked in Regulated Vault
                </span>
              </div>

              {/* Milestones Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-emerald-500/40 flex flex-col gap-1">
                  <span className="text-emerald-400 font-semibold">M1: Architecture</span>
                  <span className="text-zinc-200">$800</span>
                  <span className="text-[9px] text-emerald-300">✓ Audited & Released</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-sky-500/40 flex flex-col gap-1">
                  <span className="text-sky-300 font-semibold">M2: Backend Engine</span>
                  <span className="text-zinc-200">$1,500</span>
                  <span className="text-[9px] text-sky-200">⏳ Code Review SLA</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-blue-500/40 flex flex-col gap-1">
                  <span className="text-blue-300 font-semibold">M3: Frontend App</span>
                  <span className="text-zinc-200">$1,200</span>
                  <span className="text-[9px] text-blue-200">⚙️ In Execution</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-1 opacity-70">
                  <span className="text-zinc-400 font-semibold">M4: Verification</span>
                  <span className="text-zinc-200">$500</span>
                  <span className="text-[9px] text-zinc-500">🔒 Escrow Locked</span>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-sky-400 tracking-wider uppercase">
                Financial Integrity
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
                Regulated milestone escrow.
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
                Enterprises deposit project funds into regulated escrow before sprint commencement. Payouts disburse only when deliverables pass strict acceptance benchmarks and code audits.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
