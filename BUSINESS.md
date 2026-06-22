# CivicState Business Plan

Document date: 2026-06-22 [evidence: worker environment current_date]. Freshness status: workspace-only review; no network research was available, so repo files are evidence and external market statements are assumptions.

## Snapshot

CivicState is a civic technology product that turns a resident's issue, desired outcome, and ZIP code into researched, citation-backed letters delivered to government officials. The repo contains a Next.js web app, Express API, BullMQ worker agents, Prisma/PostgreSQL schema, Stripe payment route, Postmark delivery worker, admin surfaces, and compliance pages [evidence: package.json; apps/api/src/index.ts; apps/worker/src/agents/delivery.ts; packages/shared/prisma/schema.prisma; apps/web/app/page.tsx].

Investment posture: watchlist, not near-term investible. The product has meaningful build evidence, but demand, government inbox deliverability, official-data coverage, and legal/compliance sufficiency remain unvalidated [evidence: .planning/PROJECT.md states "Validated: (None yet - ship to validate)"; registry note supplied by wrk.dog].

## Thesis

Current thesis: ordinary US residents will pay $5, $15, or $25 for a guided workflow that handles official lookup, regulation research, citation verification, letter drafting, payment, and email delivery [evidence: apps/api/src/routes/payments.ts pricing constants; .planning/PROJECT.md Core Value].

Why it might work: the product compresses a multi-step civic task into a low-price transaction and can reuse verified official contacts, legal citations, and campaign patterns over time [evidence: .planning/GENESIS.md Value Chain and Moat Hypothesis].

Why it might not work: civic frustration is common, but willingness to pay is unproven; the repo sets a beta gate of >=3% conversion, but no conversion data exists [evidence: .planning/PROJECT.md Market Verdict and Validated section]. Government inbox filtering and local official data quality are likely harder than drafting letters [evidence: .planning/PROJECT.md "Email Deliverability Is The Hardest Problem" and local API blocker].

## Product Reality

Built or represented in code as of 2026-06-22 [evidence: worker environment current_date]:

- Web: Next.js app with landing page, submit flow, dashboard, admin, privacy, and terms routes [evidence: apps/web/app/page.tsx; rg file listing].
- API: Express service mounting health, submissions, officials, webhooks, payments, campaigns, admin, and compliance routers [evidence: apps/api/src/index.ts].
- Data: Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- Agents: BullMQ worker modules for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: rg file listing; apps/worker/src/index.ts].
- Payments: Stripe Checkout creates $5, $15, and $25 package sessions [evidence: apps/api/src/routes/payments.ts].
- Delivery: Postmark worker sends one email per letter, records delivery rows, skips opted-out officials, and suppresses high-bounce domains above 10% [evidence: apps/worker/src/agents/delivery.ts].

Not yet proven:

- Paid conversion at >=3% [evidence: .planning/PROJECT.md beta validation gate].
- .gov inbox placement at >=85% [evidence: .planning/PROJECT.md beta validation gate].
- Official data coverage at >=95% federal/state and >=60% local [evidence: .planning/PROJECT.md beta validation gate].
- Legal/compliance sufficiency for AI-generated constituent communications [assumption: legal review not present in repo].

## Customer Definition

Primary customer: a US resident with a specific civic problem, a clear desired outcome, and insufficient time or expertise to identify the right authority, find relevant rules, draft a formal letter, and route it correctly [evidence: .planning/PROJECT.md Target User].

Initial high-intent use cases: local enforcement failures, school policy concerns, zoning/noise/pothole issues, constituent service requests, and legislative demands [evidence: MASTER_PLAN.md Executive Summary and .planning/GENESIS.md Target User].

Excluded customers: litigants seeking legal advice, people filing formal regulatory claims, political campaigns seeking lobbying services, and organizations needing bulk advocacy tooling [evidence: MASTER_PLAN.md "What this platform is not"; .planning/REQUIREMENTS.md Out of Scope].

Buyer/user split: the same resident is usually both user and payer at launch [evidence: apps/api/src/routes/payments.ts requires authenticated user before payment]. Officials are recipients, not customers [evidence: .planning/PROJECT.md Stakeholders].

## Market Sizing

Because workspace-only mode prevents live research, the market model is deliberately bottom-up and assumption-led.

Beachhead model: 100,000 issue-aware US residents per year [assumption: conservative planning placeholder; no network research] x 3% paid conversion [evidence: .planning/PROJECT.md beta gate] x $15 average package price [evidence: midpoint of $5/$15/$25 tiers in apps/api/src/routes/payments.ts] = $45,000 annual beachhead revenue [assumption: arithmetic from tagged inputs].

Base expansion model: 1,000,000 reachable residents per year [assumption: external demand pool placeholder; no network research] x 5% conversion [assumption: post-validation improvement above repo beta gate] x $17.50 average price [assumption: mix shift toward $15 and $25 packages] = $875,000 annual revenue [assumption: arithmetic from tagged inputs].

Stretch model: 10,000,000 reachable residents per year [assumption: broad US civic-help-seeker placeholder; no network research] x 3% conversion [evidence: .planning/PROJECT.md beta gate] x $15 average package price [evidence: apps/api/src/routes/payments.ts] = $4,500,000 annual revenue [assumption: arithmetic from tagged inputs].

Interpretation: even the stretch case is not a venture-scale outcome unless CivicState adds a validated organizational channel, recurring product, or durable public campaign/SEO flywheel. The repo explicitly defers API consumers to Phase 4+ and subscriptions are removed from active scope [evidence: .planning/PROJECT.md Out of Scope; MASTER_PLAN.md changelog].

## Revenue Model

Launch revenue is transactional:

| Package | Price | Evidence | Notes |
|---|---:|---|---|
| Single official | $5 | [evidence: apps/api/src/routes/payments.ts] | Tests lowest-friction willingness to pay. |
| Three officials | $15 | [evidence: apps/api/src/routes/payments.ts] | Likely default package for early validation. |
| Full spread | $25 | [evidence: apps/api/src/routes/payments.ts] | Upside tier when official matching has enough confidence. |

Deferred revenue lines:

- Priority complex review at 75%-85% target margin [evidence: MASTER_PLAN.md revenue streams; not implemented as active payment route].
- Third-party API access at ~90% target margin [evidence: MASTER_PLAN.md revenue streams; .planning/PROJECT.md marks API consumers future].
- Subscriptions: explicitly not active [evidence: MASTER_PLAN.md changelog].

Revenue quality concern: one-time civic transactions can be sporadic. Retention will likely come from repeated civic issues, reply tracking, SEO capture, or future organization products, none of which are validated in current repo evidence [assumption: business-model inference from transactional pricing].

## Financial Model

The table reconciles revenue as paid submissions x average package price. It is a validation model, not a forecast.

| Period | Paid submissions | Avg price | Revenue | Variable AI cost | Stripe/payment fees | Fixed infrastructure | Contribution before labor |
|---|---:|---:|---:|---:|---:|---:|---:|
| Validation quarter | 300 [assumption: beta target placeholder] | $15 [evidence: pricing midpoint] | $4,500 [assumption: 300 x $15] | $60 [evidence: $0.20/submission in .planning/PROJECT.md x 300] | $222 [assumption: $0.74/order blended fee x 300] | $397.50 [evidence: $132.50/mo max burn in .planning/PROJECT.md x 3 months] | $3,820.50 [assumption: arithmetic] |
| Base year | 2,400 [assumption: 200/month x 12 months] | $15 [evidence: pricing midpoint] | $36,000 [assumption: 2,400 x $15] | $480 [evidence: $0.20/submission x 2,400] | $1,776 [assumption: $0.74/order x 2,400] | $1,590 [evidence: $132.50/mo x 12 months] | $32,154 [assumption: arithmetic] |
| Scale year | 12,000 [assumption: 1,000/month x 12 months] | $15 [evidence: pricing midpoint] | $180,000 [assumption: 12,000 x $15] | $2,400 [evidence: $0.20/submission x 12,000] | $8,880 [assumption: $0.74/order x 12,000] | $3,000 [assumption: managed DB/storage/monitoring expansion] | $165,720 [assumption: arithmetic] |

Gross contribution margin in the base-year case is 89.3% [assumption: $32,154 / $36,000]. That is directionally consistent with the repo's 91% gross-margin claim, but neither figure is validated by production invoices or payment history [evidence: .planning/PROJECT.md Market Verdict; .planning/PROJECT.md Validated section].

Reserve requirement: the repo assumes a $1,500 Mercury reserve [evidence: .planning/PROJECT.md Constraints]. Break-even claim: 11 submissions [evidence: .planning/PROJECT.md Market Verdict], but that appears internally optimistic unless it refers to monthly break-even at a higher package mix; the $132.50 monthly burn divided by a $15 average ticket is 8.84 submissions before payment/AI fees [assumption: arithmetic from tagged inputs].

## Go-To-Market

Primary channel: SEO from opt-in public campaign pages and long-tail civic queries [evidence: .planning/GENESIS.md Distribution Hypothesis]. Current risk: Publisher/public campaign pages are deferred out of v1 in .planning/PROJECT.md, while MASTER_PLAN.md still treats opt-in publication as part of the SEO engine [evidence: .planning/PROJECT.md Out of Scope; MASTER_PLAN.md Executive Summary].

Launch sequence:

- Operator beta with manually selected issue categories and jurisdictions, not open-ended national launch [assumption: risk-control recommendation from official-data and deliverability gaps].
- Validate end-to-end paid delivery for 50 paid submissions [assumption: small-sample validation target] while tracking conversion, inbox placement, bounce rate, official response rate, refund/chargeback rate, and human-review load.
- Publish only sanitized, opted-in campaign summaries after legal review [assumption: sensitivity and moderation risk].
- Expand jurisdiction coverage when federal/state/local lookup meets the repo gates of >=95% federal/state and >=60% local coverage [evidence: .planning/PROJECT.md Market Verdict].

Paid acquisition is not in the active plan [evidence: .planning/GENESIS.md Scope Exclusions].

## Competition

Named alternatives:

- Resistbot: closest constituent-message competitor; CivicState claims differentiation through research-backed, cited, higher-context drafting [evidence: MASTER_PLAN.md Competitive Positioning; external facts about current Resistbot capabilities are assumption due workspace-only mode].
- Change.org: petition hosting/social petition alternative; CivicState differentiates by sending researched letters rather than only hosting signatures [evidence: MASTER_PLAN.md Competitive Positioning; external facts are assumption].
- LegalZoom: adjacent document-preparation brand; CivicState is cheaper and civic-specific but must avoid legal-advice positioning [evidence: MASTER_PLAN.md Competitive Positioning; external facts are assumption].
- Quorum and VoterVoice: enterprise advocacy platforms serving organizations rather than individual citizens at launch [evidence: .planning/PROJECT.md Context; external pricing details are assumption].
- Manual outreach: free competitor; user pays only if CivicState saves enough time and improves confidence [assumption: behavioral economics inference].

Competitive weakness: the initial moat is weak. The repo's own Genesis says the moat does not exist at 50 submissions/month and becomes real only at 1,000+ submissions/month [evidence: .planning/GENESIS.md Moat Hypothesis].

## Risks And Anti-Plan

Skeptical partner view: do not invest until CivicState proves people pay, officials receive the mail, and legal/compliance risk is bounded.

Kill reasons:

- No validated demand: zero validated requirements in the project file [evidence: .planning/PROJECT.md].
- Deliverability could break the product: government servers may filter AI-assisted, platform-sent emails, and the repo identifies email deliverability as the hardest problem [evidence: .planning/PROJECT.md].
- Official data may be incomplete: the Google Civic Representatives endpoint is described as dead, and local lookup requires Cicero or BallotReady evaluation [evidence: .planning/PROJECT.md].
- Legal-adjacent posture: letters cite regulations and case law while disclaiming legal advice; that line needs actual legal review [assumption: legal-risk inference; no legal memo in repo].
- Weak venture scale: the current direct-to-consumer transactional model reaches $180,000 in the Year 2 base model [assumption: model above], which is useful but not venture-scale.
- Sensitivity: political opinions, constituent identity, and issue descriptions are sensitive personal data, and misuse could create reputational harm [evidence: .planning/PROJECT.md requires AES-256-GCM and compliance controls].

Anti-plan: if the first beta cannot reach >=3% paid conversion, >=85% government inbox placement, and >=95% federal/state plus >=60% local coverage, stop building growth features and either reposition as a personal research asset or sell the workflow as operator-assisted civic correspondence [evidence: .planning/PROJECT.md beta gates].

## Assumption Ledger

| Assumption | Basis | Validation test | Status |
|---|---|---|---|
| Residents will pay $5-$25 for civic letters | [evidence: .planning/GENESIS.md Key Assumptions; apps/api pricing] | Landing-to-paid conversion >=3% | Open |
| AI citations can be verified reliably enough for production | [evidence: apps/worker/src/agents/researcher.ts citation verification flow] | Sample 100 letters with zero fabricated final citations [assumption: QA sample design] | Open |
| Email-only delivery is enough | [evidence: .planning/GENESIS.md Key Assumptions] | >=85% inbox placement and acceptable official response rate | Open |
| One operator can handle exceptions | [evidence: .planning/GENESIS.md Key Assumptions] | <30 minutes/day routine operations at beta volume [evidence: .planning/PROJECT.md operator constraint] | Open |
| SEO campaign archive can compound acquisition | [evidence: .planning/GENESIS.md Distribution Hypothesis] | Organic impressions and paid conversions from indexed pages after publication | Open |

## Evidence And Freshness

Evidence reviewed on 2026-06-22 [evidence: worker environment current_date]:

- [MASTER_PLAN.md](MASTER_PLAN.md) v2.1, March 2026 [evidence: file header].
- [.planning/PROJECT.md](.planning/PROJECT.md), last updated 2026-04-25 [evidence: file footer].
- [.planning/GENESIS.md](.planning/GENESIS.md), generated 2026-04-25 [evidence: file footer].
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md), defined 2026-04-25 [evidence: file header].
- [.planning/ROADMAP.md](.planning/ROADMAP.md), phase plan and claimed completion [evidence: file contents].
- Source files under apps/ and packages/ [evidence: repo file tree].

Freshness caveat: all external market and competitor statements are stale by construction because this worker had no network access. Treat every external claim as an assumption until refreshed with live sources [assumption: workspace-only constraint from dispatch].

## Surprise Spikes

- Registry note says the asset is personal/research and not near-term investible, while MASTER_PLAN.md presents a business plan with revenue projections [evidence: registry note in dispatch; MASTER_PLAN.md].
- .planning/ROADMAP.md marks all phases complete on 2026-04-25, while .planning/STATE.md still says current focus is Phase 1 Foundation and only Phase 1 complete [evidence: .planning/ROADMAP.md; .planning/STATE.md].
- .planning/existing-state.md says no application code exists, but the current repo contains app code across web, API, worker, and shared packages [evidence: .planning/existing-state.md; rg file listing].
- MASTER_PLAN.md discusses dynamic pricing and publisher/SEO loops, but .planning/PROJECT.md and code use hardcoded tiers and defer publisher/search features [evidence: MASTER_PLAN.md; .planning/PROJECT.md; apps/api/src/routes/payments.ts].

## Buildable Roadmap Link

The immediate roadmap should validate the plan before expanding scope: prove paid conversion, deliverability, citation quality, official coverage, operator load, and legal posture. ROADMAP.md contains the worker-sized backlog aligned to these headings [evidence: ROADMAP.md created by this EIR upgrade].
