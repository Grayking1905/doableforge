from typing import List, Optional, Any, Dict
from datetime import datetime
from pydantic import BaseModel, Field

# --- Milestones ---
class MilestoneBase(BaseModel):
    name: str
    amount: str
    deadline: str
    status: Optional[str] = "Deposited in Vault"

class MilestoneCreate(MilestoneBase):
    pass

class MilestoneResponse(MilestoneBase):
    id: int
    project_id: str

    class Config:
        from_attributes = True


# --- Projects ---
class ProjectCreate(BaseModel):
    client_type: str = Field(..., example="Fortune 500 Enterprise IT")
    title: str = Field(..., example="Distributed Real-time Stream & Telemetry Engine")
    category: str = Field(..., example="MNC Enterprise")
    escrow_budget: str = Field(..., example="$12,000")
    deadline: str = Field(..., example="Strict 21-Day SLA")
    sla_rate: Optional[str] = "99.9% Uptime SLA"
    verification_tier: Optional[str] = "Tier-1 Domain Expert Audited"
    required_skills: List[str] = Field(default_factory=list)
    description: str = Field(..., example="Architect a fault-tolerant ingestion pipeline...")
    milestones: Optional[List[MilestoneCreate]] = None

class ProjectResponse(BaseModel):
    id: str
    client_type: str
    title: str
    category: str
    escrow_budget: str
    deadline: str
    sla_rate: str
    verification_tier: str
    required_skills: List[str]
    description: str
    escrow_status: str
    contract_hash: str
    milestones: List[MilestoneResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True


# --- Milestone Claim ---
class ClaimCreate(BaseModel):
    specialist_handle: str

class ClaimResponse(BaseModel):
    id: str
    project_id: str
    specialist_handle: str
    status: str
    claimed_at: datetime

    class Config:
        from_attributes = True


# --- Specialists ---
class SpecialistSkill(BaseModel):
    name: str
    score: int
    test: str

class SpecialistResponse(BaseModel):
    id: str
    pseudonym: str
    expert_audit_tier: str
    audit_score: int
    deadline_velocity: str
    completed_milestones: int
    verified_prs: int
    avg_turnaround: str
    top_skills: List[SpecialistSkill]
    audit_summary: str

    class Config:
        from_attributes = True


# --- Specialist Audit Application ---
class SpecialistApplicationCreate(BaseModel):
    pseudonym: str
    repo_url: str
    audit_track: str
    turnaround_sla: str

class SpecialistApplicationResponse(BaseModel):
    id: str
    pseudonym: str
    repo_url: str
    audit_track: str
    turnaround_sla: str
    harness_id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# --- Contact Inquiry ---
class ContactInquiryCreate(BaseModel):
    full_name: str
    email: str
    company: str
    inquiry_type: Optional[str] = "client"  # "client" or "freelancer"
    portfolio_or_github: Optional[str] = None
    role_or_title: Optional[str] = None
    project_scope: str
    estimated_budget: Optional[str] = "$10,000+"
    deadline_sla: Optional[str] = "Strict <2hr SLA"

class ContactInquiryResponse(BaseModel):
    id: str
    inquiry_type: Optional[str] = "client"
    full_name: str
    email: str
    company: str
    portfolio_or_github: Optional[str] = None
    project_scope: str
    estimated_budget: str
    deadline_sla: str
    receipt_token: str
    status: str
    dispatch_status: Optional[str] = "Dispatched via SMTP"
    smtp_configured: Optional[bool] = False
    created_at: datetime

    class Config:
        from_attributes = True




# --- Topology ---
class TopologyNode(BaseModel):
    id: str
    position: List[float]
    color: str
    size: float
    label: str
    type: str
    data: Dict[str, Any]

class TopologyResponse(BaseModel):
    nodes: List[TopologyNode]
    active_filaments: int
    total_escrow: str
    median_velocity: str
    audit_pass_rate: str
