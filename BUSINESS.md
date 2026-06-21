# CivicState Business Plan

**As of:** 2026-06-21 [evidence: dispatch current_date]  
**Project identity under review:** dispatch names `brooks-history`, while repo implementation, package metadata, planning files, and product copy name CivicState [evidence: package.json; .planning/PROJECT.md; apps/web/app/page.tsx].  
**Authority status:** draft EIR soul upgrade; POM soul-review plus wrk.dog merge constitute adoption under operator ruling dated 2026-06-12 [evidence: dispatch brief].

## Thesis Current

CivicState is a civic-technology product that turns a resident's issue description and ZIP code into researched, citation-backed letters delivered to relevant public officials. The repo contains a real monorepo with Next.js, Express, BullMQ workers, Prisma schema, Stripe payment routes, Postmark delivery hooks, moderation, and admin surfaces [evidence: apps/web/app/page.tsx; apps/api/src/index.ts; packages/shared/prisma/schema.prisma; apps/worker/src/engine/state-machine.ts].

The investible thesis is not yet proven. The repo proves a buildable software direction; it does not prove demand, deliverability with public-sector inboxes, official response rates, or repeatable acquisition [evidence: .planning/GENESIS.md; .planning/STATE.md]. The registry watchlist note says this may be a personal/research asset rather than a near-term investible business [evidence: dispatch registry notes].

## Evidence Pack

- [package.json](package.json) identifies the repository as `civicstate` and describes an AI-powered civic advocacy platform [evidence].
- [apps/web/app/page.tsx](apps/web/app/page.tsx) ships public positioning, CTA, and launch price copy [evidence].
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) implements Stripe Checkout tiers of $5, $15, and $25 [evidence].
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) defines users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence].
- [.planning/ROADMAP.md](.planning/ROADMAP.md) records the intended multi-phase product plan and launch constraints [evidence].
- [MASTER_PLAN.md](MASTER_PLAN.md) preserves the original CivicState business and architecture blueprint [evidence].

No network research was available in this worker. External claims about market size, competitor behavior, civic-tech willingness to pay, API pricing, and inbox deliverability are therefore labeled as assumptions, not evidence.

## Freshness And Staleness

This plan is current as of 2026-06-21 [evidence: dispatch current_date]. The planning state file reports last activity on 2026-04-25 [evidence: .planning/STATE.md]. The intake brief is dated 2026-04-10 [evidence: .planning/INTAKE-BRIEF.md]. Those older planning files are useful evidence of intent, but they conflict with the current repository implementation and should not be treated as live operating metrics [evidence: .planning/existing-state.md; apps/api/src/index.ts].

## Customer Definition

Primary customer: a United States resident with a specific civic problem who wants a government action but does not know which official has jurisdiction, what law or policy supports the request, or how to write the message [assumption: repo positioning plus no live customer interviews in workspace].

Initial use cases include local service failures, zoning and permitting concerns, school policy complaints, enforcement requests, and legislative asks [assumption: examples in .planning/GENESIS.md plus no validated usage data].

The buyer is the same person as the user at launch. Government officials are recipients, not customers. Organizations such as HOAs, nonprofits, or local advocacy groups are deferred customers because the current code and plan emphasize consumer checkout before organization workflows [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

## Product Reality

What is real in the repository:

- A Next.js web application with a home page, submit flow, dashboard, admin pages, privacy, terms, and payment success/cancel routes [evidence: apps/web/app/page.tsx; apps/web/app/submit/page.tsx; apps/web/app/dashboard/page.tsx; apps/web/app/admin/page.tsx].
- An Express API with health, submissions, officials, webhooks, payments, campaigns, admin, and compliance routes [evidence: apps/api/src/index.ts].
- A Prisma data model for the core workflow and audit/ledger records [evidence: packages/shared/prisma/schema.prisma].
- BullMQ worker structure for classifier, researcher, drafter, delivery, treasury, and reconciliation queues [evidence: apps/api/src/index.ts; apps/worker/src/agents/researcher.ts].
- Moderation and citation-verification code paths before delivery [evidence: apps/api/src/routes/submissions.ts; apps/worker/src/agents/researcher.ts].

What is not proven in the repository:

- Live production traffic, paid submissions, customer interviews, official response rates, or retained users are not present [evidence: .planning/existing-state.md; .planning/STATE.md].
- Real local official coverage is unresolved because the plan still calls for a Cicero or BallotReady evaluation spike [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].
- The registry identity conflict means the operator must confirm whether this asset should pitch as CivicState, Brooks History, or a renamed research asset [evidence: dispatch registry notes].

## Revenue Model

The implemented launch revenue model is one-time checkout for civic letter packages:

| Package | Price | Included delivery count | Status |
|---|---:|---:|---|
| Single Official | $5 [evidence: apps/api/src/routes/payments.ts] | one official [evidence: apps/api/src/routes/payments.ts] | implemented in API route [evidence: apps/api/src/routes/payments.ts] |
| Three Officials | $15 [evidence: apps/api/src/routes/payments.ts] | three officials [evidence: apps/api/src/routes/payments.ts] | implemented in API route [evidence: apps/api/src/routes/payments.ts] |
| Full Spread | $25 [evidence: apps/api/src/routes/payments.ts] | all matched officials [evidence: apps/api/src/routes/payments.ts] | implemented in API route [evidence: apps/api/src/routes/payments.ts] |

Cost controls in the plan include a minimum 40% net margin floor [evidence: .planning/PROJECT.md], per-domain sending pause above 10% bounce rate [evidence: .planning/ROADMAP.md], Stripe/Mercury reconciliation discrepancies above $0.10 flagged for review [evidence: .planning/REQUIREMENTS.md], a Mercury reserve of $1,500 [evidence: .planning/PROJECT.md], reserve warning at $2,000 [evidence: .planning/ROADMAP.md], and emergency alert at $500 [evidence: .planning/ROADMAP.md].

The model should be treated as transactional services revenue until retention or organization demand is proven [assumption: no subscription code or customer data in workspace].

## Market Sizing

Because workspace-only mode prevents external research, market sizing is an experiment envelope rather than a claimed TAM.

Bottom-up wedge:

| Scenario | Paid submissions per month | Assumed average selling price | Monthly revenue | Annual run rate | Basis |
|---|---:|---:|---:|---:|---|
| Tiny beta | 100 [assumption: operator-testable launch target] | $15 [evidence: apps/api/src/routes/payments.ts] | $1,500 [assumption: 100 x $15] | $18,000 [assumption: $1,500 x twelve months] | proves checkout and delivery |
| Niche utility | 1,000 [assumption: local/SEO wedge target] | $15 [evidence: apps/api/src/routes/payments.ts] | $15,000 [assumption: 1,000 x $15] | $180,000 [assumption: $15,000 x twelve months] | supports a lean operator |
| Scaled consumer tool | 10,000 [assumption: not validated; requires SEO, coverage, and deliverability] | $15 [evidence: apps/api/src/routes/payments.ts] | $150,000 [assumption: 10,000 x $15] | $1,800,000 [assumption: $150,000 x twelve months] | venture-relevant only if CAC stays low |

The available market is broad in theory because civic complaints are common [assumption: general civic behavior, no external source available], but the serviceable obtainable market is currently constrained by official-contact coverage, email deliverability, user trust, and willingness to pay for a task many users believe should be free [assumption: EIR judgment in no-network mode].

## Financial Figures

The current repo supports a financial model but not financial performance. A disciplined launch model should reconcile as follows:

| Metric | Figure | Label |
|---|---:|---|
| Entry price | $5 [evidence: apps/api/src/routes/payments.ts] | implemented |
| Mid-tier price | $15 [evidence: apps/api/src/routes/payments.ts] | implemented |
| Premium launch price | $25 [evidence: apps/api/src/routes/payments.ts] | implemented |
| Backend droplet plan | $96/month [evidence: MASTER_PLAN.md] | planned, not verified bill |
| Mercury starting reserve | $1,500 [evidence: .planning/PROJECT.md] | planned constraint |
| Balance warning | $2,000 [evidence: .planning/ROADMAP.md] | planned alert |
| Balance emergency | $500 [evidence: .planning/ROADMAP.md] | planned alert |
| Minimum net margin floor | 40% [evidence: .planning/PROJECT.md] | planned control |
| Bounce-rate pause threshold | 10% [evidence: .planning/ROADMAP.md] | planned control |

Reconciliation check: at the niche utility scenario, 1,000 paid submissions [assumption: test envelope] multiplied by $15 ASP [evidence: apps/api/src/routes/payments.ts] equals $15,000 monthly revenue [assumption: arithmetic]. Any forecast higher than that must show either higher volume, higher ASP, organization pricing, or recurring revenue.

## Go To Market

Launch motion should be narrow and evidence-seeking:

- Start with a private beta of residents who already have a specific civic issue [assumption: minimizes vague activism traffic].
- Require successful end-to-end delivery before public acquisition claims [evidence: .planning/ROADMAP.md].
- Publish only opt-in, read-only campaign pages after legal/compliance review [evidence: MASTER_PLAN.md].
- Use SEO as a hypothesis, not a plan fact; no search impressions or rankings exist in workspace [evidence: .planning/existing-state.md].
- Avoid paid acquisition until conversion and deliverability are measured [assumption: low-price transactional product likely cannot support paid CAC before proof].

Validation gates before scaling:

- Payment conversion at or above 3% [assumption: explicit prior planning target in .planning/PROJECT.md, unvalidated].
- Inbox placement at or above 85% for government domains [assumption: explicit prior planning target in .planning/PROJECT.md, unvalidated].
- Federal/state official coverage at or above 95% and local coverage at or above 60% [assumption: explicit prior planning target in .planning/PROJECT.md, unvalidated].

## Competition

Named competitive set:

| Competitor | Position | CivicState risk |
|---|---|---|
| Resistbot | Constituent messaging workflow [assumption: named in repo planning, no network verification] | users may prefer free/simple messaging over paid research |
| Change.org | Petition creation and sharing [assumption: named in MASTER_PLAN.md, no network verification] | petitions may feel more social and familiar |
| LegalZoom | Consumer document drafting brand [assumption: named in MASTER_PLAN.md, no network verification] | broader trust brand could move into civic templates |
| Quorum | Enterprise public-affairs workflow [assumption: named in .planning/PROJECT.md, no network verification] | organizations may already have tools |
| VoterVoice | Advocacy software for organizations [assumption: named in .planning/PROJECT.md, no network verification] | B2B advocacy market may be hard to enter bottom-up |
| Manual outreach | Direct email/phone/contact forms [assumption: inherent substitute] | free alternative caps pricing power |

CivicState's differentiation is the bundled workflow: identify the right official, research supporting authority, draft the message, verify citations, collect payment, and deliver. That bundle is visible in the repo, but customer preference for the bundle is not validated [evidence: apps/api/src/routes/submissions.ts; apps/worker/src/agents/researcher.ts; apps/api/src/routes/payments.ts].

## Risks And Anti-Plan

The bearish partner memo is simple: do not fund this as a venture business yet.

Identity risk: the registry says `brooks-history`, while the repo says CivicState. That could mean the wrong asset is being pitched, the registry is stale, or the repo has been repurposed without portfolio hygiene [evidence: dispatch registry notes; package.json].

Demand risk: civic outreach is a low-frequency behavior. Even users with strong complaints may not pay $5 to $25 [evidence: apps/api/src/routes/payments.ts] when direct contact is free [assumption: manual outreach substitute].

Recipient risk: officials may ignore AI-assisted constituent letters or treat them as spam, destroying the value proposition despite technically successful delivery [assumption: no official-response evidence in workspace].

Compliance risk: legal and political-speech sensitivity can create reputational and compliance exposure. The code includes moderation, audit, AI disclosure, and not-legal-advice concepts, but no legal opinion is present [evidence: apps/api/src/lib/moderation.ts; apps/web/app/terms/page.tsx].

Moat risk: the moat is weak until volume creates verified official data, citation reuse, and indexed public campaign pages. At zero live campaigns [evidence: .planning/existing-state.md], the defensibility claim is only a hypothesis.

Anti-plan: do not scale marketing, do not pursue institutional customers, do not pitch TAM, and do not add more agents until the product proves paid conversion, deliverability, official coverage, and user-perceived value in a narrow beta [assumption: EIR operating judgment].

## Assumption Ledger

| Assumption | Why it matters | Validation method | Owner |
|---|---|---|---|
| Users will pay at least $5 for a single-official send [evidence: apps/api/src/routes/payments.ts] | unlocks the transactional model | private beta checkout test | operator |
| Average selling price can hold near $15 [evidence: apps/api/src/routes/payments.ts] | drives revenue envelope | paid tier mix after launch | operator |
| Government inbox deliverability can stay below 10% bounce rate [evidence: .planning/ROADMAP.md] | delivery is the product | Postmark webhook monitoring | operator |
| Verified citations increase trust rather than friction | supports premium differentiation | user interviews and conversion A/B | operator |
| Local official data can be acquired affordably | determines coverage quality | provider spike for Cicero or BallotReady [evidence: .planning/PROJECT.md] | builder |
| SEO can create low-CAC acquisition | required for low-price economics | opt-in public page indexing and impressions | operator |
| Brooks History registry identity is a clerical mismatch | affects portfolio presentation | operator ruling before wrk.vc publication | operator |

## Surprise Spikes

- The dispatch identifies the project as `brooks-history`, but the repo's product name, package metadata, code, and planning files identify CivicState [evidence: dispatch registry notes; package.json; apps/web/app/page.tsx].
- `.planning/existing-state.md` says no application source exists, but the current repo contains apps, packages, tests, Prisma schema, and implementation code [evidence: .planning/existing-state.md; apps/api/src/index.ts; packages/shared/prisma/schema.prisma].
- `.planning/STATE.md` says the project is Phase One complete, while `.planning/ROADMAP.md` marks later phases complete and implementation files exist for payments, admin, compliance, and delivery [evidence: .planning/STATE.md; .planning/ROADMAP.md; apps/api/src/routes/payments.ts].

## Investment Verdict

Status: watchlist, not near-term investible [evidence: dispatch registry notes].

The correct next step is not fundraising. It is identity cleanup, beta validation, and evidence production. If the operator confirms this is a CivicState asset and beta metrics show paid conversion, deliverability, and official coverage, it can graduate from research asset to seedable civic-tech experiment. Until then, the honest label is: buildable product, unvalidated business [assumption: EIR synthesis of workspace evidence].
