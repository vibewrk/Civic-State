# CivicState / brooks-history - Business Plan

As of 2026-06-19 [evidence: dispatch current_date], the repo identified by the registry as brooks-history contains a CivicState civic-advocacy product rather than a Brooks-history content asset [evidence: package.json; .planning/PROJECT.md; MASTER_PLAN.md]. This plan preserves the CivicState work while treating investability as unproven because the registry marks the asset as Watchlist, personal/research, not near-term investible BOS, and thin soul at 3168 bytes [evidence: dispatch registry notes].

## Thesis

CivicState can become a paid civic-action workflow if a US resident with a specific local, state, or federal concern will pay $5 [evidence: apps/api/src/routes/payments.ts] to $25 [evidence: apps/api/src/routes/payments.ts] for researched, citation-backed letters routed to the right officials, but the current investment thesis is only conditionally valid until willingness to pay, deliverability, and official-data coverage are proven in market [assumption: no customer or revenue evidence found in workspace].

## Problem & Customer

The customer is a US resident with a concrete civic frustration, such as housing, environmental, public-safety, zoning, school-policy, or enforcement concerns, who is motivated enough to contact government but unlikely to identify jurisdiction, find legal citations, draft a professional letter, and deliver it unaided [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

The repo-defined initial customer is individual and transactional, not an enterprise buyer [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. The most likely launch segment is high-intent search traffic around specific civic issues, but traffic volume, conversion rate, and repeat behavior are unvalidated [assumption: workspace contains no analytics, customers, or payment records].

The problem is not "people want another petition site." The sharper job is: "turn a specific civic complaint into a credible, routed, compliant communication without making the user research government structure." That job is supported by implemented submission, moderation, official lookup, research, drafting, payment, delivery, dashboard, admin, and compliance surfaces [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts; apps/web/app/dashboard/page.tsx].

## Market

This workspace has no external market research available, so all market sizing below is a bottom-up planning model rather than evidence [assumption: workspace-only mode and no network research].

| Layer | Method | Annual opportunity |
|---|---|---|
| TAM placeholder | 1,000,000 paid civic-letter events per year [assumption: EIR placeholder for US high-intent civic-communication events] x $15 blended price [assumption: midpoint of implemented $5/$15/$25 tiers] | $15,000,000 annual gross revenue [assumption: 1,000,000 x $15] |
| SAM placeholder | 50,000 reachable events per year through SEO and direct sharing [assumption: constrained launch reach, not externally sourced] x $15 blended price [assumption: implemented tier midpoint] | $750,000 annual gross revenue [assumption: 50,000 x $15] |
| SOM launch case | 2,400 paid submissions per year [assumption: 200 paid submissions per month x 12 months] x $15 blended price [assumption: tier midpoint] | $36,000 annual gross revenue [assumption: 2,400 x $15] |

The useful market test is not whether civic engagement is a large category. The useful test is whether at least 2.0% of preview users pay [assumption: EIR validation threshold] and whether at least 85.0% of attempted official emails are accepted or delivered [assumption: prior planning threshold in .planning/PROJECT.md, still unverified].

## Product & Moat

What is real today: the repository contains a monorepo with Next.js, Express, worker agents, Prisma schema, Clerk middleware, Stripe Checkout, Postmark delivery, BullMQ queues, admin tools, dashboard views, legal pages, and tests [evidence: apps/web/app/page.tsx; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests/payment.test.ts; tests/delivery.test.ts; tests/compliance.test.ts].

What is still unproven: production deployment, customer demand, official contact-data accuracy, live payment conversion, email inbox placement at .gov domains, and legal/compliance sufficiency [assumption: no production telemetry, Stripe exports, Postmark exports, legal review, or customer interviews found in workspace].

The moat is weak at launch. The plausible moat is compounding operational data: verified official contacts, bounce history, citation verification outcomes, issue taxonomy, and reusable civic research snippets [assumption: moat hypothesis from .planning/GENESIS.md, not validated by operating data]. It becomes meaningful only if the system reaches 1,000+ submissions [assumption: threshold from prior genesis language, not market evidence] and improves routing/research quality faster than substitutes.

## Platform Posture

Per the wrk.dog brief, the target posture should be WrkPlug client under D-032 [assumption: brief-required posture reference]: this venture should consume shared auth, billing, identity, login, and EAI Layer-0 rails rather than own a bespoke chassis [assumption: WrkPlug Phase 0 not signed]. The current code does the opposite in several places: Clerk auth, Stripe Checkout, and Postmark are wired directly [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts].

If WrkPlug becomes available, the business consequence is lower duplicated infrastructure, lower account/CAC friction through shared wrk.vc identity, and compounding governance across the portfolio [assumption: platform synergy logic, not evidenced in this repo]. Until then, the direct integrations remain the buildable path, but they should be treated as migration candidates rather than strategic moat.

## Business Model

Revenue is transactional: $5 for a single official [evidence: apps/api/src/routes/payments.ts], $15 for three officials [evidence: apps/api/src/routes/payments.ts], and $25 for all matched officials [evidence: apps/api/src/routes/payments.ts]. The root plan should not reintroduce subscriptions or crowdfunding because the existing master plan explicitly removed subscriptions and treats crowdfunding as future consideration [evidence: MASTER_PLAN.md].

Base pricing economics:

| Item | Amount |
|---|---|
| Blended sale price | $15.00 per paid submission [assumption: midpoint mix of implemented tiers] |
| Payment processing | 3.4% of revenue plus $0.30 per transaction [assumption: conservative processor burden, not externally researched] |
| AI and API variable cost | $0.50 per submission [assumption: prior soul says token economics around $0.35-$0.75 per job; no live usage ledger found] |
| Email/delivery variable cost | $0.05 per submission [assumption: planning placeholder, no Postmark bill found] |
| Total modeled variable cost | $1.36 per submission [assumption: $15 x 3.4% + $0.30 + $0.50 + $0.05] |
| Gross margin before fixed overhead | 90.9% [assumption: ($15.00 - $1.36) / $15.00] |

The model must be corrected with real Stripe, Postmark, Anthropic, and hosting data before it is investible [assumption: no live financial exports found].

## Competition

Named substitutes and incumbents:

| Competitor | Position | CivicState wedge |
|---|---|---|
| Resistbot | Citizen-to-lawmaker communication [assumption: known civic-tech substitute; no network verification in this run] | More emphasis on legal/regulatory research and citation verification [evidence: MASTER_PLAN.md; apps/worker/src/agents/researcher.ts] |
| Change.org | Petition hosting and public mobilization [assumption: known petition substitute; no network verification in this run] | Direct routed letters rather than petition signatures [assumption: positioning claim] |
| LegalZoom | Paid document workflow substitute [assumption: known legal-document substitute; no network verification in this run] | Civic communications, not legal advice or filings [evidence: apps/worker/src/agents/drafter.ts; apps/web/app/terms/page.tsx] |
| Quorum / VoterVoice | Organization-scale advocacy tooling [assumption: named in prior planning, pricing/features not independently verified] | Individual low-price workflow [evidence: .planning/PROJECT.md] |
| Manual outreach | User researches officials and writes emails directly [assumption: obvious substitute] | Collapses routing, research, drafting, and delivery into one workflow [evidence: .planning/GENESIS.md] |

The skeptic view: none of these companies needs to copy CivicState for the deal to fail. If users trust free manual outreach or free advocacy tools enough, the $5 [evidence: apps/api/src/routes/payments.ts] entry tier may still be too expensive.

## Go-To-Market

First channel: long-tail organic search around concrete civic issues [assumption: distribution hypothesis in .planning/GENESIS.md, not validated]. The first 100 customers [assumption: validation milestone] should come from issue-specific landing pages, founder-led civic forums, and direct outreach to community groups, not paid ads [assumption: low-budget launch constraint].

Launch wedge:

- Publish a narrow set of issue pages for housing, public safety, environmental enforcement, and local services [assumption: categories visible in state-cache and planning docs].
- Drive users to free preview before payment because the existing product has a preview-first flow [evidence: apps/web/components/wizard/letter-preview.tsx; .planning/PROJECT.md].
- Require operator review of flagged content and rejected citation workflows before delivery [evidence: apps/api/src/lib/moderation.ts; apps/worker/src/agents/researcher.ts].
- Treat every public claim as "not legal advice" and AI-assisted [evidence: apps/worker/src/agents/drafter.ts; apps/web/app/about/page.tsx].

Success in the first validation cycle means 100 paid submissions [assumption: first-customer target], at least 2.0% preview-to-pay conversion [assumption: EIR threshold], and at least 85.0% accepted/delivered official emails [assumption: prior plan threshold, no Postmark evidence].

## Financial Model

All figures are planning assumptions except pricing tiers and implemented feature references [assumption: no live revenue, cost ledger, or customer export found].

| Case | Paid submissions | Revenue build | Revenue | Variable cost | Fixed + operator cost | Operating result |
|---|---|---|---|---|---|---|
| Bear year | 600 submissions/year [assumption: 50/month x 12] | 600 x $15 [assumption: blended price] | $9,000 [assumption: 600 x $15] | $816 [assumption: 600 x $1.36] | $13,200 [assumption: $600/month infra/tools plus $6,000 operator time] | -$5,016 [assumption: $9,000 - $816 - $13,200] |
| Base year | 2,400 submissions/year [assumption: 200/month x 12] | 2,400 x $15 [assumption: blended price] | $36,000 [assumption: 2,400 x $15] | $3,264 [assumption: 2,400 x $1.36] | $19,200 [assumption: $600/month infra/tools plus $12,000 operator time] | $13,536 [assumption: $36,000 - $3,264 - $19,200] |
| Bull year | 12,000 submissions/year [assumption: 1,000/month x 12] | 12,000 x $15 [assumption: blended price] | $180,000 [assumption: 12,000 x $15] | $16,320 [assumption: 12,000 x $1.36] | $54,000 [assumption: $1,500/month infra/tools plus $36,000 operator/support time] | $109,680 [assumption: $180,000 - $16,320 - $54,000] |

Revenue assumptions:

- Blended price is $15 [assumption: midpoint of $5/$15/$25 implemented tiers].
- Paid conversion reaches 2.0% in the base case [assumption: EIR validation threshold].
- Repeat usage is zero in the bear case [assumption: conservative demand case].

Cost assumptions:

- Variable cost is $1.36 per paid submission [assumption: modeled payment, AI, and email burden].
- Fixed tools and hosting start at $600/month [assumption: includes planned droplet, app hosting, email, monitoring, and miscellaneous services; only $96/month droplet is repo-evidenced in .planning/PROJECT.md].
- Operator cost is included even if the founder does the work because flagged submissions, support, and directory maintenance are not free [assumption: EIR costing discipline].

Sensitivity tests:

- If paid conversion is 0.5% rather than 2.0% [assumption: weak willingness-to-pay case], base revenue falls by 75.0% [assumption: proportional conversion math].
- If official email acceptance is below 70.0% [assumption: severe deliverability failure], refund/support load could erase gross margin [assumption: no refund data].
- If local official coverage stays below 60.0% [assumption: prior plan threshold], the product becomes federal/state-only and loses local-problem differentiation [assumption: official-data risk].

## Risks & Anti-Plan

The real anti-plan: do not fund this as a venture until the operator proves that strangers pay for civic letters. The repo has a lot of product surface, but no live customer evidence, no revenue evidence, no deliverability evidence, and no legal review evidence [assumption: workspace audit].

Top holes:

| Hole | Mitigation | Residual risk |
|---|---|---|
| People may not pay for a letter they can write themselves or send through free advocacy tools [assumption: competitive risk] | Preview-first paywall and issue-specific pages [evidence: apps/web/components/wizard/letter-preview.tsx] | High: willingness to pay is unproven |
| Government inbox deliverability may fail or trigger spam complaints [assumption: deliverability risk] | SPF/DKIM/DMARC, bounce-rate gate above 10.0% [evidence: scripts/setup-dns.md; apps/worker/src/agents/delivery.ts] | High: .gov inbox placement is not evidenced |
| Legal-adjacent output could be wrong, overstate rights, or be perceived as legal advice [assumption: legal risk] | Citation verification, AI disclosure, disclaimer, moderation, human review flags [evidence: apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/api/src/lib/moderation.ts] | High: no attorney review found |
| Official-data coverage can be incomplete, stale, or expensive at local level [assumption: data risk] | Hybrid federal/state/local lookup and admin maintenance [evidence: apps/api/src/lib/officials/lookup.ts; apps/web/app/admin/officials/page.tsx] | Medium: local provider economics unvalidated |
| Registry says personal/research asset, not near-term investible BOS [evidence: dispatch registry notes] | Treat as Watchlist validation project until operator confirms business intent | High: strategic mismatch could make the business plan irrelevant |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| Users will pay for civic-letter delivery | Product pricing exists | $5/$15/$25 tiers [evidence: apps/api/src/routes/payments.ts] | Launch paid preview test with 100 paid submissions [assumption: validation target] |
| SEO can acquire high-intent users | Prior soul hypothesis | Organic flywheel described [evidence: .planning/GENESIS.md] | Publish issue pages and measure search impressions by 2026-09-30 [assumption: milestone date] |
| Citation-backed letters are differentiated | Implemented research/drafting flow | Citation verification and drafter constraints [evidence: apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts] | Track user trust and refund requests after delivery |
| Unit economics can exceed 85.0% gross margin | Low variable-cost workflow | Pricing and modeled costs [assumption: no live cost ledger] | Compare real Stripe/Postmark/Anthropic costs after 100 paid submissions [assumption: validation batch] |
| One operator can manage exceptions | Planning hypothesis | Admin queue and moderation exist [evidence: apps/api/src/routes/admin.ts; apps/api/src/lib/moderation.ts] | Measure flagged queue time and daily operator minutes for 30 days [assumption: test duration] |
| WrkPlug migration lowers duplicated platform burden | Portfolio platform strategy | Brief requires WrkPlug posture [assumption: WrkPlug Phase 0 not signed] | Operator decides whether CivicState should migrate shared identity/billing |

## Self-Valuation

Self-score: 42/100 [assumption: EIR score based on built surface area but missing demand, revenue, and compliance proof].

Valuation under the $5,000,000 per-business program assumption [assumption: brief-provided program frame]:

| Band | Twelve-month value | Rationale |
|---|---|---|
| Bear | $50,000 [assumption: code asset with no traction] | Product remains a research/demo asset |
| Base | $300,000 [assumption: small validated cash-flow tool] | Base case reaches $36,000 annual revenue [assumption: model above] with modest profit |
| Bull | $1,200,000 [assumption: validated niche workflow] | Bull case reaches $180,000 annual revenue [assumption: model above] and durable organic channel |

Comparables used only as positioning references: Resistbot, Change.org, LegalZoom, and Quorum/VoterVoice [assumption: no valuation multiples researched]. What moves valuation: real paid conversion, verified deliverability, repeat usage, low refund rate, legal review, and evidence that official-contact data compounds.

## Milestones

| Date | Milestone | Pass/fail test |
|---|---|---|
| 2026-06-19 [evidence: dispatch current_date] | Soul upgrade complete | Root BUSINESS.md, ROADMAP.md, DECISIONS.md, and gate JSON exist |
| 2026-07-15 [assumption: operator validation schedule] | Operator ruling | Confirm whether this is a business, personal/research asset, or archived project |
| 2026-08-15 [assumption: build validation schedule] | Production-readiness audit | Verify deploy, environment variables, privacy/terms, moderation, and delivery dry runs |
| 2026-09-30 [assumption: market validation schedule] | First paid cohort | 100 paid submissions [assumption: validation target], 2.0% preview-to-pay [assumption: threshold], 85.0% accepted/delivered email [assumption: threshold] |
| 2026-12-31 [assumption: roadmap horizon] | Investability decision | Continue only if revenue, deliverability, legal review, and operator workload are evidenced |

## Surprise Spikes

- Registry/project mismatch: the dispatch calls this brooks-history, but the repo contents are CivicState [evidence: dispatch project id; package.json; .planning/PROJECT.md].
- Old existing-state document says zero application code exists, but the current repo contains app, API, worker, Prisma, and tests [evidence: .planning/existing-state.md; apps/api/src/index.ts; apps/web/app/page.tsx; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma].
- Prior roadmap marks all four build phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], but business validation is still absent [assumption: no revenue/customer telemetry found].
- Platform posture conflicts with current implementation: the brief wants WrkPlug client posture, while current code uses direct Clerk, Stripe, and Postmark integrations [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts].
