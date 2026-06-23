# CivicState — Business Plan

## Thesis

As of 2026-06-23 [evidence: current worker date], CivicState should be treated as a personal/research asset, not a near-term investible business, until it proves that individual US residents will pay $5-$25 per civic letter campaign [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts] and that email delivery to officials works reliably enough to avoid reputational and compliance failure.

The falsifiable thesis: if CivicState can convert at least 3% of qualified preview users to paid checkout [evidence: .planning/PROJECT.md] while maintaining at least 85% .gov inbox placement [evidence: .planning/PROJECT.md] and at least 60% local-official coverage [evidence: .planning/PROJECT.md], it can become a lean transactional civic-tech product; otherwise it should remain a research/demo asset.

## Problem & Customer

CivicState serves ordinary US residents who have a concrete civic concern, desired outcome, and ZIP code but do not know which official has jurisdiction, which public rules apply, or how to write a formal constituent letter [evidence: .planning/PROJECT.md; apps/api/src/routes/submissions.ts]. The product is not for legal filings, claim submissions, harassment, business advocacy, or automated political pressure campaigns [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts].

The launch ICP is a US resident with a specific local, state, or federal issue who values a researched and routed letter more than the $5 single-official tier, $15 three-official tier, or $25 full-spread tier [evidence: apps/api/src/routes/payments.ts]. The practical customer definition is narrower than "any civic user": the buyer must be willing to pay before delivery, accept AI assistance, and trust email as the delivery channel [evidence: MASTER_PLAN.md].

Alternatives today include manual research and direct email, Resistbot, Change.org, LegalZoom-style document tools, and organization-focused advocacy platforms such as Quorum and VoterVoice [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. The unproven customer behavior is willingness to pay for a task many people currently abandon rather than outsource [assumption: no user/revenue data exists in repo].

## Market

Workspace-only sizing method: bottom-up behavioral model, not external market research. All market figures below are assumptions because this run had no network access and the repo contains no customer or revenue dataset.

| Scope | Method | Annual opportunity |
|---|---|---:|
| TAM | 25,000,000 reachable US adults with at least 1.2 civic issues per year at $14 blended ARPP | $420,000,000 [assumption: unverified US adult behavior model] |
| SAM | 250,000 SEO/social-reachable residents with 0.4 paid campaigns per year at $14 blended ARPP | $1,400,000 [assumption: early organic reach model] |
| SOM | 12,000 paid submissions per year at $14 blended ARPP by year 3 | $168,000 [assumption: operator-scale execution model] |

The repo evidence supports the ARPP input, not the demand volume: pricing is $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts]. The blended $14 ARPP assumes a 35% single, 40% three-pack, and 25% full-spread mix [assumption: no checkout data exists]. The market is therefore research-grade, not diligence-grade.

## Product & Moat

Real today: the repo contains a Next.js frontend, Express API, worker process, Prisma schema, BullMQ queues, Clerk auth middleware, Stripe checkout route, Postmark delivery agent, citation-verification code, legal/source clients, content moderation, admin pages, privacy/terms pages, and tests covering payment, delivery, officials, compliance, moderation, treasury, campaigns, and citation verification [evidence: apps/; packages/shared/prisma/schema.prisma; tests/].

Aspirational or unvalidated today: production deployment, real users, paid submissions, official inbox placement, legal-source completeness, local-official coverage, and any compounding data moat [assumption: no production metrics or customer records in repo]. The original moat thesis is a compounding officials directory, citation library, and public campaign archive [evidence: .planning/GENESIS.md], but it does not exist until real paid submissions accumulate.

Defensibility is weak at launch. The only credible near-term edge is workflow integration: issue intake, official lookup, citation verification, drafting, payment, delivery, audit, and treasury are in one codebase [evidence: apps/api/src/index.ts; apps/worker/src/index.ts]. That is useful product packaging, not a durable moat.

## Platform Posture

Wrk.vc posture: CivicState should be a WrkPlug client that consumes shared auth, billing, identity, login, and EAI Layer-0 services rather than owning bespoke platform rails [assumption: WrkPlug Phase 0 not yet signed]. The intended consequence is lower infrastructure burden, lower duplicated compliance surface, and shared-rails compounding across the portfolio [assumption: platform strategy from dispatch brief].

Current repo posture contradicts that target: CivicState currently carries standalone Clerk auth, Stripe checkout, Postmark delivery, and its own Prisma/BullMQ operational spine [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts; packages/shared/prisma/schema.prisma]. The roadmap should therefore avoid adding more bespoke platform surface until the operator decides whether this remains a standalone research asset or migrates onto shared WrkPlug rails.

## Business Model

Launch revenue is transactional: $5 for 1 official, $15 for 3 officials, and $25 for all matched officials [evidence: apps/api/src/routes/payments.ts]. The repo also describes future priority review and API access, but those should remain out of scope until the paid consumer loop works [evidence: MASTER_PLAN.md].

Unit economics model, workspace-only:

| Item | Base value |
|---|---:|
| Blended ARPP | $14.00 [assumption: 35%/$5, 40%/$15, 25%/$25 mix] |
| AI and research cost per paid submission | $0.60 [assumption: within .planning/GENESIS.md $0.35-$0.75 job-cost range] |
| Email/delivery variable cost per paid submission | $0.05 [assumption: no vendor bill in repo] |
| Payment processing cost per paid submission | $0.71 [assumption: standard card-fee memory, not verified in workspace] |
| Contribution margin per paid submission | $12.64 [assumption: $14.00 - $0.60 - $0.05 - $0.71] |
| Contribution margin rate | 90.3% [assumption: contribution margin divided by ARPP] |
| Starting backend droplet cost | $96/month [evidence: .planning/PROJECT.md; MASTER_PLAN.md] |
| Fixed launch burn ceiling previously modeled | $132.50/month [evidence: .planning/PROJECT.md] |

Break-even at the modeled fixed burn is 11 paid submissions per month [assumption: $132.50 fixed cost / $12.64 contribution margin, rounded up]. This is financially attractive only if demand and deliverability clear; without that, high gross margin is irrelevant.

## Competition

Resistbot is the closest civic-letter substitute; CivicState differentiates by adding legal/regulatory research and citation verification [evidence: .planning/PROJECT.md]. Change.org competes for civic expression and distribution, but CivicState sends individual letters rather than hosting petitions [evidence: MASTER_PLAN.md]. LegalZoom is a broader document-drafting substitute, but the repo positions CivicState as cheaper and civic-specific [evidence: MASTER_PLAN.md]. Quorum and VoterVoice are organization/enterprise advocacy platforms, not individual transactional tools [evidence: .planning/PROJECT.md].

The most dangerous competitor is not a named startup: it is manual non-consumption. If the customer chooses to complain on social media, send no letter, or use a free template, CivicState captures $0 [assumption: no customer interview data in repo].

## Go-To-Market

The original GTM is SEO-first: opt-in public campaign pages create long-tail civic content, with social sharing as a secondary channel and paid acquisition excluded [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. That remains plausible but unvalidated.

First validation plan:

- Recruit 20 operator-sourced test users by 2026-07-31 [assumption: manual pilot target] and observe whether at least 6 reach preview [assumption: 30% activation target].
- Run a closed beta with 50 preview sessions by 2026-08-31 [assumption: validation target] and require at least 2 paid checkouts [assumption: 4% beta conversion target].
- Test official delivery on a seeded official/contact set before paid public launch, requiring at least 85% inbox placement [evidence: .planning/PROJECT.md].
- Publish only opt-in, redacted campaign pages until privacy and moderation process is proven [evidence: MASTER_PLAN.md; apps/web/app/privacy/page.tsx].

No paid ads should run before the product proves conversion because CAC is unknown [assumption: no CAC data in repo].

## Financial Model

The model reconciles revenue as paid submissions multiplied by $14 blended ARPP [assumption: pricing mix above]. It excludes future API and priority-review revenue because neither is validated [evidence: MASTER_PLAN.md].

| Year | Paid submissions | Revenue | Variable costs | Fixed ops | Gross profit before labor | Headcount |
|---|---:|---:|---:|---:|---:|---:|
| 2026 | 1,440 [assumption: 120/month average] | $20,160 [assumption: 1,440 x $14] | $1,958 [assumption: 1,440 x $1.36] | $1,590 [assumption: $132.50 x 12] | $16,612 [assumption: revenue - costs] | 0.25 FTE [assumption: operator-managed] |
| 2027 | 4,800 [assumption: 400/month average] | $67,200 [assumption: 4,800 x $14] | $6,528 [assumption: 4,800 x $1.36] | $4,200 [assumption: higher vendor/API tier] | $56,472 [assumption: revenue - costs] | 0.5 FTE [assumption: support/review load] |
| 2028 | 12,000 [assumption: 1,000/month average] | $168,000 [assumption: 12,000 x $14] | $16,320 [assumption: 12,000 x $1.36] | $12,000 [assumption: managed DB, monitoring, vendor growth] | $139,680 [assumption: revenue - costs] | 1.0 FTE [assumption: moderation and ops] |

Revenue assumptions: blended ARPP stays $14 [assumption: no pricing data], paid submissions ramp from 120/month to 1,000/month [assumption: no demand data], and refunds/chargebacks stay below 0.5% [evidence: .planning/PROJECT.md]. Cost assumptions: variable cost stays $1.36 per submission [assumption: model], launch fixed burn starts near $132.50/month [evidence: .planning/PROJECT.md], and labor remains operator-light through 400/month [assumption: no operational data].

Sensitivity tests:

| Case | Change | Effect |
|---|---|---:|
| Bear conversion | 1% paid conversion instead of 3% validation target | likely research-only asset [assumption: no acquisition data] |
| Delivery failure | .gov inbox placement below 85% | launch blocked [evidence: .planning/PROJECT.md] |
| Cost shock | AI cost triples from $0.60 to $1.80 per submission | contribution margin falls to $11.44 and 81.7% [assumption: model math] |

## Risks & Anti-Plan

The real anti-plan: do not fund this as a venture-scale company yet. The repo has product ambition and code, but no proof that citizens pay, officials receive/respond, or the legal-adjacent workflow can operate without constant human judgment [assumption: no customer/revenue/production evidence in repo].

Major holes:

- Willingness to pay may be fake. A $5 price point is low, but free alternatives and non-consumption are powerful [assumption: no checkout data].
- Email deliverability could kill the product. Government servers may filter or suppress campaign-like messages, and the product creates reputational risk if officials view it as spam [assumption: external deliverability risk; .planning/PROJECT.md flags this as hardest problem].
- Legal/compliance posture is fragile. The product says "not legal advice," but users may ask for legal-demand language, misconduct allegations, or filings [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts].
- Official data quality may be worse than the product promise. Federal/state/local lookup code exists, but coverage confidence remains unproven [evidence: apps/api/src/lib/officials/lookup.ts].
- The WrkPlug posture conflicts with current standalone implementation, creating migration or duplication risk [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts; dispatch registry note].

Mitigations are narrow beta, hard moderation, delivery monitoring, official opt-out enforcement, and operator approval gates [evidence: apps/api/src/routes/submissions.ts; apps/worker/src/agents/delivery.ts]. Residual risk remains high until paid delivery data exists.

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| People will pay $5-$25 for civic letters | Repo pricing and thesis | [evidence: apps/api/src/routes/payments.ts]; demand is [assumption: no user data] | 50 preview beta sessions by 2026-08-31 [assumption: validation date] |
| 3% conversion is enough to continue | Existing planning gate | [evidence: .planning/PROJECT.md] | Instrument preview-to-checkout funnel |
| 85% inbox placement is required | Existing planning gate | [evidence: .planning/PROJECT.md] | Seeded .gov and official-domain delivery test |
| Local official coverage is a blocker | Existing planning gate | [evidence: .planning/PROJECT.md] | Compare returned officials against manual ZIP samples |
| $14 blended ARPP is plausible | Pricing tiers | [assumption: pricing mix not validated] | Measure tier mix after first 25 paid submissions [assumption: sample size] |
| Contribution margin can exceed 80% | Model math | [assumption: vendor costs unverified] | Reconcile Stripe, Postmark, LLM, and infrastructure bills |
| SEO can be a channel | Genesis strategy | [evidence: .planning/GENESIS.md]; traffic is [assumption: no analytics] | Publish opt-in pages and monitor search impressions |

## Self-Valuation

Score: 2.1/10 as of 2026-06-23 [assumption: EIR judgment using repo evidence and registry watchlist]. The codebase is materially more built than the thin root soul implied, but the business remains unvalidated and sensitivity-heavy.

Under the $5,000,000-per-business program ceiling [assumption: dispatch program context], 12-month valuation bands are:

| Band | Value | Rationale |
|---|---:|---|
| BEAR | $0-$50,000 [assumption: asset value only] | no paid conversion or blocked delivery |
| BASE | $150,000-$400,000 [assumption: small cash-flow/product asset] | modest paid usage with operator-run support |
| BULL | $750,000-$1,500,000 [assumption: validated niche SaaS/transactional multiple] | repeatable acquisition plus reliable delivery |

Comparables used qualitatively: Resistbot, Change.org, LegalZoom, Quorum/VoterVoice [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. These are positioning references, not valuation comps, because no financial multiples were researched in workspace-only mode.

## Milestones

| Date | Milestone | Pass/fail |
|---|---|---|
| 2026-06-23 [evidence: current worker date] | Root soul, gate JSON, roadmap, and decision log created | Files present and internally consistent |
| 2026-07-31 [assumption: next operator milestone] | Closed pilot intake complete | 20 recruited users and 6 previews |
| 2026-08-31 [assumption: validation milestone] | Beta conversion readout | 50 previews and at least 2 paid checkouts |
| 2026-09-30 [assumption: launch gate] | Delivery and coverage gate | at least 85% inbox placement and at least 60% local coverage |
| 2026-12-31 [assumption: continuation gate] | Continue/kill decision | at least 25 paid submissions/month or archive as research asset |

## Surprise Spikes

The root BUSINESS.md, ROADMAP.md, and DECISIONS.md were missing, but `.planning/` contains a detailed product plan and the source tree contains substantial application code [evidence: .planning/PROJECT.md; apps/; packages/shared/; tests/]. That contradicts `.planning/existing-state.md`, which says zero application code exists [evidence: .planning/existing-state.md].

The project registry says "personal/research asset, not near-term investible BOS" [evidence: dispatch registry note]. The upgraded business plan agrees with that note despite the more complete codebase: current evidence supports a strong prototype, not an investible business.
