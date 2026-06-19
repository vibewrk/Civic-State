# CivicState Business Plan

## Thesis

As of 2026-06-19 [evidence: runner current_date], CivicState is best understood as a civic communication research asset with a plausible transactional business model, not yet an investible BOS-grade company [evidence: dispatch registry note]. The investible thesis is narrow: ordinary US residents will pay for a workflow that turns a civic concern into researched, citation-backed letters sent to relevant officials, if the product proves delivery quality, legal/citation safety, and willingness to pay [assumption: workspace-only EIR judgment from repo plan].

The core bet is that a paid package at $5, $15, or $25 [evidence: .planning/PROJECT.md; apps/web/app/page.tsx] can cover AI, payment, and email costs while staying below the user's perceived time cost [assumption: no customer interviews in workspace]. The repo already contains an Express API, Next.js frontend, Prisma schema, BullMQ workers, Stripe/Postmark routes, and test files [evidence: apps/api/src/index.ts; apps/web/app/page.tsx; packages/shared/prisma/schema.prisma; apps/worker/src/index.ts; tests/*.test.ts]. It does not contain evidence of live customers, production traffic, paid submissions, or validated response rates [evidence: .planning/PROJECT.md states "Validated (None yet - ship to validate)"].

## Current Reality

CivicState's built product surface includes a monorepo with apps/web, apps/api, apps/worker, and packages/shared [evidence: package.json; pnpm-workspace.yaml]. The API mounts public submission, officials, payment, campaign, webhook, compliance, and admin routes [evidence: apps/api/src/index.ts]. The worker registers classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/index.ts]. The database schema covers users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].

The older planning state is stale in both directions. `.planning/existing-state.md` describes zero application code [evidence: .planning/existing-state.md], while the repository now has application code [evidence: apps/api/src/index.ts; apps/worker/src/index.ts]. `.planning/ROADMAP.md` marks four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/REQUIREMENTS.md` still marks many core submission, officials, payment, delivery, admin, and compliance requirements as pending [evidence: .planning/REQUIREMENTS.md]. The plan should therefore treat the implementation as partially built and unvalidated, not launched.

## Market & Customer

Primary customer: a US resident with a specific civic problem such as local enforcement, zoning, public works, school policy, agency service failure, or legislative advocacy who wants a credible letter but does not know the law, responsible official, or formal format [evidence: .planning/PROJECT.md]. Secondary future customer: HOAs, nonprofits, and civic organizations that might buy API or bulk workflow access only after the individual workflow proves reliability [evidence: .planning/PROJECT.md out-of-scope items].

Customer definition is intentionally narrow for launch: English-language, web-first, US constituent communication, not legal advice, not legal filings, not lobbying representation, not claim filing, and not a social network [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The first customer segment should be people already searching for "who do I contact about..." style civic problems [assumption: inferred from the SEO distribution hypothesis in .planning/GENESIS.md].

## Market Sizing

No external market research was available in this workspace-only run, so market size is a bottom-up validation model, not a sourced TAM [assumption: no network and no customer dataset available]. The first useful market is not "all citizens"; it is the count of people who both have an actionable civic issue and will pay for delegation of research, drafting, and delivery [assumption: EIR segmentation].

Bottom-up launch wedge:

| Layer | Method | Size / value |
|---|---|---|
| First proof market | Organic and direct traffic to a focused civic letter flow | 500 visitors/month [assumption: initial beta target, not sourced] |
| Paid conversion gate | Visitors who buy a package after preview | 3% [evidence: .planning/PROJECT.md names this as a validation gate] |
| Paid volume | Visitors x conversion | 15 paid packages/month [assumption: 500 x 3% model] |
| Blended price | Mix of $5, $15, and $25 tiers | $15 per package [assumption: midpoint of repo pricing tiers] |
| Launch revenue | Paid volume x blended price | $225/month [assumption: 15 x $15 model] |
| Build-to-scale checkpoint | Evidence of repeatable acquisition before calling it venture-scale | 300 paid packages/month [assumption: EIR validation threshold] |

This is deliberately conservative: the market is large only if the product creates a trusted category. Until CivicState measures conversion, delivery success, official response rate, refund/chargeback rate, and repeat use, the honest market size is "unproven" [assumption: workspace-only EIR judgment].

## Business Model

Launch revenue is one-time letter packages: $5 for a single official, $15 for a three-official package, and $25 for a broader package [evidence: .planning/REQUIREMENTS.md PAY-01; apps/web/app/page.tsx]. Stripe Checkout gates payment before delivery [evidence: apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts]. The active plan excludes subscriptions, community mechanics, certified mail, follow-up automation, and third-party API access until the individual workflow is proven [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

Unit economics need live validation. The repo contains a 40% net margin floor requirement [evidence: .planning/REQUIREMENTS.md PAY-04], a 150% job budget overage pause [evidence: .planning/REQUIREMENTS.md TRSY-03; apps/worker/src/agents/treasury.ts], and a daily reconciliation worker [evidence: apps/worker/src/agents/reconciliation.ts]. Existing planning claims of 88%-92% gross margin and 91% gross margin appear in repo docs [evidence: .planning/GENESIS.md; .planning/PROJECT.md], but they are not live financial evidence and should be treated as assumptions until transaction data exists [assumption: no ledger export or customer revenue in workspace].

If adopted into wrk.vc, CivicState should consume shared identity, billing, analytics, and compliance rails rather than building a separate company chassis [assumption: WrkPlug Phase 0 not yet signed]. The consequence would be lower infrastructure burden and a clearer path to shared trust/compliance compounding [assumption: platform strategy, not repo evidence].

## Competition

| Competitor / substitute | Position | CivicState wedge |
|---|---|---|
| Resistbot | Constituent messaging, commonly associated with low-friction advocacy [assumption: model knowledge, no network] | Research-backed citations and ZIP-to-official routing for more complex issues [assumption: positioning from repo plan] |
| Change.org | Petition hosting and social proof [assumption: model knowledge, no network] | Individual letter generation and delivery rather than petition discovery [evidence: MASTER_PLAN.md] |
| Quorum / VoterVoice | Enterprise advocacy software for organizations [assumption: model knowledge, no network] | Consumer-priced transactional workflow rather than annual enterprise contracts [assumption: repo plan references enterprise alternatives] |
| LegalZoom | General legal document and service marketplace [assumption: model knowledge, no network] | Civic communications only; explicitly not legal advice [evidence: .planning/PROJECT.md] |
| Manual outreach | Free but high-friction research and drafting | CivicState compresses official lookup, research, drafting, and delivery into one guided workflow [evidence: .planning/GENESIS.md] |

The competitive risk is not that nobody can copy the product. The risk is that existing free channels are "good enough" for the small share of users who would pay, while people with urgent issues need legal, media, or community organizing support that CivicState explicitly does not provide [assumption: EIR anti-plan].

## Go-To-Market

The repo's existing distribution hypothesis is SEO: opt-in public campaign pages can create long-tail civic content [evidence: .planning/GENESIS.md]. That remains plausible but cannot be the only first-customer plan because no public content, rankings, or domain authority are evidenced in the workspace [evidence: .planning/existing-state.md; apps/web/app/page.tsx].

First 100 paying customers [assumption: validation design]:

| Step | Target | Test |
|---|---|---|
| Direct beta | 25 paid packages [assumption: validation milestone] | Hand-recruit through civic forums, neighborhood groups, and personal networks [assumption: no partner evidence] |
| SEO wedge | 50 paid packages [assumption: validation milestone] | Publish issue-specific landing pages only after legal/compliance review [assumption: no current public archive] |
| Repeatability | 25 paid packages [assumption: validation milestone] | Measure conversion from preview to Stripe, refund requests, and response quality [assumption: no analytics evidence] |

The first go-to-market motion should not require partnerships, paid ads, or enterprise procurement. It should prove that one individual user will pay after seeing a preview, and that the delivered letter does not create legal, safety, or spam harms [assumption: EIR launch constraint].

## Financial Model

Planning date: 2026-06-19 [evidence: runner current_date]. All projections below are assumptions because the workspace contains no revenue export, customer cohort, CAC history, or production traffic [evidence: .planning/PROJECT.md "Validated (None yet)"].

| Line | Year A | Year B | Year C |
|---|---:|---:|---:|
| Average paid packages/month | 75 [assumption: beta ramp] | 300 [assumption: organic wedge works] | 1,000 [assumption: category trust forms] |
| Blended package price | $15 [assumption: midpoint of $5/$15/$25 repo tiers] | $16 [assumption: mix shifts upward] | $18 [assumption: broader package mix] |
| Package revenue | $13,500 [assumption: 75 x $15 x 12-month model] | $57,600 [assumption: 300 x $16 x 12-month model] | $216,000 [assumption: 1,000 x $18 x 12-month model] |
| Direct AI/email/payment cost | $3,375 [assumption: 25% of revenue until measured] | $11,520 [assumption: 20% of revenue with reuse] | $32,400 [assumption: 15% of revenue with scale] |
| Infra and tools | $3,000 [assumption: $250/month blended stack] | $7,200 [assumption: $600/month with managed services] | $18,000 [assumption: $1,500/month with scale] |
| Operator / review labor | $12,000 [assumption: part-time stipend] | $36,000 [assumption: part-time ops] | $90,000 [assumption: one operator plus overflow] |
| Approx. operating income | -$4,875 [assumption: revenue minus listed costs] | $2,880 [assumption: revenue minus listed costs] | $75,600 [assumption: revenue minus listed costs] |

Revenue assumptions: conversion from preview to paid reaches 3% [evidence: .planning/PROJECT.md validation gate], blended price starts at $15 [assumption: midpoint of repo tiers], and refunds/chargebacks remain below 0.5% [evidence: .planning/PROJECT.md constraint]. Cost assumptions: backend hosting starts near $96/month [evidence: .planning/PROJECT.md], the operating reserve starts at $1,500 [evidence: .planning/PROJECT.md], and Mercury warning/emergency thresholds are $2,000 and $500 [evidence: .planning/REQUIREMENTS.md TRSY-06].

Sensitivity tests:

| Test | Result |
|---|---|
| Conversion is 1% instead of 3% | Launch revenue falls from $225/month to $75/month in the 500-visitor model [assumption: arithmetic model] |
| Blended price stays at $5 | Year B revenue falls from $57,600 to $18,000 [assumption: 300 packages/month x $5 x 12-month model] |
| Human review rises to 20 minutes/package | Year C becomes ops-limited unless pricing or moderation automation changes [assumption: EIR operating model] |

## Risks & Anti-Plan

The strongest anti-plan is simple: users may not pay for civic letters because free email, social media, public comments, and advocacy organizations already exist [assumption: skeptical EIR view]. If that is true, CivicState becomes a useful research demo, not a business.

Second, the product may create operational/legal risk faster than revenue. Civic issues can include threats, defamation, harassment, political persuasion, sensitive personal information, and legal-adjacent claims [evidence: .planning/REQUIREMENTS.md MODR and LGAL sections]. Moderation, disclaimers, opt-outs, audit logs, and citation verification reduce risk, but they do not remove the need for operator judgment [assumption: no legal opinion in workspace].

Third, email deliverability may break the model. The repo already treats domain warming, bounce thresholds above 10%, spam complaints, and official opt-outs as core requirements [evidence: .planning/REQUIREMENTS.md DLVR-03 through DLVR-08]. If government domains reject the mail or classify it as spam, customers are paying for a failed promise [assumption: EIR risk].

Fourth, the data moat is not yet real. Officials directory quality, verified citation reuse, and public campaign archive value require volume [evidence: .planning/GENESIS.md]. At low volume, a competitor can copy the UI and use similar APIs [assumption: EIR risk].

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| Users will pay after preview | Repo has $5/$15/$25 pricing but no sales | [assumption: no customer data] | Measure paid conversion on first 500 visitors [assumption: beta target] |
| Citation-backed letters improve perceived value | Product thesis and agent design emphasize citations | [evidence: .planning/PROJECT.md; apps/worker/src/agents/researcher.ts] | Survey buyers and compare conversion with/without citation preview |
| Official lookup can be reliable enough | Repo has congress/OpenStates/Cicero lookup modules | [evidence: apps/api/src/lib/officials/*.ts] | Track match confidence and manual correction rate |
| Deliverability is controllable | Requirements include SPF/DKIM/DMARC and bounce controls | [evidence: .planning/REQUIREMENTS.md] | Measure delivered, bounced, spam complaint, and reply rates by domain |
| One operator can handle exceptions | Existing plan assumes lean operator workflow | [evidence: .planning/GENESIS.md] | Track flagged queue depth, oldest flagged item age, and review minutes |
| The project is not near-term investible | Registry marks watchlist and personal/research asset | [evidence: dispatch registry note] | Upgrade only after paid usage, retention/repeat, and risk metrics exist |

## Self-Valuation

Score: 2.5/10 as of 2026-06-19 [assumption: EIR scoring against venture readiness; evidence basis is repo state and registry note]. The product has more implementation than the thin soul implied, but zero workspace evidence of customers or revenue [evidence: apps/api/src/index.ts; .planning/PROJECT.md].

Twelve-month bands under the $5M-per-business program assumption [assumption: dispatch/program framing, not market evidence]:

| Case | Value band | Rationale |
|---|---:|---|
| Bear | $0-$250k [assumption: asset value only] | No paid conversion or deliverability proof; repo remains research/demo |
| Base | $250k-$1.0M [assumption: small validated workflow] | 100-300 paid packages/month [assumption] with acceptable risk metrics |
| Bull | $1.0M-$3.0M [assumption: early category proof] | 1,000+ paid packages/month [assumption] and reliable official-response/deliverability data |

Comparables used as mental anchors only: Resistbot, Change.org, Quorum/VoterVoice, and LegalZoom [assumption: model knowledge, no network]. What moves valuation: proof of willingness to pay, low complaint/chargeback rates, high deliverability, official response evidence, and a repeatable acquisition channel [assumption: EIR judgment].

## Milestones

| Date | Milestone | Falsifiable evidence |
|---|---|---|
| 2026-06-26 [assumption: one-week validation sprint from current date] | Reality audit complete | Operator confirms which routes are production-ready and which are stubs |
| 2026-07-10 [assumption: two-week beta prep] | First closed beta flow | Controlled paid test using Stripe test/live mode as operator approves |
| 2026-07-31 [assumption: near-term beta] | Deliverability gate | Domain-level delivered/bounced/spam metrics exported for at least 25 sent letters [assumption: test size] |
| 2026-09-30 [assumption: quarter-end checkpoint] | Business/no-business decision | Either 100 paid packages [assumption: validation target] or explicit decision to keep as research asset |

## Surprise Spikes

The dispatch project id is brooks-history and repo is RPLogic-Inc/brookss-history, but the repository content, code, and planning files describe CivicState [evidence: dispatch; package.json; .planning/PROJECT.md]. This identity mismatch should be resolved before wrk.vc presentation.

The registry says personal/research asset and not near-term investible [evidence: dispatch registry note], while the repo plan pitches a transactional civic-tech business [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The plan should not smooth this over: CivicState can be framed as a watched research asset until market validation changes the evidence.

The planning files conflict about progress. One file says zero app code exists [evidence: .planning/existing-state.md], another says all phases are complete [evidence: .planning/ROADMAP.md], and the current repo shows partial application implementation [evidence: apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma]. The next roadmap must prioritize reality reconciliation before new feature ambition.
