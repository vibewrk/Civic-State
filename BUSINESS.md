# CivicState / Brooks History Business Plan

## Snapshot

As of 2026-06-19 [evidence: dispatch current_date], this repository is labeled `brooks-history` by wrk.dog but the checked-in product, planning files, package metadata, and application code describe **CivicState** [evidence: package.json; .planning/PROJECT.md; apps/web/app/page.tsx]. CivicState is a civic-tech workflow that turns a resident's issue, desired outcome, and ZIP code into researched, citation-backed letters delivered to public officials at $5, $15, or $25 price points [evidence: apps/api/src/routes/payments.ts; apps/web/app/page.tsx].

Registry posture: **Watchlist, personal/research asset, not near-term investible BOS unless the operator confirms a business pitch** [evidence: wrk.dog registry note in dispatch]. The plan below is therefore written as a diligence-grade operating plan, not as an investible claim.

## Thesis

CivicState's strongest wedge is not generic AI letter writing. It is the full chain of civic intent capture, official targeting, legal-source retrieval, citation verification, payment gating, delivery, reply capture, and auditability in one workflow [evidence: .planning/PROJECT.md; apps/api/src/index.ts; apps/worker/src/index.ts]. The product is valuable if it can prove that ordinary US residents will pay a small one-time fee to avoid the research and routing work that usually prevents civic action [assumption: customer behavior hypothesis from .planning/GENESIS.md, not externally validated in workspace-only mode].

Current investibility is constrained by missing market validation, name/asset mismatch, and legal/deliverability risk [evidence: .planning/STATE.md; .planning/existing-state.md; dispatch registry note]. The correct near-term goal is to validate a paid, compliant, end-to-end loop before positioning this as a venture-scale company [assumption: EIR judgment based on repo evidence].

## Existing Asset

The repo contains more than a concept memo. It includes a Next.js web app, Express API, BullMQ worker process, Prisma schema, Clerk authentication middleware, Stripe Checkout route, Postmark delivery hooks, moderation logic, official lookup libraries, citation verification libraries, dashboard pages, admin pages, and tests [evidence: apps/web; apps/api/src; apps/worker/src; packages/shared/prisma/schema.prisma; tests]. The root package name is `civicstate` [evidence: package.json].

The stale planning record is materially inconsistent with the current code. `.planning/STATE.md` says the project is at Phase 1 only and `.planning/existing-state.md` says there is zero application code, while `.planning/ROADMAP.md` says all 4 phases are complete and the repo contains implemented app directories [evidence: .planning/STATE.md; .planning/existing-state.md; .planning/ROADMAP.md; apps]. This is a diligence problem: the data room must reconcile build status before anyone relies on completion claims.

## Customer Definition

Primary customer: a US resident with a specific civic frustration, a desired outcome, and low willingness to research jurisdiction, officials, statutes, and letter format manually [evidence: .planning/GENESIS.md; .planning/PROJECT.md]. The user is likely mobile-first and non-technical [evidence: .planning/PROJECT.md].

Launch use cases are narrow: noise complaints, potholes, zoning, enforcement failures, school policy, local services, and other constituent communications [evidence: .planning/GENESIS.md]. Excluded use cases include legal advice, claim filing, formal regulatory submissions, legal filings, automated follow-up campaigns, and community/social features [evidence: .planning/REQUIREMENTS.md; MASTER_PLAN.md].

Economic buyer: the individual resident paying a one-time transaction fee [evidence: apps/api/src/routes/payments.ts]. Future organizational buyers such as HOAs and nonprofits are deferred, not part of launch [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

## Market Sizing

No external market research was available because this worker is workspace-only [evidence: dispatch]. Any market size below is an assumption, not evidence.

Bottom-up sizing method: annual paid transactions equal reachable residents with a civic issue multiplied by willingness-to-pay conversion and repeat usage [assumption: EIR model].

| Scenario | Annual paid transactions | Weighted average price | Annual gross revenue | Basis |
|---|---:|---:|---:|---|
| Validation floor | 1,200 [assumption: 100 paid submissions/month operating target] | $15 [assumption: midpoint of $5/$15/$25 tiers] | $18,000 [assumption: 1,200 x $15] | Shows whether a solo operator can run the loop |
| Niche solo business | 12,000 [assumption: 1,000 paid submissions/month after repeatable acquisition] | $15 [assumption: tier mix midpoint] | $180,000 [assumption: 12,000 x $15] | Plausible research asset / lifestyle business shape |
| Venture proof point | 250,000 [assumption: broad US civic-help demand with meaningful SEO reach] | $15 [assumption: tier mix midpoint] | $3,750,000 [assumption: 250,000 x $15] | Requires evidence of organic acquisition and deliverability |
| Venture-scale stretch | 1,000,000 [assumption: national consumer civic workflow adoption] | $15 [assumption: tier mix midpoint] | $15,000,000 [assumption: 1,000,000 x $15] | Not investible until conversion, retention, and CAC are proven |

The market-sizing conclusion is conservative: the repo does not yet prove a venture-scale outcome. It does show a coherent low-price workflow that could become a useful research asset if it validates paid submissions and delivery quality [evidence: apps/api/src/routes/payments.ts; apps/worker/src/agents/researcher.ts].

## Product And Workflow

The planned customer flow is: submit issue text, provide desired outcome and ZIP code, identify officials, research legal authorities, verify citations, draft per-official letters, preview, authenticate, pay, deliver, track status, and show replies [evidence: .planning/REQUIREMENTS.md; apps/api/src/routes/submissions.ts; apps/api/src/routes/payments.ts; apps/web/components/wizard; apps/web/components/dashboard].

The implementation uses an Express API on port 3001 [evidence: apps/api/src/index.ts], a Next.js web frontend [evidence: apps/web/app/page.tsx], a BullMQ worker with classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/index.ts], and PostgreSQL models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: packages/shared/prisma/schema.prisma].

The citation workflow is a core differentiator: the researcher prompt forbids invented citations, searches eCFR, CourtListener, and a state cache, verifies citations, strips unverified citations, and flags jobs if all citations fail while sources were found [evidence: apps/worker/src/agents/researcher.ts; apps/worker/src/lib/legal/citation-verifier.ts].

## Revenue Model

The live pricing route defines 3 tiers: single official at $5, three officials at $15, and full spread at $25 [evidence: apps/api/src/routes/payments.ts]. Payments are one-time Stripe Checkout sessions, not subscriptions [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md].

The repo claims a 40% net margin floor [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md], and tests assert pricing-tier cost estimates of $0.20, $0.40, and $0.60 per job with margins above 90% [evidence: tests/payment.test.ts]. Those estimates are implementation/test assumptions, not bank statements.

| Tier | Price | Planned official count | Test cost estimate | Implied contribution | Label |
|---|---:|---:|---:|---:|---|
| Single | $5.00 [evidence: apps/api/src/routes/payments.ts] | 1 [evidence: apps/api/src/routes/payments.ts] | $0.20 [evidence: tests/payment.test.ts] | $4.80 [assumption: $5.00 - $0.20] | Evidence-backed route, unvalidated demand |
| Three-pack | $15.00 [evidence: apps/api/src/routes/payments.ts] | 3 [evidence: apps/api/src/routes/payments.ts] | $0.40 [evidence: tests/payment.test.ts] | $14.60 [assumption: $15.00 - $0.40] | Evidence-backed route, unvalidated demand |
| Full spread | $25.00 [evidence: apps/api/src/routes/payments.ts] | all matched officials [evidence: apps/api/src/routes/payments.ts] | $0.60 [evidence: tests/payment.test.ts] | $24.40 [assumption: $25.00 - $0.60] | Evidence-backed route, unvalidated demand |

At 100 paid submissions/month [assumption: validation target], a $15 weighted price [assumption: midpoint tier mix] produces $1,500 monthly gross revenue [assumption: 100 x $15]. At $0.60 variable cost/job [evidence: tests/payment.test.ts], contribution is about $1,440 before fixed tools, support, chargebacks, taxes, and founder time [assumption: $1,500 - 100 x $0.60]. This reconciles arithmetically but does not validate willingness to pay.

## Financial Model

Known infrastructure and operating figures in the repo include an 8 vCPU / 16 GB RAM / 320 GB NVMe DigitalOcean backend at about $96/month [evidence: .planning/PROJECT.md; MASTER_PLAN.md], a $1,500 Mercury reserve [evidence: .planning/PROJECT.md], Mercury alerts at $2,000 warning and $500 emergency thresholds [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md], a $132.50/month max burn claim [evidence: .planning/PROJECT.md], and break-even at 11 submissions [evidence: .planning/PROJECT.md]. These are plan figures, not verified invoices.

| Metric | Conservative validation case | Source and reconciliation |
|---|---:|---|
| Monthly paid submissions | 100 [assumption: beta validation target] | Operator-set target |
| Weighted average price | $15 [assumption: midpoint of active tiers] | Ties to $5/$15/$25 pricing [evidence: apps/api/src/routes/payments.ts] |
| Monthly gross revenue | $1,500 [assumption: 100 x $15] | Reconciles to submissions x price |
| Monthly variable cost | $60 [assumption: 100 x $0.60] | Uses highest test cost estimate [evidence: tests/payment.test.ts] |
| Monthly contribution before fixed costs | $1,440 [assumption: $1,500 - $60] | Arithmetic, not accounting |
| Fixed infra baseline | $96/month [evidence: .planning/PROJECT.md; MASTER_PLAN.md] | DigitalOcean plan figure |
| Gross margin before fixed costs | 96% [assumption: ($1,500 - $60) / $1,500] | Must be replaced with real ledger data |
| Required payment conversion gate | 3% [evidence: .planning/PROJECT.md] | Planning validation gate, not measured |
| Target .gov inbox placement | 85% [evidence: .planning/PROJECT.md] | Planning validation gate, not measured |

The financial model is attractive only if the expensive parts remain rare: human review, refunds, deliverability remediation, official-directory maintenance, and legal/compliance review [assumption: EIR risk model].

## Go To Market

The repo's distribution hypothesis is SEO-first, where opt-in public campaign pages create long-tail civic content as a byproduct of paid usage [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. Secondary distribution is social sharing from public campaign pages [evidence: .planning/GENESIS.md]. Paid ads, app stores, partnerships, subscriptions, and organizational API sales are explicitly out of launch scope [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

Validation sequence:

- Deliver a closed beta with real payments and real delivery to a small set of civic issues [assumption: EIR operating plan].
- Measure willingness-to-pay conversion against the 3% planning gate [evidence: .planning/PROJECT.md].
- Measure government-email deliverability against the 85% inbox placement planning gate [evidence: .planning/PROJECT.md].
- Measure official coverage against the 95% federal/state and 60% local coverage planning gates [evidence: .planning/PROJECT.md].
- Only then decide whether to pitch a business or retain it as a personal/research asset [evidence: dispatch registry note].

## Competition

Named competitors and substitutes in the existing plan include Resistbot, Change.org, LegalZoom, Quorum, VoterVoice, and manual constituent outreach [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The repo states that enterprise civic advocacy tools serve organizations at $10k+/year rather than individuals [evidence: .planning/PROJECT.md]. Treat that as a repo claim until externally refreshed.

CivicState's differentiation is a narrower consumer workflow: research-backed, citation-verified, paid letter delivery for individuals [evidence: .planning/PROJECT.md; apps/worker/src/agents/researcher.ts]. Its disadvantage is trust: incumbents may have more brand recognition, deliverability history, official-contact coverage, and legal/compliance experience [assumption: competitive risk analysis].

## Risks And Anti-Plan

A skeptical partner should try to kill this deal on the following grounds:

- **Wrong asset identity:** wrk.dog says `brooks-history`; the repo says CivicState. Until the operator resolves the identity, this should not be pitched externally [evidence: dispatch; package.json].
- **Not investible by registry posture:** the registry calls it a watchlist personal/research asset, not near-term investible BOS [evidence: dispatch registry note].
- **Demand is unproven:** the repo has pricing and payments, but no evidence of paid users, conversion, retention, or support load [evidence: apps/api/src/routes/payments.ts; .planning/STATE.md].
- **Legal-adjacent risk can swamp the product:** users may submit threats, defamation, legal claims, or sensitive political opinions; the code has moderation and disclaimers, but no legal opinion is present [evidence: apps/api/src/lib/moderation.ts; .planning/REQUIREMENTS.md].
- **Deliverability may fail the core promise:** government inboxes may reject automated or AI-assisted letters; the repo itself flags email deliverability as the hardest problem [evidence: .planning/PROJECT.md].
- **Official data coverage is fragile:** Google Civic API shutdown is cited as a blocker, and local coverage depends on paid providers such as Cicero or BallotReady [evidence: .planning/PROJECT.md; apps/api/src/lib/officials].
- **Completion claims are unreliable:** roadmap, state, and existing-state files contradict the code and each other [evidence: .planning/ROADMAP.md; .planning/STATE.md; .planning/existing-state.md].

Anti-plan: do not spend on paid acquisition, partnership sales, enterprise API, multilingual support, certified mail, or community features until the first paid end-to-end cohort proves payment conversion, verified citations, inbox delivery, complaint rate, and operator workload [assumption: EIR operating constraint].

## Assumption Ledger

| Assumption | Label | Validation path |
|---|---|---|
| Residents will pay $5-$25 for a civic letter workflow | [assumption: repo hypothesis, no customer data in workspace] | Closed beta conversion and refunds |
| SEO can become primary distribution | [assumption: .planning/GENESIS.md hypothesis, no search data in workspace] | Publish opt-in pages and track impressions |
| AI can produce useful legal-source synthesis without hallucinated citations after verification | [assumption: technical thesis; verifier exists but production accuracy not measured] | Sample audits of generated letters |
| Email delivery to officials is sufficient for launch | [assumption: repo plan, no inbox data in workspace] | Postmark delivery and response metrics |
| One operator can handle routine exceptions in under 30 minutes/day | [evidence: .planning/PROJECT.md] | Time-and-motion log in beta |
| Local official coverage can be solved with Cicero or BallotReady | [assumption: provider evaluation not present in workspace] | Paid-provider spike and coverage report |

## Evidence Sources

- [evidence: package.json] Root package name, scripts, and product description.
- [evidence: .planning/PROJECT.md] Product definition, validation gates, pricing, constraints, and market verdict.
- [evidence: .planning/REQUIREMENTS.md] Requirement inventory, exclusions, compliance constraints, and launch scope.
- [evidence: .planning/ROADMAP.md] Historical phase roadmap and claimed completion.
- [evidence: .planning/STATE.md] Stale phase status and pending concerns.
- [evidence: .planning/existing-state.md] Earlier audit that now conflicts with current application code.
- [evidence: apps/api/src/routes/payments.ts] Active pricing tiers and Stripe Checkout route.
- [evidence: apps/api/src/routes/submissions.ts] Submission creation, moderation, audit logging, and queue handoff.
- [evidence: apps/worker/src/agents/researcher.ts] Legal-source search, synthesis, citation verification, stripping, and review flag.
- [evidence: packages/shared/prisma/schema.prisma] Data model.
- [evidence: tests/payment.test.ts] Pricing and cost-estimate assertions.

## Surprise Spikes

- The assigned project is `brooks-history`, but every substantive artifact found describes CivicState [evidence: dispatch; package.json; .planning/PROJECT.md].
- The repo already contains app code while `.planning/existing-state.md` says zero application source exists [evidence: .planning/existing-state.md; apps].
- The roadmap claims all phases complete while `.planning/STATE.md` says only Phase 1 is complete [evidence: .planning/ROADMAP.md; .planning/STATE.md].
- The planning docs claim a 72% conditional-go confidence and 91% gross margin [evidence: .planning/PROJECT.md], but the registry says watchlist and not near-term investible [evidence: dispatch registry note].

## Dated Status

This plan was upgraded on 2026-06-19 [evidence: dispatch current_date]. The prior planning baseline was generated or updated on 2026-04-25 [evidence: .planning/PROJECT.md; .planning/GENESIS.md; .planning/STATE.md]. The intake brief is dated 2026-04-10 [evidence: .planning/INTAKE-BRIEF.md]. External market freshness is stale by design because this run had no network access [evidence: dispatch].
