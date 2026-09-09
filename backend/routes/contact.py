import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import ContactInquiryModel
from backend.schemas import ContactInquiryCreate, ContactInquiryResponse
from backend.email_service import send_inquiry_emails
from backend.config import settings

router = APIRouter(prefix="/contact", tags=["Client Advisory & Inquiries"])


@router.post("", response_model=ContactInquiryResponse, status_code=201)
def submit_contact_inquiry(
    payload: ContactInquiryCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Submit an enterprise project consultation or specialist onboarding inquiry.
    Dispatches formatted email to contact@doableforge.com and sends confirmation receipt to user.
    """
    if not payload.email or "@" not in payload.email:
        raise HTTPException(status_code=400, detail="A valid email address is required.")

    inquiry_type = payload.inquiry_type or "client"
    prefix = "DF-CLT" if inquiry_type == "client" else "DF-SPEC"
    receipt_token = f"{prefix}-{uuid.uuid4().hex[:8].upper()}"

    inquiry = ContactInquiryModel(
        inquiry_type=inquiry_type,
        full_name=payload.full_name,
        email=payload.email,
        company=payload.company,
        portfolio_or_github=payload.portfolio_or_github,
        project_scope=payload.project_scope,
        estimated_budget=payload.estimated_budget or "$10,000+",
        deadline_sla=payload.deadline_sla or "Strict <2hr SLA",
        receipt_token=receipt_token,
        status="Dispatched to Advisory Team (<2hr SLA)",
        dispatch_status="Queued for Gmail Dispatch"
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    # Prepare data payload for email dispatch
    email_payload = {
        "receipt_token": receipt_token,
        "inquiry_type": inquiry_type,
        "full_name": inquiry.full_name,
        "email": inquiry.email,
        "company": inquiry.company,
        "portfolio_or_github": inquiry.portfolio_or_github,
        "project_scope": inquiry.project_scope,
        "estimated_budget": inquiry.estimated_budget,
        "deadline_sla": inquiry.deadline_sla,
        "created_at": str(inquiry.created_at),
    }

    # Dispatch email with prebuilt template
    dispatch_result = send_inquiry_emails(email_payload)

    is_smtp_ready = bool(settings.SMTP_USER and settings.SMTP_PASSWORD and "your-" not in settings.SMTP_USER)
    inquiry.smtp_configured = is_smtp_ready

    if dispatch_result.get("admin_sent"):
        inquiry.dispatch_status = f"Dispatched to contact@doableforge.com and confirmation sent to {inquiry.email}"
    elif not is_smtp_ready:
        inquiry.dispatch_status = "Saved with prebuilt template (Gmail App Password pending in .env)"
    else:
        err_msg = "; ".join(dispatch_result.get("errors", [])) or "Delivery error"
        inquiry.dispatch_status = f"SMTP Issue: {err_msg}"

    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    # Re-attach non-column attribute for response schema
    inquiry.smtp_configured = is_smtp_ready

    return inquiry



@router.get("", response_model=List[ContactInquiryResponse])
def get_all_inquiries(db: Session = Depends(get_db)):
    """Retrieve audit log of registered enterprise inquiries."""
    return db.query(ContactInquiryModel).order_by(ContactInquiryModel.created_at.desc()).all()

