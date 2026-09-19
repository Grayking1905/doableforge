import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.database import engine, Base, SessionLocal
from backend.models import ProjectModel, MilestoneModel, SpecialistModel
from backend.routes import projects, specialists, topology, contact

def seed_initial_data():
    """Seed the database with the initial enterprise projects and pre-verified specialists if empty."""
    db = SessionLocal()
    try:
        if db.query(ProjectModel).count() == 0:
            initial_projects = [
                {
                    "id": "proj-1",
                    "client_type": "Global Telecom & IT MNC",
                    "title": "Mission-Critical Offline-First Enterprise Mobile App",
                    "category": "App Development",
                    "escrow_budget": "$14,000",
                    "deadline": "Strict 28-Day SLA",
                    "sla_rate": "60 FPS & 99.99% Crash-Free SLA",
                    "verification_tier": "Principal Mobile Systems Audited",
                    "required_skills": ["React Native / Swift", "Offline SQLite Sync", "Biometric Keychain", "mTLS Transport"],
                    "description": "Architect a hardened, enterprise-grade iOS/Android field application featuring sub-10ms local SQLite replication, biometric zero-knowledge authentication, and background telemetry streaming under network dropouts.",
                    "contract_hash": "0xDF82A1B79E34C904",
                    "milestones": [
                        {"name": "Offline Replication Engine & SQLite Schema", "amount": "$4,000", "deadline": "Day 8"},
                        {"name": "Biometric Auth & Native UI Architecture", "amount": "$5,500", "deadline": "Day 18"},
                        {"name": "Battery & Performance Audit (<1% drain)", "amount": "$4,500", "deadline": "Day 28"}
                    ]
                },
                {
                    "id": "proj-2",
                    "client_type": "Fortune 500 Enterprise IT",
                    "title": "Distributed Real-time Stream & Telemetry Engine",
                    "category": "MNC Enterprise",
                    "escrow_budget": "$12,000",
                    "deadline": "Strict 21-Day SLA",
                    "sla_rate": "99.9% Uptime Guarantee",
                    "verification_tier": "Tier-1 Domain Expert Audited",
                    "required_skills": ["FastAPI Concurrency", "Distributed Redis", "PostgreSQL", "Argon2 Vault"],
                    "description": "Architect a fault-tolerant ingestion pipeline handling 35,000 events/sec with zero packet loss, isolated multi-tenant tenants, and millisecond persistence.",
                    "contract_hash": "0x44A0F98E7B21DC09",
                    "milestones": [
                        {"name": "Fault-tolerant Redis Queue Topology", "amount": "$3,500", "deadline": "Day 7"},
                        {"name": "Asynchronous FastAPI Worker Fleet", "amount": "$5,000", "deadline": "Day 14"},
                        {"name": "Chaos Benchmark & Clean Room Audit", "amount": "$3,500", "deadline": "Day 21"}
                    ]
                },
                {
                    "id": "proj-3",
                    "client_type": "Frontier AI Research Lab",
                    "title": "Multimodal Context RAG & Semantic Vector Engine",
                    "category": "Frontier AI",
                    "escrow_budget": "$15,000",
                    "deadline": "Strict 30-Day SLA",
                    "sla_rate": "<150ms Latency SLA",
                    "verification_tier": "Principal AI Expert Audited",
                    "required_skills": ["Python / PyTorch", "pgvector", "LangGraph / Agents", "Token Streaming"],
                    "description": "Deploy an enterprise semantic search and synthesis harness across 40M+ proprietary technical documents with citation verification and provenance tracing.",
                    "contract_hash": "0x77EE2190A5F8321B",
                    "milestones": [
                        {"name": "Vector Index Partitioning & Ingestion", "amount": "$4,500", "deadline": "Day 10"},
                        {"name": "Agentic RAG & Citation Provenance", "amount": "$6,500", "deadline": "Day 20"},
                        {"name": "Precision & Latency Stress Test", "amount": "$4,000", "deadline": "Day 30"}
                    ]
                },
                {
                    "id": "proj-4",
                    "client_type": "Global Fintech MNC",
                    "title": "High-Throughput Financial Transaction Pipeline",
                    "category": "High-Throughput Systems",
                    "escrow_budget": "$9,500",
                    "deadline": "Strict 14-Day SLA",
                    "sla_rate": "Zero Double-Spend SLA",
                    "verification_tier": "Systems & Security Audited",
                    "required_skills": ["Rust / C++", "Kafka Pub/Sub", "AES-256 GCM", "Zero-Trust RPC"],
                    "description": "Build an ultra-low-latency transaction matching engine with ACID guarantees, cryptographic audit trails, and automated regulatory reporting hooks.",
                    "contract_hash": "0x11B3489C6F12E088",
                    "milestones": [
                        {"name": "Immutable Ledger Schema & Vault", "amount": "$3,000", "deadline": "Day 5"},
                        {"name": "Matching Engine Core & Micro-benchmarks", "amount": "$4,500", "deadline": "Day 10"},
                        {"name": "Security Audit & Final Release", "amount": "$2,000", "deadline": "Day 14"}
                    ]
                }
            ]

            for p_data in initial_projects:
                milestones_data = p_data.pop("milestones")
                p = ProjectModel(**p_data)
                db.add(p)
                for m in milestones_data:
                    milestone = MilestoneModel(project_id=p.id, **m)
                    db.add(milestone)
            db.commit()

        if db.query(SpecialistModel).count() == 0:
            initial_specialists = [
                {
                    "id": "specialist-1",
                    "pseudonym": "SystemsArchitect_91",
                    "expert_audit_tier": "Principal Forge (Audited by Lead Systems Architect)",
                    "audit_score": 98,
                    "deadline_velocity": "99.2%",
                    "completed_milestones": 48,
                    "verified_prs": 62,
                    "avg_turnaround": "18 Days (Strict SLAs)",
                    "top_skills": [
                        {"name": "FastAPI Concurrency", "score": 98, "test": "Simulated 50k req/s Harness"},
                        {"name": "Rust Systems", "score": 96, "test": "Memory Safety & Zero-Copy Parser"},
                        {"name": "Distributed Redis", "score": 95, "test": "Cluster Failover Verification"}
                    ],
                    "audit_summary": "Verified through practical benchmark stress-testing and architectural pull requests. Never evaluated by resume or pedigree."
                },
                {
                    "id": "specialist-2",
                    "pseudonym": "NeuralMatrix_07",
                    "expert_audit_tier": "Principal Forge (Audited by Senior AI Domain Expert)",
                    "audit_score": 96,
                    "deadline_velocity": "98.7%",
                    "completed_milestones": 34,
                    "verified_prs": 41,
                    "avg_turnaround": "22 Days (Strict SLAs)",
                    "top_skills": [
                        {"name": "pgvector / Embeddings", "score": 97, "test": "10M Vector HNSW Benchmark"},
                        {"name": "Python / PyTorch", "score": 95, "test": "Custom Model Quantization"},
                        {"name": "Agent Orchestration", "score": 94, "test": "Multi-Agent Deterministic Harness"}
                    ],
                    "audit_summary": "Audited on open-source vector pipelines and strict deadline delivery track record. Proven 100% on-time milestone delivery."
                },
                {
                    "id": "specialist-3",
                    "pseudonym": "MobileSystems_73",
                    "expert_audit_tier": "Principal Mobile Architect (Audited by Lead iOS/Android Engineer)",
                    "audit_score": 97,
                    "deadline_velocity": "99.1%",
                    "completed_milestones": 39,
                    "verified_prs": 52,
                    "avg_turnaround": "17 Days (Strict SLAs)",
                    "top_skills": [
                        {"name": "React Native / Swift", "score": 98, "test": "Offline State Sync & Memory Test"},
                        {"name": "Local SQLite Sync", "score": 96, "test": "100k Row Conflict-Free Replicas"},
                        {"name": "Biometric Crypto Vaults", "score": 95, "test": "Hardware Secure Enclave Pass"}
                    ],
                    "audit_summary": "Audited on native compilation speed, zero-battery leakage, and strict deadline delivery. 100% on-time milestone delivery record."
                }
            ]

            for s_data in initial_specialists:
                s = SpecialistModel(**s_data)
                db.add(s)
            db.commit()

    finally:
        db.close()


from sqlalchemy import inspect, text

def migrate_sqlite_columns():
    """Ensure newly added columns exist in existing SQLite tables."""
    try:
        inspector = inspect(engine)
        if "contact_inquiries" in inspector.get_table_names():
            columns = [c["name"] for c in inspector.get_columns("contact_inquiries")]
            with engine.begin() as conn:
                if "inquiry_type" not in columns:
                    conn.execute(text("ALTER TABLE contact_inquiries ADD COLUMN inquiry_type VARCHAR(32) DEFAULT 'client'"))
                if "portfolio_or_github" not in columns:
                    conn.execute(text("ALTER TABLE contact_inquiries ADD COLUMN portfolio_or_github VARCHAR(256)"))
                if "dispatch_status" not in columns:
                    conn.execute(text("ALTER TABLE contact_inquiries ADD COLUMN dispatch_status VARCHAR(128) DEFAULT 'Dispatched via SMTP'"))
    except Exception as e:
        print(f"[DB MIGRATION WARNING] {e}")


from backend.keep_alive import keep_alive_manager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite / PostgreSQL tables
    Base.metadata.create_all(bind=engine)
    # Perform schema migrations for new columns if needed
    migrate_sqlite_columns()
    # Seed initial database
    seed_initial_data()
    # Start automated keep-alive self-ping worker (every 5-10s for Render free-tier keep-awake)
    keep_alive_manager.start()
    yield
    # Gracefully terminate keep-alive background worker on shutdown
    await keep_alive_manager.stop()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise Project Registry & Domain-Expert Audit Engine for MNCs, IT & AI Leaders",
    lifespan=lifespan
)

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes
app.include_router(projects.router, prefix=settings.API_V1_STR)
app.include_router(specialists.router, prefix=settings.API_V1_STR)
app.include_router(topology.router, prefix=settings.API_V1_STR)
app.include_router(contact.router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {
        "platform": "DoableForge",
        "role": "Enterprise Project Registry API",
        "docs": "/docs",
        "health": "/health",
        "api_health": "/api/health",
        "environment": settings.ENVIRONMENT
    }

@app.get("/health", tags=["Health"])
@app.head("/health", tags=["Health"])
@app.get("/api/health", tags=["Health"])
@app.head("/api/health", tags=["Health"])
def health_check():
    """
    Health check endpoint for Render, uptime monitors, and keep-alive cycles.
    Returns comprehensive server metrics, uptime, DB status, and ping metrics.
    """
    return keep_alive_manager.get_health_status()

if __name__ == "__main__":
    import uvicorn
    print(f"Starting {settings.PROJECT_NAME} on {settings.HOST}:{settings.PORT} (Env: {settings.ENVIRONMENT})...")
    uvicorn.run(
        "backend.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=False
    )
