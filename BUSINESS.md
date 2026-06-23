# CivicState / brooks-history - Business Plan

## Thesis

As of 2026-06-23 [evidence: runner current date], this repository is not a Brooks History content archive; the current source tree is a CivicState civic-letter product that turns a resident concern into researched, citation-backed letters sent to public officials [evidence: package.json, .planning/PROJECT.md, apps/web/app/page.tsx]. The falsifiable thesis: CivicState can monetize abandoned civic intent if individual residents pay $5-$25 [evidence: apps/api/src/routes/payments.ts] for routing, research, verified citations, drafting, and delivery, while the system maintains at least 85% `.gov` inbox placement [evidence: .planning/PROJECT.md] and 0 critical citation defects in reviewed beta letters [assumption: quality bar].

The registry note says the project is on a watchlist, may be a personal or research asset, and is not near-term investible unless the operator confirms that it should pitch as a business [evidence: dispatch registry note]. Live revenue is $0 [assumption: no Stripe export, production ledger, analytics artifact, or payment report found in workspace].

## Problem & Customer

The primary customer is a United States resident with a concrete civic issue who would contact government if research, official targeting, drafting, and delivery were handled for them [evidence: .planning/GENESIS.md]. The launch customer is not an enterprise advocacy buyer; it is a busy individual with low willingness to learn jurisdictional process [assumption: inference from one-time $5-$25 consumer pricing].

The problem has 4 steps users often abandon: identify jurisdiction, find applicable authority, write an effective letter, and send it to the right official [evidence: .planning/GENESIS.md]. CivicState must not sell itself as legal advice, legal representation, lobbying counsel, claim filing, or a substitute for an attorney [evidence: .planning/PROJECT.md and .planning/REQUIREMENTS.md].

Excluded customers are legal claimants, regulatory filers, business-entity advocacy buyers, bulk campaign operators, harassment targets, and users trying to send threats or defamatory allegations [evidence: MASTER_PLAN.md and moderation/compliance design].

## Market

No sourced TAM is claimed. Workspace-only sizing uses a bottom-up wedge model: issue niches times monthly visitors times paid conversion times average order value [assumption: no network mode].

| Segment | Method | Annual Paid Submissions | Annual Gross Revenue |
| --- | --- | ---: | ---: |
| Local validation wedge | 10 issue niches [assumption] times 100 monthly visitors [assumption] times 2.0% paid conversion [assumption] times 12 months [assumption] | 240 [assumption: arithmetic model] | $3,360 [assumption: 240 times $14 blended AOV] |
| Regional early traction | 50 issue niches [assumption] times 250 monthly visitors [assumption] times 2.0% paid conversion [assumption] times 12 months [assumption] | 3,000 [assumption: arithmetic model] | $42,000 [assumption: 3,000 times $14 blended AOV] |
| Mature niche utility | 200 issue niches [assumption] times 500 monthly visitors [assumption] times 2.0% paid conversion [assumption] times 12 months [assumption] | 24,000 [assumption: arithmetic model] | $336,000 [assumption: 24,000 times $14 blended AOV] |

This is a small, testable wedge, not venture-scale proof. A venture case would require much higher volume, repeat usage, organization sales, or a data/content moat that has not been proven [assumption: funding-fit judgment].

## Product & Moat

CivicState is materially more than a concept. The repository contains a Next.js frontend, Express API, BullMQ worker, Prisma schema, moderation route, Stripe payment route, Postmark test surface, admin/dashboard pages, compliance pages, legal research integrations, and tests [evidence: apps and packages source tree].

The real product loop is submission intake [evidence: apps/api/src/routes/submissions.ts], moderation and audit logging [evidence: apps/api/src/routes/submissions.ts], legal research and citation verification [evidence: apps/worker/src/agents/researcher.ts], Stripe checkout [evidence: apps/api/src/routes/payments.ts], and delivery/payment/audit data models [evidence: packages/shared/prisma/schema.prisma].

The moat is not proven. The plausible assets are an officials directory, bounce/response history, verified citation library, and opt-in campaign archive [evidence: .planning/GENESIS.md as product hypothesis]. Those assets have weak defensibility at 0 live customers [assumption: no production artifact found], but could compound if volume reaches 1,000+ submissions per month [assumption: scale threshold].

## Platform Posture

CivicState should be treated as a WrkPlug client, not a standalone infrastructure company [assumption: D-032 platform posture from dispatch context]. Draft/operator-gated posture: it should consume shared auth, billing, identity, login, and EAI Layer-0 rails when those rails are signed and available [assumption: WrkPlug Phase 0 not yet signed].

The business consequence is lower infrastructure burden and lower CAC if shared-rails distribution compounds across the portfolio [assumption: WrkPlug shared-rails thesis]. Do not hard-wire this dependency into the product plan until the operator confirms WrkPlug Phase 0 availability [assumption: governance constraint].

## Business Model

CivicState currently implements one-time transactional pricing:

| Tier | Price | Package Logic |
| --- | ---: | --- |
| Single Official | $5 [evidence: apps/api/src/routes/payments.ts] | 1 official [evidence: apps/api/src/routes/payments.ts] |
| Three Officials | $15 [evidence: apps/api/src/routes/payments.ts] | 3 officials [evidence: apps/api/src/routes/payments.ts] |
| Full Spread | $25 [evidence: apps/api/src/routes/payments.ts] | all matched officials [evidence: apps/api/src/routes/payments.ts] |

Current revenue streams are one-time letter-delivery packages [evidence: apps/api/src/routes/payments.ts]. Deferred revenue streams include subscriptions, organization API access, certified mail, follow-up letters, and coalition pages [evidence: .planning/GENESIS.md and MASTER_PLAN.md].

The prior plan claims 91% gross margin [evidence: .planning/PROJECT.md as prior-plan claim]. This upgrade does not treat that as proven. Underwrite 70% gross margin until live token, delivery, refund, human-review, support, and payment-processing costs are measured [assumption: risk-adjusted finance policy]. The existing plan requires a 40% net margin floor [evidence: .planning/PROJECT.md].

## Competition

| Alternative | Customer Job | CivicState Difference |
| --- | --- | --- |
| Resistbot | Quick messages to lawmakers by chat or SMS [assumption: category knowledge, no live lookup] | CivicState focuses on researched citations, official matching, and paid delivery [evidence: source and planning docs]. |
| Change.org | Public petition hosting and social pressure [assumption: category knowledge, no live lookup] | CivicState sends direct constituent letters and tracks delivery [evidence: Prisma delivery model and payment route]. |
| Quorum | Enterprise advocacy and public affairs software [assumption: category knowledge, no live lookup] | CivicState is consumer-priced at $5-$25 [evidence: payments route]. |
| VoterVoice / FiscalNote advocacy tools | Organization-led campaigns [assumption: category knowledge, no live lookup] | CivicState targets individuals, not enterprise campaign managers [evidence: .planning/GENESIS.md]. |
| Manual email and phone calls | Free direct outreach [assumption: substitute behavior] | CivicState sells saved research, routing, drafting, and tracking labor [assumption: value-prop inference]. |
| Attorneys or legal aid | Legal advice, claims, filings [assumption: substitute category] | CivicState must avoid legal advice and filings [evidence: planning and compliance scope]. |

The hardest competitor may be free manual outreach, not software. If users see the product as a generated email rather than research, routing, verification, and delivery, even $5 may be too expensive [assumption: customer psychology risk].

## Go-To-Market

The planning docs propose SEO as the primary channel, with opt-in public campaign pages creating long-tail civic query targets [evidence: .planning/GENESIS.md]. That should be sequenced after closed validation because public campaign pages involving civic complaints can create privacy, defamation, moderation, and thin-content risk [assumption: compliance and SEO risk].

First 100 customers plan [assumption: GTM design]: get 30 testers [assumption] from personal networks, city forums, and local civic groups; convert at least 20 paid submissions [assumption] in closed beta; then use the next 80 customers [assumption] to test 3 issue categories [assumption] before opening public SEO pages. Publish only opt-in, scrubbed campaign summaries after privacy and legal review [assumption: compliance-first content plan].

## Financial Model

Illustrative monthly revenue build:

| Month Shape | Paid Submissions | Blended AOV | Gross Revenue | Variable Cost | Gross Profit |
| --- | ---: | ---: | ---: | ---: | ---: |
| Beta | 25 [assumption: validation target] | $14 [assumption: package mix] | $350 [assumption: 25 times $14] | $50 [assumption: $2 variable cost per submission] | $300 [assumption: revenue less variable cost] |
| Local wedge | 250 [assumption: niche SEO wedge] | $14 [assumption: package mix] | $3,500 [assumption: 250 times $14] | $500 [assumption: $2 variable cost per submission] | $3,000 [assumption: revenue less variable cost] |
| Regional wedge | 2,000 [assumption: regional SEO wedge] | $14 [assumption: package mix] | $28,000 [assumption: 2,000 times $14] | $4,000 [assumption: $2 variable cost per submission] | $24,000 [assumption: revenue less variable cost] |

P&L sketch:

| Period | Paid Submissions | Revenue | Variable Cost | Fixed Burn | Human Review / Support | Operating Contribution |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Year 1 [assumption: P&L period] | 1,200 [assumption] | $16,800 [assumption: 1,200 times $14] | $2,400 [assumption: 1,200 times $2] | $1,590 [assumption: $132.50 times 12 months] | $6,000 [assumption: part-time review allowance] | $6,810 [assumption: revenue less costs] |
| Year 2 [assumption: P&L period] | 8,000 [assumption] | $112,000 [assumption: 8,000 times $14] | $16,000 [assumption: 8,000 times $2] | $3,600 [assumption: scaled hosting/tools] | $36,000 [assumption: operator/support allowance] | $56,400 [assumption: revenue less costs] |
| Year 3 [assumption: P&L period] | 24,000 [assumption] | $336,000 [assumption: 24,000 times $14] | $48,000 [assumption: 24,000 times $2] | $9,600 [assumption: scaled infra/tools] | $120,000 [assumption: support/legal/review capacity] | $158,400 [assumption: revenue less costs] |
| Downside | 240 [assumption] | $3,360 [assumption: 240 times $14] | $720 [assumption: 240 times $3 downside cost] | $1,590 [assumption: $132.50 times 12 months] | $3,000 [assumption: minimum support load] | -$1,950 [assumption: revenue less costs] |

Revenue assumptions: $14 blended AOV [assumption], 2.0% paid conversion [assumption], 24,000 annual submissions in mature wedge [assumption]. Cost assumptions: $2 variable cost per submission [assumption], $132.50 monthly fixed burn from prior plan [evidence: .planning/PROJECT.md], $120,000 Year 3 review/support/legal capacity [assumption]. Sensitivity tests: paid conversion below 1.0% breaks the SEO wedge [assumption], variable cost above $3 per submission compresses margin [assumption], and human review above 30 minutes per day violates the operator model [evidence: .planning/PROJECT.md operator constraint].

Key operating figures: implemented prices are $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts]; planned backend droplet cost is about $96 per month [evidence: .planning/PROJECT.md]; planned Mercury reserve is $1,500 [evidence: .planning/PROJECT.md]; reserve alerts are $2,000 warning and $500 emergency [evidence: .planning/REQUIREMENTS.md]; chargeback rate must stay below 0.5% [evidence: .planning/PROJECT.md].

## Risks & Anti-Plan

A skeptical partner should try to kill this deal on these points:

- Demand may not exist at scale. Civic frustration is common, but paying for a letter may not beat free email, phone calls, templates, or apathy [assumption: demand risk].
- Government deliverability can break the product. If official inboxes block, suppress, or ignore AI-assisted constituent emails, the core promise fails [assumption: delivery risk].
- Citation quality is existential. Any fabricated or misleading legal citation could create user harm, reputational damage, or regulatory scrutiny [assumption: legal/compliance risk].
- The market may be too small for venture. The mature wedge case is $336,000 annual gross revenue [assumption: model output], which is useful but not venture-scale alone [assumption: funding-fit judgment].
- The registry identity is unresolved. `brooks-history` does not match CivicState, and the watchlist note says personal/research asset, not near-term investible [evidence: dispatch registry note].
- Operator burden may be hidden. Human review, official directory maintenance, refunds, delivery exceptions, and politically charged content could consume the margin [assumption: ops risk].
- Legal boundaries are fragile. Users may submit threats, defamation, litigation threats, private disputes, or legal demands despite moderation [evidence: moderation/compliance design recognizes this].

Anti-plan recommendation: do not pitch this as venture-backable until the live demand, deliverability, citation, and operator-governance gates clear: 20 paid submissions [assumption: minimum signal threshold], 85% deliverability [evidence: prior validation gate], 0 critical citation defects in reviewed beta letters [assumption: quality bar], and an operator ruling on business posture [evidence: registry note requires confirmation].

## Assumption Ledger

| Assumption | Basis | Evidence Or Assumption | Test |
| --- | --- | --- | --- |
| Users will pay $5-$25 for one-off civic letters | Implemented pricing and prior plan | [evidence: payments route]; demand is [assumption: unvalidated] | Continue if at least 3% qualified previews convert to paid delivery [evidence: prior gate]. |
| Blended AOV can reach $14 | Average of current tiers weighted toward $15 | [assumption: package mix unknown] | Continue if paid AOV is at least $10 [assumption: margin floor]. |
| Variable cost can stay near $2 per submission | Token, delivery, queue, and review allowance | [assumption: no live ledger] | Continue if variable cost is below 30% of revenue [assumption: underwriting rule]. |
| SEO can become acquisition channel | Prior planning hypothesis | [evidence: .planning/GENESIS.md as intent]; performance is [assumption: unvalidated] | Continue only if indexed pages produce qualified previews, not just impressions [assumption]. |
| Citation verification catches risky hallucinations | Verifier flow exists | [evidence: apps/worker/src/agents/researcher.ts] | Continue only if critical defect rate is 0% in reviewed beta set [assumption]. |
| Official matching can be good enough | Officials schema and adapters are planned/implemented | [evidence: schema and planning docs] | Continue if federal/state coverage reaches 95% [evidence: prior gate] and local gaps are disclosed [assumption]. |
| One operator can handle exceptions | Prior plan assumes exception-based operation | [evidence: .planning/PROJECT.md] | Continue if routine review/support stays below 30 minutes per day [evidence: .planning/PROJECT.md]. |

## Self-Valuation

Current score: 2.0 out of 5.0 [assumption: EIR judgment based on built product but absent market proof]. Under the $5,000,000-per-business program assumption [assumption: wrk.vc portfolio valuation frame], CivicState earns only a conditional watchlist valuation because the repo has product surface but no demand, revenue, deliverability, or operator ruling [evidence: source tree and dispatch registry note].

| Case | Twelve-Month Band | Basis |
| --- | ---: | --- |
| BEAR | $0-$250,000 [assumption] | No operator business ruling, weak paid conversion, or failed deliverability [assumption]. |
| BASE | $250,000-$1,250,000 [assumption] | 20-100 paid beta submissions [assumption], measured delivery, and no critical citation defects [assumption]. |
| BULL | $1,250,000-$5,000,000 [assumption] | Repeatable acquisition, 1,000+ monthly submissions [assumption], measured gross margin, and defensible data asset [assumption]. |

Comparables used only as positioning references: Resistbot, Change.org, Quorum, and LegalZoom [assumption: category knowledge, no live lookup]. Method: stage-gated scorecard, not revenue multiple, because live revenue is $0 [assumption: no production revenue artifact found].

## Milestones

- Operator confirms whether this should pitch as CivicState or stay personal/research by 2026-06-30 [assumption: governance target].
- Complete 1 end-to-end paid dry run with Stripe test checkout, verified citations, and Postmark delivery by 2026-07-15 [assumption: validation target].
- Recruit 30 testers and collect at least 20 paid-submission attempts by 2026-08-15 [assumption: beta target].
- Produce a beta scorecard covering 3% conversion [evidence: .planning/PROJECT.md], 85% deliverability [evidence: .planning/PROJECT.md], 0 critical citation defects [assumption: quality bar], refund rate, moderation load, and support time by 2026-08-31 [assumption: validation target].

## Surprise Spikes

- Repository identity mismatch: dispatch says `brooks-history`, while the actual product and code say CivicState [evidence: dispatch plus package/source files].
- Registry posture contradicts immediate investment framing: the project is watchlisted and described as personal/research, not near-term investible unless confirmed by the operator [evidence: dispatch registry note].
- [.planning/existing-state.md](.planning/existing-state.md) says zero application code exists [evidence: stale planning file], but the current tree contains frontend, API, worker, schema, and tests [evidence: source tree].
- [.planning/ROADMAP.md](.planning/ROADMAP.md) marks all major phases complete [evidence: planning roadmap], while [.planning/STATE.md](.planning/STATE.md) still says Phase 1 is complete and Phase 2 planning is needed [evidence: planning state].
