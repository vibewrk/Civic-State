# Requirements: CivicState

**Defined:** 2026-04-25
**Currentness refreshed:** 2026-06-05
**Core Value:** AI-powered regulation research with verified legal citations, automatic official targeting from ZIP code, and one-click transactional delivery — the full pipeline from civic frustration to official action, accessible to any individual for $5-$25.

## Currentness Note

The original v1 feature requirements were implemented across the Phase 1-4 summaries by 2026-04-25. This file keeps the original requirement IDs for traceability while distinguishing repo implementation from launch readiness. External production truth remains gated for deployment, credentials, live provider accounts, model/API names, pricing, analytics, compliance authority, and email deliverability.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure

- [x] **INFRA-01**: Monorepo initialized with workspaces (apps/web, apps/api, apps/worker, packages/shared)
- [x] **INFRA-02**: Docker Compose stack running on DigitalOcean (API, Worker, PostgreSQL, Redis, Nginx containers)
- [x] **INFRA-03**: GitHub Actions CI/CD pipeline (lint, test, build, deploy to droplet)
- [x] **INFRA-04**: Nginx reverse proxy with SSL (Certbot/Let's Encrypt) on api.civicstate.com
- [ ] **INFRA-05**: Next.js 15 frontend deployed on Vercel with automatic deployments from main
- [x] **INFRA-06**: Sentry error tracking configured for frontend and backend
- [x] **INFRA-07**: Health check endpoint (GET /api/health) with uptime monitoring
- [x] **INFRA-08**: Daily pg_dump backups to DigitalOcean Spaces (30-day retention)

### Database & Data Model

- [x] **DATA-01**: PostgreSQL 16 schema with Prisma ORM (users, submissions, campaigns, letters, officials, payments, deliveries, ledger_entries, audit_logs, jobs)
- [x] **DATA-02**: Application-level AES-256-GCM encryption for Tier 1 fields (letter_content, full_name, issue_description, desired_outcome) via CryptoService
- [x] **DATA-03**: Encryption key stored outside database (environment variable), with key rotation capability
- [x] **DATA-04**: Append-only tables (ledger_entries, audit_logs, agent_action_logs) enforced via PostgreSQL rules
- [x] **DATA-05**: HMAC checksums on append-only rows for tamper detection
- [x] **DATA-06**: Monthly partitioning on audit/ledger tables
- [x] **DATA-07**: Soft deletes with deleted_at timestamp; hard deletion only via CCPA/GDPR process (72-hour SLA)

### Authentication

- [x] **AUTH-01**: User can create account via Clerk (Google, Apple social login or email magic link)
- [x] **AUTH-02**: User session persists across browser refresh (Clerk session management)
- [x] **AUTH-03**: Admin role (platform operator) provisioned via Clerk RBAC
- [x] **AUTH-04**: JWT validation on Express API via Clerk middleware (public, protected, admin route tiers)
- [x] **AUTH-05**: Submission wizard steps 1-4 accessible without authentication
- [x] **AUTH-06**: Authentication required before payment (step 5)

### Submission & Research

- [ ] **SUBM-01**: User can describe civic issue via guided wizard (free text issue description + desired outcome)
- [ ] **SUBM-02**: User can enter ZIP code to determine jurisdiction and target officials
- [ ] **SUBM-03**: User can optionally provide full name (anonymous by default)
- [ ] **SUBM-04**: Classifier Agent (Haiku 4.5) categorizes issue type, determines jurisdiction level, assesses severity
- [ ] **SUBM-05**: Researcher Agent (Sonnet 4.6) queries eCFR, CourtListener, OpenStates, officials API and synthesizes findings with citations
- [ ] **SUBM-06**: All legal citations programmatically verified against source APIs before use (eCFR for federal, CourtListener for case law, curated cache for state)
- [ ] **SUBM-07**: Unverified citations stripped from letter; letter re-drafted without them
- [ ] **SUBM-08**: If all citations fail verification, job flagged for human review
- [ ] **SUBM-09**: Research results displayed to user (applicable regulations, citations, targeted officials) within 1-3 minute target
- [ ] **SUBM-10**: Rate limiting on unauthenticated research requests (100 req/15min per IP)

### Officials Directory

- [ ] **OFCL-01**: Federal officials looked up via congress.gov API (ZIP to congressional district)
- [ ] **OFCL-02**: State officials looked up via OpenStates v3 API (ZIP to state legislative districts)
- [ ] **OFCL-03**: Local officials looked up via Cicero or BallotReady (evaluation spike in Week 1)
- [ ] **OFCL-04**: Officials directory cached in PostgreSQL with bounce/opt-out flags
- [ ] **OFCL-05**: Coverage confidence indicator shown to user ("We found X of Y officials for your area")
- [ ] **OFCL-06**: Official opt-out enforcement: opted-out officials suppressed across all users and all jobs

### Letter Drafting

- [ ] **LETR-01**: Drafter Agent (Sonnet 4.6) composes professional letter using research output, user's desired outcome, and target officials
- [ ] **LETR-02**: Each letter includes AI disclosure statement (California AI transparency law + FTC guidelines)
- [ ] **LETR-03**: Each letter includes CAN-SPAM compliant opt-out link, physical address, accurate headers
- [ ] **LETR-04**: Anonymous users' letters signed as "A Concerned Constituent of [City/District]"
- [ ] **LETR-05**: Letter previews shown per official (collapsible cards) with cited regulations
- [ ] **LETR-06**: "Not legal advice" disclaimer visible at preview step

### Payment

- [ ] **PAY-01**: Hardcoded pricing tiers: $5 (1 official), $15 (3 officials), $25 (all officials)
- [ ] **PAY-02**: Stripe Checkout session created on package selection (webhook-driven fulfillment)
- [ ] **PAY-03**: Stripe webhook confirms payment before delivery begins
- [ ] **PAY-04**: 40% net margin floor enforced at pricing level (after Stripe fees)

### Delivery

- [ ] **DLVR-01**: Delivery Agent (Haiku 4.5) formats and sends letters via Postmark API
- [ ] **DLVR-02**: Each letter sent as individual email (no BCC, no bulk) with personalized content
- [x] **DLVR-03**: SPF/DKIM/DMARC configured on civicstate.com from day one
- [x] **DLVR-04**: 2-4 week domain warming period before first user email to government
- [ ] **DLVR-05**: Per-domain bounce tracking; pause sending if bounce rate exceeds 10% for any domain
- [ ] **DLVR-06**: Postmark delivery webhooks track Delivered, Bounced, SpamComplaint events per email
- [ ] **DLVR-07**: Spam complaint triggers immediate suppression of that official + operator alert
- [ ] **DLVR-08**: Reply-To address format (reply+{campaign_id}@civicstate.com) for inbound routing

### User Dashboard

- [ ] **DASH-01**: User can view list of all campaigns with delivery status
- [ ] **DASH-02**: Per-letter delivery status shown: queued, sent, delivered, bounced, failed
- [ ] **DASH-03**: Official replies captured via Postmark inbound webhook and displayed as raw text
- [ ] **DASH-04**: User receives email notification when an official responds
- [ ] **DASH-05**: User can set anonymity preference (toggle name display on letters)

### Content Moderation

- [ ] **MODR-01**: Pre-pipeline content filter auto-blocks threats, explicit harassment, hate speech, criminal threats
- [ ] **MODR-02**: Content filter flags named misconduct allegations, defamation risk, unverifiable claims for human review
- [ ] **MODR-03**: Auto-block at >95% confidence; flag-for-review at >80% confidence (Haiku 4.5)
- [ ] **MODR-04**: Platform is non-partisan — no political viewpoint moderation
- [ ] **MODR-05**: All moderation decisions logged to audit trail (submission_id, tier, reason, confidence, timestamp)

### Treasury & Financial

- [ ] **TRSY-01**: Treasury Agent (Haiku 4.5) records payments to append-only ledger
- [ ] **TRSY-02**: Job-level budget authorization with estimated cost ceiling before pipeline starts
- [ ] **TRSY-03**: If cumulative actual cost exceeds 150% of estimated budget, job paused and operator alerted
- [ ] **TRSY-04**: Daily treasury reconciliation (Stripe + Mercury + internal ledger) via BullMQ repeatable job
- [ ] **TRSY-05**: Reconciliation discrepancy >$0.10 flagged for operator review
- [ ] **TRSY-06**: Mercury reserve balance monitored with tiered alerts ($2,000 warning, $500 emergency)
- [ ] **TRSY-07**: Daily P&L email to operator at 7 AM

### Admin / Operator

- [ ] **ADMN-01**: Admin dashboard at /admin (Clerk RBAC protected)
- [ ] **ADMN-02**: Human review queue showing flagged submissions with flag reason, user text, AI draft
- [ ] **ADMN-03**: Operator can approve, reject (with reason), or edit-before-approve flagged submissions
- [ ] **ADMN-04**: Treasury dashboard showing balance, today's revenue/costs, ledger entries, reconciliation status
- [ ] **ADMN-05**: Job queue monitor via Bull Board integration (active, waiting, completed, failed jobs)
- [ ] **ADMN-06**: Officials maintenance view (bounce rates, stale contacts, opt-out list)
- [ ] **ADMN-07**: All admin actions logged to audit trail (user_id, action, timestamp, details)
- [ ] **ADMN-08**: Auto-escalation email when flagged queue depth >10 items or oldest item >24 hours

### Agent Engine (OpenClaw)

- [x] **AGNT-01**: BullMQ-based agent orchestration with parent-child job pattern (submission = parent, agent steps = children)
- [x] **AGNT-02**: State machine for job lifecycle: submitted -> classifying -> researching -> drafting -> payment_pending -> paid -> delivering -> delivered
- [x] **AGNT-03**: Configurable model selection per agent (environment variable override for testing)
- [x] **AGNT-04**: Prompt caching enabled for shared system prompts across agents
- [x] **AGNT-05**: Token usage logged per agent per job for cost tracking
- [x] **AGNT-06**: Agent actions logged to agent_action_logs table (timestamp, job_id, agent, action, result)
- [x] **AGNT-07**: PM2 process management within containers (auto-restart, memory limits, log rotation)

### Legal & Compliance

- [ ] **LGAL-01**: Privacy Policy covering CCPA rights, data classification tiers, AI disclosure
- [ ] **LGAL-02**: Terms of Service with "not legal advice" disclaimer, lobbying disclaimer, user-as-author assertion
- [ ] **LGAL-03**: CAN-SPAM compliance: opt-out in every email, physical address, accurate headers, honor opt-outs within 10 business days
- [ ] **LGAL-04**: CCPA right-to-deletion process (72-hour SLA, cryptographic erasure for Tier 1)
- [ ] **LGAL-05**: Data retention policy enforced (financial 7 years, audit 7 years, agent logs 24 months, job snapshots 12 months)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Framing & Presentation

- **FRME-01**: Framing Reviewer agent produces non-partisan rewrite shown alongside original text
- **FRME-02**: Publisher agent generates public campaign pages with SEO (Schema.org markup)
- **FRME-03**: Discovery Search on /start page (search campaigns, issue categories, officials)

### Enhanced Delivery

- **EDLV-01**: Certified mail delivery via Lob API (~$1.50/letter) as email fallback
- **EDLV-02**: Fax delivery via SRFax API (~$0.03/page) as email fallback
- **EDLV-03**: Domain warming automation

### Enhanced AI

- **EHAI-01**: AI summarization of official replies (Sonnet) with classification (genuine vs auto-reply)
- **EHAI-02**: Dynamic Pricer agent replaces hardcoded tiers
- **EHAI-03**: Backup LLM provider (OpenAI fallback for Anthropic outages)
- **EHAI-04**: State statute real-time lookup via paid legal data provider

### Enhanced Operations

- **EOPS-01**: Enhanced admin dashboard with detailed analytics
- **EOPS-02**: Performance monitoring (Sentry APM)
- **EOPS-03**: Follow-up campaign creation from official reply context

## Out of Scope

| Feature | Reason |
|---------|--------|
| Third-party API for organizations | Phase 4+ — requires stable citizen pipeline first |
| Kubernetes deployment | Phase 3+ — single droplet sufficient for 5,000 subs/month |
| Mobile native apps | Web responsive is sufficient for target users |
| Multi-language support | No demand signal; US residents only at launch |
| Offline/PWA | Always-on web access assumed |
| Legal filings / regulatory submissions | Liability risk; letters are constituent communications only |
| Automated follow-up letters | Out of launch scope; users submit new paid campaign to respond |
| Real-time chat with officials | Not aligned with letter-based communication model |
| OAuth for third-party API consumers | Deferred to Phase 4 with API launch |
| GraphQL or tRPC | REST sufficient for ~15 endpoints and single frontend consumer |

## Traceability

Updated during issue #20 roadmap refresh.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete (01-01) |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete (01-07) |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Blocked: no Vercel deployment proof in repo |
| INFRA-06 | Phase 1 | Complete (01-06) |
| INFRA-07 | Phase 1 | Complete |
| INFRA-08 | Phase 1 | Complete (01-07) |
| DATA-01 | Phase 1 | Complete (01-02) |
| DATA-02 | Phase 1 | Complete (01-02) |
| DATA-03 | Phase 1 | Complete (01-02) |
| DATA-04 | Phase 1 | Complete (01-02) |
| DATA-05 | Phase 1 | Complete (01-02) |
| DATA-06 | Phase 1 | Complete (01-02) |
| DATA-07 | Phase 1 | Complete (01-02) |
| AUTH-01 | Phase 1 | Complete (01-04) |
| AUTH-02 | Phase 1 | Complete (01-04) |
| AUTH-03 | Phase 1 | Complete (01-04) |
| AUTH-04 | Phase 1 | Complete (01-04) |
| AUTH-05 | Phase 1 | Complete (01-04) |
| AUTH-06 | Phase 1 | Complete (01-04) |
| AGNT-01 | Phase 1 | Complete |
| AGNT-02 | Phase 1 | Complete |
| AGNT-03 | Phase 1 | Complete |
| AGNT-04 | Phase 1 | Complete |
| AGNT-05 | Phase 1 | Complete |
| AGNT-06 | Phase 1 | Complete |
| AGNT-07 | Phase 1 | Complete |
| DLVR-03 | Phase 1 | Complete (01-07) |
| DLVR-04 | Phase 1 | Complete (01-07) |
| SUBM-01 | Phase 2 | Complete (02-06) |
| SUBM-02 | Phase 2 | Complete (02-06) |
| SUBM-03 | Phase 2 | Complete (02-06) |
| SUBM-04 | Phase 2 | Complete (02-03) |
| SUBM-05 | Phase 2 | Complete (02-04) |
| SUBM-06 | Phase 2 | Complete (02-04) |
| SUBM-07 | Phase 2 | Complete (02-04) |
| SUBM-08 | Phase 2 | Complete (02-04) |
| SUBM-09 | Phase 2 | Complete (02-05, 02-06) |
| SUBM-10 | Phase 2 | Complete (02-01/API rate limiting surface) |
| OFCL-01 | Phase 2 | Complete (02-02); live API key gated |
| OFCL-02 | Phase 2 | Complete (02-02); live API key gated |
| OFCL-03 | Phase 2 | Provider decision gated |
| OFCL-04 | Phase 2 | Complete (02-02) |
| OFCL-05 | Phase 2 | Complete (02-02, 02-06) |
| OFCL-06 | Phase 2 | Complete (02-02, 03-02) |
| LETR-01 | Phase 2 | Complete (02-05) |
| LETR-02 | Phase 2 | Complete (02-05) |
| LETR-03 | Phase 2 | Complete (02-05, 04-03) |
| LETR-04 | Phase 2 | Complete (02-05) |
| LETR-05 | Phase 2 | Complete (02-05, 02-06) |
| LETR-06 | Phase 2 | Complete (02-06) |
| MODR-01 | Phase 2 | Complete (02-01) |
| MODR-02 | Phase 2 | Complete (02-01) |
| MODR-03 | Phase 2 | Complete (02-01) |
| MODR-04 | Phase 2 | Complete (02-01) |
| MODR-05 | Phase 2 | Complete (02-01) |
| PAY-01 | Phase 3 | Complete (03-01, 03-04); pricing authority gated |
| PAY-02 | Phase 3 | Complete (03-01, 03-04); live Stripe gated |
| PAY-03 | Phase 3 | Complete (03-01); live Stripe gated |
| PAY-04 | Phase 3 | Complete (03-03); pricing authority gated |
| DLVR-01 | Phase 3 | Complete (03-02); live Postmark gated |
| DLVR-02 | Phase 3 | Complete (03-02); live Postmark gated |
| DLVR-05 | Phase 3 | Complete (03-02); production bounce truth gated |
| DLVR-06 | Phase 3 | Complete (03-02); live Postmark gated |
| DLVR-07 | Phase 3 | Complete (03-02); live Postmark gated |
| DLVR-08 | Phase 3 | Complete (03-02, 04-01); inbound domain gated |
| TRSY-01 | Phase 3 | Complete (03-03) |
| TRSY-02 | Phase 3 | Complete (03-03) |
| TRSY-03 | Phase 3 | Complete (03-03) |
| TRSY-04 | Phase 3 | Complete (03-03); live Stripe/Mercury gated |
| TRSY-05 | Phase 3 | Complete (03-03); live Stripe/Mercury gated |
| TRSY-06 | Phase 3 | Placeholder/gated on Mercury access |
| TRSY-07 | Phase 3 | Complete (03-03); operator email gated |
| DASH-01 | Phase 4 | Complete (04-01) |
| DASH-02 | Phase 4 | Complete (04-01) |
| DASH-03 | Phase 4 | Complete (04-01) |
| DASH-04 | Phase 4 | Complete (04-01); live Postmark gated |
| DASH-05 | Phase 4 | Complete (04-01) |
| ADMN-01 | Phase 4 | Complete (04-02) |
| ADMN-02 | Phase 4 | Complete (04-02) |
| ADMN-03 | Phase 4 | Complete (04-02) |
| ADMN-04 | Phase 4 | Complete (04-02) |
| ADMN-05 | Phase 4 | Complete (04-02) |
| ADMN-06 | Phase 4 | Complete (04-02) |
| ADMN-07 | Phase 4 | Complete (04-02) |
| ADMN-08 | Phase 4 | Complete (04-02); live Postmark gated |
| LGAL-01 | Phase 4 | Complete (04-03); legal authority gated |
| LGAL-02 | Phase 4 | Complete (04-03); legal authority gated |
| LGAL-03 | Phase 4 | Complete (04-03); legal authority gated |
| LGAL-04 | Phase 4 | Complete (04-03) |
| LGAL-05 | Phase 4 | Complete (04-03) |

**Coverage:**
- v1 requirements: 92 total
- Mapped to phases: 92
- Unmapped: 0

---
*Requirements defined: 2026-04-25*
*Last updated: 2026-06-05 during issue #20 roadmap refresh*
