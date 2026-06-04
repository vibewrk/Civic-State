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
- [x] **Phase 3: Payment & Delivery** - Stripe checkout, treasury, Postmark email delivery, bounce tracking
- [x] **Phase 4: Dashboard & Compliance** - User dashboard, admin tools, legal pages, audit enforcement
- [ ] **Phase 5: Cause Board MVP (v3)** - Cause/Signature schema, public board, signing, moderation tier extension, Drafter petition/letter/postcard variants
- [ ] **Phase 6: Crowdfunding & Escrow (v3)** - Stripe Connect (platform-owns-funds) contribute flow, Contribution model, threshold tracking, refund state machine
- [ ] **Phase 7: Threshold-Triggered Multi-Channel Dispatch (v3)** - Lob integration, delivery channel split, state-machine extension, threshold-met → dispatch chain
- [ ] **Phase 8: SEO/Share Surface + Cause-Author Dashboard (v3)** - OG metadata, sitemap, cause-author dashboard, admin cause-moderation queue, compliance extensions

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
**Plans**: 4 plans
Plans:
- [x] 03-01-PLAN.md -- Stripe payment integration (pricing tiers, Checkout sessions, webhook fulfillment)
- [x] 03-02-PLAN.md -- Delivery agent + Postmark (individual emails, bounce tracking, spam suppression)
- [x] 03-03-PLAN.md -- Treasury agent (ledger recording, budget auth, reconciliation, P&L alerts)
- [x] 03-04-PLAN.md -- Payment UI (Stripe Checkout redirect, success/cancel pages)
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
**Plans**: 3 plans
Plans:
- [x] 04-01-PLAN.md -- User dashboard (campaign list, delivery status, replies, notifications)
- [x] 04-02-PLAN.md -- Admin tools (flagged queue, treasury dashboard, Bull Board, officials, auto-escalation)
- [x] 04-03-PLAN.md -- Legal compliance (Privacy Policy, ToS, CCPA deletion, data retention)
**UI hint**: yes

### Phase 5: Cause Board MVP (v3)
**Goal**: Anyone can create a cause, see it on the public board, sign it (anonymous or named), and have it pass moderation before publish. No money flows yet — this is the cause + signature primitive layer.
**Depends on**: Phase 4 (v2.1 foundation shipped)
**Requirements**: CAUSE-01..11, SIGN-01..06, MOD-V3-01..06, ENGN-01 (state-machine cause-side), ENGN-06 (Drafter extension)
**Success Criteria** (what must be TRUE):
  1. A user can create a cause draft, the cause body + petition pass the moderation pipeline (including new political_classifier + named_individual tiers), and the cause publishes to `/causes/[slug]`
  2. Anyone can sign a cause (anonymous or named); per-email-per-cause dedup is enforced; named co-signers appear on the cause page
  3. Drafter agent emits petition + letter + postcard copy variants at cause draft time; all three are persisted on the cause
  4. Cause public page displays cause body, target officials, signature count, paid-influence disclosure (skeleton — no $ yet), and constituent-to-elected-official posture statement
  5. Admin can review the cause-moderation queue, approve/reject/edit causes pre-publish; all moderation decisions are audit-logged
**Plans**: 5 (proposed)
Plans (proposed; mapped from MASTER_PLAN §18.x decomposed-issue table):
- [ ] 05-01-PLAN.md -- Cause/Signature Prisma schema + cause moderation tier (5a, 5d schema halves)
- [ ] 05-02-PLAN.md -- Cause CRUD API + signature endpoints + officials snapshot at publish (5b)
- [ ] 05-03-PLAN.md -- Drafter agent extension (petition + letter + postcard + mailer copy variants)
- [ ] 05-04-PLAN.md -- /causes public board + /causes/[slug] + /causes/new (5c)
- [ ] 05-05-PLAN.md -- /admin/causes moderation queue + paid-influence disclosure skeleton (5d UI half)
**UI hint**: yes

### Phase 6: Crowdfunding & Escrow (v3)
**Goal**: Contributors can pay into a cause via Stripe Checkout (platform-owns-funds posture), contributions accumulate in escrow, threshold-met detection fires; refund-on-failure works for all failure paths (expiry, withdrawn, moderation-rejected).
**Depends on**: Phase 5
**Requirements**: FUND-01..09, CONN-01..04, ENGN-02 (BullMQ queues), ENGN-03 (advisory lock), CAUSE-08 (expiry), CAUSE-09 (withdraw), LGAL-V3-01, LGAL-V3-02, LGAL-V3-05 (Stripe AUP), ledger schema extension
**Success Criteria** (what must be TRUE):
  1. Stripe Connect (platform-owns-funds) configured and AUP-confirmed for political/advocacy at platform-merchant level
  2. Contributors complete Stripe Checkout; contributions are recorded as CONTRIBUTION ledger rows with HMAC checksums; escrow_balance updates atomically per cause
  3. Threshold check fires on every contribution; cause transitions funding → threshold_met when escrow_balance >= funding_goal
  4. Refund flow exercised in tests for: threshold_failed (expiry), withdrawn, moderation_rejected; mass-refund per contributor via Stripe Refunds API; ledger REFUND_* entries created; per-contributor email notifications fire
  5. Per-cause chargeback rate dashboard live; auto-pause + operator alert at >1%
**Plans**: 4 (proposed)
Plans (proposed):
- [ ] 06-01-PLAN.md -- Contribution + RefundEvent Prisma schema + ledger_entries.cause_id (6a)
- [ ] 06-02-PLAN.md -- Stripe Connect contribute flow + webhook handler + application_fee (6b)
- [ ] 06-03-PLAN.md -- Treasury extension: cause escrow + threshold check + refund state machine (6c)
- [ ] 06-04-PLAN.md -- /causes/[slug]/contribute UX + progress bar + refund-disclosure copy (6d)
**UI hint**: yes
**Pre-launch gate**: Stripe Connect political/advocacy AUP confirmation [NEEDS VENDOR-TOS VERIFICATION 2026-06]; platform-fee disclosure copy [NEEDS HUMAN/LEGAL REVIEW]

### Phase 7: Threshold-Triggered Multi-Channel Dispatch (v3)
**Goal**: When a cause hits its funding threshold, multi-channel dispatch fires automatically. Letters/postcards via Lob; emails via Postmark. Per-mailing tracking, bounce handling, partial-refund on partial failure, full-refund on total failure.
**Depends on**: Phase 6
**Requirements**: MAIL-01..09, BULK-01..07, ENGN-04 (idempotency), ENGN-05 (transitions audit-logged), ENGN-06 (Drafter mailer copy), LGAL-V3-05 (Lob AUP), per-official cap-per-window (MAIL-06), proportional partial-refund (FUND-08, refund_partial via 12.13)
**Success Criteria** (what must be TRUE):
  1. Lob (postcards + letters) integration live and AUP-confirmed for advocacy mail; Lob webhook handler tracks USPS delivery scan per piece
  2. Delivery agent split into channel handlers (postmark/lob); cause-dispatch enqueues per-channel-per-official Mailing rows; per-official cap-per-window (default N=2/M=30d) enforced
  3. Threshold-met → dispatch chain (Drafter copy variants → per-channel send → Treasury platform_fee + per-vendor expense ledger entries); state-machine transitions threshold_met → dispatching → dispatched
  4. Partial-failure handling: per-mailing skip reasons logged; proportional refund per contributor; cause status dispatched if any sent, dispatch_failed if none sent
  5. Lob spend reconciled against ledger daily; total dispatch operational without manual intervention for a successful cause
**Plans**: 4 (proposed)
Plans (proposed):
- [ ] 07-01-PLAN.md -- apps/api/src/lib/mail/lob.ts + Lob webhook handler (7a)
- [ ] 07-02-PLAN.md -- Delivery agent channel split + Mailing table + per-official cap-per-window (7b)
- [ ] 07-03-PLAN.md -- Engine state-machine extension (threshold/dispatch transitions) + idempotency (7c)
- [ ] 07-04-PLAN.md -- Drafter mailer copy variants + per-channel content moderation pass (7d)
**UI hint**: partial (admin dispatch-report views)
**Pre-launch gate**: Lob advocacy-mail AUP confirmation [NEEDS VENDOR-TOS VERIFICATION 2026-06]

### Phase 8: SEO/Share Surface + Cause-Author Dashboard (v3)
**Goal**: Every cause is an indexable + shareable SEO surface; cause authors have a dashboard to track their causes; admin tooling for cause-moderation queue + paid-influence disclosure auditing; compliance extensions for political CAN-SPAM + per-jurisdiction lobbying-disclosure trigger logic.
**Depends on**: Phase 5 (UI bones), Phase 7 (dispatch report data)
**Requirements**: SHARE-01..08, DASH-V3-01..03, ADMN-V3-01..05, MOD-V3-07, MOD-V3-08, LGAL-V3-03, LGAL-V3-04, LGAL-V3-06, LGAL-V3-07
**Success Criteria** (what must be TRUE):
  1. Every published cause has OG metadata + Twitter Card + Schema.org markup; /sitemap.xml includes all funding + dispatched causes; Google Search Console submission automated
  2. /dashboard/causes shows all causes by signed-in user with status, signers, contributors, funding progress, dispatch report; cause author can withdraw cause with refund confirmation
  3. /admin/causes/moderation extended queue; /admin/disclosures paid-influence disclosure audit view; per-cause chargeback rate dashboard; per-jurisdiction monthly aggregate spend dashboard
  4. Political CAN-SPAM variant disclosure templates per state (legal-reviewable); per-jurisdiction lobbying-disclosure threshold table populated (legal-reviewable); Treasury auto-aggregates monthly per-jurisdiction spend; auto-alert at 70%, auto-pause at 90%
  5. Per-official cap-per-window enforcement audit view; constituent-to-elected-official posture statement on every cause page
**Plans**: 4 (proposed)
Plans (proposed):
- [ ] 08-01-PLAN.md -- OG + Schema.org + sitemap + share counters (8a)
- [ ] 08-02-PLAN.md -- /dashboard/causes cause-author view (DASH-V3-01..03)
- [ ] 08-03-PLAN.md -- /admin/causes/moderation + /admin/disclosures + admin dashboards (8b)
- [ ] 08-04-PLAN.md -- Political CAN-SPAM variant + per-jurisdiction lobbying logic + per-official cap audit (8c)
**UI hint**: yes
**Pre-launch gate**: Per-jurisdiction lobbying-disclosure trigger logic + political CAN-SPAM variant copy [NEEDS HUMAN/LEGAL REVIEW]

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 1.1 -> 2 -> 2.1 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation | 7/7 | Complete | 2026-04-25 |
| 2. AI Pipeline | 6/6 | Complete | 2026-04-25 |
| 3. Payment & Delivery | 4/4 | Complete | 2026-04-25 |
| 4. Dashboard & Compliance | 3/3 | Complete | 2026-04-25 |
| 5. Cause Board MVP (v3) | 0/5 | Pending — v3 thesis pivot 2026-06-03 | — |
| 6. Crowdfunding & Escrow (v3) | 0/4 | Pending — gated on Stripe AUP review | — |
| 7. Threshold-Triggered Multi-Channel Dispatch (v3) | 0/4 | Pending — gated on Lob AUP review | — |
| 8. SEO/Share Surface + Cause-Author Dashboard (v3) | 0/4 | Pending — gated on lobbying-disclosure legal review | — |

> **v3 thesis pivot 2026-06-03 (issue #12)**: Phases 5–8 added per `MASTER_PLAN.md` v3.0 §18 and §24. Each v3 phase has a pre-launch gate flagged with [NEEDS HUMAN/LEGAL REVIEW] or [NEEDS VENDOR-TOS VERIFICATION 2026-06] that must clear before BUILD ships to production.
