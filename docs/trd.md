# Technical Requirements Document (TRD)

# DoableForge

**Product:** Privacy-First Freelance Marketplace
**Document Type:** Technical Requirements Document
**Version:** 1.0
**Frontend:** React + TypeScript
**Backend:** Python + FastAPI

---

# 1. Technical Overview

## 1.1 Purpose

DoableForge is a privacy-first, skill-based freelance marketplace that allows professionals to build a pseudonymous professional identity and earn through freelance projects.

The platform prioritizes:

* Privacy
* Skill-based hiring
* Verified capabilities
* Proof of work
* Anonymous reputation
* Secure collaboration
* AI-powered project matching

The technical architecture must support a scalable marketplace where clients and freelancers interact without requiring unnecessary public disclosure of professional background information.

---

# 2. Technology Stack

## 2.1 Frontend

```text
React
TypeScript
Vite
React Router
Tailwind CSS
shadcn/ui
Zustand
TanStack Query
Three.js
React Three Fiber
Framer Motion
Lucide React
```

---

## 2.2 Backend

```text
Python
FastAPI
Pydantic
SQLAlchemy
Alembic
Celery / ARQ
Redis
WebSockets
```

---

## 2.3 Database

```text
PostgreSQL
pgvector
```

PostgreSQL will store:

* Users
* Anonymous profiles
* Projects
* Proposals
* Contracts
* Milestones
* Reviews
* Skills
* Reputation

pgvector will support:

* Semantic project matching
* Skill similarity
* AI recommendations

---

# 3. High-Level System Architecture

```text
                         ┌─────────────────────┐
                         │                     │
                         │   REACT FRONTEND    │
                         │                     │
                         │ React + TypeScript  │
                         │                     │
                         └──────────┬──────────┘
                                    │
                                    │ HTTPS
                                    ▼

                         ┌─────────────────────┐
                         │                     │
                         │    FASTAPI API      │
                         │                     │
                         │ Python Backend      │
                         │                     │
                         └──────────┬──────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼

   ┌───────────────┐        ┌───────────────┐       ┌────────────────┐
   │ AUTH SERVICE  │        │ PROJECT       │       │ AI MATCHING    │
   │               │        │ SERVICE       │       │ ENGINE         │
   └───────┬───────┘        └───────┬───────┘       └────────┬───────┘
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
                                    ▼

                         ┌─────────────────────┐
                         │                     │
                         │    POSTGRESQL       │
                         │     + PGVECTOR      │
                         │                     │
                         └─────────────────────┘

                                    │
                     ┌──────────────┼──────────────┐
                     ▼              ▼              ▼

                  REDIS         AI SERVICES     FILE STORAGE
```

---

# 4. Frontend Architecture

## 4.1 Core Structure

```text
frontend/
│
├── src/
│   │
│   ├── app/
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   └── App.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── project/
│   │   └── profile/
│   │
│   ├── pages/
│   │   ├── landing/
│   │   ├── auth/
│   │   ├── freelancer/
│   │   ├── client/
│   │   ├── projects/
│   │   └── admin/
│   │
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── userStore.ts
│   │   ├── uiStore.ts
│   │   └── workspaceStore.ts
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   └── profile.service.ts
│   │
│   ├── types/
│   │
│   ├── lib/
│   │
│   └── utils/
│
├── public/
│
└── package.json
```

---

# 5. UI Technology

## 5.1 Tailwind CSS

Tailwind CSS will handle:

* Layout
* Responsive design
* Spacing
* Typography
* Dark mode
* Animations
* Component styling

---

## 5.2 shadcn/ui

shadcn/ui will provide reusable components.

Primary components:

```text
Button
Card
Dialog
Sheet
Dropdown Menu
Avatar
Badge
Tabs
Table
Input
Textarea
Select
Toast
Command
Skeleton
Popover
Progress
Tooltip
```

---

# 6. Zustand State Management

Zustand will manage lightweight global client-side state.

## Store Architecture

```text
stores/
│
├── authStore.ts
│
├── userStore.ts
│
├── uiStore.ts
│
├── projectStore.ts
│
├── workspaceStore.ts
│
└── threeStore.ts
```

---

## 6.1 Auth Store

Responsible for:

```text
User Authentication
Access Token
User Role
Session State
Logout
```

---

## 6.2 UI Store

Responsible for:

```text
Sidebar State
Theme
Modals
Notifications
Global UI Preferences
```

---

## 6.3 Project Store

Responsible for temporary client-side project state.

Server data should primarily be managed through **TanStack Query**.

Architecture:

```text
SERVER DATA
      │
      ▼
TanStack Query

CLIENT UI STATE
      │
      ▼
Zustand
```

---

# 7. Three.js Integration

Three.js will provide a distinctive visual identity for DoableForge.

The recommended implementation is:

```text
Three.js
+
React Three Fiber
+
Drei
```

---

# 8. The DoableForge Visual Universe

DoableForge should have an interactive visual representation of the platform.

Instead of a static landing page, users can explore a digital environment called:

# The Forge

The Forge represents the ecosystem of:

* Freelancers
* Skills
* Projects
* Opportunities
* Reputation

---

## 8.1 Interactive Landing Scene

```text
                ✦
          PROJECT NODE

               ●
             /   \
            /     \

      ●─────●──────●────●

   FREELANCER    THE FORGE
      NODE

            \
             \
              ●

         SKILL NODE
```

Each node represents:

```text
Blue Nodes     → Projects
Purple Nodes   → Skills
Green Nodes    → Opportunities
Gold Nodes     → High Reputation
```

The user can interact with nodes.

---

# 9. Three.js Components

```text
three/
│
├── ForgeScene.tsx
├── ForgeNodes.tsx
├── SkillGalaxy.tsx
├── ProjectUniverse.tsx
├── ReputationCore.tsx
├── ParticleField.tsx
└── CameraController.tsx
```

---

# 10. Three.js Experiences

## Experience 1: Forge Landing Page

An interactive 3D ecosystem.

```text
USER ENTERS
      │
      ▼
3D FORGE UNIVERSE
      │
      ├── Explore Projects
      │
      ├── Explore Skills
      │
      ├── Find Talent
      │
      └── Build Reputation
```

---

## Experience 2: Skill Galaxy

A freelancer's skills are visualized as a galaxy.

Example:

```text
                React
                  ●

        Python              Node.js
           ●                  ●


                 USER
                  ●


        PostgreSQL         Docker
             ●               ●
```

The stronger the skill:

```text
HIGHER SKILL SCORE
        ↓
LARGER / MORE PROMINENT NODE
```

---

## Experience 3: Reputation Core

The user's ForgeScore can be represented as an interactive 3D core.

```text
        ◉
     ◉     ◉

   ◉   92   ◉

     ◉     ◉
        ◉
```

This provides a visually distinctive experience without replacing the normal accessible dashboard UI.

---

# 11. Three.js Performance Requirements

Three.js should not negatively impact platform usability.

Requirements:

```text
Lazy Loading
GPU Detection
FPS Monitoring
Fallback Mode
Mobile Optimization
Reduced Motion Support
```

---

## Fallback

If the device does not support WebGL:

```text
3D EXPERIENCE
      │
      ▼
NOT AVAILABLE
      │
      ▼
DISPLAY 2D EXPERIENCE
```

The core platform must always work without Three.js.

---

# 12. Backend Architecture

The backend will use:

# Python + FastAPI

Architecture:

```text
backend/
│
├── app/
│   │
│   ├── main.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   │
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── profiles.py
│   │   │   ├── projects.py
│   │   │   ├── proposals.py
│   │   │   ├── contracts.py
│   │   │   ├── messages.py
│   │   │   └── reviews.py
│   │
│   ├── models/
│   │
│   ├── schemas/
│   │
│   ├── services/
│   │
│   ├── repositories/
│   │
│   ├── workers/
│   │
│   └── utils/
│
├── alembic/
│
├── tests/
│
└── requirements.txt
```

---

# 13. FastAPI API Design

Base URL:

```text
/api/v1
```

---

## Authentication

```text
POST /auth/register

POST /auth/login

POST /auth/logout

POST /auth/refresh

GET /auth/me
```

---

## Profiles

```text
GET /profiles/me

PATCH /profiles/me

GET /profiles/{pseudonym}

POST /profiles/skills

GET /profiles/reputation
```

---

## Projects

```text
GET /projects

POST /projects

GET /projects/{project_id}

PATCH /projects/{project_id}

DELETE /projects/{project_id}
```

---

## Proposals

```text
POST /projects/{project_id}/proposals

GET /projects/{project_id}/proposals

PATCH /proposals/{proposal_id}

DELETE /proposals/{proposal_id}
```

---

# 14. Authentication Architecture

Recommended authentication:

```text
JWT Access Token
+
Refresh Token
+
HTTPOnly Cookies
```

Flow:

```text
USER LOGIN
     │
     ▼
FASTAPI
     │
     ▼
VERIFY CREDENTIALS
     │
     ▼
GENERATE TOKENS
     │
     ▼
SECURE SESSION
```

---

# 15. Database Architecture

# PostgreSQL

Core tables:

```text
users

anonymous_profiles

skills

profile_skills

projects

proposals

contracts

milestones

reviews

messages

notifications

portfolio_items
```

---

# 16. User Identity Architecture

```text
USER ACCOUNT
      │
      ▼
PRIVATE ACCOUNT DATA
      │
      │ Protected
      ▼
────────────────────────
      │
      │ Public Mapping
      ▼
ANONYMOUS PROFILE
      │
      ▼
PSEUDONYM
      │
      ▼
FORGE SCORE
```

Public API responses should never accidentally expose private fields.

---

# 17. AI Matching Engine

The AI matching system analyzes projects and freelancer profiles.

```text
PROJECT DESCRIPTION
        │
        ▼
AI EXTRACTION
        │
        ▼
SKILLS + REQUIREMENTS
        │
        ▼
EMBEDDING
        │
        ▼
PGVECTOR SEARCH
        │
        ▼
MATCHED FREELANCERS
        │
        ▼
RANKING ENGINE
```

---

# 18. Matching Score

```text
FINAL MATCH SCORE

Skill Similarity       40%

Relevant Projects      20%

ForgeScore             15%

Success Rate           10%

Availability           10%

Client Preferences      5%
```

---

# 19. Redis

Redis will be used for:

```text
Caching
Rate Limiting
WebSocket Presence
Background Jobs
Notifications
Temporary Sessions
```

---

# 20. Background Workers

Long-running tasks should not block FastAPI requests.

Tasks:

```text
AI Matching

Email Notifications

Skill Evaluation

Portfolio Processing

Analytics

Report Processing
```

Recommended options:

```text
Celery + Redis
```

or:

```text
ARQ + Redis
```

For the MVP:

# ARQ + Redis

is recommended because it fits naturally into an async Python/FastAPI architecture.

---

# 21. Real-Time System

FastAPI WebSockets will provide:

```text
Real-Time Messaging

Typing Indicators

Online Status

Notifications

Project Activity Updates
```

Architecture:

```text
CLIENT A
    │
    ▼
WEBSOCKET SERVER
    │
    ▼
REDIS PUB/SUB
    │
    ▼
CLIENT B
```

---

# 22. File Storage

Use:

```text
Cloudflare R2
```

or:

```text
AWS S3
```

Files include:

* Portfolio images
* Project documents
* Deliverables
* Attachments

Recommended:

# Cloudflare R2

because it can reduce storage and bandwidth costs.

---

# 23. Security Requirements

## Authentication

```text
JWT
Refresh Tokens
Password Hashing
Rate Limiting
```

---

## Password Security

Use:

```text
Argon2
```

---

## API Security

```text
HTTPS

CORS

Rate Limiting

Input Validation

SQL Injection Protection

XSS Protection

CSRF Protection where applicable
```

---

# 24. Privacy Requirements

The system must enforce strict separation between:

```text
PRIVATE DATA

and

PUBLIC PROFILE DATA
```

Public endpoints must only return approved public fields.

Sensitive information must never be returned through:

* Profile APIs
* Search APIs
* Project APIs
* Recommendation APIs

---

# 25. Frontend Routing

```text
/

 /login

 /register

 /explore

 /projects

 /projects/:id

 /profile/:pseudonym

 /dashboard

 /dashboard/projects

 /dashboard/proposals

 /dashboard/workspace/:id

 /settings

 /admin
```

---

# 26. Main User Flow

```text
LANDING PAGE
      │
      ▼
CREATE ACCOUNT
      │
      ▼
SELECT ROLE
      │
      ├──────────────┐
      ▼              ▼

FREELANCER       CLIENT

      │              │

      ▼              ▼

CREATE PROFILE   POST PROJECT

      │              │

      ▼              ▼

ADD SKILLS       RECEIVE PROPOSALS

      │              │

      ▼              ▼

DISCOVER PROJECTS REVIEW TALENT

      │              │

      └──────┬───────┘
             ▼

        CONTRACT
             │
             ▼

      PROJECT WORKSPACE
             │
             ▼

       MILESTONES
             │
             ▼

         REVIEW
             │
             ▼

      FORGE SCORE UPDATE
```

---

# 27. Design System

## Visual Direction

DoableForge should feel:

* Modern
* Premium
* Technical
* Privacy-focused
* Futuristic
* Trustworthy

---

## UI Components

```text
Glass Cards

Gradient Borders

Interactive Graphs

Animated Nodes

Skill Visualizations

Trust Indicators

Data Dashboards
```

Three.js should create visual magic on key pages, while shadcn/ui provides consistent, practical interfaces for daily workflows.

---

# 28. MVP Development Plan

## Sprint 1: Foundation

```text
React Setup

Vite

Tailwind

shadcn/ui

Zustand

FastAPI

PostgreSQL

Authentication
```

---

## Sprint 2: Profiles

```text
Anonymous Profiles

Pseudonyms

Skills

Portfolio

ForgeScore Foundation
```

---

## Sprint 3: Marketplace

```text
Project Posting

Project Search

Filters

Proposals
```

---

## Sprint 4: Dashboard

```text
Freelancer Dashboard

Client Dashboard

Project Management
```

---

## Sprint 5: Reputation

```text
Reviews

Ratings

Project Success Tracking

ForgeScore
```

---

## Sprint 6: Three.js

```text
Forge Landing Scene

Skill Galaxy

Interactive Reputation Visualization
```

---

## Sprint 7: AI

```text
Project Matching

Skill Extraction

Recommendations
```

---

# 29. Recommended Deployment Architecture

```text
                    INTERNET
                        │
                        ▼

               ┌────────────────┐
               │   CLOUDFLARE   │
               └───────┬────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼

   REACT FRONTEND             FASTAPI BACKEND

   Vercel / Cloudflare        Docker Container

          │                         │
          │                         ▼
          │                  POSTGRESQL
          │
          │                  REDIS
          │
          │                  ARQ WORKERS
          │
          ▼
     THREE.JS ASSETS
```

---

# 30. Docker Architecture

```text
docker-compose.yml

├── frontend
│
├── backend
│
├── postgres
│
├── redis
│
└── worker
```

---

# 31. Final Architecture Summary

```text
                         DOABLEFORGE

                              │

                ┌─────────────┴─────────────┐
                │                           │

          FRONTEND                       BACKEND

                │                           │

      React + TypeScript              Python

      Vite                           FastAPI

      Tailwind                       SQLAlchemy

      shadcn/ui                      PostgreSQL

      Zustand                        Redis

      TanStack Query                 ARQ Workers

      Three.js                       AI Engine

      React Three Fiber              pgvector
```

---

# 32. Final Technical Philosophy

DoableForge should combine two worlds:

## 🌐 Practical Product Infrastructure

```text
React
FastAPI
PostgreSQL
Redis
WebSockets
```

with:

## ✨ A Unique Interactive Identity

```text
Three.js
React Three Fiber
Interactive Skill Galaxy
Forge Universe
Reputation Visualization
```

The result should not feel like another dashboard-heavy freelance platform.

It should feel like a new kind of professional ecosystem.

---

# Final Technical Stack

## Frontend

```text
React
TypeScript
Vite
Tailwind CSS
shadcn/ui
Zustand
TanStack Query
Three.js
React Three Fiber
Drei
Framer Motion
```

## Backend

```text
Python
FastAPI
SQLAlchemy
Alembic
Pydantic
ARQ
Redis
WebSockets
```

## Database

```text
PostgreSQL
pgvector
```

## Infrastructure

```text
Docker
Cloudflare
Cloudflare R2
GitHub Actions
```

# DoableForge

## **A privacy-first marketplace where skills create opportunity and reputation creates trust.**