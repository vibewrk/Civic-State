# CivicState / brooks-history - Business Plan

Last updated: 2026-06-22 [evidence: dispatch current_date]. Mode: workspace-only, no network [evidence: dispatch brief]. External market claims are treated as assumptions because this run could not use live research [evidence: dispatch brief].

## Thesis

CivicState can become a validation-first paid civic workflow if United States residents will pay for researched, citation-backed letters routed to the right officials; as of 2026-06-22 [evidence: dispatch current_date], the repo supports a product thesis but not an investible business thesis [evidence: package.json; .planning/PROJECT.md; registry note in dispatch brief].

The dispatch project id is `brooks-history`, while the repository product, package name, UI copy, and planning docs all identify the asset as CivicState [evidence: package.json; apps/web/app/page.tsx; .planning/PROJECT.md]. This is a watchlist item until the operator confirms whether this personal/research asset should pitch as a business [evidence: dispatch registry note].

## Problem & Customer

The target customer is a United States resident with a specific civic concern, a desired outcome, and low willingness to manually research jurisdiction, applicable rules, official contacts, formal drafting, and delivery [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

The launch buyer and user are the same person [assumption: transactional consumer workflow inferred from apps/api/src/routes/payments.ts]. Excluded launch customers are legal claimants, users seeking legal advice, threatening or harassment-risk submissions, government officials, enterprise advocacy teams, HOAs, nonprofits, and bulk organization buyers [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts; .planning/REQUIREMENTS.md].

The existing product promise is a flow from issue description and ZIP code to official matching, legal-source research, letter drafting, payment, and delivery [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/worker/src/agents/delivery.ts]. The customer promise remains unvalidated because no production users, traffic, paid conversions, or official replies were found in the workspace [evidence: .planning/existing-state.md; .planning/STATE.md].

## Market

This plan does not claim a researched TAM because network access was unavailable [evidence: dispatch brief]. The market model is a bottom-up validation ladder built from repo pricing and explicit assumptions.

| Layer | Build | Revenue implication | Honesty label |
|---|---:|---:|---|
| Break-even wedge | 25 paid submissions per month | $375 MRR at $15 blended AOV | 25 and $15 are [evidence: .planning/GENESIS.md; apps/api/src/routes/payments.ts]; $375 is [assumption: arithmetic using repo price] |
| Planning break-even note | planned break-even around $340 MRR | close to the wedge above | $340 is [evidence: .planning/GENESIS.md] |
| Month-three scenario | 50 paid submissions per month | $750 monthly revenue at $15 AOV | 50, $750, and $15 are [evidence: MASTER_PLAN.md] |
| Month-six scenario | 120 paid submissions per month | $1,920 monthly revenue at $16 AOV | 120, $1,920, and $16 are [evidence: MASTER_PLAN.md] |
| Month-twelve scenario | 400 paid submissions per month | $7,200 monthly revenue at $18 AOV | 400, $7,200, and $18 are [evidence: MASTER_PLAN.md] |
| Month-twenty-four scenario | 1,200 paid submissions per month | $24,000 monthly revenue at $20 AOV | 1,200, $24,000, and $20 are [evidence: MASTER_PLAN.md] |
| Single-droplet capacity reference | 5,000 submissions per month | $75,000 monthly revenue at $15 AOV | 5,000 is [evidence: .planning/PROJECT.md]; $75,000 is [assumption: capacity times repo price] |

SOM for the next validation cycle is the break-even wedge: 25 paid submissions per month [evidence: .planning/GENESIS.md]. SAM for a bootstrapped small business is the month-twelve internal scenario: 400 paid submissions per month [evidence: MASTER_PLAN.md]. TAM remains unknown until external civic participation, petition, constituent-contact, and consumer legal-tech sources are researched [assumption: workspace-only limitation].

## Product & Moat

Real today: the repo contains a monorepo with Next.js, Express, Prisma, BullMQ workers, Clerk middleware, Stripe Checkout, Postmark delivery hooks, official lookup clients, moderation, citation verification, admin routes, compliance routes, and tests [evidence: package.json; apps/api/src; apps/worker/src; packages/shared/prisma/schema.prisma; tests/payment.test.ts].

Not yet proven today: production deployment, live domain warming, actual government inbox placement, real official data coverage, payment conversion, citation accuracy under production traffic, and operator review workload [evidence: .planning/existing-state.md; .planning/STATE.md; apps/worker/src/lib/legal/ecfr.ts; apps/worker/src/lib/legal/courtlistener.ts].

The moat hypothesis is compounding operational data: official contact quality, bounce history, citation library, and optional public campaign pages [evidence: .planning/GENESIS.md]. That moat is weak before volume; it becomes meaningful only after recurring paid submissions generate proprietary delivery and citation outcomes [assumption: data-network effect requires usage].

## Platform Posture

CivicState should be evaluated as a client of shared wrk rails, not as a business that must rebuild identity, billing, and operator workflow from scratch [assumption: WrkPlug Phase 0 not yet signed]. The current repo already has its own Clerk and Stripe implementation [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts], but wrk.vc presentation should not hard-wire independent auth, billing, or login until the operator rules on shared chassis adoption [assumption: platform integration decision pending].

Cost consequence: shared rails could lower infrastructure and CAC burden by reusing account, billing, and portfolio distribution surfaces [assumption: WrkPlug shared-rails economics not evidenced in this repo]. Moat consequence: shared wrk data room and portfolio trust may compound faster than a standalone greenfield consumer site [assumption: wrk.vc distribution unvalidated for this project].

## Business Model

Launch revenue is transactional letter packages, not subscriptions [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts].

| Tier | Implemented price | Official count | Revenue basis |
|---|---:|---:|---|
| Single | $5 | 1 official | $5 and 1 are [evidence: apps/api/src/routes/payments.ts] |
| Three-pack | $15 | 3 officials | $15 and 3 are [evidence: apps/api/src/routes/payments.ts] |
| Full-spread | $25 | all matched officials | $25 is [evidence: apps/api/src/routes/payments.ts] |

Repo planning requires a 40% net margin floor after payment fees [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. Tests assert tier margins above 90% using estimated costs of $0.20, $0.40, and $0.60 by tier [evidence: tests/payment.test.ts]. The payment route currently hardcodes prices and does not independently calculate per-job margin before checkout [evidence: apps/api/src/routes/payments.ts], so margin enforcement is a product-control gap, not a proven runtime fact.

Future streams such as organization API access, subscriptions, certified mail, coalition features, and crowdfunding adjacency are excluded from launch or deferred [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

## Competition

Named competitors and substitutes:

| Competitor or substitute | What it solves | CivicState position | Honesty label |
|---|---|---|---|
| Resistbot | Low-friction messages to lawmakers | CivicState claims researched citations and paid completion | [evidence: .planning/PROJECT.md; assumption: differentiation not externally validated] |
| Change.org | Public petitions and sharing | CivicState claims direct official delivery rather than petition hosting | [evidence: MASTER_PLAN.md; assumption: category comparison] |
| LegalZoom | Document preparation | CivicState must stay civic-specific and not legal advice | [evidence: MASTER_PLAN.md; assumption: substitute for some drafting intent] |
| Quorum | Enterprise public-affairs software | CivicState targets individual residents at transactional prices | [evidence: .planning/PROJECT.md; assumption: enterprise category comparison] |
| VoterVoice | Organization-led advocacy campaigns | CivicState targets self-serve resident jobs | [evidence: .planning/PROJECT.md; assumption: enterprise category comparison] |
| Manual email and general AI drafting tools | Free or low-cost partial workaround | CivicState must win on routing, citations, delivery, and tracking | [assumption: obvious substitute set; no external research in workspace] |

The strongest competitive objection is that the product may be a feature, not a company: a user could ask a general AI tool for a letter and send it manually [assumption: category risk]. CivicState only earns its fee if official targeting, citation verification, payment-to-delivery confidence, and tracking are materially better than the workaround [assumption: value test].

## Go-To-Market

Primary GTM is a private paid beta before SEO. The first cohort should be operator-sourced residents with active civic issues, because the registry says this is not near-term investible and because paid conversion is unproven [evidence: dispatch registry note; .planning/existing-state.md].

The internal plan's primary distribution hypothesis is organic search from opt-in public campaign pages [evidence: .planning/GENESIS.md]. That can be tested only after privacy controls, public-page quality, and crawlable pages exist [assumption: SEO requires published content and time]. Social sharing is secondary and should wait until non-partisan framing and moderation are verified [evidence: .planning/GENESIS.md; apps/api/src/lib/moderation.ts].

Validation gates from the planning docs are preview-to-paid conversion of at least 3%, government inbox placement of at least 85%, federal/state official coverage of at least 95%, local official coverage of at least 60%, and chargebacks below 0.5% [evidence: .planning/PROJECT.md]. Paid ads, partnerships, native mobile apps, and organization API sales remain out of scope until those gates are measured [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

## Financial Model

The financial model reconciles as paid submissions times blended AOV, less variable cost, payment fees, and fixed costs. It is not based on live revenue [evidence: .planning/existing-state.md].

| Scenario | Paid submissions per month | Blended AOV | Monthly revenue | Variable COGS | Stripe fees | Fixed costs | Operating profit before labor | Honesty label |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Bear beta | 10 | $15 | $150 | $12 | $6 | $200 | -$68 | 10 is [assumption: downside case]; $15 is [evidence: apps/api/src/routes/payments.ts]; $12 uses 8% COGS [evidence: MASTER_PLAN.md]; $6 uses 4% fees [evidence: MASTER_PLAN.md]; $200 is [evidence: MASTER_PLAN.md]; -$68 is [assumption: arithmetic] |
| Base wedge | 25 | $15 | $375 | $30 | $15 | $200 | $130 | 25 is [evidence: .planning/GENESIS.md]; $375 and $130 are [assumption: arithmetic]; cost rates are [evidence: MASTER_PLAN.md] |
| Planning month-six | 120 | $16 | $1,920 | $154 | $77 | $200 | $1,489 | 120, $16, and $1,920 are [evidence: MASTER_PLAN.md]; $154, $77, and $1,489 are [assumption: arithmetic] |
| Planning month-twelve | 400 | $18 | $7,200 | $576 | $288 | $200 | $6,136 | 400, $18, and $7,200 are [evidence: MASTER_PLAN.md]; $576, $288, and $6,136 are [assumption: arithmetic] |
| Capacity case | 5,000 | $15 | $75,000 | $6,000 | $3,000 | $200 | $65,800 | 5,000 is [evidence: .planning/PROJECT.md]; $75,000, $6,000, $3,000, and $65,800 are [assumption: arithmetic] |

Revenue assumptions: blended AOV can hold between $15 and $18 [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts]; enough paid submissions can reach 25 per month for break-even [evidence: .planning/GENESIS.md]; SEO can eventually support 400 paid submissions per month [evidence: MASTER_PLAN.md; assumption: acquisition unproven].

Cost assumptions: variable COGS are 8% of revenue [evidence: MASTER_PLAN.md]; Stripe fees are 4% of revenue [evidence: MASTER_PLAN.md]; launch fixed costs are about $200 per month [evidence: MASTER_PLAN.md]; backend droplet cost is about $96 per month [evidence: .planning/PROJECT.md]; reserve target is $1,500 [evidence: .planning/PROJECT.md].

Sensitivity tests: at 10 paid submissions per month the plan loses $68 before labor [assumption: table arithmetic]; at 25 paid submissions per month it earns $130 before labor [assumption: table arithmetic]; if variable COGS double from 8% to 16%, the 400-submission case loses another $576 of monthly profit [assumption: sensitivity arithmetic]; if inbox placement misses the 85% target, the paid promise is suspect regardless of margin [evidence: .planning/PROJECT.md; assumption: customer refund and trust risk].

## Risks & Anti-Plan

The kill-the-deal case: this is a thoughtful civic automation demo, not a venture-scale company. The registry already warns that it may be a personal/research asset rather than a near-term investible BOS [evidence: dispatch registry note]. There is no evidence of willingness to pay, no production deliverability, no external TAM, no measured official-response lift, and no proof that one operator can manage legal-adjacent edge cases [evidence: .planning/existing-state.md; .planning/STATE.md].

Holes, mitigations, residual risk:

| Hole | Mitigation | Residual risk |
|---|---|---|
| Users may not pay $5 to $25 for civic letters | Run paid beta and measure the 3% conversion gate | If conversion is below 3%, the business model likely fails [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md] |
| Government inbox placement may miss 85% | Warm domain, monitor bounces, pause domains above 10% bounce rate | Officials may still filter AI-assisted mail [evidence: .planning/PROJECT.md; apps/worker/src/agents/delivery.ts] |
| Legal-adjacent content may overwhelm one operator | Keep legal advice, claims, filings, harassment, and defamation-risk content out of scope | Review minutes per campaign could erase margin [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts; assumption: workload unknown] |
| Citation errors could destroy trust | Verify citations and strip unverified citations before drafting | Source APIs can fail and state cache freshness may drift [evidence: apps/worker/src/lib/legal/citation-verifier.ts; apps/worker/src/lib/legal/state-cache.ts] |
| Moat is weak before volume | Focus on directory, bounce, citation, and reply data collection | A general AI tool or incumbent can copy the workflow before data compounds [assumption: competitive risk] |
| Compliance implementation may not match schema | Run end-to-end tests and fix export field mismatches before launch | Privacy rights failures create trust and legal exposure [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma] |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| Residents will pay $5 to $25 for a completed civic-letter workflow | Repo pricing tiers | [assumption: demand not measured] | Paid beta checkout conversion |
| A 3% preview-to-paid conversion is enough to keep exploring | Planning validation gate | [evidence: .planning/PROJECT.md] | Instrument preview, checkout, and completed payment |
| 85% government inbox placement is achievable | Planning validation gate | [evidence: .planning/PROJECT.md] | Seed campaigns and delivery monitoring |
| 95% federal/state official coverage is achievable | Planning validation gate | [evidence: .planning/PROJECT.md] | ZIP-code coverage audit |
| 60% local official coverage is achievable | Planning validation gate | [evidence: .planning/PROJECT.md] | Cicero/BallotReady/local-source evaluation |
| SEO from public campaign pages can lower CAC | Genesis distribution hypothesis | [assumption: no traffic evidence] | Publish opt-in pages and track search impressions |
| One operator can manage launch review | Planning thesis | [assumption: workload not measured] | Track flagged queue depth and minutes per decision |
| Citation-backed letters convert better than generic AI letters | Product differentiation | [assumption: no A/B data] | A/B preview and willingness-to-pay tests |

## Self-Valuation

Score: 46 out of 100 [assumption: EIR judgment, not a priced security]. The score is capped by zero production revenue, zero traffic, unresolved identity mismatch, and the registry watchlist note [evidence: .planning/existing-state.md; dispatch registry note].

Twelve-month bands under the wrk.vc program assumption [evidence: dispatch brief]: Bear value $0 to $50,000 if paid conversion misses the 3% gate or deliverability misses the 85% gate [assumption: validation-failure band]; Base value $150,000 to $500,000 if the project reaches 25 to 400 paid submissions per month with working delivery [assumption: validation-asset band using repo scenarios]; Bull value $1,000,000 to $3,000,000 if it reaches 5,000 paid submissions per month with defensible official/citation data [assumption: traction band below the program's $5,000,000 per-business ceiling].

Comparables used for positioning, not valuation multiples: Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. What would move valuation: live paid conversions, verified deliverability, official response rate, repeat use, low moderation load, and external market research [assumption: investor diligence criteria].

## Milestones

| Date | Milestone | Falsifiable test | Honesty label |
|---|---|---|---|
| 2026-06-22 | Operator ruling | Confirm whether `brooks-history` should pitch as CivicState business or remain research asset | [evidence: dispatch current_date; dispatch registry note] |
| 2026-07-15 | Product truth audit | Local end-to-end run proves submit, official lookup, research, draft, pay, webhook, deliver path or lists blockers | [assumption: next validation date] |
| 2026-08-15 | Paid beta gate | Reach 25 paid submissions per month or kill/reshape paid consumer thesis | 25 is [evidence: .planning/GENESIS.md]; date is [assumption: EIR milestone] |
| 2026-09-15 | Delivery gate | Show at least 85% government inbox placement and bounce pause behavior | 85% is [evidence: .planning/PROJECT.md]; date is [assumption: EIR milestone] |
| 2026-10-15 | Coverage gate | Show 95% federal/state and 60% local official coverage on sampled ZIP codes | 95% and 60% are [evidence: .planning/PROJECT.md]; date is [assumption: EIR milestone] |
| 2026-12-31 | Investibility review | Decide whether to pitch, keep as research, or sunset based on paid revenue and workload | [assumption: EIR milestone] |

## Surprise Spikes

The repo identity conflicts with dispatch identity: `brooks-history` is the project id, but all product evidence says CivicState [evidence: dispatch brief; package.json; .planning/PROJECT.md].

The planning state conflicts with itself: `.planning/ROADMAP.md` marks all phases complete as of 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/STATE.md` says Phase 1 is complete and Phase 2 planning is needed as of 2026-04-25 [evidence: .planning/STATE.md]. Current source files show more implementation than `.planning/existing-state.md`, which says zero application code existed [evidence: .planning/existing-state.md; apps/api/src; apps/worker/src].

The old master plan mentions dynamic pricing and a Pricer agent [evidence: MASTER_PLAN.md], but the current payment route uses hardcoded tiers of $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts]. That is acceptable for validation, but it contradicts any claim that per-job pricing enforcement is live.
