# Brooks History / CivicState - Business Plan

Last updated: 2026-06-22 [evidence: dispatch current_date]. Workspace mode: no network; repo files are cited as [evidence], and external claims are marked as assumptions.

## Thesis

As currently evidenced, this repo is not a Brooks History product; it is a CivicState civic-action platform that turns a resident concern into researched, citation-backed letters for officials at $5, $15, or $25 per transaction [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts]. The investible thesis is falsifiable: if a narrow launch audience converts at 3% or better and government-email delivery reaches 85% inbox placement, CivicState can become a low-price, transactional civic workflow business; if either gate misses, it should remain a personal/research asset rather than a near-term BOS business [evidence: dispatch registry note; .planning/PROJECT.md].

## Problem & Customer

The customer is a United States resident with a specific civic concern, a ZIP code, and a desired outcome, but not the time or fluency to identify jurisdiction, research applicable law, draft a professional letter, and send it to the right officials [evidence: .planning/PROJECT.md; .planning/GENESIS.md]. Current alternatives are manual research, generic email templates, nonprofit advocacy tools, or doing nothing [assumption: no network; inferred from product problem statement].

Primary ICP: individual residents who will pay less than a lunch-priced amount, specifically $5 to $25, to outsource the research, drafting, targeting, and delivery workflow [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts]. Secondary ICPs such as HOAs, nonprofits, and civic organizations are explicitly out of launch scope until the individual workflow proves stable [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

Customer definition is intentionally narrow as of 2026-06-22 [evidence: dispatch current_date]: one authenticated payer, one issue, one ZIP code, one campaign, and one to all matched officials [evidence: packages/shared/prisma/schema.prisma; apps/api/src/routes/payments.ts].

## Market

No external market research was available in this worker run, so the market model below is a bottom-up planning envelope, not a sourced market fact.

| Layer | Method | Annual value |
| --- | --- | --- |
| TAM | 10,000,000 potential paid civic-contact jobs per year [assumption: unsourced United States civic-action task envelope] x $15 average package [evidence: apps/api/src/routes/payments.ts] | $150,000,000 [assumption: arithmetic model] |
| SAM | 1,000,000 tech-comfortable, card-paying civic-contact jobs per year [assumption: one-tenth of TAM because launch is web-only and English-only] x $15 average package [evidence: apps/api/src/routes/payments.ts] | $15,000,000 [assumption: arithmetic model] |
| SOM | 4,800 annual campaigns at month-twelve run rate [evidence: .planning/existing-state.md planned scale] x $15 average package [evidence: apps/api/src/routes/payments.ts] | $72,000 [assumption: existing repo scale target translated into annual revenue] |

This is not yet a VC-scale market proof. The near-term question is whether the workflow can earn recurring transaction volume in one wedge before anyone argues for the $150,000,000 TAM [assumption: EIR judgment based on no customer evidence].

## Product & Moat

Real today: a TypeScript monorepo with Next.js frontend, Express API, worker agents, Prisma schema, Clerk auth integration, Stripe Checkout route, Postmark webhook handling, officials lookup clients, moderation, citation verification, and treasury helpers [evidence: package.json; packages/shared/prisma/schema.prisma; apps/api/src/routes/submissions.ts; apps/api/src/routes/webhooks.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/lib/treasury.ts].

Aspirational or unvalidated: paid conversion, production deliverability, official response rates, legal-policy robustness, broad official coverage, and SEO-led acquisition [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

The moat hypothesis is compounding operational data: verified official contacts, bounce and opt-out history, reusable verified citations, and public campaign pages [evidence: .planning/GENESIS.md]. That moat is weak below 1,000 monthly submissions [evidence: .planning/GENESIS.md], and effectively absent until paid usage produces proprietary data.

## Platform Posture

Target posture for wrk.vc should be WrkPlug client posture: this venture consumes shared auth, billing, identity, and login instead of maintaining its own parallel platform rails [assumption: WrkPlug Phase 0 not yet signed]. The cost/moat consequence would be lower infrastructure burden, lower duplicated compliance work, and shared-rails compounding across the wrk portfolio [assumption: WrkPlug platform strategy].

Current repo posture contradicts that target: the code directly implements Clerk, Stripe, Postmark, and its own user/payment schema [evidence: packages/shared/prisma/schema.prisma; apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts; apps/web/app/layout.tsx]. Migration to WrkPlug is therefore a strategy decision, not a code reality as of 2026-06-22 [evidence: dispatch current_date].

## Business Model

Revenue model: one-time packages at $5 for one official, $15 for three officials, and $25 for all matched officials [evidence: apps/api/src/routes/payments.ts]. The repo also requires Stripe payment confirmation before delivery begins [evidence: apps/api/src/routes/webhooks.ts].

Unit model: code estimates direct job costs at $0.20, $0.40, and $0.60 by pricing tier [evidence: apps/worker/src/lib/treasury.ts]. Planning docs state a 40% net margin floor and a 91% gross margin expectation, but that margin is not validated by live payments [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

Fixed-cost posture: the plan references a $96 per month DigitalOcean droplet, $132.50 per month max burn, and a $1,500 Mercury reserve [evidence: .planning/PROJECT.md]. These are planning figures, not observed production spend [evidence: .planning/existing-state.md].

## Competition

Named competitors and substitutes:

| Player | Position | CivicState wedge |
| --- | --- | --- |
| Resistbot | Citizen messaging to lawmakers [evidence: .planning/PROJECT.md; MASTER_PLAN.md] | Adds research, citations, official targeting, and paid delivery workflow [evidence: .planning/PROJECT.md] |
| Quorum | Enterprise advocacy platform at $10,000+ per year [evidence: .planning/PROJECT.md] | Individual transactional price point at $5 to $25 [evidence: apps/api/src/routes/payments.ts] |
| VoterVoice | Enterprise advocacy platform [evidence: .planning/PROJECT.md] | Self-serve consumer workflow rather than organization-led campaigns [evidence: .planning/PROJECT.md] |
| Manual email and web forms | Free substitute [assumption: common civic workflow, no network] | Saves research, drafting, targeting, and follow-up effort [evidence: .planning/GENESIS.md] |
| Generic AI writing tools | Drafting substitute [assumption: model knowledge, no network] | Adds official lookup, citation verification, delivery, and audit trail [evidence: apps/api/src/lib/officials/lookup.ts; apps/worker/src/agents/researcher.ts; packages/shared/prisma/schema.prisma] |

## Go-To-Market

Launch wedge: a contained beta in one to two jurisdictions with issues that have clear public-law sources and lower defamation risk, such as housing habitability, noise, public works, and environmental complaints [assumption: risk-based EIR selection]. The first 100 customers should come from operator-led outreach to civic forums, local issue newsletters, tenant groups, neighborhood groups, and direct founder demos [assumption: no customer list in repo].

Acquisition hypothesis: SEO through opt-in public campaign pages and social sharing is in the existing genesis plan [evidence: .planning/GENESIS.md]. That should not be funded as a growth plan until the first 100 paid submissions show conversion, delivery, and response-quality signals [assumption: EIR gate discipline].

Sales motion: no enterprise sales before the consumer funnel validates at $5 to $25 [evidence: .planning/GENESIS.md; apps/api/src/routes/payments.ts]. The operator should collect structured reasons for non-conversion, bounce failures, and official replies before adding subscriptions or organization APIs [assumption: EIR operating plan].

## Financial Model

Base price uses $15 average package [evidence: apps/api/src/routes/payments.ts]. Direct COGS uses the $0.60 full-spread estimate for every job as a conservative code-evidenced proxy [evidence: apps/worker/src/lib/treasury.ts]. Fixed platform burn uses $132.50 per month, or $1,590 per year [evidence: .planning/PROJECT.md].

| Year | Paid jobs | Revenue build | Revenue | Direct COGS | Fixed platform burn | Contribution before labor |
| --- | --- | --- | --- | --- | --- | --- |
| Year A | 600 jobs [assumption: beta launch volume] | 600 x $15 [evidence: apps/api/src/routes/payments.ts] | $9,000 [assumption: arithmetic] | $360 [assumption: 600 x $0.60 evidence-based proxy] | $1,590 [evidence: .planning/PROJECT.md] | $7,050 [assumption: arithmetic] |
| Year B | 2,400 jobs [assumption: narrow wedge repeatability] | 2,400 x $15 [evidence: apps/api/src/routes/payments.ts] | $36,000 [assumption: arithmetic] | $1,440 [assumption: 2,400 x $0.60 evidence-based proxy] | $1,590 [evidence: .planning/PROJECT.md] | $32,970 [assumption: arithmetic] |
| Year C | 4,800 jobs [evidence: .planning/existing-state.md planned month-twelve scale] | 4,800 x $15 [evidence: apps/api/src/routes/payments.ts] | $72,000 [assumption: arithmetic] | $2,880 [assumption: 4,800 x $0.60 evidence-based proxy] | $1,590 [evidence: .planning/PROJECT.md] | $67,530 [assumption: arithmetic] |

Revenue assumptions: $15 average package [evidence: apps/api/src/routes/payments.ts]; 600 paid jobs in Year A [assumption: beta target]; 2,400 paid jobs in Year B [assumption: repeatability target]; 4,800 paid jobs in Year C [evidence: .planning/existing-state.md planned scale].

Cost assumptions: $0.60 direct job cost proxy [evidence: apps/worker/src/lib/treasury.ts]; $132.50 monthly platform burn [evidence: .planning/PROJECT.md]; operator labor excluded because registry flags this as personal/research and not near-term investible [evidence: dispatch registry note].

Sensitivity tests: if conversion is 1% instead of 3%, keep as research asset [assumption: .planning/PROJECT.md uses 3% as gate]; if deliverability is below 85%, pause paid delivery [evidence: .planning/PROJECT.md]; if direct job cost rises to $2.00, $15 average package still has $13 gross spread before fixed costs and payment fees [assumption: arithmetic stress test].

## Risks & Anti-Plan

Anti-plan, written skeptically: do not invest as a venture until the identity mismatch, customer demand, delivery, and compliance risks are resolved. The repo says Brooks History in dispatch but CivicState in product files; a confused data room fails diligence before product metrics matter [evidence: dispatch project id; package.json; .planning/PROJECT.md].

Hole: consumers may not pay for civic letters. Mitigation: charge before delivery and measure paid conversion. Residual risk: the 3% conversion gate is unvalidated [evidence: .planning/PROJECT.md].

Hole: government email delivery may fail or create reputational risk. Mitigation: Postmark webhooks, bounce counts, spam complaint suppression, and domain warming are represented in code/planning. Residual risk: 85% inbox placement is still an assumption until production tests run [evidence: apps/api/src/routes/webhooks.ts; .planning/PROJECT.md].

Hole: legal-adjacent drafting can hallucinate, defame, or mislead users. Mitigation: citation verification, AI disclosure, not-legal-advice copy, and moderation exist in code. Residual risk: no legal opinion is present in the repo [evidence: apps/worker/src/agents/researcher.ts; apps/api/src/lib/moderation.ts; apps/worker/src/agents/drafter.ts].

Hole: local official coverage depends on Cicero or BallotReady, and the Cicero client is explicitly a stub. Mitigation: launch where federal/state coverage is sufficient. Residual risk: local coverage may remain below 60% [evidence: apps/api/src/lib/officials/cicero.ts; .planning/PROJECT.md].

Hole: WrkPlug posture conflicts with current direct Clerk/Stripe implementation. Mitigation: operator decides whether to keep direct rails or migrate. Residual risk: duplicated platform work weakens wrk portfolio leverage [evidence: apps/api/src/routes/payments.ts; apps/web/app/layout.tsx].

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
| --- | --- | --- | --- |
| Users will pay $5 to $25 | Existing pricing model | [evidence: apps/api/src/routes/payments.ts] | Run paid beta and measure checkout completion |
| 3% conversion is enough to continue | Existing validation gate | [evidence: .planning/PROJECT.md] | Track preview-to-payment conversion |
| 85% deliverability is required | Existing validation gate | [evidence: .planning/PROJECT.md] | Seed monitored .gov and municipal inbox tests |
| TAM is $150,000,000 | Bottom-up planning envelope | [assumption: no network; unsourced task count] | Replace with external civic engagement and payment data |
| SEO can acquire users | Genesis distribution hypothesis | [evidence: .planning/GENESIS.md] | Publish opt-in pages and monitor impressions |
| One operator can manage launch exceptions | Genesis assumption | [evidence: .planning/GENESIS.md] | Measure flagged queue depth and time-to-resolution |
| Local coverage can reach 60% | Existing validation gate | [evidence: .planning/PROJECT.md] | Compare Cicero/BallotReady results on beta ZIP codes |

## Self-Valuation

Score: 42 out of 100 [assumption: EIR judgment]. This is watchlist quality, not an investible BOS asset, until the operator confirms this repo should pitch as a business and the validation gates clear [evidence: dispatch registry note].

Under the $5,000,000 per-business program assumption [assumption: wrk.vc program framing], BASE value is $200,000 [assumption: functioning prototype plus unvalidated demand], BULL value is $1,250,000 [assumption: conversion above 3%, deliverability above 85%, and repeatable acquisition], and BEAR value is $0 as a venture [assumption: identity mismatch or demand failure].

Comparables used: Resistbot, Quorum, and VoterVoice from repo planning [evidence: .planning/PROJECT.md; MASTER_PLAN.md], plus generic AI writing tools as an unsourced substitute category [assumption: model knowledge, no network]. What moves valuation: paid submissions, verified delivery, official response rate, CAC, compliance review, and identity resolution.

## Milestones

By 2026-07-15 [assumption: operator planning date], resolve identity: either rename the soul/code to Brooks History or confirm CivicState is the asset in the Brooks History repo.

By 2026-08-01 [assumption: operator planning date], run a paid beta with at least 100 submission attempts [assumption: first meaningful funnel size] and report preview-to-payment conversion against the 3% gate [evidence: .planning/PROJECT.md].

By 2026-08-15 [assumption: operator planning date], complete official coverage testing across 25 ZIP codes [assumption: practical sample size] and report federal/state/local coverage against the 95% and 60% gates [evidence: .planning/PROJECT.md].

By 2026-09-01 [assumption: operator planning date], complete deliverability testing and decide whether email-first delivery can continue against the 85% gate [evidence: .planning/PROJECT.md].

## Surprise Spikes

Project identity spike: dispatch says project id `brooks-history` and repo `RPLogic-Inc/brookss-history`, but every substantive local product artifact found in this run describes CivicState [evidence: dispatch; package.json; .planning/PROJECT.md; MASTER_PLAN.md].

Build-state spike: `.planning/existing-state.md` says zero application code exists, but this repo contains app, API, worker, Prisma, tests, payments, webhooks, and dashboard code [evidence: .planning/existing-state.md; apps/api/src/routes/submissions.ts; packages/shared/prisma/schema.prisma].

Roadmap spike: `.planning/ROADMAP.md` marks all phases complete, while `.planning/REQUIREMENTS.md` still shows many core user-facing requirements as pending [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md].

Investability spike: registry says this is a personal/research asset and not near-term investible BOS, while the existing planning docs pitch a transactional civic-tech business [evidence: dispatch registry note; .planning/PROJECT.md].
