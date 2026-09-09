import React, { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Layers, 
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Building2,
  Cpu,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Activity,
  Compass,
  Lock,
  Timer,
  ExternalLink,
  ChevronRight,
  Globe,
  Radio
} from "lucide-react";
import { fetchTopology } from "../../services/api";

// ============================================================================
// 1. 3D PARTICLE STARFIELD (Ambient Celestial Dust)
// ============================================================================
function ParticleDust({ count = 320 }) {
  const mesh = useRef();
  
  const [positions, colors] = useMemo(() => {
    const pos = [];
    const col = [];
    const colorChoices = [
      new THREE.Color("#38bdf8"), // sky blue
      new THREE.Color("#0ea5e9"), // ocean blue
      new THREE.Color("#818cf8"), // indigo
      new THREE.Color("#ffffff"), // white star
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 45;
      pos.push(x, y, z);

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col.push(c.r, c.g, c.b);
    }
    return [new Float32Array(pos), new Float32Array(col)];
  }, [count]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
      mesh.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================================================
// 2. ORBITAL SATELLITES & ESCROW VAULT RINGS
// ============================================================================
function OrbitalVaultRing({ radius = 1.6, color = "#38bdf8" }) {
  const ringRef = useRef();
  const satRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.3 + 0.8;
    }
    if (satRef.current) {
      satRef.current.position.x = Math.cos(t * 1.2) * radius;
      satRef.current.position.y = Math.sin(t * 1.2) * radius;
    }
  });

  return (
    <group>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[radius, 0.025, 16, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      {/* Tiny orbiting photon satellite */}
      <mesh ref={satRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// ============================================================================
// 3. CURVED ENERGY FILAMENTS WITH ANIMATED PULSE PARTICLES
// ============================================================================
function EnergyCurve({ start, end, color = "#0284c7" }) {
  const lineRef = useRef();
  const photonRef = useRef();

  const curve = useMemo(() => {
    const p1 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    // Add an upward midpoint arch for organic elegance
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const distance = p1.distanceTo(p2);
    mid.y += Math.sin(distance * 0.1) * 1.4;
    return new THREE.QuadraticBezierCurve3(p1, mid, p2);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(36), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  // Animate photon moving along the curve
  useFrame((state) => {
    if (photonRef.current) {
      const t = (state.clock.getElapsedTime() * 0.35 + (start[0] + end[1]) * 0.1) % 1;
      const point = curve.getPointAt(t);
      photonRef.current.position.copy(point);
    }
  });

  return (
    <group>
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.35} linewidth={1} />
      </line>
      <mesh ref={photonRef}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color="#7dd3fc" />
      </mesh>
    </group>
  );
}

function TopologyFilamentMesh({ nodes }) {
  const connections = useMemo(() => [
    // Enterprise Projects <-> Skill Testbeds
    [0, 4], [0, 5],
    [1, 5], [1, 6],
    [2, 4], [2, 6],
    [3, 4], [3, 5],
    // Skill Testbeds <-> Specialists
    [4, 7], [4, 8],
    [5, 8], [5, 9],
    [6, 7], [6, 9],
    // Cross-specialist validation telemetry
    [7, 8], [8, 9],
  ], []);

  return (
    <group>
      {connections.map(([fromIdx, toIdx], i) => {
        const from = nodes[fromIdx]?.position;
        const to = nodes[toIdx]?.position;
        if (!from || !to) return null;
        return (
          <EnergyCurve 
            key={i} 
            start={from} 
            end={to} 
            color={i % 2 === 0 ? "#0284c7" : "#0ea5e9"} 
          />
        );
      })}
    </group>
  );
}

// ============================================================================
// 4. HIGH-FIDELITY SPATIAL NODE (Dual-Shell Volumetric Sphere)
// ============================================================================
function SpatialNode({ node, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const coreRef = useRef();
  const auraRef = useRef();

  const { position, color, size = 0.6, label, type } = node;
  const active = hovered || isSelected;

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (active ? 1.6 : 0.4);
    }
    if (auraRef.current) {
      auraRef.current.rotation.z -= delta * 0.3;
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.08;
      auraRef.current.scale.setScalar(active ? size * 2.4 * pulse : size * 1.6 * pulse);
    }
  });

  return (
    <group position={position}>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        
        {/* Luminous Inner Core */}
        <mesh
          ref={coreRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(node);
          }}
          scale={active ? size * 1.35 : size}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={active ? 2.6 : 1.2}
            roughness={0.12}
            metalness={0.88}
          />
        </mesh>

        {/* Volumetric Glass Outer Shell */}
        <mesh scale={active ? size * 1.8 : size * 1.3}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={active ? 0.35 : 0.15}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Dynamic Pulsing Halo Mesh */}
        <mesh ref={auraRef}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={active ? 0.45 : 0.12}
            wireframe
          />
        </mesh>

        {/* Enterprise Project Orbital Escrow Vault */}
        {type === "Registered Enterprise Project" && (
          <OrbitalVaultRing radius={size * 1.9} color={color} />
        )}

        {/* Apple VisionOS Spatial Pill Tag */}
        <Html
          position={[0, -size * 1.65, 0]}
          center
          distanceFactor={14}
          zIndexRange={[100, 0]}
        >
          <div 
            onClick={() => onSelect(node)}
            className={`pointer-events-auto px-3 py-1 rounded-full whitespace-nowrap cursor-pointer transition-all duration-200 select-none backdrop-blur-xl font-mono text-[11px] flex items-center gap-2 shadow-2xl ${
              active
                ? "bg-[#0c1a35]/95 border-2 border-sky-400 text-white font-bold scale-110 shadow-[0_0_24px_rgba(56,189,248,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                : "bg-[#060a16]/80 border border-white/20 text-zinc-300 hover:text-white hover:border-sky-400/60 hover:bg-[#081226]/90"
            }`}
          >
            <span 
              className={`w-2 h-2 rounded-full shrink-0 ${active ? "animate-pulse" : ""}`}
              style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
            />
            <span className="tracking-tight">{label}</span>
          </div>
        </Html>

      </Float>
    </group>
  );
}

// ============================================================================
// 5. CAMERA INTERPOLATOR & RIG
// ============================================================================
function CameraRig({ targetPosition }) {
  useFrame((state) => {
    if (targetPosition) {
      state.camera.lookAt(targetPosition[0] * 0.4, targetPosition[1] * 0.4, targetPosition[2] * 0.4);
    }
  });
  return null;
}

// ============================================================================
// 6. MAIN FORGE UNIVERSE COMPONENT
// ============================================================================
export default function ForgeUniverse() {
  const [filterMode, setFilterMode] = useState("all");
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();

  const allNodes = useMemo(() => [
    // -------------------------------------------------------------
    // LAYER 1: REGISTERED ENTERPRISE PROJECTS (CYAN / SKY BLUE)
    // -------------------------------------------------------------
    {
      id: "node-p1",
      position: [-6.5, 3.2, 2],
      color: "#38bdf8",
      size: 0.72,
      label: "Telecom Offline Mobile App",
      type: "Registered Enterprise Project",
      data: { 
        client: "Global Telecom & IT MNC",
        score: "$14,000 Escrow Vault", 
        specialty: "React Native, SQLite Sync, Biometric Vault", 
        rate: "Strict 28-Day SLA (60 FPS Native)", 
        status: "Regulated Escrow Funded • Active Sprint",
        tier: "Principal Mobile Systems Audited",
        metricLabel: "Escrow Vault",
        metricVal: "$14,000",
        slaPill: "28-Day Delivery SLA",
        verifiedPill: "Hardware Keychain Enclave",
      },
    },
    {
      id: "node-p2",
      position: [-5.2, -2.8, 3],
      color: "#38bdf8",
      size: 0.68,
      label: "MNC Stream Telemetry Engine",
      type: "Registered Enterprise Project",
      data: { 
        client: "Fortune 500 Enterprise IT",
        score: "$12,000 Escrow Vault", 
        specialty: "FastAPI, Distributed Redis, PostgreSQL", 
        rate: "Strict 21-Day SLA (99.9% Uptime)", 
        status: "Regulated Escrow Funded • In Progress",
        tier: "Tier-1 Domain Expert Audited",
        metricLabel: "Escrow Vault",
        metricVal: "$12,000",
        slaPill: "21-Day Delivery SLA",
        verifiedPill: "35k req/s Zero Loss",
      },
    },
    {
      id: "node-p3",
      position: [-7.2, 0.2, -2],
      color: "#38bdf8",
      size: 0.7,
      label: "Frontier AI Vector Engine",
      type: "Registered Enterprise Project",
      data: { 
        client: "Frontier AI Research Lab",
        score: "$15,000 Escrow Vault", 
        specialty: "PyTorch, pgvector, LangGraph Agents", 
        rate: "Strict 30-Day SLA (<150ms Latency)", 
        status: "Regulated Escrow Funded • Milestone 1 Passed",
        tier: "Principal AI Expert Audited",
        metricLabel: "Escrow Vault",
        metricVal: "$15,000",
        slaPill: "30-Day Delivery SLA",
        verifiedPill: "10M Vector HNSW Pass",
      },
    },
    {
      id: "node-p4",
      position: [-3.5, 4.2, -3.2],
      color: "#38bdf8",
      size: 0.65,
      label: "Fintech Low-Latency Pipeline",
      type: "Registered Enterprise Project",
      data: { 
        client: "Global Fintech MNC",
        score: "$9,500 Escrow Vault", 
        specialty: "Rust Systems, Kafka, AES-256 GCM", 
        rate: "Strict 14-Day SLA (Zero Double-Spend)", 
        status: "Regulated Escrow Funded • Verification Gate",
        tier: "Systems & Security Audited",
        metricLabel: "Escrow Vault",
        metricVal: "$9,500",
        slaPill: "14-Day Delivery SLA",
        verifiedPill: "Zero-Trust RPC Pass",
      },
    },

    // -------------------------------------------------------------
    // LAYER 2: AUDITED CAPABILITY CLUSTERS (ROYAL BLUE)
    // -------------------------------------------------------------
    {
      id: "node-s1",
      position: [0, 3, 0],
      color: "#0284c7",
      size: 0.62,
      label: "Offline SQLite & Biometrics",
      type: "Audited Skill Cluster",
      data: { 
        client: "Audited Code Protocol",
        score: "98/100 Benchmark Score", 
        specialty: "Sub-10ms Local SQLite Sync, Keychain Enclave", 
        rate: "100k Row Conflict-Free SLA", 
        status: "Hardware Secure Enclave Validated",
        tier: "Isolated Mobile Sandbox",
        metricLabel: "Benchmark Pass",
        metricVal: "98/100",
        slaPill: "Conflict-Free Replicas",
        verifiedPill: "Zero Cloud Reliance",
      },
    },
    {
      id: "node-s2",
      position: [0.2, -1.2, 2.2],
      color: "#0284c7",
      size: 0.64,
      label: "FastAPI Concurrency Harness",
      type: "Audited Skill Cluster",
      data: { 
        client: "Audited Code Protocol",
        score: "96/100 Benchmark Score", 
        specialty: "Asynchronous Workers, Distributed Redis", 
        rate: "35,000 req/s Stress Tested", 
        status: "Zero Packet Loss Verified",
        tier: "Isolated Systems Sandbox",
        metricLabel: "Stress Benchmark",
        metricVal: "96/100",
        slaPill: "35,000 req/s Verified",
        verifiedPill: "Cluster Failover Pass",
      },
    },
    {
      id: "node-s3",
      position: [0.8, -4.2, -1.2],
      color: "#0284c7",
      size: 0.6,
      label: "pgvector HNSW Search",
      type: "Audited Skill Cluster",
      data: { 
        client: "Audited Code Protocol",
        score: "97/100 Benchmark Score", 
        specialty: "Cosine Metric Indexing, Token Streaming", 
        rate: "<120ms Vector Retrieval SLA", 
        status: "40M Vector Partition Stress Pass",
        tier: "Isolated Vector Sandbox",
        metricLabel: "Precision Score",
        metricVal: "97/100",
        slaPill: "<120ms Latency SLA",
        verifiedPill: "Cosine HNSW Verified",
      },
    },

    // -------------------------------------------------------------
    // LAYER 3: PRE-VERIFIED SPECIALISTS (ELECTRIC SKY BLUE / CYAN)
    // -------------------------------------------------------------
    {
      id: "node-t1",
      position: [6.5, 2.2, 1.2],
      color: "#0ea5e9",
      size: 0.68,
      label: "MobileSystems_73",
      type: "Pre-Verified Specialist",
      data: { 
        client: "Domain-Expert Audited",
        score: "97/100 Expert Score", 
        specialty: "React Native, Swift, Local SQLite Sync", 
        rate: "99.1% On-Time SLA Velocity (39 Milestones)", 
        status: "Verified by Principal Mobile Lead • 52 PRs",
        tier: "Principal Mobile Architect",
        metricLabel: "On-Time Velocity",
        metricVal: "99.1%",
        slaPill: "39 Completed Milestones",
        verifiedPill: "52 Merged Architecture PRs",
      },
    },
    {
      id: "node-t2",
      position: [5.5, -2.2, 3.2],
      color: "#0ea5e9",
      size: 0.7,
      label: "SystemsArchitect_91",
      type: "Pre-Verified Specialist",
      data: { 
        client: "Domain-Expert Audited",
        score: "98/100 Expert Score", 
        specialty: "FastAPI Concurrency, Rust, Distributed Redis", 
        rate: "99.2% On-Time SLA Velocity (48 Milestones)", 
        status: "Verified by Lead Systems Architect • 62 PRs",
        tier: "Principal Systems Architect",
        metricLabel: "On-Time Velocity",
        metricVal: "99.2%",
        slaPill: "48 Completed Milestones",
        verifiedPill: "62 Merged Architecture PRs",
      },
    },
    {
      id: "node-t3",
      position: [7.2, -1.2, -2.2],
      color: "#0ea5e9",
      size: 0.66,
      label: "NeuralMatrix_07",
      type: "Pre-Verified Specialist",
      data: { 
        client: "Domain-Expert Audited",
        score: "96/100 Expert Score", 
        specialty: "PyTorch, pgvector, Multi-Agent RAG", 
        rate: "98.7% On-Time SLA Velocity (34 Milestones)", 
        status: "Verified by Senior AI Domain Lead • 41 PRs",
        tier: "Principal AI Engineer",
        metricLabel: "On-Time Velocity",
        metricVal: "98.7%",
        slaPill: "34 Completed Milestones",
        verifiedPill: "41 Merged Architecture PRs",
      },
    },
  ], []);

  const [selectedNode, setSelectedNode] = useState(allNodes[0]);
  const [topologyStats, setTopologyStats] = useState({
    totalEscrow: "$50,500",
    medianVelocity: "99.1%",
    filamentsCount: 14,
    nodeCount: 10,
    status: "LIVE TOPOLOGY SYNCHRONIZED"
  });

  useEffect(() => {
    let active = true;
    async function loadTopologyData() {
      try {
        const data = await fetchTopology();
        if (data && active && data.network_metrics) {
          setTopologyStats({
            totalEscrow: data.network_metrics.total_escrow_sum || "$50,500",
            medianVelocity: data.network_metrics.median_sla_velocity || "99.1%",
            filamentsCount: data.filaments ? data.filaments.length : 14,
            nodeCount: data.nodes ? data.nodes.length : 10,
            status: "LIVE FASTAPI TOPOLOGY ONLINE"
          });
        }
      } catch (err) {
        console.warn("Using local topology mesh fallback:", err);
      }
    }
    loadTopologyData();
    return () => { active = false; };
  }, []);

  // Filter nodes based on active view mode
  const visibleNodes = useMemo(() => {
    if (filterMode === "projects") {
      return allNodes.filter(n => n.type === "Registered Enterprise Project");
    }
    if (filterMode === "skills") {
      return allNodes.filter(n => n.type === "Audited Skill Cluster");
    }
    if (filterMode === "specialists") {
      return allNodes.filter(n => n.type === "Pre-Verified Specialist");
    }
    return allNodes;
  }, [allNodes, filterMode]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleFocusProjects = () => {
    setFilterMode("projects");
    setSelectedNode(allNodes[0]);
  };

  const handleFocusSpecialists = () => {
    setFilterMode("specialists");
    setSelectedNode(allNodes[7]);
  };

  return (
    <section id="universe" className="relative w-full py-24 sm:py-32 bg-[#04060d] overflow-hidden border-t border-white/[0.08] select-none">
      
      {/* Specular Radial Ambient Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-sky-500/15 via-blue-600/5 to-transparent blur-[180px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[700px] h-[350px] bg-sky-400/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* ============================================================ */}
        {/* SECTION HEADER: APPLE TYPOGRAPHY & VISIONOS BADGES           */}
        {/* ============================================================ */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mb-12 sm:mb-16">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.12] shadow-inner mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
            <span className="text-xs font-semibold text-sky-300 tracking-[0.2em] uppercase font-mono">
              Live Mesh Topology v2.4
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight">
            Spatial project, skill & specialist graph.
          </h2>
          
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            A live cryptographic mesh mapping registered enterprise projects from MNCs and AI labs to benchmarked skill clusters and domain-expert pre-verified specialists. Trace deliverables directly to audited proof.
          </p>

          {/* Filter Pills - Apple Segmented Glass Control */}
          <div className="flex flex-wrap items-center justify-center gap-1 mt-8 p-1 rounded-full bg-white/[0.05] border border-white/[0.14] backdrop-blur-2xl shadow-inner">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-4 sm:px-6 py-2 rounded-full font-mono text-xs tracking-wide transition-all cursor-pointer ${
                filterMode === "all"
                  ? "bg-white text-zinc-950 font-bold shadow-md scale-100"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All Mesh ({allNodes.length})
            </button>
            <button
              onClick={() => setFilterMode("projects")}
              className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full font-mono text-xs tracking-wide transition-all cursor-pointer ${
                filterMode === "projects"
                  ? "bg-white text-zinc-950 font-bold shadow-md scale-100"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-sky-500" />
              <span>Enterprise Projects (4)</span>
            </button>
            <button
              onClick={() => setFilterMode("skills")}
              className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full font-mono text-xs tracking-wide transition-all cursor-pointer ${
                filterMode === "skills"
                  ? "bg-white text-zinc-950 font-bold shadow-md scale-100"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>Audited Testbeds (3)</span>
            </button>
            <button
              onClick={() => setFilterMode("specialists")}
              className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full font-mono text-xs tracking-wide transition-all cursor-pointer ${
                filterMode === "specialists"
                  ? "bg-white text-zinc-950 font-bold shadow-md scale-100"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Pre-Verified Specialists (3)</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3D SPATIAL VIEWPORT (APPLE VISIONOS ENVIRONMENT)             */}
        {/* ============================================================ */}
        <div className="relative w-full rounded-[36px] bg-gradient-to-b from-[#070e1f] via-[#050a16] to-[#04060c] border border-white/[0.15] shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden">
          
          {/* Top Glass Toolbar Overlay: Live Telemetry Status Strip */}
          <div className="absolute top-0 inset-x-0 z-20 px-4 sm:px-8 py-3.5 bg-gradient-to-b from-[#070e20]/90 to-transparent backdrop-blur-md border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sky-300 font-semibold text-[11px]">
                <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>{topologyStats.status}</span>
              </span>
              <span className="hidden md:inline text-zinc-600">•</span>
              <span className="hidden md:inline text-zinc-400 text-[11px]">
                Escrow Vaults: <strong className="text-white">{topologyStats.totalEscrow} Locked</strong>
              </span>
              <span className="hidden lg:inline text-zinc-600">•</span>
              <span className="hidden lg:inline text-emerald-400 text-[11px]">
                Velocity: {topologyStats.medianVelocity}
              </span>
            </div>

            {/* Quick Perspective Jump Tools */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleFocusProjects}
                className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[10px]"
              >
                Focus Projects
              </button>
              <button
                onClick={handleFocusSpecialists}
                className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[10px]"
              >
                Focus Specialists
              </button>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="px-3 py-1 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 transition-colors cursor-pointer text-[10px] flex items-center gap-1"
              >
                {autoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{autoRotate ? "Pause" : "Spin"}</span>
              </button>
              <button
                onClick={handleResetCamera}
                className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Reset Camera"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Active Hover Telemetry HUD overlay - Apple visionOS Inspector Glass Sheet */}
          <div className="absolute top-16 sm:top-20 left-4 sm:left-7 z-20 w-[calc(100%-2rem)] sm:w-88 md:w-96 p-5 rounded-[28px] bg-[#071126]/90 border border-white/20 backdrop-blur-3xl shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all animate-in fade-in duration-300">
            
            {/* Grabber Bar */}
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto -mt-1.5 mb-3" />

            {/* Header: Title + Classification Badge */}
            <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span 
                  className="w-3 h-3 rounded-full shrink-0 animate-pulse shadow-[0_0_12px_currentColor]" 
                  style={{ backgroundColor: selectedNode.color, color: selectedNode.color }}
                />
                <div>
                  <h4 className="font-mono text-sm font-bold text-white tracking-wide truncate">
                    {selectedNode.label}
                  </h4>
                  <span className="font-mono text-[9px] text-zinc-400 block">
                    {selectedNode.data?.client || "Verified Network Node"}
                  </span>
                </div>
              </div>
              
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 shrink-0 font-medium">
                {selectedNode.type}
              </span>
            </div>

            {/* Data Metrics */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span>{selectedNode.data?.metricLabel || "Metric / Value"}:</span>
                <span className="text-white font-bold text-sm text-sky-200">
                  {selectedNode.data?.metricVal || selectedNode.data?.score}
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-400">
                <span>Capability Spec:</span>
                <span className="text-sky-300 truncate max-w-[200px] text-right font-medium">
                  {selectedNode.data?.specialty}
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-400">
                <span>SLA Velocity:</span>
                <span className="text-emerald-400 font-semibold">
                  {selectedNode.data?.slaPill || selectedNode.data?.rate}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-zinc-400">
                <span>Audit Gate:</span>
                <span className="text-amber-300 font-medium">
                  {selectedNode.data?.verifiedPill || selectedNode.data?.tier}
                </span>
              </div>
            </div>

            {/* Bottom Action Row */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <a 
                href="#projects"
                className="apple-button-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-[10px] tracking-wider uppercase cursor-pointer"
              >
                <span>Inspect in Registry</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <span className="font-mono text-[9px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Live On Escrow</span>
              </span>
            </div>
          </div>

          {/* Interactive Instructions Tag (Bottom-Right) */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 text-zinc-300 font-mono text-[10px] backdrop-blur-md shadow-xl">
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Click any node to inspect • Drag 3D mesh to rotate • Scroll to zoom</span>
          </div>

          {/* 3D WebGL Canvas */}
          <div className="w-full h-[540px] sm:h-[620px] md:h-[680px]">
            <Canvas
              camera={{ position: [0, 0, 16], fov: 44 }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <ambientLight intensity={0.9} />
              <pointLight position={[14, 14, 14]} intensity={2.2} color="#ffffff" />
              <pointLight position={[-14, -14, -14]} intensity={1.4} color="#38bdf8" />
              <pointLight position={[0, 0, 10]} intensity={0.8} color="#0284c7" />

              <Suspense fallback={null}>
                {/* 320-Star Particle Cosmic Dust */}
                <ParticleDust count={320} />
                
                {/* 3D Curving Energy Filaments with Photon Pulses */}
                <TopologyFilamentMesh nodes={allNodes} />

                {/* Visible 3D Nodes */}
                {visibleNodes.map((node) => (
                  <SpatialNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNode.id === node.id}
                    onSelect={setSelectedNode}
                  />
                ))}

                {/* Camera Orbit Controls with physical damping inertia */}
                <OrbitControls
                  ref={controlsRef}
                  enablePan={false}
                  enableZoom={true}
                  enableDamping={true}
                  dampingFactor={0.06}
                  minDistance={7}
                  maxDistance={25}
                  autoRotate={autoRotate}
                  autoRotateSpeed={0.65}
                />

                <CameraRig targetPosition={selectedNode?.position} />
              </Suspense>
            </Canvas>
          </div>

        </div>

        {/* ============================================================ */}
        {/* COMPREHENSIVE 3-LAYER ARCHITECTURE CONSOLE                   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          
          {/* Layer 1: Enterprise Escrow Vaults */}
          <div className="glass-card rounded-[32px] p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-sky-400 font-bold uppercase tracking-widest block">
                      LAYER 01
                    </span>
                    <h4 className="font-sans text-base font-semibold text-white tracking-tight">
                      Enterprise Escrow Vaults
                    </h4>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-sky-400/80" />
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                MNCs, IT giants, and AI labs register architectural specifications and deposit 100% of milestone funds into regulated escrow before code execution starts.
              </p>

              <div className="flex flex-col gap-2">
                {allNodes.filter(n => n.type === "Registered Enterprise Project").map(node => {
                  const isActive = selectedNode.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3 rounded-2xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-sky-500/20 border-sky-400 text-white font-bold shadow-[0_0_16px_rgba(56,189,248,0.3)]"
                          : "bg-white/[0.02] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-sky-400 animate-pulse" : "bg-zinc-500"}`} />
                        <span className="truncate">{node.label}</span>
                      </div>
                      <span className="text-sky-300 font-bold shrink-0 ml-2">{node.data.score}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-400">
              <span>Active Vaults: 4</span>
              <span className="text-emerald-400 font-semibold">100% Regulated</span>
            </div>
          </div>

          {/* Layer 2: Audited Capability Sandboxes */}
          <div className="glass-card rounded-[32px] p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-blue-400 font-bold uppercase tracking-widest block">
                      LAYER 02
                    </span>
                    <h4 className="font-sans text-base font-semibold text-white tracking-tight">
                      Audited Capability Mesh
                    </h4>
                  </div>
                </div>
                <Zap className="w-4 h-4 text-blue-400/80" />
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                Skills are evaluated inside isolated execution sandboxes. Zero reliance on resume buzzwords, LinkedIn history, or pedigree—only real code under stress.
              </p>

              <div className="flex flex-col gap-2">
                {allNodes.filter(n => n.type === "Audited Skill Cluster").map(node => {
                  const isActive = selectedNode.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3 rounded-2xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-blue-500/20 border-blue-400 text-white font-bold shadow-[0_0_16px_rgba(59,130,246,0.3)]"
                          : "bg-white/[0.02] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-blue-400 animate-pulse" : "bg-zinc-500"}`} />
                        <span className="truncate">{node.label}</span>
                      </div>
                      <span className="text-blue-300 font-bold shrink-0 ml-2">{node.data.score}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-400">
              <span>Standardized Testbeds: 3</span>
              <span className="text-sky-300 font-semibold">0% Resume Bias</span>
            </div>
          </div>

          {/* Layer 3: Pre-Verified Specialist Mesh */}
          <div className="glass-card rounded-[32px] p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-sky-400 font-bold uppercase tracking-widest block">
                      LAYER 03
                    </span>
                    <h4 className="font-sans text-base font-semibold text-white tracking-tight">
                      Pre-Verified Specialist Mesh
                    </h4>
                  </div>
                </div>
                <Award className="w-4 h-4 text-sky-400/80" />
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                Engineers pre-audited by domain experts. Evaluated on architectural code contributions, isolated benchmarks, and ruthless on-time delivery velocity.
              </p>

              <div className="flex flex-col gap-2">
                {allNodes.filter(n => n.type === "Pre-Verified Specialist").map(node => {
                  const isActive = selectedNode.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3 rounded-2xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-sky-500/20 border-sky-400 text-white font-bold shadow-[0_0_16px_rgba(56,189,248,0.3)]"
                          : "bg-white/[0.02] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"}`} />
                        <span className="truncate">{node.label}</span>
                      </div>
                      <span className="text-emerald-400 font-bold shrink-0 ml-2">{node.data.rate.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-400">
              <span>Audited Contributors: 3</span>
              <span className="text-emerald-400 font-semibold">99.0% SLA Velocity</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
