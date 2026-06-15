# CivicState - Business Plan

Prepared as of 2026-06-15 [evidence: dispatch current_date]. Workspace-only review; no network research was available, so repo files are cited as evidence and all external market claims are labeled as assumptions. Prior planning evidence was last updated on 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] and the master build plan is dated 2026-03-01 [assumption: month-only "March 2026" normalized to ISO date from [MASTER_PLAN.md](MASTER_PLAN.md)].

Registry posture: watchlist / personal research asset, not near-term investible BOS until the operator confirms it should pitch as a business [evidence: dispatch registry notes]. The dispatch identifies this work item as `brooks-history`, while the repo content, package metadata, planning artifacts, and code identify the actual product as CivicState [evidence: [package.json](package.json); [.planning/PROJECT.md](.planning/PROJECT.md)].

## Thesis

CivicState wins if ordinary U.S. residents will pay USD 5 to USD 25 per civic issue [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] to convert a local concern into researched, citation-backed, professionally framed constituent letters sent to the right officials, because the product collapses official lookup, legal-source research, drafting, payment, and delivery into one auditable workflow [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts); [apps/worker/src/agents/drafter.ts](apps/worker/src/agents/drafter.ts); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].

The falsifiable claim: by 2026-09-30 [assumption: next launch validation window], a narrow metro beta can reach at least a 3 percent preview-to-paid conversion rate [evidence: target from [.planning/PROJECT.md](.planning/PROJECT.md)] and at least an 85 percent non-bounced or inbox-accepted government-email delivery rate [evidence: target from [.planning/PROJECT.md](.planning/PROJECT.md)]. If either gate fails, the product is a useful civic drafting tool but not yet a venture-scale delivery business.

## Problem & Customer

The primary customer is an individual constituent with a specific civic concern, a desired public-sector outcome, and a U.S. ZIP code [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)]. The repo already encodes the launch workflow: issue description, desired outcome, ZIP code, anonymity preference, content moderation, queueing, research, drafting, payment, and delivery [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

The pain is not only writing. The customer has to know which official has jurisdiction, find applicable law or policy, avoid inflammatory framing, and route the message through a channel that will not bounce or be ignored [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts)]. The current alternative set is manual outreach, free activism tools, petition platforms, hiring legal help, or doing nothing [assumption: category map from prior plan plus general civic-tech landscape, no network].

ICP for launch: mobile-first U.S. residents with local or state issues where the desired outcome is concrete enough for a letter, not a lawsuit, claim filing, harassment campaign, or private dispute [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/worker/src/agents/drafter.ts](apps/worker/src/agents/drafter.ts)]. The platform should reject or review threats, defamation-risk content, unverifiable allegations, legal-demand-style language, bulk-send patterns, and private-individual targeting [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)].

## Market

Workspace-only market sizing method: bottom-up from reachable civic issues, not a top-down "civic engagement" spend pool. Every market number below is an assumption until operator research or live traffic validates it.

| Layer | Method | Annual value |
| --- | --- | --- |
| Beachhead SOM | 3 launch metros [assumption: operator can focus city-by-city] x 250,000 reachable households per metro [assumption: SEO and local sharing reach pool] x 1.0 percent paid incidence [assumption: unvalidated annual purchase rate] x USD 16 average realized package price [assumption: blends repo prices and master-plan ramp] | USD 120,000 [assumption: 3 x 250,000 x 1.0 percent x USD 16] |
| Initial SAM | 25 metros [assumption: repeatable metro playbook] x 300,000 reachable households per metro [assumption: addressable local civic query audience] x 1.5 percent paid incidence [assumption: modest repeatable conversion after proof] x USD 18 average package price [assumption: master-plan month-12 average] | USD 2,025,000 [assumption: 25 x 300,000 x 1.5 percent x USD 18] |
| Consumer TAM proxy | 100 metros [assumption: national metro expansion ceiling for an SEO-led consumer product] x 500,000 reachable households per metro [assumption: broad but not all-household reach] x 1.0 percent paid incidence [assumption: conservative annual incidence] x 2 paid issues per buyer [assumption: repeat behavior if first delivery works] x USD 18 average package price [assumption: master-plan month-12 average] | USD 18,000,000 [assumption: 100 x 500,000 x 1.0 percent x 2 x USD 18] |
| Future organization wedge | 100 small civic organizations [assumption: future API/managed workflow wedge, explicitly out of launch scope] x USD 10,000 annual contract value [assumption: enterprise civic advocacy category anchor, no network] | USD 1,000,000 [assumption: 100 x USD 10,000] |

This is not a venture-scale market unless either consumer frequency is higher than the base assumption, CivicState becomes the trusted data layer for official contact and response intelligence, or the future organization/API wedge proves real. The active plan should therefore treat market proof, not feature breadth, as the core milestone.

## Product & Moat

What is real in the repo as of 2026-06-15 [evidence: dispatch current_date]: a monorepo with Next.js web, Express API, worker agents, Prisma schema, Stripe Checkout route, Postmark delivery agent, officials lookup route, content moderation, audit logs, ledger entries, and citation verification paths [evidence: [package.json](package.json); [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts); [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

What is still unproven: user demand, paid conversion, official-data coverage, deliverability into government domains, citation quality at production scale, and whether one operator can handle the exception queue [evidence: `.planning/PROJECT.md` says "None yet - ship to validate"; [MASTER_PLAN.md](MASTER_PLAN.md)].

The moat hypothesis has three compounding assets: a verified officials directory, a reusable citation library, and opt-in public civic records for SEO [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. That moat is weak at 50 submissions per month [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] and only becomes defensible if the platform accumulates thousands of real delivery outcomes [assumption: data-network quality threshold, no external validation].

## Platform Posture

CivicState should be treated as a WrkPlug client rather than a standalone auth, billing, and identity infrastructure company. Draft posture: consume shared chassis services for login, billing, identity, and operator review once WrkPlug is available [assumption: WrkPlug Phase 0 not yet signed]. The benefit would be lower infrastructure surface area, lower customer acquisition cost from shared wrk.vc distribution, and compounding trust rails across the portfolio [assumption: shared-rails strategy from registry context, no signed contract].

Until that posture is adopted by operator merge, the repo remains a standalone monorepo using Clerk, Stripe, Postmark, DigitalOcean, PostgreSQL, Redis, BullMQ, Prisma, and Anthropic API paths [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [package.json](package.json)].

## Business Model

Launch revenue is one-time paid letter delivery. The implemented pricing tiers are USD 5 for single, USD 15 for three-pack, and USD 25 for full-spread [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. The master plan previously modeled an Amplify package with about USD 1.20 total COGS and USD 13.80 gross profit on a USD 15 price, or 92 percent gross margin [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. That margin is not validated until live token, moderation, payment, and support costs are measured.

Base revenue formula: paid submissions x average realized package price. A realistic launch mix assumption is 25 percent single, 50 percent three-pack, and 25 percent full-spread [assumption: midpoint package mix, no live data], producing USD 15 average realized price [assumption: 0.25 x USD 5 + 0.50 x USD 15 + 0.25 x USD 25].

Revenue streams:

| Stream | Status | Pricing | Honesty label |
| --- | --- | --- | --- |
| Individual letter packages | Active launch stream | USD 5, USD 15, USD 25 | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Human-reviewed complex sends | Planned/implicit | USD 25 floor | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |
| Organization/API access | Future only | USD 10,000 annual contract value | [assumption: future wedge; not in launch scope] |
| Crowdfunding adjacency | Explicitly excluded | USD 0 in base plan | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |

## Competition

Named competitors and substitutes:

| Player | Category | Why customers use it | CivicState positioning |
| --- | --- | --- | --- |
| Resistbot | Free or low-friction constituent messaging | Fast civic messages by chat/SMS [assumption: known category positioning, no network] | Research-backed citations, paid delivery tracking, and official targeting [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Change.org | Petition marketplace | Social proof and public signatures [assumption: known category positioning, no network] | Individual constituent letters rather than petition signatures [assumption: competitive positioning] |
| Quorum / VoterVoice | Advocacy software | Organization-grade campaigns and stakeholder operations [assumption: named in repo but details unverified] | Consumer self-serve price point below enterprise annual contracts [assumption: enterprise pricing unverified] |
| Manual official contact | Substitute | Free if user already knows the official and issue framing [assumption: user behavior] | Saves research, drafting, routing, and delivery-status work [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |
| LegalZoom / attorneys | Substitute for formal documents | Higher-stakes legal drafting [assumption: category substitute] | Explicitly not legal advice or claim filing [evidence: [apps/worker/src/agents/drafter.ts](apps/worker/src/agents/drafter.ts)] |

The best skeptic argument is that the closest substitute is free: a resident can email an official directly. CivicState only earns the right to charge if research quality, targeting, and delivery confidence are visibly better than a manual email.

## Go-To-Market

First wedge: launch in a narrow set of metros and issue categories where local official data can be verified manually before scale [assumption: operator-led launch plan]. The prior plan's SEO engine should be treated as a second-order effect, not the first growth engine, because public pages require real paid submissions before they can compound [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

First 100 customers [assumption: launch target] should come from founder/operator distribution, local Reddit/Facebook/Nextdoor-style civic threads, neighborhood newsletters, and search pages for specific issues such as potholes, zoning, transit, schools, code enforcement, and utility complaints [assumption: channel hypothesis, no network]. No paid acquisition should run before conversion and deliverability are validated [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

Launch gating metrics:

| Metric | Minimum gate | Why it matters |
| --- | --- | --- |
| Preview-to-paid conversion | 3 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Government-email delivery acceptance | 85 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Federal/state official coverage | 95 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Local official coverage | 60 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Chargeback rate | below 0.5 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

## Financial Model

Base-case P&L sketch. It reconciles revenue as average monthly paid submissions x average package price x 12 months [assumption: annual model form]. COGS plus Stripe is modeled at 12 percent of revenue from the prior plan's 8 percent variable COGS plus 4 percent Stripe line [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. All future volume assumptions are unvalidated.

| Period | Revenue build | Revenue | COGS + Stripe | Fixed platform | People / review ops | EBITDA before tax |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Launch year | 180 average paid submissions/month [assumption: early SEO and local launch] x USD 16 ARPP [assumption: master-plan ramp] x 12 months [assumption: annual model] | USD 34,560 [assumption: 180 x USD 16 x 12] | USD 4,147 [assumption: 12 percent x USD 34,560] | USD 5,400 [assumption: USD 200/month platform plus USD 250/month local data] | USD 20,000 [assumption: part-time operator/review budget] | USD 5,013 [assumption: revenue minus listed costs] |
| Scale year | 900 average paid submissions/month [assumption: SEO and repeat metro expansion] x USD 18 ARPP [assumption: mix shifts to larger packages] x 12 months [assumption: annual model] | USD 194,400 [assumption: 900 x USD 18 x 12] | USD 23,328 [assumption: 12 percent x USD 194,400] | USD 12,000 [assumption: higher data, monitoring, hosting, email] | USD 70,000 [assumption: operator plus contractors] | USD 89,072 [assumption: revenue minus listed costs] |
| Expansion year | 2,500 average paid submissions/month [assumption: multi-metro SEO authority] x USD 20 ARPP [assumption: mix and upsell improvement] x 12 months [assumption: annual model] | USD 600,000 [assumption: 2,500 x USD 20 x 12] | USD 72,000 [assumption: 12 percent x USD 600,000] | USD 36,000 [assumption: managed data and deliverability tooling] | USD 180,000 [assumption: small operations team] | USD 312,000 [assumption: revenue minus listed costs] |

Revenue assumptions:

| Assumption | Label | Test |
| --- | --- | --- |
| USD 15 launch ARPP from tier mix | [assumption: 25 percent single, 50 percent three-pack, 25 percent full-spread] | Compare actual paid package mix after first 100 paid submissions [assumption: validation sample size] |
| Paid submissions grow from 180/month to 2,500/month across model periods | [assumption: SEO and metro expansion] | Monthly cohort dashboard by acquisition channel |
| Organization/API revenue remains USD 0 in the base case | [evidence: out of launch scope in [.planning/PROJECT.md](.planning/PROJECT.md)] | Do not count until signed pilots exist |

Cost assumptions:

| Assumption | Label | Test |
| --- | --- | --- |
| Variable COGS plus Stripe equals 12 percent of revenue | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | Treasury reconciliation by campaign |
| Fixed platform starts near USD 200/month | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | Vendor invoices after beta |
| Local official data may add USD 100 to USD 500/month | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Provider evaluation spike |

Sensitivity tests:

| Downside case | Impact | Response |
| --- | --- | --- |
| Conversion is 1 percent instead of 3 percent | [assumption: revenue falls by about 67 percent versus gate] | Stop broad SEO work; interview non-buyers and simplify pricing |
| COGS plus payment fees are 25 percent instead of 12 percent | [assumption: launch-year EBITDA falls by USD 4,493] | Raise full-spread price or cap officials per package |
| Local data provider costs USD 500/month instead of USD 250/month | [assumption: fixed cost rises by USD 3,000/year] | Limit launch metros and manually verify local contacts |

## Risks & Anti-Plan

The anti-plan a skeptical partner would write:

| Hole | Why it could kill the business | Mitigation | Residual risk |
| --- | --- | --- | --- |
| People may not pay for civic letters | Free manual outreach and free advocacy tools may be enough [assumption: substitute behavior] | Validate 3 percent paid conversion before scaling [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | High until real payments exist |
| Government email deliverability may fail | If `.gov` or local domains bounce or spam-filter letters, the product sells a false promise [assumption: deliverability risk] | SPF/DKIM/DMARC, Postmark, bounce thresholds, domain monitoring [evidence: [scripts/setup-dns.md](scripts/setup-dns.md); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)] | High because inbox placement is externally controlled |
| Citation accuracy can create trust or liability failures | Bad legal references undermine the core value proposition [assumption: AI risk] | Search-bound research and citation verification before drafting [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts)] | Medium because source coverage can still be thin |
| The platform can be abused for harassment or political spam | Civic content is sensitive and can create reputational harm [assumption: abuse risk] | Moderation, review queue, opt-out, non-partisan drafting rules [evidence: [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts); [MASTER_PLAN.md](MASTER_PLAN.md)] | Medium-high at scale |
| The market may be too small as consumer-only | USD 18,000,000 TAM proxy is not large enough for a standalone venture outcome [assumption: market model above] | Treat B2B/API as a future proof gate, not baked-in revenue | High until organization demand is validated |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
| --- | --- | --- | --- |
| Users will pay USD 5 to USD 25 for letter delivery | Implemented price tiers | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] | First 100 paid submissions [assumption: validation sample] |
| 3 percent paid conversion is the minimum viable gate | Prior project context | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Preview-to-paid funnel |
| 85 percent delivery acceptance is required | Prior project context | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Postmark and bounce dashboard |
| Beachhead SOM is USD 120,000/year | Bottom-up metro model | [assumption: 3 metros x 250,000 households x 1.0 percent x USD 16] | Metro launch cohort revenue |
| COGS plus Stripe is 12 percent of revenue | Prior master-plan unit economics | [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | Treasury actuals by job |
| One operator can run launch exceptions | Prior project constraint | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Review queue age and volume |
| Officials data coverage can reach 95 percent federal/state and 60 percent local | Prior project target | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | ZIP lookup coverage audit |
| WrkPlug shared rails can lower infra and CAC | Registry/platform posture | [assumption: WrkPlug Phase 0 not yet signed] | Operator adoption decision after POM review |

## Self-Valuation

EIR score: 62 out of 100 [assumption: weighted judgment across product reality, market size, margin, risk, and validation gaps]. The score is capped by absent live demand and deliverability data, not by implementation progress.

Method: revenue-multiple sanity check plus the wrk.vc USD 5,000,000-per-business program ceiling [assumption: program context from brief]. Comparables used for category shape: Resistbot, Change.org, Quorum/VoterVoice, and FiscalNote-style advocacy/data businesses [assumption: known market categories, no network].

| Case | Near-term evidence required | Self-valuation band |
| --- | --- | ---: |
| Bear | Less than USD 5,000 monthly revenue [assumption: weak consumer demand] or delivery below 85 percent [evidence: delivery gate from [.planning/PROJECT.md](.planning/PROJECT.md)] | USD 250,000 to USD 500,000 [assumption: asset value of code and learnings] |
| Base | USD 15,000 to USD 30,000 monthly revenue [assumption: repeatable metro + SEO traction] with positive contribution margin | USD 1,000,000 to USD 2,000,000 [assumption: 3x to 6x annualized gross profit sanity check] |
| Bull | USD 50,000 monthly revenue [assumption: multi-metro traction] plus signed organization pilots | USD 3,000,000 to USD 5,000,000 [assumption: wrk.vc ceiling and expansion option value] |

What would move valuation: real paid cohorts, verified government delivery, repeat purchases, response-rate data, organization pilots, and a defensible official/contact/citation dataset.

## Milestones

| Date | Milestone | Pass/fail proof |
| --- | --- | --- |
| 2026-06-30 | Gate-ready beta scope | Root soul accepted; launch metrics dashboard specified [assumption: operator timeline] |
| 2026-07-15 | Official-data spike complete | Provider decision for federal/state/local coverage with cost and accuracy notes [assumption: buildable next step] |
| 2026-08-15 | Closed beta delivery test | At least 25 real or operator-approved beta submissions processed end-to-end [assumption: validation target] |
| 2026-09-30 | Paid validation gate | 3 percent conversion, 85 percent delivery acceptance, and chargebacks below 0.5 percent [evidence: target gates from [.planning/PROJECT.md](.planning/PROJECT.md)] |
| 2026-12-31 | Market proof decision | Continue only if repeatable channel and unit economics are visible [assumption: investor review date] |

## Surprise Spikes

The dispatch wrapper labels the project `brooks-history` and repo `RPLogic-Inc/brookss-history`, but the workspace content is CivicState: `package.json` names `civicstate`, `.planning/PROJECT.md` is titled CivicState, and the code implements civic letters rather than a Brooks history product [evidence: [package.json](package.json); [.planning/PROJECT.md](.planning/PROJECT.md)]. The soul therefore preserves the repo truth and treats the dispatch label as a registry mismatch to resolve.

The old `.planning/ROADMAP.md` marks all implementation phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while `.planning/STATE.md` still says the current focus is Phase 1 and only Phase 1 is complete [evidence: [.planning/STATE.md](.planning/STATE.md)]. The new root roadmap should therefore treat "complete" as code presence, not market readiness.

The master plan still references Google Civic Information API as a local official lookup source in places [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)], while `.planning/PROJECT.md` says the Representatives endpoint shut down in April 2025 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The official-data provider decision is a mandatory spike, not an implementation detail.

The master plan includes dynamic pricing and more agents in some sections [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)], while the implemented payment route uses fixed tiers only [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. Fixed pricing should remain the launch truth until live COGS require a change.

The repo has meaningful application code, but no validated customer evidence yet [evidence: `.planning/PROJECT.md` "None yet - ship to validate"]. This is an investable experiment only if the next roadmap prioritizes proof gates over more feature surface.
