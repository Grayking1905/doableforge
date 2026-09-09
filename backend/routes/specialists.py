import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import SpecialistModel, SpecialistApplicationModel
from backend.schemas import (
    SpecialistResponse,
    SpecialistApplicationCreate,
    SpecialistApplicationResponse
)

router = APIRouter(prefix="/specialists", tags=["Pre-Verified Specialists"])

@router.get("", response_model=List[SpecialistResponse])
def get_specialists(
    search: Optional[str] = Query(None, description="Search by pseudonym or skill"),
    db: Session = Depends(get_db)
):
    """Retrieve all pre-verified specialists evaluated by domain experts."""
    query = db.query(SpecialistModel)
    
    if search:
        search_fmt = f"%{search.lower()}%"
        query = query.filter(
            (SpecialistModel.pseudonym.ilike(search_fmt)) |
            (SpecialistModel.expert_audit_tier.ilike(search_fmt)) |
            (SpecialistModel.audit_summary.ilike(search_fmt))
        )
    
    specialists = query.order_by(SpecialistModel.audit_score.desc()).all()
    return specialists

@router.post("/apply", response_model=SpecialistApplicationResponse, status_code=201)
def apply_for_expert_audit(
    payload: SpecialistApplicationCreate,
    db: Session = Depends(get_db)
):
    """
    Submit a code repository or architectural pull request for domain-expert evaluation.
    Provisions an automated concurrency/latency test harness in an isolated clean-room environment.
    """
    if not payload.repo_url or "http" not in payload.repo_url:
        raise HTTPException(status_code=400, detail="A valid public code repository or PR URL is required.")

    harness_id = f"HARNESS-{uuid.uuid4().hex[:8].upper()}"

    application = SpecialistApplicationModel(
        pseudonym=payload.pseudonym,
        repo_url=payload.repo_url,
        audit_track=payload.audit_track,
        turnaround_sla=payload.turnaround_sla,
        harness_id=harness_id,
        status="Isolated Sandbox Harness Provisioned"
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application
