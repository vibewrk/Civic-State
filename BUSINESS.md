# CivicState / brooks-history Business Plan

## Snapshot

As of 2026-06-20 [evidence: runtime dispatch], the repository's registry identity is `brooks-history` [evidence: dispatch registry notes], while the implemented and planned product inside the repo is CivicState: a civic-tech web app that turns a resident's issue into researched, citation-backed letters to government officials [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

Current thesis: CivicState may become a small paid civic-action utility, but it is not yet a VC-grade investible business. The watchlist registry note says this may be a personal/research asset and asks the operator to confirm whether it should pitch as a business [evidence: dispatch registry notes]. Until that ruling, treat this as a diligence-grade plan, not an investment memo.

## Dated Evidence Standard

This soul upgrade was written in workspace-only mode on 2026-06-20 [evidence: runtime dispatch]. No network research was available [evidence: dispatch instruction], so repository files are cited as evidence and all external market claims are labeled assumptions. The principal evidence sources are MASTER_PLAN.md dated March 2026 [evidence: MASTER_PLAN.md], .planning/PROJECT.md last updated 2026-04-25 [evidence: .planning/PROJECT.md], .planning/REQUIREMENTS.md defined 2026-04-25 [evidence: .planning/REQUIREMENTS.md], and code/tests under `apps/`, `packages/`, and `tests/` [evidence: repo source tree].

## Product And Customer Definition

CivicState serves ordinary United States residents who have a specific civic issue, know what outcome they want, and are willing to pay for research, official targeting, drafting, and delivery rather than doing the work manually [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

The launch customer is an individual constituent, not a nonprofit, enterprise advocacy team, law firm, or lobbying shop [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The passive recipient is a government official or office; officials are not the paying customer [evidence: .planning/PROJECT.md].

The active product is a letter workflow: issue submission, ZIP-based targeting, citation-backed research, letter drafting, preview, one-time payment, email delivery, dashboard tracking, moderation, and compliance/audit controls [evidence: .planning/REQUIREMENTS.md; apps/api/src/routes/submissions.ts; apps/api/src/routes/payments.ts; packages/shared/prisma/schema.prisma].

## Problem

The job-to-be-done is real but unvalidated: residents often abandon civic action because they do not know jurisdiction, applicable law, official contacts, or formal writing conventions [evidence: .planning/GENESIS.md] [assumption: product-founder hypothesis, not market-tested in this repo].

The hardest operational problem is not drafting. It is trusted delivery into government inboxes, correct official routing, citation integrity, content moderation, and avoiding the legal-advice/lobbying boundary [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

## Solution

CivicState compresses a multi-step civic writing task into a guided form and paid delivery workflow [evidence: .planning/PROJECT.md]. The codebase now contains a Next.js web app, Express API, BullMQ worker, Prisma schema, pricing tiers, moderation pipeline, official lookup modules, legal citation verifier modules, dashboard/admin pages, and tests around payment, compliance, delivery, moderation, and treasury [evidence: apps/web; apps/api; apps/worker; packages/shared; tests].

The v1 product promise is narrow: constituent communications only, email-first delivery, one-time payments, no legal advice, no regulatory filings, no subscriptions, no public social network at launch [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

## What Is Real Today

Implemented repository surface includes three app workspaces and one shared package [evidence: package.json; pnpm-workspace.yaml; apps/*/package.json; packages/shared/package.json]. The Prisma schema includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].

Payment code exposes three Stripe Checkout tiers: `$5.00` single official, `$15.00` three officials, and `$25.00` all matched officials [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts]. The worker state machine supports submitted, classifying, researching, drafting, payment pending, paid, delivering, delivered, and failed statuses [evidence: apps/worker/src/engine/state-machine.ts].

No production traction file, customer cohort file, live revenue report, or deployment proof was found in the repository during this review [evidence: repo file scan; .planning/existing-state.md]. Treat current revenue as `$0` until the operator supplies production Stripe or ledger exports [assumption: absence of production metrics in workspace].

## Surprise Spikes

Project identity conflict: registry says `brooks-history`, but the repository content is CivicState civic tech [evidence: dispatch registry notes; MASTER_PLAN.md; .planning/PROJECT.md]. Operator must decide whether this repo is truly the CivicState business or a personal/research asset.

Roadmap truth conflict: .planning/ROADMAP.md marks all major phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while .planning/STATE.md says only Phase Foundation is complete and later phase planning remains needed [evidence: .planning/STATE.md]. The root roadmap below treats the codebase as implementation-present but validation-incomplete.

Current code appears more advanced than .planning/existing-state.md, which still describes zero application code [evidence: .planning/existing-state.md; apps/api; apps/web; apps/worker]. That planning artifact is stale and should not be used as the sole data-room truth.

## Market Sizing

Because workspace-only mode prevents external research, market sizing is bottom-up and assumption-led. The addressable launch segment is residents who have a concrete civic issue, can pay a low one-time fee, and accept email-first official outreach [evidence: .planning/PROJECT.md] [assumption: no external survey or traffic data available].

Validation market: `1` metro launch geography [assumption: contained beta design based on .planning/PROJECT.md beta-gate language] with `500` monthly qualified issue-intent visitors [assumption: SEO/social/direct beta traffic estimate], `3%` paid conversion [evidence: .planning/PROJECT.md names this as a validation gate], and `$15.00` average order value [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts]. That yields `15` paid submissions per month and `$225.00` monthly revenue [assumption: 500 x 3% x $15.00].

Near-term operating market: `10` similar metros [assumption: repeatable local expansion], `2,000` qualified visitors per metro per month [assumption: SEO/content upside not yet proven], `3%` paid conversion [evidence: .planning/PROJECT.md], and `$16.00` average order value [evidence: MASTER_PLAN.md Month Six scenario]. That yields `600` paid submissions per month and `$9,600.00` monthly revenue [assumption: 10 x 2,000 x 3% x $16.00].

This is not a credible venture-scale TAM yet. It is a validation funnel with a plausible path to a small owner-operated business if conversion, deliverability, and repeatable local acquisition work [assumption: market judgment without external research].

## Revenue Model And Pricing

Revenue is transactional. Users pay once per campaign package through Stripe Checkout before delivery [evidence: apps/api/src/routes/payments.ts; .planning/REQUIREMENTS.md]. The implemented tiers are `$5.00`, `$15.00`, and `$25.00` [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts].

The prior master plan targets a minimum `40%` net margin floor after Stripe fees [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. Repository tests assert cost estimates of `20` cents, `40` cents, and `60` cents for the three tiers and margins above `90%` before broader operating costs [evidence: tests/payment.test.ts]. The master plan models variable COGS near `8%` of revenue and Stripe fees near `4%` of revenue [evidence: MASTER_PLAN.md].

Future API, certified mail, coalition, public campaign, and organization features are deferred and should not be treated as active revenue [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

## Financial Model

The following model reconciles submissions x average order value to revenue. It is not actual performance.

| Period | Paid submissions | Average order value | Revenue | Variable COGS | Stripe fees | Fixed platform cost | Operating contribution |
|---|---:|---:|---:|---:|---:|---:|---:|
| Beta quarter | `150` [assumption: 50 monthly submissions from MASTER_PLAN.md Month Three scenario] | `$15.00` [evidence: MASTER_PLAN.md; pricing code] | `$2,250.00` [assumption: 150 x $15.00] | `$180.00` [evidence: MASTER_PLAN.md 8% COGS assumption] | `$90.00` [evidence: MASTER_PLAN.md 4% fee assumption] | `$600.00` [evidence: MASTER_PLAN.md $200/mo fixed cost] | `$1,380.00` [assumption: revenue minus listed costs] |
| Early SEO quarter | `360` [assumption: 120 monthly submissions from MASTER_PLAN.md Month Six scenario] | `$16.00` [evidence: MASTER_PLAN.md] | `$5,760.00` [assumption: 360 x $16.00] | `$460.80` [evidence: MASTER_PLAN.md 8% COGS assumption] | `$230.40` [evidence: MASTER_PLAN.md 4% fee assumption] | `$600.00` [evidence: MASTER_PLAN.md $200/mo fixed cost] | `$4,468.80` [assumption: revenue minus listed costs] |
| Traction quarter | `750` [assumption: interpolation between Month Six and Month Twelve scenarios] | `$17.00` [assumption: pricing mix between MASTER_PLAN.md scenarios] | `$12,750.00` [assumption: 750 x $17.00] | `$1,020.00` [evidence: MASTER_PLAN.md 8% COGS assumption] | `$510.00` [evidence: MASTER_PLAN.md 4% fee assumption] | `$600.00` [evidence: MASTER_PLAN.md $200/mo fixed cost] | `$10,620.00` [assumption: revenue minus listed costs] |
| Local authority quarter | `1,200` [assumption: 400 monthly submissions from MASTER_PLAN.md Month Twelve scenario] | `$18.00` [evidence: MASTER_PLAN.md] | `$21,600.00` [assumption: 1,200 x $18.00] | `$1,728.00` [evidence: MASTER_PLAN.md 8% COGS assumption] | `$864.00` [evidence: MASTER_PLAN.md 4% fee assumption] | `$600.00` [evidence: MASTER_PLAN.md $200/mo fixed cost] | `$18,408.00` [assumption: revenue minus listed costs] |

Modeled first-year revenue is `$42,360.00` [assumption: sum of table revenue]. Modeled first-year operating contribution is `$34,876.80` [assumption: sum of table contribution]. This is attractive for a lean operator but not VC-scale without a distribution breakthrough or a higher-value customer segment [assumption: investment judgment].

## Competition

Resistbot is the closest civic-letter competitor: low-friction constituent messaging but not positioned around paid citation-backed legal/regulatory research [assumption: category knowledge; not externally verified in workspace]. Change.org competes for petition attention and issue discovery, but petition signatures differ from personalized official letters [assumption: category knowledge]. Quorum and VoterVoice serve organizations rather than individual residents [assumption: category knowledge; .planning/PROJECT.md asserts enterprise positioning]. LegalZoom competes for document trust, but CivicState explicitly avoids legal advice and filings [evidence: MASTER_PLAN.md] [assumption: category positioning].

CivicState's differentiation is the combination of resident-friendly price, official targeting, citation verification, letter drafting, delivery, and compliance controls in one workflow [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; apps/api; apps/worker].

## Go-To-Market

The only credible launch motion in the current repo is a constrained beta: start with one metro, one issue category cluster, and a small set of beta users before broad SEO claims [evidence: MASTER_PLAN.md soft-launch language] [assumption: operator can recruit beta users].

The repo's distribution hypothesis is SEO from opt-in public campaign pages and civic reference content [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. That is plausible but unproven. The first validation gates should be paid conversion of at least `3%` [evidence: .planning/PROJECT.md], government inbox placement of at least `85%` [evidence: .planning/PROJECT.md], and official data coverage of at least `95%` federal/state and `60%` local [evidence: .planning/PROJECT.md].

Paid ads, partnerships, subscriptions, organization API, certified mail, and multilingual expansion should remain out of launch scope until the core paid workflow proves demand and deliverability [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

## Operating Plan

The repo is designed for a lean operator with an exception queue, not a zero-human autonomous company [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. Required controls include moderation, citation verification, official opt-out suppression, AI disclosure, not-legal-advice disclaimers, CAN-SPAM compliance, audit logs, ledger entries, and treasury reconciliation [evidence: .planning/REQUIREMENTS.md; packages/shared/prisma/schema.prisma; apps/api/src/routes/submissions.ts].

Pre-launch operating constraints are a `$1,500.00` Mercury reserve [evidence: MASTER_PLAN.md; .planning/PROJECT.md], chargeback rate below `0.5%` [evidence: .planning/PROJECT.md], bounce pause threshold above `10%` for any domain [evidence: .planning/REQUIREMENTS.md], and operator exception handling within `24` hours [evidence: .planning/PROJECT.md].

## Risks And Anti-Plan

The skeptical partner case is strong: this may be a useful personal research build, not a venture business [evidence: dispatch registry notes]. The willingness-to-pay claim is unproven, SEO is slow, government email delivery may fail, official databases may be incomplete, legal-adjacent content may create review burden, and a low-dollar transactional model may cap revenue below venture relevance [assumption: diligence judgment].

Kill the deal if beta users do not pay, if citation verification requires heavy manual review, if .gov inbox placement misses the `85%` validation bar [evidence: .planning/PROJECT.md], if local official coverage stays below `60%` [evidence: .planning/PROJECT.md], or if operator review exceeds the promised lean workflow [assumption: validation criteria].

Do not pitch the product as legal advice, lobbying, claim filing, automated activism, or an autonomous political agent [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. Those pitches increase regulatory, trust, deliverability, and platform-risk exposure [assumption: risk judgment].

## Assumption Ledger

| Assumption | Why It Matters | Validation Test |
|---|---|---|
| Residents will pay `$5.00` to `$25.00` for civic letters [evidence: pricing code] [assumption: demand unvalidated] | Without payment, high margins are irrelevant | Run beta checkout and measure paid conversion |
| `3%` conversion is achievable [evidence: .planning/PROJECT.md] [assumption: not yet measured] | Drives break-even and scaling math | Instrument visitor-to-paid funnel |
| Email delivery to officials can clear `85%` inbox placement [evidence: .planning/PROJECT.md] [assumption: not yet proven] | Product value requires delivery, not just drafting | Seed-list and live-recipient deliverability tests |
| Official data coverage can clear `95%` federal/state and `60%` local [evidence: .planning/PROJECT.md] [assumption: provider selection open] | Bad targeting destroys trust | Evaluate congress.gov, OpenStates, and paid local provider |
| Operator burden stays below `30` minutes per day at launch volume [evidence: .planning/PROJECT.md] [assumption: moderation load unknown] | Determines whether this is lean or service-heavy | Track flagged queue time during beta |
| First-year modeled revenue of `$42,360.00` is reachable [assumption: financial table] | Frames whether this is a business or project | Compare actual monthly cohorts against model |

## Evidence Sources

- MASTER_PLAN.md: product spec, architecture, pricing philosophy, unit economics, phased plan, exclusions [evidence: MASTER_PLAN.md].
- .planning/PROJECT.md: current product definition, market verdict, validation gates, constraints, decisions [evidence: .planning/PROJECT.md].
- .planning/REQUIREMENTS.md: feature requirements and current checked/pending state [evidence: .planning/REQUIREMENTS.md].
- .planning/ROADMAP.md and .planning/STATE.md: conflicting phase-completion records [evidence: .planning/ROADMAP.md; .planning/STATE.md].
- Source code and tests: implemented API, worker, web, schema, pricing, moderation, payment, compliance, treasury surfaces [evidence: apps/api; apps/web; apps/worker; packages/shared; tests].
- Registry dispatch: watchlist sensitivity, personal/research asset warning, thin soul of `3168` bytes [evidence: dispatch registry notes].

## Freshness And Next Validation Gates

This plan is current as of 2026-06-20 [evidence: runtime dispatch]. It should expire for investment use unless refreshed with real beta metrics, production deployment evidence, Stripe exports, Postmark deliverability data, official coverage data, and operator time logs [assumption: diligence freshness standard].

The next gate is not "raise money." The next gate is operator confirmation of project identity, then a measured beta that proves paid conversion, deliverability, official targeting, citation quality, moderation burden, and refund/chargeback behavior [evidence: dispatch registry notes; .planning/PROJECT.md].
