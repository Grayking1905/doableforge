import uuid
import hashlib
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import ProjectModel, MilestoneModel, MilestoneClaimModel
from backend.schemas import ProjectCreate, ProjectResponse, ClaimCreate, ClaimResponse

router = APIRouter(prefix="/projects", tags=["Enterprise Projects"])

@router.get("", response_model=List[ProjectResponse])
def get_projects(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search query"),
    db: Session = Depends(get_db)
):
    """Fetch registered enterprise projects with optional category and search filtering."""
    query = db.query(ProjectModel)
    
    if category and category != "All":
        query = query.filter(ProjectModel.category == category)
    
    if search:
        search_fmt = f"%{search.lower()}%"
        query = query.filter(
            (ProjectModel.title.ilike(search_fmt)) |
            (ProjectModel.client_type.ilike(search_fmt)) |
            (ProjectModel.description.ilike(search_fmt))
        )
    
    projects = query.order_by(ProjectModel.created_at.desc()).all()
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project_detail(project_id: str, db: Session = Depends(get_db)):
    """Retrieve detailed contract specifications and milestone roadmap for a registered project."""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Enterprise project not found")
    return project

@router.post("", response_model=ProjectResponse, status_code=201)
def register_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    """Register an enterprise project into regulated milestone escrow."""
    project_id = f"proj-{uuid.uuid4().hex[:6]}"
    
    # Generate deterministic cryptographic contract hash for milestone vault
    contract_raw = f"{project_id}:{payload.client_type}:{payload.escrow_budget}:{payload.deadline}"
    contract_hash = "0x" + hashlib.sha256(contract_raw.encode()).hexdigest()[:16].upper()

    project = ProjectModel(
        id=project_id,
        client_type=payload.client_type,
        title=payload.title,
        category=payload.category,
        escrow_budget=payload.escrow_budget,
        deadline=payload.deadline,
        sla_rate=payload.sla_rate or "99.9% Uptime SLA",
        verification_tier=payload.verification_tier or "Tier-1 Domain Expert Audited",
        required_skills=payload.required_skills,
        description=payload.description,
        escrow_status="100% Escrow Deposited & Regulated",
        contract_hash=contract_hash
    )
    db.add(project)

    # If milestones are provided, add them; otherwise create 3 standardized milestone phases
    if payload.milestones and len(payload.milestones) > 0:
        for m in payload.milestones:
            milestone = MilestoneModel(
                project_id=project_id,
                name=m.name,
                amount=m.amount,
                deadline=m.deadline,
                status=m.status or "Deposited in Vault"
            )
            db.add(milestone)
    else:
        # Standardized 3-phase milestone decomposition
        default_milestones = [
            {"name": "Architecture Blueprint & Testbed Harness", "amount": "30% Allocation", "deadline": "Sprint Day 7"},
            {"name": "Core Microservices & Concurrency Pipeline", "amount": "45% Allocation", "deadline": "Sprint Day 18"},
            {"name": "Domain-Expert Acceptance & Clean Room Pass", "amount": "25% Allocation", "deadline": payload.deadline},
        ]
        for dm in default_milestones:
            milestone = MilestoneModel(
                project_id=project_id,
                name=dm["name"],
                amount=dm["amount"],
                deadline=dm["deadline"],
                status="Deposited in Vault"
            )
            db.add(milestone)

    db.commit()
    db.refresh(project)
    return project

@router.post("/{project_id}/claim", response_model=ClaimResponse, status_code=201)
def claim_project_milestone(
    project_id: str,
    payload: ClaimCreate,
    db: Session = Depends(get_db)
):
    """Claim a project milestone task under a pre-verified specialist handle."""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Enterprise project not found")
    
    claim = MilestoneClaimModel(
        project_id=project_id,
        specialist_handle=payload.specialist_handle,
        status="Milestone Locked & Git Sandbox Provisioned"
    )
    db.add(claim)
    db.commit()
    db.refresh(claim)
    return claim
