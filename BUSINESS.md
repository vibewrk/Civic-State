# CivicState (dispatched as brooks-history) -- Business Plan

## Thesis
CivicState will earn paid civic-action demand if ordinary US residents can turn a specific local or state concern into a cited, official-targeted constituent letter at a low one-time price, but it is not investible until demand, deliverability, and legal-risk controls are proven. As of 2026-06-20 [evidence: worker dispatch current_date], this is a watchlist/personal-research asset, not a near-term venture-scale BOS pitch [evidence: registry note in dispatch].

## Problem & Customer
The initial customer is a US resident with a concrete civic frustration who will not manually research jurisdiction, applicable law, official contacts, letter format, and delivery tracking. The repo's product definition says CivicState turns civic concerns into citation-backed letters delivered to government officials for $5-$25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The current code and package metadata also identify the product as CivicState, not Brooks History [evidence: [package.json](package.json); [apps/web/app/page.tsx](apps/web/app/page.tsx)].

Primary segment: civic-but-time-constrained residents with issues such as local enforcement, zoning, roads, school policy, or agency inaction [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Secondary future segment: HOAs, nonprofits, and civic organizations, explicitly deferred until the citizen pipeline is stable [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Current alternatives are manual constituent email, Resistbot, Change.org, LegalZoom-style document tools, enterprise advocacy suites such as Quorum and VoterVoice, or doing nothing [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. The painful job is not "write prettier text"; it is compressing research, routing, citation verification, delivery, and status tracking into a single guided flow [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Market
TAM method: bottom-up, not category hand-waving. If 258,000,000 US adults [assumption: model-memory estimate of current adult population, not externally verified in workspace-only mode] each bought 1.0 civic letter package per year [assumption: usage ceiling, not observed demand] at $16 average revenue per paid submission [assumption: weighted average across the repo's $5, $15, and $25 tiers], annual theoretical TAM is $4,128,000,000 [assumption: 258,000,000 x 1.0 x $16].

SAM method: restrict to a reachable online civic-action audience. If 1.0% of the TAM population has an issue and reachable search/social intent in a year [assumption: conservative activation filter, no workspace evidence], SAM is 2,580,000 buyers [assumption: 258,000,000 x 1.0%] and $41,280,000 annual revenue potential [assumption: 2,580,000 x $16].

SOM method: use a buildable launch path, not a funding fantasy. The year-three operating target in this plan is 9,600 paid submissions [assumption: 800 submissions/month run-rate by the end of the scale year, not validated], producing $153,600 revenue [assumption: 9,600 x $16]. This is intentionally small relative to SAM because the repo has no validated paid demand, no live production traffic, and no external evidence in this workspace [evidence: [.planning/existing-state.md](.planning/existing-state.md)].

## Product & Moat
Real today: a monorepo with Next.js frontend, Express API, worker agents, Prisma models for users/submissions/campaigns/letters/officials/payments/deliveries/ledger/audit/jobs, moderation tests, payment routes, delivery routes, compliance pages, and admin surfaces [evidence: [apps/api/src/index.ts](apps/api/src/index.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma); [apps/web/app/page.tsx](apps/web/app/page.tsx); [tests/api-routes.test.ts](tests/api-routes.test.ts)].

Roadmap/product promise: a guided issue wizard, official lookup, legal research against eCFR/CourtListener/state cache, citation verification, per-official letter drafting, Stripe payment, Postmark delivery, dashboard tracking, and admin review [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]. The strongest potential moat is not the generated letter; it is a verified officials directory, reusable citation library, delivery/bounce history, and opt-in public campaign archive [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

The moat is unproven at launch. The existing Genesis doc says it does not exist at 50 submissions/month [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] and becomes more credible only around 1,000+ submissions/month [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. That makes the near-term company a validation machine, not a defensible platform.

## Platform Posture
The mandated WrkPlug posture is draft/operator-gated: CivicState should be treated as a future client of shared auth, billing, identity, and login rails only if WrkPlug Phase 0 is approved [assumption: WrkPlug Phase 0 not yet signed]. The current repo does not follow that posture; it implements Clerk auth, Stripe Checkout, Postmark delivery, and its own compliance/data model directly [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/api/src/index.ts](apps/api/src/index.ts)].

Cost/moat consequence if WrkPlug adoption happens: shared rails could reduce duplicated auth/billing/compliance work and let CivicState focus on civic workflow differentiation [assumption: architecture benefit inferred from shared-rails strategy, not validated here]. Until operator approval, do not hard-wire this change because it conflicts with current code and requirements [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

## Business Model
Launch revenue is transactional: $5 single-official, $15 three-official, and $25 all-official letter packages [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The plan preserves the repo's 40% net margin floor after Stripe fees [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. It rejects subscriptions in the active plan [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Unit model at $16 ARPU [assumption: weighted tier mix, not observed], $2.00 variable cost per paid submission [assumption: AI, email, queue, and support allocation; repo mentions roughly $0.20 AI cost but no production data], and 87.5% gross margin before fixed costs [assumption: ($16 - $2) / $16]. Fixed launch costs include a $96/month DigitalOcean droplet [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], a $1,500 Mercury reserve [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and possible local-official data provider cost of $100-$500/month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Revenue will not be treated as real until a user pays and a letter is delivered end-to-end. The first commercial validation gate is paid conversion of at least 3.0% from preview to checkout [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The second gate is deliverability of at least 85.0% inbox placement to government domains [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The third gate is chargebacks below 0.5% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Competition
Resistbot is the closest civic-action substitute, but the repo positions CivicState around research-backed and cited letters rather than SMS-first outreach [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. Change.org competes for petition-style civic expression, but it does not necessarily solve official-specific delivery for each user [assumption: external product knowledge, not verified in workspace-only mode]. Quorum and VoterVoice represent enterprise advocacy software, but the repo explicitly targets individuals at a much lower price point [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. LegalZoom and manual constituent email are broader substitutes because they solve document preparation or direct contact without the civic research/delivery workflow [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Positioning: CivicState should not claim "no competition." The honest wedge is individual, low-price, citation-backed, delivered constituent communication. That wedge is narrow enough to test and risky enough to kill quickly if users will not pay.

## Go-To-Market
Primary channel: organic search from problem-specific civic queries and opt-in public campaign pages [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Secondary channel: social sharing from public campaign pages [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Paid acquisition is excluded until organic demand is measurable [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

First cohort plan: recruit 25 beta users [assumption: small manually sourced cohort size, no workspace evidence] across 5 issue categories [assumption: enough variety to test official lookup and citation coverage], require payment after preview, and manually inspect every flagged legal/deliverability edge before expanding. The goal is not scale; it is to learn whether the full loop creates paid trust.

## Financial Model
All figures are planning assumptions unless marked as repo evidence. The revenue line reconciles to paid submissions multiplied by $16 ARPU [assumption: tier mix].

| Period | Paid submissions | Revenue build | Revenue | Variable cost | Fixed cost | Operating result |
|---|---:|---|---:|---:|---:|---:|
| Pilot year | 600 [assumption: beta-to-launch volume] | 600 x $16 [assumption: ARPU] | $9,600 [assumption: 600 x $16] | $1,200 [assumption: 600 x $2.00] | $7,152 [assumption: $96/month droplet plus $500/month tools/support reserve] | $1,248 [assumption: revenue minus listed costs] |
| Proof year | 2,400 [assumption: repeatable SEO/social wedge] | 2,400 x $16 [assumption: ARPU] | $38,400 [assumption: 2,400 x $16] | $4,800 [assumption: 2,400 x $2.00] | $12,000 [assumption: higher local data and support cost] | $21,600 [assumption: revenue minus listed costs] |
| Scale year | 9,600 [assumption: 800/month run-rate target] | 9,600 x $16 [assumption: ARPU] | $153,600 [assumption: 9,600 x $16] | $19,200 [assumption: 9,600 x $2.00] | $36,000 [assumption: support, monitoring, provider, and compliance reserve] | $98,400 [assumption: revenue minus listed costs] |

Revenue assumptions: ARPU is $16 [assumption: tier mix], paid conversion is 3.0% or better [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and repeat usage is not counted until observed [assumption: conservative model choice]. Cost assumptions: variable cost is $2.00 per paid submission [assumption: includes AI/email/support allocation], fixed backend hosting begins at $96/month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and local official data may add $100-$500/month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Sensitivity tests: if ARPU falls to $8 [assumption: users choose only low tier], scale-year revenue falls to $76,800 [assumption: 9,600 x $8]. If variable cost rises to $6.00 [assumption: heavier research/human review], scale-year variable cost becomes $57,600 [assumption: 9,600 x $6.00]. If paid conversion is only 1.0% [assumption: weak willingness-to-pay], the project fails the repo's validation gate of 3.0% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Risks & Anti-Plan
Hole: people like civic help but will not pay after preview. Why it kills the deal: a $5 floor [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] still requires trust, and free alternatives exist. Repair: do not scale SEO until the preview-to-checkout conversion reaches 3.0% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Residual risk: the product becomes a useful demo with no commercial demand.

Hole: government email deliverability breaks the core promise. Why it kills the deal: a letter that lands in spam is not civic action. Repair: domain warming, SPF/DKIM/DMARC, bounce tracking, and suppression are already specified [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [scripts/setup-dns.md](scripts/setup-dns.md)]. Residual risk: some .gov systems may still reject or quarantine messages [assumption: external deliverability risk, not measured here].

Hole: citations create legal-adjacent trust and liability risk. Why it kills the deal: users may interpret letters as legal advice despite disclaimers. Repair: mandatory citation verification, unverified citation stripping, "not legal advice" disclaimer, content moderation, and human review for failed citations [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts)]. Residual risk: correctness remains hard across state/local law.

Hole: local official coverage is a blocker. Why it kills the deal: the value proposition weakens if CivicState cannot route to the right local actor. Repair: evaluate Cicero versus BallotReady and show a coverage confidence indicator [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Residual risk: paid local data costs compress margins before volume exists.

## Assumption Ledger
| Claim | Basis | Evidence-or-assumption | Test |
|---|---|---|---|
| Users will pay $5-$25 for delivered civic letters | Existing repo pricing hypothesis | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] plus [assumption: no paid demand data] | Run paid beta by 2026-07-31 [assumption: operator schedule] |
| $16 ARPU is plausible | Weighted package mix | [assumption: no tier-mix evidence] | Track actual tier selection by 2026-08-15 [assumption: operator schedule] |
| 85.0% government inbox placement is achievable | Existing gate target | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Seed deliverability panel by 2026-08-31 [assumption: operator schedule] |
| 1.0% reachable SAM filter is enough for a small business | Bottom-up market filter | [assumption: workspace-only market model] | Validate organic impressions and conversion by 2026-09-30 [assumption: operator schedule] |
| Official data can reach 95.0% federal/state coverage and 60.0% local coverage | Existing project validation gate | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | Complete provider spike by 2026-07-15 [assumption: operator schedule] |
| One operator can handle launch review | Genesis assumption | [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] | Measure queue depth and oldest flagged item by 2026-08-31 [assumption: operator schedule] |

## Evidence Sources
Workspace evidence was read from local files, not fetched from the network [evidence: worker dispatch workspace-only instruction]. Canonical repo-link forms are included only so dossier renderers have stable source links; the content claims above rely on the local workspace files, not remote fetches.

- BUSINESS.md source path: https://github.com/RPLogic-Inc/brookss-history/blob/main/BUSINESS.md [assumption: canonical URL pattern from dispatch repo id; not network-fetched]
- Roadmap source path: https://github.com/RPLogic-Inc/brookss-history/blob/main/ROADMAP.md [assumption: canonical URL pattern from dispatch repo id; not network-fetched]
- Planning evidence source path: https://github.com/RPLogic-Inc/brookss-history/blob/main/.planning/PROJECT.md [assumption: canonical URL pattern from dispatch repo id; not network-fetched]

## Self-Valuation
Score: 2.0/10 [assumption: EIR judgment from evidence strength, sensitivity, and registry watchlist]. Under the $5,000,000 per-business program assumption [assumption: wrk.vc program framing from brief, not external valuation evidence], the current base band is $250,000 [assumption: prototype with unvalidated demand], bull band is $1,250,000 [assumption: paid conversion, deliverability, and local coverage gates clear], and bear band is $50,000 [assumption: personal research/tooling value only].

Comparables used: Resistbot, Change.org, Quorum, and VoterVoice [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]. Method: probability-weighted venture option, not revenue multiple, because current revenue is $0 [evidence: [.planning/existing-state.md](.planning/existing-state.md)] and no paid demand is verified. What moves it: first paid deliveries, reliable .gov deliverability, validated local official coverage, and proof that cited letters produce response value.

## Milestones
2026-06-20 [evidence: worker dispatch current_date]: refresh soul, gate, roadmap, and decision log with workspace-only evidence and explicit assumptions.

2026-07-15 [assumption: operator schedule]: complete official-provider spike and decide Cicero, BallotReady, or local-only deferral.

2026-07-31 [assumption: operator schedule]: run paid beta with at least 25 prospects [assumption: small cohort] and report preview-to-checkout conversion.

2026-08-31 [assumption: operator schedule]: complete deliverability test panel and report inbox placement against the 85.0% target [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

2026-09-30 [assumption: operator schedule]: decide continue, pivot to research asset, or kill commercial push based on paid conversion, delivery, and legal-review load.

## Surprise Spikes
The dispatch project id is brooks-history [evidence: worker dispatch], but the repo, code, and planning files consistently describe CivicState [evidence: [package.json](package.json); [.planning/PROJECT.md](.planning/PROJECT.md)]. This identity mismatch must be resolved before investor-facing publication.

Older workspace audit text says zero application code existed [evidence: [.planning/existing-state.md](.planning/existing-state.md)], but the current repo contains application code, routes, Prisma schema, frontend pages, worker agents, and tests [evidence: [apps/api/src/index.ts](apps/api/src/index.ts); [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts); [apps/web/app/page.tsx](apps/web/app/page.tsx)]. Treat the old audit as stale, not current truth.

The registry note says personal/research asset and not near-term investible BOS [evidence: registry note in dispatch]. This plan therefore refuses to pitch the project as VC-ready until market validation exists.
