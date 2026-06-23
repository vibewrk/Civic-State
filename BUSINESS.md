# CivicState (registry id: brooks-history) - Business Plan

Document date: 2026-06-23 [evidence: wrk.dog dispatch]. Status: watchlist and needs operator validation [evidence: wrk.dog registry notes].

## Thesis

CivicState can become a narrow, transaction-priced civic advocacy utility if ordinary US residents will pay USD 5 to USD 25 per campaign [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/web/app/page.tsx](apps/web/app/page.tsx)] to convert a civic complaint into researched, citation-backed letters sent to the right officials; until paid demand, deliverability, and legal-risk controls are proven, this is a personal/research asset rather than a near-term investible business [evidence: wrk.dog registry notes].

## Problem & Customer

The repo's product definition is specific: a user enters an issue, desired outcome, and ZIP code; the system researches applicable law, targets federal/state/local officials, drafts letters, takes payment, delivers email, tracks replies, and exposes dashboard/admin/compliance surfaces [evidence: [apps/web/app/submit/page.tsx](apps/web/app/submit/page.tsx), [apps/api/src/index.ts](apps/api/src/index.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

Primary ICP: US residents with a concrete local, state, or federal civic concern who are willing to pay a small one-time fee to avoid research, routing, formal drafting, and delivery labor [assumption: inferred from `.planning/PROJECT.md` and no market interviews in repo]. Priority use cases are issues such as enforcement failures, zoning, schools, roads, utilities, and agency responsiveness [assumption: examples from `.planning/GENESIS.md`, not market-validated]. Non-customers are legal claimants, businesses seeking lobbying services, users seeking legal advice, and bulk advocacy organizations [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md)].

Customer definition for validation: the first adoption test is 25 paid campaigns by 2026-09-30 [assumption: EIR validation gate sized for a single operator], with at least 3.0% visitor-to-paid conversion [assumption: carried from `.planning/PROJECT.md` and unvalidated], at least 85.0% non-bounce delivery to official inboxes [assumption: carried from `.planning/PROJECT.md` and unvalidated], and no unresolved legal/compliance incident by 2026-09-30 [assumption: EIR operating gate].

## Market

Workspace-only method: no external research was available, so the market is bottom-up and explicitly assumption-led. TAM is modeled as annual paid civic-letter events, not all civic engagement. The formula is `reachable US civic-issue events x willingness-to-pay x blended ASP`.

TAM: 2,000,000 annual paid civic-letter events x USD 15.00 blended average selling price = USD 30,000,000 annual revenue potential [assumption: EIR proxy based on broad US civic participation intuition without network validation]. SAM: 200,000 annual events in search-reachable issue categories x USD 15.00 = USD 3,000,000 [assumption: initial SEO and direct-channel reach constraint]. SOM through 2027-12-31: 12,000 paid submissions x USD 15.00 = USD 180,000 annual revenue [assumption: single-operator ramp with no paid acquisition]. This is deliberately smaller than a VC-scale market until the project proves either recurring distribution, institutional channels, or a broader civic workflow.

The project currently has USD 0 revenue [evidence: [.planning/existing-state.md](.planning/existing-state.md) says no Stripe revenue at audit time; no production revenue files are present] and no local evidence of traffic, conversion, or retention [evidence: no analytics export or customer records found in workspace]. Market sizing must be re-opened once customer discovery exists.

## Product & Moat

Real today: the repository contains a Next.js app, Express API, worker process, Prisma schema, Clerk auth wiring, Stripe Checkout route, Postmark delivery path, officials lookup abstractions, citation verification libraries, admin tools, dashboards, and compliance routes [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. The worker registers 6 queues/agents: classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: [apps/worker/src/index.ts](apps/worker/src/index.ts)]. The data model includes 11 Prisma models covering users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

Not proven today: production deployment, real official-directory coverage, real citation quality, real payment conversion, inbox placement, operator throughput, and regulatory interpretation [evidence: no production telemetry or customer data found in workspace]. The repo also contains a stale audit stating zero application code existed [evidence: [.planning/existing-state.md](.planning/existing-state.md)], which conflicts with current source files and should be treated as historical only.

Moat hypothesis: compounding official contact quality, bounce/response history, verified citation cache, and public campaign archive [assumption: based on `.planning/GENESIS.md`; no volume exists yet]. At 50 monthly submissions [assumption: early beta volume], this is not a moat. At 1,000 monthly submissions [assumption: scale threshold from `.planning/GENESIS.md`], proprietary delivery and citation data could begin to matter.

## Platform Posture

CivicState should be treated as a WrkPlug client, not as an auth, billing, or identity platform. Under the brief's D-032 posture [assumption: wrk.dog dispatch instruction], the venture should consume shared chassis services where available so the project compounds on shared login, billing, and Layer-0 governance instead of duplicating platform plumbing. Cost consequence: if WrkPlug Phase 0 is adopted, CivicState could reduce standalone infra and compliance maintenance by 20.0% to 35.0% [assumption: EIR estimate, WrkPlug Phase 0 not signed]. Moat consequence: shared rails make launch faster, but customer/citation/deliverability data remain the project-specific asset [assumption: architectural inference].

Current repo reality still has standalone Clerk, Stripe, Postmark, Redis, PostgreSQL, and DigitalOcean/Vercel assumptions [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [package.json](package.json), [apps/api/src/index.ts](apps/api/src/index.ts)]. Do not hard-wire WrkPlug migration until an operator signs the platform boundary.

## Business Model

Launch revenue is one-time letter packages: single official at USD 5.00, three officials at USD 15.00, and all matched officials at USD 25.00 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. Future streams named in the prior plan are priority review and API access, but both remain deferred [evidence: [.planning/raw-intake.md](.planning/raw-intake.md), [.planning/GENESIS.md](.planning/GENESIS.md)].

Unit model: assume USD 15.00 blended ASP [assumption: midpoint weighted toward the three-official package], USD 2.20 variable cost per paid job [assumption: AI, email, payment, and support allocation without vendor invoices], and 85.3% gross margin before fixed operating cost [assumption: `(15.00 - 2.20) / 15.00`]. The planning corpus asserts a 40.0% minimum net margin floor, a USD 1,500 Mercury reserve, and chargebacks under 0.5% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Revenue model risk: transaction-only civic advocacy may be too episodic to support repeat revenue [assumption: EIR skepticism]. The near-term monetization proof is not "can a letter be generated"; it is whether a user pays before knowing whether the official responds.

## Competition

Named alternatives and competitors:

| Alternative | Positioning | CivicState angle |
| --- | --- | --- |
| Resistbot | Citizen messages to lawmakers [assumption: general market knowledge, no network] | CivicState adds paid research, citations, delivery tracking, and admin compliance [evidence: repo product scope] |
| Change.org | Petition and signature aggregation [assumption: general market knowledge, no network] | CivicState is direct constituent letter delivery, not petition hosting [assumption: positioning inference] |
| Quorum | Enterprise public-affairs platform [assumption: general market knowledge, no network] | CivicState targets individuals at USD 5 to USD 25 [evidence: payment route] |
| VoterVoice / Capitol Canary | Advocacy software for organizations [assumption: general market knowledge, no network] | CivicState begins B2C and may later serve nonprofits/HOAs [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] |
| Manual outreach | User researches officials and drafts email manually [assumption: observed substitute behavior] | CivicState compresses research, drafting, routing, and delivery into a guided workflow [evidence: [apps/web/app/submit/page.tsx](apps/web/app/submit/page.tsx)] |
| LegalZoom or attorney consult | Legal document/help substitute for some users [assumption: general market knowledge, no network] | CivicState must stay away from legal advice and filings [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

The killer substitute is free manual email. The product wins only if citation quality, official targeting, and saved time make USD 5 to USD 25 feel obvious [assumption: EIR judgment].

## Go-To-Market

The prior GTM hypothesis is SEO-led public campaign pages and social sharing [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. The current repo has no evidence of live pages, indexed content, search impressions, or paid users [evidence: no analytics/customer exports found in workspace]. Therefore the first GTM motion should be controlled validation, not scale.

First 100 paid customers [assumption: EIR beta target] should come from: 40 local civic issue communities [assumption: manual outreach target], 30 direct founder/operator contacts [assumption: low-CAC beta path], 20 search-intent landing tests [assumption: SEO probe], and 10 nonprofit/HOA interviews [assumption: B2B adjacency probe]. Paid acquisition is out of scope until CAC is measured [assumption: no CAC data in repo].

Activation metric: submission starts to paid checkout completion [assumption: core funnel]. Retention proxy: second campaign within 90 days [assumption: episodic product]. Quality metric: delivered letters with verified citations and no compliance escalation [evidence: repo design in worker/API/compliance files].

## Financial Model

All figures below are model assumptions unless explicitly cited from code. Revenue reconciles as paid submissions x blended ASP.

| Year ending | Paid submissions | Blended ASP | Revenue | Variable COGS | Gross margin | Fixed/operator cost | EBITDA |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2026-12-31 [assumption: launch year] | 1,200 [assumption: beta ramp] | USD 15.00 [assumption: tier mix] | USD 18,000 [assumption: 1,200 x 15.00] | USD 2,640 [assumption: 1,200 x 2.20] | 85.3% [assumption: unit model] | USD 28,000 [assumption: infra, tools, part-time ops/legal] | USD -12,640 [assumption: revenue - COGS - fixed] |
| 2027-12-31 [assumption: first full year] | 12,000 [assumption: 1,000 monthly exit run-rate] | USD 15.00 [assumption: tier mix] | USD 180,000 [assumption: 12,000 x 15.00] | USD 26,400 [assumption: 12,000 x 2.20] | 85.3% [assumption: unit model] | USD 140,000 [assumption: one operator plus vendor/legal] | USD 13,600 [assumption: revenue - COGS - fixed] |
| 2028-12-31 [assumption: scaled niche] | 48,000 [assumption: 4,000 monthly average] | USD 15.00 [assumption: tier mix] | USD 720,000 [assumption: 48,000 x 15.00] | USD 105,600 [assumption: 48,000 x 2.20] | 85.3% [assumption: unit model] | USD 360,000 [assumption: small ops/compliance team] | USD 254,400 [assumption: revenue - COGS - fixed] |

Revenue assumptions: blended ASP remains USD 15.00 [assumption: payment tier mix], paid conversion reaches 3.0% [assumption: `.planning/PROJECT.md` gate, unvalidated], and refund/chargeback loss stays below 1.0% [assumption: stricter than project chargeback constraint]. Cost assumptions: fixed hosting begins near USD 96 per month for backend droplet [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], variable COGS is USD 2.20 per paid job [assumption: no invoices in repo], and legal/compliance review consumes USD 25,000 in 2026 [assumption: EIR risk budget].

Sensitivity tests: if conversion is 1.0% rather than 3.0%, revenue falls by about 66.7% [assumption: linear funnel model]; if variable cost doubles to USD 4.40, gross margin falls to 70.7% [assumption: `(15.00 - 4.40) / 15.00`]; if deliverability fails below 70.0%, the product should pause paid delivery even if revenue is positive [assumption: trust threshold].

## Risks & Anti-Plan

- The skeptical case is that this is not a venture-backed business at all: users may support civic action emotionally but refuse to pay USD 5 to USD 25 before seeing official response [assumption: EIR anti-plan]. Mitigation: run paid beta before more build. Residual risk: high.
- Government inbox deliverability could kill the product. A polished letter that bounces, lands in spam, or triggers opt-outs creates no user value and can damage sender reputation [assumption: EIR anti-plan, supported by `.planning/PROJECT.md` concern]. Mitigation: warming, domain monitoring, per-domain bounce controls. Residual risk: high.
- Citation-backed drafting increases perceived authority and therefore legal/regulatory exposure. A bad citation or legal-sounding demand could create user harm or platform liability [assumption: EIR anti-plan]. Mitigation: citation verifier, disclaimers, human review queue, no legal advice. Residual risk: high.
- The product may attract harassment, defamation, threats, bulk spam, or politically sensitive campaigns [evidence: moderation/admin/compliance design in repo]. Mitigation: three-tier moderation and admin review. Residual risk: medium to high.
- The project identity is inconsistent: registry says `brooks-history` while repo/product says CivicState [evidence: wrk.dog dispatch, [package.json](package.json), [.planning/PROJECT.md](.planning/PROJECT.md)]. Mitigation: operator must rename, archive, or explicitly map the asset. Residual risk: medium.
- Existing implementation may not typecheck end-to-end; docs mention completion, but production telemetry is absent [evidence: no deployment/customer evidence in repo]. Mitigation: run CI and production smoke tests before launch. Residual risk: medium.

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
| --- | --- | --- | --- |
| Users will pay USD 5 to USD 25 | Pricing route and product plan | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] for prices; willingness to pay is [assumption: unvalidated] | Charge real beta users by 2026-09-30 [assumption: EIR gate] |
| TAM is USD 30,000,000 | Bottom-up event model | [assumption: no network market research] | Replace with sourced market data and funnel logs |
| 85.3% gross margin is possible | Unit model | [assumption: no vendor invoices] | Reconcile first 100 paid jobs [assumption: beta sample] |
| SEO can acquire users | Prior genesis hypothesis | [assumption: [.planning/GENESIS.md](.planning/GENESIS.md) has hypothesis, not results] | Publish test pages and measure indexed clicks by 2026-12-31 [assumption: milestone] |
| Official lookup coverage is sufficient | Hybrid API design | [evidence: [apps/api/src/lib/officials/lookup.ts](apps/api/src/lib/officials/lookup.ts)] for implementation; coverage is [assumption: unproven] | Audit 100 ZIP codes [assumption: validation sample] |
| Legal/compliance controls are adequate | Moderation, disclaimers, CCPA routes | [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)] | External counsel review before paid public launch [assumption: required gate] |
| WrkPlug shared rails reduce cost | Platform posture | [assumption: WrkPlug Phase 0 not signed] | Operator decision and migration estimate |

## Self-Valuation

Current score: 42 / 100 [assumption: EIR score for strong build artifact but unvalidated market]. Under the USD 5,000,000 per-business program frame [assumption: wrk.vc portfolio heuristic], 12-month value bands are: BEAR USD 50,000 [assumption: useful research asset only], BASE USD 350,000 [assumption: working paid beta with modest revenue], and BULL USD 1,200,000 [assumption: repeatable low-CAC acquisition plus clean deliverability/legal record]. Comparables used qualitatively: Resistbot, Change.org, Quorum, and VoterVoice/Capitol Canary [assumption: named market references without network]. What moves valuation: paid conversion above 3.0% [assumption: validation gate], delivery success above 85.0% [assumption: validation gate], repeat campaigns within 90 days [assumption: retention proxy], and an operator ruling that this should pitch as a business rather than remain a personal/research asset [evidence: wrk.dog registry note].

## Milestones

| Date | Milestone | Pass condition |
| --- | --- | --- |
| 2026-07-15 [assumption: next validation checkpoint] | Operator identity ruling | Decide whether `brooks-history` maps to CivicState, rename, or archive [evidence: registry/product mismatch] |
| 2026-08-15 [assumption: build validation checkpoint] | End-to-end smoke gate | Submission, official lookup, research, preview, payment, delivery, dashboard, admin, and compliance paths pass in staging [assumption: staging gate] |
| 2026-09-30 [assumption: paid beta checkpoint] | Paid demand gate | 25 paid campaigns, 3.0% conversion, 85.0% delivery success, and zero unresolved compliance incidents [assumption: EIR validation target] |
| 2026-12-31 [assumption: portfolio review checkpoint] | Investibility review | Replace assumption-led market model with sourced data, funnel metrics, and operator decision [assumption: wrk.vc dossier readiness] |

## Surprise Spikes

- Registry/product mismatch: dispatch says project `brooks-history`, while every inspected product file says CivicState [evidence: wrk.dog dispatch, [package.json](package.json), [.planning/PROJECT.md](.planning/PROJECT.md)].
- Stale planning contradiction: `.planning/existing-state.md` says zero application code exists, but current repo has app/API/worker/shared source files [evidence: [.planning/existing-state.md](.planning/existing-state.md), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts)].
- Roadmap completion claims outrun commercial proof: `.planning/ROADMAP.md` marks all four build phases complete by 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but there is no workspace evidence of live traffic, revenue, production users, or customer validation.
- Registry sensitivity says not near-term investible BOS [evidence: wrk.dog registry notes], so the plan intentionally frames CivicState as an asset needing proof rather than a funded operating company.

## Evidence Sources & Freshness

Primary local evidence reviewed as of 2026-06-23 [evidence: wrk.dog dispatch]: [package.json](package.json), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts), [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md), [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/existing-state.md](.planning/existing-state.md), and wrk.dog registry notes from the dispatch. External market claims are assumptions because this worker had no network access.
