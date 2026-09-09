# Product Requirements Document (PRD)

# DoableForge

**Tagline:** *Hire skills. Build reputation. Keep your privacy.*

**Product Type:** Privacy-first freelance marketplace
**Frontend:** React
**Backend:** Node.js / NestJS
**Status:** Product Definition
**Version:** 1.0

---

# 1. Executive Summary

## What is DoableForge?

**DoableForge** is a privacy-first, skill-based freelance marketplace where professionals can discover and complete freelance projects without publicly revealing unnecessary personal or professional background information.

Unlike traditional freelance platforms that heavily depend on resumes, employer history, education, LinkedIn profiles, and personal identity, DoableForge focuses on:

* Skills
* Verified abilities
* Proof of work
* Platform reputation
* Project performance
* Client feedback

A freelancer can build a trusted professional identity under a persistent pseudonym while maintaining privacy around their employer history and other personal details.

The platform is designed to support legitimate independent and side work while providing safeguards that help users identify potential conflicts of interest and contractual risks.

---

# 2. Problem Statement

Traditional freelance platforms require professionals to publicly expose significant parts of their professional identity.

Typical profiles contain:

* Real name
* Profile photograph
* Employment history
* Current company
* Previous companies
* Education
* University
* LinkedIn profile
* Location

This creates several problems.

## Problem 1: Lack of Professional Privacy

Many professionals do not want their employer history or current workplace publicly connected to freelance activity.

They may want to separate:

```text
FULL-TIME PROFESSIONAL IDENTITY
                │
                │
                ▼
       PERSONAL FREELANCE WORK
```

Existing platforms often make this separation difficult.

---

## Problem 2: Hiring Bias

Clients frequently make decisions based on:

* Famous companies
* Prestigious universities
* Years of experience
* Personal identity
* Location

rather than actual ability.

A talented developer may be rejected because they do not have an impressive-looking background.

---

## Problem 3: Anonymous Freelancing Has a Trust Problem

If identity information is hidden, clients naturally ask:

> "How can I trust this freelancer?"

DoableForge solves this through a new trust model:

```text
ANONYMITY
     +
SKILL VERIFICATION
     +
PROOF OF WORK
     +
REPUTATION
     +
PROJECT PERFORMANCE
     =
TRUST
```

---

# 3. Product Vision

## Vision Statement

> **Create a professional marketplace where people are hired for what they can do, not for where they worked or who they are.**

DoableForge aims to create a new kind of professional identity.

Instead of:

```text
"I worked at Company X."
```

Users can demonstrate:

```text
"I have completed 42 successful projects."

"I have a 96% delivery success rate."

"My React skills are verified."

"My client satisfaction score is 4.9/5."
```

---

# 4. Target Users

## 4.1 Freelancers

Professionals looking for independent projects.

Examples:

* Software developers
* AI engineers
* Designers
* Writers
* Data analysts
* Product designers
* Video editors
* Marketing professionals

### Primary Needs

* Privacy
* Side income opportunities
* Skill-based reputation
* Secure payments
* Project discovery

---

## 4.2 Clients

Individuals, startups, and businesses looking for talent.

### Primary Needs

* Trusted freelancers
* Verified skills
* High-quality work
* Secure payments
* Efficient hiring

---

## 4.3 Platform Administrators

Responsible for:

* User verification
* Fraud prevention
* Dispute management
* Platform moderation
* Trust and safety

---

# 5. Core Product Principles

## Principle 1: Privacy by Default

DoableForge should minimize public exposure of personal information.

---

## Principle 2: Skills Over Background

Hiring should prioritize demonstrated ability.

```text
SKILLS > RESUME
WORK > CLAIMS
REPUTATION > EMPLOYER NAME
```

---

## Principle 3: Trust Without Public Identity

Users should be able to build professional trust through verified performance.

---

## Principle 4: Compliance Awareness

The platform must not encourage users to violate employment agreements, confidentiality obligations, or conflicts of interest.

DoableForge provides awareness tools and warnings rather than legal advice.

---

# 6. User Roles

## Freelancer

Can:

* Create anonymous professional identity
* Build a skill profile
* Complete assessments
* Browse projects
* Submit proposals
* Communicate with clients
* Complete milestones
* Receive payments
* Build reputation

---

## Client

Can:

* Create projects
* Define requirements
* Review anonymous candidates
* Hire freelancers
* Manage milestones
* Communicate with freelancers
* Review completed work

---

## Administrator

Can:

* Moderate users
* Review reports
* Manage disputes
* Monitor suspicious activity
* Manage skill verification
* Manage platform content

---

# 7. Core Feature: Anonymous Professional Identity

Every freelancer has two layers of identity.

## Layer 1: Private Identity

Stored securely by the platform when required for account, security, or payment operations.

```text
PRIVATE IDENTITY VAULT

├── Account verification information
├── Security information
├── Payment-related information
└── Account recovery information
```

This information is not publicly displayed.

---

## Layer 2: Public Professional Identity

Visible to clients.

Example:

```text
╔══════════════════════════════╗
║        DEV_FORGE_482         ║
╠══════════════════════════════╣
║ Trust Score: 92/100          ║
║ Rating: 4.9 ⭐                ║
║ Projects Completed: 27       ║
║ Success Rate: 96%            ║
╠══════════════════════════════╣
║ VERIFIED SKILLS              ║
║ ✓ React                     ║
║ ✓ Node.js                   ║
║ ✓ Python                    ║
║ ✓ PostgreSQL                ║
╚══════════════════════════════╝
```

---

# 8. Persistent Pseudonymous Identity

Users create a unique professional identity.

Examples:

```text
ForgeDev_482
CodeArchitect_X
PixelForge_21
DataSmith_77
AIBuilder_909
```

This identity remains consistent across the platform.

Over time:

```text
ANONYMOUS IDENTITY
        │
        ▼
PROJECT COMPLETION
        │
        ▼
CLIENT REVIEWS
        │
        ▼
SKILL VERIFICATION
        │
        ▼
REPUTATION GROWTH
```

The pseudonym becomes a valuable professional asset.

---

# 9. Skill Passport

Every freelancer receives a **DoableForge Skill Passport**.

Example:

```text
╔════════════════════════════════╗
║     DOABLEFORGE SKILL PASSPORT  ║
╠════════════════════════════════╣
║ React                 92/100   ║
║ JavaScript            89/100   ║
║ Node.js               84/100   ║
║ System Design         82/100   ║
║ PostgreSQL            87/100   ║
╠════════════════════════════════╣
║ Verified Skills: 5             ║
║ Projects Completed: 24         ║
║ Client Satisfaction: 97%       ║
╚════════════════════════════════╝
```

---

# 10. Skill Verification System

Users can verify skills through multiple methods.

## Method 1: Practical Assessments

Examples:

### React

```text
Build a dashboard component.
```

### Backend

```text
Create a REST API with authentication.
```

### Database

```text
Design a database schema.
```

---

## Method 2: Project-Based Verification

Users complete practical projects.

The system evaluates:

* Code quality
* Functionality
* Architecture
* Performance
* Security

---

## Method 3: AI-Assisted Evaluation

AI can evaluate submissions and generate structured feedback.

Example:

```text
CODE QUALITY:        91/100
ARCHITECTURE:        87/100
SECURITY:            82/100
PERFORMANCE:         89/100

FINAL SCORE:         87/100
```

Human review can be introduced for high-stakes verification tiers.

---

# 11. Project Marketplace

Clients can create projects.

## Project Fields

```text
Project Title

Description

Required Skills

Experience Level

Budget

Project Duration

Project Type

Milestones

Deadline
```

Example:

```text
AI SaaS Dashboard

Required Skills:
✓ React
✓ Python
✓ OpenAI API
✓ PostgreSQL

Budget:
$2,000 - $4,000

Duration:
30 Days
```

---

# 12. AI Project Matching

DoableForge includes an intelligent matching engine.

## Workflow

```text
CLIENT POSTS PROJECT
          │
          ▼
AI ANALYZES REQUIREMENTS
          │
          ▼
EXTRACT SKILLS
          │
          ▼
MATCH FREELANCER PROFILES
          │
          ▼
RANK CANDIDATES
          │
          ▼
RECOMMENDED TALENT
```

---

## Matching Factors

```text
Skill Match              35%

Relevant Experience      20%

Trust Score              15%

Project Success Rate     15%

Availability             10%

Client Preferences        5%
```

Example:

```text
DEV_482      96% MATCH
DEV_921      93% MATCH
DEV_187      89% MATCH
```

---

# 13. Blind Hiring System

Clients can initially review freelancers without seeing traditional background information.

Example:

```text
CANDIDATE: DEV_482

Skill Match: 96%

Trust Score: 92

Completed Projects: 31

Success Rate: 97%

Verified Skills:

✓ React
✓ Next.js
✓ Node.js
✓ PostgreSQL

Relevant Projects:

✓ SaaS Dashboard
✓ AI Application
✓ E-Commerce Platform

[ Invite to Project ]
```

This reduces hiring bias.

---

# 14. Proposal System

Freelancers can submit proposals.

A proposal contains:

```text
Introduction

Project Understanding

Technical Approach

Timeline

Cost

Relevant Work

Questions
```

---

## AI Proposal Assistant

The AI assistant helps freelancers:

* Understand projects
* Generate proposal drafts
* Improve clarity
* Identify missing requirements
* Estimate timelines

Users remain responsible for reviewing and submitting their final proposals.

---

# 15. Secure Communication

Every active project has private communication.

Features:

* Real-time messaging
* File sharing
* Project discussions
* Milestone conversations
* Notifications

---

## Privacy Protection

The platform can detect accidental sharing of sensitive information.

Examples:

```text
⚠️ Possible personal email detected.

Do you want to share this information?
```

or:

```text
⚠️ This message may contain confidential company information.

Please review before sending.
```

The system should focus on privacy protection and user awareness.

---

# 16. Project Workspace

Every active contract receives a dedicated workspace.

```text
PROJECT WORKSPACE

├── Overview
├── Tasks
├── Chat
├── Files
├── Milestones
├── Deliverables
└── Activity History
```

---

# 17. Milestone System

Projects can be divided into milestones.

Example:

```text
PROJECT

Milestone 1
Database Architecture
$500

Milestone 2
Backend Development
$1,000

Milestone 3
Frontend Development
$1,000

Milestone 4
Deployment
$500
```

---

# 18. Payment Architecture

The product should integrate with regulated payment providers appropriate for the platform's launch markets.

## Payment Flow

```text
CLIENT
   │
   ▼
PAYMENT PROVIDER
   │
   ▼
PLATFORM PAYMENT STATE
   │
   ▼
MILESTONE APPROVAL
   │
   ▼
FREELANCER PAYOUT
```

The MVP should avoid building an unregulated custodial financial system.

---

# 19. TrustScore System

DoableForge creates a reputation metric called:

# ForgeScore

Example:

```text
FORGE SCORE

92 / 100
```

---

## Score Components

```text
Verified Skills          20%

Project Success          25%

Client Ratings           20%

On-Time Delivery         15%

Communication            10%

Platform Reliability     10%
```

---

## Reputation Levels

```text
0 - 30

New Forge

31 - 50

Emerging Forge

51 - 70

Trusted Forge

71 - 85

Elite Forge

86 - 100

Legend Forge
```

---

# 20. Portfolio System

Freelancers can showcase work without exposing unnecessary personal information.

Portfolio items include:

* Project description
* Technologies used
* Screenshots
* Demo links
* Git repositories where appropriate
* Outcomes
* Skills demonstrated

Example:

```text
PROJECT:
AI Customer Support Platform

TECH STACK:
React
Node.js
PostgreSQL
OpenAI

OUTCOME:
Reduced support response time by 60%
```

---

# 21. Privacy and Conflict Awareness

Before accepting projects, users may optionally define restricted categories based on their obligations.

Example:

```text
RESTRICTED CATEGORY:

Financial Trading Platforms
```

When a project matches this category:

```text
⚠️ POTENTIAL OVERLAP DETECTED

This project may overlap with a category
you marked as restricted.

Review your contractual and confidentiality
obligations before accepting this project.
```

DoableForge does not provide legal advice.

---

# 22. Dashboard

## Freelancer Dashboard

```text
WELCOME BACK

FORGEDEV_482

━━━━━━━━━━━━━━━━━━━━

EARNINGS

$4,250

ACTIVE PROJECTS

3

FORGE SCORE

92

━━━━━━━━━━━━━━━━━━━━

RECOMMENDED PROJECTS

AI SaaS Platform
96% Match

React Dashboard
92% Match

Python Automation Tool
89% Match
```

---

## Client Dashboard

```text
ACTIVE PROJECTS: 4

TOTAL SPENDING

$12,400

OPEN POSITIONS

3

RECOMMENDED TALENT

DEV_482
96% Match

DATA_921
93% Match
```

---

# 23. Notification System

Users receive notifications for:

* New projects
* Project invitations
* Proposal responses
* New messages
* Milestone updates
* Payment updates
* Reviews
* Skill verification results

---

# 24. Admin Dashboard

Administrators can manage:

## User Management

* User status
* Reports
* Suspensions
* Verification review

## Project Moderation

* Reported projects
* Suspicious projects
* Scam detection

## Disputes

* Open disputes
* Evidence
* Resolution status

## Platform Analytics

* Active users
* Active projects
* Revenue
* Project success rate

---

# 25. Recommended Technology Stack

# Frontend

## React + TypeScript

```text
React
TypeScript
Vite
React Router
```

---

## UI

```text
Tailwind CSS
shadcn/ui
Radix UI
Framer Motion
Lucide Icons
```

---

## State Management

```text
Zustand
TanStack Query
```

Recommended architecture:

```text
React Application

├── UI State
│      └── Zustand
│
├── Server State
│      └── TanStack Query
│
└── API Layer
       └── Axios / Fetch
```

---

# Backend

```text
Node.js
NestJS
TypeScript
```

NestJS is recommended because the platform will eventually have complex modules.

---

# Database

```text
PostgreSQL
```

ORM:

```text
Prisma
```

---

# Caching

```text
Redis
```

Used for:

* Sessions
* Rate limiting
* Notifications
* Caching
* Queues

---

# Real-Time Communication

```text
Socket.IO
```

---

# File Storage

```text
AWS S3
```

Alternative:

```text
Cloudflare R2
```

---

# AI Infrastructure

```text
LLM API
Embeddings
pgvector
```

Use cases:

* Project matching
* Skill extraction
* Proposal assistance
* Project categorization
* Risk detection

---

# 26. System Architecture

```text
                    ┌─────────────────┐
                    │  REACT FRONTEND │
                    │                 │
                    │ Vite + TS       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    API GATEWAY  │
                    └────────┬────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   NESTJS BACKEND    │
                  └──────────┬──────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼

  AUTH MODULE         PROJECT MODULE       MATCHING ENGINE

        │                    │                    │

        ▼                    ▼                    ▼

  POSTGRESQL            REDIS             AI SERVICES
```

---

# 27. Database Architecture

## Users

```text
users

id
email
password_hash
role
status
created_at
updated_at
```

---

## Anonymous Profiles

```text
anonymous_profiles

id
user_id
pseudonym
bio
forge_score
rating
projects_completed
success_rate
created_at
```

---

## Skills

```text
skills

id
name
category
```

---

## User Skills

```text
user_skills

id
profile_id
skill_id
score
verification_status
```

---

## Projects

```text
projects

id
client_id
title
description
budget_min
budget_max
status
deadline
created_at
```

---

## Proposals

```text
proposals

id
project_id
freelancer_id
cover_letter
bid_amount
timeline
status
created_at
```

---

## Contracts

```text
contracts

id
project_id
client_id
freelancer_id
status
created_at
```

---

## Milestones

```text
milestones

id
contract_id
title
amount
deadline
status
```

---

## Reviews

```text
reviews

id
reviewer_id
reviewed_profile_id
rating
comment
created_at
```

---

# 28. MVP Scope

The MVP should focus on proving the core concept.

## Must Have

### Authentication

* Signup
* Login
* Role selection

### Anonymous Profiles

* Pseudonym
* Skills
* Bio
* Portfolio

### Projects

* Create projects
* Browse projects
* Search projects

### Proposals

* Submit proposal
* Accept/reject proposal

### Contracts

* Basic project workflow

### Reputation

* Ratings
* Reviews
* ForgeScore

### Dashboard

* Freelancer dashboard
* Client dashboard

---

# 29. Phase 2

Add:

* AI project matching
* Skill verification
* Real-time chat
* Advanced portfolio
* Milestone management
* File sharing

---

# 30. Phase 3

Add:

* AI proposal assistant
* AI risk detection
* Conflict awareness system
* Advanced analytics
* Team collaboration
* Advanced reputation algorithms

---

# 31. Success Metrics

## Marketplace Metrics

```text
Monthly Active Users

Projects Posted

Projects Completed

Proposal Acceptance Rate

Repeat Clients

Freelancer Retention
```

---

## Trust Metrics

```text
Project Success Rate

Dispute Rate

Average Rating

On-Time Delivery Rate

Fraud Reports
```

---

# 32. Key Differentiator

Traditional marketplaces work like:

```text
PERSON
   │
   ▼
RESUME
   │
   ▼
EMPLOYMENT HISTORY
   │
   ▼
CLIENT TRUST
```

DoableForge works like:

```text
PERSON
   │
   ▼
PRIVATE IDENTITY
   │
   ▼
PSEUDONYMOUS PROFESSIONAL IDENTITY
   │
   ├───────────────┐
   ▼               ▼
SKILLS          PROJECT WORK
   │               │
   └───────┬───────┘
           ▼
      REPUTATION
           │
           ▼
      FORGE SCORE
           │
           ▼
       CLIENT TRUST
```

---

# 33. Future Vision

DoableForge could eventually become more than a freelance marketplace.

It could become a:

# Privacy-First Professional Reputation Network

Where users own a persistent professional reputation built through:

* Verified skills
* Completed work
* Client trust
* Performance history
* Proof of work

The long-term vision is:

> **A world where your opportunities are determined by what you can build and deliver, not by the logos on your resume.**

---

# 34. Final Product Statement

## DoableForge

**DoableForge is a privacy-first freelance marketplace that enables professionals to build trusted pseudonymous careers through verified skills, proof of work, and reputation.**

It gives freelancers the ability to maintain professional privacy while giving clients the confidence to hire based on measurable capability and performance.

### The Formula

```text
PRIVACY
    +
VERIFIED SKILLS
    +
PROOF OF WORK
    +
REPUTATION
    +
AI MATCHING
    =
DOABLEFORGE
```

# Tagline

## **Hire Skills. Build Reputation. Keep Your Privacy.**
