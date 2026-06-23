# CivicState Business Plan

**As-of date:** 2026-06-23 [evidence: runner current date]. **Status:** proposed, not adopted [evidence: wrk.dog brief]. **Registry posture:** watchlist; personal/research asset unless the operator confirms this should pitch as a business [evidence: dispatch registry notes].

## Snapshot

CivicState is a proposed transactional civic-communication platform: a U.S. resident describes a civic issue, the system identifies officials, researches citations, drafts compliant letters, takes payment, and delivers emails to officials [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md); [apps/api/src/index.ts](apps/api/src/index.ts)].

The investable thesis is not proven. The repo shows a substantial application build, but no workspace evidence of paying customers, live deliverability, production deployment, or market conversion [evidence: repo scan 2026-06-23]. Treat this as a data-room upgrade for review, not a claim that the business is ready for investment [evidence: dispatch registry notes].

## What Exists Today

- Product surface: Next.js frontend, Express API, worker process, Prisma schema, Stripe route, official lookup route, moderation, compliance pages, dashboard pages, and admin pages [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx); [apps/api/src/index.ts](apps/api/src/index.ts); [apps/worker/src/index.ts](apps/worker/src/index.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Agent surface: classifier, researcher, drafter, delivery, treasury, and reconciliation workers are registered [evidence: [apps/worker/src/index.ts](apps/worker/src/index.ts)].
- Core data model: users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs are modeled [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Pricing is hardcoded at $5, $15, and $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); [.planning/PROJECT.md](.planning/PROJECT.md)].
- The prior planning corpus says Phase 1 through Phase 4 are complete, with completion dated 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. Surprise spike: `.planning/STATE.md` still says current focus is Phase 1 and Phase 1 complete, also dated 2026-04-25 [evidence: [.planning/STATE.md](.planning/STATE.md)]. This inconsistency must be resolved before external diligence.

## Customer Definition

The launch customer is an individual U.S. resident with a concrete civic frustration who wants to contact an official but will not manually identify jurisdiction, find legal references, draft a formal letter, and send it [evidence: [.planning/GENESIS.md](.planning/GENESIS.md); [.planning/PROJECT.md](.planning/PROJECT.md)].

Primary use cases are local services, zoning, noise, school policy, enforcement failures, agency responsiveness, and legislative requests [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Excluded customers include businesses acting in a commercial advocacy capacity, legal claimants, regulated entities seeking filings, and bulk campaign operators [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Customer status: unvalidated. The repo has no evidence of paid submissions, conversion, retention, response rates, or willingness to pay [evidence: repo scan 2026-06-23].

## Thesis Current

If ordinary residents value time saved and authority added more than the package price, CivicState can monetize abandoned civic intent as paid letter campaigns. The product wedge is not "AI writing"; it is the combined workflow of official targeting, citation-backed drafting, payment gating, delivery tracking, and compliance controls [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)].

The thesis remains conditional because the hardest assumptions are external to the repo: demand, inbox placement at government domains, official-data coverage, and user trust in AI-assisted civic letters [assumption: workspace-only review found no market or production evidence].

## Market Sizing Method

No network research was available. The market model below is therefore a bottom-up assumption ledger, not evidence.

| Layer | Method | Annual gross spend |
|---|---|---:|
| TAM proxy | 10,000,000 motivated U.S. residents [assumption: model estimate for a broad civic-action population; must be replaced with sourced research] x 1.0 paid campaign/year [assumption: annual purchase frequency] x $15 blended order value [assumption: midpoint of repo price menu] | $150,000,000 [assumption: calculated] |
| SAM wedge | 1,000,000 SEO-reachable issue-driven residents [assumption: early web acquisition subset] x 1.0 paid campaign/year [assumption] x $15 blended order value [assumption] | $15,000,000 [assumption: calculated] |
| SOM target | 50,000 paid buyers/year [assumption: small operator-scale target] x 1.2 campaigns/year [assumption: repeat rate] x $15 blended order value [assumption] | $900,000 [assumption: calculated] |

This method avoids claiming a civic-tech market size. It sizes only the revenue that this product could capture from direct consumer transactions. The next validation step is to replace every population and conversion input with sourced data or first-party funnel metrics.

## Revenue Model

The active revenue model is one-time paid delivery packages, not subscriptions [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/GENESIS.md](.planning/GENESIS.md)].

| Package | Price | Scope |
|---|---:|---|
| Single official | $5 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] | 1 official [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Three officials | $15 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] | 3 officials [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Full spread | $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] | all matched officials [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |

Future revenue streams in old planning, including API access and higher-touch review, remain out of active scope until the consumer loop validates [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)].

## Unit Economics And Financial Model

Existing planning claims a 91% gross margin, $132.50/month maximum burn, and break-even at 11 submissions [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The model below reconciles the same thesis using a blended $15 order value.

| Line | Monthly steady-state example |
|---|---:|
| Paid submissions | 500/month [assumption: scale scenario for sensitivity, not current traction] |
| Blended order value | $15/order [assumption: midpoint of $5, $15, and $25 menu; evidence for menu in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Gross revenue | $7,500/month [assumption: 500 x $15 calculation] |
| AI and delivery variable cost | $0.75/order [assumption: high end of repo token-cost range in [.planning/GENESIS.md](.planning/GENESIS.md)] |
| Payment processing cost | $0.74/order [assumption: common U.S. card fee model of 2.9% + $0.30, not verified in workspace] |
| Total variable cost | $742.50/month [assumption: 500 x ($0.75 + $0.74) calculation] |
| Gross profit | $6,757.50/month [assumption: $7,500 - $742.50 calculation] |
| Gross margin | 90.1% [assumption: $6,757.50 / $7,500 calculation] |
| Fixed operating burn | $132.50/month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Operating contribution before labor | $6,625.00/month [assumption: $6,757.50 - $132.50 calculation] |

The repo also specifies a $1,500 Mercury reserve [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] and a 40% net margin floor [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)]. These controls are necessary but not sufficient: actual gross margin depends on model pricing, retries, human review rate, refunds, and chargebacks [assumption: standard marketplace/payment risk].

## Go To Market

The original plan is SEO-first: opt-in public campaign pages create long-tail civic issue content as a byproduct of paid submissions [evidence: [.planning/GENESIS.md](.planning/GENESIS.md); [MASTER_PLAN.md](MASTER_PLAN.md)]. Paid acquisition, app stores, and partnerships are explicitly not launch channels [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

Near-term validation should be narrower than the old plan: recruit a small set of issue-driven residents, run concierge-assisted submissions, measure willingness to pay, and verify whether official delivery works before scaling indexed content [assumption: prudent validation sequence for unproven consumer workflow].

Existing gates in planning are willingness-to-pay conversion at >=3%, inbox placement at >=85%, federal/state coverage at >=95%, local coverage at >=60%, and chargeback rate below 0.5% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. These are good gates, but the repo has no evidence that any have cleared [evidence: repo scan 2026-06-23].

## Competition

The repo names Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice as comparison points [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)].

| Competitor | Repo-stated role | CivicState wedge |
|---|---|---|
| Resistbot | closest civic-message alternative [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | citation-backed research and paid delivery workflow [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Change.org | petition hosting [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | direct official letters with research and routing [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |
| LegalZoom | document drafting comparison [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | civic-specific, lower-priced letter workflow [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |
| Quorum / VoterVoice | enterprise advocacy tools [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | consumer transactional price point [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

External feature parity, current pricing, traffic, and adoption for these competitors are not verified in workspace-only mode [assumption: requires network research].

## Risks And Anti-Plan

Anti-plan: do not fund this as a venture business yet. The repo has build artifacts, but no proof that citizens pay, officials receive and respond, citation quality holds in adversarial topics, or email reputation survives scale [evidence: repo scan 2026-06-23; assumption: market validation required].

Key risks:

- Demand risk: users may prefer free manual outreach or free tools over $5 to $25 paid packages [assumption: consumer willingness-to-pay uncertainty].
- Deliverability risk: government inboxes may suppress automated civic emails despite SPF/DKIM/DMARC and domain warming [assumption: known email-deliverability risk; repo flags deliverability as hardest problem in [.planning/PROJECT.md](.planning/PROJECT.md)].
- Legal/compliance risk: letters can drift into legal advice, defamation, harassment, or claim-filing territory [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Data risk: political opinions and civic complaints are sensitive; breaches or misuse would be high-trust failures [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma); [.planning/PROJECT.md](.planning/PROJECT.md)].
- Quality risk: citation verification can strip unsupported citations, but that does not prove the remaining argument is persuasive or complete [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts)].
- Positioning risk: registry flags this as a personal/research asset; forcing an investible story may distort operator intent [evidence: dispatch registry notes].

## Assumption Ledger

| Assumption | Current basis | Validation needed |
|---|---|---|
| Buyers will pay $5 to $25 for the workflow | price menu exists in code [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] | first-party conversion and refund data |
| Blended order value can be $15 | midpoint assumption from active price menu [assumption: package mix unknown] | payment cohort by tier |
| Variable AI/delivery cost can stay near $0.75/order | repo planning range [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] | production logs by agent and topic |
| SEO can become a channel | original distribution hypothesis [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] | indexed pages, impressions, conversion |
| One operator can manage review load | launch assumption in planning [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] | flagged queue volume and service-level data |
| Local official coverage can reach >=60% | planning gate [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | provider spike and ZIP-code coverage test |

## Evidence And Freshness

Workspace evidence used: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md), [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/STATE.md](.planning/STATE.md), [MASTER_PLAN.md](MASTER_PLAN.md), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts), and [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma).

Important dates: source planning was generated or updated on 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/ROADMAP.md](.planning/ROADMAP.md)]. This business plan was written on 2026-06-23 [evidence: runner current date]. External market freshness is stale by definition because network research was unavailable [assumption: workspace-only constraint].

## Surprise Spikes

- The repo name supplied by dispatch is `brooks-history`, but the product in the workspace is CivicState [evidence: dispatch context; [.planning/PROJECT.md](.planning/PROJECT.md); [package.json](package.json)]. This must be explained before publication.
- Planning says all roadmap phases are complete, while state tracking says Phase 1 is the current focus [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md); [.planning/STATE.md](.planning/STATE.md)].
- The registry note says personal/research asset, not near-term investible, yet the requested artifact is VC-grade [evidence: dispatch registry notes]. The plan therefore frames investability as conditional and not adopted.

## Decision Needed

Operator decision required: confirm whether CivicState should be pitched as a business or retained as a research/personal asset. Until that decision is made, the correct gate status is proposed, and the honest next milestone is validation rather than fundraising [evidence: dispatch registry notes; wrk.dog brief].
