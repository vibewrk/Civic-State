# CivicState EIR Business Plan

**As of:** 2026-06-20 [evidence: worker dispatch date]

## Thesis Current

CivicState is an AI-assisted civic correspondence product: a US resident enters a civic concern and ZIP code, the system researches relevant public authorities, drafts citation-backed letters, takes a one-time payment, and delivers individualized emails to government officials. The strongest investable version is a narrow transactional tool, not a social network, lobbying firm, legal service, or automated political operation. That scope is supported by the repo's product docs and implementation surface. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md), [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)]

The project should remain on the wrk.vc watchlist rather than be pitched as a near-term investible business until the operator confirms this is intended to be a business rather than a personal/research asset, and until market willingness-to-pay, official contact coverage, deliverability, and compliance correctness are validated in production. [evidence: registry note in worker dispatch; assumption: no live customer metrics exist in the repo]

## Ten-Second Snapshot

CivicState sells one-off, citation-backed constituent letters for $5, $15, or $25 per campaign tier. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] The repository contains a broad MVP implementation, but not proof of demand, deliverability, legal safety, or revenue. [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)]

## What Exists Today

- Monorepo apps exist for web, API, worker, and shared Prisma code. [evidence: [package.json](package.json), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts)]
- The data model includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs. [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]
- Submission creation includes moderation, audit logging, and classifier queue enqueueing. [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)]
- Official lookup is designed around federal, state, and local providers and caches non-opted-out officials. [evidence: [apps/api/src/lib/officials/lookup.ts](apps/api/src/lib/officials/lookup.ts)]
- Payment tiers are implemented as $5, $15, and $25 Stripe Checkout options. [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]
- Delivery uses Postmark, per-domain bounce checks, official opt-out checks, and reply-to campaign routing. [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)]
- Compliance pages and deletion/export routes exist, but the export route references fields not present in the Prisma schema, which is a launch blocker. [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]

## Customer Definition

Primary customer: an individual US resident with a specific civic issue who wants a professional constituent communication sent to the relevant public officials but lacks time, confidence, research skill, or official contact knowledge. [assumption: inferred from the product docs; no customer interviews are present]

Non-customers at launch: businesses seeking lobbying support, plaintiffs or claimants seeking legal notices, advocacy organizations needing CRM-scale campaigns, and users trying to harass officials or private individuals. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md)]

Buyer/user identity is the same person at launch: the individual constituent pays for one campaign and tracks its delivery. [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]

## Problem And Urgency

The job is not "write me a letter." The job is "turn an emotional civic concern into a credible, routed, citation-aware constituent communication without becoming a legal matter." That requires issue triage, official targeting, research, tone control, payment, delivery tracking, and compliance. [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [.planning/PROJECT.md](.planning/PROJECT.md)]

The urgency is operator-dependent. There is no workspace evidence of customer pull, paid pilots, organic traffic, or official response rates as of 2026-06-20. [evidence: no analytics, customer, or revenue files found in repo inspection]

## Product Scope

Launch scope should stay narrow:

- Guided issue submission with ZIP code and desired outcome. [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]
- Content moderation before research or delivery. [evidence: [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)]
- Official lookup and suppression for opted-out or problematic recipients. [evidence: [apps/api/src/lib/officials/lookup.ts](apps/api/src/lib/officials/lookup.ts), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)]
- AI research and drafting that only uses retrieved/verifiable citations. [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts), [apps/worker/src/agents/drafter.ts](apps/worker/src/agents/drafter.ts)]
- Stripe payment before delivery. [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)]
- Postmark delivery, delivery status, and raw reply capture. [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)]

Public campaign SEO, organizational APIs, certified mail, fax, automated follow-up, and coalition features remain future options only after the core paid workflow works. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md)]

## Market Sizing

Workspace-only market sizing cannot use external datasets as evidence. The honest sizing method is bottom-up and assumption-led.

Launchable beachhead model:

| Driver | Value | Label |
| --- | ---: | --- |
| Jurisdictions in launch model | 51 state/DC units | [assumption: US geography model, not workspace evidence] |
| Issue clusters per jurisdiction per year | 10 | [assumption: operator planning heuristic] |
| Trigger events per issue cluster per year | 20 | [assumption: local/state/federal civic events heuristic] |
| Paid campaigns per trigger event | 20 | [assumption: small paid adoption before proof] |
| Blended campaign price | $15 | [assumption: midpoint of repo pricing tiers; prices are evidence, mix is not] |
| Annual launchable revenue | $3,060,000 | [assumption: 51 x 10 x 20 x 20 x $15] |

This is not a TAM claim. It is a testable serviceable obtainable market hypothesis. The investable question is whether a repeatable channel can produce at least 1,000 paid campaigns per month at a $15 blended price without unacceptable complaints, bounces, refunds, or compliance incidents. [assumption: validation threshold chosen for small SaaS-style proof point]

## Revenue Model

Revenue is transactional. The current repo does not support subscriptions in the active plan. [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]

| Tier | Price | Intended use | Evidence / label |
| --- | ---: | --- | --- |
| Single official | $5 | One official | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Three officials | $15 | Small campaign | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Full spread | $25 | All matched officials | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Minimum operator reserve | $1,500 | Safety reserve | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Mercury warning alert | $2,000 | Treasury threshold | [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)] |
| Mercury emergency alert | $500 | Treasury threshold | [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)] |

Future revenue paths such as organization APIs or higher-touch review are assumptions, not current evidence. [assumption: product expansion logic from existing docs]

## Financial Model

Unit economics must reconcile from price to contribution before this can be pitched.

| Tier | Revenue | Payment fee | AI/delivery cost | Contribution | Margin |
| --- | ---: | ---: | ---: | ---: | ---: |
| Single | $5.00 [evidence] | $0.45 [evidence] | $0.20 [evidence] | $4.35 [assumption: arithmetic] | 87.0% [assumption: arithmetic] |
| Three-pack | $15.00 [evidence] | $0.74 [evidence] | $0.40 [evidence] | $13.86 [assumption: arithmetic] | 92.4% [assumption: arithmetic] |
| Full spread | $25.00 [evidence] | $1.03 [evidence] | $0.60 [evidence] | $23.37 [assumption: arithmetic] | 93.5% [assumption: arithmetic] |

Labels: prices are [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]; fee and cost figures are [evidence: [.planning/phases/03-payment-delivery/03-01-PLAN.md](.planning/phases/03-payment-delivery/03-01-PLAN.md)]; contribution and margin are [assumption: arithmetic from repo planning figures].

Base-case validation model:

| Line | Monthly value | Annualized value | Label |
| --- | ---: | ---: | --- |
| Paid campaigns | 1,000 [assumption] | 12,000 [assumption] | [assumption: validation target, not current traction] |
| Blended price | $15 [assumption] | $15 [assumption] | [assumption: midpoint tier mix] |
| Gross revenue | $15,000 [assumption] | $180,000 [assumption] | [assumption: 1,000 x $15 monthly] |
| Contribution per campaign | $13.86 [assumption] | $13.86 [assumption] | [assumption: three-pack proxy from unit table] |
| Gross contribution | $13,860 [assumption] | $166,320 [assumption] | [assumption: 1,000 x $13.86 monthly] |
| Backend droplet cost | $96 [evidence] | $1,152 [assumption: annualized] | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |

This model excludes salaries, legal review, insurance, data-provider fees, refunds, chargebacks, customer support, and paid acquisition. That exclusion is material. [assumption: no complete operating budget exists in repo]

## Go-To-Market

The practical first channel is issue-specific search and community distribution, not a generic civic app launch. Each campaign category should have a narrow landing/workflow page: housing code enforcement, potholes and street safety, utility shutoffs, school board issues, local permitting delays, public records follow-up, and state agency complaints. [assumption: channel strategy inferred from product shape; not validated]

First validation loop:

- Recruit 25 beta users through operator network and local issue communities. [assumption: low-cost manual validation target]
- Require real payment on at least 10 beta campaigns unless legal/compliance review blocks delivery. [assumption: willingness-to-pay test]
- Measure preview completion, payment conversion, delivery success, bounce rate, refund requests, official complaints, and user repeat intent. [assumption: metrics chosen for this workflow]
- Do not buy paid ads until deliverability and moderation are stable. [assumption: risk control]

## Competition

Named competitors and substitutes:

| Competitor / substitute | Position | CivicState wedge |
| --- | --- | --- |
| Resistbot | Simple message-to-lawmakers workflow | CivicState claims deeper research, citation verification, payment-gated delivery, and dashboard tracking. [assumption: competitor description from model knowledge, not workspace evidence] |
| Change.org | Public petition hosting | CivicState sends individual constituent letters rather than collecting signatures. [assumption: competitor description from model knowledge, not workspace evidence] |
| Quorum / FiscalNote style advocacy platforms | Enterprise advocacy and government affairs tooling | CivicState targets individual consumers at $5-$25 rather than enterprise contracts. [assumption: competitor description from model knowledge, not workspace evidence] |
| VoterVoice / Phone2Action style tools | Organization-led grassroots advocacy | CivicState is consumer-first and transaction-priced. [assumption: competitor description from model knowledge, not workspace evidence] |
| Manual email / phone call | Free direct outreach | CivicState sells research, drafting, routing, and delivery tracking convenience. [evidence: repo value proposition] |
| Lawyers / legal document services | Higher-stakes legal advice or documents | CivicState must stay outside legal advice and filings. [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |

## Risks And Anti-Plan

The skeptical partner case is strong:

- This may be a polished research project, not a company. The registry explicitly flags it as personal/research and not near-term investible unless the operator confirms business intent. [evidence: registry note in worker dispatch]
- The repo name says Brooks History while the code and planning say CivicState. That identity mismatch creates data-room credibility risk and may indicate a misfiled asset. [evidence: worker dispatch, [package.json](package.json), [.planning/PROJECT.md](.planning/PROJECT.md)]
- The product can drift into legal advice, lobbying, spam, harassment, defamation, or unauthorized automated advocacy. The repo documents constraints, but constraints are not legal clearance. [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]
- Official deliverability may kill the model. If government inboxes block or ignore these emails, the customer promise collapses. [assumption: email deliverability risk from product mechanics]
- The official data problem may be expensive or incomplete, especially for local officials. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]
- The compliance code has apparent schema mismatches and therefore cannot be treated as production-ready. [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]
- The economics are incomplete because legal review, insurance, data providers, support, refunds, and chargebacks are not modeled. [assumption: standard operating cost categories absent from repo]
- The top-down civic-tech narrative may sound large while actual willingness-to-pay could be tiny. [assumption: consumer civic-tech monetization risk]

Anti-plan: do not raise on the broad "AI civic engagement platform" story. Do not ship public campaign SEO before paid delivery works. Do not add organizational APIs before individual demand clears. Do not automate follow-up or escalation letters. Do not represent generated citations as legal reliability. Do not call this VC-ready until paid conversion, deliverability, complaint rates, and compliance have real evidence. [assumption: EIR judgment based on diligence]

## Assumption Ledger

| Assumption | Why it matters | Validation |
| --- | --- | --- |
| Users will pay $5-$25 for one campaign. [assumption: repo pricing has no traction evidence] | Core revenue | Run beta with real checkout and track conversion. |
| A $15 blended price is realistic. [assumption: midpoint mix] | Revenue model | Track tier selection across first 100 paid campaigns. |
| Official email delivery can stay above 85% successful delivery. [assumption: threshold from repo planning context, not production data] | Customer promise | Warm domain, instrument Postmark webhooks, monitor by domain. |
| Official contact coverage can be good enough without Google Civic API. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Product completeness | Complete provider spike and coverage tests by ZIP. |
| AI citations can be verified at acceptable latency and cost. [assumption: implementation exists but production distribution unknown] | Trust and legal safety | Record verification pass/fail, latency, and human-review rates. |
| Compliance can be fixed without changing the product promise. [assumption: code-level issue appears fixable] | Launch eligibility | Correct schema mismatches and run compliance tests. |

## Evidence Sources

- [CLAUDE.md](CLAUDE.md) [evidence]
- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence]
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) [evidence]
- [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence]
- [.planning/STATE.md](.planning/STATE.md) [evidence]
- [package.json](package.json) [evidence]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence]
- [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts) [evidence]
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence]
- [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts) [evidence]
- [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts) [evidence]
- [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts) [evidence]
- [apps/worker/src/agents/drafter.ts](apps/worker/src/agents/drafter.ts) [evidence]
- [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts) [evidence]

## Freshness And Dates

- 2026-06-20: this EIR upgrade date. [evidence: worker dispatch date]
- 2026-04-25: planning docs record project initialization and phase activity. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/STATE.md](.planning/STATE.md)]
- 2026-06-12: operator ruling date referenced by wrk.dog adoption note for soul-review merge authority. [evidence: worker brief]

No external market research was performed because this worker was instructed to run workspace-only with no network. All external market claims are therefore labeled assumptions. [evidence: worker dispatch]

## Surprise Spikes

- Dispatch identity says PROJECT: brooks-history and REPO: RPLogic-Inc/brookss-history, but the actual repo content is CivicState. [evidence: worker dispatch, [package.json](package.json)]
- The registry note says personal/research asset and not near-term investible unless operator confirms it should pitch as a business. [evidence: registry note in worker dispatch]
- The root soul files were missing before this upgrade. [evidence: root file inspection]
- Planning artifacts conflict: `.planning/ROADMAP.md` marks all four phases complete, while `.planning/STATE.md` says Phase 1 complete [evidence] and `.planning/REQUIREMENTS.md` leaves many requirements pending. [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/STATE.md](.planning/STATE.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]
- Implementation breadth is real, but launch readiness is not proven because tests/deployment/market data were not part of this workspace-only soul upgrade. [assumption: EIR interpretation of repo evidence]

## Roadmap Alignment

The next roadmap should not add features. It should validate the business-critical path: identity, compliance correctness, official coverage, deliverability, paid beta conversion, and data-room consistency. [assumption: EIR prioritization from risk profile]
