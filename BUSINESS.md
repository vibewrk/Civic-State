# CivicState Business Plan

## Document State

As of 2026-06-19 [evidence: dispatch current_date], CivicState is a Watchlist/personal research asset, not a near-term investible BOS [evidence: registry note in worker dispatch]. This plan upgrades the project soul for scrutiny, but it does not claim market validation, operator adoption, or investment readiness.

Seed sources: [MASTER_PLAN.md](MASTER_PLAN.md) [evidence], [.planning/PROJECT.md](.planning/PROJECT.md) [evidence], [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence], and current application files including [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence], [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence], and [apps/worker/src/engine/state-machine.ts](apps/worker/src/engine/state-machine.ts) [evidence].

## Executive Snapshot

CivicState turns a resident's civic concern into researched, citation-backed letters routed to relevant public officials. The current monetization surface is transactional: $5, $15, and $25 checkout tiers are implemented in the payment route [evidence: apps/api/src/routes/payments.ts]. The investability thesis is conditional: if residents pay for the full research-drafting-routing loop, if government inbox deliverability holds, and if official targeting data is reliable, CivicState can become a specialized civic action utility. Until those validation gates clear, it remains a research asset [evidence: registry note in worker dispatch].

## Thesis Current

The current thesis is not "AI writes letters." The thesis is that ordinary residents abandon civic action because jurisdiction research, legal references, official targeting, and formal drafting are too much work. CivicState packages that work into a paid workflow with a small set of hard promises: correct recipient targeting, citation-backed drafting, and tracked delivery [evidence: .planning/PROJECT.md].

The build has moved beyond the stale greenfield audit. The repo now contains a Next.js app, Express API routes, BullMQ worker agents, Prisma data models, Stripe Checkout logic, compliance routes, dashboard routes, tests, and delivery/admin surfaces [evidence: apps/, packages/shared/prisma/schema.prisma, tests/]. However, no repo evidence proves live traffic, deployed production infrastructure, paid users, or retained revenue. Revenue is therefore $0 actual as of 2026-06-19 [evidence: .planning/existing-state.md; no production revenue file found in repo].

## Product and Current State

CivicState's current application shape includes authenticated users, submissions, campaigns, officials, letters, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma]. The worker state machine moves jobs from submitted to classifying, researching, drafting, payment_pending, paid, delivering, and delivered [evidence: apps/worker/src/engine/state-machine.ts]. The payment route creates Stripe Checkout sessions after Clerk authentication and records pending payments [evidence: apps/api/src/routes/payments.ts].

Important current constraints:

| Area | Current truth |
|---|---|
| Revenue | $0 actual revenue observed in repo evidence [evidence: .planning/existing-state.md] |
| Pricing | $5 single-official tier, $15 three-official tier, $25 full-spread tier [evidence: apps/api/src/routes/payments.ts] |
| Data rights | Deletion and export routes exist, with a 72-hour deletion SLA stated in code [evidence: apps/api/src/routes/compliance.ts] |
| Security posture | App-level encryption and HMAC-backed append-only audit/ledger intent is represented in schema and SQL helper files [evidence: packages/shared/prisma/schema.prisma; packages/shared/prisma/sql/append_only_rules.sql] |
| Delivery | Postmark-style delivery tracking and bounce/spam fields exist in schema [evidence: packages/shared/prisma/schema.prisma] |

## Customer Definition

The launch customer is a United States resident with a specific civic issue, enough motivation to pay a small single-payment fee, and insufficient time or confidence to research jurisdiction, legal references, and formal letter structure manually [evidence: .planning/GENESIS.md]. Examples include local noise enforcement, potholes, zoning, public school policy, code enforcement, housing habitability, or agency inaction [assumption: examples inferred from MASTER_PLAN.md and common civic complaint categories; not externally verified offline].

The buyer is an individual resident, not an advocacy organization, campaign, law firm, or business entity. Organizational API access, coalition tools, subscriptions, and legal filings are out of launch scope [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

## Problem and Wedge

The wedge is a narrow paid action: "send my issue to the right officials with credible citations." It avoids early community features, recurring billing, legal claim filing, and bulk advocacy tooling because each adds moderation, compliance, or trust risk before demand is proven [evidence: .planning/GENESIS.md].

The practical user promise is minutes instead of hours [assumption: time-savings claim based on product workflow contrast; no time-on-task study in repo]. The operational promise is exception-based human review, with flagged content routed to an admin queue and routine submissions processed by worker agents [evidence: apps/api/src/routes/admin.ts; apps/worker/src/agents/].

## Market Sizing

Workspace-only mode prevents external market research, so this is an assumption-led bottom-up model, not an evidence-backed TAM.

| Layer | Method | Result |
|---|---|---|
| Addressable intent events | Resident civic issues that are specific enough for an official-letter workflow | 500,000 annual paid-intent events [assumption: bottom-up placeholder for United States resident civic issues; no external source available offline] |
| Serviceable launch segment | Search/social reachable users with email-deliverable issues and non-legal requests | 50,000 annual reachable events [assumption: ten percent of assumed addressable intent; no external source available offline] |
| Obtainable early volume | Organic and direct traffic captured by a single-product launch | 5,000 annual paid submissions [assumption: one percent of assumed addressable intent; no external source available offline] |
| Blended launch price | Tier mix weighted toward $15 package [assumption: no observed sales] | $13 per paid submission [assumption: forty percent single, forty percent three-pack, twenty percent full-spread tier mix; no observed sales] |
| Early annual revenue ceiling | 5,000 submissions times $13 blended price [assumption: arithmetic from obtainable volume and blended price] | $65,000 annual gross revenue [assumption: arithmetic from obtainable volume and blended price] |

This is not venture-scale unless the product proves repeatable acquisition, expands into higher-volume civic workflows, or creates organization-facing products after the resident workflow works.

## Revenue Model

CivicState currently has a single-payment transactional revenue model. The implemented pricing tiers are:

| Tier | Scope | Price | Evidence |
|---|---|---:|---|
| Single | One official [evidence: apps/api/src/routes/payments.ts] | $5 | [evidence: apps/api/src/routes/payments.ts] |
| Three-pack | Three officials [evidence: apps/api/src/routes/payments.ts] | $15 | [evidence: apps/api/src/routes/payments.ts] |
| Full-spread | All matched officials | $25 | [evidence: apps/api/src/routes/payments.ts] |

Revenue expansion options are intentionally deferred: subscriptions, API access, public campaign pages, crowdfunding, coalition tools, physical mail, and multilingual workflows are not launch pillars [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

## Financial Figures

The financial model must be treated as planning math until Stripe deposits, ledger entries, and bank reconciliation exist.

| Line | Assumption or evidence | Monthly value |
|---|---|---:|
| Paid submissions | 400 paid submissions per month [assumption: inherited planning scale from .planning/existing-state.md, not observed] | 400 [assumption: same as line item] |
| Tier mix | Forty percent single, forty percent three-pack, twenty percent full-spread [assumption: no sales data] | blended $13 price [assumption: no sales data] |
| Gross revenue | 400 submissions times $13 blended price [assumption: arithmetic from assumptions above] | $5,200 [assumption: arithmetic from assumptions above] |
| Variable AI/delivery cost | $0.40 blended cost per submission [assumption: derived from payment test comments and MASTER_PLAN.md cost ranges; not vendor-verified offline] | $160 [assumption: arithmetic from blended cost] |
| Contribution before fixed costs | $5,200 revenue minus $160 variable cost [assumption: arithmetic] | $5,040 [assumption: arithmetic] |
| Backend hosting | DigitalOcean droplet at about $96 per month [evidence: .planning/PROJECT.md; .planning/existing-state.md] | $96 [evidence: .planning/PROJECT.md; .planning/existing-state.md] |
| Local official data provider | $100 to $500 per month [assumption: inherited from .planning/PROJECT.md; vendor pricing not verified offline] | $100-$500 [assumption: inherited from .planning/PROJECT.md; vendor pricing not verified offline] |
| Reserve capital | $1,500 Mercury reserve [evidence: .planning/PROJECT.md] | $1,500 reserve [evidence: .planning/PROJECT.md] |

Margin pressure is manageable only if the variable cost stays near the test/planning estimate and chargebacks stay below the existing gate of 0.5% [evidence: .planning/PROJECT.md]. The older plan also uses a 40% net margin floor [evidence: .planning/PROJECT.md], while tests assert tier margins greater than 90% before full real-world cost allocation [evidence: tests/payment.test.ts]. Those are planning gates, not achieved operating metrics.

## Go-to-Market

The launch GTM should be validation-first:

- Start with owned/direct distribution and narrow civic issue templates that can be reviewed manually [assumption: pragmatic launch sequencing; no channel data in repo].
- Use public campaign pages and SEO only after consent, moderation, and de-duplication are trustworthy [evidence: .planning/GENESIS.md].
- Measure willingness to pay at a minimum 3% checkout conversion gate [evidence: .planning/PROJECT.md].
- Measure government inbox delivery at a minimum 85% inbox/delivery gate [evidence: .planning/PROJECT.md].
- Measure official coverage at minimum 95% federal/state and 60% local coverage gates [evidence: .planning/PROJECT.md].

Paid acquisition is not justified before conversion, deliverability, and official coverage are proven [assumption: standard early-stage capital discipline; no CAC data exists].

## Competition

Named competitive set in the existing soul:

| Competitor | Position | CivicState angle |
|---|---|---|
| Resistbot | Citizen-to-official messaging utility [assumption: competitive characterization from .planning/PROJECT.md; not externally verified offline] | CivicState aims to add citation-backed research and paid delivery tracking [evidence: .planning/PROJECT.md] |
| Quorum | Enterprise public affairs platform [assumption: competitive characterization from .planning/PROJECT.md; not externally verified offline] | CivicState targets individual residents, not enterprise advocacy teams [evidence: .planning/PROJECT.md] |
| VoterVoice | Enterprise advocacy/grassroots platform [assumption: competitive characterization from .planning/PROJECT.md; not externally verified offline] | CivicState avoids organization tooling at launch [evidence: .planning/PROJECT.md] |
| Manual email/search | Free but effort-heavy substitute [assumption: user behavior claim; no user research in repo] | CivicState sells convenience, structure, routing, and citations |

The plan should not claim a durable moat yet. The moat only becomes plausible after repeated submissions build verified official contacts, response/bounce history, reusable citations, and opt-in public content [evidence: .planning/GENESIS.md].

## Risks and Anti-Plan

A skeptical partner should try to kill this deal on the following grounds:

- The buyer may not exist at the required price. Civic frustration is common, but willingness to pay for letters may be tiny [assumption: market risk; no customer interviews or transactions in repo].
- Government officials may ignore or filter AI-assisted letters, making the delivered outcome feel like performative spam [assumption: delivery and recipient-trust risk; no inbox or response data in repo].
- The legal-adjacent positioning can become dangerous fast: citation errors, bad advice perception, defamation, threats, and sensitive political data create trust and compliance exposure [evidence: moderation/compliance requirements in .planning/PROJECT.md and apps/api/src/routes/admin.ts].
- The product may be too small as a standalone business. A $65,000 early annual gross revenue scenario [assumption: market sizing model above] is useful for a research asset, not a VC outcome.
- The current code appears broad but may still have integration mismatches; for example, compliance export code references fields that do not match the current Prisma schema [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].

Anti-plan: do not raise institutional capital, scale paid acquisition, sell to organizations, or claim civic-tech category leadership until paid conversion, deliverability, official coverage, and legal-review workflows survive real users.

## Assumption Ledger

| Assumption | Why it matters | Validation |
|---|---|---|
| Residents will pay $5-$25 for the full workflow [evidence: implemented price points in apps/api/src/routes/payments.ts; willingness-to-pay remains assumption] | Core revenue model | Run closed beta and measure checkout conversion |
| Email-first delivery is enough [evidence: .planning/GENESIS.md; still assumption] | Avoids physical mail cost and complexity | Track delivery, bounce, spam complaint, and official reply rates |
| Official targeting data can reach 95% federal/state and 60% local coverage [evidence: .planning/PROJECT.md as validation gate] | Product fails if letters go to wrong recipients | Run ZIP coverage audit before public launch |
| AI citations can be verified reliably enough for user trust [evidence: apps/worker/src/lib/legal/citation-verifier.ts] | Differentiator and risk control | Measure citation verification pass rate and human review defects |
| One operator can handle exceptions [evidence: .planning/GENESIS.md] | Determines operating leverage | Measure flagged queue age and daily review time |

## Surprise Spikes

- The older `.planning/existing-state.md` says zero application code existed [evidence: .planning/existing-state.md], but the current repo contains substantial application code and tests [evidence: apps/, packages/, tests/]. The soul must follow current repo truth.
- The registry note says Watchlist/personal research asset, not near-term investible BOS [evidence: worker dispatch]. This contradicts any confident VC-ready pitch.
- The code and plan disagree in places: compliance export selects fields named `tier` and `body`, while the schema uses `pricingTier` and `content` [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma]. Treat launch readiness as unproven.

## Evidence Sources

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence]
- [.planning/GENESIS.md](.planning/GENESIS.md) [evidence]
- [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence]
- [.planning/existing-state.md](.planning/existing-state.md) [evidence, partly stale]
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence]
- [apps/worker/src/engine/state-machine.ts](apps/worker/src/engine/state-machine.ts) [evidence]
- [tests/payment.test.ts](tests/payment.test.ts) [evidence]

## Decision Gate

Recommendation: keep CivicState on Watchlist. The next gate is not "invest" or "scale"; it is operator validation of whether this is meant to become a business at all. If yes, the immediate objective is a small paid beta that proves conversion, deliverability, official coverage, citation correctness, and exception workload with real users.
