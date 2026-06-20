# CivicState Business Plan

## Executive Snapshot

As of 2026-06-20 [evidence: runner environment date], CivicState is a civic-tech web application for U.S. residents who want help turning a specific civic concern into researched, citation-backed letters to government officials. The current repo contains a Next.js frontend, Express API, BullMQ worker, Prisma schema, Clerk/Stripe/Postmark-oriented routes, legal citation helpers, and six worker agents [evidence: `apps/web`, `apps/api/src`, `apps/worker/src`, `packages/shared/prisma/schema.prisma`]. It is not yet an investible standalone business until demand, official-contact coverage, deliverability, legal-review load, and willingness-to-pay are validated [assumption: registry watchlist note plus workspace-only review].

The practical plan is a narrow paid workflow: users describe an issue, provide a ZIP code, preview researched letters, pay a one-time package price, and CivicState sends individual emails to matched officials. Existing soul materials price launch packages at $5, $15, and $25 [evidence: `.planning/PROJECT.md`, `MASTER_PLAN.md`]. The business remains a research asset unless the operator confirms it should pitch as a venture-scale business [evidence: dispatch registry note].

## Thesis Current

CivicState's strongest near-term thesis is not "AI for politics"; it is "paid civic correspondence with verified routing, citation discipline, and delivery tracking." The wedge is operational convenience for citizens who would otherwise abandon a multi-hour task [assumption: product thesis from existing soul, not market-validated]. The repository now supports this thesis better than the stale existing-state audit suggests: the audit says zero application code exists [evidence: `.planning/existing-state.md`], but the current tree contains 5,990 TypeScript source lines across API, worker, and shared packages [evidence: local `wc -l` over `apps/api/src`, `apps/worker/src`, `packages/shared/src`].

The thesis fails if any one of three things is false: users will not pay even $5 [evidence: `.planning/PROJECT.md`; assumption: unvalidated price floor], officials' email systems reject or ignore the sends at high rates [assumption: deliverability risk from existing soul], or citation verification cannot be made reliable enough to avoid false legal references [assumption: AI/legal quality risk from existing soul].

## What Is Real Today

Real assets in the repo:

| Asset | Current state | Honesty label |
|---|---|---|
| Product plan | Detailed CivicState plan, pricing, architecture, and unit economics exist in `MASTER_PLAN.md` | [evidence: `MASTER_PLAN.md`] |
| Application code | Next.js app, Express API, BullMQ worker, agent files, Prisma schema, auth/payment/delivery/admin routes exist | [evidence: `apps/web`, `apps/api/src`, `apps/worker/src`, `packages/shared/prisma/schema.prisma`] |
| Data model | Prisma models cover users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs | [evidence: `packages/shared/prisma/schema.prisma`] |
| Operational constraints | DigitalOcean backend, Vercel frontend, Clerk auth, Stripe checkout, Postmark delivery, PostgreSQL, Redis, and BullMQ are the stated stack | [evidence: `.planning/PROJECT.md`, `package.json`, app package manifests] |
| Revenue | $0 verified revenue in workspace | [evidence: no production revenue data present in repo; `.planning/existing-state.md`] |
| Users | No verified users or paid campaigns in workspace | [evidence: no production export or analytics file present in repo] |

Do not market this as traction. Market it as a built or partially built product thesis pending operator and market validation.

## Customer Definition

Primary customer: a U.S. resident with a specific civic issue, a desired outcome, and low tolerance for researching jurisdiction, law, official contact details, and formal letter structure [assumption: target user from existing soul, not externally validated].

First buyer profile:

- Individual resident, not an organization [evidence: `.planning/GENESIS.md`].
- Has a ZIP-code-specific issue such as noise, roads, zoning, school policy, code enforcement, or agency response [evidence: `.planning/GENESIS.md`].
- Wants a polished constituent communication, not legal advice, legal filing, or litigation support [evidence: `MASTER_PLAN.md`].
- Willing to pay $5 to $25 for time savings and confidence [evidence: `.planning/PROJECT.md`; assumption: willingness-to-pay unvalidated].

Non-customers: campaigns that require legal representation, bulk lobbying, harassment, defamation risk, threats, regulatory filings, insurance demands, medical claims, or communications on behalf of business entities [evidence: `MASTER_PLAN.md`, `.planning/REQUIREMENTS.md`].

## Market Sizing

Workspace-only mode means external population, civic-engagement, and conversion figures cannot be verified. This sizing is deliberately bottom-up and labeled as an assumption ledger, not a sourced market fact.

| Layer | Method | Annual transaction estimate | Annual revenue estimate |
|---|---|---:|---:|
| TAM proxy | 250,000,000 U.S. adults [assumption: broad model-memory population basis, unverified] x 20% with at least one civic issue per year [assumption: behavioral placeholder] x 10% willing to pay for assistance [assumption: price-conversion placeholder] | 5,000,000 transactions [assumption: formula result] | $75,000,000 at $15 average revenue per transaction [assumption: formula result; price anchored to repo plan] |
| SAM launchable | 10 metro/state wedges [assumption: operator-selectable geography] x 2,000,000 residents per wedge [assumption: average launch market placeholder] x 15% annual issue incidence [assumption: behavioral placeholder] x 3% paid conversion [assumption: lower conversion case] | 90,000 transactions [assumption: formula result] | $1,350,000 at $15 average revenue per transaction [assumption: formula result; price anchored to repo plan] |
| SOM operating target | Month 24 plan of 1,200 submissions per month [evidence: `MASTER_PLAN.md`] x 12 months [assumption: annualization method] | 14,400 transactions [assumption: formula result from repo plan] | $288,000 at $20 average revenue per transaction [evidence: `MASTER_PLAN.md`; assumption: annualized from month 24 run-rate] |

This market is not VC-scale unless the product either expands into organization/API revenue, becomes a repeat-use civic workflow, or proves unusually efficient SEO acquisition [assumption: venture-scale interpretation].

## Revenue Model

Launch revenue is transactional letter delivery:

- Single package: $5 for one official [evidence: `.planning/PROJECT.md`; assumption: final packaging not market-tested].
- Three-pack package: $15 for three officials [evidence: `.planning/PROJECT.md`; assumption: final packaging not market-tested].
- Full-spread package: $25 for all matched officials [evidence: `.planning/PROJECT.md`; assumption: final packaging not market-tested].

Deferred revenue ideas are priority complex review and future organization/API access [evidence: `MASTER_PLAN.md`]. They should not be counted as launch revenue until the individual paid pipeline works [assumption: sequencing judgment].

## Financial Model

The existing plan's core reconciliation is transaction count x average realized price = revenue. Month 12 revenue is 400 submissions x $18 average realized price = $7,200 monthly revenue [evidence: `MASTER_PLAN.md`]. Month 24 revenue is 1,200 submissions x $20 average realized price = $24,000 monthly revenue [evidence: `MASTER_PLAN.md`].

Unit economics from the current soul:

| Package | Revenue | Variable costs | Gross profit | Gross margin |
|---|---:|---:|---:|---:|
| Amplify example | $15.00 [evidence: `MASTER_PLAN.md`] | $1.20 total COGS [evidence: `MASTER_PLAN.md`] | $13.80 [evidence: `MASTER_PLAN.md`] | 92% [evidence: `MASTER_PLAN.md`] |
| Complex example | $25.00 [evidence: `MASTER_PLAN.md`] | $1.94 total COGS [evidence: `MASTER_PLAN.md`] | $23.06 [evidence: `MASTER_PLAN.md`] | 92% [evidence: `MASTER_PLAN.md`] |

Run-rate scenarios:

| Scenario | Revenue build | Monthly revenue | Notes |
|---|---:|---:|---|
| Month 3 | 50 submissions x $15 average realized price [evidence: `MASTER_PLAN.md`] | $750 [evidence: `MASTER_PLAN.md`] | Pre-SEO validation case [assumption: existing plan] |
| Month 6 | 120 submissions x $16 average realized price [evidence: `MASTER_PLAN.md`] | $1,920 [evidence: `MASTER_PLAN.md`] | Early organic traffic case [assumption: existing plan] |
| Month 12 | 400 submissions x $18 average realized price [evidence: `MASTER_PLAN.md`] | $7,200 [evidence: `MASTER_PLAN.md`] | SEO traction case [assumption: existing plan] |
| Month 24 | 1,200 submissions x $20 average realized price [evidence: `MASTER_PLAN.md`] | $24,000 [evidence: `MASTER_PLAN.md`] | Authority case [assumption: existing plan] |

Fixed costs are modeled at about $200 per month [evidence: `MASTER_PLAN.md`]. The break-even target is about $340 MRR, or approximately 25 Amplify submissions per month [evidence: `MASTER_PLAN.md`]. These numbers are useful for a bootstrap validation plan, not proof of investibility.

## Go To Market

Launch with a single-metro or single-state wedge, not a national promise [assumption: operational risk control]. The first wedge should be chosen for official-data coverage, email deliverability tests, and operator familiarity [assumption: practical validation method].

Sequence:

1. Operator-led beta with 5 to 10 users [evidence: `.planning/raw-intake.md`] and no paid acquisition [evidence: `.planning/GENESIS.md`].
2. Validate willingness to pay: target at least 3% paid conversion from qualified previews [evidence: `.planning/PROJECT.md`; assumption: benchmark target not externally sourced].
3. Validate official coverage: target at least 95% federal/state coverage and at least 60% local coverage before broader launch [evidence: `.planning/PROJECT.md`; assumption: coverage targets from existing soul].
4. Validate deliverability: target at least 85% inbox placement on `.gov` or official domains [evidence: `.planning/PROJECT.md`; assumption: deliverability target from existing soul].
5. Only after the paid workflow is stable, publish opt-in read-only campaign pages for SEO [evidence: `.planning/GENESIS.md`, `MASTER_PLAN.md`].

## Competition

The plan names real alternatives but the workspace cannot verify live positioning. Treat this as a competitor map for validation, not a market report.

| Competitor / substitute | Existing soul claim | CivicState differentiation to validate |
|---|---|---|
| Resistbot | Closest lightweight civic-letter substitute [evidence: `MASTER_PLAN.md`; assumption: live positioning unverified] | Adds research, citation verification, and paid delivery tracking [assumption: product differentiation] |
| Change.org | Petition hosting alternative [evidence: `MASTER_PLAN.md`; assumption: live positioning unverified] | Focuses on directed official letters rather than public signature collection [assumption: product differentiation] |
| LegalZoom | Document-drafting substitute [evidence: `MASTER_PLAN.md`; assumption: live positioning unverified] | Avoids legal-advice positioning and stays civic-specific [assumption: positioning] |
| Quorum / VoterVoice | Organization-facing advocacy tools [evidence: `.planning/PROJECT.md`; assumption: pricing and current product details unverified] | Serves individual residents at transaction prices [assumption: positioning] |
| Manual outreach | Current default behavior [evidence: `MASTER_PLAN.md`] | Compresses official lookup, research, drafting, payment, and delivery into one workflow [assumption: value proposition] |

## Risks And Anti-Plan

A skeptical partner should try to kill this deal on the following grounds:

- This may be a feature, not a company: a good letter-generation workflow can be copied by civic groups, advocacy SaaS incumbents, or general AI assistants [assumption: competitive risk].
- Demand may be moral-support demand, not paid demand: residents may say they want civic help but abandon at a $5 checkout [assumption: demand risk; price anchored in `.planning/PROJECT.md`].
- Official inboxes may treat the output as synthetic spam, depressing replies and creating reputational risk for the sender and platform [assumption: deliverability/reputation risk].
- Citation errors are existential: one fabricated statute or misleading legal claim can break user trust and create legal-adjacent exposure [assumption: AI quality risk].
- The moderation burden may be heavier than the economics support, especially for accusations, threats, harassment, and defamation-adjacent issues [evidence: `MASTER_PLAN.md`; assumption: workload risk].
- The SEO flywheel may never start because opt-in public pages could be sparse, low-authority, duplicated, or legally sensitive [assumption: acquisition risk].
- The registry explicitly flags this as a personal/research asset and not near-term investible unless the operator chooses to pitch it as a business [evidence: dispatch registry note].

Anti-plan: do not raise or scale until the first wedge proves paid conversion, deliverability, coverage, and moderation load. If those gates fail, preserve the code as a civic research tool or internal demo and stop presenting it as venture-backable [assumption: EIR recommendation].

## Assumption Ledger

| Assumption | Why it matters | Validation test |
|---|---|---|
| Users will pay $5 to $25 for this workflow [evidence: `.planning/PROJECT.md`; assumption: unvalidated WTP] | Revenue exists only if previews convert | Track preview-to-paid conversion in beta |
| AI can research and draft with verified citations at acceptable quality [assumption: model capability unverified in production] | Trust and legal risk depend on this | Require citation-verification pass and human review for failures |
| Official lookup can cover local officials well enough [assumption: Cicero/BallotReady/provider availability unverified] | Bad routing destroys value | Run provider spike and coverage report by ZIP sample |
| Email delivery can land in official inboxes [assumption: deliverability unverified] | Paid job is worthless if blocked | Warm domain and measure per-domain bounce/inbox results |
| One operator can handle review load [assumption: staffing model unverified] | Margins collapse if review is frequent | Measure flagged rate and minutes per flagged submission |
| SEO can become low-cost acquisition [assumption: no current traffic data] | CAC thesis depends on it | Publish opt-in pages only after compliance review and measure impressions |

## Evidence Sources

Workspace evidence used:

- [`MASTER_PLAN.md`](./MASTER_PLAN.md): pricing, architecture, unit economics, phased plan, compliance boundaries.
- [`.planning/PROJECT.md`](./.planning/PROJECT.md): current product framing, requirements, constraints, risks, validation gates.
- [`.planning/GENESIS.md`](./.planning/GENESIS.md): assumptions, value chain, distribution hypothesis, target user, moat hypothesis.
- [`.planning/REQUIREMENTS.md`](./.planning/REQUIREMENTS.md): requirement status, compliance, moderation, official lookup, payment, delivery, treasury scope.
- [`packages/shared/prisma/schema.prisma`](./packages/shared/prisma/schema.prisma): implemented data model.
- [`apps/api/src`](./apps/api/src), [`apps/worker/src`](./apps/worker/src), [`apps/web/app`](./apps/web/app): current application implementation surface.

No network research was available in this worker run. Every external market, population, competitor, pricing, legal, or conversion claim that is not directly present in repo files is labeled as an assumption.

## Freshness And Document Dates

Existing planning documents date the core plan to 2026-04-25 [evidence: `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`] and the master plan to March 2026 [evidence: `MASTER_PLAN.md`]. This EIR upgrade is dated 2026-06-20 [evidence: runner environment date]. The stale surprise is `.planning/existing-state.md`: it says there is zero application source code [evidence: `.planning/existing-state.md`], but the repository now contains implemented app packages [evidence: `apps/web`, `apps/api/src`, `apps/worker/src`].

## Surprise Spikes

- Existing-state audit is stale and undercounts progress: it describes a greenfield template with zero app code, while the repo now includes a substantive monorepo implementation [evidence: `.planning/existing-state.md`, `apps/*`, `packages/shared/*`].
- Package count conflict: `.planning/PROJECT.md` says the $15 tier is a three-pack [evidence: `.planning/PROJECT.md`], while `MASTER_PLAN.md` unit economics model an Amplify package with five drafts [evidence: `MASTER_PLAN.md`]. This must be reconciled before investor or customer-facing pricing.
- Phase status conflict: `.planning/ROADMAP.md` marks all four phases complete [evidence: `.planning/ROADMAP.md`], while `.planning/REQUIREMENTS.md` still has many launch requirements unchecked [evidence: `.planning/REQUIREMENTS.md`]. Treat checked roadmap phases as plan execution artifacts, not proof that production launch gates are complete.

## Operator Validation Gates

Before calling this a business, require:

- At least 30 qualified beta previews [assumption: minimum validation sample] with explicit tracking of preview-to-paid conversion.
- At least 3% paid conversion from qualified previews [evidence: `.planning/PROJECT.md`; assumption: target threshold].
- At least 85% official-domain delivery success/inbox placement [evidence: `.planning/PROJECT.md`; assumption: target threshold].
- At least 95% federal/state official coverage and at least 60% local official coverage in the selected wedge [evidence: `.planning/PROJECT.md`; assumption: target threshold].
- Less than 30 minutes per day of routine operator work at launch volume [evidence: `.planning/PROJECT.md`; assumption: operator capacity threshold].
