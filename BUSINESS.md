# CivicState / brooks-history Business Plan

## Thesis Current

As of 2026-06-23 [evidence: session current date], this worktree is not a Brooks-history content archive; it is a CivicState civic-tech product that turns a resident concern into researched, citation-backed letters sent to public officials. The investible thesis is conditional: CivicState could become a low-ticket transactional civic advocacy utility if users will pay for one-off help, if government email delivery works, and if citation verification can stay reliable under real usage. The current plan is not yet VC-grade as a business because revenue, users, deliverability, official response rate, and demand are unvalidated at $0 live revenue [assumption: no production revenue artifact found in workspace].

The registry note says this repo is on the watchlist, may be a personal or research asset, and is not near-term investible without operator confirmation [evidence: dispatch registry note]. The business plan therefore presents CivicState as an asset under evaluation, not as a validated company.

## Evidence Sources

- [package.json](package.json) shows the package name `civicstate`, product description, monorepo scripts, and private workspace status [evidence].
- [.planning/PROJECT.md](.planning/PROJECT.md) states the intended CivicState product, $5-$25 price bands [evidence: stated plan], and planned stack [evidence: stated plan].
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) shows implemented data models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence].
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) implements Stripe checkout tiers of $5, $15, and $25 [evidence].
- [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts) implements submission intake, moderation, audit logging, and classifier queueing [evidence].
- [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts) implements eCFR, CourtListener, state-cache research and citation verification flow [evidence].
- [apps/web/app/page.tsx](apps/web/app/page.tsx) exposes CivicState positioning and $5 - $25 front-page pricing [evidence].
- External market, legal, and competitive claims below are tagged as assumptions because this run is workspace-only with no network research [assumption: no network mode].

## Product Reality

CivicState is materially more than a concept. The repository contains a Next.js frontend, Express API, BullMQ worker, Prisma schema, moderation route, Stripe payment route, Postmark-related delivery surface, admin/dashboard pages, compliance pages, legal research integrations, and tests [evidence: apps and packages source tree].

The real product loop is:

- User submits an issue, desired outcome, ZIP code, and anonymity preference [evidence: `apps/api/src/routes/submissions.ts`].
- Content moderation blocks or flags harmful and risky content before queueing [evidence: `apps/api/src/routes/submissions.ts`].
- A classifier and researcher pipeline uses legal-source adapters and citation verification [evidence: `apps/worker/src/agents/researcher.ts`].
- A drafter prepares per-official letters with AI disclosure and disclaimers [evidence: worker and web files].
- Payment uses Stripe Checkout with one-time tiers of $5, $15, and $25 [evidence: `apps/api/src/routes/payments.ts`].
- Delivery and dashboard surfaces track status, bounces, replies, and administrative exceptions [evidence: API/web routes and tests].

Current reality still has material gaps: no evidence in the repo of active production deployment, customer usage, live Stripe volume, government deliverability, official response rates, or independent legal review [assumption: absence of production artifacts in workspace].

## Customer Definition

The primary customer is a United States resident with a specific civic concern who would contact a government office if research, routing, drafting, and delivery were handled for them [evidence: `.planning/GENESIS.md` target user statement]. The practical launch persona is not a political activist or enterprise advocacy team; it is a busy individual with a concrete local or state issue and low willingness to learn jurisdictional process [assumption: product-design inference from price and workflow].

The buyer is also the author of record. CivicState should not sell as legal representation, lobbying, claim filing, or a substitute for an attorney [evidence: `.planning/PROJECT.md` constraints and app compliance pages]. That boundary matters because the product processes political opinion, constituent communications, names, ZIP codes, payment records, and potentially sensitive allegations [evidence: Prisma fields and privacy page].

## Market Sizing

Workspace-only sizing method: use bottom-up capacity and conversion assumptions rather than claiming a researched TAM. The serviceable launch market is the subset of United States residents who both have a civic issue and will pay a one-time fee for help [assumption: market-scope definition, no external data].

Bottom-up launch model:

| Segment | Method | Annual Paid Submissions |
| --- | --- | --- |
| Local validation wedge | 10 issue niches times 100 landing-page visitors per month times 2.0% paid conversion times 12 months [assumption: SEO wedge model] | 240 paid submissions [assumption: arithmetic model] |
| Regional early traction | 50 issue niches times 250 visitors per month times 2.0% paid conversion times 12 months [assumption: SEO wedge model] | 3,000 paid submissions [assumption: arithmetic model] |
| Mature niche utility | 200 issue niches times 500 visitors per month times 2.0% paid conversion times 12 months [assumption: SEO wedge model] | 24,000 paid submissions [assumption: arithmetic model] |

At an assumed blended average order value of $14 [assumption: average of implemented price mix weighted toward $15 tier], those cases imply annual gross revenue of $3,360, $42,000, and $336,000 respectively [assumption: paid submissions times assumed blended AOV]. This is a small, testable market wedge, not a venture-scale proof. A venture case would require either much higher volume, organization sales, or repeat usage that the current plan explicitly does not validate [assumption: VC-scale threshold judgment].

## Revenue Model

CivicState currently implements one-time transactional pricing:

| Tier | Price | Evidence / Assumption | Revenue Logic |
| --- | --- | --- | --- |
| Single Official | $5 [evidence: `apps/api/src/routes/payments.ts`] | implemented | Sends to 1 official [evidence] |
| Three Officials | $15 [evidence: `apps/api/src/routes/payments.ts`] | implemented | Sends to 3 officials [evidence] |
| Full Spread | $25 [evidence: `apps/api/src/routes/payments.ts`] | implemented | Sends to all matched officials [evidence] |

Illustrative monthly revenue build:

| Month Shape | Paid Submissions | Blended AOV | Gross Revenue | Variable Cost | Gross Profit |
| --- | ---: | ---: | ---: | ---: | ---: |
| Beta | 25 [assumption: validation target] | $14 [assumption: tier mix] | $350 [assumption: 25 times $14] | $50 [assumption: $2 variable cost per submission] | $300 [assumption: revenue less variable cost] |
| Local wedge | 250 [assumption: niche SEO wedge] | $14 [assumption: tier mix] | $3,500 [assumption: 250 times $14] | $500 [assumption: $2 variable cost per submission] | $3,000 [assumption: revenue less variable cost] |
| Regional wedge | 2,000 [assumption: regional SEO wedge] | $14 [assumption: tier mix] | $28,000 [assumption: 2,000 times $14] | $4,000 [assumption: $2 variable cost per submission] | $24,000 [assumption: revenue less variable cost] |

The implemented app references a 40% net margin floor [evidence: `.planning/PROJECT.md` and requirements], and the prior plan states 88%-92% gross margin [evidence: `.planning/PROJECT.md` as prior-plan claim]. This document does not treat that as proven. The underwriting case should use a harsher 70% gross margin until live token, review, delivery, refund, and support costs are measured [assumption: risk-adjusted margin policy].

## Go To Market

The near-term GTM should avoid broad civic-tech claims. The launch wedge should be narrow issue pages where the product can verify citations and identify responsible offices with high confidence. Candidate niches include noise complaints, public works failures, landlord-code enforcement, zoning concerns, school-board policy questions, and environmental nuisance complaints [assumption: civic issue taxonomy from product scope].

The practical sequence:

- Operator confirms whether this repo should be pitched as CivicState or preserved as a research asset under `brooks-history` [evidence: registry note].
- Pick 3 narrow issue categories for closed beta [assumption: validation scope].
- Recruit 30 unpaid testers and 10 paid testers through local civic groups, Reddit city forums, and personal networks [assumption: low-cost validation plan].
- Measure willingness to pay, delivery success, official response, refund/complaint rate, and moderation load before opening SEO pages [assumption: risk-first GTM].
- Publish only opt-in, scrubbed campaign summaries after legal and privacy review [assumption: compliance-first content plan].

The planning docs propose SEO as the primary channel [evidence: `.planning/GENESIS.md`], but SEO should not be assumed until public campaign pages are legally reviewed and enough successful letters exist to avoid thin, autogenerated pages [assumption: content-quality risk].

## Competition

Named alternatives:

| Alternative | Customer Job | CivicState Difference |
| --- | --- | --- |
| Resistbot | Quick messages to lawmakers by chat/SMS [assumption: category knowledge, no live lookup] | CivicState focuses on researched citations, official matching, and paid delivery [evidence: product source]. |
| Change.org | Public petition hosting and social pressure [assumption: category knowledge, no live lookup] | CivicState sends direct constituent letters and tracks delivery [evidence: product source]. |
| Quorum | Enterprise advocacy and public affairs software [assumption: category knowledge, no live lookup] | CivicState is consumer-priced at $5-$25 [evidence: implemented pricing]. |
| VoterVoice / FiscalNote advocacy tools | Organization-led campaigns [assumption: category knowledge, no live lookup] | CivicState targets individuals, not enterprise campaign managers [evidence: planning/customer docs]. |
| Manual email / phone calls | Free direct contact | CivicState saves research, drafting, routing, and tracking labor [assumption: product-value inference]. |
| Attorneys / legal aid | Legal advice, claims, filings | CivicState must explicitly avoid legal advice and filings [evidence: compliance pages and planning constraints]. |

The risk is that the most common substitute is free manual outreach, not another software vendor. If users see the job as a simple email rather than research/routing/compliance work, $5 may still be too much [assumption: customer psychology].

## Financial Figures

Key operating figures from repo and plan:

- Implemented prices are $5, $15, and $25 [evidence: `apps/api/src/routes/payments.ts`].
- Planned backend droplet cost is about $96 per month [evidence: `.planning/PROJECT.md` stated constraint].
- Planned Mercury reserve is $1,500 [evidence: `.planning/PROJECT.md` stated constraint].
- Planned reserve alerts are $2,000 warning and $500 emergency [evidence: `.planning/REQUIREMENTS.md`].
- Prior plan claims break-even at 11 submissions [evidence: `.planning/PROJECT.md` as prior-plan claim], but this is not validated and should be recalculated from live costs [assumption: financial-control requirement].
- Prior plan claims 91% gross margin [evidence: `.planning/PROJECT.md` as prior-plan claim], while this upgrade underwrites 70% gross margin until live data exists [assumption: risk-adjusted underwriting].
- Target willingness-to-pay gate is at least 3% conversion from qualified preview to paid delivery [evidence: `.planning/PROJECT.md` stated validation gate].
- Target government inbox placement gate is at least 85% for `.gov` delivery [evidence: `.planning/PROJECT.md` stated validation gate].

## Risks Anti-Plan

A skeptical partner should try to kill this deal on these points:

- The customer may not exist at scale. Civic frustration is common, but paying for a letter may not beat free email, phone calls, templates, or apathy [assumption: demand risk].
- Government deliverability can break the product. If official inboxes block, suppress, or ignore AI-assisted constituent emails, the core promise fails [assumption: delivery risk].
- Citation quality is existential. Any fabricated or misleading legal citation could create user harm, reputational damage, or regulatory scrutiny [assumption: legal/compliance risk].
- The market may be too small for venture. The current bottom-up wedge reaches $336,000 annual gross revenue at 24,000 annual paid submissions [assumption: model output], which is useful but not VC-scale by itself [assumption: funding-fit judgment].
- The registry identity is unresolved. `brooks-history` does not match CivicState, and the watchlist note says personal/research asset, not near-term investible [evidence: dispatch registry note].
- Operator burden may be hidden. Human review, official directory maintenance, refunds, delivery exceptions, and angry political content could consume the margin [assumption: ops risk].
- Legal boundaries are fragile. Users may try to submit threats, defamation, litigation threats, private disputes, or legal demands despite moderation [evidence: moderation/compliance design recognizes this].

Anti-plan recommendation: do not pitch this as venture-backable until the live demand, deliverability, and citation gates clear: 20 paid users [assumption: minimum signal threshold], 85% deliverability [evidence: prior validation gate], and zero critical citation defects in reviewed letters [assumption: quality bar].

## Assumption Ledger

| Assumption | Basis | How To Validate | Kill / Continue Gate |
| --- | --- | --- | --- |
| Users will pay $5-$25 for one-off civic letters | Implemented pricing and prior plan [evidence] | Closed beta checkout test | Continue if at least 3% qualified preview-to-paid conversion [evidence: prior gate]. |
| Blended AOV can reach $14 | Average of current tiers, weighted toward $15 [assumption] | Stripe payment export | Continue if paid AOV is at least $10 [assumption: floor for margin]. |
| Variable cost can stay near $2 per submission | Token, email, queue, and review allowance [assumption] | Ledger plus token logs | Continue if variable cost is below 30% of revenue [assumption: underwriting rule]. |
| SEO can become acquisition channel | Prior planning hypothesis [evidence: `.planning/GENESIS.md`] | Search Console after indexed pages | Continue only if pages produce qualified previews, not just impressions [assumption]. |
| Citation verification catches risky hallucinations | Implemented verifier flow [evidence] | Human audit of beta letters | Continue only if critical defect rate is 0% in reviewed beta set [assumption]. |
| Official matching can be good enough | Implemented officials adapters and state cache [evidence] | Coverage audit by ZIP sample | Continue if federal/state coverage is high and local gaps are disclosed [assumption]. |

## Surprise Spikes

- Repository identity mismatch: dispatch says `brooks-history`, while the actual product and code say CivicState [evidence: dispatch plus package/source files].
- The registry note says personal/research asset and watchlist, which directly contradicts any immediate investible-company framing [evidence: dispatch registry note].
- `.planning/existing-state.md` says there is zero application code [evidence: stale planning file], but the current tree contains full app/workers/schema/tests [evidence: source tree]. Treat that planning file as stale.
- `.planning/ROADMAP.md` marks all major phases complete [evidence: planning roadmap], while `.planning/STATE.md` still says Phase 1 complete and Phase 2 planning needed [evidence: planning state]. Treat roadmap/progress as inconsistent until tests and manual product QA confirm.

## Milestones And Roadmap Shape

The next roadmap should not add features. It should validate the business:

- Prove the identity and asset thesis with operator confirmation by 2026-06-30 [assumption: governance target].
- Prove one end-to-end paid test with Stripe, worker pipeline, verified citations, and Postmark delivery by 2026-07-15 [assumption: build validation target].
- Run a closed beta of 20 paid submissions by 2026-08-15 [assumption: validation target].
- Produce a beta scorecard covering conversion, deliverability, citation defects, refund rate, moderation load, and support time by 2026-08-31 [assumption: validation target].

Until those gates pass, the plan is a conditional experiment rather than a company-ready financing memo.

## Freshness And Doc Dates

This upgrade was prepared on 2026-06-23 [evidence: session current date]. The prior plan files mostly date to 2026-04-25 [evidence: `.planning/PROJECT.md`, `.planning/GENESIS.md`, `.planning/ROADMAP.md`], and some status artifacts are stale relative to current source code [evidence: `.planning/existing-state.md` versus app tree]. Any external market, law, pricing, competitor, or API availability claim should be refreshed with network research before investor use [assumption: workspace-only limitation].
