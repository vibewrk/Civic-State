# CivicState EIR Business Plan

## Document Control

As of 2026-06-20 [evidence: worker context], this soul upgrade treats the repository as a civic letter-writing product whose current repo identity is CivicState, while the wrk.dog dispatch identifies the project as `brooks-history` [evidence: dispatch brief]. The plan is candidate-only until POM soul-review plus wrk.dog merge constitute adoption under the operator ruling dated 2026-06-12 [evidence: dispatch brief].

Registry constraint: this is on the watchlist and is currently framed as a personal/research asset, not a near-term investible BOS, unless the operator confirms it should pitch as a business [evidence: dispatch brief].

Primary repo sources:

- [MASTER_PLAN.md](./MASTER_PLAN.md) [evidence: root source]
- [.planning/PROJECT.md](./.planning/PROJECT.md) [evidence: planning source]
- [.planning/ROADMAP.md](./.planning/ROADMAP.md) [evidence: build roadmap source]
- [apps/api/src/routes/payments.ts](./apps/api/src/routes/payments.ts) [evidence: implemented payment route]
- [packages/shared/prisma/schema.prisma](./packages/shared/prisma/schema.prisma) [evidence: implemented data model]

## Ten-Second Read

CivicState turns a resident's civic concern into researched, citation-backed letters delivered to public officials; the investible version depends on proving willingness to pay, deliverability to government inboxes, official data coverage, and legal/compliance containment [evidence: .planning/PROJECT.md; assumption: no external market validation available in workspace-only mode].

## Thesis Current

The investible thesis is not "AI civic engagement is big." It is narrower: a single-purpose, paid workflow can monetize the abandoned task of researching an issue, finding the responsible officials, drafting a professional letter, and sending it with compliance controls [evidence: MASTER_PLAN.md; assumption: users value this avoided labor enough to pay].

The current verdict is conditional, not cleared. The planning file records a conditional go with 72% confidence, a beta conversion gate of at least 3%, a .gov inbox-placement gate of at least 85%, federal/state official coverage of at least 95%, and local official coverage of at least 60% [evidence: .planning/PROJECT.md]. Those figures are repo-authored planning targets, not market evidence [assumption: not externally validated during this workspace-only run].

The product should not be pitched as venture-ready until the operator validates that this repo is intended to be a business rather than a personal/research asset [evidence: dispatch brief].

## What Is Real Now

Implemented or repo-backed surface:

- Next.js web app with a CivicState landing page and submit flow entry point [evidence: apps/web/app/page.tsx].
- Express submission route with ZIP validation, content moderation, audit logging, and BullMQ classifier enqueueing [evidence: apps/api/src/routes/submissions.ts].
- Stripe Checkout route with three pricing tiers: $5 single, $15 three-pack, and $25 full-spread [evidence: apps/api/src/routes/payments.ts].
- Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, and agent action logs [evidence: packages/shared/prisma/schema.prisma].
- Worker agents registered for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/index.ts].
- Delivery code uses Postmark and skips domains whose recent bounce rate is above 10% [evidence: apps/worker/src/agents/delivery.ts].
- The legacy planning audit dated 2026-04-25 says no application code existed at that time [evidence: .planning/existing-state.md], which now conflicts with the current repo contents [evidence: apps/* and packages/*].

Not proven in the repo:

- No production traffic, revenue, paid conversion, inbox placement, official response rate, or retained user cohort is evidenced in workspace files [evidence: .planning/existing-state.md; assumption: no live metrics were available in the repo].
- No external market research was available because this run is workspace-only [evidence: dispatch brief].

## Customer Definition

Primary customer: a United States resident with a specific civic issue who would contact government if the research, official targeting, drafting, and delivery work were handled for them [evidence: .planning/GENESIS.md; assumption: U.S. resident segment remains the launch focus].

The best first customer is not a general activist. It is a time-constrained resident with a concrete local or state issue such as enforcement failure, zoning, noise, school policy, permitting, public safety, housing, or municipal service delivery [assumption: inferred from the product workflow and examples in .planning/GENESIS.md].

Excluded launch customers: organizations, legal claimants, people seeking legal advice, users attempting threats or defamation-risk allegations, bulk political operators, and anyone requiring certified mail, fax, legal filings, or claim submission [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

## Problem And Wedge

The job is a multi-step workflow that most residents abandon: identify jurisdiction, identify the right officials, find relevant authority, draft credible language, and deliver it in a format officials can process [evidence: .planning/GENESIS.md].

The wedge is a paid letter campaign, not a social network. The repo's active price points are $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts]. The product gives a free preview before requiring authenticated payment [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts].

## Product And Workflow

Launch workflow:

- User describes an issue, desired outcome, ZIP code, and anonymity preference [evidence: apps/api/src/routes/submissions.ts].
- Moderation blocks threats, flags risky content, or passes the submission while logging an HMAC-protected audit record [evidence: apps/api/src/routes/submissions.ts].
- Classifier, researcher, and drafter agents generate targeted letters with verified citations [evidence: apps/worker/src/index.ts; apps/worker/src/agents/researcher.ts].
- User selects a package and pays through Stripe Checkout [evidence: apps/api/src/routes/payments.ts].
- Delivery sends individual emails through Postmark, enforces opt-outs, and pauses domains above a 10% bounce threshold [evidence: apps/worker/src/agents/delivery.ts].
- Treasury and reconciliation workers record revenue and costs in append-only financial logs [evidence: apps/worker/src/index.ts; packages/shared/prisma/schema.prisma].

## Market Sizing

Workspace-only method: no external TAM source was available, so this plan uses a bottom-up validation ladder rather than a top-down civic-tech TAM [evidence: dispatch brief; assumption: external market data must be added later].

Buildable obtainable market for the first validation phase:

| Stage | Revenue build | Monthly revenue | Label |
|---|---:|---:|---|
| Break-even wedge | 25 paid submissions x $15 average order value | $375 | [evidence: MASTER_PLAN.md; assumption: average order value holds] |
| Month 3 scenario | 50 paid submissions x $15 average order value | $750 | [evidence: MASTER_PLAN.md] |
| Month 6 scenario | 120 paid submissions x $16 average order value | $1,920 | [evidence: MASTER_PLAN.md] |
| Month 12 scenario | 400 paid submissions x $18 average order value | $7,200 | [evidence: MASTER_PLAN.md] |
| Month 24 scenario | 1,200 paid submissions x $20 average order value | $24,000 | [evidence: MASTER_PLAN.md] |

This is not a TAM claim. It is a proof ladder. The first hard market question is whether the product can repeatedly acquire 25 paid submissions per month at roughly $15 average order value [evidence: MASTER_PLAN.md; assumption: demand validation starts at the break-even wedge].

Future TAM/SAM work must be sourced from search volume, civic contact frequency, local issue demand, and comparable paid civic/legal-drafting behavior [assumption: research method to run when network access is available].

## Revenue Model And Unit Economics

Revenue is transactional. The active route supports one-time Stripe purchases at $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts]. The roadmap explicitly removed subscriptions from the active plan [evidence: MASTER_PLAN.md].

Repo-authored unit-economics model:

| Package | Price | Modeled cost components | Modeled gross margin |
|---|---:|---|---:|
| Amplify | $15 | $0.35 token cost, $0.005 email delivery, $0.74 Stripe fee, $0.10 hosting allocation, $1.20 total COGS | 92% [evidence: MASTER_PLAN.md; assumption: vendor prices and token usage hold] |
| Complex | $25 | $0.75 token cost, $0.01 email delivery, $1.03 Stripe fee, $0.15 hosting allocation, $1.94 total COGS | 92% [evidence: MASTER_PLAN.md; assumption: vendor prices and token usage hold] |

Pricing guardrail: the plan requires a 40% net margin floor after Stripe fees [evidence: MASTER_PLAN.md]. The repo currently implements fixed prices, so true dynamic pricing remains an operator/product risk unless implemented and tested [evidence: apps/api/src/routes/payments.ts; assumption: fixed pricing may be sufficient for MVP].

## Financial Model

The following table reconciles submissions x average order value to revenue, then applies repo-authored cost assumptions. It is a model, not performance history [evidence: MASTER_PLAN.md; assumption: no live revenue data in repo].

| Stage | Revenue build | Revenue | Variable COGS | Stripe fees | Fixed costs | Modeled operating contribution | Honesty |
|---|---:|---:|---:|---:|---:|---:|---|
| Break-even wedge | 25 x $15 | $375 | $30 | $15 | $200 | $130 | [evidence: MASTER_PLAN.md; assumption: modeled, not observed] |
| Month 3 | 50 x $15 | $750 | $60 | $30 | $200 | $460 | [evidence: MASTER_PLAN.md; assumption: modeled, not observed] |
| Month 6 | 120 x $16 | $1,920 | $154 | $77 | $200 | $1,489 | [evidence: MASTER_PLAN.md; assumption: modeled, not observed] |
| Month 12 | 400 x $18 | $7,200 | $576 | $288 | $300 | $6,036 | [evidence: MASTER_PLAN.md; assumption: $300 fixed cost is conservative growth-stage support] |

The plan calls for a pre-funded $1,500 Mercury reserve before first payment [evidence: MASTER_PLAN.md]. The same source models launch fixed burn around $200 per month and variable COGS around 8% of revenue with Stripe fees around 4% of revenue [evidence: MASTER_PLAN.md]. Month 12 fixed cost is raised to $300 here as a conservative operating assumption [assumption: added for growth-stage support and monitoring].

## Competition

| Competitor | Competes on | CivicState angle |
|---|---|---|
| Resistbot | Low-friction citizen messages to lawmakers [evidence: MASTER_PLAN.md] | More researched, citation-backed drafting [evidence: MASTER_PLAN.md; assumption: users value citations enough to pay] |
| Change.org | Petition hosting and sharing [evidence: MASTER_PLAN.md] | Direct letter delivery instead of petition-only mobilization [evidence: MASTER_PLAN.md] |
| LegalZoom | Paid document preparation [evidence: MASTER_PLAN.md] | Civic-specific, lower-ticket, non-legal-advice workflow [evidence: MASTER_PLAN.md; assumption: comparison is category-level] |
| Quorum | Enterprise advocacy software [evidence: .planning/PROJECT.md] | Individual consumer price point rather than enterprise contracts [assumption: category positioning from planning docs] |
| VoterVoice | Organization advocacy campaigns [evidence: .planning/PROJECT.md] | Individual resident workflow rather than association-led mobilization [assumption: category positioning from planning docs] |
| Manual outreach | Free, direct emails or calls | CivicState must beat free by saving time and improving quality [assumption: obvious substitute, no external source] |

## Go To Market

Primary channel: SEO from opt-in public campaign pages and issue-specific civic queries [evidence: .planning/GENESIS.md; assumption: SEO can produce qualified demand]. This is unproven because the repo has no traffic or indexed content evidence [evidence: .planning/existing-state.md].

Launch plan:

- Start with a private beta where operator-sourced users submit real issues and pay at least one of the active price points [assumption: needed to validate willingness to pay].
- Measure payment conversion from preview to checkout; the planning gate is at least 3% [evidence: .planning/PROJECT.md].
- Measure deliverability to government domains; the planning gate is at least 85% inbox placement [evidence: .planning/PROJECT.md; assumption: inbox placement measurement can be instrumented].
- Publish only opt-in, redacted campaign pages after legal/privacy review [evidence: MASTER_PLAN.md; assumption: publication improves SEO without creating unacceptable privacy risk].
- Defer partnerships, paid ads, native mobile apps, and organization API access until paid consumer jobs repeat [evidence: .planning/GENESIS.md].

## Assumption Ledger

| Assumption | Why it matters | Test |
|---|---|---|
| Residents will pay $5 to $25 for a civic letter campaign [assumption: repo thesis] | Core monetization | Run beta cohort and measure paid checkout conversion |
| Citation-backed letters improve perceived value [assumption: product positioning] | Differentiation from free tools | Compare preview-to-pay rates with and without citation emphasis |
| Government inbox deliverability is controllable with Postmark, DNS, warming, and bounce gates [assumption: repo plan] | Delivery is the paid promise | Track sent, bounced, delivered, spam complaint, and reply metrics by domain |
| Official data coverage can reach federal/state/local quality targets [assumption: repo plan] | Bad targets destroy trust | Audit sampled ZIP codes against official directories |
| A single operator can review flagged cases within 24 hours [assumption: .planning/PROJECT.md] | Labor model and compliance | Measure queue volume and oldest flagged item in beta |
| Fixed pricing can survive real token and review variance [assumption: apps/api current implementation] | Margin protection | Compare actual COGS per package against the 40% margin floor |

## Risks And Anti-Plan

A skeptical partner should try to kill this deal on these points:

- The product may be a "nice civic helper" that users praise but do not pay for. The repo has $0 live revenue evidence [evidence: .planning/existing-state.md].
- Government email delivery could fail in practice; if letters land in spam, the paid promise collapses [assumption: deliverability is the hardest operational constraint].
- The legal boundary is fragile. Users will submit claims, accusations, threats, and legal-adjacent demands, creating moderation, defamation, and unauthorized-practice risk [evidence: .planning/PROJECT.md; MASTER_PLAN.md].
- The competitive moat is weak until volume exists. Officials directory quality, citation libraries, and SEO pages compound only after real usage [evidence: .planning/GENESIS.md].
- SEO may be slow, privacy-constrained, or impossible to scale if campaign pages cannot be safely published [assumption: channel risk].
- Fixed price points may undercharge complex submissions if token usage, human review, or delivery handling is heavier than modeled [evidence: apps/api/src/routes/payments.ts; assumption: cost variance risk].
- The registry note says this may be personal/research, not near-term investible. A VC-grade plan should not override that without operator confirmation [evidence: dispatch brief].

## Surprise Spikes

- Dispatch identity says `brooks-history`, while repo content, package metadata, planning docs, and application copy say CivicState [evidence: dispatch brief; package.json; MASTER_PLAN.md]. This needs operator resolution before external presentation.
- `.planning/existing-state.md` says zero application code existed on 2026-04-25, but current repo contains a substantial Next.js/Express/Worker/Prisma implementation [evidence: .planning/existing-state.md; apps/*; packages/*]. The old audit is stale.
- `.planning/ROADMAP.md` marks all build phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while root soul files were missing before this upgrade [evidence: initial workspace scan]. Build completion and data-room readiness were not aligned.
- MASTER_PLAN.md mentions Next.js 14 in one stack table, while planning/project and package implementation use Next.js 15 [evidence: MASTER_PLAN.md; .planning/PROJECT.md; apps/web/package.json]. The plan should standardize on the implemented version.

## Evidence Sources And Freshness

Freshness status as of 2026-06-20 [evidence: worker context]:

- Current implementation evidence: apps and packages source files present in this workspace [evidence: repository files].
- Planning evidence: MASTER_PLAN.md versioned March 2026 and .planning artifacts last updated 2026-04-25 [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- Registry evidence: watchlist/personal-research constraint supplied in the dispatch brief [evidence: dispatch brief].
- External market evidence: absent in workspace-only mode; all such claims are explicitly tagged as assumptions [evidence: dispatch brief].

## Decision Gate

Candidate recommendation: continue as a research-backed, validation-first product, not an investible business pitch, until the operator resolves identity/purpose and beta metrics clear the payment, deliverability, official coverage, and compliance gates [evidence: dispatch brief; .planning/PROJECT.md; assumption: validation should precede wrk.vc promotion].
