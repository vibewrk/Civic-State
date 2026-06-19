# CivicState / brooks-history - Business Plan

## Thesis

CivicState can become a paid civic-action utility if ordinary United States residents will pay **$5** [evidence: tests/payment.test.ts] to **$25** [evidence: tests/payment.test.ts] for a researched, citation-backed letter workflow that identifies officials, drafts compliant correspondence, takes payment, and tracks delivery, while the operator treats the current `brooks-history` registry mismatch as a validation blocker rather than an investible fact [evidence: dispatch registry notes].

As of **2026-06-19** [evidence: worker current_date], this repo is not a personal history archive in substance; it is a CivicState civic-tech application with Next.js, Express, BullMQ workers, Prisma, Clerk, Stripe, Postmark, Anthropic, and legal/compliance surfaces [evidence: package.json; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma]. That mismatch is material to the investment case and must be operator-confirmed before wrk.vc positioning [evidence: dispatch registry notes].

## Problem & Customer

The core customer is a United States resident with a concrete civic problem who would contact a public official if the research, jurisdiction routing, formal drafting, and delivery mechanics were handled for them [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. The repo narrows the launch job to constituent communications, not legal advice, legal filings, lobbying representation, or claim submission [evidence: MASTER_PLAN.md; apps/web/app/terms/page.tsx].

Primary ICP:

- Individual residents with local, state, or federal civic concerns who need help turning plain-language frustration into official correspondence [evidence: .planning/PROJECT.md].
- Mobile-first users willing to preview value before account creation, with authentication required at payment [evidence: apps/web/middleware.ts; .planning/REQUIREMENTS.md].
- Users comfortable with AI disclosure and human review for flagged content [evidence: apps/web/app/privacy/page.tsx; tests/api-routes.test.ts].

Non-customers at launch:

- Businesses, lobbying firms, legal claimants, campaigns, bulk advocacy organizations, and anyone seeking automated legal demands [evidence: MASTER_PLAN.md].
- Minors under **13** [evidence: apps/web/app/terms/page.tsx].
- Users seeking multilingual, certified mail, fax, mobile-native, coalition, or API workflows in launch scope [evidence: .planning/REQUIREMENTS.md].

Current alternatives are manual email, phone calls, generic petition platforms, SMS civic tools such as Resistbot, petition networks such as Change.org, legal-document providers such as LegalZoom, and full advocacy SaaS sold to organizations [assumption: category mapping from model knowledge, not externally refreshed]. The user pain is not only writing; it is knowing who has authority, which citations are relevant, what tone is safe, and whether delivery happened [evidence: .planning/PROJECT.md; tests/officials.test.ts; tests/citation-verifier.test.ts].

## Market

Workspace-only market sizing uses a bottom-up paid-workflow method because no external market database was available in this run.

TAM method: **1,000,000** paid civic-letter jobs per year in the United States at **$12.50** blended average order value, producing **$12,500,000** annual gross transaction revenue [assumption: model-based placeholder for national paid civic-action intent; pricing mix is grounded in repo tiers]. This is not a sourced market estimate and should not be shown as investor fact until validated.

SAM method: **120,000** reachable paid jobs per year through SEO, direct search, and civic issue landing pages at **$12.50** blended average order value, producing **$1,500,000** annual revenue capacity [assumption: operator-reachable slice equal to one-tenth of placeholder TAM; requires channel validation].

SOM method: **4,800** paid campaigns per year, matching the repo's planning scale of **400** campaigns per month, at **$12.50** blended average order value, producing **$60,000** annual revenue [evidence: .planning/existing-state.md for campaign planning scale; assumption: all campaigns are paid at blended AOV].

Early proof market: **250** paid submissions in a launch quarter at **$12.50** blended average order value equals **$3,125** gross revenue [assumption: first validation target sized for a single operator]. This proof market is the only market claim suitable for near-term execution.

The market should be treated as unproven until **2026-09-30** [assumption: next-quarter validation date] because the registry explicitly says this is on a watchlist and "not near-term investible BOS" without operator confirmation [evidence: dispatch registry notes].

## Product & Moat

Real today:

- A monorepo with `apps/web`, `apps/api`, `apps/worker`, and `packages/shared` exists [evidence: package.json; pnpm-workspace.yaml].
- The API registers health, submissions, officials, webhooks, payments, campaigns, admin, compliance, and Bull Board routes [evidence: apps/api/src/index.ts].
- Worker agents exist for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/index.ts].
- Prisma models cover users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- Tests cover API routes, officials lookup, citation verification, moderation, payment, delivery, campaigns, compliance, treasury, and admin surfaces [evidence: tests/api-routes.test.ts; tests/officials.test.ts; tests/payment.test.ts].
- Legal pages and AI disclosure language exist in the web app [evidence: apps/web/app/privacy/page.tsx; apps/web/app/terms/page.tsx; apps/web/app/about/page.tsx].

Still aspirational or unvalidated:

- Real demand for paid civic letters is unproven [evidence: .planning/PROJECT.md says validated requirements are none].
- Deliverability to government inboxes is not proven by production data [assumption: no production delivery metrics found in repo].
- Official contact coverage is dependent on external APIs and local-provider decisions [evidence: apps/api/src/lib/officials; tests/officials.test.ts].
- Citation quality at production scale is not proven by market usage [assumption: no production usage logs found in repo].

Moat hypothesis:

- Short-term moat is execution discipline: citation verification, moderation, opt-out enforcement, payment gating, and treasury controls reduce compliance failures [evidence: tests/citation-verifier.test.ts; tests/moderation.test.ts; tests/treasury.test.ts].
- Medium-term moat would be a verified officials/contact graph, reusable regulation citation library, and delivery outcome history [evidence: .planning/GENESIS.md; packages/shared/prisma/schema.prisma].
- The moat is weak below **1,000** monthly submissions [evidence: .planning/GENESIS.md] and should be scored as provisional until volume exists [assumption: data moat requires repeated proprietary interactions].

## Platform Posture

CivicState should posture as a WrkPlug client, not as a company rebuilding commodity chassis functions. Under the current wrk.dog portfolio strategy, this venture should consume shared auth, billing, identity, and login where available, with one MCPWrk account and the EAI Layer-0 contract behind it [assumption: WrkPlug Phase 0 not yet signed].

Current repo reality differs: it has direct Clerk, Stripe, Postmark, Anthropic, BullMQ, Express, and Next.js wiring [evidence: package.json; apps/api/package.json; apps/web/package.json]. The business consequence is clear: if WrkPlug becomes available, CivicState should reduce bespoke identity and billing surface area; if not, the current standalone SaaS stack remains buildable but carries higher maintenance and compliance burden [assumption: shared-rails cost advantage depends on actual WrkPlug adoption].

## Business Model

Revenue model:

- `single`: **$5.00** for **1** official [evidence: tests/payment.test.ts].
- `three_pack`: **$15.00** for **3** officials [evidence: tests/payment.test.ts].
- `full_spread`: **$25.00** for all matched officials [evidence: tests/payment.test.ts].
- Blended AOV base case: **$12.50** from a **40%** single, **45%** three-pack, **15%** full-spread mix [assumption: launch mix until Stripe data exists].

Unit economics:

- Pricing tests assert cost estimates of **$0.20**, **$0.40**, and **$0.60** per tier and gross margins above **90%** [evidence: tests/payment.test.ts].
- The older master plan estimated tier COGS of **$0.60** to **$10.00** depending on complexity [evidence: MASTER_PLAN.md], so the plan should use the wider range until production token and human-review costs are measured.
- Payment processing and vendor costs must remain below a **40%** net margin floor [evidence: .planning/PROJECT.md; MASTER_PLAN.md].
- Chargebacks are targeted below **0.5%** [evidence: MASTER_PLAN.md].

Revenue streams:

- Launch: transactional letter delivery only [evidence: .planning/REQUIREMENTS.md].
- Deferred: priority review, API access for HOAs/nonprofits, certified mail/fax, public campaign SEO, and reply summarization [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].
- Not included: subscriptions, crowdfunding, coalition/social mechanics, paid acquisition, legal services, or lobbying representation [evidence: .planning/GENESIS.md; apps/web/app/terms/page.tsx].

## Competition

Named competitors and substitutes:

- Resistbot: SMS-oriented constituent messaging substitute; CivicState positions on researched citations, preview, payment, and delivery tracking [assumption: competitor positioning from model knowledge; repo names Resistbot as closest competitor in .planning/PROJECT.md].
- Change.org: petition-hosting substitute; CivicState positions on individualized letters and official targeting [assumption: category knowledge; repo names Change.org in MASTER_PLAN.md].
- LegalZoom: legal/document-drafting substitute; CivicState must avoid legal advice and stay in constituent correspondence [assumption: category knowledge; repo names LegalZoom in MASTER_PLAN.md].
- Quorum / VoterVoice-style advocacy SaaS: enterprise advocacy tooling substitute; CivicState positions as individual, transactional, and low-price [assumption: category knowledge; repo references enterprise platforms in .planning/PROJECT.md].
- Manual email and phone calls: free incumbent; CivicState wins only if research and routing save enough effort to justify **$5** to **$25** [evidence: tests/payment.test.ts; assumption: willingness-to-pay not validated].

Competitive risk is high because the core UX can be copied. Durable advantage depends on verified official contacts, deliverability reputation, citation quality, compliance controls, and SEO authority, none of which are proven at launch [assumption: defensibility analysis].

## Go-To-Market

First validation goal: secure the first **100** paying users by **2026-09-30** [assumption: operator-set validation target] without paid ads [evidence: .planning/GENESIS.md excludes paid acquisition].

Channels:

- SEO pages around specific civic jobs, official-contact queries, and public campaign records [evidence: MASTER_PLAN.md; .planning/GENESIS.md].
- Direct sharing of user-approved campaign pages once publishing is safe [evidence: MASTER_PLAN.md].
- Local issue communities, neighborhood groups, and civic newsletters as manual outreach sources [assumption: practical early-channel hypothesis].
- Founder/operator-assisted concierge flow for the first **25** paid submissions to learn failure modes before scaling automation [assumption: risk-control tactic].

Conversion gates:

- Preview-to-payment conversion of at least **3%** [evidence: .planning/PROJECT.md].
- Government email inbox placement of at least **85%** [evidence: .planning/PROJECT.md].
- Federal/state official coverage of at least **95%** and local coverage of at least **60%** [evidence: .planning/PROJECT.md].

The first channel that should be killed is broad "civic participation" messaging. It is too vague. Landing pages should target narrow jobs like "write to my city council about noise enforcement" [assumption: search-intent strategy].

## Financial Model

All figures below are planning assumptions unless explicitly tagged as evidence. The model reconciles as paid submissions multiplied by blended AOV, then subtracts variable cost and fixed platform cost.

| Year | Paid submissions | Blended AOV | Revenue | Variable COGS | Gross profit | Fixed platform/vendor | Contribution before headcount |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Launch year | **3,000** [assumption: **250** per month average] | **$12.50** [assumption: pricing mix] | **$37,500** [assumption: submissions x AOV] | **$6,750** [assumption: **$2.25** avg COGS] | **$30,750** [assumption: revenue minus COGS] | **$4,200** [assumption: hosting, email, monitoring, legal templates] | **$26,550** [assumption: before operator labor] |
| Growth year | **12,000** [assumption: **1,000** per month average] | **$13.75** [assumption: more three-pack/full-spread] | **$165,000** [assumption: submissions x AOV] | **$33,000** [assumption: **$2.75** avg COGS] | **$132,000** [assumption: revenue minus COGS] | **$18,000** [assumption: paid local data and compliance support] | **$114,000** [assumption: before headcount] |
| Scale test year | **48,000** [assumption: **4,000** per month average] | **$14.25** [assumption: improved mix] | **$684,000** [assumption: submissions x AOV] | **$168,000** [assumption: **$3.50** avg COGS] | **$516,000** [assumption: revenue minus COGS] | **$72,000** [assumption: managed infrastructure, data providers, support] | **$444,000** [assumption: before headcount] |

Revenue assumptions:

- Paid submissions are the primary driver; no subscription revenue is included [evidence: .planning/GENESIS.md].
- Average order value starts at **$12.50** [assumption: pricing-tier mix] and rises only if tier mix shifts.
- No API revenue is counted before the scale test year [assumption: deferred roadmap].

Cost assumptions:

- DigitalOcean launch backend cost starts near **$96/month** [evidence: MASTER_PLAN.md].
- Managed database, storage, or local official data can add **$50/month** to **$500/month** [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- Human review is modeled as operator time, not salary, until paid volume exceeds **1,000** submissions per month [assumption: single-operator launch].

Sensitivity tests:

- Downside conversion: if preview-to-payment is **1%** instead of **3%**, SEO traffic must triple to hit the same revenue [assumption: conversion sensitivity; **3%** target from .planning/PROJECT.md].
- Downside COGS: if average COGS reaches **$7.50**, launch-year gross profit falls from **$30,750** to **$15,000** [assumption: financial sensitivity].
- Downside deliverability: if inbox placement is **60%** instead of **85%**, refund/support load likely breaks trust before revenue scale [assumption: deliverability sensitivity; **85%** target from .planning/PROJECT.md].

## Risks & Anti-Plan

The skeptical partner case is strong:

- This may not be a venture business. The registry says watchlist, personal/research asset, and not near-term investible BOS unless the operator confirms the pitch [evidence: dispatch registry notes]. Mitigation: position as validation asset until **2026-09-30** [assumption: operator validation date]. Residual risk: high.
- Users may not pay for civic letters because free manual email and free civic tools are good enough [assumption: willingness-to-pay risk]. Mitigation: measure preview-to-payment conversion before scaling. Residual risk: high.
- Government inbox deliverability may fail, making the core promise unreliable [evidence: .planning/PROJECT.md identifies deliverability as hardest problem]. Mitigation: domain warming, per-domain bounce monitoring, suppression, and refund policy [evidence: MASTER_PLAN.md; apps/web/app/terms/page.tsx]. Residual risk: high.
- AI citations can hallucinate or become stale, creating trust and compliance risk [evidence: .planning/REQUIREMENTS.md requires citation verification]. Mitigation: programmatic verification, stripping unverified citations, human review. Residual risk: medium.
- Civic content can trigger payment processor, abuse, defamation, harassment, or political-risk reviews [evidence: MASTER_PLAN.md; tests/moderation.test.ts]. Mitigation: content moderation, audit logs, Stripe/Mercury posture, explicit terms. Residual risk: medium.
- The `brooks-history` project identity conflicts with the CivicState implementation [evidence: dispatch project id; package.json]. Mitigation: operator must decide whether this repo is renamed, repurposed, or removed from investible pipeline. Residual risk: high.

Anti-plan: do not spend on paid ads, partnerships, enterprise sales, public social features, API products, certified mail, or multilingual support until a single narrow loop proves paid demand, citation trust, and delivery reliability [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
| --- | --- | --- | --- |
| Residents will pay **$5** to **$25** for this workflow | Repo pricing tiers | [evidence: tests/payment.test.ts] plus [assumption: demand unproven] | Run paid beta and measure conversion |
| Blended AOV is **$12.50** | Tier mix model | [assumption: **40%** / **45%** / **15%** mix] | Stripe cohort report |
| Preview-to-payment target is **3%** | Existing project gate | [evidence: .planning/PROJECT.md] | Track wizard funnel |
| Inbox placement target is **85%** | Existing project gate | [evidence: .planning/PROJECT.md] | Seed inbox and Postmark telemetry |
| Local official coverage target is **60%** | Existing project gate | [evidence: .planning/PROJECT.md] | ZIP sampling across states |
| Gross margin above **90%** is possible | Test cost estimates | [evidence: tests/payment.test.ts] | Compare actual token, email, and review costs |
| Watchlist status blocks VC-grade pitch | Registry note | [evidence: dispatch registry notes] | Operator ruling before wrk.vc dossier |

## Self-Valuation

Current score: **42/100** [assumption: EIR judgment from repo completeness, watchlist status, and unvalidated demand].

Twelve-month valuation bands under the **$5,000,000** per-business program assumption [assumption: wrk.vc portfolio framing supplied by brief]:

- BEAR: **$50,000** value if this remains a personal/research asset or cannot prove paid demand [assumption: asset/IP value only].
- BASE: **$350,000** value if it reaches **250** monthly paid submissions, **3%** conversion, and **85%** inbox placement by **2026-12-31** [assumption: early revenue multiple].
- BULL: **$1,200,000** value if it reaches **1,000** monthly paid submissions, positive contribution margin, and repeatable SEO acquisition by **2026-12-31** [assumption: small SaaS/revenue multiple].

Comparables used only as directional categories: Resistbot-like civic messaging, Change.org-like petition workflows, LegalZoom-like assisted document creation, and Quorum/VoterVoice-like advocacy tooling [assumption: model knowledge, not current external comps]. What moves valuation: paid conversion, actual deliverability, citation accuracy, regulator/payment-processor safety, and a clear operator decision that this is CivicState rather than brooks-history.

## Milestones

- **2026-06-19** [evidence: worker current_date]: Soul upgrade creates business plan, gate JSON, roadmap, and decisions entry.
- **2026-07-15** [assumption: validation schedule]: Operator resolves naming/registry posture and decides whether this is investible CivicState or non-investible research.
- **2026-08-15** [assumption: validation schedule]: Run a closed paid beta with at least **25** paid submissions and manual review on every send.
- **2026-09-30** [assumption: validation schedule]: Decide continue/kill based on **3%** conversion, **85%** deliverability, **95%** federal/state coverage, **60%** local coverage, and support burden.
- **2026-12-31** [assumption: validation schedule]: Only pursue scale if monthly paid submissions exceed **250** and refund/complaint rates are acceptable.

## Surprise Spikes

- The dispatch says `PROJECT: brooks-history` and repo `RPLogic-Inc/brookss-history`, while the actual product docs, package metadata, app copy, tests, and code describe CivicState [evidence: dispatch; package.json; apps/web/app/page.tsx; .planning/PROJECT.md].
- The registry says personal/research asset and not near-term investible BOS, but the repo contains a transactional civic-tech SaaS stack with payment, delivery, admin, compliance, and worker surfaces [evidence: dispatch registry notes; apps/api/src/index.ts; apps/worker/src/index.ts].
- `.planning/existing-state.md` claims zero application code, while the current tree has implemented app packages and tests [evidence: .planning/existing-state.md; apps; tests].
- MASTER_PLAN.md still includes older assumptions such as dynamic pricing and broader agent scope, while tests and requirements now show hardcoded tiers and a narrower launch path [evidence: MASTER_PLAN.md; tests/payment.test.ts; .planning/PROJECT.md].
