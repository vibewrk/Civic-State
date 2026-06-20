# CivicState / brooks-history - Business Plan

## Thesis

As of 2026-06-20 [evidence: dispatch current_date], CivicState should be treated as a buildable civic-tech research asset, not an investible standalone business, until it proves that ordinary US residents will pay for researched constituent letters and that officials will receive them reliably [evidence: registry note says "Watchlist" and "personal/research asset, not near-term investible BOS"].

The falsifiable thesis: if a user can convert a concrete civic concern into a citation-backed letter campaign in minutes, enough residents will pay a low one-time fee to justify a small operator-led service [assumption: EIR synthesis from repo plans; no external research available].

## Evidence Sources

Workspace-only source pack as of 2026-06-20 [evidence: dispatch current_date]:

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence]
- [.planning/GENESIS.md](.planning/GENESIS.md) [evidence]
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) [evidence]
- [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence]
- [.planning/existing-state.md](.planning/existing-state.md) [evidence]
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence]
- [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts) [evidence]
- [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts) [evidence]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence]

## Problem & Customer

The target customer is a US resident with a specific civic frustration such as a local enforcement failure, zoning concern, school policy complaint, environmental concern, or agency responsiveness problem who would contact officials if research, jurisdiction routing, drafting, and delivery were handled for them [evidence: .planning/PROJECT.md and .planning/GENESIS.md].

The current alternatives are doing the research manually, sending informal email, using petition platforms, using SMS-style civic tools, hiring legal help, or doing nothing [assumption: EIR market map based on product category; no network research available].

The existing repo defines a concrete product path: free issue entry, ZIP-based official lookup, AI research, citation verification, letter preview, authentication before payment, Stripe checkout, Postmark delivery, dashboard tracking, and admin review [evidence: .planning/REQUIREMENTS.md, apps/api/src/routes/submissions.ts, apps/api/src/routes/payments.ts, apps/worker/src/agents/researcher.ts].

Customer definition remains unvalidated: the repo contains no live usage, revenue, CAC, NPS, official response-rate, or retention data [evidence: .planning/existing-state.md says traffic and revenue were zero at audit time; no production metrics file exists in this workspace].

## Market

Market sizing is bottom-up because no network research is available. Every external population or demand claim below is an assumption, not evidence.

| Layer | Method | Annual value |
|---|---|---:|
| Candidate civic issue-events | 10,000,000 US resident issue-events that are specific enough to contact an official [assumption: offline EIR placeholder for residents with unresolved civic issues; no external source] | Not monetized directly |
| Pay-ready DIY segment | 2% of candidate issue-events become pay-ready when research and delivery are packaged [assumption: conservative penetration placeholder to be validated] | 200,000 paid-capable jobs [assumption: 10,000,000 x 2%] |
| Serviceable annual market | 200,000 jobs at a $13 blended price [assumption: blended mix from $5, $15, and $25 repo pricing] | $2,600,000 [assumption: 200,000 x $13] |
| Near-term obtainable market | 12,000 paid jobs per year after initial validation [assumption: operator-led SEO and civic-community distribution] | $156,000 [assumption: 12,000 x $13] |

This is not a venture-scale market without a broader distribution wedge, organizational channel, or shared-platform advantage [assumption: EIR judgment from modeled revenue scale]. The registry warning is directionally correct: the current artifact is better classified as a personal/research asset until market pull is proven [evidence: registry note].

## Product & Moat

What is real today: the workspace contains a monorepo with a Next.js web app, Express API, worker agents, Prisma schema, Stripe route, Postmark delivery path, moderation route, legal-source search helpers, admin/dashboard pages, CI workflows, Docker configuration, and tests [evidence: apps/, packages/shared/prisma/schema.prisma, tests/, .github/workflows/ci.yml].

What is not real yet: there is no evidence in this workspace of deployed production infrastructure, paying users, verified official inbox placement, live official-directory coverage, or legal citation accuracy at production volume [evidence: no production metrics file; .planning/existing-state.md recorded zero traffic and zero revenue at audit time].

The proposed moat is weak at launch and depends on accumulating verified official contacts, bounce history, reusable citation references, and optional public campaign pages [evidence: .planning/GENESIS.md]. That moat does not exist at zero live submissions [evidence: .planning/existing-state.md].

## Platform Posture

The current codebase implements its own Clerk auth, Stripe payment route, PostgreSQL schema, Redis/BullMQ worker flow, and app-specific delivery logic [evidence: apps/api/src/middleware/auth.ts, apps/api/src/routes/payments.ts, packages/shared/prisma/schema.prisma, apps/worker/src/engine].

If this becomes a wrk.vc portfolio company, it should be evaluated as a potential WrkPlug client rather than a project that should keep owning generic auth, billing, identity, and login rails [assumption: wrapper references WrkPlug shared chassis direction; no signed platform migration is in this workspace]. The cost consequence could be lower bespoke infrastructure and less duplicated compliance work [assumption: platform leverage thesis], but the migration should not be hard-wired before operator approval [assumption: WrkPlug Phase zero not yet signed].

## Business Model

The current revenue model is one-time transactional letter packages: $5 single official, $15 three-pack, and $25 full-spread [evidence: apps/api/src/routes/payments.ts and .planning/PROJECT.md]. The plan also references a 40% net margin floor after fees [evidence: .planning/PROJECT.md and MASTER_PLAN.md].

Base blended price is $13 per paid submission [assumption: mix of 40% single, 40% three-pack, and 20% full-spread derived from repo tiers]. Base variable cost is $0.90 per paid submission [assumption: AI, payment, and email cost placeholder; no vendor invoices in workspace]. Implied contribution margin is about 93% before fixed costs [assumption: ($13 - $0.90) / $13].

The business only works if acquisition is mostly organic or embedded through civic communities, because the modeled gross profit per transaction is small [assumption: EIR judgment from $13 blended price]. Paid acquisition is not in the launch plan [evidence: .planning/GENESIS.md].

## Competition

Named competitors and substitutes:

| Alternative | Buyer job | CivicState position |
|---|---|---|
| Resistbot | Fast constituent messaging | CivicState adds research, citations, preview, delivery tracking, and paid accountability [assumption: category positioning; no external research] |
| Change.org | Public petition and social proof | CivicState sends targeted official letters rather than optimizing petition signatures [assumption: category positioning; no external research] |
| Quorum / VoterVoice | Advocacy infrastructure for organizations | CivicState starts with individuals and low one-time pricing [assumption: category positioning; no external research] |
| LegalZoom | Paid document preparation | CivicState avoids legal advice and focuses on constituent communication [assumption: category positioning; no external research] |
| Manual email or phone calls | Direct civic contact | CivicState reduces research, drafting, jurisdiction lookup, and status tracking work [assumption: customer workflow synthesis] |

The hard truth: none of these names proves white space. They prove that civic action, advocacy software, petitions, and legal-adjacent drafting are already crowded categories [assumption: EIR competitive interpretation].

## Go-To-Market

The first distribution wedge should be validation, not scale. Initial customers should come from narrowly framed issue pages and direct outreach to people already searching for local government action help [assumption: EIR GTM model].

First validation cohort: 100 paid submissions [assumption: minimum cohort for directional conversion, delivery, and support signal]. The launch target should measure payment conversion, successful delivery, refund/chargeback behavior, moderation rate, and official response rate [assumption: EIR validation design].

Channels to test:

| Channel | Why it fits | Success test |
|---|---|---|
| SEO issue pages | Existing plan assumes public campaign pages can compound search demand [evidence: MASTER_PLAN.md and .planning/GENESIS.md] | 1,000 search impressions by 2026-09-30 [assumption: small early signal target] |
| Local civic forums and newsletters | Users already have concrete issues [assumption: GTM hypothesis] | 25 paid submissions from tracked links by 2026-09-30 [assumption: validation target] |
| Manual concierge beta | Reveals edge cases in research, official lookup, and moderation [assumption: EIR operating approach] | 20 completed campaigns by 2026-08-31 [assumption: validation target] |

Do not scale paid ads before conversion and delivery are proven [assumption: low-ticket product economics].

## Financial Model

Financial model horizon: 2026-07-01 through 2029-06-30 [assumption: EIR planning horizon]. Revenue reconciles as paid submissions multiplied by blended price.

| Model period | Paid submissions | Blended price | Revenue | Variable cost | Fixed cash cost | Operator labor allocation | Operating result |
|---|---:|---:|---:|---:|---:|---:|---:|
| Year ending 2027-06-30 [assumption: first model year] | 1,200 [assumption: beta plus early launch] | $13 [assumption: tier mix] | $15,600 [assumption: 1,200 x $13] | $1,080 [assumption: 1,200 x $0.90] | $5,400 [assumption: hosting, tools, compliance minimums] | $24,000 [assumption: part-time operator allocation] | -$14,880 [assumption: revenue minus costs] |
| Year ending 2028-06-30 [assumption: second model year] | 6,000 [assumption: small SEO/community traction] | $13 [assumption: tier mix] | $78,000 [assumption: 6,000 x $13] | $5,400 [assumption: 6,000 x $0.90] | $9,600 [assumption: higher infra and tooling] | $48,000 [assumption: larger operator allocation] | $15,000 [assumption: revenue minus costs] |
| Year ending 2029-06-30 [assumption: third model year] | 18,000 [assumption: validated niche service] | $13 [assumption: tier mix] | $234,000 [assumption: 18,000 x $13] | $16,200 [assumption: 18,000 x $0.90] | $18,000 [assumption: infra, support tools, compliance] | $96,000 [assumption: operator plus contractor capacity] | $103,800 [assumption: revenue minus costs] |

Revenue assumptions:

- Pricing remains $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].
- Blended price remains $13 [assumption: tier mix stays stable].
- Payment conversion must reach at least 3% during beta to proceed [evidence: .planning/PROJECT.md validation gate].

Cost assumptions:

- Variable delivery and AI cost averages $0.90 per paid submission [assumption: no invoices in workspace].
- Fixed hosting and SaaS costs start at $5,400 per model year [assumption: simplified bundle; MASTER_PLAN.md separately specifies a $96 monthly DigitalOcean droplet].
- Human review remains part-time through the first model year [assumption: aligned with one-operator launch plan in .planning/GENESIS.md].

Sensitivity tests:

- If paid volume is 50% below base in the first model year, revenue falls to $7,800 [assumption: 600 x $13] and the project remains a research asset.
- If blended price drops to $9, third-model-year revenue falls to $162,000 [assumption: 18,000 x $9], which materially weakens the case for dedicated labor.
- If variable cost rises to $3 per paid submission, third-model-year variable cost becomes $54,000 [assumption: 18,000 x $3], still survivable but less forgiving.

## Risks & Anti-Plan

The anti-plan: do not fund this as a venture business yet. A skeptical partner should kill the deal today because the repo proves build effort, not demand; the price point is low; the market may be civic-goodwill rather than high-intent commerce; official email deliverability could fail; and legal-adjacent user content creates disproportionate compliance and moderation burden [assumption: EIR skeptic case].

| Hole | Mitigation | Residual risk |
|---|---|---|
| Users may not pay for civic letters | Run a paid concierge beta before automating more features [assumption: validation plan] | Even satisfied users may be episodic and low LTV [assumption: category risk] |
| Official inbox delivery may fail | Warm domain, monitor bounces, suppress opted-out officials, and pause domains above 10% bounce rate [evidence: .planning/REQUIREMENTS.md] | Government filters may silently junk messages [assumption: deliverability risk] |
| Citation errors create trust and legal risk | Keep citation verification mandatory and flag all-failed research for human review [evidence: apps/worker/src/agents/researcher.ts] | Verification may miss context, applicability, or local-law nuance [assumption: legal-adjacent risk] |
| The registry identity conflicts with the product narrative | Operator must decide whether brooks-history is the correct project shell for CivicState [evidence: dispatch project id and registry note] | Misclassification could make the dossier misleading [assumption: portfolio governance risk] |
| Moat is weak before volume | Treat the directory and citation library as learning assets, not defensibility claims [evidence: .planning/GENESIS.md] | Better-funded incumbents can copy the workflow [assumption: competitive risk] |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| Users will pay for researched civic letters | Existing product thesis | [assumption: no paying-user evidence] | 100 paid submissions by 2026-09-30 [assumption: validation milestone] |
| $13 blended price is realistic | Repo tiers are $5, $15, and $25 | [assumption: tier mix; evidence for raw tiers in apps/api/src/routes/payments.ts] | Compare actual tier mix after first 100 paid submissions [assumption: validation cohort] |
| Email-only delivery is enough for launch | Master plan defers physical mail | [evidence: MASTER_PLAN.md] | Achieve 85% inbox placement or equivalent delivery proxy in beta [evidence: .planning/PROJECT.md validation gate] |
| Organic acquisition can work | Public campaign archive thesis | [assumption: no search-console evidence] | Measure search impressions and paid conversions by 2026-09-30 [assumption: GTM milestone] |
| One operator can handle exceptions | Genesis assumption | [evidence: .planning/GENESIS.md] | Keep manual review under 30 minutes per day during beta [evidence: .planning/PROJECT.md operating constraint] |
| Legal-adjacent risk is manageable | Mandatory disclaimers and moderation | [assumption: no legal opinion in workspace] | Operator obtains counsel review before production launch [assumption: governance requirement] |

## Self-Valuation

Current score: 2.1 out of 10 [assumption: EIR score; registry watchlist and lack of validation dominate]. This is a useful product prototype and research asset, not a near-term venture-backed company [evidence: registry note].

Twelve-month value bands under the $5,000,000 per-business program assumption [assumption: wrapper context, not an independent valuation]:

| Case | Value band | Rationale |
|---|---:|---|
| Bear | $0 to $50,000 [assumption: asset-sale or internal reuse value] | No paid demand, no reliable delivery, or unresolved legal risk |
| Base | $150,000 to $350,000 [assumption: small validated operator service] | Paid beta works but market remains narrow |
| Bull | $750,000 to $1,500,000 [assumption: niche SaaS/service asset] | Repeatable acquisition, proven delivery, growing official directory, and clear compliance posture |

Comparables used qualitatively: Resistbot, Change.org, VoterVoice, Quorum, and LegalZoom [assumption: category references only; no valuation data used]. What would move the score: paid demand, deliverability proof, legal review, and a clear operator decision that this should pitch as a business [assumption: EIR investment criteria].

## Milestones

| Date | Milestone | Falsifiable standard |
|---|---|---|
| 2026-07-03 [assumption: near-term operator checkpoint] | Identity and posture decision | Operator confirms whether brooks-history should present CivicState as a business or keep it as a research asset |
| 2026-07-17 [assumption: buildable validation window] | Evidence baseline | Document current deploy status, test status, official lookup coverage, and payment flow readiness |
| 2026-08-31 [assumption: beta target] | Concierge beta close | 20 completed campaigns with tracked payment, delivery, support, and refund outcomes [assumption: minimum signal] |
| 2026-09-30 [assumption: early GTM target] | Demand gate | 100 paid submissions, 3% payment conversion, and 85% delivery proxy achieved or the business thesis is downgraded [assumption for 100 submissions; evidence for 3% and 85% gates in .planning/PROJECT.md] |
| 2026-10-15 [assumption: governance target] | Go/no-go investment review | Decide build, pause, or fold into shared wrk platform based on paid demand and risk evidence |

## Surprise Spikes

- The dispatch identifies the project as brooks-history in RPLogic-Inc/brookss-history, while the repo content is overwhelmingly CivicState [evidence: user dispatch and package.json]. This must be reconciled before wrk.vc presentation.
- The registry says personal/research asset, not near-term investible BOS, which contradicts a conventional venture pitch posture [evidence: registry note]. The plan therefore presents investment skepticism, not hype.
- The older existing-state audit says zero application code, but the current workspace contains application source, Prisma models, tests, and routes [evidence: .planning/existing-state.md versus apps/ and packages/]. The soul treats the code as real but unvalidated.
- The current product owns auth, billing, and delivery rails, while the portfolio brief hints at shared WrkPlug posture [assumption: wrapper context]. That should become an operator decision, not a silent architecture drift.
