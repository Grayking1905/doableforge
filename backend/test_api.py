import sys
from pathlib import Path

_backend_dir = Path(__file__).resolve().parent
_project_root = _backend_dir.parent
for _p in [str(_project_root), str(_backend_dir)]:
    if _p not in sys.path:
        sys.path.insert(0, _p)

from fastapi.testclient import TestClient
from backend.main import app

def test_api():
    with TestClient(app) as client:
        # 1. Health Endpoints (/api/health and /health, GET and HEAD)
        res_api = client.get("/api/health")
        assert res_api.status_code == 200, f"/api/health failed: {res_api.text}"
        data_api = res_api.json()
        assert data_api["status"] == "online"
        assert data_api["health"] == "healthy"
        assert "uptime_seconds" in data_api
        assert data_api["database"]["status"] == "connected"
        assert "keep_alive" in data_api
        print("[OK] /api/health GET Passed:", data_api)

        res_render = client.get("/health")
        assert res_render.status_code == 200, f"/health failed: {res_render.text}"
        print("[OK] /health GET Passed (Render health check path)")

        res_head = client.head("/health")
        assert res_head.status_code == 200, f"/health HEAD failed: {res_head.status_code}"
        print("[OK] /health HEAD Passed")

        # 2. Get Projects
        res = client.get("/api/projects")
        assert res.status_code == 200
        projects = res.json()
        assert len(projects) >= 4, f"Expected at least 4 projects, got {len(projects)}"
        print(f"[OK] Projects Retrieved: {len(projects)} active projects")
        for p in projects:
            print(f"   [{p['category']}] {p['title']} - Escrow: {p['escrow_budget']}")

        # 3. Filter Projects by App Development
        res = client.get("/api/projects?category=App Development")
        assert res.status_code == 200
        app_projects = res.json()
        assert len(app_projects) == 1
        print("[OK] Filter by App Development passed:", app_projects[0]["title"])

        # 4. Get Specialists
        res = client.get("/api/specialists")
        assert res.status_code == 200
        specialists = res.json()
        assert len(specialists) == 3
        print(f"[OK] Pre-Verified Specialists Retrieved: {len(specialists)}")
        for s in specialists:
            print(f"   {s['pseudonym']} - {s['expert_audit_tier']} ({s['deadline_velocity']})")

        # 5. Get Topology Graph
        res = client.get("/api/topology")
        assert res.status_code == 200
        topo = res.json()
        assert len(topo["nodes"]) == 10
        print(f"[OK] Topology Nodes: {len(topo['nodes'])}, Total Escrow: {topo['total_escrow']}")

        # 6. Test Register New Project into Escrow
        new_project_payload = {
            "client_type": "Fortune 500 Cloud Enterprise",
            "title": "Autonomous Multi-Agent Orchestrator",
            "category": "Frontier AI",
            "escrow_budget": "$18,000",
            "deadline": "Strict 35-Day SLA",
            "required_skills": ["Python", "LangGraph", "FastAPI", "Redis"],
            "description": "Enterprise agent runtime for automated code validation."
        }
        res = client.post("/api/projects", json=new_project_payload)
        assert res.status_code == 201
        created_p = res.json()
        print("[OK] Register Project Passed. Contract Hash:", created_p["contract_hash"], "ID:", created_p["id"])

        # 7. Test Claim Milestone
        claim_payload = {"specialist_handle": "SystemsArchitect_91"}
        res = client.post(f"/api/projects/{created_p['id']}/claim", json=claim_payload)
        assert res.status_code == 201
        print("[OK] Milestone Claim Passed:", res.json()["status"])

        # 8. Test Specialist Audit Application
        audit_payload = {
            "pseudonym": "TestDev_999",
            "repo_url": "https://github.com/testdev/high-throughput-rust",
            "audit_track": "Distributed Systems",
            "turnaround_sla": "Strict <24hr Turnaround"
        }
        res = client.post("/api/specialists/apply", json=audit_payload)
        assert res.status_code == 201
        print("[OK] Specialist Audit Gate Passed. Harness ID:", res.json()["harness_id"])

        # 9. Test Client Contact Inquiry
        client_contact_payload = {
            "inquiry_type": "client",
            "full_name": "Satya Nadella",
            "email": "enterprise@corp.com",
            "company": "Global Tech Conglomerate",
            "project_scope": "Looking to migrate legacy microservices into verified escrow deliverables.",
            "estimated_budget": "$50,000+",
            "deadline_sla": "Strict 45-Day SLA"
        }
        res = client.post("/api/contact", json=client_contact_payload)
        assert res.status_code == 201
        client_inq = res.json()
        assert client_inq["receipt_token"].startswith("DF-CLT-")
        print("[OK] Client Advisory Inquiry Passed. Receipt Token:", client_inq["receipt_token"])

        # 10. Test Freelancer / Specialist Contact Inquiry
        freelancer_contact_payload = {
            "inquiry_type": "freelancer",
            "full_name": "Marcus Vance",
            "email": "marcus.v@systems-core.dev",
            "company": "Senior Systems Engineer",
            "portfolio_or_github": "https://github.com/marcusv-systems/high-speed-ipc",
            "project_scope": "Applying to join the DoableForge talent registry for high-throughput C++/Rust milestones.",
            "estimated_budget": "$120/hr",
            "deadline_sla": "Immediate Availability"
        }
        res = client.post("/api/contact", json=freelancer_contact_payload)
        assert res.status_code == 201
        free_inq = res.json()
        assert free_inq["receipt_token"].startswith("DF-SPEC-")
        print("[OK] Specialist Application Inquiry Passed. Receipt Token:", free_inq["receipt_token"])

if __name__ == "__main__":
    test_api()
    print("\nALL 10 END-TO-END BACKEND API TESTS PASSED SUCCESSFULLY!")

