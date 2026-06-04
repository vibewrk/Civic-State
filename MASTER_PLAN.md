# CivicState.com — Master Build Plan
**Version 3.0 — June 2026**

> **Changelog v3.0 (issue #12 — community-funded civic-action board pivot):**
> Reframes CivicState from a single-buyer paid-letter platform into a **community-funded civic-action board** — anyone can launch or sign a petition/cause, share it, and chip in money that funds real outbound pressure (mailed letters/postcards + emails) to targeted officials. Promotes the previously-deferred **community** and **crowdfunding** layers from Footnote A / §10 deferral to CORE revenue pillars. Adds **Stripe Connect (platform-owns-funds posture)** to the payment stack, **Lob** to the delivery stack, and the **threshold-triggered dispatch + refund-on-failure** state machine to the engine. Adds a dedicated **Regulatory & Moderation Guardrails** section (§24) covering lobbying / campaign-finance / CAN-SPAM / bulk-mail exposure with a **conditional-GO** verdict gated on six pre-launch guardrails. All legal and vendor claims are flagged `[NEEDS HUMAN/LEGAL REVIEW]` or `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` — none of them are launch-safe assertions yet. **The v2.1 single-buyer paid-letter flow is preserved as a permitted secondary path; nothing shipped in Phases 1–4 is discarded.** This document is a strategic spec revision only — no product code changes in this issue.
>
> **Changelog v2.1 (preserved for historical context):** Further simplified to a thinner CivicState v1. Removed subscriptions from the active plan. Defaulted launch delivery to email only. Demoted community interaction, coalition features, certified mail, and automated follow-up loops to future considerations. Publication is opt-in and read-only. (Phases 1–4 in this document map to this v2.1 thesis and shipped 2026-04-25; the v3 thesis adds Phases 5–8 layered on top.)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Model](#2-business-model)
3. [Platform Architecture Overview](#3-platform-architecture-overview)
4. [Infrastructure — DigitalOcean Droplet](#4-infrastructure--digitalocean-droplet)
5. [OpenClaw Agent Engine](#5-openclaw-agent-engine)
6. [Anthropic API — AI Runtime](#6-anthropic-api--ai-runtime)
7. [Contact Graph — PostgreSQL First](#7-contact-graph--postgresql-first)
8. [CivicState.com — Product Specification](#8-civicstatecom--product-specification)
9. [SEO Strategy — Content as Core Infrastructure](#9-seo-strategy--content-as-core-infrastructure)
10. [Community Layer — Deferred Until Core Loop Proves Itself](#10-community-layer--deferred-until-core-loop-proves-itself)
11. [Pricing Engine](#11-pricing-engine)
12. [Payment Layer & OpenClaw Treasury](#12-payment-layer--openclaw-treasury)
13. [Delivery Stack](#13-delivery-stack)
14. [Frontend](#14-frontend)
15. [Backend API](#15-backend-api)
16. [Database Schema](#16-database-schema)
17. [Security & Compliance](#17-security--compliance)
18. [Phased Build Plan](#18-phased-build-plan)
19. [Revenue Projections & Unit Economics](#19-revenue-projections--unit-economics)
20. [Tech Stack Summary](#20-tech-stack-summary)
21. [Deferred Search & Coalition Concepts](#21-deferred-search--coalition-concepts)
22. [Message Framing Standards](#22-message-framing-standards)
23. [Crowdfunding & Threshold-Triggered Dispatch Engine (v3)](#23-crowdfunding--threshold-triggered-dispatch-engine-v3)
24. [Regulatory & Moderation Guardrails (v3)](#24-regulatory--moderation-guardrails-v3)

[Footnote A — Crowdfunding Adjacency (v2.1 archive; superseded by §23)](#footnote-a)

---

## 1. Executive Summary

CivicState.com is a **community-funded civic-action board**. Anyone can launch or sign a petition/cause, share it, and optionally chip in a few dollars. Once a cause's funding threshold is met, the platform automatically fires real outbound pressure — **mailed letters/postcards + emails** — to the targeted officials, and skims a transparent platform fee on top of vendor cost recovery. As Robertson framed it: "An easy way to engage your civil liberties — very effective soapboxes."

The platform is powered by an **OpenClaw agent instance** running on a **DigitalOcean droplet**, operating 24/7 with the **Anthropic API** (org-level key, usage-based billing) as its AI backbone. A **PostgreSQL contact graph** manages officials, causes, signatures, contributions, letters, mailings, and delivery history. **Stripe (Checkout + Connect, platform-owns-funds posture) + Lob (postcards/letters) + Postmark (email) + Mercury Bank** handle payments, physical mail, transactional email, and operating capital autonomously. The official lookup is the same hybrid (congress.gov + OpenStates + Cicero) already shipped in Phase 2.

The business model rests on three practical pillars:

1. **Platform fee on community contributions** — a transparent 8–12% skim on each contribution (plus Stripe processing pass-through), with the remainder funding the actual mail/email send. Single-buyer paid-letter packages from v2.1 remain a permitted secondary path. `[NEEDS HUMAN/LEGAL REVIEW]` — final fee disclosure language pending.
2. **SEO organic traffic** — every cause is an indexable, shareable civic-reference surface. Each cause page is a long-tail SEO surface that pulls additional contributors via search and social share.
3. **Single-buyer transactional revenue (legacy v2.1 path)** — one-time paid letter packages remain available for users who want to act alone without rallying co-signers. Preserves the unit economics already shipped in Phases 1–4.

The platform is designed for a lean operator, not a zero-human company. OpenClaw handles research, drafting, threshold tracking, dispatch, refunds-on-failure, and bookkeeping, while a human reviews flagged causes/submissions, monitors failures, and handles operational exceptions.

**What this platform is:** A community-funded constituent-communication board. Anyone can post a cause asking their government to act on a specific issue, others can sign and contribute, and the platform turns pooled small contributions into a researched, cited, multi-channel send to the right officials — with the platform keeping a transparent fee.

**What this platform is not:** A legal advice service. A claim-filing service. A lobbying firm or registered lobbyist. A campaign or PAC. A general-purpose crowdfunding platform. All causes are **constituent-to-elected-official** communications — not targeting of candidates qua candidates, not legal demands, not regulatory filings, not claim submissions. Causes naming individuals require pre-publish human moderation review (see §24).

---

## 2. Business Model

### 2.1 Value Proposition

**For citizens:** A very effective soapbox. Post a cause about something your government should do, share it, and even small $1–$5 contributions from neighbors pool into a real, researched, cited letter+postcard+email send to the officials who can actually do something about it. You don't have to fund the whole thing alone, and the platform handles the law, the right officials, and the delivery channels.

**For communities:** A growing, searchable public board of what residents are asking their government to do — with social proof (signature counts), funding momentum (progress toward threshold), and an actual outbound action at the end. Every cause is an SEO surface and a share target.

**For the business:** A self-replenishing SEO + word-of-mouth engine where every cause page is both an indexable long-tail civic-reference document **and** a contribution funnel. Revenue scales with both the number of causes and the depth of contributions per cause. Platform fee on each contribution is recurring-per-event without requiring subscriptions.

### 2.2 Revenue Streams

| Stream | Description | Target net margin |
|--------|-------------|-------------------|
| Platform fee on community contributions (v3 primary) | 8–12% skim on each contribution (Stripe processing pass-through; recommend final number after fee disclosure copy is legally reviewed) | ~70–85% on the fee itself; fee covers gross platform overhead, the rest funds outbound vendor cost |
| Single-buyer letter packages (legacy v2.1 path) | One-time sends ($5–$25) | ~88–92% (per existing v2.1 unit economics, preserved) |
| Priority complex review | Higher-touch human-reviewed sends | ~75–85% |
| API access | Third-party integrations — HOAs, nonprofits (future) | ~90% |

> Crowdfunding was previously deferred (v2.1 Footnote A) and is now **promoted to a core revenue pillar** in v3 (§23). Footnote A is archived rather than active.

**Payment platform (v3):** Stripe Checkout (contributor UX) + Stripe Connect (platform-owns-funds posture — see §12 extension). Mercury Bank as operating account. OpenClaw Treasury Agent manages both autonomously via API, plus tracks contribution escrow + refund-on-failure ledger entries.

### 2.3 Pricing Philosophy

Every dispatch must be cost-positive. The Treasury Agent + threshold engine compute the minimum funding goal for a cause as `vendor_cost_per_official × officials_count + platform_fee_floor + stripe_processing` — a cause does not unlock dispatch until contributions clear that floor (see §23.4). For the legacy single-buyer path, the v2.1 40%-net-margin floor on packages is preserved (§11.2 legacy table). For v3 contributions, the platform fee floor (recommended 8–12%) is the analogous margin gate; final percentage `[NEEDS HUMAN/LEGAL REVIEW]` on disclosure language.

### 2.4 Competitive Positioning

| Competitor | What They Do | Our Differentiation (v3) |
|------------|-------------|--------------------------|
| Resistbot | SMS letters to lawmakers | Community-funded threshold-triggered multi-channel send (mail + email), researched, cited, jurisdictionally targeted |
| Change.org | Petition hosting | Petitions plus **actual delivery** (Lob + email) plus pooled small-dollar funding plus researched citation backing |
| GoFundMe | General crowdfunding | Civic-only, **platform-owns-funds** posture (no per-creator Connect onboarding, funds pay vendor costs not creator wallets), automated outbound action at threshold |
| LegalZoom | Document drafting | 10x cheaper, civic-specific, community-funded |
| Manual contact | Direct constituent outreach | We do the research, drafting, multi-channel routing, threshold-pool funding, refund-on-failure, and delivery |
| Lobbyists / 501(c)(4)s | Paid professional advocacy | Per-cause crowdfunding ($1–$5 from many) instead of large-donor patron model; transparent platform fee instead of opaque retainer; **constituent-to-elected-official only** — never candidate targeting |

---

## 3. Platform Architecture Overview

> **v3 LEAN compose-don't-build principle (issue #12).** The platform is composed of external APIs glued by OpenClaw rather than built bottom-up. Existing v2.1 backbone (Express on a DigitalOcean droplet, Anthropic API, PostgreSQL contact graph, Stripe Checkout, Postmark, Mercury) is preserved. v3 adds: **Stripe Connect** for crowdfunding contribution flow (platform-owns-funds posture), **Lob** for physical mail (`/v1/letters`, `/v1/postcards`), and a **threshold engine** in the worker. Bulk-email vendor choice (Postmark vs Resend vs SES) is left as a decision flag until per-cause volume forces it — Postmark deliverability is already warmed (DLVR-03/04 shipped) so changing channels mid-launch is operationally riskier than sticking with Postmark per-letter.

### 3.1 v3 Component Map (Compose-Don't-Build)

| Capability | Vendor / API | Status in code | v3 disposition |
|---|---|---|---|
| Crowdfunding / contribution UX | Stripe Checkout | Shipped (Phase 3) | Extend with **Stripe Connect** destination charges + `application_fee_amount`; **platform-owns-funds** (no creator Connect onboarding) |
| Physical mail (postcards/letters) | **Lob** `/v1/letters`, `/v1/postcards` | Not wired | **NEW** in v3 (`apps/api/src/lib/mail/lob.ts` + worker channel handler) `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` for advocacy mail acceptable-use |
| Bulk email | Postmark (default v3 — already warmed) / Resend / SES (decision flag) | Postmark wired | Keep Postmark as default; add decision-flagged alternative path only if volume forces it `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` for political-bulk acceptable-use |
| Official lookup (federal) | congress.gov | Shipped | Reuse |
| Official lookup (state) | OpenStates v3 | Shipped | Reuse |
| Official lookup (local) | Cicero (or BallotReady) | Stubbed | Reuse / finalize provider |
| AI drafting | Anthropic API (Sonnet 4.6 / Haiku 4.5 / Opus 4.6) | Shipped | Extend Drafter to emit `{petitionMarkdown, letterMarkdown, postcardCopy, mailerCopy}` |
| Threshold engine | New — BullMQ repeatable + webhook-driven | Not wired | **NEW** in v3 (`engine/state-machine.ts` extension; see §23.3) |
| Auth | Clerk | Shipped | Reuse; anonymous signers stay unauth, named co-signers + cause authors require Clerk |
| Treasury / ledger | OpenClaw Treasury + append-only ledger + HMAC checksums | Shipped | Extend to track contributions, platform fee, Lob spend, refund-on-failure entries |

### 3.2 v2.1 Foundation (preserved)

```
┌─────────────────────────────────────────────────────────────────┐
│                    DIGITALOCEAN DROPLET                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐     │
│  │               OPENCLAW AGENT ENGINE                   │     │
│  │                (Anthropic API)                        │     │
│  │                                                       │     │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐      │     │
│  │  │ CLASSIFIER │  │ RESEARCHER │  │  DRAFTER   │      │     │
│  │  └────────────┘  └────────────┘  └────────────┘      │     │
│  │                                                       │     │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐      │     │
│  │  │   PRICER   │  │ PUBLISHER  │  │  DELIVERY  │      │     │
│  │  └────────────┘  └────────────┘  └────────────┘      │     │
│  │                                                       │     │
│  │  ┌──────────────────┐    ┌──────────────────┐        │     │
│  │  │   OPS REVIEW     │    │  TREASURY        │        │     │
│  │  │     QUEUE        │    │  AGENT           │        │     │
│  │  └──────────────────┘    └──────────────────┘        │     │
│  └───────────────────────────────────────────────────────┘     │
│                            │                                    │
│          ┌─────────────────┼─────────────────┐                 │
│          ▼                 ▼                 ▼                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  OFFICIALS   │  │  PostgreSQL  │  │  Redis Queue │         │
│  │   DIRECTORY  │  │   App DB     │  │  (BullMQ)    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │     CIVICSTATE.COM       │
                 │   Next.js (Vercel)       │
                 │         ↕               │
                 │  Express API (Droplet)   │
                 └─────────────────────────┘
```

---

## 4. Infrastructure — DigitalOcean Droplet

### 4.1 Droplet Specification

**Starting configuration:**
- **Type:** General Purpose — Premium Intel
- **Size:** 8 vCPU / 16 GB RAM / 320 GB NVMe SSD
- **Region:** NYC3
- **OS:** Ubuntu 24.04 LTS
- **Cost:** ~$96/month

**Services on this droplet:**
- OpenClaw agent engine (Node.js, PM2)
- Express API server
- PostgreSQL (Docker container)
- Redis (Docker container)
- Nginx (reverse proxy + SSL termination)
- Certbot (Let's Encrypt SSL)

**DigitalOcean add-ons (when needed):**
- Managed PostgreSQL: $50/mo (when data volume demands)
- Spaces (S3 object storage for letter archives): $25/mo
- Load Balancer: $12/mo (Phase 3+)

### 4.2 Docker Compose Stack

```yaml
services:
  api:        # Express API server (port 3001)
  openclaw:   # Agent engine (BullMQ worker process)
  postgres:   # Database (port 5432, internal only)
  redis:      # Queue + cache (port 6379, internal only)
  nginx:      # Reverse proxy (ports 80, 443)
```

### 4.3 Domain Routing (Nginx)

```
civicstate.com          → Vercel (Next.js frontend)
api.civicstate.com      → Express API (port 3001)
```

### 4.4 Deployment & Automation

- **CI/CD:** GitHub Actions → Docker Hub → auto-deploy to droplet on push to `main`
- **Process management:** PM2 with auto-restart and log rotation
- **Backups:** Weekly DigitalOcean droplet snapshot + PostgreSQL point-in-time recovery
- **Monitoring:** DigitalOcean native metrics + UptimeRobot for uptime alerts
- **Logs:** Structured JSON to DigitalOcean managed logging

### 4.5 Scaling Path

```
Phase 1 (0–5,000 submissions/month):   Single droplet, all services co-located
Phase 2 (5k–20k/month):               Migrate DB to managed PostgreSQL
Phase 3 (20k+/month):                 Horizontally scale API + agent workers
Phase 4:                               DigitalOcean Kubernetes (DOKS) if needed
```

---

## 5. OpenClaw Agent Engine

### 5.1 What OpenClaw Is

OpenClaw is the autonomous AI agent framework that manages CivicState end-to-end. It is a persistent, event-driven agent runtime — not a chatbot, not a one-shot API call. It maintains state, schedules jobs, orchestrates sub-agents, and operates continuously.

It runs as a Node.js process on the DigitalOcean droplet, consuming jobs from a Redis/BullMQ queue and persisting all state to PostgreSQL. Every action it takes is logged, auditable, and reversible.

### 5.2 Agent Architecture — Core Launch Functions

OpenClaw is intentionally narrow at launch. It has six core functions plus treasury bookkeeping:

- **Classifier** — determines issue type, jurisdiction, and urgency from ZIP + user text
- **Researcher** — finds applicable law, enforcement authority, and target officials
- **Drafter** — writes the letters and campaign summary
- **Framing Reviewer** — inline quality gate that strips partisan or grievance-first language
- **Pricer** — estimates token/delivery cost and returns one-time package options
- **Delivery** — sends via Postmark, records status, and captures replies
- **Publisher** — creates a read-only public campaign page only if the user opted in
- **Treasury Agent** — records revenue, expenses, balances, and reserve status

There is no autonomous follow-up loop in the launch plan. Human review and operational exceptions sit in an admin queue, not a self-directed agent.

### 5.3 Rules of Engagement

**ALWAYS:**
- Include regulation citations in every letter (statute number, CFR section, or ordinance reference)
- Verify official contact information against the internal officials directory before sending
- Log every action with timestamp, job ID, and agent version
- Apply 40% margin floor before presenting packages to user
- Respect user anonymity preference on all public-facing content
- Queue failed sends for retry — never silently drop
- Apply Framing Reviewer before drafting any letter or summary
- Include opt-out / unsubscribe in every delivered letter (CAN-SPAM)
- Treasury Agent pre-authorization required before any outbound spend

**NEVER:**
- Send letters on behalf of users who have not paid (no optimistic execution)
- Fabricate regulations, citations, or official contact information
- Draft language that constitutes legal advice, a legal demand notice, or a regulatory filing
- Frame any letter as anything other than a constituent communication from a voter to an elected official
- Use partisan, tribal, or inflammatory language
- Operate outside the civic engagement domain (no insurance demands, no claim filings, no medical content)
- Store sensitive user data in unencrypted fields
- Allow Mercury operating balance to fall below the $1,500 safety reserve
- Process a user job if Stripe payment webhook has not been confirmed

**ESCALATE TO HUMAN REVIEW — these are not rare edge cases:**
- Any letter citing specific legal penalties the official may personally face ("you are liable under...", "this violates 18 U.S.C. §...")
- Any letter whose structure or tone resembles a legal demand notice rather than a constituent request — regardless of whether legal proceedings are explicitly mentioned
- Any submission containing factual claims the user asserts as true that the platform cannot independently verify (specific statistics, alleged official misconduct, attributed dollar amounts, incident dates for events not in public record)
- Any submission mentioning pending lawsuits, attorney representation, or intent to file legal proceedings
- Any submission targeting a private individual rather than a public official or agency
- Any submission that may constitute harassment or defamation
- Any bulk-send pattern: a single user targeting more than 10 officials in one submission, or submitting more than 3 campaigns in 24 hours
- Any submission made on behalf of a business entity rather than an individual constituent (business civic advocacy requires separate policy review)

### 5.4 Job Queue Architecture (BullMQ)

```
QUEUE: submission.new       → Classifier → Researcher
QUEUE: research.complete    → Drafter (includes Framing Review) → Pricer
QUEUE: payment.confirmed    → Delivery → Publisher
QUEUE: publish.check        → Publisher (privacy + SEO meta)
QUEUE: content.curate       → Publisher (daily SEO freshness jobs)
QUEUE: ops.review           → Human review + failure queue
```

Each job: unique ID, 3× retry with exponential backoff, dead-letter queue for persistent failures, token budget enforced (agent aborts if exceeded by >20%).

### 5.5 Autonomous Operating Schedule

```
REAL-TIME (as submissions arrive):
  Classification, research, drafting, pricing, post-payment delivery

HOURLY:
  Delivery status checks (bounce detection, email tracking)
  Failed job retry evaluation

DAILY (2 AM):
  Regulation reference page freshness review
  Sitemap regeneration
  SEO content audit (flag pages with zero engagement in 90 days)
  Officials directory hygiene (flag bounced email addresses)
  Treasury reconciliation → daily P&L report emailed at 7 AM

WEEKLY (Sunday midnight):
  Token cost reconciliation (estimated vs actual per job type)
  Pricing review for operator approval if margins drift
  Review unresolved human-flagged jobs and bounced officials
```

---

## 6. Anthropic API — AI Runtime

### 6.1 Why the Anthropic API

CivicState uses the **Anthropic API** accessed via an **org-level API key** under **usage-based billing**. There is no subscription tier or seat license. Every API call is billed by token consumption — input and output tokens priced separately.

> **Important:** "Claude Max" is Anthropic's consumer-facing claude.ai subscription for individual users. It is not a programmatic API and cannot be called from server-side code. All references to "Claude Max" in prior versions of this document were an error. The platform runs on the Anthropic API, which is a separate product entirely. The API is metered — every call has a direct dollar cost, which is why the Pricer agent calculates token estimates before charging users.

Selected for:
- **Extended context** — entire regulatory documents in a single call
- **Tool use / function calling** — structured JSON outputs for reliable agent chaining
- **Instruction following accuracy** — critical for the Framing Reviewer's language rules
- **Citation accuracy** — lower regulation hallucination rate than alternatives
- **Cost-controllable** — per-token billing enables exact per-job cost calculation

### 6.2 Model Assignment by Task

| Task | Model | Reason |
|------|-------|--------|
| Issue classification | claude-haiku-4-5 | Simple categorization, high volume, low stakes |
| Target list lookup | claude-haiku-4-5 | Structured extraction from known data |
| Framing review (inline) | claude-haiku-4-5 | Rule-checking, not generative — fast and cheap |
| SEO content generation | claude-haiku-4-5 | High volume, structured templates |
| Pricing calculation | claude-haiku-4-5 | Arithmetic + rules only |
| Regulation research | claude-sonnet-4-6 | Deep document comprehension, citation accuracy |
| Letter drafting (standard) | claude-sonnet-4-6 | Quality writing at reasonable cost |
| Letter drafting (complex federal) | claude-opus-4-6 | Highest accuracy for high-stakes multi-jurisdictional |

### 6.3 Token Budget Management

```
Research phase:       8,000–25,000 tokens  (varies by regulatory complexity)
Letter drafting:      2,000–8,000 tokens per letter
SEO page generation:  800–2,000 tokens per page
Framing review:       200–500 tokens per document
Typical per submission: 12,000–50,000 tokens total
Estimated cost:       $0.10–$0.40/submission at Sonnet rates
```

The Pricer agent estimates token cost before presenting packages. The 40% margin floor is applied on net revenue after Stripe fees. No job runs before its cost has been validated.

### 6.4 Context Management

A **job context object** is created per submission, passed between agents, and stored in PostgreSQL `jobs.context_snapshot`:

```json
{
  "job_id": "job_abc123",
  "submission": { "issue": "...", "zip": "33101", "desired_outcome": "..." },
  "classification": { "issue_type": "...", "jurisdiction_levels": [...] },
  "research": { "regulations": [...], "officials": [...] },
  "framing_review": { "passed": true, "rewrites": [...] },
  "draft_letters": [...],
  "pricing": { "token_cost_actual": 0.28, "packages": [...] },
  "delivery_status": { ... },
  "publish_record": { "slug": "...", "published_at": "..." }
}
```

Failed jobs resume from the last saved context step — no re-running prior agent work.

---

## 7. Contact Graph — PostgreSQL First

### 7.1 Why Keep This In PostgreSQL At Launch

The launch product does not need a separate CRM. Officials, campaigns, letters, and delivery history can live in the core application database first. This keeps the stack simpler:
- fewer containers to operate on day one
- fewer sync problems between app state and CRM state
- easier debugging when delivery or reply handling fails
- no admin UI dependency before the core loop earns revenue

### 7.2 Launch Object Model

```
OFFICIALS
  name, title, office
  level: local / state / federal
  jurisdiction, state, district
  email, mailing_address, phone, fax, web_portal_url
  response_rate (computed from delivery history)
  last_contacted_date
  total_letters_received

AGENCIES
  name, type: government / nonprofit
  jurisdiction level, contact info
  submission_method: email primary, other channels noted for future expansion

CAMPAIGNS
  campaign_id, slug, title
  user_id (or anonymous_zip)
  issue_type, jurisdiction_levels
  status: draft / active / resolved / closed
  officials_targeted → OFFICIALS
  regulations_cited
  outcome_type, outcome_description
  published_url, created_at, resolved_at

LETTERS
  campaign_id → CAMPAIGNS
  official_id → OFFICIALS
  content (encrypted), content_preview
  channel: email
  status: drafted / queued / sent / delivered / bounced / responded
  external_delivery_id, sent_at, delivered_at
  response_received_at, response_summary

USERS
  user_id, email, display_name, zip_code
  anonymous_preference
  stripe_customer_id, total_sends
```

### 7.3 Data Seeding Sources

- **Federal officials:** congress.gov API, USA.gov agency directory
- **State officials:** OpenStates API (all 50 legislatures), state agency directories
- **Local officials:** Google Civic Information API (called live per ZIP in Phase 1; bulk-seeded in Phase 2)

### 7.4 Contact Data Maintenance (automated)

- Bounce detection: flag officials with confirmed email bounces
- Congressional turnover: update via OpenStates after elections
- Monthly web validator: check official website contact pages for changed emails
- Response rate: updated per-official after every campaign cycle

---

## 8. CivicState.com — Product Specification

### 8.1 User Journey

The launch journey is intentionally linear:

```
1. LAND
   User arrives via Google or direct to civicstate.com

2. START
   /start asks one question first:
   "What change do you want your government to make?"

3. SUBMIT FORM
   User provides:
   - issue description
   - specific desired outcome
   - ZIP code
   - email address
   - optional name / anonymity preference

4. RESEARCH IN PROGRESS (1–3 minutes)
   OpenClaw:
   - finds the right officials by ZIP
   - researches applicable law and oversight authority
   - rewrites for clarity and non-partisan effectiveness
   - drafts letters

5. PREVIEW
   User sees:
   - plain-English research summary
   - officials who will receive letters
   - cited regulations / statutes
   - letter preview
   - one-time package options

6. PAY
   Stripe Checkout

7. DELIVER
   Letters sent via email
   Confirmation email sent to user
   Officials directory updated with delivery status

8. OPTIONAL PUBLIC RECORD
   If user opted in, publish a read-only campaign page
   If user chose private, keep campaign dashboard-only
```

### 8.2 Submission Form Fields

```
REQUIRED:
  issue_description    free text, 50–2000 chars
  desired_outcome      free text, 50–500 chars
  zip_code             5-digit
  email                account + delivery confirmation

OPTIONAL:
  full_name            if not anonymous
  issue_category       auto-filled, user can override
  urgency              standard / urgent / time-sensitive
  publish_preference   public named / public anonymous / private
  attachments          deferred from launch unless needed for a reviewed case
```

### 8.3 Research Pipeline

```
STEP 1: JURISDICTION MAPPING
  Input:   ZIP code
  Sources: Google Civic Information API + internal officials table
  Output:  All elected officials at local/county/state/federal level

STEP 2: REGULATION RESEARCH
  Input:   Issue description + jurisdiction
  Sources: eCFR.gov (federal regs), Justia (state statutes),
           CourtListener (case law), Congress.gov (active legislation)
  Output:  Applicable regulations with citations, plain-English
           summaries, enforcement mechanism (who enforces this?)

STEP 3: TARGET LIST
  Input:   Issue type + officials list + enforcement mechanisms
  Logic:   Priority = direct jurisdiction → oversight authority →
           constituent relationship → committee relevance
  Output:  Ordered list of officials per package tier

STEP 4: FRAMING REVIEW (inline — see Section 22.2)
  Input:   User's raw issue + desired outcome text
  Output:  Non-partisan, outcome-focused rewrite shown transparently
           alongside original; original preserved in private record

STEP 5: HUMAN REVIEW CHECK
  Inline check against Section 5.3 escalation rules
  If triggered: job flagged, delivery paused, admin notified
  Admin approves or rejects within 24 hours; user notified of delay

STEP 6: LETTER DRAFTING
  Per recipient (claude-sonnet-4-6 standard, claude-opus-4-6 for complex):
  - Opens with constituent relationship statement
  - States issue clearly (outcome-focused, not grievance-focused)
  - Cites applicable regulations by number
  - States specific requested action with reasonable timeline
  - Closes professionally with user contact information
  - Calibrated tone per recipient type
  - Is never a legal demand, regulatory filing, or claim submission

STEP 7: PUBLISHING METADATA (only if user opted in)
  - Campaign title + meta description
  - SEO-safe slug
  - Read-only public summary
```

### 8.4 Package Options

```
STARTER — $5
  1 letter to most relevant official
  Email delivery
  Optional read-only public page
  One-time

AMPLIFY — $15  ← MOST POPULAR
  5 letters to top officials across relevant jurisdictions
  Email delivery
  Optional read-only public page
  One-time

COMPLEX — $25
  Up to 10 letters across multiple jurisdiction levels
  Human review before send
  Optional read-only public page
  One-time
```

### 8.5 Published Campaign Page Structure

```
URL: /campaigns/[city]-[state]-[issue-slug]-[year]

ABOVE THE FOLD:
  Campaign title (SEO headline)
  Issue summary (2–3 sentences)
  Status badge (sent / delivered / replied)
  Share button

BODY:
  Full issue description
  Desired outcome (specific ask)
  Officials targeted (names, titles, contact links)
  Regulations cited (linked to reference pages)
  Letter preview (first letter, anonymized if private)
  Timeline of actions taken
  Public reply summary if user chooses to share it

SCHEMA.ORG:
  GovernmentAction, Article, BreadcrumbList
```

---

## 9. SEO Strategy — Content as Core Infrastructure

### 9.1 Philosophy

SEO is a byproduct, not the primary workflow. The launch rule is simple: only publish pages that already exist for product reasons.

Each opted-in paid submission can generate:
- one read-only campaign page
- one plain-English legal/reference summary
- updated official metadata if contact information changed

Goal: build a credible civic reference library without turning launch scope into a content farm.

### 9.2 Target Keyword Clusters

```
LOCAL ACTION:
  "petition [city] [official] about [issue]"
  "write letter to mayor [city] about [issue]"
  "how to contact [senator name] [state]"
  "[issue] enforcement [city] [year]"

REGULATION REFERENCE:
  "[regulation name] [state] explained"
  "how to report [violation type] [city]"
  "[law citation] enforcement complaint"

COMMUNITY / SOCIAL PROOF:
  "[city] [issue] petition [year]"
  "how to contact [official] about [issue]"
```

### 9.3 Content Types and Publishing Cadence

| Content Type | Volume | Update Frequency | SEO Value |
|-------------|--------|-----------------|-----------|
| Campaign pages | 1 per submission | On activity | Very High |
| Regulation reference pages | Per citation | Quarterly | Very High |
| Official profiles | Deferred until contact graph is mature | Future | Medium |

### 9.4 Technical SEO (built in from day one)

- Schema.org: GovernmentAction, Article, BreadcrumbList on every page
- Open Graph + Twitter Cards on every page
- Canonical URLs prevent duplicate content
- XML Sitemap auto-generated, submitted to Google Search Console
- Core Web Vitals: Next.js 14 + Vercel — fast by default
- Mobile-first responsive design
- Internal linking: campaign pages link to official profiles and regulation pages

### 9.5 Content Freshness (daily OpenClaw job)

- Re-check regulation pages for legislative amendments
- Update official profiles after elections or contact changes

### 9.6 Link Building

- Share buttons on public campaign pages
- Official responses that users choose to publish create credible update stories
- Useful regulation summaries earn links naturally from local civic organizations

---

## 10. Community Layer — CORE (v3, promoted from deferred)

> **v3 change.** v2.1 deferred community until the core loop proved itself; v3 makes the community-funded cause board **the** core loop. Community-as-deferred sections below are preserved as "not-in-v3-launch" rather than "permanently deferred."

### 10.1 Community Features

| Feature | v3 status | Notes |
|---------|-----------|-------|
| **Cause** public pages | **CORE (v3 Phase 5)** | Each cause is a public, indexable, shareable surface — title, body, target officials, signature count, funding progress, threshold, status |
| **Signature** (sign-without-paying) | **CORE (v3 Phase 5)** | Anonymous signers are unauth; named signers (visible on cause page co-signer list) require Clerk |
| **Contribution** (pay-into-cause) | **CORE (v3 Phase 6)** | Stripe Checkout via Connect, platform-owns-funds posture; min contribution recommended $1; suggested defaults $5/$15/$25 |
| Share mechanics | **CORE (v3 Phase 8)** | Social/share buttons, OG metadata, per-cause share counters |
| Cause co-signer display rules | **CORE (v3 Phase 5)** | Named signers shown by default; "X others" aggregate for anonymous signers; signature counts always public |
| Comments on cause pages | **DEFERRED (v3.x)** | Moderation cost still too high relative to the marginal signal; reconsider when moderation tooling is mature |
| Direct messaging between signers | Out of scope | Not aligned with constituent-to-elected-official posture |
| Coalition / cause-merge mechanics | **DEFERRED (v3.x)** | Reconsider if overlapping-cause volume becomes real (per §21 revisit conditions) |

### 10.2 Moderation Rules (v3 extension — see §24)

For v3, moderation extends to **cause body text** and **named-individual review**, in addition to per-submission letter text:

- Auto-block obvious profanity, threats, harassment, or personal attacks (reuse Phase 2 MODR-01 pipeline)
- Flag named misconduct allegations, unverifiable factual claims, and defamation risk for human review (reuse MODR-02)
- **NEW (v3):** mandatory pre-publish human review for **any cause that names a private individual** (extension of MODR-02; auto-block if the named party is a private citizen rather than a public official acting in office) — see §24
- **NEW (v3):** **paid-influence disclosure surface** on every cause page (who funded the send, total raised, platform fee, vendor cost) — see §17.3 + §24
- **NEW (v3):** **political-content classifier tier** added to the moderation pipeline distinguishing candidate-targeting (block) from incumbent-acting-in-office (allow) — see §24
- Cause comments are not in v3-launch scope; only signatures + contributions

### 10.3 Voting & Co-Signing Mechanics (v3)

In v3, "signing" is the lightweight co-sign primitive:
- Anonymous signer: ZIP + optional email; recorded as a signature on the cause, counts toward signature total
- Named signer (auth required): ZIP + email + display name; shown on the public co-signer list
- Dedup: per email + per cause; per IP soft-cap to deter sybil amplification
- Signatures are **not** required for dispatch — only contributions hitting the funding threshold trigger dispatch (§23.3)
- Signature counts on the public page provide social proof to encourage contributions

### 10.4 Community Feed Algorithm

A simple chronological + funding-velocity-weighted feed on `/causes` is in v3 Phase 8. Editorial / personalized ranking remains out of scope until traffic volume justifies it.

### 10.5 Milestone Automation

Threshold milestones (50% / 75% / 100% funded) trigger automatic email blasts to all signers and contributors of that cause, encouraging share and additional contribution. See §23.5.

---

## 11. Pricing Engine

> **v3 change.** The v3 primary path is **community-funded contributions with a platform-fee skim**, not single-buyer package pricing. The v2.1 single-buyer package logic is preserved as the legacy secondary path (§11.3).

### 11.1 v3 Platform-Fee Model (primary)

Each cause has a computed **funding goal** (the threshold required to dispatch the send). Contributions are pooled in platform-owned escrow until the goal is met or the cause expires; on dispatch, the platform skims a fee and spends the rest on vendor cost.

```
v3 cost decomposition (per cause, per dispatch):

per_official_email_cost   = postmark_cost                    (~$0.001)
per_official_mail_cost    = lob_postcard_or_letter           (~$0.45–$1.50 postcard; ~$1.00–$2.50 letter)
                            [NEEDS VENDOR-TOS VERIFICATION 2026-06 for advocacy mail pricing]
ai_drafting_cost          = sonnet/haiku tokens              (~$0.05–$0.30 per cause)
fixed_platform_allocation = hosting + AI fixed overhead      (~$0.10 per cause)

vendor_cost_per_official  = per_official_email_cost + per_official_mail_cost
total_vendor_cost         = ai_drafting_cost
                          + (vendor_cost_per_official × officials_count)
                          + fixed_platform_allocation

platform_fee_pct          = 0.10                              [recommended 8–12% — see §11.4]
                            [NEEDS HUMAN/LEGAL REVIEW] for fee-disclosure copy

# minimum funding goal a cause needs to be "dispatchable"
funding_goal_floor        = total_vendor_cost / (1 - platform_fee_pct - stripe_processing_pct)
                            where stripe_processing_pct ≈ 0.029 + flat fee per contribution

# cause author may set goal >= floor; below floor blocks publish
```

**Per-contribution math:**
```
contribution_net          = contribution_amount × (1 - stripe_processing_pct) - stripe_flat_fee
escrow_balance           += contribution_net
on dispatch:
  platform_fee_collected = escrow_balance × platform_fee_pct
  vendor_spend_budget    = escrow_balance - platform_fee_collected
on threshold_failed (expiry):
  refund per contributor at full contribution_amount  (Stripe-side; platform absorbs
  Stripe processing — flag as policy decision in §24)
```

### 11.2 v3 Suggested Contribution Tiers

Suggested defaults shown on each cause contribution UX (cause authors cannot override the defaults; they are surfaced as suggestions only):

| Tier | Amount | Use case |
|------|--------|----------|
| Quick | $1 | Lightweight pledge to keep momentum (signal-quality similar to a sign) |
| Standard | $5 | Default suggestion; pays for ~1 mailed postcard + email at platform fee |
| Boost | $15 | Pays for ~3 mailed postcards at platform fee |
| Push | $25 | Pays for ~5 mailed postcards at platform fee |
| Custom | $1+ | Any amount (Stripe min ≈ $0.50 with platform fee → $1 effective floor) |

Min contribution: $1 (Stripe processing dominates below this). Max contribution: **`[NEEDS HUMAN/LEGAL REVIEW]`** for KYC + lobbying-disclosure-trigger considerations — recommend defaulting to **$200/contributor/cause** at v3 launch and reviewing per state lobbying-disclosure thresholds before raising it.

### 11.3 Legacy Single-Buyer Package Pricing (v2.1, preserved)

The v2.1 single-buyer path is retained for users who want to act alone without rallying co-signers. v2.1 dynamic-pricing logic + tier table is preserved verbatim below.

```
token_cost    = (research_tokens × input_rate) + (draft_tokens × output_rate)
                [per Anthropic API pricing for assigned model tier]

delivery_cost = email ($0.001)

stripe_fee    = (package_price × 0.029) + 0.30

total_cogs    = token_cost + delivery_cost + stripe_fee

package_price = total_cogs / (1 - 0.40)    [40% margin on net after fees]
package_price = max(package_price, tier_floor)
package_price = round_up_to_nearest($5)
```

| Tier | Floor Price | Typical COGS | Use Case |
|------|------------|-------------|----------|
| Starter | $5 | $0.60–$1.50 | 1 letter, simple local issue |
| Amplify | $15 | $2–$5 | 5 letters, city/county issue |
| Complex | $25 | $5–$10 | 10 letters, multi-jurisdictional + human review |

### 11.4 v3 Pricing Display UX

```
YOUR CAUSE: "Repave NW 2nd Ave btw 20th–22nd St by Sept 2026"
  ✓ 3 jurisdiction levels found
  ✓ 2 federal regulations cited
  ✓ 1 city ordinance cited
  ✓ 8 officials identified

  FUNDING GOAL: $87.50  ← minimum threshold for dispatch (covers vendor cost + 10% platform fee)
  RAISED SO FAR: $34.00  (39%)  · 12 signers · 4 contributors

  Suggested contribution:
    [ $1 ]   Quick pledge — keeps momentum
    [ $5 ]   Standard — funds ~1 postcard + email
    [ $15 ]  Boost — funds ~3 postcards + email     ← MOST POPULAR
    [ $25 ]  Push — funds ~5 postcards + email
    [ custom ]

  [Why do we need this much? →]   (links to transparent vendor-cost breakdown)
  [What happens if we don't hit the goal? →]   (links to refund policy)
  [Who sees this and what's the platform's cut? →]   (links to §17.3 disclosure)
```

### 11.5 Display & disclosure rules (v3)

Every contribution UX surface MUST display:
1. Funding goal + current raised
2. Vendor cost breakdown (officials × per-official cost)
3. Platform fee percentage and absolute dollar amount it represents
4. Refund-on-failure policy and the threshold-expiry date
5. AI-disclosure (per LETR-02 + California AI transparency law)
6. "Not legal advice" disclaimer (per LETR-06)
7. Constituent-to-elected-official posture statement (§24 guardrail)

---

## 12. Payment Layer & OpenClaw Treasury

### 12.1 Why Not PayPal

PayPal was evaluated and explicitly rejected for three structural reasons:

1. **Account freeze risk for civic content.** PayPal has terminated accounts for civic and advocacy organizations — mainstream pro-democracy groups, not fringe content — without warning, holding funds for up to 180 days with no meaningful appeal. CivicState (citizens writing letters to officials) registers as "politically contentious" in PayPal's automated risk systems. A freeze stops all revenue and prevents OpenClaw from paying Anthropic — the entire autonomous loop collapses.

2. **Cannot pay vendors.** PayPal Payouts sends money to PayPal accounts. Anthropic, Postmark, and DigitalOcean accept credit cards — not PayPal deposits. PayPal solves zero of the vendor payment automation problem.

3. **API not suited for autonomous agents.** 21-day fund holds on new accounts, dated REST architecture, no AI agent toolkit, inferior webhook reliability compared to Stripe.

### 12.2 Chosen Architecture: Stripe + Mercury Bank

Two independent financial layers. A problem at one does not collapse the other.

```
LAYER 1 — STRIPE (payment collection)
  Accepts customer payments (card, Apple Pay, Google Pay)
  Native AI Agent Toolkit for OpenClaw integration
  Auto-payouts daily → Mercury bank account

LAYER 2 — MERCURY (operating bank)
  Holds $1,500 minimum reserve (pre-funded startup capital — see 12.10)
  API-accessible: OpenClaw reads balance + transactions daily
  Per-vendor virtual debit cards:
    - Anthropic API     → CARD #1  ($500/month limit)
    - Postmark          → CARD #2  ($50/month limit)
    - DigitalOcean      → CARD #3  ($150/month limit)

RESILIENCE:
  If Stripe pauses payouts for any compliance review, Mercury covers
  all vendor bills for up to 90 days at launch-phase spend rates.
  OpenClaw never goes offline due to a payment processor freeze.
```

### 12.3 Money Flow

```
CUSTOMER PAYS → Stripe Checkout
                      ↓
          Stripe webhook → /webhooks/stripe
          (HMAC-verified, dead-letter queued)
                      ↓
          Treasury Agent records REVENUE in ledger
                      ↓
          Stripe balance accumulates
                      ↓ (daily automated payout)
          Mercury business bank account
                      ↓
          Vendors charge assigned Mercury virtual cards
                      ↓
          Mercury webhook → Treasury Agent records EXPENSE
                      ↓
          Daily reconcile: Stripe + Mercury vs. internal ledger
```

### 12.4 APIs Used

| Layer | API | Purpose |
|-------|-----|---------|
| Stripe | Payment Intents | One-time customer payments |
| Stripe | Balance API | Read available balance |
| Stripe | Events / Webhooks | Real-time payment events |
| Stripe | Agent Toolkit | Native AI integration |
| Mercury | Accounts API | Read operating balance |
| Mercury | Transactions API | Full transaction history |
| Mercury | Cards API | Manage per-vendor virtual debit cards |

### 12.5 The Treasury Agent

The only agent with read/write access to the financial ledger and payment APIs.

**Restricted API key scoping:**
- Stripe key: `read` on balance, charges, customers; `write` on invoices only — cannot modify payout settings
- Mercury key: `read` on balances and transactions; `write` on payments to pre-approved recipients only

**Responsibilities:**

```
INBOUND (on Stripe webhook payment_intent.succeeded):
  Record: amount, user_id, package_type, timestamp
  Update: stripe_balance += net_amount (after Stripe fee)
  Log:    ledger entry (REVENUE)

OUTBOUND (on Mercury transaction webhook):
  Record: amount, vendor (matched by card ID), timestamp
  Update: mercury_balance -= charge_amount
  Log:    ledger entry (EXPENSE)

TOKEN COST TRACKING:
  After each Anthropic API call: record actual token usage
  Flag: jobs where actual > estimated by >20%

PAYOUT MONITORING (daily):
  Verify Stripe → Mercury payout arrived
  Log: ledger entry (TRANSFER)
  Alert: if payout missing 24h after expected window

RECONCILIATION (daily 3 AM):
  Pull Stripe Balance Transactions API (prior 24h)
  Pull Mercury Transactions API (prior 24h)
  Compare against internal ledger
  Flag discrepancies > $0.10
  Generate P&L summary → email at 7 AM

SAFETY CONTROLS:
  mercury_safety_reserve:      $1,500  (90-day buffer, never drop below)
  mercury_warning_threshold:   $2,000  (email alert)
  mercury_critical_threshold:  $1,000  (pause non-critical jobs, urgent alert)
  mercury_emergency_threshold: $500    (pause ALL spending, escalation)
  stripe_floor:                $50     (pause queuing new jobs)
  max_single_job_token_cost:   $25     (escalate to human review)
  daily_token_spend_limit:     $300    (hard Anthropic API cap per day)
```

### 12.6 Internal Ledger Schema

```sql
-- Append-only: only INSERT, never UPDATE
ledger_entries (
  id                        UUID PRIMARY KEY,
  entry_type                VARCHAR CHECK (entry_type IN
                              ('REVENUE','EXPENSE','REFUND','TRANSFER','ADJUSTMENT')),
  amount                    DECIMAL(10,4),
  currency                  CHAR(3) DEFAULT 'USD',
  vendor                    VARCHAR,
  user_id                   UUID REFERENCES users NULLABLE,
  job_id                    UUID REFERENCES jobs NULLABLE,
  package_type              VARCHAR,
  stripe_payment_intent_id  VARCHAR,
  mercury_transaction_id    VARCHAR,
  description               TEXT,
  running_balance           DECIMAL(10,4),
  reconciled                BOOLEAN DEFAULT false,
  created_at                TIMESTAMP DEFAULT NOW()
)

treasury_snapshots (
  id                UUID PRIMARY KEY,
  snapshot_date     DATE UNIQUE,
  opening_balance   DECIMAL(10,4),
  total_revenue     DECIMAL(10,4),
  total_expenses    DECIMAL(10,4),
  stripe_fees       DECIMAL(10,4),
  anthropic_cost    DECIMAL(10,4),
  lob_cost          DECIMAL(10,4),
  postmark_cost     DECIMAL(10,4),
  digitalocean_cost DECIMAL(10,4),
  other_costs       DECIMAL(10,4),
  closing_balance   DECIMAL(10,4),
  gross_margin_pct  DECIMAL(5,2),
  job_count         INT,
  avg_cogs_per_job  DECIMAL(10,4),
  created_at        TIMESTAMP
)
```

### 12.7 Daily P&L Report (7 AM email)

```
CIVICSTATE — DAILY FINANCIAL SUMMARY
Date: March 15, 2026

BALANCES
  Stripe available:  $312.40
  Mercury operating: $1,847.20  (includes $1,500 reserve)
  Combined:          $2,159.60

REVENUE (yesterday)
  Submissions:  $135.00  (9 jobs)
  Gross:        $135.00
  Stripe fees:   -$4.22
  Net revenue:  $130.78

EXPENSES (yesterday)
  Anthropic API:   $22.40
  Postmark:         $0.09
  DigitalOcean:     $3.20
  Vercel (alloc):   $1.33
  Clerk (alloc):    $0.83
  Total:           $27.85

NET CASH TODAY:  +$102.93
GROSS MARGIN:     76.2%

SAFETY:
  ✓ Mercury above $1,500 floor
  ✓ Stripe above $50 floor
  ✓ Token spend: $22.40 of $300 limit (7.5%)
  ✓ No reconciliation discrepancies
  ✓ No human review flags pending

JOBS: 14 processed  |  2 queued  |  0 failed
MTD NET REVENUE: $3,101.50
```

### 12.8 Balance Safeguards

| Situation | Action |
|-----------|--------|
| All balances healthy | Normal operations |
| Stripe < $200 | Email alert to owner; continue all operations |
| Stripe < $50 | Pause queuing new jobs; complete already-paid jobs; urgent alert |
| Mercury < $2,000 | Email alert; continue all operations |
| Mercury < $1,500 | Approaching reserve floor; email + SMS to owner |
| Mercury < $1,000 | Pause non-critical vendor calls; urgent alert |
| Mercury < $500 | Pause ALL spending; queue everything; escalation |
| Single job token cost > $25 | Escalate to human review before executing |
| Daily token spend > $300 | Hard stop on new Anthropic API calls; notify owner |
| Reconciliation discrepancy > $0.10 | Flag and log; do not halt operations |
| Stripe payout missing 24h | Alert owner immediately |
| Stripe webhook fails 3× | Dead-letter queue; manual reconciliation; never double-process |

### 12.9 Stripe Fee Accounting

```
stripe_fee    = (package_price × 0.029) + 0.30
net_revenue   = package_price - stripe_fee
package_price = (total_cogs + stripe_fee) / (1 - 0.40)
```

### 12.10 The $1,500 Reserve — How It Works

**The reserve must be deposited into Mercury before the platform accepts its first payment.** It is pre-funded startup capital, not accumulated from revenue.

**Why $1,500 (not $500):**
At launch-phase vendor spend (~$5.40/day fixed + light variable = ~$8–10/day total), 90 days costs roughly ~$720–$900. Rounding to $1,500 provides genuine 90-day coverage even if early job volume is higher than minimal. The old v1 figure of $500 would cover only a few weeks at the documented burn rate — not a 90-day reserve by any measure.

**Account stability — chargeback management:**
- Billing descriptor: "CIVICSTATE.COM" (customers recognize the charge)
- Proactive refunds: refund automatically for any undelivered job before a dispute is filed
- Target chargeback rate: < 0.5% (Stripe pauses payouts at ~0.75–1%)
- Stripe account description: "SaaS platform enabling citizens to draft letters to government officials" — specific, accurate, non-inflammatory

### 12.11 Refunds

Complete failure (no letters sent):
- Treasury Agent calls Stripe Refunds API
- Ledger entry: REFUND
- User notified by email

Partial failure (some letters sent, some failed):
- Partial refund proportional to undelivered letters
- Calculated by Delivery Agent, passed to Treasury Agent

### 12.12 v3 Extension — Stripe Connect (platform-owns-funds posture)

> **v3 change.** Crowdfunding contributions flow through Stripe Connect, but **the platform — not the cause creator — is the merchant of record and holds the funds**. Cause creators never see Connect onboarding. This is the single most important regulatory/operational choice in v3.

**Why platform-owns-funds (not per-creator Connect onboarding):**

| Question | Per-creator Connect onboarding | **Platform-owns-funds (v3 choice)** |
|---|---|---|
| Does the cause creator receive money? | Yes (after Connect onboarding, KYC, payouts) | **No** — funds pay vendor cost (Lob / Postmark / Anthropic / fixed allocation), platform skims fee |
| Onboarding friction for creators? | High (Stripe Connect KYC required before publishing) | **None** — creators just publish causes |
| Lobbying / campaign-finance exposure? | Higher — creators are receiving funds intended to influence officials | **Lower** — platform is paying vendors to perform an action; not transferring money to the cause creator. **`[NEEDS HUMAN/LEGAL REVIEW]`** still required to confirm this distinction holds under federal LDA + state lobbying registries |
| Refund mechanics | Stripe-native refund through Connect | Stripe-native refund directly from platform account (simpler) |
| Stripe Connect AUP exposure for "political/advocacy" causes | Higher — Stripe reviews per-creator account standing | Lower (single platform account in good standing) but **not eliminated** — `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` for Stripe AUP on political/advocacy at the platform level |
| KYC burden | Per-creator | Platform-level (already in place) |

**Stripe Connect flow (v3):**

```
CONTRIBUTOR PAYS → Stripe Checkout (platform-account)
                          ↓
              Stripe webhook → /webhooks/stripe (HMAC-verified)
                          ↓
              Treasury Agent records:
                - CONTRIBUTION (cause_id, contributor_id, amount, stripe_payment_intent_id)
                - escrow_balance(cause_id) += contribution_net
              Cause threshold check:
                if escrow_balance(cause_id) >= funding_goal:
                  transition cause: funding → threshold_met
                  enqueue dispatch job (Drafter → Delivery)
                  on dispatch_complete:
                    Treasury Agent records:
                      PLATFORM_FEE (cause_id, fee_amount)
                      EXPENSE (per vendor: lob, postmark, anthropic, alloc)
                  transition cause: threshold_met → dispatching → dispatched → closed

CAUSE EXPIRES UNDER GOAL → BullMQ scheduled job
                          ↓
              Treasury Agent enumerates contributions; refunds each via Stripe Refunds API
              Records REFUND ledger entries; per-contributor stripe_processing_loss
              flagged in §24 policy (platform absorbs the processing loss)
              transition cause: funding → threshold_failed → refunding → refunded → closed
```

**API additions on top of v2.1 (§12.4):**

| Layer | API | Purpose (v3 addition) |
|-------|-----|-----------------------|
| Stripe | PaymentIntents (per-contribution) | Multiple PaymentIntents per cause (one per contributor), all on the platform account |
| Stripe | Refunds | Mass-refund on threshold expiry |
| Stripe | (optional) Connect Custom — platform-owned only | Not used for creators; reserved for future co-platform-fee arrangements |

**Restricted Stripe key scoping (v3 extension):**
- `read` on PaymentIntents (cause-scoped query)
- `write` on Refunds (per-contributor refund on threshold expiry)
- **No** payouts, no Connect account creation, no platform settings mutation

**Ledger schema extension** (additive, no migration to existing v2.1 columns):

```sql
-- additional entry_type values:
-- 'CONTRIBUTION'       contributor → platform escrow (incoming)
-- 'PLATFORM_FEE'       platform skim on dispatch
-- 'REFUND_PARTIAL'     partial refund (vendor failure)
-- 'REFUND_THRESHOLD'   full refund (cause expired under goal)
-- 'ESCROW_HOLD'        marker that funds are conditionally held until threshold/expiry

-- additional FK column on ledger_entries:
--   cause_id  UUID REFERENCES causes NULLABLE
```

**Treasury Agent v3 responsibilities (additive to §12.5):**
- Per-cause escrow ledger
- Threshold check on every contribution
- Mass-refund on cause expiry
- Per-vendor expense routing per dispatch (Lob, Postmark, Anthropic)
- HMAC checksum on every new ledger row (reuse DATA-05)

**Chargeback / dispute exposure (v3):**
- Per-contributor amounts are small ($1–$25), so chargeback frequency dominates over chargeback severity
- Same 0.5% chargeback rate target as v2.1; per-cause chargeback rate tracked separately
- Causes whose chargeback rate exceeds 1% are auto-paused and operator-reviewed
- Refund-before-dispute posture: if a contributor reports a problem, refund within 24h to prevent the dispute filing

### 12.13 v3 Refund-on-Failure State Machine

Owned by the Treasury Agent + Threshold Engine (§23.3). Triggers:

| Trigger | Action | Ledger entries |
|---|---|---|
| Cause expires below funding goal | Mass-refund each contributor | one `REFUND_THRESHOLD` per contributor |
| Cause hits threshold; dispatch fails (all officials bounce) | Mass-refund each contributor; cause status `dispatch_failed` | one `REFUND_PARTIAL` per contributor; platform fee not collected |
| Cause hits threshold; dispatch partial (some officials bounce) | Proportional refund per contributor | per-contributor `REFUND_PARTIAL` proportional to undelivered share |
| Cause moderation-rejected after contributions received | Mass-refund each contributor; cause status `moderation_rejected` | `REFUND_THRESHOLD` per contributor |
| Cause withdrawn by creator after contributions received | Mass-refund each contributor; cause status `withdrawn` | `REFUND_THRESHOLD` per contributor |
| Contributor self-refund request before threshold | Stripe Refunds API; deduct from escrow_balance | single `REFUND_PARTIAL` for that contributor |

**Platform absorbs the Stripe processing loss on full refunds** (Stripe's per-transaction flat fee is non-refundable in many cases). Recommend reserving 1% of revenue against this loss line until volume data is in hand. `[NEEDS HUMAN/LEGAL REVIEW]` on refund-disclosure copy.

---

## 13. Delivery Stack

> **v3 change.** Email-only is no longer the dispatch model. v3 dispatch is **multi-channel by default** — email + postcard (Lob) is the recommended baseline; letters (Lob) for higher-impact targets; email-only for low-volume fallback. Postmark deliverability is already warmed (DLVR-03/04 shipped) so the bulk-email vendor choice (Postmark vs Resend vs SES) is left as a decision flag rather than a forced migration.

### 13.1 Channels (v3)

```
EMAIL (retained from v2.1)
  Provider: Postmark
  Cost:     ~$0.001/email
  Tracking: Opens, bounces, replies (inbound webhook)
  Status:   warmed (DLVR-03/04 shipped 2026-04-25)

POSTCARD (new in v3)
  Provider: Lob /v1/postcards
  Cost:     ~$0.45–$1.50/piece [NEEDS VENDOR-TOS VERIFICATION 2026-06]
  Tracking: USPS delivery scan via Lob webhook
  Use:      default v3 channel for elected-official dispatch (higher attention than email)

LETTER (new in v3)
  Provider: Lob /v1/letters
  Cost:     ~$1.00–$2.50/piece [NEEDS VENDOR-TOS VERIFICATION 2026-06]
  Tracking: USPS delivery scan via Lob webhook
  Use:      higher-impact officials (committee chairs, agency heads); cause author can upgrade

BULK EMAIL (decision flag — not in v3 launch)
  Candidates: Postmark (default — already warmed), Resend, SES
  Decision:   defer change until per-cause email volume forces it
  Rationale:  re-warming a new sender domain is operationally riskier than scaling Postmark
```

### 13.2 Routing Logic (v3)

```
FOR EACH OFFICIAL IN TARGET_LIST(cause_id):
  resolve channel(s) per cause configuration:
    default = {email, postcard}  if cause has mailing-address-verified officials
    fallback = {email}            if no mailing address available

  FOR EACH (official, channel) PAIR:
    1. Check internal officials directory for verified contact (email and/or mailing_address)
    2. If channel == 'email':
         - check per-domain bounce rate < 10% (reuse DLVR-05)
         - if pass: route to Postmark queue
         - if fail: skip; record skip reason
    3. If channel == 'postcard' or 'letter':
         - check Lob has valid mailing_address; check official opt-out flag
         - if pass: route to Lob queue
         - if fail: skip; record skip reason
    4. Log delivery intent in officials history (channel-specific external_delivery_id)
    5. Update cause page: "Sent to [Official] via [email + postcard]"
    6. Per-official cap-per-window check (v3 addition — see §24): if this cause +
       prior causes have already sent >N to this official in the past M days, skip
       and log throttle reason. Default v3 launch values: N=2, M=30.
       [NEEDS HUMAN/LEGAL REVIEW] on values + per-official policy variance.
```

### 13.3 Bounce & Failure Handling (v3)

- **Email bounce:** Flag official record; suppress future auto-sends to that address (DLVR-05/06/07 shipped)
- **Lob undeliverable (e.g. address invalid):** Flag official record; require operator review of mailing_address; bill cause for the spent Lob piece (Lob does not refund undeliverable pieces in most cases) `[NEEDS VENDOR-TOS VERIFICATION 2026-06]`
- **No delivery method (no verified email AND no verified mailing address):** Mark official `undeliverable`; reduce cause's officials_count; recompute vendor cost; if `dispatch_failed` because all officials undeliverable, fire §12.13 mass-refund
- **Per-domain bounce ≥10% (email):** pause email channel to that domain (reuse v2.1 throttle)
- **Per-vendor failure (Lob outage):** retry with exponential backoff; if persistent, queue for operator review; do NOT auto-fallback to certified mail (no Lob → USPS-direct path)
- All failures logged to dead-letter queue with full job context (reuse v2.1)

### 13.4 Response Tracking (v3)

When an official replies (any channel):
- Email reply → Postmark inbound webhook (same as v2.1; reuse DLVR-08 reply+{id}@civicstate.com routing)
- Postal reply → operator-entered via /admin (Lob does not provide inbound mail; postal replies are rare for postcard-only dispatch but not zero)
- Claude parses reply, generates plain-English summary (deferred from v2.1 — covered by EHAI-01 v2 requirement; v3 can pull it forward)
- Summary attached to the cause (visible to signers + contributors)
- Cause-author notified by email; signers/contributors notified by email
- Official record updated (response date, sentiment, channel)
- No automated follow-up letter is queued in v3 launch scope (per v2.1 policy — preserved)

---

## 14. Frontend

### 14.1 Structure

```
/civicstate-monorepo
  /apps
    /civicstate-web          ← Next.js 14 (App Router)
  /packages
    /ui                      ← Component library (shadcn/ui base)
    /api-client              ← Typed API client
    /types                   ← Shared TypeScript types
    /utils                   ← Shared utilities
  /services
    /api                     ← Express backend
    /openclaw                ← Agent engine
    /worker                  ← BullMQ workers
  docker-compose.yml
  package.json               ← workspaces
```

**Theme:** Navy blue + gold accents — civic, authoritative, trustworthy.

### 14.2 Component Library

```
<DiscoverySearch />     ← Search-before-create gate
<SubmissionForm />      ← Issue submission form
<ResearchProgress />    ← Agent progress indicator
<PackageSelector />     ← Pricing card comparison
<LetterPreview />       ← Draft letter + framing transparency
<OfficialCard />        ← Target official preview
<RegulationCite />      ← Citation display + reference link
<DeliveryStatus />      ← Per-official delivery tracking
<PublishToggle />       ← Public vs private campaign preference
<ResponseSummary />     ← Official reply summary
```

### 14.3 Pages

```
PHASE 1 — CORE LOOP:
  /                       Homepage
  /start                  Discovery search + submission form
  /start/preview          Research results + package selection
  /campaigns/[slug]       Campaign page (read-only)
  /dashboard              User dashboard
  /privacy                Privacy policy
  /terms                  Terms of service
  /how-it-works

LATER, ONLY IF NEEDED:
  /laws/[slug]            Regulation reference pages
  /officials/[slug]       Official profiles
```

---

## 15. Backend API

### 15.1 Routes

```
AUTH:
  POST /auth/register
  POST /auth/login
  POST /auth/logout
  GET  /auth/me

SUBMISSIONS:
  POST /submissions/civic           ← Create submission
  GET  /submissions/:id/status      ← Job status polling
  GET  /submissions/:id/preview     ← Draft + pricing preview
  POST /submissions/:id/confirm     ← Post-payment confirmation

CAMPAIGNS (public):
  GET  /campaigns/:slug             ← Single campaign

OFFICIALS:
  GET  /officials/lookup?zip=       ← Officials by ZIP

PAYMENTS:
  POST /payments/create-intent      ← Stripe Payment Intent
  POST /payments/confirm/:id        ← Capture confirmed payment

USER:
  GET  /user/campaigns
  GET  /user/deliveries

WEBHOOKS:
  POST /webhooks/stripe             ← Payment events (HMAC-verified)
  POST /webhooks/mercury            ← Card transaction events
  POST /webhooks/postmark           ← Email delivery + reply events

TREASURY (admin-auth only):
  GET  /treasury/balance
  GET  /treasury/ledger
  GET  /treasury/snapshot/:date
  GET  /treasury/alerts

ADMIN (admin-auth only):
  GET  /admin/jobs
  GET  /admin/flags                 ← Human review queue
  POST /admin/flags/:id/resolve     ← Approve or reject flagged job
  GET  /admin/stats
```

### 15.2 Authentication

- **Clerk** — social login + email magic link
- JWT for API requests
- API key auth for webhooks and internal services
- Rate limiting: 100 req/min per IP; 1,000/min authenticated

---

## 16. Database Schema

```sql
users (
  id                 UUID PRIMARY KEY,
  email              VARCHAR UNIQUE,
  display_name       VARCHAR,
  zip_code           CHAR(5),
  anonymous_default  BOOLEAN DEFAULT false,
  stripe_customer_id VARCHAR,
  clerk_user_id      VARCHAR,
  created_at         TIMESTAMP,
  last_active_at     TIMESTAMP
)

campaigns (
  id                  UUID PRIMARY KEY,
  slug                VARCHAR UNIQUE,
  user_id             UUID REFERENCES users,
  title               VARCHAR,
  issue_description   TEXT,
  desired_outcome     TEXT,
  zip_code            CHAR(5),
  city                VARCHAR,
  state               CHAR(2),
  issue_category      VARCHAR,
  jurisdiction_levels VARCHAR[],
  status              VARCHAR DEFAULT 'draft',
  anonymous           BOOLEAN,
  publish_preference  VARCHAR,
  published_at        TIMESTAMP,
  seo_meta            JSONB,
  created_at          TIMESTAMP
)

officials (
  id                     UUID PRIMARY KEY,
  full_name              VARCHAR,
  title                  VARCHAR,
  office                 VARCHAR,
  level                  VARCHAR,
  jurisdiction           VARCHAR,
  state                  CHAR(2),
  district               VARCHAR,
  email                  VARCHAR,
  mailing_address        TEXT,
  phone                  VARCHAR,
  last_verified          TIMESTAMP,
  response_rate          DECIMAL,
  total_letters_received INT DEFAULT 0,
  twentycrm_id           VARCHAR
)

letters (
  id                   UUID PRIMARY KEY,
  job_id               VARCHAR,
  campaign_id          UUID REFERENCES campaigns,
  official_id          UUID REFERENCES officials,
  content              TEXT,
  content_preview      TEXT,
  channel              VARCHAR,
  status               VARCHAR DEFAULT 'drafted',
  external_delivery_id VARCHAR,
  sent_at              TIMESTAMP,
  delivered_at         TIMESTAMP,
  response_received_at TIMESTAMP,
  response_summary     TEXT
)

jobs (
  id               UUID PRIMARY KEY,
  job_type         VARCHAR,
  submission_id    UUID,
  status           VARCHAR DEFAULT 'queued',
  current_agent    VARCHAR,
  token_budget     INT,
  tokens_used      INT,
  context_snapshot JSONB,
  error_log        TEXT,
  created_at       TIMESTAMP,
  completed_at     TIMESTAMP
)

ledger_entries (
  id                        UUID PRIMARY KEY,
  entry_type                VARCHAR,
  amount                    DECIMAL(10,4),
  currency                  CHAR(3) DEFAULT 'USD',
  vendor                    VARCHAR,
  user_id                   UUID REFERENCES users NULLABLE,
  job_id                    UUID REFERENCES jobs NULLABLE,
  package_type              VARCHAR,
  stripe_payment_intent_id  VARCHAR,
  mercury_transaction_id    VARCHAR,
  description               TEXT,
  running_balance           DECIMAL(10,4),
  reconciled                BOOLEAN DEFAULT false,
  created_at                TIMESTAMP DEFAULT NOW()
)

treasury_snapshots (
  id                UUID PRIMARY KEY,
  snapshot_date     DATE UNIQUE,
  opening_balance   DECIMAL(10,4),
  total_revenue     DECIMAL(10,4),
  total_expenses    DECIMAL(10,4),
  stripe_fees       DECIMAL(10,4),
  anthropic_cost    DECIMAL(10,4),
  postmark_cost     DECIMAL(10,4),
  digitalocean_cost DECIMAL(10,4),
  other_costs       DECIMAL(10,4),
  closing_balance   DECIMAL(10,4),
  gross_margin_pct  DECIMAL(5,2),
  job_count         INT,
  avg_cogs_per_job  DECIMAL(10,4),
  created_at        TIMESTAMP
)

-- Deferred features such as comments, votes, subscriptions,
-- certified mail, and coalition/search models are intentionally
-- omitted from the launch schema.
```

### 16.1 v3 Schema Deltas (additive)

> **Decision:** v3 introduces a `Cause` aggregate **separate from** the existing `campaigns` table. The v2.1 `campaigns` table is per-submission-per-tier and remains the home of the single-buyer legacy path. The new `causes` table is the community-funded aggregate. A `causes.legacy_campaign_id` (NULLABLE) bridges the two when a cause spawns a v2.1-style send for human-review fallback. Existing v2.1 columns and tables are not mutated.

```sql
-- v3 new tables (Prisma model names; Postgres-snake_case below)

causes (
  id                       UUID PRIMARY KEY,
  slug                     VARCHAR UNIQUE,
  author_user_id           UUID REFERENCES users,           -- creator; Clerk auth required
  title                    VARCHAR,                         -- 50–120 chars
  body_markdown            TEXT,                            -- cause body, moderated before publish
  desired_outcome          TEXT,                            -- mirrors campaigns.desired_outcome shape
  zip_code                 CHAR(5),                         -- author ZIP for jurisdiction inference
  city                     VARCHAR,
  state                    CHAR(2),
  jurisdiction_levels      VARCHAR[],                       -- {local, state, federal}
  officials_target         UUID[],                          -- snapshotted list of official_ids at publish
  funding_goal_cents       INTEGER NOT NULL,                -- computed minimum at publish
  amount_raised_cents      INTEGER DEFAULT 0,
  contributor_count        INTEGER DEFAULT 0,
  signer_count             INTEGER DEFAULT 0,
  threshold_expiry_at      TIMESTAMP NOT NULL,              -- default 30 days from publish; cause expires & refunds if not met
  status                   VARCHAR DEFAULT 'draft',         -- draft|under_review|moderation_rejected|funding|threshold_met|dispatching|dispatched|threshold_failed|refunding|refunded|withdrawn|closed
  channels_requested       VARCHAR[],                       -- {email, postcard, letter}; cause default {email, postcard}
  petition_markdown        TEXT,                            -- AI-drafted at publish-time (v3 Drafter extension)
  legacy_campaign_id       UUID REFERENCES campaigns NULL,  -- bridge: when a cause spawns a v2.1-shape campaign for operator-review or partial-refund accounting
  moderation_tier          VARCHAR,                         -- pass|flag|block (reuse MODR pipeline tiers)
  paid_influence_disclosure JSONB,                          -- §24 disclosure surface payload
  published_at             TIMESTAMP NULL,                  -- NULL until passes moderation
  created_at               TIMESTAMP DEFAULT NOW(),
  updated_at               TIMESTAMP
)

signatures (
  id                       UUID PRIMARY KEY,
  cause_id                 UUID REFERENCES causes,
  user_id                  UUID REFERENCES users NULL,      -- NULL for anonymous; NOT NULL for named signers
  email_hash               VARCHAR,                         -- for dedup (HMAC of email)
  zip_code                 CHAR(5),
  display_name             VARCHAR NULL,                    -- only set for named signers
  ip_hash                  VARCHAR,                         -- for sybil soft-cap
  created_at               TIMESTAMP DEFAULT NOW(),
  UNIQUE (cause_id, email_hash)
)

contributions (
  id                       UUID PRIMARY KEY,
  cause_id                 UUID REFERENCES causes,
  contributor_user_id      UUID REFERENCES users NULL,      -- NULL for guest contribute (Stripe Checkout email captured)
  contributor_email_hash   VARCHAR,                         -- for guest contributor dedup
  amount_cents             INTEGER NOT NULL,                -- contribution gross
  net_cents                INTEGER NOT NULL,                -- after Stripe processing
  stripe_payment_intent_id VARCHAR UNIQUE,
  status                   VARCHAR DEFAULT 'pending',       -- pending|succeeded|refunded|refund_failed
  refunded_at              TIMESTAMP NULL,
  refund_reason            VARCHAR NULL,                    -- threshold_failed|dispatch_failed|withdrawn|moderation_rejected|user_request|...
  created_at               TIMESTAMP DEFAULT NOW()
)

mailings (
  id                       UUID PRIMARY KEY,
  cause_id                 UUID REFERENCES causes,
  letter_id                UUID REFERENCES letters NULL,    -- if a per-official letter object was created
  official_id              UUID REFERENCES officials,
  channel                  VARCHAR NOT NULL,                -- 'email'|'postcard'|'letter'
  external_provider        VARCHAR NOT NULL,                -- 'postmark'|'lob'
  external_id              VARCHAR,                         -- postmark MessageID or Lob id
  cost_cents               INTEGER,                         -- vendor cost recorded at dispatch
  status                   VARCHAR DEFAULT 'queued',        -- queued|sent|delivered|bounced|undeliverable|spam_complaint|failed
  status_updated_at        TIMESTAMP,
  delivery_scan_at         TIMESTAMP NULL,                  -- USPS scan for Lob; delivery webhook for Postmark
  created_at               TIMESTAMP DEFAULT NOW()
)

refund_events (
  id                       UUID PRIMARY KEY,
  cause_id                 UUID REFERENCES causes,
  contribution_id          UUID REFERENCES contributions,
  amount_cents             INTEGER,
  stripe_refund_id         VARCHAR,
  reason                   VARCHAR,                         -- threshold_failed|dispatch_failed|withdrawn|moderation_rejected|user_request|partial_proportional
  created_at               TIMESTAMP DEFAULT NOW()
)

-- v3 additions to existing tables (NOT mutations of existing columns):

-- ledger_entries:
--   ALTER TABLE ledger_entries ADD COLUMN cause_id UUID REFERENCES causes NULL;
--   (entry_type CHECK constraint widens to include
--      'CONTRIBUTION','PLATFORM_FEE','REFUND_PARTIAL','REFUND_THRESHOLD','ESCROW_HOLD')

-- officials: no schema mutation; v3 reuses opt_out + bounce flags

-- moderation_decisions: v3 moderation tier extends existing pipeline; no new table required —
--   audit_logs row pattern reused (reason includes 'cause_political_classifier',
--   'cause_names_individual', 'cause_paid_influence_disclosure_failed')
```

### 16.2 Cause vs. Campaign reconciliation rule (v3)

- **Cause** = community-owned aggregate. Multiple contributors, signers, mailings, refund_events. Lives in v3 path.
- **Campaign** (existing) = per-submission per-tier object from v2.1. Single buyer, single payment. Lives in v2.1 legacy path.
- A cause's dispatch MAY spawn an internal "synthetic v2.1 campaign" via `causes.legacy_campaign_id` only when the dispatch flow needs to reuse the existing v2.1 delivery/operator-review paths verbatim. The v3 Drafter and Delivery agents should prefer the new cause + mailings tables and bypass the synthetic-campaign bridge when possible.
- **Never** mutate existing `campaigns.user_id` to point at a cause. The bridge is one-way: cause → optional legacy campaign for operator-review fallback only.

---

## 17. Security & Compliance

### 17.1 Infrastructure Security

- **Firewall:** Ports 80 and 443 public; port 22 (SSH) restricted to admin IPs; all other ports closed
- **SSH:** Key-based auth only; no passwords; root login disabled
- **Secrets:** All API keys in environment variables — never in code or Docker images
- **Database:** PostgreSQL accessible only within the droplet's private network
- **Nginx:** Rate limiting, request size limits, HSTS, CSP, X-Frame-Options
- **DDoS:** DigitalOcean native protection + optional Cloudflare proxy

### 17.2 Application Security

- **SQL injection:** Parameterized queries via Prisma — zero raw SQL
- **XSS:** React escaping + CSP headers
- **CSRF:** SameSite cookies + CSRF tokens on state-changing endpoints
- **Input validation:** Zod schema validation on all API inputs
- **Encryption:** Letter content encrypted at rest (AES-256-GCM)
- **Audit logging:** All admin actions logged with user ID + timestamp
- **Rate limiting:** Per-IP and per-user limits on submission + payment endpoints
- **Dependency scanning:** GitHub Dependabot + npm audit in CI

### 17.3 Legal

- **Terms of Service:** Platform provides constituent communication assistance, not legal advice. Letters are personal constituent communications — not legal filings, regulatory submissions, or demand notices.
- **Disclaimer (shown at preview):** "CivicState helps you communicate with your elected officials. Nothing on this platform constitutes legal advice. You are responsible for the accuracy of the facts you provide."
- **Privacy Policy:** CCPA and GDPR compliant; explicit data retention schedules; right to deletion within 72 hours
- **CAN-SPAM:** All outbound letters include opt-out instructions and platform address
- **Content Policy:** No targeting of private individuals; no harassment; no defamation; partisan framing rules enforced at agent level
- **Data classification:**
  - Class 1 (encrypted, access-logged): letter content, full name
  - Class 2 (encrypted): email, ZIP code
  - Class 3 (public): campaign titles, regulation citations, official profiles, opt-in public summaries

### 17.4 v3 — Paid-Influence Disclosure Surface

Every cause page MUST display, in a permanently-visible disclosure section:
- Total amount raised (gross)
- Platform fee percentage and absolute dollar value collected
- Vendor cost breakdown (Lob, Postmark, Anthropic, hosting allocation)
- Cause author identity (display name or "anonymous community member" if author opted anonymous)
- Constituent-to-elected-official posture statement
- Refund policy
- AI-disclosure (per LETR-02 + California AI transparency law) — reused verbatim from v2.1

Disclosure rendering rules:
- Above-the-fold on cause page (visible without scroll on mobile)
- Linked from every contribution UX surface
- Saved as JSON in `causes.paid_influence_disclosure` (audit trail)
- Cannot be hidden by cause author; cannot be edited after publish
- Required by §24 guardrails before launch — gating item

### 17.5 v3 — Cause Data Classification (extends 17.3)

| Class | v3 fields added |
|---|---|
| Class 1 (encrypted) | `causes.body_markdown` (if it contains user-asserted facts that could harm a named individual), `causes.petition_markdown` (same rationale), per-cause moderation rationale |
| Class 2 (encrypted) | `signatures.email_hash` (always hashed), `contributions.contributor_email_hash` (hashed), `mailings.cost_cents` (operational sensitivity, not user privacy) |
| Class 3 (public) | `causes.title`, `causes.slug`, `causes.amount_raised_cents`, `causes.signer_count`, `causes.contributor_count`, paid-influence disclosure JSON, official targets |

---

## 18. Phased Build Plan

### Phase 1 — Core Revenue Loop (8 weeks, 1–2 developers)

**One goal:** A single user can submit a civic issue, receive a researched letter package, pay, and have that letter delivered by email. The platform earns its first dollar.

**Explicitly NOT in Phase 1:** Community features, certified mail, subscriptions, coalition/search features, automated follow-up loops, bulk official seeding, and any public commenting or voting.

```
WEEK 1 — Infrastructure
  ✓ DigitalOcean droplet (8 vCPU / 16 GB)
  ✓ Docker Compose: API + PostgreSQL + Redis + Nginx
  ✓ GitHub repo + CI/CD: GitHub Actions → Docker Hub → droplet
  ✓ civicstate.com DNS + SSL (Certbot)

WEEK 2 — Database & Auth
  ✓ Prisma schema: users, campaigns, letters, officials,
    jobs, ledger_entries (Phase 1 tables only)
  ✓ Migrations applied to PostgreSQL
  ✓ Clerk auth integration: register, login, /auth/me
  ✓ Express API scaffolded

WEEK 3 — Stripe Payments (one-time only)
  ✓ Stripe Payment Intents (one-time only)
  ✓ Stripe webhook: payment_intent.succeeded
  ✓ Basic ledger: REVENUE entries on payment confirmed
  ✓ Mercury account opened; vendor cards configured
  ✓ $1,500 reserve deposited into Mercury before going live

WEEK 4 — OpenClaw: Classifier + Researcher
  ✓ BullMQ job queue on Redis
  ✓ Classifier agent (claude-haiku-4-5):
      issue type + jurisdiction from ZIP + text description
  ✓ Google Civic Information API: ZIP → officials list (live, no bulk seeding)
  ✓ Researcher agent (claude-sonnet-4-6):
      regulation research via Anthropic API, structured output
  ✓ Job context object (stored in jobs.context_snapshot)
  ✓ GET /admin/jobs: job queue status

WEEK 5 — OpenClaw: Drafter + Pricer + Human Review Gate
  ✓ Drafter agent (claude-sonnet-4-6): letter drafting per official
  ✓ Framing Reviewer (claude-haiku-4-5): inline non-partisan check
  ✓ Pricer agent (claude-haiku-4-5): token cost → package pricing
  ✓ GET /submissions/:id/preview: draft letters + packages
  ✓ Human review flag logic (Section 5.3 escalation rules):
      flagged jobs → admin queue, NOT auto-delivered
  ✓ GET/POST /admin/flags: human review queue + resolve

WEEK 6 — Email Delivery
  ✓ Postmark integration: letter delivery to officials
  ✓ Delivery agent: route, log status in officials directory
  ✓ Postmark bounce webhook → flag official record
  ✓ User confirmation email on delivery
  ✓ GET /user/deliveries: delivery status

WEEK 7 — Frontend (launch pages only)
  ✓ /: Homepage
  ✓ /start: keyword Discovery search + submission form
  ✓ /start/preview: research results, letter preview, Stripe Checkout
  ✓ /campaigns/[slug]: read-only published campaign page
  ✓ /dashboard: campaigns + delivery status
  ✓ Clerk auth UI
  ✓ /privacy + /terms pages

WEEK 8 — Hardening + Soft Launch
  ✓ End-to-end test: real submission → real payment → real email delivered
  ✓ Rate limiting on submission endpoints
  ✓ Basic error alerting (failed job notifications)
  ✓ Treasury: Mercury card charge logging via webhook
  ✓ robots.txt, meta tags, canonical URLs, basic sitemap
  ✓ Soft launch: 5–10 beta users, single metro area
```

### Phase 2 — Public Pages + SEO Hardening (4–6 weeks)

```
Week 9–10: Public Publishing Hardening
  ✓ Optional-public flow tightened: private by default, public only by explicit user choice
  ✓ Better campaign page templates and metadata
  ✓ Public reply-summary sharing controls
  ✓ Read-only campaign indexing rules refined

Week 11–12: SEO Engine
  ✓ Regulation reference page auto-generation (byproduct of research)
  ✓ Official profile pages (small curated set, not bulk-seeded nation-wide)
  ✓ Schema.org structured data on all page types
  ✓ Sitemap automation + Google Search Console submission
  ✓ Content freshness daily job
```

### Phase 3 — Optional Channel Expansion (only if Phase 1 is working)

```
  ✓ Certified mail integration for officials without reliable email paths
  ✓ Expanded official profile coverage
  ✓ Stronger delivery analytics and reply parsing
  ✓ Operator tooling for manual resend and exception handling
```

### Phase 4 — Future Experiments (only after product-market proof)

```
  Community features if distribution requires them
  Search-before-create if duplicate campaign volume is real
  Coalition mechanics only if there is demonstrated multi-campaign overlap
  HOA / nonprofit API
  Spanish language support
  Managed PostgreSQL migration when volume demands
```

> **Status of v2.1 phases:** Phases 1–4 above shipped 2026-04-25 (commit `5e30dbe`). The shipped foundation — agent engine, officials lookup, drafter, Postmark delivery, treasury ledger, admin tooling, legal pages — is **reused** for v3. v3 adds Phases 5–8 on top.

---

### Phase 5 — Cause Board MVP (v3, 6–8 weeks)

**Goal:** Anyone can create a cause, see it on the public board, sign it (anonymous or named), and have it pass content moderation before publish. No money flows yet. Cause body, AI-drafted petition + letter, signatures, share metadata.

**Depends on:** Phases 1–4 (shipped foundation).

```
WEEK 1 — Schema (5a)
  ✓ Prisma models: Cause, Signature (additive migration — see §16.1)
  ✓ Cause moderation tier extension (cause_political_classifier, cause_names_individual)
  ✓ Append-only enforcement preserved for new tables that need it

WEEK 2 — API (5b)
  ✓ POST /causes (create draft), POST /causes/:id/publish (after moderation)
  ✓ POST /causes/:id/signatures (anonymous + named)
  ✓ Cause moderation pipeline (reuse Phase 2 MODR + new tier)
  ✓ Officials snapshot at publish; jurisdictions inferred from cause ZIP
  ✓ Cause search/list (chronological + funding-velocity weight; deferred to 8a if too rich)

WEEK 3 — Drafter extension
  ✓ Drafter agent emits {petitionMarkdown, letterMarkdown, postcardCopy}
  ✓ Per-channel copy variants stored on Cause at draft time

WEEK 4 — Frontend (5c)
  ✓ /causes (public board)
  ✓ /causes/[slug] (read-only public cause page; signature CTA; share buttons)
  ✓ /causes/new (cause creation wizard; reuse /submit shape)
  ✓ /causes/[slug]/sign (signature flow)

WEEK 5 — Admin (5d)
  ✓ /admin/causes (cause moderation queue with new tier)
  ✓ Cause approve/reject/edit (operator workflow)
  ✓ /admin/causes/[slug]/disclosure (paid-influence disclosure preview)

WEEK 6 — Hardening + Soft Launch
  ✓ End-to-end: cause created → moderated → published → signed
  ✓ Paid-influence disclosure surface live on /causes/[slug] (skeleton; no $ yet)
  ✓ Rate-limit cause creation per user / per IP
  ✓ Sitemap + OG metadata on cause pages
```

### Phase 6 — Crowdfunding & Escrow (v3, 5–7 weeks)

**Goal:** Contributors can pay into a cause via Stripe Checkout (platform-owns-funds), contributions accumulate, threshold-met detection fires; funds remain in escrow until threshold OR cause expiry.

**Depends on:** Phase 5.

```
WEEK 1 — Schema (6a)
  ✓ Prisma models: Contribution, RefundEvent (additive)
  ✓ ledger_entries gets cause_id column + new entry_type values (§12.12)
  ✓ HMAC checksum coverage on new rows

WEEK 2 — Stripe Connect contribute flow (6b)
  ✓ POST /causes/:id/contribute (Stripe Checkout session; platform-owns-funds)
  ✓ Stripe webhook handler: payment_intent.succeeded → Contribution + ledger entry
  ✓ Stripe AUP review for political/advocacy at platform level
    [NEEDS VENDOR-TOS VERIFICATION 2026-06] — blocker
  ✓ Min contribution + suggested defaults + custom amount
  ✓ Per-cause contribution cap (default $200/contributor; configurable; §11.2)

WEEK 3 — Threshold tracking + escrow (6c)
  ✓ Treasury Agent extension: cause escrow ledger
  ✓ Threshold check on each contribution
  ✓ Refund-on-failure scheduled job (cause expiry → mass refund)
  ✓ Refund-on-withdrawal handler (cause withdrawn → mass refund)
  ✓ Refund-on-moderation-rejection handler

WEEK 4 — Contribute UX (6d)
  ✓ /causes/[slug]/contribute (Stripe Checkout redirect)
  ✓ Progress bar (raised / goal)
  ✓ Refund-disclosure copy [NEEDS HUMAN/LEGAL REVIEW]
  ✓ Contributor email confirmation on success
  ✓ Contributor email on threshold-met / threshold-failed / refund

WEEK 5 — Hardening + Soft Launch
  ✓ End-to-end: cause → 3+ contributors → threshold met (no dispatch yet, just transition)
  ✓ End-to-end (refund path): cause → contributions → expiry → all refunded
  ✓ Per-cause chargeback monitor (>1% pause + operator review)
```

### Phase 7 — Threshold-Triggered Multi-Channel Dispatch (v3, 6–8 weeks)

**Goal:** When a cause hits its funding threshold, dispatch fires automatically. Letters/postcards go via Lob; emails go via Postmark. Per-mailing tracking, bounce handling, partial-refund on partial-failure, full-refund on total-failure.

**Depends on:** Phase 6.

```
WEEK 1 — Lob integration (7a)
  ✓ apps/api/src/lib/mail/lob.ts (postcards + letters)
  ✓ Lob webhook handler (USPS delivery scan)
  ✓ Lob acceptable-use confirmation for advocacy mail
    [NEEDS VENDOR-TOS VERIFICATION 2026-06] — blocker
  ✓ Per-official mailing-address verification before Lob send

WEEK 2 — Delivery agent channel split (7b)
  ✓ Refactor agents/delivery.ts into channel handlers (postmark/lob)
  ✓ Mailing table: per-official per-channel row
  ✓ Per-cause per-official-cap-per-window throttle (default 2/30d; §13.2)
  ✓ Bulk-email decision-flag plumbing (default Postmark; alternate routes wired but off)

WEEK 3 — Threshold-triggered dispatch (7c)
  ✓ Engine state-machine extension (§23.3): funding → threshold_met → dispatching → dispatched
  ✓ threshold_failed → refunding → refunded transition
  ✓ Per-cause dispatch worker: drafts (already at publish), then per-channel-per-official send
  ✓ Treasury post-dispatch: platform_fee + per-vendor expense ledger entries

WEEK 4 — Mailer copy variants (7d)
  ✓ Drafter extension: postcard copy (250 char), letter copy (1 page), mailer body (full)
  ✓ AI disclosure on physical pieces (LETR-02 + Cal. AI law extends to mail)
  ✓ Per-channel content moderation pass (reuse MODR pipeline)

WEEK 5 — Partial-failure + refund mechanics
  ✓ Proportional refund on partial dispatch failure (§12.13)
  ✓ Per-official skip-reason logging
  ✓ Operator dashboard: per-cause dispatch report

WEEK 6 — Hardening + Soft Launch
  ✓ End-to-end: cause → contributions → threshold → multi-channel dispatch → confirmed delivery
  ✓ End-to-end (partial fail): same as above with 1+ official bouncing → proportional refund
  ✓ Lob spend reconciliation against ledger
```

### Phase 8 — SEO/Share Surface + Cause-Author Dashboard (v3, 4–6 weeks)

**Goal:** Every cause is an indexable + shareable SEO surface; cause authors have a dashboard to track their causes; admin tooling for cause-moderation queue + paid-influence disclosure auditing.

**Depends on:** Phase 5 (UI bones); Phase 7 (dispatch results).

```
WEEK 1 — SEO surface (8a)
  ✓ Cause page OG metadata + Twitter card + Schema.org (GovernmentAction, Article)
  ✓ Per-cause share counters
  ✓ /sitemap.xml + Google Search Console submission

WEEK 2 — Cause-author dashboard
  ✓ /dashboard/causes (cause-author view of all their causes + status)
  ✓ Per-cause: signers, contributors, funding progress, dispatch report

WEEK 3 — Admin tooling (8b)
  ✓ /admin/causes/moderation (extended queue)
  ✓ /admin/disclosures (audit of paid-influence disclosures across causes)

WEEK 4 — Compliance (8c)
  ✓ Political CAN-SPAM variant disclosures wired on causes
    [NEEDS HUMAN/LEGAL REVIEW] — copy
  ✓ Per-jurisdiction lobbying-disclosure trigger logic
    [NEEDS HUMAN/LEGAL REVIEW] — threshold table
  ✓ Per-official cap-per-window enforcement audit
  ✓ Treasury Agent: per-jurisdiction aggregation report for lobbying-disclosure thresholds
```

### Phase 8.x — Future Considerations (v3, deferred)

```
  Cause-comment moderation (still deferred per §10.1)
  Coalition / cause-merge mechanics (still deferred per §21)
  AI reply summarization (pull EHAI-01 forward if reply volume justifies)
  Certified-mail upgrade tier (EDLV-01 carrier addition on top of Lob)
  HOA / nonprofit API (v2.1 deferred — still deferred)
  Spanish language support (v2.1 deferred — still deferred)
```

### 18.x v3 Decomposed Handshake-Issue Table

Each row below maps to one proposed BUILD-handshake issue. Author of the v3 plan does NOT open these issues directly (claim rules forbid direct GitHub issue creation); operator / orchestrator opens them.

| # | Slice | Proposed issue title | Phase | Depends on |
|---|---|---|---|---|
| 5a | Schema | `feat(schema): add Cause/Signature aggregates + Prisma migrations` | 5 | shipped Phase 1 |
| 5b | API | `feat(api): cause CRUD + signature endpoints + cause moderation tier` | 5 | 5a |
| 5c | Web | `feat(web): /causes public board + /causes/[slug] + /causes/new` | 5 | 5b |
| 5d | Moderation | `feat(mod): political-influence + named-individual review tier extension` | 5 | 5b |
| 6a | Schema | `feat(schema): Contribution + RefundEvent + ledger_entries.cause_id` | 6 | 5a |
| 6b | API | `feat(api): Stripe Connect (platform-owns-funds) contribute flow + application_fee + webhooks` | 6 | 6a |
| 6c | Worker | `feat(treasury): contribution ledger + threshold tracking + refund state machine` | 6 | 6b |
| 6d | Web | `feat(web): /causes/[slug]/contribute UX + progress bar + refund-disclosure copy` | 6 | 6b |
| 7a | Lib | `feat(lib/mail): Lob integration (postcards/letters) + delivery-webhook handler` | 7 | 6c |
| 7b | Worker | `feat(delivery): split into channel handlers (postmark/lob); add bulk-email decision flag` | 7 | 7a |
| 7c | Engine | `feat(engine): state-machine extension (cause_open→funding→threshold_met→dispatching→dispatched→closed; threshold_failed→refunding→refunded)` | 7 | 6c, 7b |
| 7d | Drafter | `feat(drafter): emit petition + letter + postcard + mailer copy variants` | 7 | 7c |
| 8a | Web | `feat(web): cause-author dashboard + share counters + OG metadata + sitemap` | 8 | 5c |
| 8b | Admin | `feat(admin): cause-moderation queue + paid-influence disclosure surface` | 8 | 5d |
| 8c | Compliance | `feat(compliance): political CAN-SPAM variant + per-jurisdiction lobbying-disclosure trigger logic + per-official cap-per-window` | 8 | 7c |

Cross-cutting dependencies that BUILD issues MUST satisfy:
- All v3 issues MUST keep §24 guardrails intact and add `[NEEDS HUMAN/LEGAL REVIEW]` flags where the slice touches them.
- All v3 issues MUST preserve the v2.1 single-buyer path (Phases 1–4 shipped) — non-regression.
- All v3 issues MUST extend tests; new test files (`tests/causes.test.ts`, `tests/signatures.test.ts`, `tests/contributions.test.ts`, `tests/threshold-engine.test.ts`, `tests/lob-delivery.test.ts`) and extensions to `tests/{payment,delivery,treasury}.test.ts`.

---

## 19. Revenue Projections & Unit Economics

### 19.1 Unit Economics Per Transaction

```
AMPLIFY PACKAGE ($15):
  Token cost (research + 5 drafts):    ~$0.35
  Email delivery (5 × Postmark):       ~$0.005
  Stripe fee (2.9% + $0.30):           ~$0.74
  Hosting allocated:                   ~$0.10
  Total COGS:                          ~$1.20
  Net revenue after Stripe:           ~$14.26
  Gross margin:                        ~$13.80  (92%)

COMPLEX PACKAGE ($25):
  Token cost (research + 10 drafts):   ~$0.75
  Email delivery (10 × Postmark):      ~$0.01
  Stripe fee:                          ~$1.03
  Hosting allocated:                   ~$0.15
  Total COGS:                          ~$1.94
  Net revenue after Stripe:           ~$23.97
  Gross margin:                        ~$23.06  (92%)
```

### 19.2 Revenue Scenarios

```
MONTH 3 (post-launch, pre-SEO):
  50 submissions × $15 avg    = $750

MONTH 6 (SEO traffic beginning):
  120 submissions × $16       = $1,920

MONTH 12 (SEO traction):
  400 submissions × $18       = $7,200

MONTH 24 (SEO authority):
  1,200 submissions × $20     = $24,000
```

### 19.3 Break-Even Analysis

```
Phase 1 fixed costs:  ~$200/mo
Variable COGS:         ~8% of revenue (token + email delivery costs)
Stripe fees:           ~4% of revenue
Break-even MRR:        ~$340/mo  (≈ 25 Amplify submissions/month)
Target:                Achieve break-even by Month 2–3
```

### 19.4 v3 Unit Economics — Per Cause (illustrative; not committed numbers)

```
SMALL CAUSE (5 officials, postcard + email, 10 contributors @ $5 = $50 raised)
  Vendor cost (Lob postcard × 5 @ $0.75):  $3.75
  Vendor cost (Postmark email × 5):        $0.005
  AI drafting (one cause, one set):        ~$0.15
  Stripe fees (10 contributions):          ~$3.20  (2.9% + $0.30 × 10)
  Hosting allocated:                       ~$0.10
  Total COGS:                              ~$7.21
  Platform fee @ 10%:                      ~$5.00  (taken at dispatch)
  Net to platform:                         ~$5.00 - $0.10 hosting alloc = ~$4.90
  → marginal vendor spend ratio: ~$7.10 vendor / $50 raised = 14%
  → platform-fee target: cover hosting + AI fixed + per-cause overhead

MEDIUM CAUSE (8 officials, postcard + email, 30 contributors @ $10 avg = $300 raised)
  Vendor cost (Lob postcard × 8 @ $0.75):  $6.00
  Vendor cost (Postmark email × 8):        ~$0.01
  AI drafting:                             ~$0.20
  Stripe fees (30 contributions):          ~$9.60
  Hosting allocated:                       ~$0.10
  Total COGS:                              ~$15.91
  Platform fee @ 10%:                      ~$30.00
  Net to platform:                         ~$30.00 - hosting alloc ≈ ~$29.90
  → marginal vendor spend ratio: ~5%

LARGE CAUSE (20 officials, postcard + letter + email, 100 contributors @ $15 = $1,500)
  Vendor cost (Lob letter × 20 @ $1.75):   $35.00
  Vendor cost (Lob postcard × 0; letter only):
  Vendor cost (Postmark email × 20):       ~$0.02
  AI drafting:                             ~$0.40
  Stripe fees (100 contributions):         ~$73.50
  Hosting allocated:                       ~$0.10
  Total COGS:                              ~$109.02
  Platform fee @ 10%:                      ~$150.00
  Net to platform:                         ~$150 - overhead ≈ ~$149
  → marginal vendor spend ratio: ~7%
```

### 19.5 v3 Funding-Goal Floor Logic

Cause publishes only when `funding_goal_cents >= floor` where floor covers:
- vendor cost (per-channel × officials)
- Stripe processing on expected contributor count (estimated from goal/median-contribution)
- platform fee floor

Causes whose author sets a goal too low to dispatch are blocked from publish with a clear error: `"This cause needs at least $X to send to its targeted officials with the platform fee included. Add more goal or remove officials."`

### 19.6 v3 Revenue Scenarios (illustrative)

```
MONTH 3 (post-v3-launch):
  10 causes × $80 avg raised × 10% fee   = $80 platform revenue (v3)
  + v2.1 legacy single-buyer path:         keeps running, ~$750 from baseline

MONTH 6:
  40 causes × $150 avg × 10% fee         = $600 (v3)
  + v2.1 legacy:                            ~$1,920

MONTH 12 (SEO-driven cause discovery + share virality):
  200 causes × $250 avg × 10% fee        = $5,000 (v3)
  + v2.1 legacy:                            ~$7,200
  → total: ~$12,200

MONTH 24:
  800 causes × $400 avg × 10% fee        = $32,000 (v3)
  + v2.1 legacy:                            ~$24,000
  → total: ~$56,000
```

**Honest caveats on the projections:**
- Cause depth (avg raised per cause) is the load-bearing assumption and is unproven; conservative scenario assumes shallow $50–$80 causes
- Lob unit cost `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` — could be ±50% of the modeled rates depending on volume tier
- Refund-on-failure rate is unknown; reserve 1% of revenue against Stripe processing loss
- Platform-fee percentage is recommendation only; final number `[NEEDS HUMAN/LEGAL REVIEW]`

---

## 20. Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14 (App Router) | Web application |
| Styling | Tailwind CSS + shadcn/ui | Component system |
| Auth | Clerk | User authentication |
| Backend API | Express.js (Node.js) | REST API |
| Agent Engine | OpenClaw + Anthropic SDK (Node.js) | AI agent pipeline |
| AI Models | claude-sonnet-4-6 / claude-haiku-4-5 / claude-opus-4-6 | All AI tasks |
| Database | PostgreSQL 16 | Primary data store |
| ORM | Prisma | Type-safe database access |
| Job Queue | BullMQ + Redis | Async agent processing |
| Contact graph | PostgreSQL + Prisma | Officials, campaigns, letters, delivery history |
| Email Delivery | Postmark | Transactional + official letters |
| Payments | Stripe (Checkout) | Customer payments |
| Bank | Mercury | Operating account, vendor cards |
| Treasury | OpenClaw Treasury Agent | Autonomous bookkeeping |
| File Storage | DigitalOcean Spaces | Letter archives, attachments |
| Hosting (backend) | DigitalOcean Droplet | API + agents + CRM + DB |
| Hosting (frontend) | Vercel | Next.js app |
| Containerization | Docker + Docker Compose | Service orchestration |
| CI/CD | GitHub Actions | Deploy on push |
| Process Manager | PM2 | Node.js process management |
| SSL | Let's Encrypt (Certbot) | HTTPS |
| Reverse Proxy | Nginx | Routing + security headers |
| Monitoring | UptimeRobot + DO monitoring | Uptime alerts |
| Analytics | Plausible (privacy-first) | Traffic analytics |
| Testing | Vitest (unit) + Playwright (e2e) | Test suite |

---

## 21. Deferred Search & Coalition Concepts

Search-before-create and coalition mechanics are intentionally deferred.

### 21.1 Why It Is Deferred

- They add substantial product and moderation complexity.
- They are unnecessary to prove whether paid civic letter delivery has demand.
- They create pressure to design for social behavior before the core workflow is stable.

### 21.2 Revisit Conditions

- duplicate campaign volume becomes a real problem
- users explicitly ask for join/merge mechanics
- public campaign activity is high enough to justify search infrastructure
- moderation staffing exists for a more social product surface

---

## 22. Message Framing Standards

### 22.1 Core Commitment

CivicState is not a platform for political combat. It is a tool for specific, outcome-focused constituent communication.

### 22.2 Agent-Enforced Rules

These rules run as the inline Framing Review step within the Drafter agent, before any letter or summary is composed. Hardcoded in the agent system prompt — cannot be overridden by user input.

**NEVER WRITE:**
- Party names used as descriptors or accusations
- Tribal identity labels ("woke", "MAGA", "socialist", "fascist", "extremist")
- Character attacks vs. policy critiques ("corrupt", "incompetent", "criminal" — unless citing an actual verified legal proceeding)
- Emotional escalation language ("outrageous", "disgusting", "evil")
- Absolute claims about intent ("They don't care about us")

**ALWAYS WRITE:**
- Outcome-focused framing: what the community wants to happen
- Constituent relationship framing: voter addressing elected official
- Specific, measurable asks with dates, quantities, locations
- Regulation citations: grounds the ask in law, not opinion
- Respectful professional tone — letter to an official who can help

**REFRAME IF DETECTED — transparent to user:**

The user sees both versions side-by-side:

```
YOUR ORIGINAL TEXT:
  "The mayor doesn't care about our neighborhood"

REVISED FOR EFFECTIVENESS:
  "We are writing to request that Mayor [Name] prioritize
   infrastructure investment in [Neighborhood]..."

Why we changed this: Outcome-focused language gets higher
response rates from officials. Your original text is saved
to your private record.
```

### 22.3 Outcome Clarity Scoring

| Score | Example | Agent Prompt |
|-------|---------|--------------|
| 1–4 | "Someone should fix traffic" | Ask: who, what specifically, by when? |
| 5–7 | "City should fix the roads" | Ask: which street, what type of fix, timeline? |
| 8–10 | "Repave NW 2nd Ave btw 20th–22nd St by Sept 2026 per Ordinance 14-37" | Publish as-is |

Higher-scoring proposals are more likely to convert into effective letters and should be favored in the drafting flow.

### 22.4 Language Standards

| Instead of... | CivicState says... |
|---------------|-------------------|
| "Fight for your rights" | "Advocate for your community" |
| "Take on City Hall" | "Engage your elected officials" |
| "Demand" (aggressive) | "Request" / "Call for" |
| "Win this battle" | "Achieve this outcome" |
| "Sign against X" | "Sign for Y" |
| "Force them to act" | "Encourage action" |
| "Left" / "Right" | Never used |

This is strategic, not cosmetic. Letters framed around outcomes consistently get higher official response rates than letters framed around grievances.

> **v3 note:** all framing standards in §22 apply unchanged to cause body text, petition text, postcard copy, and letter copy. Cause titles and cause body inherit the same agent-enforced rules. Drafter agent applies framing review before persisting any cause-side content.

---

## 23. Crowdfunding & Threshold-Triggered Dispatch Engine (v3)

> **New in v3.0.** This section consolidates the threshold engine, state machine, and dispatch trigger. The state machine itself is an extension of the v2.1 engine in `apps/worker/src/engine/state-machine.ts` — additive, no mutation of existing transitions.

### 23.1 MVP core loop (the v3 user-visible flow)

```
CREATE CAUSE
  Anyone with a Clerk account can create a cause draft
  Cause draft: title, body, desired outcome, ZIP

  ↓ AI drafts petition + per-channel letter/postcard copy
  ↓ Cause moderation pipeline (auto-block / flag / pass; new political-classifier tier)
  ↓ Officials snapshotted (jurisdiction inferred from ZIP via existing officials lookup)
  ↓ Funding goal computed (vendor cost × officials_count + platform-fee floor)

PUBLISH (after moderation passes)
  Cause appears on /causes board + /causes/[slug]
  Status: funding
  threshold_expiry_at = publish_at + 30 days  [configurable; default 30d]

SIGN + SHARE
  Anyone signs (anonymous → email + ZIP; named → Clerk auth)
  Cause page is an SEO + social share surface

FUND
  Contributors pay via Stripe Checkout (platform-owns-funds)
  Each contribution: ledger CONTRIBUTION + escrow_balance += contribution_net
  On each contribution: threshold check

THRESHOLD MET → AUTO-DISPATCH
  Cause status: funding → threshold_met → dispatching
  Per-channel-per-official dispatch enqueued (Postmark email + Lob postcard/letter)
  Per-cause throttle: at most N=2 mailings per official per 30 days (§13.2)
  On dispatch_complete: ledger PLATFORM_FEE + per-vendor EXPENSE rows
  Status: dispatched → closed

THRESHOLD MISSED → AUTO-REFUND
  At threshold_expiry_at, cause status: funding → threshold_failed → refunding
  Treasury Agent enumerates contributions; refunds each via Stripe Refunds API
  Status: refunded → closed
  Platform absorbs Stripe per-transaction loss (§12.13)
```

### 23.2 Why threshold-trigger (vs. continuous send)

- Aligns spend with demonstrated demand (cause must reach minimum support to send)
- Reduces per-official spam (officials only get bulk-pressure when a cause has community backing)
- Reduces refund frequency (vendor cost is committed only after enough money is in escrow)
- Simplifies regulatory posture (single dispatch event with paid-influence disclosure attached, vs. ongoing trickle)

### 23.3 State Machine — additions to `engine/state-machine.ts`

The v2.1 state machine has `submitted → classifying → researching → drafting → payment_pending → paid → delivering → delivered`. v3 ADDS the following cause-side transitions; the legacy v2.1 transitions remain intact for the single-buyer path:

```
v3 cause state machine (in addition to v2.1):

draft
  → under_review     (on submit-for-publish)
  → withdrawn        (cause author withdraws draft)

under_review
  → moderation_rejected
  → funding           (moderation pass → publish)

funding
  → threshold_met    (escrow_balance >= funding_goal)
  → threshold_failed (now >= threshold_expiry_at AND below goal)
  → withdrawn        (cause author withdraws after publish; all contributors refunded)
  → moderation_rejected (rare: post-publish moderation pull)

threshold_met
  → dispatching     (Drafter+Delivery chain enqueued)

dispatching
  → dispatched     (all officials dispatched OR partial)
  → dispatch_failed (no officials dispatchable)

dispatched
  → closed         (terminal)

dispatch_failed
  → refunding      (auto)

threshold_failed
  → refunding      (auto)

refunding
  → refunded       (all contributors refunded)
  → refund_partial (some refunds failed; operator review)

refunded
  → closed         (terminal)

withdrawn
  → refunding      (if had contributions)
  → closed         (if no contributions)

moderation_rejected
  → refunding      (if had contributions; rare)
  → closed         (if no contributions)
```

Every new transition must be added via the existing `canTransition` API (see `apps/worker/src/engine/state-machine.ts:4-14` per MAP §3.2). Invariants:
- No transition skips refund states (`threshold_failed` and `dispatch_failed` MUST flow through `refunding`).
- All ledger rows carry `cause_id` (§16.1) + HMAC checksum (DATA-05) — append-only.
- All transitions logged to `audit_logs` (ADMN-07).

### 23.4 Threshold computation

```
funding_goal_cents = ceiling(
  total_vendor_cost_cents / (1 - platform_fee_pct - effective_stripe_pct)
)

where:
  total_vendor_cost_cents = AI_drafting_cost + officials_count × per_official_cost + fixed_alloc
  platform_fee_pct        = 0.10                       (recommendation; reviewable)
  effective_stripe_pct    = 0.029                      (per contribution)
  per_official_cost       depends on channels selected for that cause
                          = postmark_email_cost (if email)
                          + lob_postcard_cost (if postcard)
                          + lob_letter_cost (if letter)
```

Cause author sees the goal at create-time and is shown a "Why this goal?" link explaining the math.

### 23.5 Milestone Automation

Threshold milestones trigger automatic notifications:
- 50% raised → email all signers + contributors: "Halfway to dispatch on [Cause Title] — share to keep momentum"
- 75% raised → email all signers + contributors: "Close to threshold; one more push"
- 100% raised → email all signers + contributors + cause author: "Threshold met — dispatch in progress"
- threshold_expiry approaching (24h) AND below goal → email all signers + contributors: "Cause expires tomorrow without meeting threshold; share now or your contribution will be refunded"
- refunded → per-contributor email: "Cause did not meet threshold; $X refunded"
- dispatched → per-contributor + per-signer + cause-author email: "Letters/postcards/emails sent to X officials"

### 23.6 BullMQ jobs (v3 additions)

```
QUEUE: cause.publish           → moderation → set status=funding
QUEUE: cause.threshold.check   → triggered by every successful contribution
QUEUE: cause.expiry.scan       → BullMQ repeatable, scans funding causes >= threshold_expiry_at
QUEUE: cause.dispatch          → threshold_met → enqueue per-channel-per-official mailings
QUEUE: cause.refund            → threshold_failed | withdrawn | moderation_rejected
QUEUE: cause.milestone.notify  → 50%/75%/100%/expiry-soon
```

### 23.7 Failure modes + invariants

| Failure | Mitigation |
|---|---|
| Stripe webhook drop during contribution | HMAC-verified webhook + idempotency key + dead-letter queue (reuse Phase 3) |
| Lob outage during dispatch | Per-mailing retry with exponential backoff; if persistent for >24h, partial-refund + operator review |
| Concurrent threshold-met fires double-dispatch | Use Postgres advisory lock on `cause.id` during threshold check + dispatch enqueue; idempotency key on dispatch job |
| Contribution refund fails (Stripe Connect issue) | Mark `refund_failed`; operator reviews; do NOT mark cause `refunded` until all contributions refunded |
| Cause threshold flips during dispatch (impossible by lock, but defensive) | Once `dispatching` state is reached, contributions are accepted but added to a post-dispatch "tip jar" or rejected (decision flag — recommend rejection at v3 launch) |
| Cause hits threshold but officials_count drops to 0 (all opted-out) | Treasury auto-refunds; ledger row REFUND_THRESHOLD with reason `no_dispatchable_officials` |

---

## 24. Regulatory & Moderation Guardrails (v3)

> **New in v3.0 (issue #12).** This section is the launch-gating compliance review for the community-funded board. **Every claim in this section is flagged either `[NEEDS HUMAN/LEGAL REVIEW]` (legal posture) or `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` (vendor acceptable-use). None of them are launch-safe assertions yet.** The recommendation at the end of §24 is **Conditional GO** gated on six guardrails clearing before v3 BUILD slices ship to production.

### 24.1 Pay-to-Influence and Lobbying Disclosure

| Question | v3 posture | Status |
|---|---|---|
| Does pooling contributions to influence official action trigger federal LDA registration? | LDA registration thresholds (compensation + time spent lobbying) are entity-level, not per-cause. Platform is not a registered lobbyist; cause authors are constituents, not paid agents. Conservative posture: **constituent-to-elected-official only**. | `[NEEDS HUMAN/LEGAL REVIEW]` — confirm LDA exemption holds for platform-funded constituent communications |
| Do state lobbying registries (CA, NY, TX, WA, etc.) have per-jurisdiction trigger thresholds we cross at scale? | Yes — most states have dollar-threshold + time-threshold tests. v3 launch posture: per-jurisdiction trigger table (drafted; reviewable). Treasury Agent aggregates per-jurisdiction send-spend monthly; flags when nearing any state's threshold. | `[NEEDS HUMAN/LEGAL REVIEW]` — populate per-state threshold values; confirm aggregation methodology |
| Do platform-fee receipts (revenue) count toward lobbying compensation thresholds? | We argue no — fee is for civic-tech platform services, not lobbying services. | `[NEEDS HUMAN/LEGAL REVIEW]` |

**Mitigation logic (operational):**
- Per-jurisdiction monthly aggregate spend dashboard (admin)
- Auto-alert at 70% of any known state threshold; auto-pause causes targeting that jurisdiction at 90%
- Per-jurisdiction trigger table maintained in `apps/api/src/lib/compliance/lobbying-thresholds.json` `[NEEDS HUMAN/LEGAL REVIEW]` on populated values

### 24.2 Campaign-Finance Exposure

| Question | v3 posture | Status |
|---|---|---|
| Could a cause targeting a candidate-qua-candidate trigger FEC PAC registration? | Yes — pooled funds spent to influence federal elections are independent expenditures. | **Hard policy: causes targeting candidates qua candidates are blocked.** Only constituent-to-elected-official (incumbent-acting-in-office) causes allowed. New moderation tier enforces this. `[NEEDS HUMAN/LEGAL REVIEW]` to confirm classification logic |
| Could state campaign-finance regimes trigger similar exposure? | Yes — most states mirror FEC rules. Same policy applies state-side. | Same as above |
| What about causes targeting an incumbent on a clearly political issue? | Allowed if framing is policy-action, not election-influence. Drafter framing rules (§22) enforce policy-action posture. | `[NEEDS HUMAN/LEGAL REVIEW]` on edge cases |

**Mitigation logic:**
- New cause moderation tier: `political_classifier` — Haiku 4.5 classifier distinguishes "asking incumbent X to do Y in office" (allow) from "asking voters to defeat candidate X" (block)
- Hard block if the cause body mentions election outcomes, voting against the official, or campaign donations
- Operator review at >70% confidence on either branch

### 24.3 CAN-SPAM and Bulk-Email Compliance

| Question | v3 posture | Status |
|---|---|---|
| Are v3 cause-related emails (milestone notifications, threshold-met emails, dispatched emails to signers/contributors) commercial under CAN-SPAM? | Treat as commercial (v2.1 keeps the same safe-floor classification; v3 inherits). Cost of compliance trivial; cost of misclassification potentially $51k/violation. | Continue v2.1 LGAL-03 compliance |
| Are physical-piece (Lob) sends to officials subject to CAN-SPAM? | No — CAN-SPAM is email-specific. Physical mail has separate vendor + bulk-mail regulations. | — |
| Is the political-content email classification different (political CAN-SPAM variant)? | Some states (CA, WA) have stricter rules on political email. v3 adds a political-disclosure variant to milestone/dispatched emails when the cause is classified political. | `[NEEDS HUMAN/LEGAL REVIEW]` — populate state-specific disclosure copy |

**Mitigation logic:**
- Reuse v2.1 LGAL-03 CAN-SPAM compliance for all cause-related emails
- Add political-CAN-SPAM-variant template (additional disclosure block) for causes classified political by §24.2 classifier
- Suppression list scope: all suppressions (DLVR-07 + opt-outs) apply across both v2.1 and v3 paths

### 24.4 Vendor Acceptable-Use — Stripe Connect

| Question | v3 posture | Status |
|---|---|---|
| Does Stripe Connect AUP permit political/advocacy crowdfunding? | Stripe's general AUP permits political/advocacy if certain disclosures and KYC are in place; platform-owns-funds reduces but does not eliminate exposure (platform is the merchant of record for political/advocacy contributions). | `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` — required before Phase 6 ships |
| If Stripe pauses our payouts, does the platform have runway? | Yes — Mercury reserve covers ~90 days of vendor cost at v2.1 burn (§12.10). v3 vendor cost grows with cause volume; reserve must scale. | Treasury monitor: reserve ≥ 90d projected vendor cost |
| Could a single problematic cause trigger Stripe AUP review for the whole platform? | Yes, especially if reported by a target official. | Per-cause auto-pause on report; operator review within 24h |

**Pre-launch gate:** explicit Stripe AUP confirmation for political/advocacy at the platform-merchant level. Without this, Phase 6 does not ship.

### 24.5 Vendor Acceptable-Use — Lob

| Question | v3 posture | Status |
|---|---|---|
| Does Lob's TOS permit advocacy / political mail at our volume? | Lob explicitly serves civic-tech and political-mail customers, but with volume tiers and acceptable-use checks at registration. | `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` — required before Phase 7 ships |
| Does the FTC or USPS regulate political postcards differently from commercial postcards? | Bulk political mail has different USPS rate tiers; v3 launch uses Lob's standard rates, not bulk-political rates. | `[NEEDS HUMAN/LEGAL REVIEW]` on rate-tier choice |
| Lob fallback if their AUP review rejects a piece? | No automated fallback in v3 (per §13.3) — operator review required. | Documented |

**Pre-launch gate:** explicit Lob AUP confirmation for advocacy mail.

### 24.6 Vendor Acceptable-Use — Bulk Email

| Question | v3 posture | Status |
|---|---|---|
| Does Postmark AUP permit political-bulk to officials? | Postmark already wired for v2.1 (commercial classification); v3 keeps Postmark per-letter rather than bulk to avoid AUP risk. | `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` if v3 adds bulk-political sends |
| When might v3 need Resend or SES? | If per-cause email volume crosses Postmark's per-second/per-day thresholds at the per-letter pattern; project not before Phase 8. | Decision-flag plumbing in place; alternate route OFF at launch |

### 24.7 Official Bulk-Contact Policy + Per-Official Throttle

| Question | v3 posture | Status |
|---|---|---|
| Do chambers / agencies block or filter aggregated submissions? | Yes — some chambers filter or block bulk-pattern emails. v2.1 per-domain bounce ≥10% pause already mitigates. | Continue v2.1 throttle |
| Do we need per-official cap-per-window? | Yes — v3 increases volume materially. New per-official cap-per-window: default N=2 mailings / M=30 days (configurable). | Implemented in §13.2 routing logic |
| What about Lob deliverability at scale to government addresses? | Lob's USPS delivery uses standard USPS; government addresses are normal addresses. No bulk-specific blocking expected. | `[NEEDS VENDOR-TOS VERIFICATION 2026-06]` |

### 24.8 Anonymous Signers / Contributor KYC

| Question | v3 posture | Status |
|---|---|---|
| Should signers be anonymous-allowed? | Yes — v3 launch allows anonymous signers; named signers visible on co-signer list require Clerk. | Implemented in §10.3 |
| Should contributors be anonymous-allowed? | Stripe collects email + name on Checkout; "anonymous on cause page" but not anonymous to platform. | Implemented in §16.1 |
| Per-contributor cap for KYC purposes? | Default $200/contributor/cause at launch; KYC under Stripe's standard ID-verification thresholds beyond that. | `[NEEDS HUMAN/LEGAL REVIEW]` on cap |
| Sybil resistance? | Per-email dedup on signatures; per-IP soft cap; Stripe-side fraud on contributions. | Implemented in §10.3 + §16.1 |

### 24.9 Defamation / Named-Individual Risk

| Question | v3 posture | Status |
|---|---|---|
| Can a cause name a private individual (e.g., "Investigate [Private Citizen] for [Allegation]")? | **No.** Mandatory pre-publish review for ANY cause naming an individual. If the named party is a private citizen, block. If public official (acting in office), allow with operator review. | Implemented as new moderation tier in §10.2 |
| Can a cause cite alleged misconduct of a public official? | Yes, but operator-reviewed pre-publish (extension of MODR-02). | Implemented |
| Platform §230 protection for user-authored causes? | §230 likely applies, but the platform is acting on causes (drafting + dispatching), reducing pure-conduit posture. | `[NEEDS HUMAN/LEGAL REVIEW]` — most important defamation question |

### 24.10 Refund-on-Failure Mechanics

Refund mechanics specified in §12.13. v3-specific compliance considerations:
- Refund disclosure copy required on every contribution UX surface `[NEEDS HUMAN/LEGAL REVIEW]`
- "Platform absorbs Stripe processing loss on refunds" policy disclosure required
- Per-state consumer-protection law on conditional fundraising `[NEEDS HUMAN/LEGAL REVIEW]`

### 24.11 Pre-Launch Guardrails (the go/no-go gate)

**Recommendation: Conditional GO on v3 thesis.** The community-funded board is consistent with the v2.1 codebase, leverages existing infrastructure, and addresses Robertson's expanded vision. **However, the following six guardrails MUST clear before v3 BUILD slices ship to production:**

1. **Legal review of lobbying / campaign-finance trigger logic.** Per-state lobbying-disclosure threshold table populated and confirmed; FEC + state campaign-finance classification of "incumbent-acting-in-office vs candidate-qua-candidate" confirmed. `[NEEDS HUMAN/LEGAL REVIEW]`
2. **Vendor AUP confirmation:** Stripe Connect (political/advocacy at platform-merchant level) AND Lob (advocacy mail acceptable-use) AND chosen bulk-email provider (only if not Postmark per-letter). All three `[NEEDS VENDOR-TOS VERIFICATION 2026-06]`. Gating for Phase 6/7 respectively.
3. **Platform-owns-funds posture implemented:** no per-creator Connect onboarding; platform is merchant of record. Implemented per §12.12.
4. **Constituent-to-elected-official policy enforced:** new cause moderation tier (political_classifier) live; hard-block on candidate targeting. Implemented per §10.2 + §24.2.
5. **Mandatory pre-publish human review for causes naming individuals:** new moderation tier + admin queue + audit log. Implemented per §10.2 + §24.9.
6. **Per-jurisdiction lobbying-disclosure trigger logic + per-official cap-per-window + political-CAN-SPAM variant disclosures:** Implemented per §13.2 + §24.1 + §24.3.

**Until all six are implemented + reviewed, v3 stays in BUILD-pre-launch, not production-live.**

**Watch-items (not gating but flagged for ongoing review):**
- Per-cause chargeback rate (auto-pause >1%)
- Per-state monthly aggregate spend vs lobbying-disclosure thresholds (auto-pause near 90%)
- Refund-on-failure rate (target <5% of causes; if higher, threshold floor or expiry logic needs adjustment)
- Per-cause partial-dispatch-failure rate (target <10%; if higher, officials-coverage or per-official-cap may need tuning)

---

## Footnote A

### Crowdfunding Adjacency — v2.1 archive; superseded by §23

> **v3 status:** Footnote A is archived. v2.1 excluded crowdfunding as a revenue pillar because no third-party affiliate program (e.g., GoFundMe API) was confirmed. v3 takes a fundamentally different approach: **CivicState is itself the crowdfunding board**, with Stripe Connect (platform-owns-funds posture) carrying the contribution flow. Native crowdfunding inside the platform replaces the v2.1 idea of surfacing external GoFundMe links. See §23 for the active treatment.

#### v2.1 historical text (preserved):

CivicState may in a future phase surface links to relevant crowdfunding campaigns near a user's issue area. This is excluded from the current plan as a revenue pillar because:

1. **No confirmed affiliate program.** GoFundMe's API access is documented as partnership-tier or GoFundMe Pro/NPO access — not a public affiliate integration available to any third-party developer. Any implementation requires formal partnership validation before it can be treated as a revenue stream.

2. **Live data access unconfirmed.** Surfacing relevant active campaigns requires a searchable API against live campaign data, which is not confirmed as publicly available.

**If implemented:** Treat as ancillary discovery only, not a revenue pillar.

---

*Version 3.0 — CivicState.com community-funded civic-action board pivot (issue #12).*
*This document now reflects the v3 thesis: a community-funded board where anyone can post a cause, sign and share, and pool small contributions to fire real multi-channel outbound pressure (mail + email) to government officials. Platform fee on contributions. v2.1 single-buyer paid-letter path preserved as legacy secondary route; nothing shipped in Phases 1–4 is discarded. v3 adds Phases 5–8 (Cause Board MVP → Crowdfunding & Escrow → Threshold-Triggered Dispatch → SEO/Share + Cause-Author Dashboard) on top of the v2.1 foundation. Conditional-GO recommendation in §24, gated on six pre-launch guardrails.*
*Last updated: June 2026 (v3.0 pivot from v2.1 — issue #12).*
