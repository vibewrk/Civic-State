# CivicState / brooks-history Business Plan

## Snapshot

As of 2026-06-20 [evidence: runner environment date], the registry project id is `brooks-history` [evidence: dispatch registry notes], while the product implemented and planned in this repository is CivicState: a civic-tech workflow for turning a resident's issue into researched, citation-backed letters to government officials [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)].

Current thesis: CivicState can be evaluated as a paid civic-correspondence utility, but it is not yet a VC-grade investible company. The registry note flags this as a watchlist personal/research asset and asks the operator to confirm whether it should pitch as a business [evidence: dispatch registry notes]. Until that ruling, this document is a diligence-grade operating plan, not an investment claim.

## Evidence Standard

This upgrade was prepared in workspace-only mode on 2026-06-20 [evidence: runner environment date]. No network research was available [evidence: dispatch instruction], so repository files are cited as evidence and all external market claims are labeled as assumptions. Principal sources are the master plan dated March 2026 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)], planning files dated 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)], and current source code under `apps/`, `packages/`, and `tests/` [evidence: [apps/api/src](apps/api/src); [apps/worker/src](apps/worker/src); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

## Customer Definition

The launch customer is an individual United States resident with a specific civic issue, a desired public-sector outcome, and a ZIP-code-specific jurisdiction question [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)]. The buyer is not a law firm, lobbying shop, enterprise advocacy team, or government office [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)].

The product should reject or review threats, harassment, defamation-risk claims, legal-demand-style language, unverifiable allegations, bulk-send patterns, and private-individual targeting [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)]. This is a constituent communication tool, not legal advice, claim filing, litigation support, or automated lobbying [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

## Problem

The repo's thesis is that residents abandon civic action because they do not know the relevant jurisdiction, applicable law, official contacts, or effective letter framing [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. That problem statement is plausible but unvalidated in this workspace [assumption: no customer interviews, conversion data, or traffic logs were found].

The hardest business problem is not drafting alone. It is trusted delivery into official inboxes, correct official routing, citation integrity, moderation, compliance, and a low-friction paid checkout [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].

## Solution

CivicState compresses a multi-step civic action task into a guided workflow: issue submission, ZIP-based official lookup, research, citation verification, letter drafting, preview, payment, delivery, dashboard tracking, and moderation [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

Current repository surface includes a Next.js frontend, Express API, BullMQ worker, Prisma data model, Stripe Checkout route, official lookup route, moderation pipeline, legal research/citation helpers, delivery agent, dashboard/admin pages, and tests [evidence: [apps/web](apps/web); [apps/api/src](apps/api/src); [apps/worker/src](apps/worker/src); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma); [tests](tests)].

## What Is Real Today

Implemented evidence includes a Prisma schema for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. The payment route exposes `$5.00`, `$15.00`, and `$25.00` Stripe Checkout tiers [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); [tests/payment.test.ts](tests/payment.test.ts)]. The worker state machine covers submitted through delivered and failed states [evidence: [apps/worker/src/engine/state-machine.ts](apps/worker/src/engine/state-machine.ts)].

No production traction file, Stripe export, Postmark deliverability report, customer cohort, or live revenue report was found in this workspace [evidence: repo file scan; [.planning/existing-state.md](.planning/existing-state.md)]. Treat verified current revenue as `$0.00` [assumption: absence of production revenue evidence in workspace].

## Surprise Spikes

Project identity conflict: registry says `brooks-history`, but the repository content says CivicState [evidence: dispatch registry notes; [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)]. Operator must decide whether this repository is truly the CivicState business or a personal/research asset.

Roadmap truth conflict: `.planning/ROADMAP.md` marks all major phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while `.planning/REQUIREMENTS.md` leaves many launch requirements unchecked and `.planning/STATE.md` says only foundation is complete [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [.planning/STATE.md](.planning/STATE.md)]. This plan treats code presence as different from market readiness.

Planning freshness conflict: `.planning/existing-state.md` says no application code exists [evidence: [.planning/existing-state.md](.planning/existing-state.md)], while this repo now contains app and package code [evidence: [apps](apps); [packages](packages)]. That audit is stale.

Pricing conflict: the plan describes a `$15.00` Amplify package with five letters in places [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)], while the implemented route prices `$15.00` as a three-official package [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. Customer-facing pricing must follow the code or be reconciled before launch.

## Market Sizing

Because network research was unavailable, sizing is bottom-up and assumption-led. The addressable launch segment is residents who have a concrete civic issue, can pay a low one-time fee, and accept email-first official outreach [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] [assumption: no survey or external traffic data available].

| Layer | Method | Annual value |
| --- | --- | ---: |
| Beachhead SOM | `3` launch metros [assumption: operator can focus city-by-city] x `250,000` reachable households per metro [assumption: SEO/local-sharing reach pool] x `1.0%` paid annual incidence [assumption: unvalidated purchase rate] x `$16.00` average realized package price [assumption: blended repo prices and master-plan ramp] | `$120,000.00` [assumption: formula result] |
| Initial SAM | `25` metros [assumption: repeatable metro playbook] x `300,000` reachable households per metro [assumption: local civic query audience] x `1.5%` paid annual incidence [assumption: repeatable conversion after proof] x `$18.00` average package price [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) month-twelve average; assumption: applied to SAM] | `$2,025,000.00` [assumption: formula result] |
| Consumer TAM proxy | `100` metros [assumption: national metro expansion ceiling] x `500,000` reachable households per metro [assumption: broad reachable pool] x `1.0%` paid annual incidence [assumption: conservative annual purchase rate] x `2` paid issues per buyer [assumption: repeat behavior if first delivery works] x `$18.00` average package price [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) month-twelve average; assumption: applied to TAM] | `$18,000,000.00` [assumption: formula result] |

This is not yet a VC-scale market unless consumer frequency, SEO reach, organization/API revenue, or official-contact data value proves much larger than the current consumer letter plan [assumption: EIR market judgment without external research].

## Revenue Model

Launch revenue is transactional one-time letter delivery through Stripe Checkout [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. Implemented tiers are `$5.00` for single official, `$15.00` for three officials, and `$25.00` for all matched officials [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); [tests/payment.test.ts](tests/payment.test.ts)].

The master plan sets a `40%` net margin floor after fees [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)]. Payment tests assert estimated costs of `$0.20`, `$0.40`, and `$0.60` for the three implemented tiers and margins above `90%` before broader operating costs [evidence: [tests/payment.test.ts](tests/payment.test.ts)].

Deferred revenue streams include priority human review and organization/API access [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)]. They should remain `$0.00` in the launch model until signed pilots or implemented routes exist [assumption: EIR sequencing judgment].

## Financial Model

The table reconciles paid submissions x average order value to revenue. It is not actual performance.

| Period | Paid submissions | Average order value | Revenue | Variable COGS | Stripe fees | Fixed platform cost | Operating contribution |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Beta quarter | `150` [assumption: `50` monthly submissions from master-plan month-three scenario x `3` months] | `$15.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] | `$2,250.00` [assumption: `150` x `$15.00`] | `$180.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `8%` COGS assumption] | `$90.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `4%` fee assumption] | `$600.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `$200.00` monthly fixed cost x `3` months] | `$1,380.00` [assumption: revenue minus listed costs] |
| Early SEO quarter | `360` [assumption: `120` monthly submissions from master-plan month-six scenario x `3` months] | `$16.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | `$5,760.00` [assumption: `360` x `$16.00`] | `$460.80` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `8%` COGS assumption] | `$230.40` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `4%` fee assumption] | `$600.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `$200.00` monthly fixed cost x `3` months] | `$4,468.80` [assumption: revenue minus listed costs] |
| Traction quarter | `750` [assumption: interpolation between master-plan month-six and month-twelve scenarios] | `$17.00` [assumption: pricing mix between master-plan scenarios] | `$12,750.00` [assumption: `750` x `$17.00`] | `$1,020.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `8%` COGS assumption] | `$510.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `4%` fee assumption] | `$600.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `$200.00` monthly fixed cost x `3` months] | `$10,620.00` [assumption: revenue minus listed costs] |
| Local authority quarter | `1,200` [assumption: `400` monthly submissions from master-plan month-twelve scenario x `3` months] | `$18.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] | `$21,600.00` [assumption: `1,200` x `$18.00`] | `$1,728.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `8%` COGS assumption] | `$864.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `4%` fee assumption] | `$600.00` [evidence: [MASTER_PLAN.md](MASTER_PLAN.md) `$200.00` monthly fixed cost x `3` months] | `$18,408.00` [assumption: revenue minus listed costs] |

Modeled first-year revenue is `$42,360.00` [assumption: sum of table revenue]. Modeled first-year operating contribution is `$34,876.80` [assumption: sum of table contribution]. That is attractive for a lean operator but not a VC-scale outcome by itself [assumption: EIR investment judgment].

## Competition

Resistbot is the closest civic-message substitute named by the existing plan [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] [assumption: live positioning unverified]. Change.org competes for petition attention and issue discovery [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] [assumption: live positioning unverified]. Quorum and VoterVoice are organization-facing advocacy platforms named by planning materials [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] [assumption: live pricing and positioning unverified]. LegalZoom is an adjacent document-trust substitute, but CivicState explicitly avoids legal advice and filings [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)] [assumption: category comparison].

CivicState's differentiation is the bundled workflow: official targeting, citation verification, letter drafting, paid delivery, dashboard tracking, moderation, and audit controls in one resident-facing product [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [apps/api/src](apps/api/src); [apps/worker/src](apps/worker/src)].

## Go To Market

The credible launch motion is a narrow beta, not a national marketing push [assumption: operating risk control]. Start with one metro or state wedge where official data can be checked manually before scale [assumption: operator-led launch design]. The prior distribution hypothesis is SEO from opt-in public campaign pages and reference content [evidence: [.planning/GENESIS.md](.planning/GENESIS.md); [MASTER_PLAN.md](MASTER_PLAN.md)], but that channel cannot compound until real paid campaigns exist [assumption: SEO sequencing judgment].

Validation gates should precede spend: at least `3%` preview-to-paid conversion [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], at least `85%` government-domain delivery acceptance or inbox placement [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], at least `95%` federal/state official coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], at least `60%` local official coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and chargebacks below `0.5%` [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Paid ads, partnerships, subscriptions, organization API, certified mail, multilingual expansion, public comments, and coalition mechanics should remain out of launch scope until the core paid workflow proves demand and delivery [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)].

## Operating Plan

The repo is designed for a lean operator with exception handling, not a zero-human autonomous company [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)]. Controls include moderation, citation verification, official opt-out suppression, AI disclosure, not-legal-advice disclaimers, CAN-SPAM compliance, audit logs, ledger entries, and treasury reconciliation [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma); [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)].

Pre-launch constraints include a `$1,500.00` Mercury reserve [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)], a `10%` per-domain bounce pause threshold [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)], operator review within `24` hours for exceptions [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], and a `72`-hour data deletion service-level target [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx)].

## Risks And Anti-Plan

The skeptical partner case is strong: this may be a useful personal/research build, not a venture business [evidence: dispatch registry notes]. The product can fail because users may not pay, SEO may be slow, government inboxes may reject AI-assisted messages, official data may be incomplete, citation verification may require heavy manual review, and a low-dollar transactional model may cap revenue below venture relevance [assumption: EIR risk judgment].

Kill the deal if beta conversion misses the `3%` gate [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], if official-domain deliverability misses the `85%` gate [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], if local official coverage stays below the `60%` gate [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], if refund or chargeback behavior breaches the `0.5%` target [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], or if operator review exceeds the lean workflow assumption [assumption: validation threshold].

Do not pitch CivicState as legal advice, litigation support, claim filing, automated political persuasion, bulk lobbying, or a zero-human political agent [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)]. Those pitches increase regulatory, trust, deliverability, and platform-risk exposure [assumption: EIR risk judgment].

## Assumption Ledger

| Assumption | Why it matters | Validation test |
| --- | --- | --- |
| Residents will pay `$5.00` to `$25.00` for civic letters [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] [assumption: willingness-to-pay unvalidated] | Revenue exists only if previews convert | Measure preview-to-paid conversion in beta |
| `3%` paid conversion is achievable [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] [assumption: target, not measured result] | Drives break-even and scaling math | Instrument visitor-to-preview-to-paid funnel |
| `85%` government-domain delivery acceptance is achievable [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] [assumption: target, not measured result] | Product value requires delivery, not only drafting | Run Postmark and seed-list deliverability tests |
| `95%` federal/state and `60%` local official coverage are achievable [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] [assumption: provider selection unresolved] | Bad targeting destroys trust | Evaluate congress.gov, OpenStates, and paid local provider against ZIP samples |
| One lean operator can handle review load within `24` hours [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] [assumption: moderation load unknown] | Margins collapse if review is frequent | Track flagged rate and minutes per flagged submission |
| First-year modeled revenue of `$42,360.00` is reachable [assumption: financial table] | Frames business versus project status | Compare monthly actual cohorts against model |

## Freshness And Next Gates

This plan is current as of 2026-06-20 [evidence: runner environment date]. It should expire for investment or public-dossier use unless refreshed with real beta metrics, production deployment proof, Stripe exports, Postmark deliverability data, official coverage data, and operator time logs [assumption: diligence freshness standard].

The next gate is not fundraising. The next gate is operator confirmation of project identity, followed by a measured beta that proves paid conversion, deliverability, official targeting, citation quality, moderation burden, and refund/chargeback behavior [evidence: dispatch registry notes; [.planning/PROJECT.md](.planning/PROJECT.md)].

