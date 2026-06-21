# CivicState / brooks-history — Business Plan

## Thesis

As of 2026-06-21 [evidence: `.wrkdog-run/stderr.log` session header], the investible version of this repo is CivicState: a constituent-communication product that turns a resident's civic issue into researched, citation-backed letters to public officials for $5-$25 per campaign [evidence: `MASTER_PLAN.md` §1-2; `apps/web/app/page.tsx`; `apps/api/src/routes/payments.ts`]. The thesis is falsifiable: if fewer than 3% of qualified preview users pay, fewer than 85% of government emails land without bounce, or verified official coverage is materially below the planned federal/state/local target, this should remain a personal/research asset rather than a near-term business [assumption: operator registry says watchlist and asks whether this should pitch as a business].

## Problem & Customer

Primary customer: a US resident with a specific local, state, or federal issue who would contact government if the research, jurisdiction routing, formal drafting, and delivery work were done for them [evidence: `.planning/GENESIS.md`; `.planning/PROJECT.md`].

Initial ICP is narrow: English-speaking, web-capable US residents with non-emergency civic concerns such as infrastructure, zoning, schools, agency enforcement, budget allocation, and public services [evidence: `MASTER_PLAN.md` §1; `.planning/REQUIREMENTS.md`]. Exclusions are explicit: no legal claims, legal advice, filings, medical demands, threats, harassment, or automated lobbying firm posture [evidence: `MASTER_PLAN.md` §1 and §5.3; `apps/api/src/lib/moderation.ts`].

The pain is not that letters are impossible; it is that the average person does not know which official owns the problem, which law or ordinance matters, or how to produce credible language quickly [evidence: `.planning/GENESIS.md`]. The current substitutes are manual search, office websites, petition platforms, SMS advocacy tools, and professional services that are either free but shallow or expensive and organization-oriented [evidence: `MASTER_PLAN.md` §2.4].

## Market

Workspace-only sizing method: this is not a sourced market report. All external demand claims below are assumptions and must be replaced with field evidence before investment approval.

| Layer | Method | Annual Value |
|---|---|---:|
| TAM | 1,000 local/civic issue markets x 1,000 paid civic-letter jobs per market per year x $15 average revenue per campaign | $15,000,000 [assumption: bottom-up proxy for US civic-action jobs; no network validation] |
| SAM | 100 early SEO-reachable issue clusters x 1,000 visits per cluster per year x 2% paid conversion x $15 average revenue | $30,000 [assumption: SEO wedge model; no search-volume evidence] |
| SOM | 240 paid campaigns in year one x $15 average revenue | $3,600 [assumption: conservative launch model used in Financial Model] |

The attractive part is not the initial revenue size; it is the possible data loop. Each paid campaign can improve official contact records, citation reuse, delivery history, and public campaign content if opt-in publishing is later implemented [evidence: `.planning/GENESIS.md`; `packages/shared/prisma/schema.prisma`]. The weak part is equally important: without volume, the moat is close to zero [evidence: `.planning/GENESIS.md`].

## Product & Moat

What is real today:

- Next.js app with a CivicState landing page and stated $5-$25 pricing [evidence: `apps/web/app/page.tsx`].
- Express API with submissions, official lookup, payments, campaigns, admin, webhook, and compliance route modules [evidence: `apps/api/src/index.ts`].
- BullMQ worker process with classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: `apps/worker/src/index.ts`].
- Prisma schema covering users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`].
- Tests around payments, officials, moderation, delivery, compliance, treasury, admin, campaigns, citations, API routes, and state cache [evidence: `tests/`].

What is not proven:

- No customer usage, revenue, deliverability, official-response rate, or conversion data is present in the repo [evidence: `.planning/existing-state.md`; absence of production data files].
- External official data providers, legal data coverage, government inbox placement, and Stripe/Postmark/Clerk production readiness are not validated in this workspace [evidence: `.planning/STATE.md`; `.planning/REQUIREMENTS.md`].

Moat hypothesis: at 1,000+ paid campaigns/month [assumption: volume threshold from `.planning/GENESIS.md`, not market evidence], CivicState could compound a proprietary officials directory, verified citation library, bounce/response data, and opt-in public campaign archive. At 0 paid campaigns [evidence: `.planning/existing-state.md`], the moat is only implementation momentum.

## Platform Posture

CivicState should be treated as a WrkPlug client, not a standalone chassis business: shared auth, billing, identity, and account rails should be consumed rather than rebuilt where the portfolio platform provides them [assumption: WrkPlug Phase 0 not yet signed]. The cost consequence is lower duplicated infrastructure and lower CAC if a single MCPWrk account can cross-sell portfolio tools [assumption: portfolio strategy from dispatch context, not repo evidence]. The moat consequence is shared-rails compounding across products, but only if operator adoption makes CivicState an approved client of those rails [assumption: requires operator ruling].

This posture conflicts with current implementation choices that already integrate Clerk, Stripe, and standalone account/payment flows [evidence: `apps/api/src/routes/payments.ts`; `apps/api/src/middleware/auth.ts`]. The practical near-term decision is to keep the current app build working while documenting WrkPlug migration as an architectural option, not a hard dependency.

## Business Model

Revenue model is transactional at launch:

| Package | Price | Current Evidence | Unit Cost Model | Gross Margin |
|---|---:|---|---:|---:|
| Single official | $5.00 | `single` tier is 500 cents [evidence: `apps/api/src/routes/payments.ts`] | $0.20 [evidence: `tests/treasury.test.ts`] | 96.0% [evidence: `(5.00 - 0.20) / 5.00` from repo prices and tests] |
| Three officials | $15.00 | `three_pack` tier is 1,500 cents [evidence: `apps/api/src/routes/payments.ts`] | $0.40 [evidence: `tests/treasury.test.ts`] | 97.3% [evidence: `(15.00 - 0.40) / 15.00` from repo prices and tests] |
| Full spread | $25.00 | `full_spread` tier is 2,500 cents [evidence: `apps/api/src/routes/payments.ts`] | $0.60 [evidence: `tests/treasury.test.ts`] | 97.6% [evidence: `(25.00 - 0.60) / 25.00` from repo prices and tests] |

The financial risk is that these margins exclude payment processing, paid local-official data, support time, chargebacks, deliverability tooling, and human review labor [assumption: standard SaaS cost categories; no network]. The repo's existing plan includes a 40% net margin floor [evidence: `MASTER_PLAN.md` §2.3], but no production margin enforcement is proven beyond tests and treasury helpers [evidence: `tests/payment.test.ts`; `tests/treasury.test.ts`].

Future revenue streams, only after consumer proof: priority human review, organization accounts, API access for HOAs/nonprofits, and paid legal-data enhancements [evidence: `MASTER_PLAN.md` §2.2; `.planning/REQUIREMENTS.md` future requirements].

## Competition

Named competitors and substitutes:

| Competitor/Substitute | Position | CivicState Differentiation | Risk |
|---|---|---|---|
| Resistbot | SMS/email advocacy to lawmakers [evidence: `MASTER_PLAN.md` §2.4] | More research-heavy, citation-backed workflow [evidence: `MASTER_PLAN.md` §2.4] | Free/low-friction substitute may capture casual users [assumption: no network validation]. |
| Change.org | Petition hosting and audience aggregation [evidence: `MASTER_PLAN.md` §2.4] | Individual letter delivery plus legal/regulatory research [evidence: `MASTER_PLAN.md` §2.4] | Petition network effects are stronger than a new solo-letter product [assumption]. |
| Quorum / VoterVoice | Organization-grade advocacy software [evidence: `.planning/PROJECT.md`] | Consumer transactional price point [evidence: `.planning/PROJECT.md`] | Enterprise incumbents can add AI writing features faster than CivicState can build distribution [assumption]. |
| Manual official contact | Free direct email/web forms [evidence: `MASTER_PLAN.md` §2.4] | Saves routing, drafting, citation, and delivery effort [evidence: `.planning/GENESIS.md`] | Many motivated citizens will not pay for something they can do manually [assumption]. |
| LegalZoom / attorneys | Document/legal services substitute [evidence: `MASTER_PLAN.md` §2.4] | Civic communication only, cheaper than professional services [evidence: `MASTER_PLAN.md` §2.4] | Any perceived legal-advice drift creates liability and trust risk [assumption]. |

## Go-To-Market

First wedge: prove one civic use case before broad civic-tech positioning. Suggested wedge is local infrastructure/service failures because they are frequent, concrete, and avoid some ideological heat [assumption: EIR judgment; no network].

First customer cohort plan [assumption: launch plan]:

- Recruit 20 operator-sourced beta users from local civic forums, neighborhood groups, and personal networks [assumption: no CRM evidence].
- Produce 50 manual-assisted campaigns where the operator reviews all citations and officials before sending [assumption: risk-controlled validation].
- Publish 30 opt-in public examples only after legal/compliance copy is reviewed [assumption: content flywheel test].
- Run 2 provider spikes: Cicero vs BallotReady for local officials, and legal-source coverage for state statutes [evidence: `.planning/STATE.md`; `.planning/REQUIREMENTS.md`].

Channel order: manual beta, SEO pages from opt-in public campaigns, social sharing of public campaign results, then organizational pilots only after consumer conversion and delivery metrics clear gates [assumption: distribution sequence].

## Financial Model

Base case uses $15 average revenue per paid campaign [assumption: mix of current $5/$15/$25 tiers], 60 cents variable job cost [evidence: full-spread treasury ceiling in `tests/treasury.test.ts`], 5% payment processing drag [assumption: external card processing approximation], and a lean infra stack starting at $96/month [evidence: `MASTER_PLAN.md` §4.1].

| Year | Paid Campaigns | Revenue Build | Gross Revenue | Variable Costs | Fixed/Operating Costs | Net Before Labor |
|---|---:|---|---:|---:|---:|---:|
| 2026 launch year | 240 [assumption: 20/month average] | 240 x $15 | $3,600 [assumption] | $144 job cost + $180 processing = $324 [assumption/evidence mixed] | $1,152 infra + $1,000 data/tools = $2,152 [assumption/evidence mixed] | $1,124 [assumption] |
| 2027 | 2,400 [assumption: 200/month average] | 2,400 x $15 | $36,000 [assumption] | $1,440 job cost + $1,800 processing = $3,240 [assumption/evidence mixed] | $4,000 infra/data/tools + $6,000 support = $10,000 [assumption] | $22,760 [assumption] |
| 2028 | 12,000 [assumption: 1,000/month average] | 12,000 x $15 | $180,000 [assumption] | $7,200 job cost + $9,000 processing = $16,200 [assumption/evidence mixed] | $18,000 infra/data/tools + $30,000 support = $48,000 [assumption] | $115,800 [assumption] |

Revenue assumptions:

- Average revenue per campaign is $15 [assumption: midpoint of current package mix].
- Paid conversion target is 3% from qualified previews [assumption: `.planning/PROJECT.md` validation gate, not observed].
- Refund/chargeback loss is below 0.5% [evidence: `.planning/PROJECT.md` constraint; not observed].

Cost assumptions:

- Variable job cost remains at or below $0.60 for full-spread campaigns [evidence: `tests/treasury.test.ts`].
- Starting backend droplet cost is about $96/month [evidence: `MASTER_PLAN.md` §4.1].
- Local-official data and compliance tooling cost $1,000 in launch year [assumption: no provider quote in repo].

Sensitivity tests:

- If conversion is 1% instead of 3%, launch-year paid campaigns fall from 240 to 80 and gross revenue falls from $3,600 to $1,200 [assumption].
- If average revenue falls from $15 to $5, 2027 gross revenue falls from $36,000 to $12,000 [assumption].
- If local-official data costs $500/month, 2027 operating costs rise by $6,000 and net before labor falls from $22,760 to $16,760 [assumption].

## Risks & Anti-Plan

The partner-kill version: this may be a beautifully overbuilt product for a behavior users do not pay for. The user can already email an official for free, advocacy tools already exist, officials may ignore AI-assisted form letters, and government inboxes may punish a new sending domain. The registry explicitly says watchlist and asks whether this is a personal/research asset rather than a near-term investible business [evidence: dispatch registry note].

Holes, mitigations, residual risks:

| Hole | Mitigation | Residual Risk |
|---|---|---|
| Willingness to pay is unproven at $5-$25 [evidence: no revenue data in repo]. | Manual beta with payment required before delivery. | Users may like previews and still refuse payment [assumption]. |
| Official data coverage and local accuracy are unproven [evidence: `.planning/STATE.md` blocker]. | Provider spike for federal/state/local coverage before broad launch. | Paid providers may be too costly or stale [assumption]. |
| Email deliverability to government domains could fail [evidence: `.planning/PROJECT.md`; `.planning/ROADMAP.md`]. | Domain warming, per-domain bounce pause at 10%, opt-out suppression [evidence: `apps/worker/src/agents/delivery.ts`]. | Even delivered emails may be filtered or ignored [assumption]. |
| Legal/compliance boundary is sensitive because letters cite law but must not be legal advice [evidence: `MASTER_PLAN.md` §1; `apps/worker/src/agents/drafter.ts`]. | Mandatory disclaimers, citation verification, moderation, human review queue. | Bad output could create liability or reputational damage [assumption]. |
| Repository identity is inconsistent: dispatch says `brooks-history`, code says CivicState [evidence: dispatch; `package.json`]. | Operator confirmation before public wrk.vc positioning. | A wrong dossier could pitch the wrong asset [assumption]. |

## Assumption Ledger

| Claim | Basis | Evidence-or-Assumption | Test |
|---|---|---|---|
| Users will pay $5-$25 for civic letters. | Current pricing tiers. | [evidence: `apps/api/src/routes/payments.ts`] and [assumption: willingness to pay unproven]. | 100 preview users with payment gate. |
| 3% paid conversion is enough for initial validation. | Existing planning gate. | [evidence: `.planning/PROJECT.md`] and [assumption: threshold not market-tested]. | Measure preview-to-paid conversion. |
| 85% deliverability is a launch gate. | Existing planning gate. | [evidence: `.planning/PROJECT.md`] and [assumption: inbox placement not observed]. | Seed tests and production bounce tracking. |
| Local official coverage is the hardest data gap. | Existing blocker. | [evidence: `.planning/STATE.md`; `.planning/REQUIREMENTS.md`]. | Cicero/BallotReady/provider spike. |
| Moat appears only after volume. | Genesis moat hypothesis. | [evidence: `.planning/GENESIS.md`]. | Track reuse of official contacts and citations by campaign count. |
| WrkPlug should host shared rails. | Portfolio strategy. | [assumption: WrkPlug Phase 0 not signed]. | Operator architecture decision. |
| This repo should pitch CivicState, not brooks-history. | Code and planning artifacts. | [evidence: `package.json`; `MASTER_PLAN.md`] and [assumption: dispatch mismatch unresolved]. | Operator confirmation before wrk.vc publish. |

## Self-Valuation

Score: 2.2 / 5.0 [assumption: EIR scoring; watchlist, no revenue, working scaffold, high compliance risk].

Method: weighted judgment across product reality, market proof, monetization, defensibility, and execution risk. Comparables used for positioning, not valuation multiples: Resistbot, Change.org, Quorum, and VoterVoice [evidence: `MASTER_PLAN.md`; `.planning/PROJECT.md`].

Under the $5,000,000-per-business program assumption [assumption: dispatch program frame], valuation bands over the next year are:

- BEAR: $0-$50,000 if the project remains a research asset or fails payment/deliverability gates [assumption].
- BASE: $150,000-$400,000 if it reaches 200 paid campaigns/month with controlled compliance and repeatable delivery [assumption].
- BULL: $750,000-$1,500,000 if it reaches 1,000 paid campaigns/month, shows >3% paid conversion, >85% delivery success, and builds reusable official/citation data [assumption].

What moves valuation: real paid conversion, deliverability by government domain, verified official coverage, citation error rate, response rate, CAC, refund/chargeback rate, and operator confirmation that this is an approved business rather than a personal/research asset.

## Milestones

| Date | Milestone | Pass/Fail Standard |
|---|---|---|
| 2026-06-21 | Soul upgrade complete | BUSINESS.md, ROADMAP.md, DECISIONS.md, and gate JSON exist with honesty labels [evidence: this document]. |
| 2026-07-15 | Operator identity ruling | Decide whether public dossier is CivicState, brooks-history, or watchlist-only [assumption: governance need]. |
| 2026-08-01 | Provider coverage spike | Federal/state/local official lookup coverage report for 25 ZIP codes [assumption: buildable test]. |
| 2026-08-15 | Paid beta readiness | Stripe, Postmark, moderation, citation verification, and admin review path pass staged tests [assumption: repo implementation target]. |
| 2026-09-15 | First 100-customer validation | 100 qualified previews, paid conversion measured, bounce rate measured, support load measured [assumption: GTM test]. |

## Surprise Spikes

- Project identity conflict: the runner says PROJECT `brooks-history` and REPO `RPLogic-Inc/brookss-history`, but every planning and source artifact describes CivicState [evidence: dispatch; `package.json`; `MASTER_PLAN.md`]. Do not publish a wrk.vc dossier until the operator resolves the identity.
- Registry posture conflict: the registry note says watchlist/personal/research asset, while the repo contains a monetized civic-tech app scaffold [evidence: dispatch; `apps/api/src/routes/payments.ts`]. The plan should remain `needs-revision` until operator adoption.
- State drift: `.planning/existing-state.md` says zero application code exists, but the repo now has apps, worker agents, Prisma schema, Docker, and tests [evidence: `.planning/existing-state.md`; `apps/`; `packages/shared/`; `tests/`].
- Roadmap drift: `.planning/ROADMAP.md` marks all planned phases complete, while `.planning/STATE.md` says foundation is complete and AI-pipeline planning is next [evidence: `.planning/ROADMAP.md`; `.planning/STATE.md`]. Root ROADMAP.md resolves this by using buildable next steps rather than declaring launch readiness.
