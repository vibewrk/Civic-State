# CivicState Business Plan

## Snapshot Thesis

As of 2026-06-22 [evidence: dispatch current_date], this repo is labeled `brooks-history` by the fleet but contains a CivicState product build [evidence: package.json; MASTER_PLAN.md; .planning/PROJECT.md]. CivicState turns a resident's civic concern into researched, citation-backed constituent letters routed to government officials with one-time checkout tiers of $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].

Current status: watchlist personal/research asset, not a near-term investible BOS unless the operator explicitly confirms it should pitch as a business [evidence: dispatch registry notes]. The repo contains a Next.js frontend, Express API, BullMQ worker agents, Prisma data model, Stripe payment route, Postmark delivery worker, Clerk authentication middleware, compliance routes, and tests [evidence: apps/web/app; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests/]. The data room does not show production users, production revenue, external market validation, or production inbox-placement evidence [evidence: .planning/existing-state.md; .planning/PROJECT.md].

Recommendation as of 2026-06-22 [evidence: dispatch current_date]: keep as a constrained validation project. Do not present as venture-ready until willingness to pay, official coverage, citation quality, delivery, and legal/compliance review clear explicit gates [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

## Surprise Spikes

- The worker project id is `brooks-history`, but the product identity in the repo is CivicState [evidence: dispatch; package.json; MASTER_PLAN.md]. This mismatch should be resolved before any wrk.vc dossier is published.
- `.planning/existing-state.md` says there is zero application code and $0 revenue [evidence: .planning/existing-state.md], while this worktree contains application code, route implementations, Prisma models, and tests [evidence: apps/; packages/shared/prisma/schema.prisma; tests/]. Treat the older audit as stale where contradicted by current files.
- `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], but `.planning/REQUIREMENTS.md` still marks many product requirements pending [evidence: .planning/REQUIREMENTS.md]. Completion claims need staging or production verification.
- The compliance export route selects fields named `tier` and `body`, while the Prisma schema names the comparable fields `pricingTier` and `content` [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma]. That is a launch-readiness risk, not a business validation result.

## Evidence Base And Honesty Labels

Evidence used: repo files and dispatch registry notes only. Workspace evidence includes `MASTER_PLAN.md`, `.planning/PROJECT.md`, `.planning/GENESIS.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/existing-state.md`, `package.json`, `apps/api/src`, `apps/worker/src`, `apps/web/app`, `packages/shared/prisma/schema.prisma`, and `tests/` [evidence: repo files].

No network research was performed because this run is workspace-only [evidence: dispatch]. External market claims, market-sizing logic, adoption forecasts, and competitive interpretation are therefore tagged as assumptions. Repo/planning files are evidence for what the repo asserts or implements; they are not evidence that an external market fact is true.

Freshness: this plan is current as of 2026-06-22 [evidence: dispatch current_date]. It should be considered stale after 2026-09-22 [assumption: quarterly soul refresh cadence] or earlier if production deployment, paid conversion, official coverage, deliverability, legal review, or product identity changes.

## Customer Definition

Primary customer: an individual US resident with a specific civic frustration, such as noise, potholes, zoning, enforcement failure, school policy, or agency responsiveness, who would contact government if research, routing, drafting, and delivery were handled for them [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

Validation user: mobile-first, non-expert, one-off intent, paying per campaign rather than by subscription [evidence: .planning/PROJECT.md; .planning/GENESIS.md]. Excluded from v1: legal claimants, legal filings, regulatory submissions, lobbying representation, organizations, HOAs, nonprofits, third-party API buyers, subscriptions, certified mail, fax, public coalition features, automated follow-up letters, multilingual expansion, and native mobile apps [evidence: .planning/REQUIREMENTS.md; .planning/GENESIS.md].

The hard customer question: will a resident pay $5 to $25 [evidence: apps/api/src/routes/payments.ts] for a better civic letter when free contact forms, free email, and free advocacy tools exist [assumption: common substitute set, not externally verified]? The repo's own answer is not "yes"; it is "measure at least 3% preview-to-payment conversion" [evidence: .planning/PROJECT.md].

## Problem

The resident job has four steps: identify who has jurisdiction, find applicable law or policy, draft effective constituent language, and send it to verified contacts [evidence: .planning/GENESIS.md]. The product thesis is that many residents abandon that workflow because the research and routing burden is higher than the perceived payoff [assumption: product thesis from repo planning, not externally validated].

The failure modes are specific: hallucinated citations, wrong officials, incomplete local coverage, government spam filtering, threatening or defamatory user input, user confusion with legal advice, political-speech privacy risk, and operational review backlog [evidence: .planning/PROJECT.md; apps/api/src/lib/moderation.ts; apps/worker/src/lib/legal/citation-verifier.ts].

## Product Reality

Implemented or represented in code:

- Next.js app pages for home, submit, dashboard, admin, privacy, and terms [evidence: apps/web/app].
- Express routes for health, submissions, officials, payments, campaigns, admin, compliance, and webhooks [evidence: apps/api/src/index.ts].
- Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- BullMQ workers for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/index.ts].
- Moderation, official lookup, citation verification, Stripe Checkout session creation, Postmark delivery, CCPA-style deletion/export, and admin flagged-queue concepts [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/api/src/routes/payments.ts; apps/api/src/routes/compliance.ts; apps/api/src/routes/admin.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/delivery.ts].

Not proven in this repo: production deployment, live official coverage, real customer acquisition, live payment volume, live .gov inbox placement, legal review, production support load, or durable response rates [evidence: .planning/existing-state.md; .planning/PROJECT.md].

## Market Sizing

Workspace-only mode cannot support a top-down TAM. The honest sizing method is a bottom-up validation ladder tied to paid submissions and the repo's checkout tiers.

| Scope | Method | Annual Paid Submissions | Blended Price | Annual Revenue |
|---|---|---:|---:|---:|
| Operator proof | 25 paid submissions/month x 12 months [assumption: repo break-even target converted to annual volume] | 300 [assumption: arithmetic] | $15 [assumption: tier mix using repo prices] | $4,500 [assumption: 300 x $15] |
| Local wedge | 250 paid submissions/month x 12 months [assumption: one-city wedge, no external source] | 3,000 [assumption: arithmetic] | $15 [assumption: tier mix using repo prices] | $45,000 [assumption: 3,000 x $15] |
| Niche national | 2,500 paid submissions/month x 12 months [assumption: niche SEO scale, no external source] | 30,000 [assumption: arithmetic] | $15 [assumption: tier mix using repo prices] | $450,000 [assumption: 30,000 x $15] |

This is not a TAM claim. The investibility gate is whether the first wedge can show at least 3% paid conversion, at least 85% inbox placement on government domains, at least 95% federal/state coverage, and at least 60% local coverage [evidence: .planning/PROJECT.md].

## Revenue Model And Pricing

Launch revenue is transactional one-time checkout:

- Single official: $5 [evidence: apps/api/src/routes/payments.ts].
- Three officials: $15 [evidence: apps/api/src/routes/payments.ts].
- Full spread: $25 [evidence: apps/api/src/routes/payments.ts].

The active plan removed subscriptions from launch scope [evidence: MASTER_PLAN.md]. Future API access for HOAs, nonprofits, or civic organizations is deferred until the citizen pipeline is stable [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

Pricing discipline: the original plan requires a 40% net margin floor after fees [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. Current code uses hardcoded tiers, not a dynamic pricer [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md].

## Financial Model

Base unit assumptions:

- Blended price: $15 [assumption: 30% single at $5, 40% three-pack at $15, 30% full-spread at $25; no live mix data].
- Variable AI/delivery cost: $0.75 per paid submission [assumption: high end of repo Genesis token-cost range of $0.35-$0.75, excluding unmodeled support cost].
- Backend droplet: about $96/month [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- Maximum planned burn: $132.50/month [evidence: .planning/PROJECT.md].
- Starting Mercury reserve: $1,500 [evidence: .planning/PROJECT.md].
- Treasury warning threshold: $2,000 [evidence: .planning/PROJECT.md; apps/worker/src/lib/treasury.ts].
- Treasury emergency threshold: $500 [evidence: .planning/PROJECT.md; apps/worker/src/lib/treasury.ts].
- Chargeback target: below 0.5% [evidence: .planning/PROJECT.md].

| Scenario | Paid Submissions / Month | Revenue | Variable Cost | Planned Burn | Contribution After Variable + Burn |
|---|---:|---:|---:|---:|---:|
| Proof | 25 [assumption: repo break-even validation target] | $375 [assumption: 25 x $15] | $18.75 [assumption: 25 x $0.75] | $132.50 [evidence: .planning/PROJECT.md] | $223.75 [assumption: arithmetic] |
| Beta | 100 [assumption: early wedge target] | $1,500 [assumption: 100 x $15] | $75 [assumption: 100 x $0.75] | $132.50 [evidence: .planning/PROJECT.md] | $1,292.50 [assumption: arithmetic] |
| Local wedge | 1,000 [assumption: city-scale target] | $15,000 [assumption: 1,000 x $15] | $750 [assumption: 1,000 x $0.75] | $132.50 [evidence: .planning/PROJECT.md] | $14,117.50 [assumption: arithmetic] |

The table reconciles mechanically: revenue equals paid submissions multiplied by blended price, and contribution equals revenue minus variable cost minus planned burn [assumption: arithmetic model]. It excludes human review labor, refunds, legal review, support, paid local-data providers, deliverability remediation, and tax/accounting cost [assumption: diligence adjustment based on repo risk profile].

## Go To Market

The repo's planned primary GTM is organic search through issue-specific civic action content and opt-in public campaign pages [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. That cannot yet be claimed as active because public campaign publishing and SEO distribution are deferred or not evidenced as production traffic [evidence: .planning/PROJECT.md; .planning/existing-state.md].

Practical validation motion:

- Start with one state and a short list of civic issue categories [assumption: limits official-coverage and legal-source variance].
- Recruit early users through operator-owned channels or direct civic issue communities [assumption: no paid acquisition evidence in workspace].
- Measure preview completion, checkout conversion, citation verification pass rate, delivery success, bounce rate, spam complaints, refunds, chargebacks, flagged-review load, and official replies [evidence: .planning/PROJECT.md; apps/worker/src/agents/delivery.ts].
- Delay paid acquisition, SEO scale claims, and public campaign expansion until the core paid-delivery loop proves itself [assumption: risk-first GTM sequencing].

## Competition

Named alternatives and substitutes:

- Resistbot: closest lightweight constituent-letter alternative; repo positioning says CivicState differentiates with research-backed citations [evidence: MASTER_PLAN.md; .planning/PROJECT.md; assumption: current Resistbot capabilities not externally verified].
- Change.org: petition hosting rather than individualized researched letter delivery [evidence: MASTER_PLAN.md; assumption: current product scope not externally verified].
- LegalZoom: document drafting adjacency, not official routing for constituent communication [evidence: MASTER_PLAN.md; assumption: current product scope not externally verified].
- Quorum and VoterVoice: enterprise advocacy platforms for organizations; repo planning describes them as expensive organization tools [evidence: .planning/PROJECT.md; assumption: current pricing/features not externally verified].
- Manual direct outreach: free official contact forms, email, phone, and in-person testimony [evidence: MASTER_PLAN.md; assumption: common substitute set].

Competitive risk: the moat is weak before volume. If a civic platform or enterprise advocacy vendor adds citation-backed AI drafting, CivicState needs proprietary official-contact quality, verified citation history, delivery data, and search content to matter [assumption: competitive dynamics inferred from repo positioning].

## Risks And Anti-Plan

The skeptical partner case:

- This may be a feature, not a company: an incumbent civic tool could add better drafting and absorb the use case [assumption: market-structure concern].
- Users may not pay when free email and contact forms exist. The repo's own gate requires at least 3% preview-to-payment conversion [evidence: .planning/PROJECT.md].
- Government inbox deliverability can break the core promise. The repo's own gate requires at least 85% inbox placement on .gov domains [evidence: .planning/PROJECT.md].
- Official coverage is not solved until sampled. The repo requires at least 95% federal/state coverage and at least 60% local coverage [evidence: .planning/PROJECT.md].
- Legal-adjacent drafting creates liability, trust, and user-confusion risk even with disclaimers [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- Political opinion and civic identity are sensitive data; encryption and deletion routes exist, but the operating policy still needs legal review [evidence: packages/shared/prisma/schema.prisma; apps/api/src/routes/compliance.ts].
- The SEO flywheel depends on public campaign pages, but the launch plan defers publisher/public campaign mechanics [evidence: .planning/PROJECT.md; .planning/GENESIS.md].
- The repo identity mismatch and stale planning contradictions reduce investor trust [evidence: dispatch; .planning/existing-state.md; package.json].

Anti-plan: do not fund paid acquisition, organization APIs, certified mail, fax, public coalition features, multi-language expansion, or multi-state scaling until a constrained geography proves paid conversion, citation quality, official coverage, deliverability, and legal/compliance readiness [assumption: risk-first operating plan].

## Assumption Ledger

| Assumption | Basis | Validation Test | Kill / Revise Trigger |
|---|---|---|---|
| Residents will pay $5-$25 for civic letters | Repo pricing and product thesis [evidence: apps/api/src/routes/payments.ts; .planning/GENESIS.md] | Checkout-enabled beta | Conversion below 3% [evidence: .planning/PROJECT.md] |
| $15 blended price is plausible | Modeled mix, no sales data [assumption: 30% / 40% / 30% tier mix] | Actual tier selection | Blended price below $10 [assumption: contribution stress threshold] |
| $0.75 variable cost is conservative enough | High end of repo token-cost range [evidence: .planning/GENESIS.md] | Track token, retry, and delivery cost | Cost above $2/submission [assumption: margin stress threshold] |
| Email-first delivery is enough | Launch excludes certified mail and fax [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md] | Seeded .gov deliverability test | Inbox placement below 85% [evidence: .planning/PROJECT.md] |
| Official lookup can cover enough recipients | Planned congress.gov, OpenStates, Cicero/BallotReady stack [evidence: .planning/PROJECT.md; apps/api/src/lib/officials/] | ZIP-code sample audit | Federal/state coverage below 95% or local coverage below 60% [evidence: .planning/PROJECT.md] |
| One operator can manage exceptions | Repo genesis assumption [evidence: .planning/GENESIS.md] | Track flagged queue age and count | Oldest flagged item above 24 hours or queue above 10 [evidence: .planning/ROADMAP.md] |

## Milestones And Gates

Minimum proof gates before business pitch:

- Product identity resolved: `brooks-history` versus CivicState [evidence: dispatch; package.json].
- Staging deploy verified for web, API, worker, PostgreSQL, Redis, Stripe webhook, Postmark webhook, and Clerk auth [evidence: package.json; apps/api/src/index.ts; apps/worker/src/index.ts].
- Schema/API mismatch fixed for compliance export [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].
- Official coverage audit clears at least 95% federal/state and at least 60% local coverage [evidence: .planning/PROJECT.md].
- Deliverability audit clears at least 85% government inbox placement [evidence: .planning/PROJECT.md].
- Paid beta clears at least 3% preview-to-payment conversion and chargebacks below 0.5% [evidence: .planning/PROJECT.md].
- Operator confirms legal/compliance posture and whether this should pitch as a business [evidence: dispatch registry notes].

## Roadmap Implications

The roadmap should pivot away from phase completion theater and toward proof work. The next work should be small, single-worker tasks that validate deployability, schema integrity, official coverage, citation verification, deliverability, paid conversion, and compliance readiness [evidence: .planning/REQUIREMENTS.md; apps/].
