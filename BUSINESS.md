# CivicState Business Plan

Last updated: 2026-06-23 [evidence: worker current_date and dispatch context]. Registry project id: brooks-history [evidence: dispatch context]. Product name in the repo is CivicState [evidence: package.json].

## Thesis

CivicState can become a narrow paid civic-communications business if ordinary United States residents will pay for researched, citation-backed constituent letters and if government email delivery remains reliable enough to preserve trust; as of 2026-06-23 this is a watchlist/personal research asset, not a near-term investible business operating system [evidence: dispatch registry note].

## Problem & Customer

The current repo describes CivicState as a web platform that turns a civic concern into a researched, citation-backed letter delivered to the correct government officials [evidence: .planning/PROJECT.md]. The primary customer is an individual resident with a specific policy, enforcement, or legislative issue who lacks the time, official-targeting knowledge, or formal writing confidence to prepare a professional letter [evidence: .planning/PROJECT.md].

Customer segments:

| Segment | Pain | Current alternative | CivicState wedge |
|---|---|---|---|
| Individual constituent | Does not know which official has jurisdiction [evidence: .planning/PROJECT.md] | Manual search and direct email [evidence: MASTER_PLAN.md] | ZIP-based official targeting and letter drafting [evidence: apps/web/app/submit/page.tsx; apps/api/src/routes/submissions.ts] |
| Local issue organizer | Needs repeatable, professional constituent communications [assumption: common civic-tech workflow, no network research available] | Petition platform or shared templates [assumption: external category knowledge] | Paid researched letters with per-official delivery status [evidence: apps/web/components/dashboard/delivery-status.tsx; apps/api/src/routes/campaigns.ts] |
| Future civic organization buyer | Wants managed civic letter workflow [assumption: roadmap future ICP] | Enterprise advocacy software [assumption: external category knowledge] | Deferred API/organization surface, not launch scope [evidence: .planning/PROJECT.md] |

Customer definition for validation: a paying individual resident who completes a submission, pays between $5 and $25 [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts], receives a draft with verified citations [evidence: apps/worker/src/agents/researcher.ts], and would use the product again or refer another resident [assumption: EIR validation definition].

## Market

Network research was unavailable in this run. All external market-sizing claims below are assumptions, not evidence.

Bottom-up serviceable market method:

| Layer | Calculation | Result |
|---|---|---|
| Early reachable audience | 50,000 issue-intent visitors per year [assumption: SEO/local civic content seed model, no external source] |
| Conversion to paid submission | 3% paid conversion [evidence: .planning/PROJECT.md names this as a Phase One beta gate] |
| Paid campaigns | 1,500 campaigns per year = 50,000 visitors x 3% [assumption: arithmetic from prior assumptions] |
| Average order value | $18 per campaign [evidence: MASTER_PLAN.md Month Twelve scenario] |
| Early serviceable revenue | $27,000 per year = 1,500 campaigns x $18 [assumption: arithmetic from visitor and conversion assumptions] |
| Watchlist SOM target | $86,400 annualized revenue after reaching 400 campaigns per month at $18 [evidence: MASTER_PLAN.md Month Twelve scenario; assumption: annualization] |

This is intentionally not a venture-scale TAM. A credible investment case requires observed demand, not top-down civic-participation math [assumption: EIR judgment]. The project should remain watchlist until a real beta shows at least 3% paid conversion [evidence: .planning/PROJECT.md], at least 85% .gov inbox placement [evidence: .planning/PROJECT.md], and at least 95% federal/state official coverage with at least 60% local coverage [evidence: .planning/PROJECT.md].

## Product & Moat

Real today in the repo:

| Surface | Evidence | Status |
|---|---|---|
| Monorepo with web, API, worker, shared package | package.json; apps/*; packages/shared | Built [evidence: package.json] |
| Submission API with moderation and BullMQ enqueue | apps/api/src/routes/submissions.ts | Built but not market-validated [evidence: apps/api/src/routes/submissions.ts] |
| Official lookup libraries for Congress, OpenStates, and Cicero stub | apps/api/src/lib/officials/* | Built/stubbed depending provider [evidence: apps/api/src/lib/officials/lookup.ts] |
| Researcher with eCFR, CourtListener, state cache, and citation verification | apps/worker/src/agents/researcher.ts | Built but source coverage unvalidated [evidence: apps/worker/src/agents/researcher.ts] |
| Drafter with AI disclosure, disclaimer, and CAN-SPAM footer | apps/worker/src/agents/drafter.ts | Built [evidence: apps/worker/src/agents/drafter.ts] |
| Stripe Checkout and webhook fulfillment | apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts | Built with integration risk [evidence: apps/api/src/routes/payments.ts] |
| Postmark delivery and bounce/spam handling | apps/worker/src/agents/delivery.ts; apps/api/src/routes/webhooks.ts | Built but deliverability unvalidated [evidence: apps/worker/src/agents/delivery.ts] |

Moat today is not defensible AI. The current moat is workflow integration: official targeting, citation verification, moderation, payment gating, delivery logging, and treasury/audit trails in one narrow loop [evidence: packages/shared/prisma/schema.prisma]. The durable moat, if any, would come from a proprietary delivery/response dataset and official-contact hygiene over time [assumption: EIR judgment].

## Platform Posture

The current repo uses Clerk for identity and Stripe for payments [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts]. It is not currently a WrkPlug client [evidence: repo code and package files inspected]. If the operator wants this to ship on shared wrk.vc rails, the intended posture should be: CivicState is a client of the WrkPlug chassis for auth, billing, identity, and login, with lower infra surface and shared-rails compounding [assumption: WrkPlug Phase Zero not signed].

Cost/moat consequence: keeping shared rails outside the product should reduce duplicate platform work and make CivicState focus on the civic workflow rather than generic account, billing, and identity systems [assumption: EIR platform strategy]. The existing Clerk/Stripe code is therefore either launch scaffolding or a migration liability, depending the operator ruling [evidence: apps/api/src/routes/payments.ts; apps/web/app/sign-in/[[...sign-in]]/page.tsx].

## Business Model

Launch revenue is transactional, not subscription. Pricing in the repo is $5 for a single official, $15 for a three-official package, and $25 for all matched officials [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md]. The prior master plan requires every job to be cost-positive and maintain a 40% net margin floor after Stripe fees [evidence: MASTER_PLAN.md].

Unit economics from the repo plan:

| Package | Revenue | Estimated direct cost | Margin note |
|---|---:|---:|---|
| Single | $5 [evidence: apps/api/src/routes/payments.ts] | Not fully modeled in repo [evidence: MASTER_PLAN.md only models larger packages] | Needs measured token/delivery data [assumption: EIR gap] |
| Amplify | $15 [evidence: MASTER_PLAN.md] | $1.20 total COGS [evidence: MASTER_PLAN.md] | 92% gross margin [evidence: MASTER_PLAN.md] |
| Complex | $25 [evidence: MASTER_PLAN.md] | $1.94 total COGS [evidence: MASTER_PLAN.md] | 92% gross margin [evidence: MASTER_PLAN.md] |

Revenue streams:

| Stream | Timing | Evidence label |
|---|---|---|
| Paid letter packages | Launch | $5-$25 one-time payments [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts] |
| Priority complex review | Later | 75%-85% target margin in old plan [evidence: MASTER_PLAN.md] |
| API for HOAs/nonprofits | Future only | Future API access at about 90% target margin in old plan [evidence: MASTER_PLAN.md] |

## Competition

Named competitors and substitutes in the repo are Resistbot, Change.org, LegalZoom, and manual direct constituent outreach [evidence: MASTER_PLAN.md]. The repo also references enterprise advocacy platforms such as Quorum and VoterVoice as serving organizations rather than individuals [evidence: .planning/PROJECT.md].

Positioning:

| Alternative | Risk to CivicState | CivicState counter-position |
|---|---|---|
| Resistbot | Free or low-friction civic messaging substitute [assumption: external product knowledge; repo names competitor] | Research-backed, cited, higher-context letters [evidence: MASTER_PLAN.md] |
| Change.org | Petition habit and distribution network [assumption: external product knowledge; repo names competitor] | Direct letters and official targeting, not petition hosting [evidence: MASTER_PLAN.md] |
| LegalZoom | Trust in formal document workflows [assumption: external product knowledge; repo names competitor] | Civic-specific and lower-price letter workflow [evidence: MASTER_PLAN.md] |
| Manual outreach | Free substitute | CivicState must save enough time and improve enough quality to justify $5-$25 [evidence: apps/api/src/routes/payments.ts; assumption: EIR judgment] |
| Quorum/VoterVoice | Enterprise incumbents may extend down-market [assumption: external category risk] | CivicState should avoid enterprise scope until individual paid demand is proven [evidence: .planning/PROJECT.md] |

## Go-To-Market

The first wedge should be narrow, local, and measurable. Start with one metro area and one to three issue categories where official targeting and citation coverage can be checked manually [assumption: EIR launch design]. The old plan already calls for a soft launch with 5-10 beta users in a single metro area [evidence: MASTER_PLAN.md].

First customers:

| Step | Action | Pass/fail metric |
|---|---|---|
| Beta cohort | Recruit 25 residents from local civic groups, neighborhood forums, and operator network [assumption: GTM plan, no network research] | At least 10 completed submissions [assumption: EIR validation threshold] |
| Paid smoke test | Charge real $5, $15, or $25 packages [evidence: apps/api/src/routes/payments.ts] | At least 3% paid conversion [evidence: .planning/PROJECT.md] |
| Deliverability proof | Send only after domain warmup and verified officials | At least 85% .gov inbox placement [evidence: .planning/PROJECT.md] |
| Repeatability | Ask paid users to submit another issue or refer a neighbor | At least 20% repeat/referral intent [assumption: EIR validation threshold] |

Distribution channels: issue-specific SEO from opt-in public campaign pages [evidence: MASTER_PLAN.md], local civic newsletters [assumption: GTM channel], neighborhood associations [assumption: GTM channel], and issue explainer pages generated only after citation verification [evidence: apps/worker/src/agents/researcher.ts].

## Financial Model

Historical repo scenario:

| Milestone | Volume and AOV | Revenue |
|---|---|---:|
| Month Three | 50 submissions x $15 average order value [evidence: MASTER_PLAN.md] | $750 [evidence: MASTER_PLAN.md] |
| Month Six | 120 submissions x $16 average order value [evidence: MASTER_PLAN.md] | $1,920 [evidence: MASTER_PLAN.md] |
| Month Twelve | 400 submissions x $18 average order value [evidence: MASTER_PLAN.md] | $7,200 [evidence: MASTER_PLAN.md] |
| Month Twenty-Four | 1,200 submissions x $20 average order value [evidence: MASTER_PLAN.md] | $24,000 [evidence: MASTER_PLAN.md] |

Forward model, pending validation:

| Period ending | Revenue build | Revenue | Variable cost | Fixed platform cost | Contribution after listed costs |
|---|---|---:|---:|---:|---:|
| 2027-06-30 [assumption: planning horizon] | 4,800 campaigns x $18 [assumption: 400 monthly average annualized from repo Month Twelve] | $86,400 [assumption: arithmetic] | $10,368 at 12% of revenue [evidence: MASTER_PLAN.md variable COGS plus Stripe fee assumption] | $2,400 from $200 per month [evidence: MASTER_PLAN.md] | $73,632 [assumption: arithmetic] |
| 2028-06-30 [assumption: planning horizon] | 14,400 campaigns x $20 [assumption: 1,200 monthly average annualized from repo Month Twenty-Four] | $288,000 [assumption: arithmetic] | $34,560 at 12% of revenue [evidence: MASTER_PLAN.md variable COGS plus Stripe fee assumption] | $18,000 [assumption: paid local data/API/tools and support] | $235,440 [assumption: arithmetic] |
| 2029-06-30 [assumption: planning horizon] | 30,000 campaigns x $22 [assumption: moderate SEO/category expansion] | $660,000 [assumption: arithmetic] | $79,200 at 12% of revenue [evidence: MASTER_PLAN.md variable COGS plus Stripe fee assumption] | $60,000 [assumption: tooling, deliverability, support, legal review reserve] | $520,800 [assumption: arithmetic] |

Revenue assumptions:

| Assumption | Basis | Test |
|---|---|---|
| Average order value can move from $18 to $22 [assumption: pricing mix] | Current tiers span $5-$25 [evidence: apps/api/src/routes/payments.ts] | Measure tier mix in beta |
| Paid conversion reaches at least 3% [evidence: .planning/PROJECT.md] | Prior plan gate | Track preview-to-payment conversion |
| Month Twelve scenario reaches 400 submissions per month [evidence: MASTER_PLAN.md] | Existing master plan | Require real acquisition evidence before hiring |

Cost assumptions:

| Assumption | Basis | Test |
|---|---|---|
| Variable COGS plus payment fees are about 12% of revenue [evidence: MASTER_PLAN.md] | Master plan says 8% variable COGS and 4% Stripe fees [evidence: MASTER_PLAN.md] | Reconcile actual token, email, and payment fees weekly |
| Fixed phase-one cost is about $200 per month [evidence: MASTER_PLAN.md] | Existing break-even section | Compare invoices after deployment |
| Mercury reserve is $1,500 before launch [evidence: MASTER_PLAN.md; .planning/PROJECT.md] | Existing constraint | Confirm bank balance before accepting payments |

Sensitivity tests:

| Case | Change | Result |
|---|---|---|
| Conversion miss | Paid conversion is 1% instead of 3% [assumption: downside case] | Early revenue falls by 67% [assumption: arithmetic] |
| Deliverability miss | .gov inbox placement is below 85% [evidence: .planning/PROJECT.md gate] | Stop paid delivery until remediation [assumption: operator policy] |
| Cost overrun | Variable and payment cost rises to 20% of revenue [assumption: downside case] | Contribution remains positive at $15 AOV but trust risk rises [assumption: arithmetic and EIR judgment] |

## Risks & Anti-Plan

Skeptical partner view: this may be a clever product that nobody needs to pay for. The value proposition sounds civic-minded, but users with urgent problems may prefer free channels, and users willing to pay may expect legal-grade outcomes the product cannot safely provide [assumption: EIR anti-plan].

| Hole | Mitigation | Residual risk |
|---|---|---|
| Paid demand is unproven | Run a real paid beta before calling this investible | Users may like drafts but not pay [assumption: EIR anti-plan] |
| Government deliverability can kill trust | Warm domain for 2-4 weeks [evidence: .planning/REQUIREMENTS.md], enforce bounce monitoring above 10% [evidence: apps/worker/src/agents/delivery.ts] | .gov filters may still block or throttle mail [assumption: external deliverability risk] |
| Official data coverage may be brittle | Use Congress/OpenStates/Cicero-style hybrid lookup [evidence: .planning/PROJECT.md; apps/api/src/lib/officials] | Local coverage may be too expensive or stale [assumption: EIR risk] |
| Legal-advice boundary is fragile | Disclaimers, AI disclosure, citation verification, and human review queue [evidence: apps/worker/src/agents/drafter.ts; apps/api/src/routes/admin.ts] | A user may treat output as legal advice despite disclaimers [assumption: legal risk, not legal conclusion] |
| Repo has integration mismatches | Add buildable roadmap items around preview/payment handoff | Payment tier contract mismatch can block checkout [evidence: apps/web/lib/api.ts; apps/api/src/routes/payments.ts] |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| CivicState should remain watchlist, not investible | Dispatch registry note | [evidence: dispatch registry note] | Operator confirms whether to pitch as business |
| Users will pay $5-$25 | Existing pricing tiers | [evidence: apps/api/src/routes/payments.ts] | Paid beta conversion |
| 3% conversion is the minimum useful gate | Prior planning doc | [evidence: .planning/PROJECT.md] | Instrument preview-to-payment funnel |
| Early serviceable revenue is $27,000 per year | Bottom-up visitor and conversion model | [assumption: no network research] | Replace with actual traffic and conversion |
| 85% .gov inbox placement is a launch gate | Prior planning doc | [evidence: .planning/PROJECT.md] | Deliverability seed test |
| WrkPlug shared rails would lower platform work | Platform strategy | [assumption: WrkPlug Phase Zero not signed] | Operator architecture ruling |
| Official-contact data becomes a moat | EIR judgment | [assumption: dataset compounding thesis] | Track bounce reduction and response capture over time |

## Self-Valuation

Score: 46 out of 100 [assumption: EIR score combining repo completeness, demand uncertainty, deliverability risk, and watchlist registry note]. This is not a $5,000,000-per-business candidate as of 2026-06-23 [evidence: dispatch registry note; assumption: EIR valuation judgment].

Twelve-month valuation bands under the $5,000,000 program assumption [assumption: program framing from dispatch brief]:

| Case | Band | Conditions |
|---|---:|---|
| Bear | $150,000 [assumption: asset value for code/research only] | No paid conversion or deliverability proof |
| Base | $600,000 [assumption: small validated tool value] | 3% conversion, 85% inbox placement, and 400 monthly submissions [evidence: .planning/PROJECT.md; MASTER_PLAN.md] |
| Bull | $1,500,000 [assumption: strategic option value] | Repeatable SEO acquisition, reliable official data, and $24,000 monthly revenue by Month Twenty-Four [evidence: MASTER_PLAN.md] |

Comparables used as category references: Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. No external valuation multiples were used because network research was unavailable [assumption: workspace-only constraint].

## Milestones

| Date | Milestone | Pass/fail |
|---|---|---|
| 2026-06-30 [assumption: next operator review date] | Resolve payment tier contract and preview route contract | Checkout works from preview in local test |
| 2026-07-15 [assumption: validation schedule] | Produce official-data coverage report for one metro | Coverage meets beta threshold or launch narrows |
| 2026-08-15 [assumption: validation schedule] | Run deliverability seed test after domain warmup | At least 85% inbox placement [evidence: .planning/PROJECT.md] |
| 2026-09-30 [assumption: validation schedule] | Paid beta decision | At least 3% conversion [evidence: .planning/PROJECT.md] and no unresolved legal/compliance blockers |
| 2026-12-31 [assumption: validation schedule] | Watchlist upgrade decision | Keep, kill, or pitch based on paid demand and delivery data |

## Surprise Spikes

The repo has several contradictions that matter:

| Spike | Why it matters |
|---|---|
| `.planning/ROADMAP.md` marks all phases complete, while `.planning/REQUIREMENTS.md` leaves most product requirements pending [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md] | The soul must not claim market-ready completion without operator verification |
| `MASTER_PLAN.md` references Google Civic Information API, while `.planning/PROJECT.md` says the endpoint died in April 2025 [evidence: .planning/PROJECT.md; MASTER_PLAN.md] | Official lookup strategy must use the newer hybrid plan |
| Frontend payment code sends `pricingTier`, while API route expects `tier`; frontend uses `three/all`, while API expects `three_pack/full_spread` [evidence: apps/web/lib/api.ts; apps/api/src/routes/payments.ts] | Checkout may fail even if Stripe is configured |
| Product is called CivicState in code, while registry project id is brooks-history [evidence: package.json; dispatch context] | Operator should confirm portfolio naming before wrk.vc presentation |

## Evidence Sources

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence: existing master plan]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence: existing project soul]
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) [evidence: requirement status]
- [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence: prior roadmap]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence: actual data model]
- [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts) [evidence: submission and moderation implementation]
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence: pricing and Stripe implementation]
- [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts) [evidence: research and citation verification implementation]
