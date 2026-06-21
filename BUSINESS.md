# Brooks History / CivicState - Business Plan

## Thesis

As of 2026-06-21 [evidence: dispatch current_date], this repo is a conditional refounding candidate: if the operator confirms that the built CivicState product is the intended asset, CivicState can sell citation-backed civic letter delivery to US residents for $5-$25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]; if not, Brooks History remains a personal/research asset and should not be pitched as a near-term investible BOS [evidence: dispatch registry note].

## Problem & Customer

The customer described by the existing soul is a US resident with a concrete civic concern who wants an official to act but does not know which official has jurisdiction, what law or policy applies, or how to write a credible message [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. The current substitute set is manual research, manual email to officials, free advocacy tools, petition platforms, or doing nothing [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Primary ICP: individual US residents with one issue, one ZIP code, and a willingness to pay a small one-time fee for research, drafting, routing, and delivery [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Secondary future customer: HOAs, nonprofits, and civic organizations are named as future API consumers, but they are out of scope until the individual pipeline proves usage and delivery reliability [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Customer definition gap: the dispatch registry says this is a watchlist personal/research asset, not a near-term investible BOS [evidence: dispatch registry note]. That makes operator confirmation the first commercial gate.

## Market

Workspace-only sizing method: no network research was available, so market claims below are assumption-labeled. The bottom-up model starts with paid jobs, not broad civic-tech spend.

| Layer | Method | Annual Revenue Pool |
| --- | --- | --- |
| TAM | 10,000,000 paid civic-letter jobs/year at $15 average order value [assumption: order-of-magnitude model based on a large US resident base and low annual incident frequency; no external source in workspace] | $150,000,000/year [assumption: 10,000,000 x $15] |
| SAM | 250,000 reachable organic/referral jobs/year at $15 average order value [assumption: small reachable share of TAM before paid acquisition] | $3,750,000/year [assumption: 250,000 x $15] |
| SOM | 4,800 jobs/year at $18 average order value [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) month 12 model uses 400 submissions/month and $18] | $86,400/year [evidence: 400/month x 12 months x $18 in [MASTER_PLAN.md](MASTER_PLAN.md)] |

Prior model benchmarks: month 3 revenue is $750 from 50 submissions at $15 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]; month 6 revenue is $1,920 from 120 submissions at $16 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]; month 24 revenue is $24,000/month from 1,200 submissions at $20 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Market posture: the model is commercially interesting only if paid conversion, official-contact coverage, and deliverability are validated. The prior soul sets willingness-to-pay at >=3%, .gov inbox placement at >=85%, and official coverage at >=95% federal/state plus >=60% local as gates [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Product & Moat

Real today: the repository contains a CivicState monorepo with Next.js web, Express API, BullMQ worker agents, Prisma models, payments, webhooks, admin, compliance, officials lookup, and legal citation modules [evidence: [apps/api/src/index.ts](apps/api/src/index.ts); [apps/worker/src/index.ts](apps/worker/src/index.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. The landing page promises "AI-powered research. Verified citations. One-click delivery. $5 - $25" [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx)].

Not proven today: live demand, live payment volume, production deliverability, local officials data quality, legal/compliance adequacy, and whether the repo identity `brooks-history` is actually meant to be CivicState [evidence: [.planning/existing-state.md](.planning/existing-state.md); dispatch registry note].

Moat hypothesis: at volume, the officials directory, citation verification library, delivery/bounce history, and opt-in public campaign archive could compound into a data advantage [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. That moat does not exist at launch volume [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

## Platform Posture

WrkPlug client posture: this venture should be treated as a client of the shared WrkPlug chassis, not as an owner of its own auth, billing, identity, or login rails [assumption: WrkPlug Phase 0 not yet signed]. The plan consequence is lower duplicated infrastructure work and lower CAC through shared wrk.vc/wrk.dog rails [assumption: chassis economics not validated for this repo].

Current code divergence: the built app currently includes Clerk, Stripe, Postmark, and its own auth/payment/compliance surfaces [evidence: [package.json](package.json); [apps/api/src/index.ts](apps/api/src/index.ts)]. If WrkPlug becomes authoritative, those surfaces should be evaluated as integration clients, not as permanent standalone platform boundaries [assumption: operator has not issued a repo-specific WrkPlug ruling].

## Business Model

Revenue model: one-time letter packages at $5, $15, and $25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Future API access and organization use are deferred [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Unit economics from the prior model:

| Package | Price | Modeled Cost | Modeled Gross Profit | Modeled Margin |
| --- | --- | --- | --- | --- |
| Amplify | $15 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | $1.20 total COGS [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | $13.80 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | 92% [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |
| Complex | $25 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | $1.94 total COGS [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | $23.06 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | 92% [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |

Operating constraints: the plan requires a 40% net margin floor [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], a $1,500 Mercury reserve before launch [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and chargebacks below 0.5% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

CAC and LTV are unproven. The launch GTM assumes SEO and social sharing rather than paid acquisition [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. For planning only, base LTV equals one $15 order [assumption: no repeat-rate evidence in workspace].

## Competition

| Competitor or Substitute | Positioning |
| --- | --- |
| Resistbot | Closest civic-letter substitute; prior soul says it lacks the research/citation layer [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. |
| Change.org | Petition hosting substitute; CivicState would compete by sending researched letters rather than collecting signatures [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. |
| Quorum | Enterprise advocacy/legislative affairs incumbent; prior soul frames this as org-priced rather than individual-priced [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. |
| VoterVoice | Enterprise advocacy incumbent; same individual-access gap as Quorum [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. |
| LegalZoom | General document drafting substitute; prior soul positions CivicState as civic-specific and cheaper [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. |
| Manual direct outreach | Free substitute; CivicState must prove convenience and credibility justify $5-$25 [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. |

## Go-To-Market

Initial channel: organic search around long-tail civic problems and opt-in public campaign pages [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Secondary channel: social sharing from public campaign pages [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

First 100 paid customers [assumption: GTM target created for this EIR pass] should come from operator-network beta, city/issue-specific landing pages, and direct civic-community outreach. The test is not traffic; the test is paid preview-to-checkout conversion, official contact coverage, and successful delivery.

Launch gates by 2026-09-30 [assumption: EIR milestone date]: >=3% preview-to-paid conversion [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], >=85% .gov inbox placement [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and >=60% local official coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Financial Model

This is a planning model, not an investment forecast. Revenue reconciles as paid submissions x average order value.

| Period | Revenue Build | Revenue | Direct Costs | Fixed/Operating Costs | Gross Profit Before Fixed Costs | Headcount |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-H2 [assumption: EIR planning period] | 300 submissions x $15 AOV [assumption: six launch months at the prior month 3 run-rate] | $4,500 [assumption: 300 x $15] | $540 [assumption: 12% of revenue from prior variable-cost model] | $1,200 [assumption: $200/month fixed cost from prior break-even model x 6 months] | $3,960 [assumption: $4,500 - $540] | 0.25 FTE [assumption: one part-time operator] |
| 2027 [assumption: EIR planning period] | 4,800 submissions x $18 AOV [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) month 12 model annualized] | $86,400 [evidence: 400/month x 12 months x $18 in [MASTER_PLAN.md](MASTER_PLAN.md)] | $10,368 [assumption: 12% of revenue] | $12,000 [assumption: ops/tooling/support step-up] | $76,032 [assumption: $86,400 - $10,368] | 1.0 FTE [assumption: operator plus fractional support] |
| 2028 [assumption: EIR planning period] | 14,400 submissions x $20 AOV [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) month 24 model annualized] | $288,000 [evidence: 1,200/month x 12 months x $20 in [MASTER_PLAN.md](MASTER_PLAN.md)] | $34,560 [assumption: 12% of revenue] | $72,000 [assumption: support, compliance review, data-provider, and hosting expansion] | $253,440 [assumption: $288,000 - $34,560] | 2.0 FTE [assumption: operator plus support/compliance coverage] |

Revenue assumptions:

- Average order value starts at $15 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] and reaches $20 by month 24 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Paid submissions reach 400/month by month 12 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] only if SEO or referral distribution works.
- No subscription or organization API revenue is included before operator validation [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Cost assumptions:

- Variable costs remain 12% of revenue [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) break-even model].
- Fixed costs start near $200/month [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] but increase with deliverability, support, and data-provider needs [assumption: EIR downside adjustment].
- Human review grows with flagged content and legal/compliance sensitivity [assumption: moderation burden not validated].

Sensitivity tests:

- Downside conversion: if conversion is 1% instead of >=3% [assumption: downside against prior validation gate], 2027 revenue falls below the $86,400 base [assumption: proportional conversion sensitivity].
- Deliverability failure: if .gov inbox placement is below 85% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], delivery value weakens and refunds/chargebacks may erase the 92% margin [assumption: no refund dataset].
- Local data failure: if local official coverage is below 60% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], the product loses the neighborhood-use cases most likely to drive SEO [assumption: GTM depends on local specificity].

## Risks & Anti-Plan

Hole: this may be the wrong business identity. The dispatch says Brooks History is watchlist and personal/research, while the repo contains CivicState [evidence: dispatch registry note; [package.json](package.json)]. Mitigation: operator must confirm whether CivicState is the intended refounding. Residual risk: any pitch is misleading until that confirmation exists.

Hole: users may not pay for civic outreach. The plan assumes $5-$25 willingness-to-pay [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], but no workspace evidence shows transactions. Mitigation: launch a paid beta with hard conversion gates. Residual risk: the product becomes a useful free tool with no durable revenue.

Hole: email deliverability to government inboxes may kill the value proposition. The prior soul already calls deliverability the hardest problem and requires domain warming [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Mitigation: do not scale before .gov inbox placement and bounce monitoring are proven. Residual risk: officials filter or ignore platform-generated mail.

Hole: citation and legal-adjacent risk is existential. The product promises verified legal citations and "not legal advice" boundaries [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Mitigation: strip unverifiable citations, flag risky claims, and keep human review for edge cases. Residual risk: a bad letter creates reputational or legal exposure.

Hole: the moat is hypothetical. Officials data, citations, and SEO pages compound only after volume [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Mitigation: measure reusable citation hits and official-contact quality. Residual risk: incumbents copy the workflow before CivicState has data advantage.

## Assumption Ledger

| Claim | Basis | Evidence or Assumption | Test |
| --- | --- | --- | --- |
| Operator wants this repo pitched as CivicState | Code and planning artifacts are CivicState | Mixed: CivicState evidence in repo; registry says watchlist research asset [evidence: [package.json](package.json); dispatch registry note] | Operator ruling by 2026-07-15 [assumption: EIR date] |
| Individuals will pay $5-$25 | Existing plan and pricing UI | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] for price; demand remains [assumption: no transaction data] | >=3% preview-to-paid conversion [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Email-only delivery is enough | Existing launch scope | [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] | >=85% .gov inbox placement [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Citation verification can be reliable | Code contains citation verifier modules | [evidence: [apps/worker/src/lib/legal/citation-verifier.ts](apps/worker/src/lib/legal/citation-verifier.ts)] but production reliability is [assumption: no live audit data] | Audit 50 generated citations [assumption: EIR test size] |
| SEO can supply acquisition | Existing distribution hypothesis | [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] but traffic impact is [assumption: no live domain data] | Track indexed pages, impressions, and paid conversions by 2026-09-30 [assumption: EIR date] |
| WrkPlug lowers platform cost | Shared chassis concept | [assumption: WrkPlug Phase 0 not yet signed] | Compare standalone Clerk/Stripe/Postmark cost vs client integration after operator ruling |

## Self-Valuation

Current score: 2/10 [assumption: EIR qualitative score]. Reason: there is real product code, but business identity, demand, delivery, and operator intent are unvalidated.

Method: apply a probability-weighted fraction of the wrk.vc $5,000,000 per-business program assumption [assumption: dispatch brief references program assumption; no external valuation source]. Comparables used for positioning, not valuation multiples: Resistbot, Change.org, Quorum, and VoterVoice [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)].

12-month bands [assumption: EIR valuation window]:

- BASE: $250,000 notional value [assumption: 5% of $5,000,000 program assumption for a coded but unvalidated asset].
- BULL: $1,000,000 notional value [assumption: 20% of $5,000,000 if paid conversion, deliverability, and operator identity gates clear].
- BEAR: $0 investible value [assumption: registry watchlist remains personal/research or paid demand fails].

What moves valuation: operator confirmation, paid conversion above >=3% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], .gov inbox placement above >=85% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and repeatable official coverage above the prior gates [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Milestones

- 2026-07-15 [assumption: EIR operating milestone]: operator confirms whether Brooks History is CivicState, a research asset, or a repo mismatch.
- 2026-08-15 [assumption: EIR operating milestone]: run a private beta with real checkout disabled or capped until compliance and deliverability review is complete.
- 2026-09-30 [assumption: EIR operating milestone]: prove or kill the core gates: >=3% paid conversion, >=85% .gov inbox placement, and >=60% local official coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- 2026-12-31 [assumption: EIR operating milestone]: decide whether to keep CivicState as a standalone venture, fold it into WrkPlug rails, or archive it as research.

## Surprise Spikes

- Registry identity conflicts with repo reality: the dispatch says `brooks-history` and watchlist personal/research asset, while the code and planning artifacts are CivicState [evidence: dispatch registry note; [package.json](package.json)].
- The existing planning artifacts claim completed phases, but `.planning/existing-state.md` still says zero application code existed at an earlier audit snapshot [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md); [.planning/existing-state.md](.planning/existing-state.md)]. The soul should treat current source code as more current than that stale audit.
- The prior plan once referenced Google Civic API, while later planning notes say the Representatives endpoint shut down in April 2025 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)]. Officials-data strategy must be revalidated before launch.
