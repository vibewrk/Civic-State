# Requirements: CivicState

**Defined:** 2026-04-25
**Core Value:** AI-powered regulation research with verified legal citations, automatic official targeting from ZIP code, and one-click transactional delivery — the full pipeline from civic frustration to official action, accessible to any individual for $5-$25.

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

Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete (01-01) |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete (01-07) |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Pending |
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
| SUBM-01 | Phase 2 | Pending |
| SUBM-02 | Phase 2 | Pending |
| SUBM-03 | Phase 2 | Pending |
| SUBM-04 | Phase 2 | Pending |
| SUBM-05 | Phase 2 | Pending |
| SUBM-06 | Phase 2 | Pending |
| SUBM-07 | Phase 2 | Pending |
| SUBM-08 | Phase 2 | Pending |
| SUBM-09 | Phase 2 | Pending |
| SUBM-10 | Phase 2 | Pending |
| OFCL-01 | Phase 2 | Pending |
| OFCL-02 | Phase 2 | Pending |
| OFCL-03 | Phase 2 | Pending |
| OFCL-04 | Phase 2 | Pending |
| OFCL-05 | Phase 2 | Pending |
| OFCL-06 | Phase 2 | Pending |
| LETR-01 | Phase 2 | Pending |
| LETR-02 | Phase 2 | Pending |
| LETR-03 | Phase 2 | Pending |
| LETR-04 | Phase 2 | Pending |
| LETR-05 | Phase 2 | Pending |
| LETR-06 | Phase 2 | Pending |
| MODR-01 | Phase 2 | Pending |
| MODR-02 | Phase 2 | Pending |
| MODR-03 | Phase 2 | Pending |
| MODR-04 | Phase 2 | Pending |
| MODR-05 | Phase 2 | Pending |
| PAY-01 | Phase 3 | Pending |
| PAY-02 | Phase 3 | Pending |
| PAY-03 | Phase 3 | Pending |
| PAY-04 | Phase 3 | Pending |
| DLVR-01 | Phase 3 | Pending |
| DLVR-02 | Phase 3 | Pending |
| DLVR-05 | Phase 3 | Pending |
| DLVR-06 | Phase 3 | Pending |
| DLVR-07 | Phase 3 | Pending |
| DLVR-08 | Phase 3 | Pending |
| TRSY-01 | Phase 3 | Pending |
| TRSY-02 | Phase 3 | Pending |
| TRSY-03 | Phase 3 | Pending |
| TRSY-04 | Phase 3 | Pending |
| TRSY-05 | Phase 3 | Pending |
| TRSY-06 | Phase 3 | Pending |
| TRSY-07 | Phase 3 | Pending |
| DASH-01 | Phase 4 | Pending |
| DASH-02 | Phase 4 | Pending |
| DASH-03 | Phase 4 | Pending |
| DASH-04 | Phase 4 | Pending |
| DASH-05 | Phase 4 | Pending |
| ADMN-01 | Phase 4 | Pending |
| ADMN-02 | Phase 4 | Pending |
| ADMN-03 | Phase 4 | Pending |
| ADMN-04 | Phase 4 | Pending |
| ADMN-05 | Phase 4 | Pending |
| ADMN-06 | Phase 4 | Pending |
| ADMN-07 | Phase 4 | Pending |
| ADMN-08 | Phase 4 | Pending |
| LGAL-01 | Phase 4 | Pending |
| LGAL-02 | Phase 4 | Pending |
| LGAL-03 | Phase 4 | Pending |
| LGAL-04 | Phase 4 | Pending |
| LGAL-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 92 total
- Mapped to phases: 92
- Unmapped: 0

---

## v3 Requirements (2026-06-03 — issue #12 community-funded board pivot)

Requirements introduced by the v3 thesis revision. See `MASTER_PLAN.md` v3.0 and `PROJECT.md` v3 Thesis Revision block. v1 (v2.1) requirements above remain in scope as the legacy single-buyer secondary path.

### CAUSE — Community-funded cause aggregate

- [ ] **CAUSE-01**: Any Clerk-authenticated user can create a cause draft (title, body, desired outcome, ZIP)
- [ ] **CAUSE-02**: Cause body and petition undergo full moderation pipeline (existing MODR + new political_classifier + named_individual tiers) before publish
- [ ] **CAUSE-03**: Cause draft cannot publish if moderation rejects it; cause author notified with reason
- [ ] **CAUSE-04**: Officials snapshotted onto cause at publish time (jurisdiction inferred from ZIP via existing officials lookup)
- [ ] **CAUSE-05**: Cause page is public, indexable, shareable (`/causes/[slug]`)
- [ ] **CAUSE-06**: Cause public page displays signature count, funding progress bar, threshold goal, threshold expiry, paid-influence disclosure
- [ ] **CAUSE-07**: `/causes` public board listing (chronological + funding-velocity weight)
- [ ] **CAUSE-08**: Cause has a maximum lifetime of 30 days (threshold_expiry_at); causes expiring under goal auto-trigger refund
- [ ] **CAUSE-09**: Cause author can withdraw a cause; if contributions exist, mass-refund fires
- [ ] **CAUSE-10**: Cause status field tracks every state (draft/under_review/moderation_rejected/funding/threshold_met/dispatching/dispatched/threshold_failed/refunding/refunded/withdrawn/closed)
- [ ] **CAUSE-11**: Per-cause rate-limit on creation (e.g., 3 causes/user/24h) to deter spam

### SIGN — Signature primitive

- [ ] **SIGN-01**: Anonymous signers can sign with email + ZIP (no Clerk auth required)
- [ ] **SIGN-02**: Named signers (visible on cause co-signer list) require Clerk auth
- [ ] **SIGN-03**: Per-email-per-cause dedup (HMAC of email)
- [ ] **SIGN-04**: Per-IP soft sybil cap (default: 5 signs/IP/24h across all causes)
- [ ] **SIGN-05**: Signature counts always public on cause page; signer identities only public for named signers
- [ ] **SIGN-06**: Signing does NOT require contribution (signing is a free social-proof primitive)

### FUND — Crowdfunding (Stripe Connect, platform-owns-funds)

- [ ] **FUND-01**: Contributors can fund any cause in `funding` status via Stripe Checkout
- [ ] **FUND-02**: Platform-owns-funds posture: no per-creator Stripe Connect onboarding; platform is merchant of record
- [ ] **FUND-03**: Suggested contribution tiers ($1/$5/$15/$25) plus custom amount; min $1
- [ ] **FUND-04**: Per-contributor-per-cause max default $200 (configurable; gated on legal review)
- [ ] **FUND-05**: Stripe webhook handler records CONTRIBUTION ledger row with HMAC checksum
- [ ] **FUND-06**: On each contribution, threshold check fires (escrow_balance >= funding_goal)
- [ ] **FUND-07**: Funding goal computed as `total_vendor_cost / (1 - platform_fee_pct - stripe_pct)` at publish-time; cannot publish if goal too low to dispatch
- [ ] **FUND-08**: Cause-page progress bar updates within 5s of contribution (webhook-driven)
- [ ] **FUND-09**: Per-cause chargeback rate monitored; auto-pause cause + operator alert at >1%

### MAIL — Lob physical mail integration

- [ ] **MAIL-01**: Lob `/v1/postcards` integration (default v3 physical channel)
- [ ] **MAIL-02**: Lob `/v1/letters` integration (higher-impact upgrade tier)
- [ ] **MAIL-03**: Per-official mailing-address verified before Lob send
- [ ] **MAIL-04**: Lob webhook handler tracks USPS delivery scan per piece
- [ ] **MAIL-05**: Lob undeliverable handling: flag official record; do NOT refund per-piece (Lob does not refund undeliverable per most TOS) — bill cause; reduce officials_count
- [ ] **MAIL-06**: Per-cause per-official cap-per-window throttle (default N=2 mailings / M=30 days)
- [ ] **MAIL-07**: Mailer copy (postcard + letter body) generated by Drafter extension; AI disclosure included on physical pieces
- [ ] **MAIL-08**: Lob spend ledgered as EXPENSE per dispatch (per-vendor)
- [ ] **MAIL-09**: Mailing table records per-channel per-official per-cause (channel + external_id + cost + status)

### BULK-EMAIL — Email channel (v3 keeps Postmark per-letter)

- [ ] **BULK-01**: v3 launch uses Postmark per-letter (no bulk-list send; reuse Phase 3 DLVR-02 individual-email pattern)
- [ ] **BULK-02**: Bulk-email decision flag plumbing (Postmark | Resend | SES) implemented but only Postmark active at v3 launch
- [ ] **BULK-03**: Per-domain bounce rate ≥10% pauses sending to that domain (reuse DLVR-05)
- [ ] **BULK-04**: Spam complaint → immediate official suppression (reuse DLVR-07); suppression applies across BOTH v2.1 and v3 paths
- [ ] **BULK-05**: Cause milestone notification emails (50%/75%/100%/expiry-soon) sent via Postmark
- [ ] **BULK-06**: All v3 cause-related emails CAN-SPAM-compliant (reuse LGAL-03); political variant adds extra disclosure
- [ ] **BULK-07**: Per-cause email volume monitored; alert if Postmark per-second/per-day thresholds approached

### SHARE — SEO + social share surface

- [ ] **SHARE-01**: OG metadata on every `/causes/[slug]` page (title, description, image)
- [ ] **SHARE-02**: Twitter Card metadata
- [ ] **SHARE-03**: Schema.org GovernmentAction + Article + BreadcrumbList on cause pages
- [ ] **SHARE-04**: Per-cause share counters (server-side, click-counted)
- [ ] **SHARE-05**: `/sitemap.xml` auto-generated to include all `funding` and `dispatched` causes
- [ ] **SHARE-06**: Google Search Console submission automated on new cause publish
- [ ] **SHARE-07**: Cause page Core Web Vitals targets met (Next.js + Vercel default)
- [ ] **SHARE-08**: Canonical URL prevents duplicate-content issues on cause-author + admin views of same cause

### MOD-v3 — Moderation extensions (additive to v1 MODR)

- [ ] **MOD-V3-01**: New cause moderation tier: `political_classifier` (Haiku 4.5) distinguishes constituent-to-elected-official (allow) from candidate-qua-candidate (block)
- [ ] **MOD-V3-02**: New cause moderation tier: `named_individual` — auto-flag any cause naming an individual; auto-block if private citizen; operator-review if public official
- [ ] **MOD-V3-03**: Paid-influence disclosure surface MANDATORY on every cause page (above-the-fold, cannot be hidden or edited after publish)
- [ ] **MOD-V3-04**: Per-cause political_classifier decision stored on cause + audit-logged
- [ ] **MOD-V3-05**: Operator review queue extended for cause-side flags (existing /admin/flagged extended; or /admin/causes/moderation)
- [ ] **MOD-V3-06**: Mandatory pre-publish operator review for any cause where moderation pipeline returns "needs_review" on cause body OR petition_markdown
- [ ] **MOD-V3-07**: Political CAN-SPAM variant disclosure copy applied to outbound emails when cause classified political
- [ ] **MOD-V3-08**: Per-jurisdiction lobbying-disclosure threshold table maintained in compliance config; Treasury auto-aggregates per-jurisdiction monthly spend; auto-alert at 70%, auto-pause at 90%
- [ ] **MOD-V3-09**: Constituent-to-elected-official posture statement on every cause page

### CONN — Stripe Connect setup

- [ ] **CONN-01**: Platform Stripe Connect account configured for political/advocacy AUP `[NEEDS VENDOR-TOS VERIFICATION 2026-06]`
- [ ] **CONN-02**: Restricted Stripe key scope: read PaymentIntents (cause-scoped), write Refunds — no payouts/Connect-account-creation/platform-settings
- [ ] **CONN-03**: Refund flow tested for: threshold_failed, dispatch_failed, withdrawn, moderation_rejected, contributor_request
- [ ] **CONN-04**: Refund-failed handling: mark contribution `refund_failed`, operator review, cause does NOT mark `refunded` until all contributions resolved

### ENGN — Threshold engine + state machine

- [ ] **ENGN-01**: State machine extension added via `canTransition` API (`apps/worker/src/engine/state-machine.ts`) — never mutates v2.1 transitions
- [ ] **ENGN-02**: BullMQ queues added: cause.publish, cause.threshold.check, cause.expiry.scan, cause.dispatch, cause.refund, cause.milestone.notify
- [ ] **ENGN-03**: Postgres advisory lock on cause.id during threshold check + dispatch enqueue (prevents double-dispatch)
- [ ] **ENGN-04**: Idempotency keys on dispatch job + per-mailing send
- [ ] **ENGN-05**: All cause-side transitions audit-logged (ADMN-07 extension)
- [ ] **ENGN-06**: Drafter agent extended to emit `{petitionMarkdown, letterMarkdown, postcardCopy, mailerCopy}` and persisted on cause at draft time

### DASH-v3 — Cause-author dashboard

- [ ] **DASH-V3-01**: `/dashboard/causes` shows all causes by signed-in user with status + signers + contributors + funding progress + dispatch report
- [ ] **DASH-V3-02**: Per-cause detail page: signer list (named-only), contributor count (anonymized), per-channel-per-official dispatch report
- [ ] **DASH-V3-03**: Cause withdraw action (cause author only) with refund confirmation modal

### ADMN-v3 — Admin tooling extensions

- [ ] **ADMN-V3-01**: `/admin/causes/moderation` cause-moderation queue
- [ ] **ADMN-V3-02**: `/admin/disclosures` paid-influence disclosure audit view
- [ ] **ADMN-V3-03**: Per-cause chargeback rate dashboard
- [ ] **ADMN-V3-04**: Per-jurisdiction monthly aggregate spend dashboard (lobbying-disclosure threshold tracking)
- [ ] **ADMN-V3-05**: Per-official cap-per-window audit view

### LGAL-v3 — Legal + compliance extensions

- [ ] **LGAL-V3-01**: Refund-disclosure copy on every contribution UX `[NEEDS HUMAN/LEGAL REVIEW]`
- [ ] **LGAL-V3-02**: Platform-fee disclosure copy on every contribution UX `[NEEDS HUMAN/LEGAL REVIEW]`
- [ ] **LGAL-V3-03**: Per-state lobbying-disclosure trigger threshold table `[NEEDS HUMAN/LEGAL REVIEW]`
- [ ] **LGAL-V3-04**: Political CAN-SPAM variant disclosure templates per state `[NEEDS HUMAN/LEGAL REVIEW]`
- [ ] **LGAL-V3-05**: Vendor AUP confirmations on file: Stripe Connect political/advocacy + Lob advocacy mail `[NEEDS VENDOR-TOS VERIFICATION 2026-06]`
- [ ] **LGAL-V3-06**: Constituent-to-elected-official policy enforced by political_classifier moderation tier (no candidate targeting)
- [ ] **LGAL-V3-07**: §230 / platform-acting-on-causes legal posture review `[NEEDS HUMAN/LEGAL REVIEW]`

### v3 Phase Mapping

| Requirement prefix | Phase |
|---|---|
| CAUSE, SIGN, MOD-V3, ENGN (partial: state machine + Drafter), Drafter extension | Phase 5 |
| FUND, CONN, ledger extensions, ENGN (refund flows) | Phase 6 |
| MAIL, BULK (decision-flag plumbing), ENGN (dispatch chain), Drafter (mailer copy variants), DASH-V3 (partial) | Phase 7 |
| SHARE, DASH-V3 (full), ADMN-V3, LGAL-V3, MOD-V3 (jurisdiction + political-CAN-SPAM) | Phase 8 |

**v3 Coverage:**
- v3 requirements: ~58 total
- All v3 requirements mapped to Phases 5–8
- Pre-launch guardrails (§24 of MASTER_PLAN) gate Phases 6 and 7 specifically

---
*v3 requirements added: 2026-06-03 — issue #12*
*Requirements defined: 2026-04-25*
*Last updated: 2026-04-25 after roadmap creation*
