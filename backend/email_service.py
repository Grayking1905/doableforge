"""
DoableForge Enterprise Inquiry Dispatch & Gmail SMTP Service
Dispatches structured client and freelancer inquiries to contact@doableforge.com
and sends automated cryptographic receipt acknowledgments to inquirers.
"""

import os
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timezone
from pathlib import Path
from backend.config import settings

logger = logging.getLogger("doableforge.email")
logging.basicConfig(level=logging.INFO)

PREVIEW_DIR = Path(__file__).resolve().parent / "email_previews"


def ensure_preview_dir():
    """Ensure directory for saving email HTML previews exists."""
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)


# ==============================================================================
# HTML EMAIL TEMPLATES
# Formatted in strict executive order for instant comprehension
# ==============================================================================

def render_admin_inquiry_html(data: dict) -> str:
    """
    Renders the rich HTML email sent to contact@doableforge.com.
    Ordered logically:
      1. Header & Protocol Branding + Urgent SLA
      2. Persona Classification (Client vs Freelancer)
      3. Executive Summary Data Grid
      4. Inquirer Profile Dossier
      5. Scope & Requirements Block
      6. Commercial & SLA Parameters
      7. Advisory Action Checklist & 1-Click CTAs
      8. Cryptographic Audit Telemetry
    """
    inquiry_type = data.get("inquiry_type", "client").lower()
    is_client = inquiry_type == "client"
    persona_title = "Enterprise Client Inquiry (Hire / Escrow)" if is_client else "Specialist / Freelancer Application (Join Platform)"
    persona_badge_bg = "#0284c7" if is_client else "#10b981"
    persona_icon = "🏢" if is_client else "⚡"
    
    full_name = data.get("full_name", "Anonymous User")
    email = data.get("email", "unknown@domain.com")
    company_or_org = data.get("company", "N/A")
    portfolio_or_github = data.get("portfolio_or_github") or "Not provided"
    project_scope = data.get("project_scope", "No details supplied.")
    estimated_budget = data.get("estimated_budget", "$10,000+")
    deadline_sla = data.get("deadline_sla", "Strict <2hr SLA")
    receipt_token = data.get("receipt_token", "DF-ADV-UNKNOWN")
    created_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    reply_subject = f"Re: [DoableForge Inquiry - {receipt_token}] {company_or_org}"
    reply_body = f"Hello {full_name},\n\nThank you for reaching out to DoableForge regarding your inquiry ({receipt_token}).\n\n"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New DoableForge Inquiry: {receipt_token}</title>
  <style>
    body {{
      margin: 0;
      padding: 0;
      background-color: #05070f;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
    }}
    .container {{
      max-width: 640px;
      margin: 32px auto;
      background: #090e1f;
      border: 1px solid #1e293b;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }}
    .header {{
      background: linear-gradient(135deg, #090e1f 0%, #0d182e 100%);
      padding: 28px 32px;
      border-bottom: 1px solid #1e293b;
    }}
    .brand {{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .brand-title {{
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #38bdf8;
      margin: 0;
    }}
    .badge {{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #7dd3fc;
      font-weight: 600;
      text-transform: uppercase;
    }}
    .persona-bar {{
      padding: 16px 32px;
      background: {persona_badge_bg};
      color: #ffffff;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .body-content {{
      padding: 32px;
    }}
    .section-title {{
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #94a3b8;
      margin-top: 0;
      margin-bottom: 12px;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 6px;
    }}
    .summary-grid {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }}
    .summary-grid td {{
      padding: 10px 12px;
      border: 1px solid #1e293b;
      font-size: 13px;
      background: #060914;
    }}
    .summary-label {{
      color: #64748b;
      font-family: ui-monospace, monospace;
      font-size: 11px;
      text-transform: uppercase;
      width: 32%;
    }}
    .summary-value {{
      color: #f8fafc;
      font-weight: 600;
    }}
    .message-box {{
      background: #040711;
      border: 1px solid #1e293b;
      border-left: 4px solid #38bdf8;
      border-radius: 8px;
      padding: 18px 20px;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 1.6;
      color: #f1f5f9;
      white-space: pre-wrap;
    }}
    .actions-card {{
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }}
    .checklist {{
      margin: 12px 0 0 0;
      padding-left: 20px;
      color: #cbd5e1;
      font-size: 13px;
      line-height: 1.6;
    }}
    .cta-button {{
      display: inline-block;
      background: #38bdf8;
      color: #040814 !important;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 9999px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 8px;
    }}
    .footer {{
      background: #040711;
      border-top: 1px solid #1e293b;
      padding: 20px 32px;
      font-family: ui-monospace, monospace;
      font-size: 11px;
      color: #475569;
      text-align: center;
      line-height: 1.6;
    }}
  </style>
</head>
<body>
  <div class="container">
    
    <!-- 1. Header & Platform Identity -->
    <div class="header">
      <div class="brand">
        <div>
          <h1 class="brand-title">DOABLEFORGE PLATFORM INBOX</h1>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Verified Escrow & Audited Talent Network</div>
        </div>
        <div>
          <span class="badge">&lt; 2hr SLA Active</span>
        </div>
      </div>
    </div>

    <!-- 2. Persona Banner (Client vs Freelancer) -->
    <div class="persona-bar">
      <span>{persona_icon}</span>
      <span>{persona_title}</span>
    </div>

    <!-- 3. Body Content -->
    <div class="body-content">
      
      <!-- Quick Telemetry Grid -->
      <div class="section-title">1. Executive Overview</div>
      <table class="summary-grid">
        <tr>
          <td class="summary-label">Receipt Token</td>
          <td class="summary-value" style="color: #38bdf8; font-family: monospace;">{receipt_token}</td>
        </tr>
        <tr>
          <td class="summary-label">Inquiry Persona</td>
          <td class="summary-value">{"Client (Project & Escrow)" if is_client else "Specialist (Join Talent Network)"}</td>
        </tr>
        <tr>
          <td class="summary-label">Dispatched To</td>
          <td class="summary-value" style="color: #a5f3fc;">contact@doableforge.com</td>
        </tr>
        <tr>
          <td class="summary-label">Timestamp</td>
          <td class="summary-value" style="font-family: monospace;">{created_at}</td>
        </tr>
      </table>

      <!-- Profile Dossier -->
      <div class="section-title">2. Inquirer Profile Dossier</div>
      <table class="summary-grid">
        <tr>
          <td class="summary-label">Full Name / Handle</td>
          <td class="summary-value">{full_name}</td>
        </tr>
        <tr>
          <td class="summary-label">Direct Email</td>
          <td class="summary-value">
            <a href="mailto:{email}" style="color: #38bdf8; text-decoration: underline;">{email}</a>
          </td>
        </tr>
        <tr>
          <td class="summary-label">{"Company / Organization" if is_client else "Category / Role"}</td>
          <td class="summary-value">{company_or_org}</td>
        </tr>
        <tr>
          <td class="summary-label">{"Reference Track" if is_client else "Portfolio / GitHub URL"}</td>
          <td class="summary-value">
            {f'<a href="{portfolio_or_github}" style="color: #38bdf8;" target="_blank">{portfolio_or_github}</a>' if portfolio_or_github.startswith("http") else portfolio_or_github}
          </td>
        </tr>
      </table>

      <!-- Inquiry Scope & Message -->
      <div class="section-title">3. {"Project Scope & Escrow Specifications" if is_client else "Specialist Capabilities & Intent"}</div>
      <div class="message-box">
{project_scope}
      </div>

      <!-- Commercial & SLA Constraints -->
      <div class="section-title">4. Commercial & Delivery Parameters</div>
      <table class="summary-grid">
        <tr>
          <td class="summary-label">{"Estimated Escrow Budget" if is_client else "Target Rate / Compensation"}</td>
          <td class="summary-value" style="color: #34d399;">{estimated_budget}</td>
        </tr>
        <tr>
          <td class="summary-label">Response & Delivery SLA</td>
          <td class="summary-value" style="color: #fbbf24;">{deadline_sla}</td>
        </tr>
        <tr>
          <td class="summary-label">Escrow Smart Contract</td>
          <td class="summary-value">Required upon milestone agreement</td>
        </tr>
      </table>

      <!-- Advisory Team Recommended Action Plan -->
      <div class="section-title">5. Recommended Action Checklist</div>
      <div class="actions-card">
        <div style="font-weight: 600; color: #f8fafc; font-size: 13px;">
          {"Client Onboarding Workflow:" if is_client else "Specialist Verification Workflow:"}
        </div>
        <ul class="checklist">
          {'''
          <li>Schedule initial 20-minute architecture & scoping consultation with client.</li>
          <li>Structure deliverable milestones and deposit requirements in DoableForge Escrow.</li>
          <li>Assign 2-3 matched Principal Domain Specialists from verified talent registry.</li>
          ''' if is_client else '''
          <li>Audit submitted portfolio, GitHub code samples, or public pull requests.</li>
          <li>Provision sandboxed verification test harness with benchmark telemetry.</li>
          <li>Assign verified badge and unlock access to live enterprise milestones.</li>
          '''}
        </ul>
        <div style="margin-top: 18px; text-align: center;">
          <a href="mailto:{email}?subject={reply_subject}&body={reply_body}" class="cta-button">
            Direct Reply to {full_name}
          </a>
        </div>
      </div>

    </div>

    <!-- 6. Cryptographic Audit Footer -->
    <div class="footer">
      DOABLEFORGE VERIFIED ENTERPRISE DISPATCH PROTOCOL v2.4<br>
      Receipt Hash: {receipt_token} &bull; Security Level: High (TLS Encrypted)<br>
      Automated routing to contact@doableforge.com
    </div>

  </div>
</body>
</html>
"""


def render_admin_inquiry_plain(data: dict) -> str:
    """Fallback plain text version for admin inbox."""
    return f"""
================================================================================
DOABLEFORGE PLATFORM INQUIRY DISPATCH
Recipient: contact@doableforge.com
================================================================================
Receipt Token: {data.get('receipt_token')}
Inquiry Type : {data.get('inquiry_type', 'client').upper()}
Full Name    : {data.get('full_name')}
Email        : {data.get('email')}
Company/Role : {data.get('company')}
Portfolio/URL: {data.get('portfolio_or_github', 'N/A')}
Budget/Rate  : {data.get('estimated_budget')}
Turnaround   : {data.get('deadline_sla')}

--------------------------------------------------------------------------------
INQUIRY / PROJECT DETAILS:
--------------------------------------------------------------------------------
{data.get('project_scope')}

--------------------------------------------------------------------------------
Action: Reply to {data.get('email')} within <2 hours.
================================================================================
"""


def render_client_ack_html(data: dict) -> str:
    """
    Renders confirmation email sent back to the client or freelancer.
    Assures them of receipt, SLA guarantee, and next onboarding steps.
    """
    full_name = data.get("full_name", "Valued Partner")
    inquiry_type = data.get("inquiry_type", "client").lower()
    is_client = inquiry_type == "client"
    receipt_token = data.get("receipt_token", "DF-ADV-UNKNOWN")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Receipt: Your DoableForge Inquiry [{receipt_token}]</title>
  <style>
    body {{
      background: #05070f;
      color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 24px 0;
    }}
    .box {{
      max-width: 580px;
      margin: 0 auto;
      background: #090e1f;
      border: 1px solid #1e293b;
      border-radius: 14px;
      padding: 32px;
    }}
    .token {{
      display: inline-block;
      padding: 6px 14px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 8px;
      font-family: monospace;
      color: #38bdf8;
      font-weight: bold;
      font-size: 15px;
      margin: 12px 0;
    }}
    .btn {{
      display: inline-block;
      padding: 12px 24px;
      background: #38bdf8;
      color: #030712 !important;
      font-weight: bold;
      text-decoration: none;
      border-radius: 9999px;
      margin-top: 16px;
    }}
  </style>
</head>
<body>
  <div class="box">
    <div style="font-size: 11px; text-transform: uppercase; color: #38bdf8; letter-spacing: 0.15em; font-weight: bold;">
      DoableForge Confirmation
    </div>
    <h2 style="color: #ffffff; margin-top: 6px;">We've received your inquiry</h2>
    <p style="color: #cbd5e1; line-height: 1.6;">
      Hello <strong>{full_name}</strong>,
    </p>
    <p style="color: #cbd5e1; line-height: 1.6;">
      Thank you for connecting with DoableForge. Your inquiry has been logged into our advisory queue with a guaranteed <strong>&lt;2 hour response turnaround SLA</strong>.
    </p>

    <div>Receipt Token:</div>
    <div class="token">{receipt_token}</div>

    <div style="margin: 20px 0; padding: 16px; background: #040711; border-radius: 8px; border: 1px solid #1e293b;">
      <div style="font-weight: 600; color: #38bdf8; font-size: 13px; margin-bottom: 6px;">
        {"Next Steps for Clients:" if is_client else "Next Steps for Specialists:"}
      </div>
      <p style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.5;">
        {"An advisory partner is reviewing your deliverable scope and preparing a tailored milestone roadmap." if is_client else "Our technical team is reviewing your profile to provision your skill benchmark harness and activate milestone access."}
      </p>
    </div>

    <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
      If you have additional attachments or specifications, you can reply directly to this email or write to <a href="mailto:contact@doableforge.com" style="color: #38bdf8;">contact@doableforge.com</a>.
    </p>

    <div style="border-top: 1px solid #1e293b; margin-top: 24px; padding-top: 16px; font-size: 11px; color: #475569;">
      &copy; 2026 DoableForge Platform. All rights reserved. Zero-resume bias talent network.
    </div>
  </div>
</body>
</html>
"""


def _connect_smtp(smtp_user: str, smtp_pass: str):
    """Establish and authenticate a clean SMTP session."""

    if settings.SMTP_PORT == 465 or settings.SMTP_USE_SSL:
        server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15)
    else:
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15)
        server.ehlo()
        if settings.SMTP_USE_TLS:
            server.starttls()
            server.ehlo()
    server.login(smtp_user, smtp_pass)
    return server


def send_inquiry_emails(inquiry_data: dict) -> dict:
    """
    Primary backend dispatch function.
    1. Prepares the formatted HTML & text templates.
    2. Sends the structured inquiry to contact@doableforge.com.
    3. Sends receipt acknowledgment to the inquirer.
    4. Handles local preview fallback if credentials are not configured.
    """
    receipt_token = inquiry_data.get("receipt_token", "DF-ADV-TEMP")
    user_email = inquiry_data.get("email")
    inquiry_type = inquiry_data.get("inquiry_type", "client")
    full_name = inquiry_data.get("full_name", "Inquirer")

    # Render templates
    admin_html = render_admin_inquiry_html(inquiry_data)
    admin_plain = render_admin_inquiry_plain(inquiry_data)
    client_ack_html = render_client_ack_html(inquiry_data)

    ensure_preview_dir()
    admin_preview_path = PREVIEW_DIR / f"{receipt_token}_admin_inquiry.html"
    ack_preview_path = PREVIEW_DIR / f"{receipt_token}_client_ack.html"

    # Always write HTML preview so team can inspect layout locally
    try:
        with open(admin_preview_path, "w", encoding="utf-8") as f:
            f.write(admin_html)
        with open(ack_preview_path, "w", encoding="utf-8") as f:
            f.write(client_ack_html)
        logger.info(f"[EMAIL SERVICE] Saved email preview: {admin_preview_path}")
    except Exception as e:
        logger.warning(f"[EMAIL SERVICE] Could not save email preview file: {e}")

    # Check if SMTP credentials are provided
    smtp_user = settings.SMTP_USER
    smtp_pass = settings.SMTP_PASSWORD
    recipient = settings.CONTACT_RECIPIENT_EMAIL or "contact@doableforge.com"

    if not smtp_user or not smtp_pass or "your-" in smtp_user:
        logger.info(
            f"[EMAIL SERVICE (DEV MODE)] Live SMTP credentials not set in .env. "
            f"Simulated dispatch for token={receipt_token} to {recipient}. "
            f"Inspect visual output in: {admin_preview_path}"
        )
        return {
            "status": "simulated_preview",
            "receipt_token": receipt_token,
            "recipient": recipient,
            "admin_preview": str(admin_preview_path),
            "ack_preview": str(ack_preview_path),
            "message": "Inquiry generated and logged to preview storage."
        }

    # Live SMTP Dispatch
    results = {"admin_sent": False, "client_ack_sent": False, "errors": []}

    # 1. Dispatch to contact@doableforge.com
    server_admin = None
    try:
        logger.info(f"[EMAIL SERVICE] Connecting to SMTP server {settings.SMTP_HOST}:{settings.SMTP_PORT}...")
        server_admin = _connect_smtp(smtp_user, smtp_pass)

        msg_admin = MIMEMultipart("alternative")
        subject_type = "Client Project & Escrow" if inquiry_type == "client" else "Specialist Application"
        msg_admin["Subject"] = f"[DoableForge Inbound] {subject_type}: {full_name} [{receipt_token}]"
        msg_admin["From"] = f"DoableForge Inquiry Gateway <{smtp_user}>"
        msg_admin["To"] = recipient
        msg_admin["Reply-To"] = user_email
        msg_admin.attach(MIMEText(admin_plain, "plain"))
        msg_admin.attach(MIMEText(admin_html, "html"))

        server_admin.sendmail(smtp_user, [recipient], msg_admin.as_string())
        results["admin_sent"] = True
        logger.info(f"[EMAIL SERVICE] Successfully dispatched inquiry {receipt_token} to {recipient}")
    except Exception as e:
        logger.error(f"[EMAIL SERVICE ERROR] Failed to send admin email: {e}")
        results["errors"].append(str(e))
    finally:
        if server_admin:
            try:
                server_admin.quit()
            except Exception:
                pass

    # 2. Automated Acknowledgment to Inquirer
    if settings.SEND_CLIENT_CONFIRMATION and user_email and "@" in user_email:
        server_ack = None
        try:
            msg_ack = MIMEMultipart("alternative")
            msg_ack["Subject"] = f"Receipt: Your DoableForge Inquiry [{receipt_token}]"
            msg_ack["From"] = f"DoableForge Team <{smtp_user}>"
            msg_ack["To"] = user_email
            msg_ack["Reply-To"] = recipient
            msg_ack.attach(MIMEText(
                f"Hello {full_name},\n\nWe received your inquiry ({receipt_token}). Our team will respond within <2 hours.\n\nDoableForge Desk",
                "plain"
            ))
            msg_ack.attach(MIMEText(client_ack_html, "html"))

            server_ack = _connect_smtp(smtp_user, smtp_pass)
            server_ack.sendmail(smtp_user, [user_email], msg_ack.as_string())
            results["client_ack_sent"] = True
            logger.info(f"[EMAIL SERVICE] Sent acknowledgment email to {user_email}")
        except Exception as ack_err:
            logger.warning(f"[EMAIL SERVICE] Could not send acknowledgment: {ack_err}")
            results["errors"].append(str(ack_err))
        finally:
            if server_ack:
                try:
                    server_ack.quit()
                except Exception:
                    pass

    return results

