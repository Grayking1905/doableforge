"""
Unit and integration test for DoableForge email service and templates.
Tests both Enterprise Client and Freelancer/Specialist inquiry scenarios.
"""

from backend.email_service import (
    render_admin_inquiry_html,
    render_admin_inquiry_plain,
    render_client_ack_html,
    send_inquiry_emails,
    PREVIEW_DIR
)

def test_email_templates_and_dispatch():
    print("\n--- Testing 1: Enterprise Client Inquiry Template ---")
    client_data = {
        "receipt_token": "DF-CLT-A1B2C3D4",
        "inquiry_type": "client",
        "full_name": "Elena Rostova",
        "email": "elena@apexfinancial.com",
        "company": "Apex Financial Group",
        "portfolio_or_github": "https://apexfinancial.com/tech-stack",
        "project_scope": "Architecting an ultra-low-latency order matching engine in Rust with sub-10 microsecond execution and automated escrow verification on DoableForge.",
        "estimated_budget": "$35,000 Milestone Escrow",
        "deadline_sla": "Strict 30-Day Delivery"
    }

    client_html = render_admin_inquiry_html(client_data)
    assert "Enterprise Client Inquiry" in client_html
    assert "Apex Financial Group" in client_html
    assert "DF-CLT-A1B2C3D4" in client_html
    assert "contact@doableforge.com" in client_html
    print("[OK] Client Admin Template Rendered Successfully (HTML size:", len(client_html), "bytes)")

    client_ack = render_client_ack_html(client_data)
    assert "DF-CLT-A1B2C3D4" in client_ack
    assert "Elena Rostova" in client_ack
    print("[OK] Client Acknowledgment Template Rendered Successfully (HTML size:", len(client_ack), "bytes)")

    res_client = send_inquiry_emails(client_data)
    print("[OK] Client Email Dispatch Execution Result:", res_client)
    assert (PREVIEW_DIR / "DF-CLT-A1B2C3D4_admin_inquiry.html").is_file()
    assert (PREVIEW_DIR / "DF-CLT-A1B2C3D4_client_ack.html").is_file()

    print("\n--- Testing 2: Freelancer / Specialist Application Template ---")
    freelancer_data = {
        "receipt_token": "DF-SPEC-E5F6G7H8",
        "inquiry_type": "freelancer",
        "full_name": "Dev_Forge_Nexus",
        "email": "nexus.dev@crypto-systems.io",
        "company": "Distributed Consensus & Rust Systems",
        "portfolio_or_github": "https://github.com/nexus-dev-core/raft-engine",
        "project_scope": "Principal Systems Engineer with 8+ years building distributed consensus (Raft, Paxos) and zero-knowledge rollups. Requesting access to the clean-room benchmark harness to claim open enterprise milestones.",
        "estimated_budget": "$150/hr or Fixed Milestone",
        "deadline_sla": "Immediate Availability (<24hr Turnaround)"
    }

    freelancer_html = render_admin_inquiry_html(freelancer_data)
    assert "Specialist / Freelancer Application" in freelancer_html
    assert "nexus.dev@crypto-systems.io" in freelancer_html
    assert "https://github.com/nexus-dev-core/raft-engine" in freelancer_html
    assert "DF-SPEC-E5F6G7H8" in freelancer_html
    print("[OK] Freelancer Admin Template Rendered Successfully (HTML size:", len(freelancer_html), "bytes)")

    freelancer_ack = render_client_ack_html(freelancer_data)
    assert "DF-SPEC-E5F6G7H8" in freelancer_ack
    assert "Dev_Forge_Nexus" in freelancer_ack
    print("[OK] Freelancer Acknowledgment Template Rendered Successfully")

    res_freelancer = send_inquiry_emails(freelancer_data)
    print("[OK] Freelancer Email Dispatch Execution Result:", res_freelancer)
    assert (PREVIEW_DIR / "DF-SPEC-E5F6G7H8_admin_inquiry.html").is_file()
    assert (PREVIEW_DIR / "DF-SPEC-E5F6G7H8_client_ack.html").is_file()

    print("\nAll Email Template & Dispatch Tests Passed!")

if __name__ == "__main__":
    test_email_templates_and_dispatch()
