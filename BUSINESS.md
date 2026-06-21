# CivicState EIR Soul

## Document Control

As of 2026-06-21 [evidence: wrk.dog dispatch current_date], this repository presents a CivicState product rather than a Brooks History product [evidence: package.json; .planning/PROJECT.md]. The registry context says the project is "brooks-history" and is a "personal/research asset, not near-term investible BOS" [evidence: wrk.dog dispatch]. This plan therefore treats the asset as a watchlist civic-tech venture thesis that requires operator confirmation before it can be pitched as a business.

Primary sources used: [MASTER_PLAN.md](MASTER_PLAN.md), [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md), [.planning/ROADMAP.md](.planning/ROADMAP.md), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), and [apps/worker/src/engine/state-machine.ts](apps/worker/src/engine/state-machine.ts). No network research was available, so external market claims are labeled as assumptions.

## Current Thesis

CivicState can be a small, paid civic action utility if it proves that ordinary US residents will pay $5-$25 per submission [evidence: .planning/PROJECT.md; apps/web/app/page.tsx] to turn a civic complaint into a researched, citation-backed letter routed to the right government officials. The venture case is conditional, not investible today: the repo has meaningful product scaffolding, but demand, deliverability, legal posture, and even project identity remain unvalidated [evidence: wrk.dog dispatch; .planning/REQUIREMENTS.md].

The narrow wedge is not "civic engagement" broadly. It is a paid workflow for people with a specific local, state, or federal concern who are willing to outsource jurisdiction research, citation discovery, drafting, and delivery. The system already encodes that value loop in product copy, routes, data models, and worker states [evidence: apps/web/app/page.tsx; apps/api/src/routes/submissions.ts; packages/shared/prisma/schema.prisma; apps/worker/src/engine/state-machine.ts].

## Surprise Spikes

The largest surprise is identity drift: the dispatch names Brooks History, while the repo, package metadata, code, and planning files name CivicState [evidence: wrk.dog dispatch; package.json; .planning/PROJECT.md]. This must be resolved before any external investor, partner, or customer-facing dossier is published.

The second surprise is freshness drift. [.planning/existing-state.md](.planning/existing-state.md) says zero application code exists, while the current repository contains a Next.js web app, Express API, BullMQ worker, Prisma schema, Docker files, and route/agent tests [evidence: .planning/existing-state.md; apps/web/app/page.tsx; apps/api/src/index.ts; packages/shared/prisma/schema.prisma; tests/api-routes.test.ts]. The business soul should rely on current repo evidence, not the stale audit.

The third surprise is that roadmap status is overstated in one place and understated in another: [.planning/ROADMAP.md](.planning/ROADMAP.md) marks all phases complete, while [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) still shows many launch requirements unchecked [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md]. The next roadmap must be buildable, evidence-led, and framed around validation.

## Customer Definition

The launch customer is a US resident with a specific civic issue, a ZIP code, a desired outcome, and willingness to pay a one-time fee to avoid research, targeting, drafting, and delivery work [evidence: .planning/PROJECT.md; .planning/GENESIS.md; apps/api/src/routes/submissions.ts]. The likely early use cases are local enforcement failures, zoning/noise/school-policy concerns, and legislative requests [evidence: .planning/GENESIS.md].

Non-customers are as important as customers. CivicState should not serve legal filings, claim submissions, legal demand letters, harassment, private-person targeting, business advocacy without policy review, or medical/insurance disputes [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The product must remain a constituent-communication tool, not a legal services company [evidence: MASTER_PLAN.md].

## Product Reality

What exists: a monorepo with apps/web, apps/api, apps/worker, and packages/shared [evidence: package.json; pnpm-workspace.yaml]; a Prisma schema covering users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: packages/shared/prisma/schema.prisma]; Express routes for submissions, officials, webhooks, payments, campaigns, admin, health, and compliance [evidence: apps/api/src/index.ts]; a BullMQ state machine from submitted through delivered [evidence: apps/worker/src/engine/state-machine.ts]; content moderation before job enqueue [evidence: apps/api/src/routes/submissions.ts]; and tests for moderation, payments, delivery, officials, compliance, admin, campaigns, citation verification, treasury, and state cache [evidence: tests/moderation.test.ts; tests/payment.test.ts; tests/delivery.test.ts; tests/officials.test.ts; tests/compliance.test.ts; tests/admin.test.ts; tests/campaigns.test.ts; tests/citation-verifier.test.ts; tests/treasury.test.ts; tests/state-cache.test.ts].

What is not proven: production traffic, paid conversion, government inbox placement, official response rate, local-official data coverage, regulatory/legal acceptability, and repeat usage [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; wrk.dog dispatch].

## Market Sizing

Workspace-only mode prevents sourced population, voting, civic participation, or legal-tech market claims. The honest market model is therefore a bottom-up validation ladder, not a TAM slide.

Validation wedge: prove that 100 paid submissions per month [assumption: operator-run beta volume small enough for manual review] can run without broken deliverability, unacceptable review load, or negative unit economics. Expansion wedge: grow to 400 paid submissions per month [assumption: .planning/existing-state.md modeled 4,800 campaigns over 12 months, but that file is stale and should be treated as directional only]. Venture-scale question: whether repeatable acquisition can reach 1,000 paid submissions per month [assumption: SEO and social sharing compound after public campaign pages exist] without becoming a legal/compliance burden.

This makes the practical near-term SOM $1,300 monthly gross revenue at 100 submissions [assumption: 100 submissions times $13 blended AOV], $5,200 monthly gross revenue at 400 submissions [assumption: 400 submissions times $13 blended AOV], and $13,000 monthly gross revenue at 1,000 submissions [assumption: 1,000 submissions times $13 blended AOV]. TAM and SAM remain unknown until external research and customer discovery are allowed [assumption: no network research available in this worker run].

## Revenue Model

The current plan uses one-time packages: $5 for one official, $15 for three officials, and $25 for a broader send [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; apps/web/app/page.tsx]. The intended margin floor is 40% net margin after fees [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. The prior plan also mentions 88%-92% gross margin and a $132.50 monthly max burn with break-even at 11 submissions [evidence: .planning/PROJECT.md].

Blended AOV model: 40% single-official at $5, 40% three-official at $15, and 20% full-spread at $25 produces a $13.00 blended order value [assumption: launch mix, calculated as $2.00 + $6.00 + $5.00]. Variable cost per paid submission is modeled at $0.90 [assumption: $0.68 card processing from 2.9% plus $0.30, $0.20 AI cost from .planning/PROJECT.md, and $0.02 email/delivery allowance]. Contribution is therefore $12.10 per submission and 93.1% contribution margin [assumption: $12.10 divided by $13.00].

| Scenario | Paid submissions | Gross revenue | Variable cost | Contribution | Fixed burn | Operating result |
|---|---:|---:|---:|---:|---:|---:|
| Beta | 100/mo [assumption: manual beta capacity] | $1,300/mo [assumption: 100 x $13] | $90/mo [assumption: 100 x $0.90] | $1,210/mo [assumption: revenue minus variable cost] | $132.50/mo [evidence: .planning/PROJECT.md] | $1,077.50/mo [assumption: contribution minus fixed burn] |
| Base | 400/mo [assumption: first-year target] | $5,200/mo [assumption: 400 x $13] | $360/mo [assumption: 400 x $0.90] | $4,840/mo [assumption: revenue minus variable cost] | $132.50/mo [evidence: .planning/PROJECT.md] | $4,707.50/mo [assumption: contribution minus fixed burn] |
| Upside | 1,000/mo [assumption: SEO/social flywheel works] | $13,000/mo [assumption: 1,000 x $13] | $900/mo [assumption: 1,000 x $0.90] | $12,100/mo [assumption: revenue minus variable cost] | $132.50/mo [evidence: .planning/PROJECT.md] | $11,967.50/mo [assumption: contribution minus fixed burn] |

The table reconciles internally, but it is not evidence of demand. It only shows that the planned package economics can work if people pay and if deliverability does not collapse.

## Competition

The existing plan names Resistbot, Change.org, LegalZoom, manual official contact, Quorum, and VoterVoice as the relevant comparison set [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The claimed differentiation is citation-backed research, official targeting, per-letter transactional pricing, and individual-user focus [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

The competitive weakness is that incumbents may not need the full workflow to win. Resistbot can be free or low-friction [assumption: competitor positioning not externally verified in workspace-only mode]. Change.org can capture public momentum before letter quality matters [assumption: competitor positioning not externally verified]. Quorum and VoterVoice can own institutional workflows even if CivicState serves individuals [assumption: competitor positioning not externally verified]. Manual constituent outreach is free, trusted, and does not add AI/legal/privacy risk [assumption: behavioral alternative].

## Go To Market

The existing GTM hypothesis is organic search first, with opt-in public campaign pages becoming long-tail civic query assets [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. Social sharing is secondary; paid ads, app stores, and partnerships are not planned for launch [evidence: .planning/GENESIS.md].

The EIR revision is stricter: launch should not begin with broad SEO. It should begin with a controlled beta of 25-100 paid submissions [assumption: risk-limited validation range] across a small number of jurisdictions where official lookup and citation verification can be manually spot-checked. SEO pages should stay opt-in and read-only until moderation, legal copy, and takedown procedures are tested [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

## Risks And Anti-Plan

Skeptical partner kill case: do not invest now. The registry itself says watchlist and not near-term investible [evidence: wrk.dog dispatch]. The product may be an impressive workflow wrapped around a low-frequency, low-willingness-to-pay behavior [assumption: demand not validated]. Government email deliverability may fail even when the software works [evidence: .planning/PROJECT.md]. AI citation or legal-adjacent drafting errors could create reputational or regulatory risk [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md]. The repository identity mismatch could mean the wrong asset is being scored [evidence: wrk.dog dispatch; package.json].

Real anti-plan: stop pitching venture upside until the validation gates pass [evidence: .planning/PROJECT.md]. The willingness-to-pay gate is at least 3% conversion from preview to paid [evidence: .planning/PROJECT.md]. The delivery gate is at least 85% government inbox placement [evidence: .planning/PROJECT.md]. The coverage gate is at least 95% federal/state and 60% local official coverage [evidence: .planning/PROJECT.md]. If any gate fails, reposition as a personal/research asset or internal civic-tech experiment, not a BOS-ready company [evidence: wrk.dog dispatch].

## Assumption Ledger

| Assumption | Basis | Validation method |
|---|---|---|
| Users will pay $5-$25 per civic submission | Existing pricing in plan and UI [evidence: .planning/PROJECT.md; apps/web/app/page.tsx] | Run preview-to-paid beta and measure conversion |
| $13 blended AOV is plausible | Launch package mix assumption [assumption: 40% / 40% / 20% package split] | Compare actual Stripe payments by tier |
| $0.90 variable cost is plausible | AI cost evidence plus card/email assumptions [evidence: .planning/PROJECT.md; assumption: external fees unavailable offline] | Reconcile Stripe, provider invoices, and ledger |
| SEO can acquire demand | Existing genesis hypothesis [evidence: .planning/GENESIS.md] | Publish opt-in pages only after legal review and measure indexed impressions |
| One operator can manage launch exceptions | Existing operating constraint says under 30 minutes per day routine [evidence: .planning/PROJECT.md] | Track review queue age, volume, and escalation rate |
| Local official lookup can reach useful coverage | Existing blocker names Cicero/BallotReady spike [evidence: .planning/PROJECT.md] | Complete provider evaluation and coverage audit |

## Milestones And Gates

By 2026-06-21 [evidence: wrk.dog dispatch current_date], the right investor-grade posture is "validation-ready prototype," not "scaled business." The next gate is a closed beta readiness gate: identity resolved, local provider selected, citation verification audited, legal copy reviewed, pricing wired to real payments, delivery suppressed until domain warming and compliance are complete.

The next commercial gate is a paid pilot. It should require 100 preview starts [assumption: small beta sample], 3 paid conversions [evidence: .planning/PROJECT.md threshold of >=3% conversion], 0 chargebacks [assumption: launch quality bar], and no unresolved high-severity moderation incidents [assumption: compliance quality bar].

## Source Freshness

Fresh sources: package metadata and app code reflect the current workspace as of 2026-06-21 [evidence: package.json; apps/api/src/index.ts; apps/web/app/page.tsx]. Older planning sources are dated 2026-04-25 [evidence: .planning/PROJECT.md; .planning/ROADMAP.md; .planning/REQUIREMENTS.md] and must be treated as planning evidence, not live operating metrics. Stale source: [.planning/existing-state.md](.planning/existing-state.md) says zero app code exists, which contradicts current repository contents [evidence: .planning/existing-state.md; apps/api/src/index.ts; packages/shared/prisma/schema.prisma].

## EIR Recommendation

Keep CivicState in the portfolio watchlist as a personal/research asset until the operator confirms whether this repository is intentionally attached to brooks-history [evidence: wrk.dog dispatch; package.json]. If confirmed, the next value-creating work is not more feature breadth; it is validation instrumentation, legal/deliverability risk reduction, and a small paid beta that can falsify the thesis quickly.
