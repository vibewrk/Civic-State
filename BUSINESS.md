# Brooks History / CivicState Business Plan

Document date: 2026-06-23 [evidence: worker dispatch]. Status: Watchlist research asset, not near-term investible BOS [evidence: registry note in worker dispatch]. Network mode: workspace-only; external market facts are not independently verified and are labeled as assumptions.

## Current Thesis

This repo does not yet prove a venture-backable "Brooks History" business. Its actual code and planning files describe **CivicState**, a paid civic-letter workflow that turns a constituent concern into researched, citation-backed letters to officials [evidence: [package.json](package.json), [apps/web/app/page.tsx](apps/web/app/page.tsx), [.planning/PROJECT.md](.planning/PROJECT.md)]. The investible thesis is therefore conditional:

> If the operator confirms that CivicState is the intended asset, the project can be a narrow transactional civic-communications business with unusually clear product scope, but it remains pre-validation until identity, deliverability, official-data coverage, payment conversion, and legal-risk gates are proven.

As of 2026-06-23 [evidence: worker dispatch], the correct portfolio label is **Watchlist** rather than "ready to pitch." That is consistent with the registry note describing this as a personal/research asset and requiring operator confirmation before it is pitched as a business [evidence: registry note in worker dispatch].

## Evidence Base

Primary repo evidence used:

- [package.json](package.json): names the product `civicstate` and describes an AI-powered civic advocacy platform [evidence].
- [apps/api/src/index.ts](apps/api/src/index.ts): Express API with public, payment, campaign, compliance, admin, webhook, and Bull Board routes [evidence].
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma): implemented Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence].
- [apps/worker/src/index.ts](apps/worker/src/index.ts): worker registers classifier, researcher, drafter, delivery, treasury, and reconciliation agents [evidence].
- [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md), [.planning/ROADMAP.md](.planning/ROADMAP.md), and [MASTER_PLAN.md](MASTER_PLAN.md): legacy business narrative, pricing, constraints, assumptions, and build plan [evidence].
- [.planning/existing-state.md](.planning/existing-state.md): older audit claiming no app code existed; now stale because the repo contains app code [evidence].

Source freshness: current source files are treated as fresher than `.planning/existing-state.md` because they exist in the checked-out workspace on 2026-06-23 [evidence: worker dispatch and repo scan]. External market claims were not researched because this worker was explicitly workspace-only [evidence: worker dispatch].

## Customer Definition

Primary customer: a United States resident with a specific civic concern who wants to contact government officials but does not know the relevant law, the correct recipients, or formal letter conventions [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md)].

Sharper ICP for validation:

- Mobile-first individual constituent, not an organization [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Has a concrete desired outcome, a ZIP code, and willingness to pay for saved time [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Needs civic communication, not legal advice, legal demand notices, claim filing, or regulated lobbying counsel [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Excluded customers: businesses, campaign committees, legal claimants, bulk advocacy organizations, and users trying to target private individuals. These use cases create policy, legal, and abuse risk before the individual-constituent workflow is validated [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

## Product Reality

What is real in the repo:

- Monorepo with web, API, worker, and shared packages [evidence: [package.json](package.json)].
- Express API with health, submissions, officials, payments, campaigns, compliance, admin, and webhook routes [evidence: [apps/api/src/index.ts](apps/api/src/index.ts)].
- Prisma schema for the core civic-letter data model [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Submission creation with ZIP validation, moderation, job creation, and classifier queue enqueueing [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)].
- Hardcoded Stripe Checkout tiers of $5, $15, and $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Worker agents for classification, research, drafting, delivery, treasury, and reconciliation [evidence: [apps/worker/src/index.ts](apps/worker/src/index.ts)].
- Postmark delivery path with bounce-rate gating at 10% [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- Compliance and admin routes, including CCPA-style deletion/export and flagged submission review [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [apps/api/src/routes/admin.ts](apps/api/src/routes/admin.ts)].

What is not yet proven:

- Production traffic: $0 revenue and no live user evidence are present in the repo [evidence: [.planning/existing-state.md](.planning/existing-state.md)].
- End-to-end queue correctness: the API enqueues classifier jobs, but worker state transitions call `transitionJob` with `submissionId` where the helper updates `job.id`; this can break the lifecycle [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), [apps/worker/src/engine/state-machine.ts](apps/worker/src/engine/state-machine.ts)].
- Field consistency: compliance export selects fields named `tier` and `body` while the Prisma schema uses `pricingTier` and `content` [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Official targeting depth: federal/state/local lookup is implemented as code paths, but no repository evidence proves coverage quality across ZIP codes [evidence: [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts)].

## Market Sizing

No external TAM source was available in workspace-only mode. The sizing below is therefore a bottom-up validation model, not a market claim.

| Layer | Figure | Honesty label |
|---|---:|---|
| Initial validation cohort | 100 submitted civic issues | [assumption: small manual beta large enough to expose delivery and payment friction] |
| Paid conversion hurdle | 3% | [assumption: legacy plan's validation gate; not externally verified] |
| Beta paid sends at hurdle | 3 paid submissions | [assumption: 100 submitted issues x 3% conversion] |
| Starter monthly operating target | 400 paid submissions/month | [assumption: legacy schema scale in `.planning/existing-state.md`; not market evidence] |
| Average package price for planning | $15 | [assumption: midpoint of implemented $5/$15/$25 tiers] |
| Starter monthly revenue | $6,000/month | [assumption: 400 paid submissions/month x $15] |
| Year-one starter revenue run-rate | $72,000/year | [assumption: $6,000/month x 12 months] |

This is deliberately not a VC-scale TAM. It is a falsifiable beachhead model. The first market-sizing gate is whether real constituents pay for a completed, deliverable civic letter after seeing a preview.

## Revenue Model

The current revenue model is transactional checkout:

| Tier | Price | Operational meaning | Evidence |
|---|---:|---|---|
| Single Official | $5 | Send to 1 official | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Three Officials | $15 | Send to 3 officials | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Full Spread | $25 | Send to all matched officials | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |

Legacy constraints require a 40% margin floor after Stripe fees [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The current payment route implements tier prices, but repo evidence does not show a live per-job cost check before checkout [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. That is a finance-control gap, not a positioning issue.

Future revenue streams named in legacy plans, such as API access for organizations, should remain out of scope until individual paid delivery is validated [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md)].

## Financial Model

This table reconciles a basic revenue build against implemented pricing. It is for validation planning only, not an investment forecast.

| Case | Paid submissions/month | Avg price | Monthly revenue | Notes |
|---|---:|---:|---:|---|
| Proof beta | 10 | $15 | $150 | [assumption: minimal paid usage x implemented midpoint price] |
| Operator break-even test | 100 | $15 | $1,500 | [assumption: round operating test; not proven by repo data] |
| Starter operating case | 400 | $15 | $6,000 | [assumption: legacy month-scale planning figure x implemented midpoint price] |
| Stretch case | 1,000 | $15 | $15,000 | [assumption: volume at which legacy moat hypothesis starts to matter] |

Known cost figures from the repo and planning files:

- Backend droplet plan: approximately $96/month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md)].
- Mercury reserve target: $1,500 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md)].
- Treasury warning threshold: $2,000 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Treasury emergency threshold: $500 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Reconciliation discrepancy alert: greater than $0.10 [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- Job overage pause threshold: 150% of estimated budget [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- Bounce-rate pause threshold: 10% per domain [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].

The earlier claim of 91% gross margin is not accepted as evidence because no live unit-cost ledger is present [assumption: legacy plan math may be directionally useful but unvalidated]. A serious model needs actual token spend, Postmark cost, Stripe fee, refund, review-time, and deliverability data from paid jobs.

## Competition

The legacy plan names Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice as comparison points [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [.planning/PROJECT.md](.planning/PROJECT.md)]. Because network research is disabled, their current products, pricing, and capabilities are not independently verified [assumption: competitor list is inherited from repo planning].

Practical competitive frame:

| Competitor type | Named examples | Why CivicState might differ | Why that may not matter |
|---|---|---|---|
| Citizen letter tools | Resistbot | Citation-backed research and paid delivery workflow [assumption: legacy plan says Resistbot lacks research/citation layer] | Free or familiar tools may be good enough. |
| Petition platforms | Change.org | Direct letters to officials, not just public signatures [assumption: legacy plan positioning] | Petitions have social distribution that CivicState lacks at launch. |
| Legal/document tools | LegalZoom | Civic-specific, lower-friction communication [assumption: legacy plan positioning] | Users may confuse citation-backed letters with legal advice, increasing trust and liability risk. |
| Enterprise advocacy tools | Quorum, VoterVoice | Individual $5/$15/$25 checkout rather than organization contracts [assumption: legacy plan positioning] | Enterprises may already own official data, deliverability, and compliance infrastructure. |

The defensible wedge is not "AI writes letters." The wedge must be verified official routing, citation verification, safe delivery, and a trustworthy compliance posture.

## Go-To-Market

The legacy go-to-market is SEO-led: opt-in public campaign pages create long-tail civic content [evidence: [.planning/GENESIS.md](.planning/GENESIS.md), [MASTER_PLAN.md](MASTER_PLAN.md)]. As of 2026-06-23 [evidence: worker dispatch], the current source tree does not show public campaign pages as a mature acquisition engine [evidence: repo file scan].

Validation sequence:

- Start with operator-recruited beta users, not paid ads [assumption: cheapest way to learn given no revenue evidence].
- Limit scope to a few jurisdictions where official lookup and deliverability can be manually audited [assumption: reduces false confidence from incomplete coverage].
- Measure preview-to-payment conversion, deliverability, and official response rate before expanding content distribution [assumption: these are direct proof points for willingness to pay and value delivered].
- Publish public campaign pages only after privacy, moderation, and opt-in controls have been tested [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Go-to-market kill switch: if users will not pay after seeing a researched preview, SEO traffic is a vanity plan because the core monetization step is unproven.

## Risks And Anti-Plan

The partner case against the deal:

- Identity risk: the dispatch says Brooks History, while the repo, app, and plans say CivicState. Until the operator resolves this, the asset cannot be packaged honestly [evidence: worker dispatch, [package.json](package.json)].
- Demand risk: there is no repo evidence of paid customers, traffic, retention, or repeat usage; current revenue is $0 [evidence: [.planning/existing-state.md](.planning/existing-state.md)].
- Deliverability risk: government inboxes may reject or ignore templated AI-assisted mail; the product dies if letters do not arrive or are treated as spam [assumption: civic-email deliverability is operationally uncertain without live data].
- Legal/compliance risk: the product sits near legal advice, lobbying, privacy, AI disclosure, CAN-SPAM, harassment, and defamation boundaries [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Data-quality risk: wrong officials or bad citations destroy trust faster than polished copy creates it [evidence: [apps/worker/src/lib/legal/citation-verifier.ts](apps/worker/src/lib/legal/citation-verifier.ts), [apps/api/src/lib/officials/lookup.ts](apps/api/src/lib/officials/lookup.ts)].
- Execution risk: current worker data flow and schema/route mismatches suggest the apparent end-to-end path may not run cleanly without fixes [evidence: [apps/worker/src/engine/state-machine.ts](apps/worker/src/engine/state-machine.ts), [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts)].
- Moat risk: if the only output is a better-written email, general AI tools can imitate it; durable advantage requires verified data and delivery history [assumption: generic AI substitution risk].

Anti-plan: do not raise, pitch, or scale marketing until the operator confirms the asset identity, the workflow sends a paid letter end-to-end, and a manually audited beta proves users pay and letters arrive.

## Assumption Ledger

| Assumption | Basis | Validation method |
|---|---|---|
| Users will pay $5/$15/$25 for civic letters | [evidence: implemented pricing route] plus legacy plan | Run preview-to-checkout beta and record conversion. |
| A $15 average price is a reasonable planning midpoint | [assumption: midpoint of implemented tiers] | Compare actual tier mix after first paid cohort. |
| 3% conversion is the minimum gate | [assumption: inherited from legacy plan] | Replace with observed conversion after beta. |
| 85% inbox placement is a meaningful deliverability bar | [assumption: inherited from legacy plan; no external verification] | Seed and monitor government-domain delivery tests. |
| 95% federal/state and 60% local official coverage are useful targets | [assumption: inherited from legacy plan; no external verification] | Audit sampled ZIP codes against official sources. |
| SEO can become acquisition | [assumption: legacy go-to-market theory] | Ship opt-in pages, measure impressions and conversions. |
| One operator can handle review load | [assumption: legacy plan] | Track flagged-queue count, oldest item age, and review minutes. |

## Surprise Spikes

- Repo identity spike: the project is dispatched as Brooks History, but all product artifacts say CivicState [evidence: worker dispatch, [package.json](package.json)].
- Stale-state spike: `.planning/existing-state.md` says zero application code existed, but the repo now has web/API/worker/shared code [evidence: [.planning/existing-state.md](.planning/existing-state.md), repo file scan].
- Build-completeness spike: `.planning/ROADMAP.md` marks all phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but current source inspection shows unresolved flow and schema risks [evidence: [apps/worker/src/engine/state-machine.ts](apps/worker/src/engine/state-machine.ts), [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts)].
- Investability spike: registry explicitly warns this may be personal/research rather than near-term investible [evidence: registry note in worker dispatch].

## Operating Constraints

- No legal advice, legal filings, regulatory submissions, or claim filing [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Auth is required before payment, not before preview [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Data retention expectations include 72-hour deletion workflow, 7-year financial/audit retention, and 24-month agent log retention [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- Official opt-out enforcement and spam complaint suppression are mandatory [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)].
- The margin-control promise requires actual per-job cost enforcement before checkout or delivery [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

## Buildable Next Milestones

The next work should prove the thesis, not add surface area:

- Fix identity and naming: operator decides whether this repo is Brooks History, CivicState, or a misrouted asset.
- Prove end-to-end paid delivery in a seeded environment with real provider test keys and a known official/contact fixture.
- Repair schema/route mismatches and worker job identity flow.
- Build an official coverage audit for sampled ZIP codes before claiming jurisdiction breadth.
- Add a finance-control check tying tier price, estimated token cost, provider fees, and minimum margin.
- Run a manually recruited beta before any SEO or public-campaign strategy.

## Freshness And Review Cadence

This plan is current as of 2026-06-23 [evidence: worker dispatch]. Because it relies on workspace-only evidence, the next review must either confirm external facts with network research or keep every market, legal, and competitor claim labeled as an assumption. Required next review date: 2026-07-23 [assumption: 30-day review interval appropriate for a watchlist asset].
