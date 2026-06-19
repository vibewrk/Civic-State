# CivicState - Business Plan

## Thesis
CivicState can become a profitable civic-action utility if ordinary U.S. residents will pay for a citation-backed constituent letter that is researched, routed, and delivered for $5-$25 [evidence: .planning/PROJECT.md; evidence: apps/api/src/routes/payments.ts], and if the platform proves .gov deliverability, citation accuracy, and low human-review burden before being pitched as a venture-scale business [assumption: registry note says "Watchlist" and "personal/research asset, not near-term investible BOS"].

As of 2026-06-19 [assumption: worker current date], this is a conditional business plan, not an investible claim. The repository implements a CivicState civic-letter platform, while the dispatch project id says brooks-history / brookss-history [evidence: worker dispatch; evidence: package.json]. That mismatch must be resolved before external fundraising or wrk.vc presentation.

## Problem & Customer
The customer is a U.S. resident with a specific civic concern, a desired public-sector outcome, and enough willingness to pay to avoid researching law, finding officials, drafting a formal letter, and tracking delivery manually [evidence: .planning/PROJECT.md; evidence: .planning/GENESIS.md].

Primary segment: individual constituents using a mobile or desktop web form to send a formal letter to elected officials or agencies [evidence: apps/web/components/wizard/issue-form.tsx; evidence: packages/shared/prisma/schema.prisma]. Early use cases include policy concerns, enforcement failures, budget requests, government services, and legislative demands [evidence: apps/worker/src/agents/classifier.ts].

Customer pain is real but unvalidated in this repo: the planning docs assume people abandon civic outreach because the research, routing, and formal writing work is too time-consuming [evidence: .planning/GENESIS.md; assumption: no paid user interviews or usage data are present]. The first commercial proof is not traffic; it is completed paid submissions from non-affiliated users.

Current alternatives include manual emails or calls to officials, Resistbot, Change.org, iPetitions, Quorum / VoterVoice-style advocacy systems, agency web portals, and law-firm or legal-document services [assumption: competitive set based on category knowledge without network research]. CivicState competes as a transactional, individual-first tool rather than a petition network or enterprise advocacy suite [evidence: MASTER_PLAN.md].

## Market
Market sizing is bottom-up because no network research was available. All external market quantities below are assumptions, not evidence.

| Layer | Method | Annual volume | Implied revenue |
| --- | --- | ---: | ---: |
| TAM | $15 average order value multiplied by 10,000,000 U.S. civic-contact jobs per year | 10,000,000 jobs [assumption: unverified U.S. civic-intent volume] | $150,000,000 [assumption: 10,000,000 x $15] |
| SAM | $15 average order value multiplied by 1,000,000 digitally reachable, letter-suitable jobs per year | 1,000,000 jobs [assumption: reachable SEO/social subset] | $15,000,000 [assumption: 1,000,000 x $15] |
| SOM | $15 average order value multiplied by 24,000 paid submissions per year in a focused scale case | 24,000 submissions [assumption: year-three operating target] | $360,000 [assumption: 24,000 x $15] |

The market is attractive only if acquisition is mostly organic. The prior plan depends on SEO from opt-in public campaign pages [evidence: .planning/GENESIS.md], but public campaign publishing is deferred or not clearly implemented in current source [evidence: .planning/PROJECT.md; evidence: find apps output]. If publishing remains deferred, the SEO wedge is a thesis rather than a channel.

## Product & Moat
What is real today:

- A monorepo with Next.js web, Express API, BullMQ worker, PostgreSQL / Prisma schema, Redis queue assumptions, Clerk auth, Stripe checkout, Postmark delivery, HMAC audit logs, and moderation scaffolding [evidence: package.json; evidence: apps/api/package.json; evidence: packages/shared/prisma/schema.prisma].
- A submission API with content moderation, audit logging, job creation, and classifier queue enqueueing [evidence: apps/api/src/routes/submissions.ts].
- Official lookup orchestration across federal, state, and local providers, with caching and opt-out filtering [evidence: apps/api/src/routes/officials.ts; evidence: apps/api/src/lib/officials/lookup.ts].
- Researcher, drafter, delivery, and treasury worker agents wired around BullMQ and Postmark / Anthropic assumptions [evidence: apps/worker/src/agents/researcher.ts; evidence: apps/worker/src/agents/drafter.ts; evidence: apps/worker/src/agents/delivery.ts; evidence: apps/worker/src/agents/treasury.ts].
- Payment tiers of $5, $15, and $25 in API code [evidence: apps/api/src/routes/payments.ts].

What remains aspirational or unproven:

- Real production data sources, real official email coverage, real citation quality, live .gov deliverability, payment conversion, official response rate, and public campaign SEO [assumption: no production metrics or user data are present].
- The prior roadmap marks all phases complete, while .planning/REQUIREMENTS.md still leaves most customer-facing requirements unchecked [evidence: .planning/ROADMAP.md; evidence: .planning/REQUIREMENTS.md].

The moat, if it emerges, is not the code. It is a growing verified officials directory, bounce / response history, reusable verified citation library, and an opt-in archive of civic campaign pages [evidence: .planning/GENESIS.md; assumption: compounding effect requires paid volume]. At fewer than 1,000 submissions per month [assumption: minimum useful data density], this moat is weak.

## Platform Posture
WrkPlug posture: CivicState should be treated as a client of the shared WrkPlug chassis, not as a standalone platform that permanently owns auth, billing, identity, or login [assumption: D-032 / WrkPlug Phase 0 not signed in this repo]. Under that posture, the single login would be the MCPWrk account, EAI Layer-0 would sit behind the contract, and shared rails would reduce infrastructure burden and CAC [assumption: WrkPlug architecture benefit not validated here].

Current source conflicts with that posture by using Clerk for identity and Stripe for payment directly [evidence: apps/api/package.json; evidence: apps/web/package.json; evidence: apps/api/src/routes/payments.ts]. That is acceptable for prototype validation, but the operator must decide whether CivicState is a standalone app or a WrkPlug-client business before scaling.

## Business Model
CivicState is currently a transactional revenue model:

- Single official: $5 [evidence: apps/api/src/routes/payments.ts].
- Three officials: $15 [evidence: apps/api/src/routes/payments.ts].
- Full spread: $25 [evidence: apps/api/src/routes/payments.ts].

Base-case average order value is modeled at $15 [assumption: tier mix centered on the three-official package]. Variable cost is modeled at $1.50 per paid submission [assumption: $0.35 AI usage from .planning/GENESIS.md plus $0.50 payment processing plus $0.15 email/delivery overhead plus $0.50 support/moderation allocation]. That yields $13.50 contribution per order and 90% gross margin [assumption: ($15 - $1.50) / $15].

Revenue expansion options are deliberately deferred: priority human review, certified mail, organization API access, subscriptions, coalition pages, and public campaign discovery [evidence: .planning/PROJECT.md; evidence: .planning/REQUIREMENTS.md]. The business should not add them until the first paid end-to-end loop works.

## Competition
Named competitors and substitutes:

| Alternative | Buyer / user | CivicState position |
| --- | --- | --- |
| Resistbot | Individual constituents | CivicState claims deeper research and citation-backed letters [assumption: competitor capabilities unverified without network] |
| Change.org | Petition creators and signers | CivicState is delivery-first, not signature-count-first [assumption: category positioning] |
| iPetitions | Petition creators | CivicState focuses on routed constituent letters [assumption: category positioning] |
| Quorum / VoterVoice / FiscalNote-style tools | Organizations and advocacy teams | CivicState starts with individuals at $5-$25 [evidence: apps/api/src/routes/payments.ts; assumption: enterprise products target organizations] |
| Manual emails, calls, and agency portals | Anyone with time and knowledge | CivicState sells research, routing, drafting, and tracking convenience [evidence: .planning/GENESIS.md] |
| LegalZoom / law firms | Consumers seeking legal documents or counsel | CivicState must stay outside legal advice and filings [evidence: MASTER_PLAN.md; evidence: apps/worker/src/agents/drafter.ts] |

The strongest skeptic view is that competitors do not need to clone the full product. A user can ask a general AI tool to draft a letter, then copy it into a government contact form for $0 [assumption: category behavior]. CivicState must prove that verified citations, official targeting, and delivery tracking are worth payment.

## Go-To-Market
The first go-to-market motion should be validation-led, not launch-led.

1. Recruit the first 25 paid submissions from operator networks, local civic groups, neighborhood forums, and direct outreach [assumption: founder-led validation plan].
2. Measure conversion from preview to payment, starting with a target of 3% or higher [assumption: .planning/PROJECT.md validation gate].
3. Track deliverability with a target of 85% or higher inbox placement / accepted delivery to government domains [assumption: .planning/PROJECT.md validation gate; no production telemetry].
4. Track official coverage with targets of 95% or higher for federal/state and 60% or higher for local [assumption: .planning/PROJECT.md validation gate; no production telemetry].
5. Only after the paid loop works, turn on opt-in public campaign pages for SEO and social sharing [evidence: .planning/GENESIS.md; assumption: SEO requires indexed public pages].

Channels to avoid until validation: paid ads, influencer marketing, broad PR, app stores, and enterprise partnerships [assumption: these channels add cost or complexity before retention and willingness-to-pay are known].

## Financial Model
All financials are planning assumptions unless tagged as repository evidence. The model reconciles revenue as paid submissions multiplied by $15 average order value [assumption: tier-mix AOV].

| Year | Paid submissions | Revenue build | Revenue | Variable cost | Fixed cash cost | Headcount cash | Cash contribution |
| --- | ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 2026 validation | 1,200 [assumption: 100/month after launch] | 1,200 x $15 [assumption: modeled scenario] | $18,000 [assumption: modeled scenario] | $1,800 [assumption: 1,200 x $1.50] | $7,500 [assumption: infra/tools/admin] | $0 [assumption: founder-operated] | $8,700 [assumption: modeled scenario] |
| 2027 operating | 6,000 [assumption: 500/month] | 6,000 x $15 [assumption: modeled scenario] | $90,000 [assumption: modeled scenario] | $9,000 [assumption: 6,000 x $1.50] | $38,000 [assumption: infra/tools/legal/review] | $40,000 [assumption: 0.5 FTE ops] | $3,000 [assumption: modeled scenario] |
| 2028 scale | 24,000 [assumption: 2,000/month] | 24,000 x $15 [assumption: modeled scenario] | $360,000 [assumption: modeled scenario] | $36,000 [assumption: 24,000 x $1.50] | $110,000 [assumption: infra/tools/legal/support] | $150,000 [assumption: 1.5 FTE ops/support] | $64,000 [assumption: modeled scenario] |

Revenue assumptions:

- Average order value is $15 [assumption: package mix; pricing tiers are evidence in apps/api/src/routes/payments.ts].
- Year-2026 validation starts after operator approval and reaches 100 paid submissions per month [assumption: launch ramp].
- Public SEO pages, if shipped, can lower blended CAC below $5 per paid submission by 2028 [assumption: SEO flywheel, unproven].

Cost assumptions:

- Direct variable cost is $1.50 per paid submission [assumption: AI, payment, delivery, and support allocation].
- Base infrastructure and tooling cost is $625 per month in 2026 [assumption: includes hosting, monitoring, email, legal templates, and data providers; MASTER_PLAN.md cites $96/month droplet as one component].
- Human review grows from founder-operated at $0 cash in 2026 to $150,000 payroll in 2028 [assumption: support and compliance load].

Sensitivity tests:

- Bear case: 1% preview-to-payment conversion [assumption: modeled scenario] and $15 AOV [assumption: modeled scenario] likely fails because the SEO/content loop cannot compound fast enough.
- Margin compression: variable cost rises to $3.00 per submission [assumption: modeled scenario], reducing gross margin from 90% to 80% [assumption: ($15 - $3) / $15].
- Deliverability failure: .gov accepted delivery below 70% [assumption: modeled scenario] should pause growth, because the core customer promise is delivery, not drafting.
- Review overload: more than 20% of submissions require human review [assumption: modeled scenario] breaks the one-operator model and may force higher pricing.

## Risks & Anti-Plan
The anti-plan: do not fund this as a venture-scale BOS today. Treat it as a research asset until the operator proves paid demand, deliverability, and legal-adjacent safety with real users [assumption: registry note says not near-term investible].

Hard holes:

- Willingness to pay may be weak. Users may accept a free AI-drafted letter and send it manually, making $5-$25 too expensive [assumption: substitute risk].
- Email deliverability to government domains may fail. If officials' systems filter, bounce, or suppress generated constituent email, the product breaks at the last mile [evidence: .planning/PROJECT.md identifies deliverability as hardest problem].
- Citation verification may be brittle. The code verifies eCFR and CourtListener-style citations, but live data quality and state-law coverage are not proven [evidence: apps/worker/src/lib/legal/citation-verifier.ts; evidence: apps/worker/src/lib/legal/state-cache.ts].
- Legal-adjacent positioning is risky. The app must not drift into legal advice, claim filing, harassment, lobbying compliance problems, or defamation amplification [evidence: MASTER_PLAN.md; evidence: apps/api/src/lib/moderation.ts].
- Official coverage may be incomplete, especially local. The plan itself flags local provider evaluation as a blocker [evidence: .planning/PROJECT.md; evidence: .planning/STATE.md].
- The project identity is inconsistent. The registry says brooks-history / brookss-history while the repository is CivicState [evidence: worker dispatch; evidence: package.json].

Mitigations are narrow: keep email-only launch, cap target officials, require AI disclosure and "not legal advice" language, enforce moderation, keep an admin review queue, publish no campaign page without opt-in, and stop growth if deliverability or citation verification misses thresholds [evidence: apps/worker/src/agents/drafter.ts; evidence: apps/api/src/lib/moderation.ts; assumption: operational policy].

Residual risk remains high until production telemetry exists.

## Assumption Ledger
| Claim | Basis | Evidence or assumption | Test |
| --- | --- | --- | --- |
| People will pay $5-$25 for civic letters | Pricing exists in source and plan | [evidence: apps/api/src/routes/payments.ts; assumption: willingness-to-pay unvalidated] | Collect 25 paid non-affiliated submissions by 2026-09-30 [assumption: modeled scenario] |
| $15 AOV is plausible | Package mix around three-official tier | [assumption: no payment data] | Report actual AOV after first 100 paid submissions [assumption: modeled scenario] |
| 90% gross margin is achievable | Modeled $1.50 variable cost on $15 AOV | [assumption: no production cost ledger] | Compare actual Stripe, AI, email, and review cost after first 100 jobs [assumption: modeled scenario] |
| SEO can become the main CAC wedge | Opt-in campaign archive in prior plan | [evidence: .planning/GENESIS.md; assumption: public pages not proven] | Ship 25 indexed public pages and measure impressions by 2026-12-31 [assumption: modeled scenario] |
| One operator can manage review | Prior plan assumes exception workflow | [evidence: .planning/GENESIS.md; assumption: queue load unknown] | Track review rate and minutes per flagged submission for 30 days [assumption: modeled scenario] |
| Officials coverage can reach federal/state/local needs | Hybrid provider plan exists | [evidence: apps/api/src/lib/officials/lookup.ts; assumption: provider accuracy unknown] | Run ZIP coverage audit across 100 ZIP codes [assumption: modeled scenario] |
| Legal-adjacent disclaimers are sufficient | Code adds AI disclosure and not-legal-advice text | [evidence: apps/worker/src/agents/drafter.ts; assumption: no legal review] | Operator obtains counsel review before public paid launch [assumption: modeled scenario] |

## Self-Valuation
Current self-valuation score: 2.0 / 10.0 [assumption: EIR judgment based on no production revenue, no customer proof, and registry watchlist note]. This is not a $5,000,000 business today [assumption: wrk.vc program frame]. It is a built prototype with a plausible wedge and material civic/legal/deliverability risk.

12-month valuation bands [assumption: valuation horizon] under the $5,000,000-per-business program assumption [assumption: wrk.vc program frame]:

- Bear: $0-$100,000 [assumption: no paid traction or deliverability failure].
- Base: $250,000-$750,000 [assumption: 100-500 paid submissions/month with stable delivery and low review load].
- Bull: $1,500,000-$3,000,000 [assumption: 2,000+ paid submissions/month, 85%+ deliverability, repeatable SEO acquisition, and defensible official/citation data].

Comparable logic is category-based, not transaction-based: Resistbot for constituent messaging, Change.org for civic petition intent, Quorum / VoterVoice for advocacy workflows, and LegalZoom for paid document automation [assumption: no valuation comps researched due workspace-only mode]. What moves valuation: paid conversion, deliverability, retention / repeat use, organic acquisition, review cost, and verified official data quality.

## Milestones
| Date | Milestone | Pass condition |
| --- | --- | --- |
| 2026-07-15 [assumption: modeled scenario] | Identity and positioning ruling | Operator resolves brooks-history vs CivicState and standalone vs WrkPlug-client posture |
| 2026-08-15 [assumption: modeled scenario] | Coverage audit | 100 ZIP code audit completed with federal/state/local coverage report |
| 2026-09-30 [assumption: modeled scenario] | Paid beta | 25 paid non-affiliated submissions completed end-to-end |
| 2026-10-31 [assumption: modeled scenario] | Deliverability gate | 85%+ accepted delivery or inbox placement on government recipients |
| 2026-12-31 [assumption: modeled scenario] | SEO validation | 25 opt-in public pages indexed and producing measurable search impressions |
| 2027-03-31 [assumption: modeled scenario] | Investibility review | At least 500 paid submissions/month or project remains research/watchlist |

## Surprise Spikes
- Project identity conflict: dispatch says brooks-history / brookss-history, but every substantive artifact implements CivicState [evidence: worker dispatch; evidence: package.json; evidence: .planning/PROJECT.md].
- Roadmap freshness conflict: .planning/ROADMAP.md says all phases complete on 2026-04-25, while .planning/STATE.md says only Phase 1 is complete and .planning/REQUIREMENTS.md leaves most product requirements unchecked [evidence: .planning/ROADMAP.md; evidence: .planning/STATE.md; evidence: .planning/REQUIREMENTS.md].
- Platform posture conflict: the new WrkPlug-client posture suggests shared auth/billing/identity, while source code uses Clerk and Stripe directly [evidence: apps/api/package.json; evidence: apps/web/package.json].
- Registry sensitivity: this should not be pitched as near-term investible until an operator confirms it is meant to be a business, not only a personal/research asset [assumption: registry note from dispatch].
