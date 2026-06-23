# CivicState — Business Plan

## Thesis

As of 2026-06-23 [evidence: wrk.dog dispatch date], CivicState is a watchlist civic-tech asset, not yet a near-term investible BOS, unless the operator confirms it should pitch as a business [evidence: registry note in dispatch]. The falsifiable thesis is: individual US residents will pay for an AI-assisted, citation-checked, official-routed civic letter workflow when the product proves verified official coverage, deliverability, and trust at transaction prices already implemented in the repo: $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].

Repo evidence used here is evidence of what the repository says or implements, not evidence that external market demand exists. All external market and valuation claims below are assumptions because this worker ran workspace-only with no network access.

## Problem & Customer

The customer is a US resident with a specific civic frustration, such as local enforcement, zoning, school policy, noise, roads, housing, public works, or agency responsiveness, who would contact government if the research, routing, citation, and writing burden were removed [evidence: .planning/GENESIS.md]. The repo defines the core value as AI-powered regulation research, verified citations, ZIP-based official targeting, and one-click transactional delivery for $5-$25 [evidence: .planning/PROJECT.md].

The current ICP is deliberately narrow: mobile-first individual constituents, not nonprofits, campaigns, law firms, agencies, or enterprise lobbying teams [evidence: .planning/PROJECT.md]. The initial buyer is not paying for community, virality, legal advice, lobbying, filing, or litigation support; the buyer is paying for a done-for-you constituent communication package [evidence: MASTER_PLAN.md].

Customer definition for launch: a person who has a concrete desired government outcome, can enter a US ZIP code, is willing to review an AI-drafted letter, and will authenticate before payment [evidence: apps/web/components/wizard/issue-form.tsx; evidence: apps/web/components/wizard/location-form.tsx; evidence: apps/api/src/routes/payments.ts]. The operator-facing customer is the platform owner who must handle flagged submissions, official data gaps, refunds, deliverability alerts, and compliance exceptions [evidence: apps/web/app/admin/page.tsx; evidence: apps/api/src/routes/admin.ts].

## Market

No verified TAM is available in this workspace. The market sizing below is a bottom-up assumption model, not evidence.

| Layer | Method | Annual dollars |
| --- | --- | --- |
| TAM | 10,000,000 high-intent civic-action households per year x $15 average paid package | $150,000,000 [assumption: EIR bottom-up proxy; external civic-engagement volume must be researched] |
| SAM | 100,000 reachable early adopters in issue communities, local civic groups, and search-led use cases x $15 average paid package | $1,500,000 [assumption: constrained launch audience until real channel data exists] |
| SOM | 300 paid submissions per month x $15 average package x 12 months | $54,000 [assumption: launch-year model based on prior plan scenarios, not validated demand] |

The repo's own prior plan claims a conditional go with 72% confidence, 91% gross margin, break-even at 11 submissions, 3% willingness-to-pay conversion, 85% government inbox placement, 95% federal/state official coverage, and 60% local coverage [evidence: .planning/PROJECT.md]. Those figures are not market evidence; they are prior planning targets that must be validated.

Freshness note: as of 2026-06-23 [evidence: dispatch date], the core market document is stale because MASTER_PLAN.md says March 2026 and .planning/PROJECT.md says 2026-04-25 [evidence: MASTER_PLAN.md; evidence: .planning/PROJECT.md]. The plan is usable only as a working hypothesis until live user, pricing, delivery, and official coverage data replace it.

## Product & Moat

What is real in the repo today: a TypeScript monorepo with Next.js, Express, worker, shared Prisma schema, Clerk auth routes, moderation, official lookup clients, agent worker files, Stripe Checkout route, Postmark delivery worker, dashboard pages, admin pages, privacy/terms pages, and append-only ledger/audit models [evidence: package.json; evidence: packages/shared/prisma/schema.prisma; evidence: apps/api/src/routes/submissions.ts; evidence: apps/worker/src/agents/researcher.ts; evidence: apps/worker/src/agents/delivery.ts].

What is not yet proven: production deployment, live official coverage, local official data, real payment conversion, real end-to-end paid delivery, .gov deliverability, legal/compliance adequacy, and repeat usage [evidence: .planning/STATE.md; evidence: apps/api/src/lib/officials/cicero.ts]. The Cicero local official lookup is still a stub and returns no local officials unless later implemented [evidence: apps/api/src/lib/officials/cicero.ts].

The moat is weak until volume exists. The planned moat is compounding operational data: verified official contact records, bounce history, citation reuse, and optional public campaign content [evidence: .planning/GENESIS.md]. At 50 submissions per month the moat is mostly nonexistent; at 1,000+ submissions per month the contact-quality and citation-library loops may become meaningfully harder to copy [assumption: data network-effect threshold estimate from EIR analysis].

## Platform Posture

CivicState should be treated as a WrkPlug client, not as an independent chassis builder, if the portfolio architecture makes that available [assumption: WrkPlug Phase 0 not yet signed]. That means it should consume shared auth, billing, identity, EAI Layer-0, and account rails rather than building differentiated infrastructure where the repo already has commodity choices [assumption: platform strategy from dispatch context].

Cost/moat consequence: shared rails could lower maintenance and CAC by letting CivicState focus on official data quality, citation reliability, and civic workflow trust [assumption: shared chassis benefits not yet measured]. The repo currently implements its own Clerk, Stripe, and route-level app wiring, so any WrkPlug migration is a roadmap decision, not an existing fact [evidence: apps/web/middleware.ts; evidence: apps/api/src/routes/payments.ts].

## Business Model

Revenue model: one-time transactional letter packages. Current backend prices are single at $5, three-pack at $15, and full-spread at $25 [evidence: apps/api/src/routes/payments.ts]. The prior plan says subscriptions, crowdfunding, community features, certified mail, automated follow-up, and API access are deferred [evidence: MASTER_PLAN.md; evidence: .planning/GENESIS.md].

Unit economics model:

| Package | Price | Modeled variable cost | Gross margin |
| --- | --- | --- | --- |
| Single | $5 [evidence: apps/api/src/routes/payments.ts] | $0.80 [assumption: token, email, Stripe, and hosting allocation] | 84% [assumption: ($5-$0.80)/$5] |
| Three-pack | $15 [evidence: apps/api/src/routes/payments.ts] | $1.80 [assumption: token, email, Stripe, and hosting allocation] | 88% [assumption: ($15-$1.80)/$15] |
| Full-spread | $25 [evidence: apps/api/src/routes/payments.ts] | $3.00 [assumption: token, email, Stripe, and hosting allocation] | 88% [assumption: ($25-$3.00)/$25] |

Fixed launch costs in the prior plan include a $96 per month backend droplet, $50 per month managed PostgreSQL when needed, $25 per month object storage when needed, $12 per month load balancer when needed, and $1,500 Mercury reserve [evidence: MASTER_PLAN.md]. Those are planning figures, not verified vendor invoices.

## Competition

Named competitors and substitutes:

| Alternative | Why users choose it | CivicState position |
| --- | --- | --- |
| Resistbot | Fast letter/SMS workflow to lawmakers [assumption: competitor category from prior plan, external details unverified] | More research-heavy and citation-backed, if citations work reliably [assumption: positioning] |
| Change.org | Petition hosting and social proof [assumption: competitor category from prior plan, external details unverified] | Direct official delivery rather than signature aggregation [assumption: positioning] |
| LegalZoom | Document drafting and legal-adjacent trust [assumption: competitor category from prior plan, external details unverified] | Civic-specific and lower-priced, but must avoid legal-advice claims [assumption: positioning] |
| Quorum / VoterVoice | Enterprise advocacy workflows [assumption: competitor category from prior plan, external details unverified] | Individual transactional workflow, not enterprise SaaS [assumption: positioning] |
| Manual contact | Free, direct, no intermediary | CivicState must save enough time and improve enough quality to justify $5-$25 [evidence: apps/api/src/routes/payments.ts; assumption: willingness-to-pay unproven] |

The killer substitute is not another startup; it is user apathy plus the free path of writing an email manually [assumption: EIR anti-plan]. CivicState wins only if it makes the job feel obviously easier, trustworthy, and worth paying for.

## Go-To-Market

Launch wedge: issue-specific search and small civic communities, not broad paid advertising [evidence: .planning/GENESIS.md]. The repo already supports a submission wizard, letter preview, checkout path, and dashboard structure, so the first GTM test should drive users to a single issue/location landing flow and measure completion, preview trust, payment, and delivery outcomes [evidence: apps/web/app/submit/page.tsx; evidence: apps/web/components/wizard/letter-preview.tsx].

First launch cohort assumptions:

| Step | Tactic | Target |
| --- | --- | --- |
| Beta | Invite residents around a narrow local issue category | 30 completed unpaid previews [assumption: manual cohort target] |
| Paid test | Convert reviewed previews into transactions | 10 paid submissions [assumption: minimum signal before broader launch] |
| Delivery test | Send to verified officials only | 90% non-bounce delivery [assumption: required trust threshold] |
| Search test | Publish only opt-in pages | 25 indexed public pages [assumption: content seed target] |

The first repeatable channel should be long-tail search around local civic problems; the second should be user sharing after successful official response or delivery confirmation [assumption: .planning/GENESIS.md distribution hypothesis needs validation]. Partnerships, paid ads, API customers, and community features stay out until the core paid delivery loop produces real conversion and delivery data [evidence: .planning/GENESIS.md].

## Financial Model

Three-year sketch, with all figures assumed until live revenue exists:

| Period | Revenue build | Revenue | Variable COGS | Fixed costs and operator load | Operating result |
| --- | --- | --- | --- | --- | --- |
| Launch year | 300 paid submissions per month x $15 average package x 12 months | $54,000 [assumption: 300 x $15 x 12] | $6,480 [assumption: 12% of revenue] | $18,000 [assumption: hosting, tools, compliance review, part-time ops] | $29,520 [assumption: revenue minus COGS and fixed costs] |
| Growth year | 1,000 paid submissions per month x $18 average package x 12 months | $216,000 [assumption: 1,000 x $18 x 12] | $25,920 [assumption: 12% of revenue] | $60,000 [assumption: local data, support, legal/compliance, contractor ops] | $130,080 [assumption: revenue minus COGS and fixed costs] |
| Scale test year | 3,000 paid submissions per month x $20 average package x 12 months | $720,000 [assumption: 3,000 x $20 x 12] | $86,400 [assumption: 12% of revenue] | $180,000 [assumption: support, moderation, data ops, compliance, infra] | $453,600 [assumption: revenue minus COGS and fixed costs] |

Revenue assumptions: average price begins at $15 [evidence: apps/api/src/routes/payments.ts], paid submissions can reach 300 per month in launch year [assumption: unvalidated demand], and average price can rise to $20 with higher full-spread mix [assumption: mix shift].

Cost assumptions: variable COGS run at 12% of revenue [assumption: prior plan's 8% variable cost plus 4% Stripe-fee proxy], fixed launch spend starts at $18,000 per year [assumption: minimal operator stack], and human moderation/support remains contractor-scale through the growth year [assumption: queue volume unknown].

Sensitivity tests:

| Test | Outcome |
| --- | --- |
| Conversion misses and launch year averages 75 paid submissions per month x $15 x 12 months | $13,500 revenue [assumption: downside demand case] |
| COGS doubles from 12% to 24% because AI/research/manual review costs are higher | Launch-year COGS becomes $12,960 [assumption: cost shock case] |
| Local official data requires $500 per month provider cost | Annual fixed costs rise by $6,000 [assumption: local data provider cost based on prior plan range] |

The downside case is brutally simple: if paid conversion is weak, government deliverability is poor, or official data is incomplete, this is a useful personal/research asset but not a venture-scale business [evidence: registry note in dispatch; assumption: EIR conclusion].

## Risks & Anti-Plan

The partner-kill case: CivicState may be a clever demo around a low-frequency chore that most people will not pay for, delivered into government inboxes that may ignore or filter the output. If AI letters look synthetic, officials may discount them; if citations are wrong, users lose trust; if the product edges into legal advice or lobbying claims, compliance risk can swamp the tiny revenue base.

| Hole | Mitigation | Residual risk |
| --- | --- | --- |
| Willingness to pay is unproven at $5-$25 [evidence: .planning/PROJECT.md says none validated] | Run narrow paid beta before any scale spend | Product may remain a free-tool expectation with no viable CAC [assumption: demand risk] |
| Local official coverage is incomplete because Cicero is a stub [evidence: apps/api/src/lib/officials/cicero.ts] | Launch only where federal/state coverage and manually verified local contacts exist | Local civic issues may be the highest-intent use case, so weak local data can kill conversion [assumption: coverage risk] |
| Government deliverability is the hardest operational problem [evidence: .planning/PROJECT.md] | Warm domains, track bounce by domain, suppress complaints, and start with low volume | .gov filters may still suppress AI-generated constituent mail [assumption: deliverability risk] |
| Legal/compliance posture is not externally reviewed [evidence: apps/web/app/terms/page.tsx; evidence: apps/web/app/privacy/page.tsx] | Get counsel review before public launch | Small revenue may not justify legal overhead [assumption: compliance cost risk] |
| Repo has product/API mismatches that can break payment flow [evidence: apps/web/lib/api.ts sends pricingTier while apps/api/src/routes/payments.ts expects tier] | Add a worker-sized integration fix before beta | End-to-end claims are not trustworthy until tested [evidence: code inspection] |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
| --- | --- | --- | --- |
| Users will pay $5-$25 | Pricing implemented and prior plan claims value | Price exists [evidence: apps/api/src/routes/payments.ts]; demand [assumption: unvalidated] | Run paid beta with 30 previews and 10 payments [assumption: sample target] |
| Citation quality can be trusted | Researcher restricts citations to source results and verifier strips failures | Workflow exists [evidence: apps/worker/src/agents/researcher.ts] | Audit 50 generated letters with human review [assumption: QA sample] |
| Email-first is enough | Prior plan excludes certified mail/fax | Scope [evidence: .planning/GENESIS.md]; effectiveness [assumption: unvalidated] | Track bounce and response rates on first 100 sent letters [assumption: delivery sample] |
| SEO can drive acquisition | Prior genesis names SEO as primary distribution | Hypothesis [evidence: .planning/GENESIS.md] | Publish 25 opt-in pages and measure impressions by 2026-09-30 [assumption: date target] |
| Operator can manage flagged cases | Admin queue exists | Tooling [evidence: apps/web/app/admin/flagged/page.tsx]; workload [assumption: unmeasured] | Measure minutes per flagged item during beta [assumption: ops test] |
| WrkPlug shared rails reduce drag | Portfolio platform concept in brief | [assumption: WrkPlug Phase 0 not yet signed] | Operator decides platform posture before refactor |

## Self-Valuation

Current score: 42 out of 100 [assumption: EIR scoring rubric: buildable product, weak validation, compliance/deliverability risk, watchlist registry note]. This is a watchlist asset with real implementation surface but no evidence of market pull [evidence: registry note in dispatch; evidence: apps/ directory].

Comparable frame: Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice are category references, not valuation comps, because no current revenue or traction data is in the workspace [assumption: external comparable data unavailable]. Under the $5,000,000 per-business program assumption, twelve-month bands are:

| Case | Value band | Rationale |
| --- | --- | --- |
| BEAR | $0-$50,000 [assumption: personal/research asset only] | No paid conversion or deliverability proof |
| BASE | $150,000-$500,000 [assumption: working paid niche tool] | Paid beta works, but growth and compliance still fragile |
| BULL | $1,000,000-$2,500,000 [assumption: strong early traction but below program ceiling] | Repeatable low-CAC channel, verified official data, and reliable delivery |

What moves valuation: proof of conversion above 3% [evidence: .planning/PROJECT.md target], inbox placement above 85% [evidence: .planning/PROJECT.md target], federal/state coverage above 95% [evidence: .planning/PROJECT.md target], local coverage above 60% [evidence: .planning/PROJECT.md target], and repeat purchases or organic acquisition that lower CAC [assumption: venture-quality proof points].

## Milestones

| Date | Milestone | Falsifiable pass condition |
| --- | --- | --- |
| 2026-07-15 [assumption: next beta milestone] | End-to-end beta hardening | Payment tier bug fixed; one real test campaign completes preview to Stripe session without code workaround |
| 2026-08-15 [assumption: next delivery milestone] | Verified delivery cohort | 25 real letters sent to verified contacts with bounce and complaint tracking |
| 2026-09-30 [assumption: next GTM milestone] | Demand proof | 10 paid submissions from non-operator users and written evidence of why they paid |
| 2026-12-31 [assumption: annual validation milestone] | Investibility decision | Operator chooses: archive as research asset, continue as lifestyle tool, or fund as BOS candidate |

## Surprise Spikes

- Dispatch says PROJECT is brooks-history and REPO is RPLogic-Inc/brookss-history, but the repository contents are CivicState/civicstate [evidence: package.json; evidence: MASTER_PLAN.md; evidence: WRKDOG_PROJECT_ID in .wrkdog-run/env-boundary.json]. This must be resolved before any external dossier is trusted.
- .planning/ROADMAP.md marks all phases complete on 2026-04-25, while .planning/STATE.md says Phase 1 is complete and Phase 2 planning is needed [evidence: .planning/ROADMAP.md; evidence: .planning/STATE.md]. Code appears to include later-phase files, so the docs are internally inconsistent.
- The frontend payment client sends `pricingTier`, but the backend payment route expects `tier`, and frontend tiers include `three` and `all` while backend expects `three_pack` and `full_spread` [evidence: apps/web/lib/api.ts; evidence: apps/api/src/routes/payments.ts]. That is a launch-blocking integration risk.
- The local official integration is explicitly pending and currently returns an empty array [evidence: apps/api/src/lib/officials/cicero.ts]. Any business plan claiming strong local coverage is overstating the asset.
