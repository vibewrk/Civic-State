# CivicState Business Plan

Document date: 2026-06-19 [evidence: wrk.dog dispatch current_date]. Status: proposed soul upgrade, not operator-adopted [evidence: registry dispatch].

## Executive Snapshot

CivicState is a civic communications product in the current repository: a Next.js, Express, PostgreSQL, Redis/BullMQ, Stripe, Postmark, Clerk, and Anthropic-backed platform that turns a resident's civic concern into researched, citation-backed letters to public officials [evidence: package.json; apps/web/app/page.tsx; packages/shared/prisma/schema.prisma; apps/api/src/routes/submissions.ts; apps/worker/src/agents/researcher.ts].

The investible thesis is conditional, not current. The registry labels this project as a watchlist personal/research asset and asks the operator to confirm whether it should pitch as a business [evidence: registry dispatch]. As of 2026-06-19 [evidence: wrk.dog dispatch current_date], the strongest plan is a validation-stage civic SaaS/transactional product, not a venture-ready company.

Snapshot: citation-backed constituent letters for $5, $15, or $25 per paid campaign [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts], with the hard questions concentrated in demand, deliverability, official data coverage, legal/compliance posture, and whether users trust AI-written civic correspondence [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

## Thesis Current

The current thesis is: US residents with specific civic frustrations will pay a small one-time fee when CivicState removes the hard work of identifying jurisdiction, finding applicable law, drafting a professional letter, and delivering it to the right officials [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

This is not yet a proven business thesis. The repo contains product architecture, routes, workers, tests, and planning artifacts, but no workspace evidence of paid customers, live deliverability, official responses, conversion, retention, or CAC [evidence: .planning/STATE.md; tests/payment.test.ts; tests/campaigns.test.ts]. Therefore, every go-to-market, market-size, and scale claim below is an assumption unless explicitly tied to repo files.

## What Exists Now

The repo contains a monorepo with apps/web, apps/api, apps/worker, and packages/shared [evidence: package.json; pnpm-workspace.yaml]. The database schema covers users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].

Implemented or scaffolded capabilities include submission creation with ZIP validation and moderation [evidence: apps/api/src/routes/submissions.ts], official lookup across congress.gov, OpenStates, and Cicero adapters [evidence: apps/api/src/lib/officials/lookup.ts], hardcoded Stripe pricing tiers [evidence: apps/api/src/routes/payments.ts], Stripe and Postmark webhook handlers [evidence: apps/api/src/routes/webhooks.ts], a delivery worker with opt-out and bounce-rate checks [evidence: apps/worker/src/agents/delivery.ts], and a research worker that searches eCFR, CourtListener, and a state cache before verifying citations [evidence: apps/worker/src/agents/researcher.ts].

The current repo also contains an older planning-state mismatch: `.planning/STATE.md` says Phase Foundation is complete and Phase AI Pipeline still needs planning, while `.planning/ROADMAP.md` marks all phases complete [evidence: .planning/STATE.md; .planning/ROADMAP.md]. The business plan should trust code and tests over checklist completion claims.

## Customer Definition

Primary customer: an individual US resident with a specific civic concern who would contact government if research, drafting, targeting, and delivery were handled for them [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

Initial use cases: local enforcement issues, agency responsiveness, constituent requests, school or municipal concerns, zoning/noise/pothole-style problems, and policy requests that remain constituent communications rather than legal filings [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

Non-customers in v1: organizations, HOAs, nonprofits, businesses acting as businesses, people seeking legal advice, people filing claims, users targeting private individuals, and users seeking harassment or threats [evidence: .planning/PROJECT.md; MASTER_PLAN.md; apps/api/src/lib/moderation.ts].

## Problem And Wedge

The wedge is not "write me a letter." The wedge is the bundled workflow: classify the issue, identify public officials, research authority, verify citations, draft compliant letters, take payment, deliver, and track status [evidence: .planning/PROJECT.md; packages/shared/prisma/schema.prisma; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts].

The reason this may matter is that the manual alternative spans several tasks most residents abandon: jurisdiction mapping, source research, formal drafting, and official routing [evidence: .planning/GENESIS.md]. The riskiest premise is willingness to pay: the existing plan explicitly says demand is unvalidated [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

## Product Surface

Launch surface is a responsive web app with a `/submit` flow, public homepage, dashboard, admin area, privacy page, and terms page [evidence: apps/web/app/page.tsx; apps/web/app/submit/page.tsx; apps/web/app/dashboard/page.tsx; apps/web/app/admin/page.tsx; apps/web/app/privacy/page.tsx; apps/web/app/terms/page.tsx].

The backend surface includes health, submissions, officials, payments, campaigns, admin, compliance, and webhooks routes [evidence: apps/api/src/index.ts; apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts].

The operational surface includes BullMQ-based agents for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/agents/classifier.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/worker/src/agents/delivery.ts; apps/worker/src/agents/treasury.ts; apps/worker/src/agents/reconciliation.ts].

## Revenue Model

The repo-backed revenue model is one-time transactional pricing: Single Official at $5.00, Three Officials at $15.00, and All Officials at $25.00 [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts]. There is no active subscription plan in the current v2.1 master plan [evidence: MASTER_PLAN.md].

Financial build, workspace-only model:

| Unit | Revenue | Variable cost | Gross profit | Gross margin | Label |
| --- | ---: | ---: | ---: | ---: | --- |
| Single Official package | $5.00 [evidence: apps/api/src/routes/payments.ts] | $0.20 [evidence: tests/payment.test.ts] | $4.80 [assumption: arithmetic from evidenced price and test cost] | 96% [assumption: $4.80 / $5.00 arithmetic] | repo-backed tier |
| Three Officials package | $15.00 [evidence: apps/api/src/routes/payments.ts] | $0.40 [evidence: tests/payment.test.ts] | $14.60 [assumption: arithmetic from evidenced price and test cost] | 97.3% [assumption: $14.60 / $15.00 arithmetic] | repo-backed tier |
| All Officials package | $25.00 [evidence: apps/api/src/routes/payments.ts] | $0.60 [evidence: tests/payment.test.ts] | $24.40 [assumption: arithmetic from evidenced price and test cost] | 97.6% [assumption: $24.40 / $25.00 arithmetic] | repo-backed tier |
| Monthly pilot at 100 paid campaigns | $1,350 [assumption: 40/40/20 tier mix on evidenced prices] | $40 [assumption: 40/40/20 tier mix on evidenced test costs] | $1,310 [assumption: arithmetic] | 97.0% [assumption: arithmetic] | validation case |
| Monthly small scale at 1,000 paid campaigns | $13,500 [assumption: same tier mix] | $400 [assumption: same tier-cost model] | $13,100 [assumption: arithmetic] | 97.0% [assumption: arithmetic] | scale case |
| Fixed infrastructure baseline | $96/month DigitalOcean droplet [evidence: MASTER_PLAN.md] | $96/month [evidence: MASTER_PLAN.md] | not applicable | not applicable | planned hosting |

This table intentionally excludes Stripe fees, Postmark fees beyond the test cost assumptions, support labor, legal review, local-data provider subscriptions, refunds, chargebacks, and tax treatment because the workspace does not provide sourced current values for those items [assumption: omitted-cost caution]. The existing plan requires a 40% net margin floor after fees [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts], but the current hardcoded pricing route does not appear to calculate a live margin floor per job [evidence: apps/api/src/routes/payments.ts].

## Market Sizing

No sourced TAM is available in the workspace, and network research is disabled. Therefore, this plan does not assert a top-down civic-tech TAM [assumption: workspace-only research limit].

The buildable sizing method is bottom-up:

| Funnel scenario | Qualified monthly visitors | Paid conversion | Paid campaigns | Average order value | Monthly revenue |
| --- | ---: | ---: | ---: | ---: | ---: |
| Validation floor | 1,000 [assumption: initial owned/organic traffic scenario] | 3% [evidence: .planning/PROJECT.md validation gate] | 30 [assumption: 1,000 x 3%] | $13.50 [assumption: 40/40/20 mix on evidenced prices] | $405 [assumption: 30 x $13.50] |
| Pilot traction | 10,000 [assumption: SEO scenario, not sourced market fact] | 3% [evidence: .planning/PROJECT.md validation gate] | 300 [assumption: 10,000 x 3%] | $13.50 [assumption: tier mix] | $4,050 [assumption: 300 x $13.50] |
| Operator-scale watchlist | 100,000 [assumption: scaled organic scenario requiring validation] | 3% [evidence: .planning/PROJECT.md validation gate] | 3,000 [assumption: 100,000 x 3%] | $13.50 [assumption: tier mix] | $40,500 [assumption: 3,000 x $13.50] |

This is a validation market model, not a claim of obtainable demand. The correct next evidence is paid conversion, deliverability, repeat submissions, official response rate, and customer acquisition source mix [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

## Go To Market

The existing go-to-market hypothesis is SEO-first: opt-in public campaign pages create long-tail civic query pages and social sharing can amplify successful stories [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. Paid ads, app stores, and partnerships are explicitly not planned for launch [evidence: .planning/GENESIS.md].

That GTM is attractive because it avoids early CAC spend [assumption: standard bootstrapped reasoning], but it is also slow and unproven. Public pages may create privacy, moderation, duplication, and indexing risks, and the repo does not prove that public campaign pages are implemented end-to-end [evidence: apps/web/app; .planning/GENESIS.md].

Validation gates should be: first paid end-to-end delivery by 2026-07-31 [assumption: operator validation target], at least 85% inbox placement to .gov domains before scale [evidence: .planning/PROJECT.md], paid conversion at or above 3% on qualified preview viewers [evidence: .planning/PROJECT.md], and chargeback rate below 0.5% [evidence: .planning/PROJECT.md].

## Competition

Named competitors already identified in repo planning are Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

Positioning:

| Competitor | Repo-described position | CivicState angle | Risk |
| --- | --- | --- | --- |
| Resistbot | SMS letters to lawmakers [evidence: MASTER_PLAN.md] | More research and citations [evidence: MASTER_PLAN.md] | Resistbot may remain simpler and free or cheaper [assumption: competitive risk] |
| Change.org | Petition hosting [evidence: MASTER_PLAN.md] | Individual researched letters and delivery [evidence: MASTER_PLAN.md] | Petitions have social proof CivicState lacks [assumption: competitive risk] |
| LegalZoom | Document drafting [evidence: MASTER_PLAN.md] | Civic-specific and lower priced [evidence: MASTER_PLAN.md] | LegalZoom has brand trust CivicState lacks [assumption: competitive risk] |
| Quorum | Enterprise civic/lobbying tooling [evidence: .planning/PROJECT.md] | Individual self-serve transaction [evidence: .planning/PROJECT.md] | Enterprise tools can bundle constituent action with existing customers [assumption: competitive risk] |
| VoterVoice | Advocacy platform for organizations [evidence: .planning/PROJECT.md] | Direct-to-resident workflow [evidence: .planning/PROJECT.md] | Organization-led advocacy may have stronger distribution [assumption: competitive risk] |

## Compliance And Sensitivities

This product handles political/civic opinion, personally identifying information, delivery records, and possibly sensitive allegations. The repo plans application-level AES-256-GCM encryption for Tier 1 fields, append-only ledger/audit logs with HMAC checksums, soft deletion, CCPA/GDPR deletion workflow, and AI disclosure [evidence: packages/shared/prisma/schema.prisma; packages/shared/src/crypto.ts; packages/shared/src/hmac.ts; .planning/REQUIREMENTS.md].

The plan also classifies letters as needing CAN-SPAM compliance and includes opt-out, physical address, accurate headers, and suppression workflows [evidence: .planning/REQUIREMENTS.md; MASTER_PLAN.md; apps/worker/src/agents/delivery.ts]. No legal conclusion is asserted here; this is an operator risk constraint requiring counsel validation before scale [assumption: legal validation required].

## Risks And Anti-Plan

A skeptical partner should try to kill this deal on the following grounds.

First, demand is not proven. The repo says "none yet - ship to validate" for validated requirements [evidence: .planning/PROJECT.md]. A user may like a free preview and still refuse to pay $5 to $25 [evidence: apps/api/src/routes/payments.ts; assumption: willingness-to-pay risk].

Second, deliverability may break the product. Government inboxes, domain reputation, opt-outs, bounces, spam complaints, and reply routing are operationally central, and the plan itself calls email deliverability the hardest problem [evidence: .planning/PROJECT.md; apps/worker/src/agents/delivery.ts].

Third, citation quality is existential. If the AI fabricates, misapplies, or overstates legal authority, the product loses trust and may create legal/compliance exposure [evidence: apps/worker/src/agents/researcher.ts; tests/citation-verifier.test.ts].

Fourth, the official-data layer is fragile. The existing plan says the Google Civic Representatives endpoint is dead and local coverage requires evaluating Cicero or BallotReady [evidence: .planning/PROJECT.md]. The repo has adapters, but no workspace evidence proves nationwide coverage [evidence: apps/api/src/lib/officials/lookup.ts].

Fifth, one-operator moderation may not scale. The product intentionally excludes 24/7 staffing and relies on exception handling [evidence: .planning/PROJECT.md], but civic submissions naturally include allegations, threats, emergencies, and defamation risk [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts].

Sixth, this may be a personal/research asset rather than a company. The registry explicitly says watchlist and asks operator confirmation before pitching it as a business [evidence: registry dispatch].

## Assumption Ledger

| Assumption | Label | Validation method | Residual risk |
| --- | --- | --- | --- |
| Users will pay for letter delivery after seeing a preview | [assumption: no paid customer evidence in workspace] | Track preview-to-checkout conversion for first 1,000 qualified visitors [assumption: validation sample] | High |
| SEO can acquire enough qualified users | [assumption: GTM hypothesis from planning docs] | Ship opt-in public pages and measure impressions, clicks, and conversion by 2026-08-31 [assumption: operator target date] | High |
| Citation verification can keep hallucinations out of delivered letters | [assumption: technical design implemented, production quality unproven] | Run adversarial issue set and require 0 delivered fabricated citations [assumption: quality gate] | High |
| Government email delivery can stay above 85% inbox placement | [evidence: .planning/PROJECT.md validation gate] | Seed-list and live-domain monitoring before scale | High |
| One operator can review flagged content within 24 hours | [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md] | Measure flagged queue depth and oldest age during beta | Medium |
| Tier pricing can preserve a 40% net margin floor | [evidence: .planning/PROJECT.md; tests/payment.test.ts] | Add live per-job cost accounting and fee-inclusive margin checks | Medium |

## Financial Figures And Controls

Key financial figures currently evidenced by repo/planning files: $5, $15, and $25 pricing tiers [evidence: apps/api/src/routes/payments.ts], $0.20, $0.40, and $0.60 test cost estimates [evidence: tests/payment.test.ts], $96/month DigitalOcean droplet baseline [evidence: MASTER_PLAN.md], $1,500 Mercury reserve [evidence: .planning/PROJECT.md], $2,000 warning threshold and $500 emergency threshold [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md], 40% margin floor [evidence: .planning/PROJECT.md], 10% bounce pause threshold [evidence: apps/worker/src/agents/delivery.ts], and 0.5% chargeback ceiling [evidence: .planning/PROJECT.md].

The main financial gap is that pricing is hardcoded while the plan describes dynamic job-level margin enforcement [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md]. Before any external pitch, the product needs a reconciled cost ledger that includes model tokens, email costs, Stripe fees, refunds, human review time, local data provider costs, and hosting [assumption: finance control requirement].

## Evidence Sources And Freshness

Primary repo evidence read for this upgrade:

- `.planning/PROJECT.md` last updated 2026-04-25 [evidence: .planning/PROJECT.md].
- `.planning/ROADMAP.md` lists all four original phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md].
- `.planning/STATE.md` says Phase Foundation complete and Phase AI Pipeline not yet planned as of 2026-04-25 [evidence: .planning/STATE.md].
- `MASTER_PLAN.md` is v2.1 from March 2026 [evidence: MASTER_PLAN.md].
- `package.json`, `apps/`, `packages/shared/`, and `tests/` show current code/test surfaces [evidence: package.json; apps; packages/shared; tests].
- Registry dispatch on 2026-06-19 labels the project watchlist/personal-research-sensitive [evidence: registry dispatch].

Freshness warning: all external-market context in this plan is stale or unsourced because network access is disabled. Any investor-facing use requires current external verification [assumption: workspace-only limitation].

## Surprise Spikes

The dispatch says project `brooks-history` and repo `RPLogic-Inc/brookss-history`, but the repository's product, package name, planning docs, and UI all say CivicState [evidence: registry dispatch; package.json; .planning/PROJECT.md; apps/web/app/page.tsx]. This is not a cosmetic issue; it affects data-room trust.

The project is marked as a watchlist personal/research asset by registry context, while the existing docs pitch a transactional civic-tech business [evidence: registry dispatch; .planning/PROJECT.md; MASTER_PLAN.md]. Operator confirmation is needed before wrk.vc presents it as investible.

The existing roadmap completion claims conflict with state and code-read evidence [evidence: .planning/ROADMAP.md; .planning/STATE.md; apps]. This upgrade treats the build as partially implemented and validation-incomplete, not done.

## Decision

Decision as of 2026-06-19 [evidence: wrk.dog dispatch current_date]: keep CivicState on the watchlist as a validation-stage asset. Do not pitch as near-term investible until the identity mismatch is resolved, a paid beta proves willingness to pay, deliverability clears the repo's 85% target [evidence: .planning/PROJECT.md], and the product demonstrates citation safety in live workflows.

