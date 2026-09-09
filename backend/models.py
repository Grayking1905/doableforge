import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.database import Base

class ProjectModel(Base):
    __tablename__ = "projects"

    id = Column(String(64), primary_key=True, index=True)
    client_type = Column(String(128), nullable=False)
    title = Column(String(256), nullable=False)
    category = Column(String(64), nullable=False, index=True)
    escrow_budget = Column(String(64), nullable=False)
    deadline = Column(String(64), nullable=False)
    sla_rate = Column(String(128), nullable=False)
    verification_tier = Column(String(128), nullable=False)
    required_skills = Column(JSON, nullable=False)  # List of skill strings
    description = Column(Text, nullable=False)
    escrow_status = Column(String(64), default="100% Escrow Deposited & Regulated")
    contract_hash = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    milestones = relationship("MilestoneModel", back_populates="project", cascade="all, delete-orphan")
    claims = relationship("MilestoneClaimModel", back_populates="project", cascade="all, delete-orphan")


class MilestoneModel(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(String(64), ForeignKey("projects.id"), nullable=False)
    name = Column(String(256), nullable=False)
    amount = Column(String(64), nullable=False)
    deadline = Column(String(64), nullable=False)
    status = Column(String(64), default="Deposited in Vault")

    project = relationship("ProjectModel", back_populates="milestones")


class SpecialistModel(Base):
    __tablename__ = "specialists"

    id = Column(String(64), primary_key=True, index=True)
    pseudonym = Column(String(128), unique=True, nullable=False, index=True)
    expert_audit_tier = Column(String(128), nullable=False)
    audit_score = Column(Integer, nullable=False)
    deadline_velocity = Column(String(32), nullable=False)
    completed_milestones = Column(Integer, default=0)
    verified_prs = Column(Integer, default=0)
    avg_turnaround = Column(String(64), nullable=False)
    top_skills = Column(JSON, nullable=False)  # [{name, score, test}]
    audit_summary = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class SpecialistApplicationModel(Base):
    __tablename__ = "specialist_applications"

    id = Column(String(64), primary_key=True, default=lambda: f"audit-{uuid.uuid4().hex[:8]}")
    pseudonym = Column(String(128), nullable=False)
    repo_url = Column(String(512), nullable=False)
    audit_track = Column(String(128), nullable=False)
    turnaround_sla = Column(String(128), nullable=False)
    harness_id = Column(String(64), nullable=False)
    status = Column(String(64), default="Harness Provisioned")
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactInquiryModel(Base):
    __tablename__ = "contact_inquiries"

    id = Column(String(64), primary_key=True, default=lambda: f"inq-{uuid.uuid4().hex[:8]}")
    inquiry_type = Column(String(32), default="client")  # "client" or "freelancer"
    full_name = Column(String(128), nullable=False)
    email = Column(String(256), nullable=False)
    company = Column(String(256), nullable=False)
    portfolio_or_github = Column(String(256), nullable=True)
    project_scope = Column(Text, nullable=False)
    estimated_budget = Column(String(64), nullable=False)
    deadline_sla = Column(String(64), nullable=False)
    receipt_token = Column(String(128), nullable=False)
    status = Column(String(64), default="Dispatched to Advisory Team (<2hr SLA)")
    dispatch_status = Column(String(128), default="Dispatched via SMTP")
    created_at = Column(DateTime, default=datetime.utcnow)



class MilestoneClaimModel(Base):
    __tablename__ = "milestone_claims"

    id = Column(String(64), primary_key=True, default=lambda: f"claim-{uuid.uuid4().hex[:8]}")
    project_id = Column(String(64), ForeignKey("projects.id"), nullable=False)
    specialist_handle = Column(String(128), nullable=False)
    status = Column(String(64), default="Milestone Locked & Git Sandbox Provisioned")
    claimed_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("ProjectModel", back_populates="claims")
