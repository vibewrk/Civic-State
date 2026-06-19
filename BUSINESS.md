# CivicState - Business Plan

**Document date:** 2026-06-19 [evidence: runner current_date].  
**Project status:** Watchlist research asset, not an investible BOS until the operator confirms this should be pitched as a business [evidence: dispatch registry notes].  
**Evidence standard:** repo files are evidence; external market claims are labeled as assumptions because this run is workspace-only [evidence: dispatch brief].

## Thesis

CivicState can become a paid civic-action utility if US residents will buy a citation-backed, correctly routed official-letter workflow for $5, $15, or $25 per campaign [evidence: apps/api/src/routes/payments.ts], and if delivery coverage, citation accuracy, and government-inbox deliverability hold under real usage [assumption: core unknowns from product risk review].

## Problem & Customer

The customer is a US resident with a specific civic issue, such as a policy concern, service failure, budget issue, enforcement failure, or local-government complaint, who wants action but is unlikely to identify jurisdiction, research authority, draft a professional letter, and find the correct official alone [evidence: .planning/PROJECT.md; evidence: .planning/GENESIS.md].

The initial ICP is mobile-first, non-technical, English-speaking, and issue-driven rather than organization-driven [evidence: .planning/PROJECT.md]. The buyer is not a law firm, lobbying shop, business-advocacy program, or mass-campaign operator; business-entity advocacy is explicitly escalated out of the normal flow [evidence: MASTER_PLAN.md].

Primary pain is workflow abandonment: the task requires official lookup, legal or regulatory context, careful language, and delivery tracking [evidence: MASTER_PLAN.md]. Current substitutes are manual research, direct email to officials, Resistbot-style lawmaker contact, petition platforms such as Change.org, document-drafting tools such as LegalZoom, and enterprise advocacy software such as Quorum or VoterVoice [assumption: competitor set from common civic-tech categories; network unavailable].

## Market

This is not yet a venture-grade market proof. The market model is bottom-up and deliberately provisional.

| Layer | Method | Annual campaigns | ASP | Revenue pool |
|---|---|---:|---:|---:|
| TAM | US residents with civic intent who would pay for at most one assisted campaign per year | 20,000,000 [assumption: directional civic-intent population, unverified without network] | $15 [evidence: apps/api/src/routes/payments.ts] | $300,000,000 [assumption: 20,000,000 times $15] |
| SAM | English-language, online, ZIP-routable users in jurisdictions with adequate official email coverage | 4,000,000 [assumption: 20% of TAM, constrained by official coverage and trust] | $15 [evidence: apps/api/src/routes/payments.ts] | $60,000,000 [assumption: 4,000,000 times $15] |
| SOM | First scale target already contemplated in the data model | 4,800 campaigns per year [evidence: .planning/existing-state.md] | $15 [evidence: apps/api/src/routes/payments.ts] | $72,000 [assumption: 4,800 times $15] |

The market-size claim is weak until validated by paid conversion, repeat usage, and official-delivery success. It is sufficient for an experiment, not sufficient for a priced seed-round story [assumption: EIR judgment].

## Product & Moat

What is real as of 2026-06-19 [evidence: runner current_date]:

- A pnpm monorepo with web, API, worker, and shared packages exists [evidence: package.json; evidence: pnpm-workspace.yaml].
- The web app includes submit, dashboard, admin, privacy, and terms pages [evidence: apps/web/app/submit/page.tsx; evidence: apps/web/app/dashboard/page.tsx; evidence: apps/web/app/admin/page.tsx; evidence: apps/web/app/privacy/page.tsx; evidence: apps/web/app/terms/page.tsx].
- The API includes submissions, officials, campaigns, payments, webhooks, admin, health, and compliance routes [evidence: apps/api/src/routes].
- The worker includes classifier, researcher, drafter, delivery, treasury, and reconciliation agents [evidence: apps/worker/src/agents].
- The Prisma schema includes users, submissions, campaigns, letters, officials, payments, deliveries, jobs, ledger entries, audit logs, and agent action logs [evidence: packages/shared/prisma/schema.prisma].
- The test tree contains 28 files [evidence: tests inventory in workspace].

What is not proven as of 2026-06-19 [evidence: runner current_date]:

- There is no repo evidence of live production traffic, live paid users, or realized revenue [evidence: .planning/existing-state.md].
- There is no repo evidence that official email deliverability works at government domains under real load [evidence: .planning/PROJECT.md].
- There is no repo evidence that users trust AI-drafted civic correspondence enough to pay [evidence: .planning/GENESIS.md].

The moat is not software alone. If the product works, defensibility comes from a verified officials directory, bounce and response history, reusable citation references, moderation data, and optional public campaign pages that compound through search [evidence: .planning/GENESIS.md; assumption: data-network effect requires usage volume].

## Platform Posture

Under the wrk.vc portfolio posture, CivicState should be treated as a WrkPlug client, not as a company that must own standalone auth, billing, identity, or login rails [assumption: WrkPlug D-032 platform rule from dispatch brief]. The current code uses Clerk auth and Stripe payments [evidence: apps/api/src/middleware/auth.ts; evidence: apps/api/src/routes/payments.ts], so any WrkPlug migration must be operator-gated and not hard-wired here [assumption: WrkPlug Phase 0 not yet signed].

Cost consequence: shared identity, billing, and account rails could lower duplicated infrastructure and reduce CAC by letting the portfolio cross-sell through a single MCPWrk account [assumption: platform-synergy model, no repo evidence]. Moat consequence: shared rails could make CivicState's official-contact graph and compliance workflows reusable by adjacent civic products [assumption: portfolio-chassis strategy].

## Business Model

CivicState is a transactional product. The live code defines three package prices: $5 single official, $15 three-pack, and $25 full-spread [evidence: apps/api/src/routes/payments.ts]. The older master plan also contemplated priority complex review and future API access, but those are not current proof points [evidence: MASTER_PLAN.md].

Unit model at the assumed blended $15 ASP [evidence: apps/api/src/routes/payments.ts]:

| Item | Amount |
|---|---:|
| Blended price | $15.00 [assumption: midpoint tier used as base case] |
| Payment fee | $0.74 [assumption: 2.9% plus $0.30 card fee; network unavailable] |
| AI plus delivery variable cost | $0.75 [evidence: .planning/GENESIS.md] |
| Gross profit per paid submission | $13.51 [assumption: $15.00 minus $0.74 minus $0.75] |
| Gross margin | 90.1% [assumption: $13.51 divided by $15.00] |
| Variable-cost ratio | 9.9% [assumption: $1.49 divided by $15.00] |

Revenue model: acquire issue-intent users, show free preview/research value, require auth before payment, collect a one-time Stripe payment, deliver only after webhook confirmation, and record the result in ledger and delivery tables [evidence: apps/web/app/submit/page.tsx; evidence: apps/api/src/routes/payments.ts; evidence: apps/api/src/routes/webhooks.ts].

## Competition

Resistbot is the closest civic-action substitute: fast citizen-to-lawmaker contact, but the current CivicState differentiation is cited research, jurisdiction targeting, per-official letters, and payment-backed delivery [assumption: competitor positioning; network unavailable].

Change.org competes for public petition behavior; CivicState instead sells private or optional-public routed correspondence [assumption: competitor positioning; network unavailable].

LegalZoom competes for "make this formal" intent; CivicState avoids legal advice and focuses on constituent communication [evidence: apps/web/app/terms/page.tsx; assumption: competitor positioning; network unavailable].

Quorum, VoterVoice, and Phone2Action are enterprise advocacy incumbents; the existing project notes place enterprise tools at $10,000+ per year [evidence: .planning/PROJECT.md], while CivicState prices individual campaigns at $5 to $25 [evidence: apps/api/src/routes/payments.ts].

Manual outreach is the strongest substitute because it costs $0 [assumption: no platform fee for self-directed email]. CivicState must prove that convenience, citation quality, and delivery tracking are worth paying for.

## Go-To-Market

The first wedge should be narrow civic categories where a resident can verify that the output is useful without trusting legal conclusions: local services, zoning, potholes, school-board policy, noise, utilities, permitting, and public safety concerns [assumption: low-liability launch wedge].

First customer cohort plan: recruit 100 paid or near-paid testers [assumption: validation cohort size] through founder network, local civic forums, neighborhood groups, school-board audiences, and issue-specific search pages; measure completion, payment, delivery, and reply outcomes before scaling [assumption: low-budget GTM path].

SEO is the intended compounding channel: opt-in public campaign pages can become long-tail search targets if enough real campaigns exist [evidence: MASTER_PLAN.md; evidence: .planning/GENESIS.md]. Social sharing should be secondary until moderation load and privacy posture are proven [evidence: .planning/GENESIS.md].

No paid-acquisition budget should be approved until the product clears willingness-to-pay, deliverability, and official-coverage gates [evidence: .planning/PROJECT.md].

## Financial Model

The model uses the current code's price ladder and a blended $15 ASP [evidence: apps/api/src/routes/payments.ts]. It is a planning sketch, not operating history.

| Line | Base Year | Growth Year | Scale Test Year |
|---|---:|---:|---:|
| Paid submissions | 600 [assumption: 50 per month base case] | 4,800 [evidence: .planning/existing-state.md] | 18,000 [assumption: 1,500 per month scale test] |
| Blended ASP | $15 [evidence: apps/api/src/routes/payments.ts] | $15 [evidence: apps/api/src/routes/payments.ts] | $15 [evidence: apps/api/src/routes/payments.ts] |
| Revenue | $9,000 [assumption: 600 times $15] | $72,000 [assumption: 4,800 times $15] | $270,000 [assumption: 18,000 times $15] |
| Payment fees | $441 [assumption: 600 times $0.74] | $3,528 [assumption: 4,800 times $0.74] | $13,230 [assumption: 18,000 times $0.74] |
| AI plus delivery cost | $450 [assumption: 600 times $0.75] | $3,600 [assumption: 4,800 times $0.75] | $13,500 [assumption: 18,000 times $0.75] |
| Infrastructure and tooling | $1,590 [evidence: .planning/PROJECT.md] | $4,500 [assumption: managed DB, monitoring, storage] | $12,000 [assumption: higher worker and database load] |
| Review, ops, and support | $3,000 [assumption: fractional operator time] | $18,000 [assumption: contractor review and support] | $54,000 [assumption: part-time ops capacity] |
| Legal, compliance, accounting | $2,500 [assumption: lean review budget] | $6,000 [assumption: recurring compliance support] | $15,000 [assumption: higher regulated-adjacent volume] |
| Operating profit before founder salary | $1,019 [assumption: revenue minus listed costs] | $36,372 [assumption: revenue minus listed costs] | $162,270 [assumption: revenue minus listed costs] |

Revenue assumptions:

- The blended ASP is $15 [evidence: apps/api/src/routes/payments.ts].
- Conversion is not modeled as validated; willingness-to-pay must clear 3% [evidence: .planning/PROJECT.md].
- Delivery coverage must reach 95% federal/state and 60% local before the product can scale [evidence: .planning/PROJECT.md].

Cost assumptions:

- AI plus delivery variable cost stays at $0.75 per paid submission [evidence: .planning/GENESIS.md].
- Government-domain bounce controls prevent large resend or remediation costs [assumption: deliverability not yet proven].
- Human review remains exception-based, with no 24/7 staffing [evidence: .planning/PROJECT.md].

Sensitivity tests:

- If blended ASP falls to $5 [evidence: apps/api/src/routes/payments.ts], the Base Year revenue becomes $3,000 [assumption: 600 times $5] and the current operating plan is not investible.
- If AI plus delivery cost rises to $2.00 [assumption: adverse token and deliverability case], gross margin at $15 ASP becomes 81.5% [assumption: ($15 minus $0.74 minus $2.00) divided by $15].
- If paid volume reaches only 120 submissions per year [assumption: 10 per month failed-demand case], annual revenue is $1,800 [assumption: 120 times $15] and the product should stay a personal/research asset.

## Risks & Anti-Plan

The strongest anti-plan is that CivicState may be solving a task people complain about but will not pay to outsource. If conversion stays below 3% [evidence: .planning/PROJECT.md], no amount of agent polish fixes the business. Mitigation is a paid beta before more infrastructure work. Residual risk remains high because civic frustration often converts into venting, not purchasing [assumption: customer behavior risk].

Second, government email deliverability could kill the product. The plan depends on inbox placement at official domains, and project notes set an 85% inbox-placement gate [evidence: .planning/PROJECT.md]. If letters bounce, land in spam, or trigger suppression, the core promise fails. Mitigation is domain warming, per-domain bounce gates, and Postmark tracking [evidence: apps/worker/src/agents/delivery.ts]. Residual risk remains high until live sends prove the channel.

Third, citation-backed drafting is liability-adjacent. The terms page says the platform is not legal advice [evidence: apps/web/app/terms/page.tsx], but users may still treat the output as legal authority. Mitigation is citation verification, disclaimers, moderation, and human escalation [evidence: apps/worker/src/agents/researcher.ts; evidence: apps/api/src/lib/moderation.ts]. Residual risk remains medium to high because bad civic letters can create reputational or legal complaints [assumption: legal-adjacent product risk].

Fourth, the registry context says this is a watchlist personal/research asset, not a near-term investible BOS [evidence: dispatch registry notes]. Mitigation is to gate roadmap funding behind operator confirmation. Residual risk is that the team over-pitches the asset before evidence exists.

## Assumption Ledger

| Claim | Basis | Label | Test |
|---|---|---|---|
| Users will pay for civic-letter workflow | Existing price ladder and core thesis | [assumption: no paid-user evidence] | Run paid beta and measure conversion against 3% gate [evidence: .planning/PROJECT.md] |
| Official email is enough for launch | Email-first roadmap and delivery code | [assumption: deliverability unproven] | Send monitored pilot and measure 85% inbox-placement gate [evidence: .planning/PROJECT.md] |
| Citation quality can be trusted with verification | Researcher and citation-verifier exist | [assumption: production accuracy unproven] | Audit sample of delivered letters before expansion |
| SEO can compound | Public campaign archive thesis | [assumption: no traffic evidence] | Publish opt-in pages and track impressions |
| One operator can handle exceptions | Existing operator workflow | [assumption: volume and review load unknown] | Track flagged queue age against 24-hour escalation [evidence: .planning/ROADMAP.md] |
| WrkPlug lowers platform cost | Shared-rails strategy | [assumption: WrkPlug Phase 0 not yet signed] | Operator decision before auth or billing migration |

## Self-Valuation

Score: 31 out of 100 [assumption: EIR score based on code present, market unvalidated, registry watchlist flag].

Method: probability-weighted option value under the $5,000,000 per-business program ceiling [assumption: dispatch program context], using named comparables for category positioning only: Resistbot, Change.org, LegalZoom, and Quorum [assumption: no market multiples available in workspace-only mode].

| Case | 12-month value band [assumption: EIR valuation horizon] | What has to be true |
|---|---:|---|
| BEAR | $50,000 to $100,000 [assumption: code and research salvage value] | Conversion misses 3% [evidence: .planning/PROJECT.md] or deliverability misses 85% [evidence: .planning/PROJECT.md] |
| BASE | $250,000 to $500,000 [assumption: validated niche utility, not venture scale] | 4,800 annual campaigns [evidence: .planning/existing-state.md] with positive gross margin |
| BULL | $1,000,000 to $2,000,000 [assumption: strong early traction below program ceiling] | 18,000 annual campaigns [assumption: 1,500 per month] and repeatable SEO acquisition |

The valuation moves up only with paid conversion, deliverability, repeatable CAC, and evidence that public campaign pages generate qualified demand [assumption: EIR method].

## Milestones

| Date | Milestone | Proof |
|---|---|---|
| 2026-07-03 [assumption: two-week validation window from document date] | Operator confirms whether this remains a personal/research asset or becomes a business pitch | Decision entry added to DECISIONS.md |
| 2026-07-17 [assumption: four-week validation window from document date] | Paid beta instrumentation is in place | Conversion, payment, delivery, and moderation events visible in admin surfaces |
| 2026-08-14 [assumption: eight-week validation window from document date] | Deliverability pilot completed | Bounce, spam, and delivered-status data reviewed against 85% gate [evidence: .planning/PROJECT.md] |
| 2026-09-11 [assumption: twelve-week validation window from document date] | Go or no-go review for public launch | 3% willingness-to-pay gate [evidence: .planning/PROJECT.md], official coverage, and support load reviewed |

## Surprise Spikes

The old `.planning/existing-state.md` says there is zero application code and zero application tests [evidence: .planning/existing-state.md]. The current repo contradicts that: it includes web, API, worker, Prisma schema, and 28 test files [evidence: apps; evidence: packages/shared/prisma/schema.prisma; evidence: tests inventory]. This soul upgrade treats the code as real and the stale existing-state audit as superseded, while preserving its warning that there is no evidence of live production revenue [evidence: .planning/existing-state.md].

The master plan describes a broader OpenClaw agent set with Pricer, Publisher, and Framing Reviewer [evidence: MASTER_PLAN.md]. The current worker code shows classifier, researcher, drafter, delivery, treasury, and reconciliation agents instead [evidence: apps/worker/src/agents]. The roadmap should now serve the built shape, not the older larger agent vision.
