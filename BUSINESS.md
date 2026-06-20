# Business Plan: CivicState / brooks-history Diligence Soul

## Document Status

As of 2026-06-20 [evidence: dispatch current_date], this repository does not support a clean VC-grade "go" decision. The codebase and planning files describe CivicState, a paid constituent-letter platform, while the dispatch identifies the project as `brooks-history` / `RPLogic-Inc/brookss-history` with a registry note that it is a personal/research asset and not near-term investible BOS [evidence: dispatch registry note]. The gate authority note references operator ruling date 2026-06-12 [evidence: dispatch gate rule]. The upgraded thesis is therefore intentionally conditional: treat this as a built civic-tech prototype requiring operator identity validation before it can be pitched as a business.

## Current Thesis

CivicState turns a resident's civic concern into researched, citation-backed letters delivered to government officials for $5, $15, or $25 [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md]. The attractive part is narrow: a user pays once, the platform does official lookup, legal-source research, citation verification, drafting, payment, delivery, and status tracking [evidence: .planning/PROJECT.md; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/worker/src/agents/delivery.ts].

The investible thesis is not "AI civic engagement is big." It is: if residents with specific local problems will pay at least $15 per successful campaign [evidence: MASTER_PLAN.md] and if government email deliverability stays above 85% [assumption: validation gate from .planning/PROJECT.md, not externally verified], the product could become a small profitable civic workflow business. It is not VC-ready until the name/registry mismatch, willingness-to-pay, official contact coverage, and deliverability are proven.

## Surprise Spikes

- Project identity mismatch: dispatch says `brooks-history`, while the repo package is named `civicstate` and the master plan is `CivicState.com` [evidence: package.json; MASTER_PLAN.md; dispatch].
- Registry positioning mismatch: the registry calls this a personal/research asset and not near-term investible BOS [evidence: dispatch registry note], while the repo contains a transactional SaaS-style civic advocacy plan [evidence: MASTER_PLAN.md].
- Planning freshness conflict: `.planning/STATE.md` says only Phase 1 is complete as of 2026-04-25 [evidence: .planning/STATE.md], but `.planning/ROADMAP.md` marks Phase 1 through Phase 4 complete on 2026-04-25 [evidence: .planning/ROADMAP.md]. Treat implementation completeness as unverified until tests and a local end-to-end run are recorded.
- Compliance implementation risk: `apps/api/src/routes/compliance.ts` selects fields such as `tier`, `body`, and `deliveredAt` that do not exist in the Prisma models [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma]. That is a buildability issue, not a market issue.

## What Is Real Today

Real repository assets include a pnpm monorepo [evidence: package.json; pnpm-workspace.yaml], Next.js web app [evidence: apps/web/app/page.tsx], Express API routes for submissions, officials, payments, compliance, campaigns, admin, and webhooks [evidence: apps/api/src/routes], Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma], and BullMQ-style worker agents for classification, research, drafting, delivery, treasury, and reconciliation [evidence: apps/worker/src/agents].

The product is still not proven in market. There is $0 recorded production revenue [evidence: .planning/existing-state.md], no source-backed customer evidence in the repo [evidence: .planning/GENESIS.md says demand is an assumption], and no workspace evidence of live Stripe, Postmark, Clerk, Anthropic, Cicero, BallotReady, OpenStates, congress.gov, or CourtListener production credentials.

## Customer Definition

Primary customer: a US resident with a concrete civic issue, a desired government action, and low confidence that they can identify the right official, cite relevant rules, and write an effective letter unaided [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

The first wedge is not activists, nonprofits, law firms, or lobbying teams. It is an individual constituent with a frustrating, local, specific problem and willingness to spend $5 to $25 to avoid manual research and drafting work [evidence: MASTER_PLAN.md; apps/web/app/page.tsx]. Future API customers such as HOAs and nonprofits are explicitly deferred [evidence: .planning/REQUIREMENTS.md].

## Problem And Product

The user problem is workflow abandonment: the resident knows the issue but lacks jurisdiction research, legal citations, official contacts, formal drafting norms, and delivery tracking [evidence: .planning/GENESIS.md]. CivicState compresses those steps into a guided submission, official lookup, legal research, verified citations, draft preview, Stripe payment, Postmark delivery, and dashboard tracking [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents].

The product must stay inside constituent communications. It must not become legal advice, legal demand letters, regulatory filings, harassment tooling, or bulk lobbying infrastructure [evidence: MASTER_PLAN.md].

## Revenue Model

Current implemented pricing tiers are:

| Tier | Price | Official count | Source |
|---|---:|---:|---|
| Single Official | $5 [evidence: apps/api/src/routes/payments.ts] | 1 [evidence: apps/api/src/routes/payments.ts] | Stripe Checkout session |
| Three Officials | $15 [evidence: apps/api/src/routes/payments.ts] | 3 [evidence: apps/api/src/routes/payments.ts] | Stripe Checkout session |
| All Officials | $25 [evidence: apps/api/src/routes/payments.ts] | all matched officials [evidence: apps/api/src/routes/payments.ts] | Stripe Checkout session |

Revenue is transactional, not subscription-based [evidence: MASTER_PLAN.md]. A higher-touch review package and API access are mentioned as possible future streams, but they are not launch scope [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

## Market Sizing

Workspace-only mode means there is no external research. All market figures below are assumptions, not evidence.

Bottom-up method:

| Segment | Method | Monthly revenue |
|---|---|---:|
| Launch reachable market | 400 paid submissions per month times $18 average revenue per paid submission [assumption: MASTER_PLAN.md scenario, not market evidence] | $7,200 [assumption: arithmetic from scenario] |
| Break-even wedge | 25 paid submissions per month times about $15 average revenue per paid submission [assumption: MASTER_PLAN.md break-even scenario] | about $375 gross receipts [assumption: arithmetic before fixed and variable costs] |
| Niche SEO upside | 1,200 paid submissions per month times $20 average revenue per paid submission [assumption: MASTER_PLAN.md scenario, not market evidence] | $24,000 [assumption: arithmetic from scenario] |

This is not a venture-scale TAM today. The honest market claim is a small cash-flowable wedge if the product can acquire users organically and avoid delivery/compliance failures. Any larger claim would require external source work and live traction.

## Financial Model

The unit economics reconcile only if the model's variable costs stay near the master-plan assumptions and human review is rare.

| Package | Revenue | Token cost | Email cost | Stripe fee | Hosting alloc. | Total cost | Contribution | Margin |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Single | $5.00 [evidence: apps/api/src/routes/payments.ts] | $0.20 [assumption: scaled from MASTER_PLAN.md token-cost examples] | $0.001 [assumption: MASTER_PLAN.md Postmark cost] | $0.45 [assumption: Stripe formula in MASTER_PLAN.md] | $0.10 [assumption: MASTER_PLAN.md hosting allocation] | $0.75 [assumption: arithmetic] | $4.25 [assumption: arithmetic] | 85.1% [assumption: arithmetic] |
| Three-pack | $15.00 [evidence: apps/api/src/routes/payments.ts] | $0.35 [evidence: MASTER_PLAN.md] | $0.005 [evidence: MASTER_PLAN.md] | $0.74 [evidence: MASTER_PLAN.md] | $0.10 [evidence: MASTER_PLAN.md] | $1.20 [evidence: MASTER_PLAN.md] | $13.80 [evidence: MASTER_PLAN.md] | 92.0% [evidence: MASTER_PLAN.md] |
| Full spread | $25.00 [evidence: apps/api/src/routes/payments.ts] | $0.75 [evidence: MASTER_PLAN.md] | $0.01 [evidence: MASTER_PLAN.md] | $1.03 [evidence: MASTER_PLAN.md] | $0.15 [evidence: MASTER_PLAN.md] | $1.94 [evidence: MASTER_PLAN.md] | $23.06 [evidence: MASTER_PLAN.md] | 92.0% [evidence: MASTER_PLAN.md] |

Fixed costs are estimated at about $200 per month [evidence: MASTER_PLAN.md]. Variable COGS are modeled at about 8% of revenue and Stripe fees at about 4% of revenue [evidence: MASTER_PLAN.md]. Break-even is stated as about $340 monthly recurring revenue, or about 25 Amplify submissions per month [evidence: MASTER_PLAN.md]. A $1,500 Mercury reserve is required before accepting payments [evidence: MASTER_PLAN.md].

The biggest missing cost is human review. If even 20% of jobs require 10 minutes of operator time at a $50 per hour loaded cost [assumption: diligence labor model], human review adds about $1.67 per average job [assumption: arithmetic], cutting the three-pack contribution from $13.80 to about $12.13 [assumption: arithmetic].

## Go To Market

The repo's go-to-market hypothesis is SEO-first: opt-in public campaign pages create long-tail civic content, and social sharing is secondary [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. Paid acquisition, app stores, partnerships, subscriptions, and community features are not launch scope [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

Operator validation gates should precede spend:

- Willingness to pay: at least 3% preview-to-paid conversion [assumption: validation threshold from .planning/PROJECT.md].
- Deliverability: at least 85% inbox placement to government domains [assumption: validation threshold from .planning/PROJECT.md].
- Official data coverage: at least 95% federal/state and at least 60% local coverage [assumption: validation threshold from .planning/PROJECT.md].
- Chargeback rate: below 0.5% [evidence: MASTER_PLAN.md].

## Competition

Named competitors and substitutes:

| Competitor | Current positioning | CivicState differentiation | Risk |
|---|---|---|---|
| Resistbot | SMS-based lawmaker contact [assumption: model knowledge, workspace has no source] | Citation-backed research and paid workflow [evidence: MASTER_PLAN.md] | Free or lower-friction substitute could suppress paid conversion |
| Change.org | Petition hosting and signature gathering [assumption: model knowledge, workspace has no source] | Individual letter delivery with official targeting [evidence: MASTER_PLAN.md] | Users may prefer public petition dynamics |
| LegalZoom | Consumer legal document workflows [assumption: model knowledge, workspace has no source] | Civic-specific, lower-priced constituent communication [evidence: MASTER_PLAN.md] | Brand trust and legal-adjacent category ownership |
| Quorum / VoterVoice | Organization-grade advocacy tooling [assumption: model knowledge, workspace has no source] | Individual transactional pricing [evidence: MASTER_PLAN.md] | Could add low-end constituent tools if the wedge proves attractive |
| Manual contact | Resident finds official and writes email directly [evidence: .planning/GENESIS.md] | Saves research, drafting, routing, and tracking time [evidence: .planning/GENESIS.md] | Free substitute remains strong for motivated users |

## Risks And Anti-Plan

The skeptical partner case is straightforward: this may be a well-specified workflow with no paid demand, weak defensibility, and disproportionate legal/compliance downside. Residents angry enough to write officials may use free channels. Residents not motivated enough to write may also not pay $15 [evidence: apps/api/src/routes/payments.ts]. SEO pages may never rank. Government inboxes may filter AI-assisted mass-looking emails. Officials may opt out or complain. A defamatory, threatening, or legally confused letter can create operational risk larger than the fee collected.

The anti-plan: do not raise, hire, or pitch this as venture-backable until identity is resolved, the product runs end-to-end, and a small validation batch proves paid conversion, deliverability, refund/chargeback behavior, and operator review load. If the registry note is correct that this is a personal/research asset [evidence: dispatch registry note], the right path is a research demo or small owner-operated tool, not a VC-backed company.

## Assumption Ledger

| Assumption | Current label | Validation method |
|---|---|---|
| Residents will pay $5 to $25 for letter campaigns [evidence: apps/api/src/routes/payments.ts] | Unproven | Run paid beta and measure preview-to-paid conversion |
| Legal citation retrieval can avoid hallucinations at scale | Unproven [assumption: model risk] | Track verified versus stripped citations in production jobs |
| Email-only delivery is enough for launch | Unproven [assumption: .planning/GENESIS.md] | Measure bounce, spam complaint, and response rates |
| One operator can handle review volume | Unproven [assumption: .planning/GENESIS.md] | Log flagged queue depth and minutes per review |
| SEO can acquire users cheaply | Unproven [assumption: .planning/GENESIS.md] | Publish opt-in pages and measure indexed impressions |
| The repo identity mismatch is administrative, not product drift | Unproven [assumption: dispatch/repo conflict] | Operator ruling required before business pitch |

## Evidence Sources And Freshness

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence] was written as Version 2.1 in March 2026 [evidence: MASTER_PLAN.md].
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence] was last updated 2026-04-25 [evidence: .planning/PROJECT.md].
- [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence] states all four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md].
- [.planning/STATE.md](.planning/STATE.md) states Phase 1 only is complete as of 2026-04-25 [evidence: .planning/STATE.md].
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence] is the current data model inspected on 2026-06-20 [evidence: workspace inspection].
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence] contains implemented Stripe Checkout tiers inspected on 2026-06-20 [evidence: workspace inspection].

Freshness warning: no external market sources were available in workspace-only mode. Every external market, competitor, population, conversion, or deliverability claim is marked as an assumption.

## Operator Decision Required

Before this project appears on wrk.vc as an investible dossier, the operator must decide whether the asset is `brooks-history`, CivicState, or a registry mix-up. If it remains a personal/research asset, the business plan should be presented as a prototype diligence artifact, not as a fundable operating company.
