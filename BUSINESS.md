# CivicState Business Plan

## Current Thesis

As of 2026-06-20 [evidence: dispatch current_date], CivicState is best treated as a personal/research civic-tech asset on the wrk.dog watchlist, not a near-term investible BOS [evidence: dispatch registry notes]. The business hypothesis is that a US resident with a specific civic frustration will pay $5 [evidence: apps/api/src/routes/payments.ts] to $25 [evidence: apps/api/src/routes/payments.ts] for a researched, citation-backed constituent letter delivered to relevant government officials.

The investible version requires proof of paid demand, official-contact coverage, deliverability, citation reliability, and low-review operations. Until those gates clear, the right posture is "buildable validation product," not "venture-scale company" [assumption: EIR judgment from repo-only review].

## What Exists Now

The repository now contains a pnpm monorepo with web, API, worker, and shared packages [evidence: package.json]. The API mounts submission, official lookup, payment, campaign, admin, webhook, and compliance routes [evidence: apps/api/src/index.ts]. The data model includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: packages/shared/prisma/schema.prisma]. The worker includes classifier, researcher, drafter, delivery, treasury, and reconciliation agents [evidence: apps/worker/src].

The product surface already states the user-facing promise: "AI-powered research. Verified citations. One-click delivery. $5 - $25" [evidence: apps/web/app/page.tsx]. Launch pricing is implemented as single at $5.00 [evidence: apps/api/src/routes/payments.ts], three-pack at $15.00 [evidence: apps/api/src/routes/payments.ts], and full-spread at $25.00 [evidence: apps/api/src/routes/payments.ts].

## Evidence Base And Freshness

This plan is workspace-only. No network research was available, so external market, pricing, competitor, legal, and adoption claims are assumptions unless they are directly evidenced by repo files.

| Source | What it supports | Freshness label |
|---|---|---|
| [MASTER_PLAN.md](MASTER_PLAN.md) | Original product architecture, pricing philosophy, constraints, competition names, and unit-economics targets [evidence: MASTER_PLAN.md] | Stale where contradicted by code because it is marked Version 2.1, March 2026 [evidence: MASTER_PLAN.md] |
| [.planning/PROJECT.md](.planning/PROJECT.md) | Prior thesis, validation gates, stakeholder definition, and constraints [evidence: .planning/PROJECT.md] | Last updated 2026-04-25 [evidence: .planning/PROJECT.md] |
| [.planning/ROADMAP.md](.planning/ROADMAP.md) | Original phase narrative and completed phase checklist [evidence: .planning/ROADMAP.md] | Completed-state claim dated 2026-04-25 [evidence: .planning/ROADMAP.md] |
| [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) | Current data model [evidence: packages/shared/prisma/schema.prisma] | Current as of 2026-06-20 [evidence: dispatch current_date] |
| [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) | Implemented pricing and Stripe checkout flow [evidence: apps/api/src/routes/payments.ts] | Current as of 2026-06-20 [evidence: dispatch current_date] |

## Customer Definition

Primary customer: a US resident with a specific local, state, or federal civic issue who has enough motivation to contact officials but lacks confidence, time, legal citation skill, or contact-routing knowledge [assumption: target segment from prior planning, not market-validated in this run]. The customer buys completion of a task, not generalized civic education.

Core job-to-be-done: "turn my issue into a credible letter to the correct officials without making me research the law or contact tree myself" [assumption: synthesized from MASTER_PLAN.md and product UI]. The launch buyer is an individual consumer; organizations, HOAs, nonprofits, and API buyers remain deferred [evidence: .planning/PROJECT.md].

Non-customers at launch include legal claimants, people seeking legal advice, political campaign operators, bulk advocacy groups, businesses acting as entities, and users attempting harassment, defamation, or threats [evidence: MASTER_PLAN.md].

## Market Sizing Method

No VC-grade TAM can be asserted from this workspace alone. A credible sizing exercise must start bottom-up from validated paid campaigns, conversion rate, refund rate, deliverability, and repeat purchase frequency [assumption: EIR market-sizing method].

The validation wedge is intentionally small: prove a path from first paid campaign to 400 paid campaigns per month [assumption: derived from MASTER_PLAN.md month-twelve illustrative scale, not external demand evidence]. At the implemented price ladder, a 400-campaign monthly scenario produces $5,400 monthly gross revenue [assumption: 160 single campaigns at $5.00, 140 three-pack campaigns at $15.00, and 100 full-spread campaigns at $25.00]. That is $64,800 annualized gross revenue [assumption: $5,400 multiplied by 12 months].

TAM placeholder: the addressable pool is "US adults with actionable civic issues and online payment willingness," but this is not quantified here because the run has no external population, civic-engagement, search-demand, or willingness-to-pay data [assumption: workspace-only limitation].

## Revenue Model And Pricing

CivicState is a transaction business at launch. The implemented tiers are:

| Tier | Price | Included target count | Revenue implication |
|---|---:|---:|---|
| Single Official | $5.00 [evidence: apps/api/src/routes/payments.ts] | 1 official [evidence: apps/api/src/routes/payments.ts] | Entry product for low-friction validation [assumption: pricing strategy] |
| Three Officials | $15.00 [evidence: apps/api/src/routes/payments.ts] | 3 officials [evidence: apps/api/src/routes/payments.ts] | Same effective price per target as single [evidence: apps/api/src/routes/payments.ts] |
| All Officials | $25.00 [evidence: apps/api/src/routes/payments.ts] | all matched officials [evidence: apps/api/src/routes/payments.ts] | Upsell depends on official coverage confidence [assumption: product behavior] |

The treasury module estimates direct job cost at $0.20 for single [evidence: apps/worker/src/lib/treasury.ts], $0.40 for three-pack [evidence: apps/worker/src/lib/treasury.ts], and $0.60 for full-spread [evidence: apps/worker/src/lib/treasury.ts]. It also pauses jobs above 150% of estimated budget [evidence: apps/worker/src/lib/treasury.ts].

Future revenue streams such as API access, organizational plans, subscriptions, paid priority review, crowdfunding adjacency, physical mail, or fax should stay out of the base case until the consumer transaction loop proves demand [assumption: anti-premature-scaling stance].

## Financial Model

The table below is a validation scenario, not a forecast.

| Monthly scenario line | Calculation | Amount |
|---|---|---:|
| Single revenue | 160 campaigns [assumption: illustrative mix] x $5.00 [evidence: apps/api/src/routes/payments.ts] | $800.00 [assumption: arithmetic] |
| Three-pack revenue | 140 campaigns [assumption: illustrative mix] x $15.00 [evidence: apps/api/src/routes/payments.ts] | $2,100.00 [assumption: arithmetic] |
| Full-spread revenue | 100 campaigns [assumption: illustrative mix] x $25.00 [evidence: apps/api/src/routes/payments.ts] | $2,500.00 [assumption: arithmetic] |
| Gross revenue | tier revenue sum [assumption: arithmetic] | $5,400.00 [assumption: arithmetic] |
| Direct AI/delivery cost | 160 x $0.20 + 140 x $0.40 + 100 x $0.60 [evidence: apps/worker/src/lib/treasury.ts; assumption: mix] | $148.00 [assumption: arithmetic] |
| Payment processing | 3.2% of gross revenue plus $0.30 per campaign [assumption: common card-processing pattern, not verified in workspace-only mode] | $292.80 [assumption: arithmetic] |
| Base hosting | DigitalOcean starting droplet cost [evidence: MASTER_PLAN.md] | $96.00 per month [evidence: MASTER_PLAN.md] |
| Contribution after listed variable costs and base hosting | $5,400.00 - $148.00 - $292.80 - $96.00 [assumption: arithmetic] | $4,863.20 [assumption: arithmetic] |

The repo contains a prior break-even claim of 11 submissions [evidence: .planning/PROJECT.md], but that should be treated as stale until reconciled against the current implemented tier mix, payment fees, production vendor invoices, support time, and refund/chargeback data [assumption: current finance review].

## Go To Market

Launch channel should be narrow and evidence-seeking. The prior plan favors SEO and public campaign pages [evidence: .planning/GENESIS.md], but public campaign pages are not the first validation gate because no campaign content or index demand is proven [assumption: repo review].

Practical launch sequence:

- Recruit a manually sourced beta group around recurring local issues [assumption: no existing traffic evidence].
- Run the product for a small paid cohort and measure conversion to the $5.00, $15.00, and $25.00 tiers [evidence: apps/api/src/routes/payments.ts; assumption: validation design].
- Track official lookup coverage by jurisdiction before scaling acquisition [evidence: apps/api/src/lib/officials].
- Track delivery success, bounce rate, spam complaints, refund requests, and official replies before building content-flywheel features [evidence: apps/worker/src/agents/delivery.ts; assumption: launch sequencing].
- Only then test SEO pages, share links, and content archive growth [assumption: delayed-channel strategy].

The minimum go-to-market proof is not traffic. It is paid completion of the full workflow, low complaint rate, and enough official delivery reliability to avoid reputational damage [assumption: EIR judgment].

## Competition

The relevant competitive set is not just civic-tech apps; it includes every substitute for "contact government effectively."

| Competitor or substitute | Why it matters | CivicState differentiation to prove |
|---|---|---|
| Resistbot | Closest civic messaging substitute named in prior plan [evidence: MASTER_PLAN.md] | Research-backed citations and paid high-context drafting [assumption: differentiation not externally verified] |
| Change.org | Captures petition intent and sharing behavior [evidence: MASTER_PLAN.md] | Actual directed letters rather than petition hosting [assumption: differentiation not externally verified] |
| LegalZoom | Represents consumer willingness to pay for document help [evidence: MASTER_PLAN.md] | Civic-specific, lower-price constituent communication [assumption: differentiation not externally verified] |
| Quorum | Enterprise advocacy workflow named in prior planning [evidence: .planning/PROJECT.md] | Individual consumer workflow at $5.00 to $25.00 [evidence: apps/api/src/routes/payments.ts; assumption: competitor positioning not reverified] |
| VoterVoice | Organization-oriented advocacy substitute named in prior planning [evidence: .planning/PROJECT.md] | Individual, citation-backed letter generation [assumption: competitor positioning not reverified] |
| Manual outreach | Free and always available [assumption: obvious substitute] | Saves research, routing, drafting, and delivery effort [assumption: value proposition] |

## Risks And Anti-Plan

A skeptical partner should kill this unless validation proves otherwise.

- Demand may be imaginary: people say they want civic voice, but may not pay even $5.00 [evidence: apps/api/src/routes/payments.ts; assumption: demand risk].
- Official inboxes may ignore, filter, or resent AI-generated letters; deliverability can break the product even if users pay [assumption: operational risk from government email context].
- The citation promise is dangerous: a single fabricated or misleading legal citation can destroy trust and create legal-adjacent exposure [evidence: apps/worker/src/lib/legal/citation-verifier.ts; assumption: severity].
- The product may be politically sensitive even if nonpartisan; payment processors, email providers, and officials may classify it as contentious advocacy [assumption: platform risk].
- The review queue may make the "lean operator" model false if defamation, threats, unverifiable claims, or legal-demand language appear frequently [evidence: apps/api/src/lib/moderation.ts; assumption: volume risk].
- SEO may never compound because opt-in public campaign content may be thin, duplicative, or too sensitive to publish [assumption: GTM risk].
- The implemented app may still be integration-complete but production-unproven: tests can validate logic while real users, real officials, Stripe, Postmark, Clerk, external legal APIs, and DNS remain unproven [evidence: tests; assumption: launch risk].

## Assumption Ledger

| Assumption | Why it matters | Validation test |
|---|---|---|
| Users will pay at least $5.00 for a letter workflow [evidence: apps/api/src/routes/payments.ts; assumption: willingness-to-pay] | Without paid demand there is no business | Paid beta conversion target of 3% [assumption: prior planning threshold from .planning/PROJECT.md, not market-proven] |
| Official email delivery can sustain at least 85% inbox placement [assumption: prior planning threshold from .planning/PROJECT.md] | Poor delivery makes the promise false | Postmark seed tests plus real campaign delivery logs |
| Federal and state official lookup can cover at least 95% of beta cases [assumption: prior planning threshold from .planning/PROJECT.md] | Routing is core value | Compare API matches against manual lookup |
| Local official lookup can cover at least 60% of beta cases [assumption: prior planning threshold from .planning/PROJECT.md] | Local issues are likely high-frequency | Manual audit by ZIP and issue category |
| Direct job costs remain under $0.60 for full-spread [evidence: apps/worker/src/lib/treasury.ts] | Pricing depends on margin | Ledger actuals by tier |
| One operator can handle flagged content in under 30 minutes per day [assumption: .planning/PROJECT.md constraint, not validated] | Human review can erase margins | Time-in-queue and review-time tracking |

## Surprise Spikes

- Older planning says zero application code existed [evidence: .planning/existing-state.md], but the current worktree includes a substantial monorepo, routes, worker agents, Prisma schema, and tests [evidence: apps; evidence: packages/shared/prisma/schema.prisma; evidence: tests].
- The original master plan discusses a dynamic pricer and more agent roles [evidence: MASTER_PLAN.md], while current code uses hardcoded pricing tiers and a narrower worker set [evidence: apps/api/src/routes/payments.ts; evidence: apps/worker/src].
- The registry frames the project as a personal/research asset and not near-term investible [evidence: dispatch registry notes], which conflicts with any aggressive VC pitch posture [assumption: EIR interpretation].

## Roadmap Linkage

The near-term roadmap must serve validation, not feature expansion. The next buildable work should harden evidence collection around customer, market, revenue, deliverability, citation accuracy, and review burden. The matching roadmap section is in [ROADMAP.md](ROADMAP.md) [evidence: ROADMAP.md].

## Investment Posture

Recommendation: keep on watchlist [evidence: dispatch registry notes]. Do not pitch as a venture-scale business until the operator validates paid demand, deliverability, citation accuracy, official coverage, refund/chargeback behavior, and review workload [assumption: EIR investment threshold].
