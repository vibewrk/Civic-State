# Roadmap: CivicState

## Overview

CivicState delivers the full pipeline from civic frustration to official action in four phases. Phase 1 builds the monorepo, infrastructure, database, auth, agent engine, and starts domain warming. Phase 2 delivers the core AI value loop: issue submission, official lookup, regulation research, citation verification, letter drafting, and content moderation. Phase 3 adds payment processing, email delivery, and treasury. Phase 4 completes the platform with user dashboards, admin tools, and legal compliance pages.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Monorepo, Docker, CI/CD, database, auth, agent engine, domain warming
- [x] **Phase 2: AI Pipeline** - Submission wizard, officials directory, research, citation verification, letter drafting, content moderation
- [ ] **Phase 3: Payment & Delivery** - Stripe checkout, treasury, Postmark email delivery, bounce tracking
- [ ] **Phase 4: Dashboard & Compliance** - User dashboard, admin tools, legal pages, audit enforcement

## Phase Details

### Phase 1: Foundation
**Goal**: Platform infrastructure is running, database is secured, auth works, agent engine processes jobs, and domain warming has begun
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, INFRA-08, DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07, AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AGNT-01, AGNT-02, AGNT-03, AGNT-04, AGNT-05, AGNT-06, AGNT-07, DLVR-03, DLVR-04
**Success Criteria** (what must be TRUE):
  1. Developer can clone the repo, run `docker compose up`, and have API + Worker + PostgreSQL + Redis running locally
  2. Pushing to main triggers CI/CD that deploys the API to DigitalOcean and the frontend to Vercel
  3. A user can sign up via Clerk (Google/Apple/magic link), stay logged in across refreshes, and access protected API routes with a valid JWT
  4. A test BullMQ job flows through the full agent state machine (submitted -> classifying -> researching -> drafting -> payment_pending) with token usage logged
  5. SPF/DKIM/DMARC DNS records are live on civicstate.com and domain warming emails are sending via Postmark
**Plans**: 7 plans
Plans:
- [x] 01-01-PLAN.md -- Monorepo scaffold with pnpm workspaces and shared TypeScript config
- [x] 01-02-PLAN.md -- Database schema (Prisma), CryptoService, HMAC, append-only enforcement
- [x] 01-03-PLAN.md -- Docker Compose stack (5 containers), Nginx, Dockerfiles, PM2
- [x] 01-04-PLAN.md -- Clerk auth integration (frontend + backend), three-tier route protection
- [x] 01-05-PLAN.md -- OpenClaw agent engine (BullMQ, state machine, 5 agent skeletons)
- [x] 01-06-PLAN.md -- Next.js 15 frontend with shadcn/ui, navy+gold theme, Sentry, Plausible
- [x] 01-07-PLAN.md -- CI/CD pipelines, backup script, DNS setup, end-to-end test endpoint
**UI hint**: yes

### Phase 2: AI Pipeline
**Goal**: A user can describe a civic issue, see matched officials, review AI-researched regulations with verified citations, and preview professionally drafted letters -- the complete value demonstration before payment
**Depends on**: Phase 1
**Requirements**: SUBM-01, SUBM-02, SUBM-03, SUBM-04, SUBM-05, SUBM-06, SUBM-07, SUBM-08, SUBM-09, SUBM-10, OFCL-01, OFCL-02, OFCL-03, OFCL-04, OFCL-05, OFCL-06, LETR-01, LETR-02, LETR-03, LETR-04, LETR-05, LETR-06, MODR-01, MODR-02, MODR-03, MODR-04, MODR-05
**Success Criteria** (what must be TRUE):
  1. A user can enter a civic issue description, desired outcome, and ZIP code through a guided wizard without logging in
  2. The system returns matched federal, state, and local officials for the user's ZIP code with a coverage confidence indicator
  3. The Researcher agent returns cited regulations from eCFR/CourtListener/state cache, and every citation in the final letter has been programmatically verified against its source
  4. The user sees per-official letter previews with cited regulations, AI disclosure, CAN-SPAM elements, and "not legal advice" disclaimer
  5. Submissions containing threats are auto-blocked; defamation-risk content is flagged for human review; all moderation decisions are audit-logged
**Plans**: 6 plans
Plans:
- [x] 02-01-PLAN.md -- Content moderation pipeline (keyword blocklist + Haiku LLM classification + audit logging)
- [x] 02-02-PLAN.md -- Officials directory (congress.gov + OpenStates + Cicero stub + DB caching + opt-out)
- [x] 02-03-PLAN.md -- Classifier agent with real Anthropic API integration (Haiku 4.5)
- [x] 02-04-PLAN.md -- Researcher agent with legal DB integrations (eCFR + CourtListener + state cache + citation verification)
- [x] 02-05-PLAN.md -- Drafter agent with letter generation (Sonnet 4.6 + compliance elements + preview API)
- [x] 02-06-PLAN.md -- Submission wizard frontend (4-step wizard + API client + shadcn/ui)
**UI hint**: yes

### Phase 3: Payment & Delivery
**Goal**: A user can pay for letter delivery and the system sends personalized emails to each official with full deliverability tracking and financial controls
**Depends on**: Phase 2
**Requirements**: PAY-01, PAY-02, PAY-03, PAY-04, DLVR-01, DLVR-02, DLVR-05, DLVR-06, DLVR-07, DLVR-08, TRSY-01, TRSY-02, TRSY-03, TRSY-04, TRSY-05, TRSY-06, TRSY-07
**Success Criteria** (what must be TRUE):
  1. A user can select a pricing tier ($5/$15/$25), complete Stripe Checkout, and the system only begins delivery after webhook-confirmed payment
  2. Each letter is sent as an individual personalized email via Postmark, with per-domain bounce tracking that pauses sending above 10% bounce rate
  3. Spam complaints trigger immediate official suppression and operator alert; replies route to the correct campaign via reply+{id}@civicstate.com
  4. The Treasury agent records every payment to the append-only ledger, enforces job-level budget ceilings (150% overage pause), and runs daily reconciliation with discrepancy alerts
  5. The operator receives a daily P&L email and Mercury balance alerts at $2,000 warning and $500 emergency thresholds
**Plans**: TBD
**UI hint**: yes

### Phase 4: Dashboard & Compliance
**Goal**: Users can track their campaigns and official responses, the operator can manage the platform through admin tools, and all legal compliance requirements are met for launch
**Depends on**: Phase 3
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, ADMN-01, ADMN-02, ADMN-03, ADMN-04, ADMN-05, ADMN-06, ADMN-07, ADMN-08, LGAL-01, LGAL-02, LGAL-03, LGAL-04, LGAL-05
**Success Criteria** (what must be TRUE):
  1. A user can view all their campaigns with per-letter delivery status (queued/sent/delivered/bounced/failed), see raw text of official replies, and receive email notifications on responses
  2. The operator can access /admin to review flagged submissions (approve/reject/edit), monitor treasury status, view job queues via Bull Board, and maintain the officials directory
  3. Privacy Policy, Terms of Service, and AI disclosure pages are published and accessible; CCPA right-to-deletion works within 72-hour SLA with cryptographic erasure
  4. All admin actions and moderation decisions are logged to the tamper-detected audit trail; data retention policies are enforced (financial 7yr, audit 7yr, agent logs 24mo)
  5. Auto-escalation fires when the flagged queue exceeds 10 items or the oldest item is over 24 hours old
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 1.1 -> 2 -> 2.1 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation | 7/7 | Complete | 2026-04-25 |
| 2. AI Pipeline | 6/6 | Complete | 2026-04-25 |
| 3. Payment & Delivery | 0/TBD | Not started | - |
| 4. Dashboard & Compliance | 0/TBD | Not started | - |
