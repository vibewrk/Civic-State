# CivicState / brooks-history - Business Plan

## Thesis

As of 2026-06-23 [evidence: dispatch current_date], this repo is best treated as a watchlist civic-tech research asset, not a near-term investible BOS, until an operator confirms whether the `brooks-history` registry identity should pitch the actual CivicState product in this repository [evidence: dispatch registry notes; package.json; .planning/PROJECT.md]. The falsifiable thesis is: US residents will pay $5, $15, or $25 per civic letter campaign [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] if the product reliably collapses issue research, official targeting, citation verification, letter drafting, payment, and delivery into one workflow [evidence: .planning/PROJECT.md; apps/api/src/routes/submissions.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/delivery.ts].

## Problem & Customer

The repo's real product is CivicState: a constituent communication platform for ordinary US residents who have a civic issue but lack the time, legal source fluency, official lookup workflow, and writing conventions needed to contact government effectively [evidence: .planning/PROJECT.md; .planning/GENESIS.md]. The initial customer is an individual constituent, not an organization, PAC, law firm, or lobbying shop [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

Customer definition:

- Primary ICP: US resident with a specific local, state, or federal civic concern and a desired outcome, willing to pay a one-time fee below perceived time cost [evidence: .planning/PROJECT.md; .planning/GENESIS.md].
- Launch wedge: people with concrete service, zoning, school, housing, enforcement, or policy issues where jurisdiction and citations matter [assumption: category examples inferred from product positioning, not externally validated].
- Non-customer: anyone seeking legal advice, claim filing, regulatory filings, harassment, bulk political spam, or automated follow-up pressure campaigns [evidence: .planning/PROJECT.md; MASTER_PLAN.md; apps/api/src/lib/moderation.ts].
- Operator customer: one platform operator handling exceptions and review queues with no dedicated around-the-clock staff [evidence: .planning/PROJECT.md].

The pain is real enough to prototype, but not yet proven as a business. The repo has no workspace evidence of paid users, live traffic, delivered campaigns, or revenue as of 2026-06-23 [evidence: current repository state; .planning/existing-state.md is stale and contradicts current code].

## Market

Workspace-only sizing method: bottom-up from paid campaign counts and the current pricing model, not top-down civic-tech spending.

| Scope | Method | Annual revenue implication | Honesty label |
|---|---|---:|---|
| Beachhead SOM | 100 paid campaigns per month x $15 average price x 12 months | $18,000 | [assumption: conservative first-metro operating target using current $15 tier as midpoint] |
| Early SAM | 10,000 paid campaigns per year x $15 average price | $150,000 | [assumption: SEO-reachable civic issue queries are unvalidated in workspace-only mode] |
| Research TAM | 100,000 paid campaigns per year x $15 average price | $1,500,000 | [assumption: bounded consumer civic-letter niche, not total advocacy software spend] |

This is not a venture-scale market claim yet. It is a validation frame. The current repo can justify a small paid workflow experiment, but not a VC-scale market conclusion without external demand data, search volume, conversion evidence, and delivered-campaign response rates [assumption: investment judgment based on missing workspace evidence].

Key market tests:

- Will at least 3% of preview users pay after seeing drafted letters [evidence: .planning/PROJECT.md names this gate]?
- Can government email deliverability stay at or above 85% inbox placement [evidence: .planning/PROJECT.md names this gate]?
- Can federal/state official coverage reach 95% and local coverage reach 60% [evidence: .planning/PROJECT.md names this gate]?

## Product & Moat

Real today in the repo:

- Express API routes exist for submissions, officials, payments, campaigns, webhooks, compliance, admin, and health [evidence: apps/api/src/index.ts].
- Prisma schema covers users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- Worker agents exist for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/agents].
- Citation verification strips unverified eCFR and CourtListener citations and treats state cache citations as pre-verified [evidence: apps/worker/src/lib/legal/citation-verifier.ts; tests/citation-verifier.test.ts].
- Delivery code enforces opted-out official suppression, invalid-email skips, per-domain bounce checks above 10%, and Postmark delivery records [evidence: apps/worker/src/agents/delivery.ts].
- Stripe Checkout tiers are implemented at $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].

Aspirational or not yet validated:

- Local official lookup is still a Cicero stub returning no local officials unless future integration work happens [evidence: apps/api/src/lib/officials/cicero.ts].
- The repo has tests for business logic, but no workspace evidence of production traffic, paid conversions, live Stripe payments, or successful government inbox delivery [evidence: tests/payment.test.ts; tests/delivery.test.ts; current repository files].
- The master plan claims a compounding moat from official data, citation libraries, and public campaign archives, but that moat is volume-dependent and does not exist before meaningful campaign volume [evidence: .planning/GENESIS.md].

Defensibility is therefore operational, not proprietary: verified source discipline, deliverability hygiene, content moderation, and accumulated official response metadata. At low volume, incumbents and substitutes can copy the surface workflow [assumption: competitive analysis without network research].

## Platform Posture

Target posture for wrk.vc should say CivicState is a WrkPlug client under D-032, draft/operator-gated: the venture should consume shared auth, billing, identity, and login rails rather than independently owning those primitives [assumption: WrkPlug Phase 0 not yet signed; dispatch requires this posture]. This would lower infra burden and let shared-rails learning compound across the portfolio [assumption: WrkPlug platform economics not evidenced in this repo].

Surprise: the current code already implements Clerk auth and Stripe billing directly [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts]. If WrkPlug adoption becomes mandatory, the roadmap must include a migration or adapter plan rather than pretending the repo is already on shared rails.

## Business Model

CivicState currently supports one-time transactional pricing:

| Tier | Price | Included delivery | Evidence |
|---|---:|---|---|
| Single | $5 | 1 official | [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] |
| Three-pack | $15 | 3 officials | [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] |
| Full spread | $25 | all matched officials | [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] |

Current revenue model: pay after preview, then deliver via webhook-confirmed Stripe payment [evidence: apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts]. The launch plan excludes subscriptions, organization APIs, certified mail, coalition features, and community mechanics until the paid citizen workflow is validated [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

Unit economics from the master plan claim $1.20 COGS on a $15 package and 92% gross margin [evidence: MASTER_PLAN.md section 19.1]. Treat that as a planning estimate, not observed performance, because the workspace has no live cost ledger or revenue history [evidence: apps/worker/src/agents/treasury.ts; tests/treasury.test.ts].

Revenue expansion options, all unvalidated:

- Organization API for HOAs or nonprofits [evidence: .planning/PROJECT.md lists future API consumers].
- Certified mail or fax add-ons after email deliverability proof [evidence: .planning/REQUIREMENTS.md v2 requirements].
- Public campaign archive SEO if users explicitly opt in [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

## Competition

Named alternatives and substitutes:

| Competitor / substitute | Position | CivicState angle | Honesty label |
|---|---|---|---|
| Resistbot | Consumer civic messaging substitute | CivicState adds legal-source research, citation verification, paid delivery tracking | [assumption: model-memory competitor characterization, not network verified] |
| Countable | Civic engagement and issue action substitute | CivicState focuses on personalized researched letters, not broad issue mobilization | [assumption: model-memory competitor characterization, not network verified] |
| Quorum | Enterprise public-affairs platform | CivicState targets individuals at $5-$25 rather than enterprise contracts | [assumption: model-memory competitor characterization, not network verified] |
| VoterVoice / FiscalNote family | Organization advocacy tooling | CivicState avoids organization campaigns at launch | [assumption: model-memory competitor characterization, not network verified] |
| Manual Google search plus email | Default substitute | CivicState bundles the work into one paid workflow | [evidence: .planning/GENESIS.md describes replaced steps] |
| Legal services / lawyers | High-trust substitute for legal matters | CivicState must not cross into legal advice or filings | [evidence: .planning/PROJECT.md; MASTER_PLAN.md] |

The sharp competitive concern is not that nobody else exists. It is that individual willingness to pay may be too low while enterprise incumbents own the budgets [assumption: investor anti-thesis based on workspace-only evidence].

## Go-To-Market

The existing soul bets on SEO from opt-in public campaign pages and social sharing [evidence: .planning/GENESIS.md]. Keep that as the low-cash hypothesis, but make the first wedge more manual and measurable:

- First cohort: one metro area and one or two issue categories chosen for official-data coverage and low legal-risk content [assumption: launch containment strategy].
- First 25 paid campaigns: manually recruit from local civic groups, neighborhood forums, tenant groups, parent groups, or municipal issue communities [assumption: channel list from common civic contexts, not externally researched].
- First 100 paid campaigns: use delivered campaign pages, reply screenshots where allowed, and issue-specific landing pages only after opt-in consent [assumption: staged GTM target].
- Conversion gate: preview-to-paid conversion at or above 3% [evidence: .planning/PROJECT.md].
- Quality gate: zero fabricated citations in sent letters [assumption: must be zero-tolerance because citation errors create trust and legal risk].

Paid acquisition should stay off-plan until the unit funnel is known. Partnerships with nonprofits or legal clinics should be treated as discovery conversations, not a committed revenue channel [assumption: no partnership evidence in repo].

## Financial Model

Planning assumptions:

- Average price starts at $15 [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md section 19.2].
- Variable cost plus processor fees modeled at 12% of revenue [assumption: combines MASTER_PLAN.md section 19.3 variable COGS of 8% and Stripe fees of 4%].
- Fixed platform costs start at $200 per month [evidence: MASTER_PLAN.md section 19.3].
- Operator labor is excluded in the first experimental stage, then added once volume requires routine review [assumption: watchlist/research asset model].

| Model year | Revenue build | Revenue | Variable cost and fees | Fixed platform cost | Headcount / operator cost | Contribution before tax | Honesty label |
|---|---|---:|---:|---:|---:|---:|---|
| Validation year | 50 campaigns/month x $15 x 12 months | $9,000 | $1,080 | $2,400 | $0 | $5,520 | [assumption: arithmetic model built from current pricing plus MASTER_PLAN.md planning estimates; not observed results] |
| Early SEO year | 150 campaigns/month x $16 x 12 months | $28,800 | $3,456 | $3,600 | $0 | $21,744 | [assumption: arithmetic model built from current pricing plus MASTER_PLAN.md planning estimates; not observed results] |
| Operating year | 400 campaigns/month x $18 x 12 months | $86,400 | $10,368 | $6,000 | $30,000 | $40,032 | [assumption: arithmetic model built from current pricing plus MASTER_PLAN.md planning estimates; not observed results] |

Sensitivity tests:

- If preview-to-paid conversion is 1% instead of 3%, the product stays research-only until pricing or targeting changes [assumption: conversion downside].
- If deliverability falls below 85%, the product cannot promise official delivery and should pause paid sending [evidence: .planning/PROJECT.md names 85% as a gate].
- If local official coverage stays at 0 because the Cicero stub is not replaced, local civic issues are not sellable at full-spread pricing [evidence: apps/api/src/lib/officials/cicero.ts].
- If Stripe or email compliance flags civic content, the payment and delivery loop can stop immediately [assumption: regulated-content platform risk; MASTER_PLAN.md discusses payment freeze risk].

## Risks & Anti-Plan

Kill-case view:

- The project may be misregistered: the dispatch says `brooks-history`, while the repo code and planning corpus say CivicState [evidence: dispatch project id; package.json; .planning/PROJECT.md]. Mitigation: operator identity ruling before any wrk.vc pitch. Residual risk: dossier trust is damaged if the asset name and product do not match.
- The market may be tiny: consumers might like previews but refuse to pay even $5 [evidence: current $5 tier in apps/api/src/routes/payments.ts; no revenue evidence]. Mitigation: run the first paid conversion test before building SEO scale. Residual risk: becomes a useful civic tool, not a venture-backed business.
- Local official coverage is not implemented: the Cicero client is a stub [evidence: apps/api/src/lib/officials/cicero.ts]. Mitigation: pick a launch category where federal/state lookup is enough or implement a paid local provider. Residual risk: the product fails the most common local-use cases.
- Legal-adjacent risk is structural: users may submit defamation, threats, unverifiable claims, or requests that look like legal advice [evidence: apps/api/src/lib/moderation.ts; .planning/PROJECT.md]. Mitigation: strict moderation and "not legal advice" framing. Residual risk: one bad letter can create reputational or compliance issues.
- Email deliverability is the hardest operational dependency: government servers can bounce, filter, or complain [evidence: .planning/PROJECT.md; apps/worker/src/agents/delivery.ts]. Mitigation: domain warming, bounce thresholds, opt-out suppression. Residual risk: the core promise fails despite good drafting.
- The claimed moat is late-forming: official data and citation libraries only become defensible after meaningful volume [evidence: .planning/GENESIS.md]. Mitigation: do not oversell moat pre-traction. Residual risk: incumbent or open-source substitutes replicate the workflow.

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| People will pay for one-off civic letters | Current pricing and product thesis | $5/$15/$25 tiers [evidence: apps/api/src/routes/payments.ts] | Measure paid conversion after preview |
| The beachhead can reach 100 campaigns/month | Small manual metro launch model | [assumption: no workspace demand data] | Recruit cohort and track monthly paid campaigns |
| Citation verification can keep hallucinations out of sent letters | Verification code exists | [evidence: apps/worker/src/lib/legal/citation-verifier.ts; tests/citation-verifier.test.ts] | Audit every sent citation in beta |
| Email delivery is sufficient for launch | Existing plan excludes certified mail | [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md] | Track delivered, bounced, spam complaint, and official reply rates |
| SEO can become primary acquisition | Genesis distribution hypothesis | [evidence: .planning/GENESIS.md] | Publish opt-in pages and measure search impressions |
| WrkPlug rails reduce cost and improve portfolio moat | Dispatch requires posture | [assumption: WrkPlug Phase 0 not yet signed] | Operator decision plus adapter design |
| This should be pitched as CivicState, not brooks-history | Repo content is CivicState | [evidence: package.json; .planning/PROJECT.md] | Operator registry correction |

## Self-Valuation

Score: 4.2 out of 10 [assumption: EIR judgment under watchlist constraint].

Under the $5,000,000-per-business program assumption [assumption: dispatch program frame], current value should be marked as a discounted option, not a live business. Suggested 12-month bands are a planning frame [assumption: valuation horizon chosen for wrk.vc dossier style]:

- Bear: $0 to $25,000 if identity remains unresolved, local lookup stays stubbed, or no paid campaigns convert [assumption: no external comps].
- Base: $100,000 to $250,000 if the repo delivers beta campaigns, proves paid conversion above 3%, and demonstrates reliable citation/delivery operations [assumption: milestone-based valuation].
- Bull: $750,000 to $1,250,000 if paid campaigns reach 400 per month with defensible compliance metrics and repeatable organic acquisition [assumption: modeled from financial table, not market comps].

Comparables used only directionally: Resistbot, Quorum, VoterVoice, and LegalZoom-like consumer workflow packaging [assumption: model-memory comparables, not network verified]. What would move valuation: verified paid revenue, official reply outcomes, low complaint rates, local official coverage, and a clear WrkPlug integration decision.

## Milestones

- 2026-06-23: complete EIR soul upgrade and mark gate `needs-revision` pending operator adoption [evidence: dispatch current_date].
- 2026-07-15: operator resolves whether registry project `brooks-history` is actually CivicState, a rename, or the wrong repo [assumption: near-term governance milestone].
- 2026-07-31: replace or explicitly scope around the Cicero local-official stub [assumption: single-worker roadmap milestone].
- 2026-08-15: run an end-to-end sandbox campaign through submission, citation verification, Stripe test payment, webhook, and Postmark test delivery [assumption: build validation milestone].
- 2026-09-15: run first controlled paid beta with at least 25 campaigns and no fabricated citations [assumption: beta milestone].

## Surprise Spikes

- Identity mismatch: dispatch says `brooks-history` and repo says CivicState [evidence: dispatch project id; package.json; .planning/PROJECT.md].
- Stale planning conflict: `.planning/existing-state.md` says zero application code, while the current tree includes API, web, worker, Prisma, and tests [evidence: .planning/existing-state.md; apps; packages; tests].
- Roadmap overstates completion: `.planning/ROADMAP.md` marks phases complete, while `.planning/REQUIREMENTS.md` still has many launch requirements unchecked [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md].
- Current implementation uses direct Clerk and Stripe, while the required wrk.vc platform posture wants WrkPlug shared rails [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts; dispatch brief].
