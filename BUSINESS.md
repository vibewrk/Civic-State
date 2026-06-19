# CivicState Business Plan

As of 2026-06-19 [evidence: worker dispatch current_date], this repo is registered under project id `brooks-history`, while the product in the code and planning files is CivicState [evidence: package.json; .planning/PROJECT.md]. Workspace-only review was required, so repo and registry files are evidence; every external market, customer, and future-performance claim is marked as an assumption.

## Snapshot Thesis

CivicState is a watchlist civic-tech asset, not a near-term investible standalone company until the operator confirms it should be pitched as a business [evidence: registry dispatch]. The investible claim is narrow: individual U.S. residents may pay $5 to $25 per issue [evidence: apps/api/src/routes/payments.ts] for a workflow that turns a civic concern into researched, citation-backed letters delivered to officials [evidence: .planning/PROJECT.md; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/delivery.ts].

The current verdict is "conditional continue" as of 2026-06-19 [evidence: worker dispatch current_date]. The codebase contains a real Next.js, Express, BullMQ, Prisma, Stripe, Postmark, and worker-agent implementation [evidence: package.json; apps/api/src/index.ts; packages/shared/prisma/schema.prisma], but the plan itself says validated demand is "None yet" [evidence: .planning/PROJECT.md].

## Evidence Base and Honesty Labels

Primary evidence sources used:

- .planning/PROJECT.md [evidence]
- .planning/GENESIS.md [evidence]
- .planning/ROADMAP.md [evidence]
- .planning/STATE.md [evidence]
- .planning/REQUIREMENTS.md [evidence]
- MASTER_PLAN.md [evidence]
- package.json [evidence]
- packages/shared/prisma/schema.prisma [evidence]
- apps/api/src/routes/submissions.ts [evidence]
- apps/api/src/routes/officials.ts [evidence]
- apps/api/src/routes/payments.ts [evidence]
- apps/api/src/lib/officials/cicero.ts [evidence]
- apps/worker/src/agents/researcher.ts [evidence]
- apps/worker/src/agents/delivery.ts [evidence]
- Registry dispatch note that this is a watchlist personal/research asset [evidence]

No network research was available. Therefore, competitor behavior, market size, customer acquisition channels, willingness to pay, and external legal/regulatory interpretations are assumptions unless they are directly stated in repo or registry files.

## Customer Definition

The primary customer is an individual U.S. resident with a specific civic concern, desired outcome, and ZIP code [evidence: .planning/PROJECT.md; apps/api/src/routes/submissions.ts]. Launch use cases include civic issues such as policy complaints, enforcement failures, local services, zoning, school policy, environmental concerns, and public-safety requests [evidence: MASTER_PLAN.md; .planning/GENESIS.md].

Non-customers are just as important: CivicState is not for legal advice, claim filing, regulatory submissions, lobbying-firm work, business-entity advocacy, harassment, threats, private disputes, or automated follow-up campaigns [evidence: MASTER_PLAN.md; .planning/PROJECT.md; apps/api/src/lib/moderation.ts].

The passive stakeholder is the government official who receives a letter but is not the paying user [evidence: .planning/PROJECT.md]. The operator is a separate stakeholder responsible for exception handling, flagged submissions, treasury review, and compliance posture [evidence: .planning/PROJECT.md; apps/api/src/routes/admin.ts].

## Product Reality

What is real as of 2026-06-19 [evidence: worker dispatch current_date]:

- A monorepo with web, API, worker, and shared packages [evidence: package.json; pnpm-workspace.yaml].
- A Prisma schema covering users, submissions, campaigns, letters, officials, payments, deliveries, jobs, ledger entries, audit logs, and agent action logs [evidence: packages/shared/prisma/schema.prisma].
- A submission route with validation, moderation, audit logging, job creation, and BullMQ enqueueing [evidence: apps/api/src/routes/submissions.ts].
- Officials lookup across federal, state, and local source modules, with local Cicero still stubbed [evidence: apps/api/src/routes/officials.ts; apps/api/src/lib/officials/cicero.ts].
- A Stripe Checkout route with three hardcoded tiers: $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].
- Research, citation verification, drafting, delivery, treasury, and reconciliation worker files [evidence: apps/worker/src/agents/researcher.ts; apps/worker/src/agents/delivery.ts; apps/worker/src/agents/treasury.ts; apps/worker/src/agents/reconciliation.ts].
- Tests for API routes, campaigns, moderation, officials, citation verification, payments, delivery, treasury, and compliance [evidence: tests/*.test.ts].

What is not yet proven:

- Real paid conversion [evidence: .planning/PROJECT.md states validated items are none].
- Government inbox placement [evidence: .planning/PROJECT.md calls email deliverability the hardest problem].
- Local official coverage, because Cicero returns an empty array even when an API key exists [evidence: apps/api/src/lib/officials/cicero.ts].
- Mercury balance automation, because reconciliation still logs a placeholder for Mercury balance checks [evidence: apps/worker/src/agents/reconciliation.ts].
- A legal/compliance opinion; the repo contains policies and disclaimers, but no counsel memo [evidence: apps/web/app/terms/page.tsx; apps/web/app/privacy/page.tsx; assumption: no counsel memo found in workspace].

## Market Sizing

No top-down TAM is claimed [assumption: workspace-only mode prevents current external market research]. The only defensible sizing approach here is a bottom-up validation model:

| Layer | Method | Annual value |
| --- | --- | ---: |
| Beta proof | 100 paid submissions [assumption: controlled beta sample] x $15 average order value [assumption: midpoint tier mix from $5/$15/$25 prices] | $1,500 [assumption: 100 x $15] |
| Beachhead | 3 metros [assumption: operator-focusable launch area] x 250 paid submissions per metro per year [assumption: early local demand] x $16 average order value [assumption: package mix improves slightly] | $12,000 [assumption: 3 x 250 x $16] |
| Narrow consumer business | 25 metros [assumption: repeatable playbook] x 1,000 paid submissions per metro per year [assumption: SEO plus local referrals] x $18 average order value [evidence: MASTER_PLAN.md month-12 ARPP scenario] | $450,000 [assumption: 25 x 1,000 x $18] |
| Larger civic workflow option | 100 metros [assumption: national metro expansion] x 2,000 paid submissions per metro per year [assumption: high-repeat civic query capture] x $20 average order value [evidence: MASTER_PLAN.md month-24 ARPP scenario] | $4,000,000 [assumption: 100 x 2,000 x $20] |

This is not a venture-scale outcome by default [assumption: market-size judgment]. It becomes more interesting only if CivicState compounds proprietary official-contact, deliverability, response-rate, and citation-quality data, or if a future organization/API wedge is validated [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

## Revenue Model and Pricing

The implemented revenue model is one-time transactional payment through Stripe Checkout [evidence: apps/api/src/routes/payments.ts]. Implemented tiers:

| Tier | Price | Implemented official count | Label |
| --- | ---: | ---: | --- |
| Single | $5 [evidence: apps/api/src/routes/payments.ts] | 1 official [evidence: apps/api/src/routes/payments.ts] | Single Official |
| Three-pack | $15 [evidence: apps/api/src/routes/payments.ts] | 3 officials [evidence: apps/api/src/routes/payments.ts] | Three Officials |
| Full-spread | $25 [evidence: apps/api/src/routes/payments.ts] | all matched officials [evidence: apps/api/src/routes/payments.ts] | All Officials |

The prior plan discusses dynamic pricing and a Pricer agent [evidence: MASTER_PLAN.md], but the code truth is fixed tiers [evidence: apps/api/src/routes/payments.ts]. Dynamic pricing should remain out of scope until live cost data shows fixed tiers fail.

## Financial Model

Repo-grounded unit economics from the master plan:

| Figure | Amount |
| --- | ---: |
| Amplify package price | $15 [evidence: MASTER_PLAN.md] |
| Amplify token cost | $0.35 [evidence: MASTER_PLAN.md] |
| Amplify email delivery cost | $0.005 [evidence: MASTER_PLAN.md] |
| Amplify Stripe fee | $0.74 [evidence: MASTER_PLAN.md] |
| Amplify total COGS | $1.20 [evidence: MASTER_PLAN.md] |
| Amplify gross margin | $13.80 and 92% [evidence: MASTER_PLAN.md] |
| Complex package price | $25 [evidence: MASTER_PLAN.md] |
| Complex total COGS | $1.94 [evidence: MASTER_PLAN.md] |
| Fixed costs | about $200 per month [evidence: MASTER_PLAN.md] |
| Break-even MRR | about $340 per month [evidence: MASTER_PLAN.md; .planning/GENESIS.md] |
| Mercury reserve | $1,500 [evidence: .planning/PROJECT.md; MASTER_PLAN.md] |

Scenario model, using revenue = paid submissions x average package price:

| Period | Revenue build | Monthly revenue | Annualized revenue |
| --- | --- | ---: | ---: |
| Month 3 | 50 submissions x $15 average price [evidence: MASTER_PLAN.md] | $750 [evidence: MASTER_PLAN.md] | $9,000 [assumption: $750 x 12] |
| Month 6 | 120 submissions x $16 average price [evidence: MASTER_PLAN.md] | $1,920 [evidence: MASTER_PLAN.md] | $23,040 [assumption: $1,920 x 12] |
| Month 12 | 400 submissions x $18 average price [evidence: MASTER_PLAN.md] | $7,200 [evidence: MASTER_PLAN.md] | $86,400 [assumption: $7,200 x 12] |
| Month 24 | 1,200 submissions x $20 average price [evidence: MASTER_PLAN.md] | $24,000 [evidence: MASTER_PLAN.md] | $288,000 [assumption: $24,000 x 12] |

The critical caveat: the implemented route does not enforce the planned 40% net margin floor at checkout [evidence: .planning/PROJECT.md for requirement; apps/api/src/routes/payments.ts for route behavior]. That is acceptable for beta only if treasury reconciliation measures actual cost by campaign [assumption: beta control].

## Go To Market

The old distribution hypothesis is SEO-first through opt-in public campaign pages [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. That should not be the first operating motion because public SEO content requires successful paid submissions first [assumption: channel sequencing].

The practical launch motion:

- Start with one metro and 25 to 50 operator-recruited beta users [assumption: manageable beta size].
- Restrict issue categories to areas where citations and official routing can be manually audited before scale [assumption: safety-first launch].
- Measure preview-to-payment conversion, delivery acceptance, bounce rate, official response rate, support load, and flagged queue age [evidence: .planning/PROJECT.md for validation gates].
- Open SEO/public pages only after paid delivery works [evidence: .planning/GENESIS.md for SEO hypothesis; assumption: sequencing].

Minimum validation gates:

| Gate | Target |
| --- | ---: |
| Preview-to-paid conversion | at least 3% [evidence: .planning/PROJECT.md] |
| Government inbox placement | at least 85% [evidence: .planning/PROJECT.md] |
| Federal/state official coverage | at least 95% [evidence: .planning/PROJECT.md] |
| Local official coverage | at least 60% [evidence: .planning/PROJECT.md] |
| Chargeback rate | below 0.5% [evidence: .planning/PROJECT.md] |
| Operator review SLA | within 24 hours [evidence: .planning/PROJECT.md] |

## Competition

Named competitors and substitutes:

| Competitor or substitute | Why it matters | CivicState position |
| --- | --- | --- |
| Resistbot | Closest repo-named civic messaging substitute [evidence: .planning/PROJECT.md; MASTER_PLAN.md] | CivicState claims research and citation verification as differentiation [evidence: .planning/PROJECT.md] |
| Change.org | Petition and public-pressure substitute [evidence: MASTER_PLAN.md] | CivicState is individual letter delivery, not petition hosting [evidence: MASTER_PLAN.md] |
| Quorum | Organization advocacy platform named in planning [evidence: .planning/PROJECT.md] | CivicState is consumer-priced at $5 to $25 [evidence: apps/api/src/routes/payments.ts] |
| VoterVoice | Organization advocacy platform named in planning [evidence: .planning/PROJECT.md] | CivicState starts with individuals, not associations [evidence: .planning/PROJECT.md] |
| LegalZoom or attorneys | Higher-stakes document/legal substitute [evidence: MASTER_PLAN.md] | CivicState explicitly is not legal advice or claim filing [evidence: MASTER_PLAN.md] |
| Manual official email/contact forms | Free substitute [assumption: common user alternative] | CivicState must justify price through routing, research, drafting, and delivery tracking [evidence: MASTER_PLAN.md] |

The sharp skeptic view: a user can email a councilmember for $0 [assumption: common free substitute]. If CivicState cannot demonstrate materially better targeting, citation quality, and delivery confidence, the paid consumer business dies even if the software works.

## Risks and Anti-Plan

| Risk | Why it can kill the deal | Mitigation | Residual risk |
| --- | --- | --- | --- |
| No willingness-to-pay proof | The repo itself says no requirements are validated [evidence: .planning/PROJECT.md] | Closed beta with 3% conversion gate [evidence: .planning/PROJECT.md] | High until real payments exist |
| Local official coverage is not built | Cicero returns an empty array [evidence: apps/api/src/lib/officials/cicero.ts] | Evaluate and implement Cicero or BallotReady before public launch [evidence: .planning/PROJECT.md] | High until 60% local coverage is proven [evidence: .planning/PROJECT.md] |
| Federal officials may lack usable email | Congress.gov code sets email to empty [evidence: apps/api/src/lib/officials/congress.ts] | Decide contact-form handling, manual contact enrichment, or suppress undeliverable officials [assumption: implementation options] | High for delivery promise |
| Deliverability may fail | Government inboxes and spam filters are outside platform control [assumption: operational risk; .planning/PROJECT.md says deliverability is hardest] | SPF/DKIM/DMARC, warming, Postmark, bounce thresholds [evidence: .planning/PROJECT.md; apps/worker/src/agents/delivery.ts] | High until 85% gate is measured [evidence: .planning/PROJECT.md] |
| AI citation or legal framing failure | A false citation undermines trust and can create legal-adjacent risk [assumption: AI risk] | Search-bound research, citation verifier, human review on all-failed citations [evidence: apps/worker/src/agents/researcher.ts] | Medium because source coverage is incomplete |
| Civic/political abuse | The product can be used for harassment, threats, spam, or defamatory allegations [assumption: abuse risk] | Moderation, audit logs, opt-out enforcement, admin queue [evidence: apps/api/src/lib/moderation.ts; packages/shared/prisma/schema.prisma] | Medium-high at scale |
| Registry identity mismatch | Project id says brooks-history while repo product says CivicState [evidence: registry dispatch; package.json] | Operator ruling before external pitch [assumption: governance step] | Medium until resolved |

## Assumption Ledger

| Assumption | Basis | Test |
| --- | --- | --- |
| Users will pay $5 to $25 for a cited civic-letter workflow [assumption: unvalidated demand] | Implemented tiers and prior plan [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md] | First 100 paid submissions [assumption: beta sample] |
| SEO can acquire qualified civic intent [assumption: acquisition hypothesis] | Prior genesis plan [evidence: .planning/GENESIS.md] | Search impressions and conversion by issue page |
| One operator can handle launch exception volume within 24 hours [assumption: workload not measured] | Operational constraint [evidence: .planning/PROJECT.md] | Review queue age dashboard |
| Fixed pricing preserves margins [assumption: actual COGS not measured] | Master plan unit economics [evidence: MASTER_PLAN.md] | Campaign-level treasury reconciliation |
| Official data can reach 95% federal/state and 60% local coverage [assumption: API coverage unproven] | Planned gates [evidence: .planning/PROJECT.md] | ZIP-code coverage audit |
| Letters will be accepted as useful constituent communications [assumption: official response behavior unproven] | Product thesis [evidence: MASTER_PLAN.md] | Delivery acceptance and response-rate measurement |

## Milestones and Gates

| Date | Milestone | Pass/fail proof |
| --- | --- | --- |
| 2026-06-19 | Soul upgrade baseline | BUSINESS.md, ROADMAP.md, DECISIONS.md, and gate.json exist [evidence: this repo] |
| 2026-06-28 | Operator identity ruling | Decide whether to pitch CivicState as a business or keep as personal/research asset [assumption: near-term governance target] |
| 2026-07-05 | Officials coverage spike | 50 ZIP-code audit completed [assumption: sample size] with gaps by federal/state/local source |
| 2026-07-12 | Beta instrumentation | Conversion, delivery, bounce, response, support, COGS, and review-SLA events tracked [assumption: buildable beta requirement] |
| 2026-08-15 | Closed beta readout | 100 paid or operator-approved beta submissions measured [assumption: validation target] |
| 2026-09-30 | Investibility gate | 3% conversion, 85% inbox placement, below 0.5% chargebacks, and coverage gates met [evidence: .planning/PROJECT.md] |

## Surprise Spikes

The planning files disagree on completion. .planning/ROADMAP.md marks all four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while .planning/STATE.md still says Phase 1 is the current focus and Phase 1 is complete [evidence: .planning/STATE.md]. The root roadmap must treat code presence as different from market readiness.

.planning/existing-state.md says zero application code exists [evidence: .planning/existing-state.md], but the repo now contains application code under apps and packages [evidence: package.json; apps/api/src/index.ts; apps/web/app/page.tsx]. This means the soul was stale, not that the product is absent.

The master plan describes dynamic pricing [evidence: MASTER_PLAN.md], but the implemented payment route uses hardcoded tiers [evidence: apps/api/src/routes/payments.ts]. The business plan should follow the code until live COGS says otherwise.

The registry note says personal/research asset and watchlist [evidence: registry dispatch]. That directly conflicts with any aggressive VC pitch. The honest posture is a validation program, not a fundraising story.

## Recommendation

Keep CivicState on watchlist. It has more product substance than the thin soul implied [evidence: codebase], but it should not be described as investible until the operator resolves identity/posture and the beta proves paid conversion, official coverage, deliverability, and compliance readiness. The next dollar and hour should go to validation instrumentation, official-data coverage, deliverability, and legal/compliance review rather than new feature expansion [assumption: EIR prioritization].
