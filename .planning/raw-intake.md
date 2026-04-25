# CivicState.com — Master Build Plan
**Version 2.1 — March 2026**

> **Changelog v2.1:** Further simplified to a thinner CivicState v1. Removed subscriptions from the active plan. Defaulted launch delivery to email only. Demoted community interaction, coalition features, certified mail, and automated follow-up loops to future considerations. Publication is opt-in and read-only.

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

[Footnote A — Crowdfunding Adjacency (Future Consideration)](#footnote-a)

---

## 1. Executive Summary

CivicState.com is a civic technology platform that helps ordinary citizens write researched, cited, professionally-drafted letters and petitions to local, state, and federal government officials about policy issues, enforcement failures, and legislative demands.

The platform is powered by an **OpenClaw agent instance** running on a **DigitalOcean droplet**, operating 24/7 with the **Anthropic API** (org-level key, usage-based billing) as its AI backbone. A simple **PostgreSQL contact graph** manages officials, campaigns, letters, and delivery history in launch scope. **Stripe + Mercury Bank** handle all payments and vendor costs autonomously.

The business model rests on two practical pillars:

1. **Transactional revenue** — one-time paid letter packages, dynamically priced to always cover token + delivery costs at a 40% net margin minimum
2. **SEO organic traffic** — some paid submissions become opt-in public records, creating searchable civic reference content as a byproduct of the core job

The platform is designed for a lean operator, not a zero-human company. OpenClaw handles research, drafting, pricing, delivery, and bookkeeping, while a human reviews flagged submissions, monitors failures, and handles operational exceptions.

**What this platform is:** A constituent communication tool. Citizens tell it what they want their government to do. It researches the applicable law, identifies the right officials, drafts a professional letter, sends it, and optionally publishes a read-only campaign record.

**What this platform is not:** A legal advice service. A claim filing service. A lobbying firm. A community social network at launch. All letters are constituent communications from a voter to an elected official or agency — not legal demands, regulatory filings, or claim submissions.

---

## 2. Business Model

### 2.1 Value Proposition

**For citizens:** Your voice, amplified. A single form submission becomes a researched, multi-recipient, properly cited letter campaign — for less than the cost of lunch.

**For communities:** A growing, searchable public record of what residents are asking their government to do — without needing a full social layer at launch.

**For the business:** A self-replenishing SEO content engine where every user action generates indexable, high-quality, long-tail public content at near-zero marginal cost.

### 2.2 Revenue Streams

| Stream | Description | Target Margin |
|--------|-------------|--------------|
| Letter packages | One-time sends ($5–$25) | ~88–92% |
| Priority complex review | Higher-touch human-reviewed sends | ~75–85% |
| API access | Third-party integrations — HOAs, nonprofits (future) | ~90% |

> Crowdfunding adjacency is excluded from the active plan. See Footnote A.

**Payment platform:** Stripe for customer payments. Mercury Bank as operating account. OpenClaw Treasury Agent manages both autonomously via API.

### 2.3 Pricing Philosophy

Every job must be cost-positive. The Pricer agent calculates per-job token cost before presenting any package to a user. No job executes at a loss. Minimum floor: 40% net margin after Stripe fees.

### 2.4 Competitive Positioning

| Competitor | What They Do | Our Differentiation |
|------------|-------------|-------------------|
| Resistbot | SMS letters to lawmakers | Research-backed, cited, higher-context drafting |
| Change.org | Petition hosting | We send actual letters and research the targets |
| LegalZoom | Document drafting | 10x cheaper, civic-specific, community-amplified |
| Manual contact | Direct constituent outreach | We do the research, drafting, routing, and delivery |

---

## 3. Platform Architecture Overview

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

## 10. Community Layer — Deferred Until Core Loop Proves Itself

Community interaction is intentionally out of the active build plan. Launch pages are read-only public records, not miniature social networks.

### 10.1 Community Features

| Feature | Status | Notes |
|---------|--------|-------|
| Read-only public campaign pages | In plan | Opt-in only |
| Votes | Deferred | Not required to validate demand |
| Comments | Deferred | Adds moderation burden too early |
| Co-sign / join mechanics | Deferred | Adds spam and pricing complexity |
| Community feed | Deferred | Not needed for initial distribution |
| Coalition display | Deferred | Out of active build plan |

### 10.2 Moderation Rules

For launch, moderation is limited to submission text and optional public page content:

- Auto-block obvious profanity, threats, harassment, or personal attacks
- Flag named misconduct allegations, unverifiable factual claims, and defamation risk for human review
- Do not accept public comments in launch scope

### 10.3 Voting & Co-Signing Mechanics

Not in the active plan.

### 10.4 Community Feed Algorithm

Not in the active plan.

### 10.5 Milestone Automation

Not in the active plan.

---

## 11. Pricing Engine

### 11.1 Dynamic Pricing Logic

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

### 11.2 Package Pricing Tiers

| Tier | Floor Price | Typical COGS | Use Case |
|------|------------|-------------|----------|
| Starter | $5 | $0.60–$1.50 | 1 letter, simple local issue |
| Amplify | $15 | $2–$5 | 5 letters, city/county issue |
| Complex | $25 | $5–$10 | 10 letters, multi-jurisdictional + human review |

### 11.3 Pricing Display UX

```
YOUR CAMPAIGN:
  ✓ 3 jurisdiction levels
  ✓ 2 federal regulations found
  ✓ 1 state statute found
  ✓ 8 officials identified

  STARTER — $5
  Send to most relevant official · Email · Optional public page

  AMPLIFY — $15  ← MOST POPULAR
  Top 5 officials · Email · Optional public page

  COMPLEX — $25
  All 8 officials · Email · Human-reviewed before send

  [Why do these prices vary? →]
```

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

---

## 13. Delivery Stack

### 13.1 Channels

```
EMAIL (launch channel)
  Provider: Postmark
  Cost:     ~$0.001/email
  Tracking: Opens, bounces, replies (inbound webhook)
```

Certified mail, fax, and web portal submission are explicitly deferred until the email-only workflow proves reliable.

### 13.2 Routing Logic

```
FOR EACH OFFICIAL IN TARGET_LIST:
  1. Check internal officials directory for verified email
  2. If email exists: route to Postmark queue
  3. If no email: flag for operator review; do not auto-fallback
  4. Log delivery intent in PostgreSQL officials history
  5. Update campaign page or private dashboard: "Sent to [Official] via email"
```

### 13.3 Bounce & Failure Handling

- **Email bounce:** Flag official record; suppress future auto-sends to that address
- **No delivery method:** Notify user within 24h; flag for manual resolution
- All failures logged to dead-letter queue with full job context

### 13.4 Response Tracking

When an official replies:
- Postmark inbound webhook receives reply
- Claude parses reply, generates plain-English summary
- Summary stored in private dashboard by default
- Summary added to public campaign page only if the user opts in
- User notified immediately
- Official record updated (response date, sentiment)
- No automated follow-up letter is queued in launch scope

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

---

## Footnote A

### Crowdfunding Adjacency — Future Consideration Only

CivicState may in a future phase surface links to relevant crowdfunding campaigns near a user's issue area. This is excluded from the current plan as a revenue pillar because:

1. **No confirmed affiliate program.** GoFundMe's API access is documented as partnership-tier or GoFundMe Pro/NPO access — not a public affiliate integration available to any third-party developer. Any implementation requires formal partnership validation before it can be treated as a revenue stream.

2. **Live data access unconfirmed.** Surfacing relevant active campaigns requires a searchable API against live campaign data, which is not confirmed as publicly available.

**If implemented:** Treat as ancillary discovery only, not a revenue pillar.

---

*Version 2.1 — CivicState.com only.*
*This document now reflects a thinner active plan: one-time paid civic letter delivery, email-first delivery, optional read-only publication, and human review for flagged cases.*
*Last updated: March 2026*
