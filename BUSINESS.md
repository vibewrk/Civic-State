# CivicState Business Plan

## Thesis Current

As of 2026-06-22 [evidence: worker current-date context], CivicState is a civic communication product, not yet a VC-backable company. The repo contains a real monorepo, API, worker agents, database schema, payment route, delivery route, and submission wizard [evidence: `package.json`, `apps/api/src/routes/submissions.ts`, `apps/worker/src/agents/researcher.ts`, `packages/shared/prisma/schema.prisma`]. The current investable thesis is narrower: prove that individuals will pay for researched, citation-backed constituent letters before pitching CivicState as a venture-scale business [evidence: registry note in worker brief says "personal/research asset, not near-term investible BOS"].

The product promise is concrete: a resident describes a civic problem, enters a ZIP code, reviews AI-drafted letters with verified citations, pays a one-time fee, and CivicState sends individualized emails to public officials [evidence: `.planning/PROJECT.md`, `apps/web/app/submit/page.tsx`, `apps/api/src/routes/payments.ts`, `apps/worker/src/agents/delivery.ts`]. The strongest near-term use is a paid research-and-routing utility for people who would otherwise abandon the task.

## Customer Definition

The launch customer is a United States resident with a specific civic issue such as zoning, noise, enforcement failure, public works, school policy, or agency response who does not know the law, the responsible officials, or the structure of a formal constituent letter [evidence: `.planning/GENESIS.md` and `.planning/PROJECT.md`]. The buyer is an individual, not an advocacy organization, not a law firm, and not a campaign committee [evidence: `.planning/PROJECT.md` scope exclusions].

Primary customer job: convert a messy issue description into an official-facing communication in minutes, with citations and recipient routing handled by the system [evidence: `.planning/PROJECT.md`].

Excluded customers: users seeking legal advice, claim filing, regulatory submissions, harassment, bulk advocacy, medical content, or private-person targeting [evidence: `MASTER_PLAN.md` rules of engagement and `.planning/PROJECT.md` constraints].

## Problem

The civic-action workflow has multiple failure points: identify jurisdiction, find the applicable authority, draft credible language, route to officials, pay if needed, and track delivery [evidence: `.planning/GENESIS.md`]. Most users do not have the time or confidence to complete the whole path manually [assumption: basis is product thesis in `.planning/GENESIS.md`, not independently validated in this workspace-only run].

CivicState's risky premise is willingness to pay. The prior soul claims break-even can happen with very low volume, but no repository evidence shows paid users, conversion data, deliverability metrics, official response rates, or organic acquisition data [evidence: `.planning/PROJECT.md` lists "Validated: None yet"; `.planning/STATE.md` shows build progress rather than market metrics].

## Product Surface

What is real in the repo:

| Surface | Current evidence | Gate read |
| --- | --- | --- |
| Monorepo with web, API, worker, shared package | `apps/web`, `apps/api`, `apps/worker`, `packages/shared` exist [evidence: `package.json`] | Build base exists |
| Submission creation and moderation | `POST /api/submissions` validates issue, outcome, ZIP, and moderation before queueing [evidence: `apps/api/src/routes/submissions.ts`] | Real, but dev fallback user remains |
| Officials lookup | API calls federal, state, and local lookup orchestrator [evidence: `apps/api/src/routes/officials.ts`] | Real shell, incomplete coverage |
| Local officials | Cicero integration returns an empty array without an API key and is marked pending [evidence: `apps/api/src/lib/officials/cicero.ts`] | Material launch gap |
| Research and citation verification | Researcher searches eCFR, CourtListener, and state cache, then verifies citations [evidence: `apps/worker/src/agents/researcher.ts` and `apps/worker/src/lib/legal/citation-verifier.ts`] | Real control, source quality still unproven |
| Payments | Stripe Checkout route has hardcoded tiers of $5, $15, and $25 [evidence: `apps/api/src/routes/payments.ts`] | Real, but frontend tier mismatch must be fixed |
| Delivery | Delivery worker sends individual Postmark emails, tracks bounce rate, opt-outs, and reply-to campaign routing [evidence: `apps/worker/src/agents/delivery.ts`] | Real, but deliverability unvalidated |
| Data controls | Prisma schema includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger, audit logs, and agent action logs [evidence: `packages/shared/prisma/schema.prisma`] | Serious foundation |

## Revenue Model

Current pricing is transactional: $5 for one official, $15 for three officials, and $25 for all matched officials [evidence: `apps/api/src/routes/payments.ts`]. There is no subscription in the active plan [evidence: `MASTER_PLAN.md` changelog].

Revenue formula: paid submissions multiplied by average selling price. For a launch mix of 50% single, 35% three-official, and 15% full-spread, the weighted average selling price is $11.50 per paid submission [assumption: mix chosen for planning math; pricing tiers evidenced in `apps/api/src/routes/payments.ts`]. At 100 paid submissions per month, gross revenue is $1,150 per month [assumption: 100 submissions is an operating target, not observed demand; arithmetic uses $11.50 ASP]. At 1,000 paid submissions per month, gross revenue is $11,500 per month [assumption: scale scenario, not forecast].

The existing plan also references a 40% net margin floor after Stripe fees [evidence: `.planning/PROJECT.md` and `MASTER_PLAN.md`], a $1,500 Mercury reserve [evidence: `.planning/PROJECT.md`], $2,000 warning and $500 emergency balance alerts [evidence: `.planning/REQUIREMENTS.md`], and a $0.10 reconciliation discrepancy threshold [evidence: `.planning/REQUIREMENTS.md`]. These are controls, not proof of margin.

## Market Sizing

No external market research was available in this workspace-only run. The market view below is a bottom-up demand-unit ladder, not a census TAM.

| Layer | Method | Revenue implication |
| --- | --- | --- |
| Validation wedge | 100 paid submissions per month from organic, direct, and operator-led tests [assumption: chosen as a measurable validation target] | $1,150 monthly gross revenue at $11.50 ASP [assumption: arithmetic from pricing mix] |
| Initial serviceable market | 1,000 paid submissions per month across repeatable SEO pages and civic issue clusters [assumption: demand scenario, not observed traffic] | $11,500 monthly gross revenue and $138,000 annualized gross revenue [assumption: arithmetic from $11.50 ASP] |
| Venture-question threshold | 10,000 paid submissions per month [assumption: threshold for deciding whether this is a business rather than a research asset] | $115,000 monthly gross revenue and $1,380,000 annualized gross revenue [assumption: arithmetic from $11.50 ASP] |

This sizing deliberately avoids claiming total addressable market. The operator must validate willingness to pay, search demand, and delivery response before using a larger TAM in a fundraising narrative.

## Financial Figures

| Item | Figure | Label |
| --- | ---: | --- |
| Single-official package | $5 | [evidence: `apps/api/src/routes/payments.ts`] |
| Three-official package | $15 | [evidence: `apps/api/src/routes/payments.ts`] |
| Full-spread package | $25 | [evidence: `apps/api/src/routes/payments.ts`] |
| Starting DigitalOcean droplet | $96 per month | [evidence: `MASTER_PLAN.md`] |
| Managed PostgreSQL add-on | $50 per month | [evidence: `MASTER_PLAN.md`] |
| Spaces object storage add-on | $25 per month | [evidence: `MASTER_PLAN.md`] |
| Load balancer add-on | $12 per month | [evidence: `MASTER_PLAN.md`] |
| Mercury reserve | $1,500 | [evidence: `.planning/PROJECT.md`] |
| Warning balance alert | $2,000 | [evidence: `.planning/REQUIREMENTS.md`] |
| Emergency balance alert | $500 | [evidence: `.planning/REQUIREMENTS.md`] |
| Domain bounce pause threshold | 10% | [evidence: `apps/worker/src/agents/delivery.ts`] |
| Job overage pause threshold | 150% | [evidence: `.planning/REQUIREMENTS.md`] |
| Required margin floor | 40% | [evidence: `.planning/PROJECT.md`] |

Launch financial model:

| Scenario | Paid submissions | ASP | Gross revenue | Variable cost | Contribution | Label |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Validation month | 100 per month | $11.50 | $1,150 | $138.35 | $1,011.65 | [assumption: modeled validation month, not observed performance] |

All figures in the launch model are [assumption: 100 paid submissions, 50%/35%/15% tier mix, $0.75 non-Stripe variable cost per job, and estimated payment processing of 2.9% plus $0.30 per transaction; no live Stripe, Postmark, or Anthropic invoice data was available]. The revenue line reconciles as 100 multiplied by $11.50 equals $1,150 [assumption: arithmetic from assumed mix].

## Go-To-Market

The current GTM thesis is SEO-first: each opt-in public campaign page can become long-tail content for local civic queries [evidence: `.planning/GENESIS.md`]. That is plausible but unvalidated. Because public campaign pages are deferred in the repo planning [evidence: `.planning/PROJECT.md` out-of-scope list], the immediate GTM should be manual validation before SEO claims:

- Run operator-led concierge tests with 25 users and record paid conversion, refund requests, delivery success, and official replies [assumption: recommended validation design].
- Publish only compliant, opt-in, read-only campaign examples after legal review and user consent [evidence: `.planning/PROJECT.md` compliance constraints].
- Use issue clusters already represented in the letter workflow, then measure search impressions before scaling content production [assumption: analytics method].
- Do not spend on paid acquisition until the system proves payment conversion above 3% and inbox placement above 85% [assumption: thresholds were recorded in `.planning/PROJECT.md` but not revalidated].

## Competition

The repo names Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice as relevant alternatives [evidence: `.planning/PROJECT.md` and `MASTER_PLAN.md`]. Competitive claims were not externally checked in this workspace-only run.

| Competitor | User alternative | CivicState wedge |
| --- | --- | --- |
| Resistbot | Low-friction constituent messages [assumption: category knowledge from existing soul, not revalidated] | Citation-backed research and paid routing [evidence: `.planning/PROJECT.md`] |
| Change.org | Petition hosting and signature gathering [assumption: category knowledge from existing soul, not revalidated] | Individualized official letters rather than public petitions [evidence: `MASTER_PLAN.md`] |
| LegalZoom | Document generation for legal-adjacent needs [assumption: category knowledge from existing soul, not revalidated] | Explicitly not legal advice; cheaper civic-only workflow [evidence: `.planning/PROJECT.md`] |
| Quorum / VoterVoice | Organization-grade advocacy software [assumption: category knowledge from existing soul, not revalidated] | Individual transactional buyer at $5 to $25 [evidence: `apps/api/src/routes/payments.ts`] |
| Manual outreach | User researches and sends emails alone [evidence: `.planning/GENESIS.md`] | Collapses routing, research, drafting, and delivery into one flow [evidence: `.planning/PROJECT.md`] |

## Risks And Anti-Plan

The skeptical partner case is stronger than the fundraising case today:

- CivicState may be a useful automation demo with no durable willingness to pay. The repo has no paid conversion data, no retention data, and no CAC evidence [evidence: `.planning/PROJECT.md` says "Validated: None yet"].
- The officials data problem can kill the product. Federal lookup has no email addresses, local lookup is a stub, and state lookup depends on an API key and simplified ZIP-to-state mapping [evidence: `apps/api/src/lib/officials/congress.ts`, `apps/api/src/lib/officials/cicero.ts`, `apps/api/src/lib/officials/openstates.ts`].
- Government inbox deliverability may be the real bottleneck. The plan has SPF/DKIM/DMARC and Postmark, but no measured inbox placement or response rate [evidence: `.planning/REQUIREMENTS.md` and `apps/worker/src/agents/delivery.ts`].
- The legal/compliance posture is necessary but not sufficient. The product touches political opinion, civic complaints, potential defamation, and legal-adjacent citations; no repo file is a legal opinion [evidence: `.planning/PROJECT.md` constraints].
- The SEO flywheel is not active if public campaign pages remain deferred [evidence: `.planning/PROJECT.md` out-of-scope list].
- A frontend/API mismatch can block revenue: the frontend sends pricing tiers named `three` and `all`, while the API accepts `three_pack` and `full_spread` [evidence: `apps/web/components/wizard/letter-preview.tsx` and `apps/api/src/routes/payments.ts`].

Anti-plan: do not raise venture capital, hire a growth team, build community features, or pursue partnerships until CivicState proves paid delivery with real users and real official contact coverage. The right next capital is operator time, not outside money [assumption: investment judgment based on current repo evidence and registry note].

## Assumption Ledger

| Assumption | Test | Kill criteria |
| --- | --- | --- |
| People will pay for researched civic letters | 25 concierge users and 100 self-serve visits [assumption: validation design] | Fewer than 3% of qualified visitors pay [assumption: threshold recorded in `.planning/PROJECT.md`] |
| Email delivery is sufficient | Send paid letters only after domain warming and track bounces/replies [evidence: `.planning/REQUIREMENTS.md`] | Inbox placement below 85% or persistent domain blocking [assumption: threshold recorded in `.planning/PROJECT.md`] |
| Official coverage is good enough | Measure federal, state, and local matches per ZIP [evidence: `apps/api/src/routes/officials.ts`] | Local coverage below 60% after provider integration [assumption: threshold recorded in `.planning/PROJECT.md`] |
| Citations improve trust enough to justify AI cost | Compare conversion with and without visible citations [assumption: experiment design] | Citation workflow adds latency without improving payment conversion [assumption: product-risk criterion] |
| One operator can handle review | Track flagged queue depth and age [evidence: `.planning/REQUIREMENTS.md`] | Queue exceeds 10 items or oldest item exceeds 24 hours repeatedly [evidence: `.planning/REQUIREMENTS.md`] |

## Surprise Spikes

- Project identity mismatch: the fleet wrapper says `brooks-history`, but repo evidence says the product is CivicState [evidence: worker brief and `package.json`]. The soul should follow repo reality.
- Registry sensitivity: this is marked as a personal/research asset, not near-term investible BOS [evidence: registry note in worker brief].
- Build progress is stronger than the old soul suggests, but market evidence is weaker than the commercial language suggests [evidence: `.planning/STATE.md` and `.planning/PROJECT.md`].
- Payment can fail because tier names differ between frontend and API [evidence: `apps/web/components/wizard/letter-preview.tsx` and `apps/api/src/routes/payments.ts`].
- Local officials coverage is explicitly a stub [evidence: `apps/api/src/lib/officials/cicero.ts`].

## Evidence Sources And Freshness

Sources used in this workspace-only review:

- [`package.json`](package.json) [evidence: repo package metadata inspected 2026-06-22].
- [`.planning/PROJECT.md`](.planning/PROJECT.md) [evidence: existing planning soul inspected 2026-06-22].
- [`.planning/ROADMAP.md`](.planning/ROADMAP.md) [evidence: existing roadmap inspected 2026-06-22].
- [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md) [evidence: requirements inspected 2026-06-22].
- [`MASTER_PLAN.md`](MASTER_PLAN.md) [evidence: original master plan inspected 2026-06-22].
- [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts) [evidence: implementation inspected 2026-06-22].
- [`apps/worker/src/agents/delivery.ts`](apps/worker/src/agents/delivery.ts) [evidence: implementation inspected 2026-06-22].

Freshness warning: external market, competitor, legal, and API-provider facts were not checked online. Treat every external-facing market claim as an assumption until operator or market validation replaces it with evidence.

## Decision

Gate status: draft. CivicState should be presented on wrk.vc as a research-stage civic automation asset with a real build and unproven demand, not as a de-risked venture-scale business [evidence: registry note in worker brief and `.planning/PROJECT.md` validation status]. The next proof point is not another deck; it is paid, compliant, delivered campaigns with measured official coverage, delivery success, and user willingness to pay.
