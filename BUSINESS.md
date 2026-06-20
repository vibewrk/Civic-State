# Brooks History / CivicState Business Soul

As of 2026-06-20 [evidence: dispatch current_date], this repository's registry identity is `brooks-history` while the checked-in product, plans, package metadata, and app code describe `CivicState` [evidence: dispatch project id; evidence: [package.json](package.json); evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. This soul therefore treats CivicState as the evidenced asset and flags the Brooks History mismatch as an operator decision, not a cosmetic rename.

## Snapshot

CivicState is a civic technology product that turns a resident's issue description and ZIP code into researched, citation-backed letters to government officials [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx)]. The repo contains a Next.js web app, Express API routes, BullMQ worker agents, Prisma schema, payment route, delivery route, moderation logic, and tests [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts); evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts); evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

Investment posture: watchlist, not near-term investible, because the registry calls this a personal/research asset and asks the operator to confirm whether it should pitch as a business [evidence: dispatch registry notes].

## Thesis Current

The investible thesis is conditional: if ordinary US residents will pay small transaction fees for help researching, drafting, and delivering constituent communications, CivicState can begin as a lean transactional utility and later compound an officials directory, citation library, and opt-in campaign archive [assumption: based on repository strategy, not market-validated]. The strongest current evidence is build progress, not customer proof [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md); evidence: [tests/officials.test.ts](tests/officials.test.ts)].

The thesis is not current enough for a financing claim. The main planning files were last updated on 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)], and the intake brief is dated 2026-04-10 [evidence: [.planning/INTAKE-BRIEF.md](.planning/INTAKE-BRIEF.md)]. Those dates are stale against 2026-06-20 [evidence: dispatch current_date].

## Customer Definition

Primary customer: a US resident with a concrete civic frustration, desired government action, and low willingness to do manual legal/civic research [assumption: repository target user, not externally validated]. The repository defines this user as someone who would contact government if research, drafting, routing, and delivery were handled for them [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

Buyer and user are the same person at launch [assumption: direct-to-consumer transactional model]. Government officials are recipients, not customers [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Future organizations such as HOAs and nonprofits are explicitly deferred [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

## Product And Workflow

Current implemented surface:

| Capability | Repository status |
|---|---|
| Submission creation and moderation | Implemented API route with validation, moderation, audit logging, and queue enqueue attempt [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)] |
| Officials lookup | Planned and tested through federal, state, and local lookup orchestration [evidence: [tests/officials.test.ts](tests/officials.test.ts)] |
| Research agent | Implemented worker flow that searches eCFR, CourtListener, and state cache, then strips unverified citations [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts)] |
| Payment | Implemented Stripe Checkout route with hardcoded tiers of $5 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)], $15 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)], and $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] |
| Delivery | Implemented Postmark delivery worker with opt-out checks and domain bounce-rate guard [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)] |
| Data model | Implemented Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger, audit logs, agent logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)] |

The product is still unvalidated commercially: revenue is $0 [evidence: [.planning/existing-state.md](.planning/existing-state.md)], traffic is zero [evidence: [.planning/existing-state.md](.planning/existing-state.md)], and user data is zero [evidence: [.planning/existing-state.md](.planning/existing-state.md)].

## Revenue Model

Launch revenue is transactional letter delivery. The active tiers are $5 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)], $15 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)], and $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. The roadmap also names a 40% net margin floor [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], but the current payment route hardcodes price and does not enforce a margin calculation before checkout [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].

Deferred revenue lines are organization/API access and higher-touch review [assumption: repo strategy only]. These should not be included in near-term valuation until the consumer workflow produces paid usage [assumption: finance discipline].

## Market Sizing

Workspace-only mode prevents external population research, so this is a method-led sizing model rather than a market claim.

| Layer | Method | Output |
|---|---|---|
| Validation wedge | Break-even reference from the repo says about 25 paid Amplify-tier submissions per month [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] at roughly $340 MRR [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)] |
| Buildable launch case | 400 paid submissions per month [evidence: [.planning/existing-state.md](.planning/existing-state.md)] times $13 blended AOV [assumption: tier mix of hardcoded prices] | $5,200 monthly revenue [assumption: arithmetic from launch case] |
| Current infrastructure ceiling | Existing plan says a single droplet is sufficient for 5,000 submissions per month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] | $65,000 monthly revenue at $13 AOV [assumption: capacity times blended AOV] |
| Venture hurdle | $10,000,000 ARR target [assumption: generic VC-scale hurdle] divided by $13 AOV [assumption: launch blended AOV] | about 64,103 paid submissions per month [assumption: arithmetic] |

Conclusion: CivicState can be a credible small business if the validation wedge clears, but the repository does not yet show a venture-scale acquisition channel [assumption: based on lack of traffic, users, and external market evidence].

## Financial Model

Launch case reconciliation:

| Line | Amount |
|---|---:|
| Paid submissions per month | 400 [evidence: [.planning/existing-state.md](.planning/existing-state.md)] |
| Assumed price mix | 40% single, 40% three-pack, 20% full-spread [assumption: simple launch mix] |
| Blended AOV | $13.00 [assumption: $5, $15, and $25 tier arithmetic] |
| Revenue | $5,200 per month [assumption: 400 times $13.00] |
| Variable cost per submission | $1.10 [assumption: model, email, and payment processing placeholder] |
| Variable cost | $440 per month [assumption: 400 times $1.10] |
| Contribution profit | $4,760 per month [assumption: revenue minus variable cost] |
| Contribution margin | 91.5% [assumption: contribution profit divided by revenue] |
| Fixed backend hosting | about $96 per month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Possible managed PostgreSQL add-on | $50 per month [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |
| Possible object storage add-on | $25 per month [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] |

This model is internally consistent, but it is not bankable. It uses assumed volume and assumed variable cost because the repo has no paid usage, production delivery data, or vendor invoices [evidence: [.planning/existing-state.md](.planning/existing-state.md)].

## Competition

Named alternatives: Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice [assumption: based on repository competitive notes, not independently researched]. The claimed differentiation is citation-backed research plus official targeting for individuals at a low transactional price [assumption: repo claim not externally verified].

Competitive risk is high because the initial feature set is workflow composition, not a proprietary data asset [assumption: product strategy]. The moat only becomes meaningful after a meaningful volume of verified official contacts, bounce history, citation outcomes, and response data accumulates [assumption: repository moat hypothesis].

## Go To Market

The current go-to-market hypothesis is organic search plus opt-in public campaign pages [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Paid acquisition, partnerships, app stores, and subscriptions are excluded from launch [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

Near-term GTM should be validation-first:

- Prove willingness to pay at or above 3% conversion [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Prove government email deliverability at or above 85% inbox placement [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Prove official data coverage at or above 95% federal/state coverage and at or above 60% local coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Until those gates clear, the product should be described as a research asset and civic workflow prototype, not a repeatable growth engine [assumption: diligence standard].

## Risks And Anti-Plan

Skeptical partner case:

- Identity risk: the registry says `brooks-history`, while the repository says CivicState. A confused asset should not be pitched until the operator resolves naming, purpose, and ownership [evidence: dispatch registry notes; evidence: [package.json](package.json)].
- Demand risk: the repo has zero users and $0 revenue [evidence: [.planning/existing-state.md](.planning/existing-state.md)]. The plan assumes people will pay for civic outreach that many tools frame as free or advocacy-sponsored [assumption: market behavior].
- Delivery risk: government domains may filter automated constituent emails, and the plan itself calls deliverability the hardest problem [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. A 10% domain bounce pause exists in code [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)], but inbox placement is not proven.
- Legal-adjacent risk: the product must avoid legal advice, regulatory filings, defamation, threats, and misleading authorship [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. These constraints can slow automation and require human review [assumption: operational risk].
- Unit economics risk: the repo targets very high gross margin, but token, moderation, review, support, chargebacks, and local official data costs are not validated [assumption: cost risk]. The plan requires chargebacks below 0.5% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Anti-plan: do not raise or spend like a VC-backed company until paid conversion, deliverability, official coverage, and legal/compliance workflow are measured in production [assumption: investment discipline].

## Assumption Ledger

| Assumption | Basis | Validation needed |
|---|---|---|
| Residents will pay $5 to $25 for civic letter help | [assumption: repo thesis and hardcoded prices] | Paid checkout conversion by source |
| A $13 blended AOV is realistic | [assumption: simple tier mix] | Actual tier distribution |
| Variable cost can stay near $1.10 per submission | [assumption: model/email/payment placeholder] | Vendor bills and token logs |
| Organic search can acquire enough high-intent users | [assumption: repository SEO hypothesis] | Indexed pages, impressions, clicks, conversion |
| Citation verification can prevent hallucinated legal references at production scale | [assumption: implemented verifier plus no production data] | Failed citation rate and review queue outcomes |
| Local official coverage can be commercially acceptable | [assumption: planned Cicero or BallotReady provider] | Provider evaluation and coverage audit |

## Evidence And Freshness

Primary repo evidence:

- [package.json](package.json) identifies the product as CivicState and describes the monorepo [evidence].
- [.planning/PROJECT.md](.planning/PROJECT.md) contains the active product narrative, constraints, validation gates, and key decisions [evidence].
- [.planning/GENESIS.md](.planning/GENESIS.md) contains the demand, distribution, moat, and break-even hypotheses [evidence].
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) tracks requirements and implementation status [evidence].
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts), and [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) show current build surface [evidence].

Freshness warning: planning evidence clusters around 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] and may not reflect code completed after that date [assumption: inconsistency observed between planning audit and current files].

## Surprise Spikes

- The dispatch calls this project `brooks-history`, but repo content is CivicState [evidence: dispatch project id; evidence: [package.json](package.json)]. This is the biggest diligence spike.
- `.planning/existing-state.md` says zero application code exists [evidence: [.planning/existing-state.md](.planning/existing-state.md)], but current files include app code, schema, workers, and tests [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts); evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- `.planning/ROADMAP.md` marks all phases complete [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while `.planning/STATE.md` says the current focus is Phase 1 and only Phase 1 is complete [evidence: [.planning/STATE.md](.planning/STATE.md)].
- The registry warns this is a personal/research asset, not near-term investible BOS [evidence: dispatch registry notes]. That warning is consistent with the lack of customer/revenue proof.

## Operator Decisions Needed

- Confirm whether this repo should remain CivicState, become Brooks History, or split into separate assets [evidence: dispatch registry notes; evidence: [package.json](package.json)].
- Confirm whether the operator wants a business pitch or a research/data-room profile [evidence: dispatch registry notes].
- Decide whether the next milestone is commercial validation, compliance hardening, or identity cleanup [assumption: sequencing based on current diligence gaps].
