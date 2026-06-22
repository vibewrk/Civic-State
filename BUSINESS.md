# CivicState - Business Plan

Prepared as of 2026-06-22 [evidence: dispatch current_date]. This is a workspace-only EIR review: no network research was available, repo files are cited as evidence, and every external market claim is labeled as an assumption. Existing planning material was last substantively dated 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/GENESIS.md](.planning/GENESIS.md)], while the master build plan is dated 2026-03-01 [assumption: `March 2026` normalized to an ISO date from [MASTER_PLAN.md](MASTER_PLAN.md)].

## Thesis

CivicState wins if ordinary United States residents will pay USD 5 to USD 25 per civic issue [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] for a workflow that turns a local concern into researched, citation-backed constituent letters delivered to the right officials [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].

The falsifiable business claim is that by 2026-09-30 [assumption: next validation window], a closed beta can reach at least 3 percent preview-to-paid conversion [evidence: target in [.planning/PROJECT.md](.planning/PROJECT.md)] and at least 85 percent government-email delivery acceptance [evidence: target in [.planning/PROJECT.md](.planning/PROJECT.md)]. If either gate fails, the asset remains a useful civic research tool but not a VC-grade standalone business.

## Problem & Customer

The launch customer is a United States resident with a concrete civic concern, a desired government action, and a ZIP code [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)]. The repo encodes that workflow as issue description, desired outcome, ZIP code, anonymity choice, moderation, queueing, official lookup, drafting, payment, and delivery [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

The customer pain is not just writing. The resident must identify jurisdiction, find relevant legal or policy references, avoid inflammatory framing, and send through a channel that officials can receive [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts)]. The alternatives are manual outreach, free civic messaging tools, petition platforms, paid legal help, or doing nothing [assumption: category map from repo positioning, no network verification].

Non-customers at launch are government officials, advocacy organizations, HOAs, nonprofits, legal claimants, users seeking legal advice, and users submitting threats, harassment, defamation-risk allegations, bulk-send patterns, or private disputes [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md); [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)].

## Market

Workspace-only market sizing uses a bottom-up validation ladder because external market data was unavailable. These are not external TAM claims; they are operator-testable scenarios built from repo pricing and explicit assumptions.

| Layer | Method | Annual value |
| --- | --- | ---: |
| Break-even wedge | 25 paid submissions per month [evidence: break-even framing in [.planning/GENESIS.md](.planning/GENESIS.md)] x USD 15 average realized price [assumption: tier mix across USD 5, USD 15, and USD 25 prices] x 12 months [assumption: annualized run rate] | USD 4,500 [assumption: 25 x USD 15 x 12] |
| Tiny beta | 100 paid submissions per month [assumption: operator-testable beta volume] x USD 15 average realized price [assumption: launch tier mix] x 12 months [assumption: annualized run rate] | USD 18,000 [assumption: 100 x USD 15 x 12] |
| Niche utility | 1,000 paid submissions per month [assumption: local SEO and repeat metro wedge] x USD 16 average realized price [assumption: modest mix shift] x 12 months [assumption: annualized run rate] | USD 192,000 [assumption: 1,000 x USD 16 x 12] |
| Scaled consumer tool | 10,000 paid submissions per month [assumption: unvalidated multi-metro consumer scale] x USD 18 average realized price [assumption: stronger package mix] x 12 months [assumption: annualized run rate] | USD 2,160,000 [assumption: 10,000 x USD 18 x 12] |
| Venture-scale hurdle | USD 10,000,000 ARR target [assumption: generic venture hurdle, no repo evidence] / USD 18 average realized price [assumption: scaled package mix] / 12 months [assumption: monthly run-rate conversion] | about 46,297 paid submissions per month [assumption: USD 10,000,000 / USD 18 / 12] |

The market case is therefore conditional. At consumer-only pricing, CivicState needs either high monthly issue frequency, a strong organic acquisition engine, a data moat around official contacts and response intelligence, or a future organization/API wedge. The repo explicitly defers API access and organization workflows [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Product & Moat

What is real as of 2026-06-22 [evidence: dispatch current_date]: this is no longer only a concept document. The repo contains a Next.js web surface [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx)], an Express API [evidence: [apps/api/src/index.ts](apps/api/src/index.ts)], submission moderation [evidence: [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)], officials lookup [evidence: [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts)], Stripe Checkout session creation [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)], Postmark delivery logic [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)], worker agents [evidence: [apps/worker/src/index.ts](apps/worker/src/index.ts)], and a Prisma data model [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

What is still unproven: live traffic, paid conversion, official-data coverage, `.gov` inbox placement, official response rate, citation quality at production scale, operator review load, and whether users trust AI-assisted civic letters [evidence: `.planning/PROJECT.md` says validated items are none; [.planning/existing-state.md](.planning/existing-state.md) records USD 0 revenue and zero traffic as of its audit].

The moat hypothesis has 3 compounding assets: a verified officials directory, a reusable citation library, and opt-in public civic records for search [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. The same source says the moat does not exist at 50 submissions per month [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)], so the current moat score is weak until real delivery volume accumulates [assumption: data-network defensibility requires repeated live usage].

## Platform Posture

Draft posture: CivicState should be evaluated as a WrkPlug client rather than a standalone auth, billing, identity, and login platform [assumption: WrkPlug Phase 0 not yet signed]. If adopted, shared rails could lower infrastructure surface area and customer acquisition cost while adding a portfolio-level trust layer [assumption: platform strategy, no signed contract in workspace].

Current implementation truth is different: the repo uses Clerk, Stripe, Postmark, DigitalOcean-oriented Docker, PostgreSQL, Redis, BullMQ, Prisma, and Anthropic paths [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [package.json](package.json)]. Any WrkPlug posture must remain operator-gated and should not be hard-wired into the product plan before adoption [assumption: registry/operator control].

## Business Model

Launch revenue is transactional paid delivery. The implemented tiers are USD 5 for a single official, USD 15 for three officials, and USD 25 for all matched officials [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. The master plan states a 40 percent net margin floor [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] and previously modeled a 91 percent gross margin, USD 132.50 monthly maximum burn, and break-even at 11 submissions [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Those unit economics are plan claims, not observed operating results [assumption: no live payments in workspace].

Base revenue formula: paid submissions x average realized package price. A launch mix of 25 percent single, 50 percent three-pack, and 25 percent full-spread produces a USD 15 average realized price [assumption: 0.25 x USD 5 + 0.50 x USD 15 + 0.25 x USD 25].

| Stream | Status | Pricing | Honesty label |
| --- | --- | --- | --- |
| Individual letter packages | Launch stream | USD 5, USD 15, USD 25 | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Human-reviewed complex sends | Possible future premium | USD 25 floor | [assumption: inferred from repo pricing ceiling; not separately implemented] |
| Organization/API access | Future only | USD 10,000 annual contract value | [assumption: future wedge, explicitly out of launch scope in [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Crowdfunding adjacency | Excluded | USD 0 in base plan | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |

## Competition

| Player | Category | Why customers use it | CivicState positioning |
| --- | --- | --- | --- |
| Resistbot | Civic messaging | Fast constituent messages [assumption: known category, no network verification] | Research-backed citations and delivery tracking [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Change.org | Petition platform | Public signatures and social proof [assumption: known category, no network verification] | Direct constituent letters rather than petition signatures [assumption: competitive positioning] |
| Quorum / VoterVoice | Advocacy software | Organization-grade campaign operations [assumption: named in [.planning/PROJECT.md](.planning/PROJECT.md), no network verification] | Consumer self-serve workflow below enterprise annual contracts [assumption: enterprise price comparison unverified] |
| Manual official contact | Free substitute | Zero-dollar email if the resident knows who to contact [assumption: substitute behavior] | Saves lookup, research, drafting, routing, and tracking work [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |
| LegalZoom / attorneys | Formal legal help | Higher-stakes documents or counsel [assumption: category substitute, no network verification] | Explicitly not legal advice or claim filing [evidence: [apps/worker/src/agents/drafter.ts](apps/worker/src/agents/drafter.ts)] |

The strongest competitive objection is that the closest substitute is free. CivicState only earns a paid transaction if its research, targeting, framing, and delivery confidence are visibly better than a resident sending an email manually [assumption: value threshold for paid utility].

## Go-To-Market

First wedge: a narrow private beta in manually verified metros and issue categories [assumption: operator-led launch plan]. The repo's SEO flywheel should be treated as a second-order channel because public pages require real paid submissions before they can compound [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

First 100 customers [assumption: launch target] should come from founder/operator distribution, local civic threads, neighborhood newsletters, and search pages for specific issues such as code enforcement, zoning, potholes, schools, utilities, and transit [assumption: channel hypothesis, no network verification]. Paid acquisition should remain off until payment conversion and delivery acceptance are measured [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

| Metric | Minimum gate | Honesty label |
| --- | ---: | --- |
| Preview-to-paid conversion | 3 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Government-email delivery acceptance | 85 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Federal/state official coverage | 95 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Local official coverage | 60 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Chargeback rate | below 0.5 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

## Financial Model

The model reconciles revenue as average monthly paid submissions x average realized price x 12 months [assumption: annual model form]. COGS plus Stripe is modeled at 12 percent of revenue from the prior plan's 8 percent variable COGS plus 4 percent payment-fee line [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. Future volume is unvalidated.

| Period | Revenue build | Revenue | COGS + Stripe | Fixed platform | People / review ops | EBITDA before tax |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Launch year | 180 average paid submissions per month [assumption: early local launch] x USD 16 ARPP [assumption: tier mix ramp] x 12 months [assumption: annual model] | USD 34,560 [assumption: 180 x USD 16 x 12] | USD 4,147 [assumption: 12 percent x USD 34,560] | USD 5,400 [assumption: USD 200 per month platform plus USD 250 per month local-data provider] | USD 20,000 [assumption: part-time review budget] | USD 5,013 [assumption: revenue minus listed costs] |
| Scale year | 900 average paid submissions per month [assumption: repeated metro launch] x USD 18 ARPP [assumption: stronger package mix] x 12 months [assumption: annual model] | USD 194,400 [assumption: 900 x USD 18 x 12] | USD 23,328 [assumption: 12 percent x USD 194,400] | USD 12,000 [assumption: higher data, hosting, email, and monitoring] | USD 70,000 [assumption: operator plus contractors] | USD 89,072 [assumption: revenue minus listed costs] |
| Expansion year | 2,500 average paid submissions per month [assumption: multi-metro organic traction] x USD 20 ARPP [assumption: package mix and upsell improvement] x 12 months [assumption: annual model] | USD 600,000 [assumption: 2,500 x USD 20 x 12] | USD 72,000 [assumption: 12 percent x USD 600,000] | USD 36,000 [assumption: managed data and deliverability tooling] | USD 180,000 [assumption: small operations team] | USD 312,000 [assumption: revenue minus listed costs] |

Revenue assumptions:

| Assumption | Label | Test |
| --- | --- | --- |
| USD 15 launch ARPP | [assumption: 25 percent single, 50 percent three-pack, 25 percent full-spread] | Compare paid package mix after 100 paid submissions [assumption: validation sample] |
| Paid submissions can grow from 180 per month to 2,500 per month across model periods | [assumption: SEO plus metro expansion] | Monthly cohort dashboard by acquisition channel |
| Organization/API revenue is USD 0 in the base case | [evidence: out of launch scope in [.planning/PROJECT.md](.planning/PROJECT.md)] | Do not count until pilots are signed |

Cost assumptions:

| Assumption | Label | Test |
| --- | --- | --- |
| Variable COGS plus Stripe equals 12 percent of revenue | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | Treasury reconciliation by campaign |
| Fixed platform starts near USD 200 per month | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | Vendor invoices after beta |
| Local official data may add USD 100 to USD 500 per month | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Provider evaluation spike |

Sensitivity tests:

| Downside case | Impact | Response |
| --- | --- | --- |
| Conversion is 1 percent instead of 3 percent | Revenue falls by about 67 percent versus gate [assumption: arithmetic comparison] | Stop broad SEO work; interview non-buyers and simplify pricing |
| COGS plus payment fees are 25 percent instead of 12 percent | Launch-year EBITDA falls by USD 4,493 [assumption: 13 percent x USD 34,560] | Raise full-spread price or cap officials per package |
| Local data provider costs USD 500 per month instead of USD 250 per month | Fixed cost rises by USD 3,000 per year [assumption: USD 250 extra x 12] | Limit launch metros and manually verify local contacts |

## Risks & Anti-Plan

The anti-plan a skeptical partner would write:

| Hole | Why it could kill the business | Mitigation | Residual risk |
| --- | --- | --- | --- |
| People may not pay for civic letters | Free manual outreach and free advocacy tools may be enough [assumption: substitute behavior] | Validate 3 percent paid conversion before scaling [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | High until real payments exist |
| Government deliverability may fail | If official domains bounce or spam-filter letters, the product sells a false promise [assumption: deliverability risk] | SPF/DKIM/DMARC, Postmark, per-domain bounce thresholds, and domain monitoring [evidence: [scripts/setup-dns.md](scripts/setup-dns.md); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)] | High because inbox placement is externally controlled |
| Citation accuracy can create trust or liability failures | Bad legal references undermine the core value proposition [assumption: AI risk] | Search-bound research and citation verification before drafting [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts)] | Medium because source coverage can still be thin |
| The platform can be abused for harassment or political spam | Civic content is sensitive and can create reputational harm [assumption: abuse risk] | Moderation, review queue, opt-out, non-partisan prompts, and audit logs [evidence: [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts); [MASTER_PLAN.md](MASTER_PLAN.md)] | Medium-high at scale |
| Consumer-only market may be too small | USD 2,160,000 scaled consumer ARR does not clear a large venture outcome [assumption: market model above] | Treat B2B/API as a separate validation gate, not baked-in revenue | High until organization demand is validated |
| Registry says watchlist/personal-research asset | The operator may not want this pitched as a business [evidence: dispatch registry notes] | Require operator ruling before wrk.vc promotion [assumption: governance control] | High until identity and intent are resolved |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
| --- | --- | --- | --- |
| Users will pay USD 5 to USD 25 for letter delivery | Implemented price tiers | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] plus [assumption: willingness to pay unvalidated] | First 100 paid submissions [assumption: validation sample] |
| 3 percent paid conversion is the minimum viable gate | Prior project context | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Preview-to-paid funnel |
| 85 percent delivery acceptance is required | Prior project context | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Postmark and bounce dashboard |
| Break-even wedge is USD 4,500 annualized revenue | Bottom-up model | [assumption: 25 paid submissions x USD 15 x 12 months] | Beta revenue cohort |
| COGS plus Stripe is 12 percent of revenue | Prior master-plan unit economics | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | Treasury actuals by job |
| One operator can run launch exceptions | Prior project constraint | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Review queue age and volume |
| Officials data coverage can reach 95 percent federal/state and 60 percent local | Prior project target | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | ZIP lookup coverage audit |
| WrkPlug shared rails can lower infra and CAC | Platform posture | [assumption: WrkPlug Phase 0 not yet signed] | Operator adoption decision after POM review |

## Self-Valuation

EIR score: 62 out of 100 [assumption: weighted judgment across product reality, market size, margins, risks, and validation gaps]. The score is capped by absent live demand, deliverability, and operator-intent evidence, not by implementation progress.

Method: revenue-multiple sanity check plus the wrk.vc USD 5,000,000-per-business program ceiling [assumption: program context from dispatch brief, not repo evidence]. Category comparables used for shape are Resistbot, Change.org, Quorum/VoterVoice, and FiscalNote-style advocacy/data businesses [assumption: known categories, no network verification].

| Case | Evidence required | Self-valuation band |
| --- | --- | ---: |
| Bear | Less than USD 5,000 monthly revenue [assumption: weak demand threshold] or delivery below 85 percent [evidence: delivery gate in [.planning/PROJECT.md](.planning/PROJECT.md)] | USD 250,000 to USD 500,000 [assumption: code and learning asset value] |
| Base | USD 15,000 to USD 30,000 monthly revenue [assumption: repeatable metro traction] with positive contribution margin | USD 1,000,000 to USD 2,000,000 [assumption: 3x to 6x annualized gross profit sanity check] |
| Bull | USD 50,000 monthly revenue [assumption: multi-metro traction] plus signed organization pilots [assumption: future wedge] | USD 3,000,000 to USD 5,000,000 [assumption: wrk.vc ceiling and expansion option value] |

What would move valuation: real paid cohorts, verified government delivery, repeat purchases, response-rate data, organization pilots, and a defensible official/contact/citation dataset [assumption: investor diligence priorities].

## Milestones

| Date | Milestone | Pass/fail proof |
| --- | --- | --- |
| 2026-06-30 | Gate-ready beta scope | Root soul accepted and validation metrics defined [assumption: operator timeline] |
| 2026-07-15 | Official-data spike complete | Provider decision for federal/state/local coverage with cost and accuracy notes [assumption: buildable next step] |
| 2026-08-15 | Closed beta delivery test | 25 operator-approved beta submissions processed end-to-end [assumption: validation target] |
| 2026-09-30 | Paid validation gate | 3 percent conversion, 85 percent delivery acceptance, and chargebacks below 0.5 percent [evidence: targets in [.planning/PROJECT.md](.planning/PROJECT.md)] |
| 2026-12-31 | Market proof decision | Continue only if repeatable channel and unit economics are visible [assumption: investor review date] |

## Surprise Spikes

The dispatch identifies the project as `brooks-history`, while the repo code and planning identify the product as CivicState [evidence: dispatch brief; [package.json](package.json); [.planning/PROJECT.md](.planning/PROJECT.md)]. This must be resolved before wrk.vc promotion.

The old `.planning/ROADMAP.md` marks all implementation phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while `.planning/STATE.md` still says the current focus is Phase 1 and only Phase 1 is complete [evidence: [.planning/STATE.md](.planning/STATE.md)]. Root roadmap therefore treats implementation presence and business validation as separate gates.

`.planning/existing-state.md` says there is zero application source code and USD 0 revenue as of its audit [evidence: [.planning/existing-state.md](.planning/existing-state.md)], but the current repo has web, API, worker, and Prisma implementation surfaces [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx); [apps/api/src/index.ts](apps/api/src/index.ts); [apps/worker/src/index.ts](apps/worker/src/index.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. The codebase has moved faster than the soul docs.

The master plan includes dynamic pricing and more agent concepts in places [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)], while implemented payment truth is fixed tiers [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. Fixed pricing should remain the launch truth until live COGS justify a change.
