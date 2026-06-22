# CivicState Business Plan

## Document Control

As of `2026-06-22` [evidence: worker current_date], this soul upgrades the repo now checked out as `brooks-history`, whose application artifacts describe `CivicState`, an AI-assisted civic-letter platform [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [package.json](package.json)]. The prior planning baseline is dated `2026-04-25` [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. The operator-adoption rule cited by the dispatch is dated `2026-06-12` [evidence: worker brief]. The registry context classifies this as a watchlist personal/research asset, not a near-term investible BOS unless the operator rules otherwise [evidence: dispatch registry note in worker brief].

Honesty rule: every market, financial, percentage, or scale claim below is either tagged as repo evidence or as an assumption. Workspace-only mode was used, so no external market research was performed.

## Executive Thesis

CivicState should be treated as a validation-stage civic-tech product, not a venture-ready company yet. The codebase contains a substantial MVP-shaped implementation: Next.js web app, Express API, Prisma schema, Clerk auth, Stripe Checkout, Postmark delivery, BullMQ workers, citation verification, moderation, admin tools, treasury logging, and compliance pages [evidence: [apps/web/app](apps/web/app), [apps/api/src/routes](apps/api/src/routes), [apps/worker/src/agents](apps/worker/src/agents), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. The investible question is whether consumers will pay for a researched, citation-backed letter to officials and whether government email delivery can avoid spam, bounce, and trust failure.

The working thesis is a narrow paid consumer service: ordinary US residents with a specific civic issue pay once for a professional, cited letter campaign rather than joining a community platform or hiring counsel. The product is priced at `$5`, `$15`, and `$25` tiers [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)], with internal job cost estimates of `$0.20`, `$0.40`, and `$0.60` by tier [evidence: [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts)]. That implies attractive software gross margin if demand and deliverability validate, but those are not yet proven [assumption: no production revenue or customer file exists in this repo].

## Product Reality

What is real in the repo:

- Submission creation with ZIP validation, issue and desired-outcome validation, content moderation, audit logging, job creation, and BullMQ enqueueing [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)].
- Official lookup via Congress.gov, OpenStates, and a Cicero local-official stub, with caching and opt-out filtering [evidence: [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts), [.planning/phases/02-ai-pipeline/02-02-SUMMARY.md](.planning/phases/02-ai-pipeline/02-02-SUMMARY.md)].
- Researcher agent using eCFR, CourtListener, and curated state-cache sources, then stripping unverified citations [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts)].
- Stripe checkout flow and webhook-gated delivery enqueueing [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)].
- Postmark delivery worker with opt-out, invalid-email, and bounce-rate skips; the bounce gate is `10%` over a `30` day window [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- Admin queue, treasury dashboard, officials maintenance, and Bull Board access [evidence: [.planning/phases/04-dashboard-compliance/04-02-SUMMARY.md](.planning/phases/04-dashboard-compliance/04-02-SUMMARY.md)].
- Legal pages, export endpoint, and deletion workflow with a `72` hour SLA [evidence: [.planning/phases/04-dashboard-compliance/04-03-SUMMARY.md](.planning/phases/04-dashboard-compliance/04-03-SUMMARY.md)].

What is not proven:

- Production traffic is `0` in the repo [assumption: no analytics export or production database is present].
- Revenue is `$0` in the repo [assumption: no production Stripe export or ledger rows are present].
- Paid conversion is unvalidated; the prior planning hurdle was `>=3%` [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Government inbox placement is unvalidated; the prior planning hurdle was `>=85%` [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Official coverage is unvalidated; prior planning targets were `>=95%` federal/state and `>=60%` local [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Customer Definition

The launch customer is not "everyone interested in politics." The ICP is a US resident who has a concrete local, state, or federal issue, wants an official to take an action, is comfortable approving AI-assisted draft text, and values time savings more than free activist tooling [assumption: customer definition derived from repo positioning, not validated with interviews].

Excluded customers are important. CivicState is not a legal advice service, a filing service, a lobbying firm, an enterprise advocacy CRM, or a social network [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx)]. Organizations, nonprofits, HOAs, campaigns, and API buyers remain future possibilities only after the consumer workflow proves demand [assumption: sequencing judgement from current product scope].

## Market Sizing Method

Because there is no network research in this run, market size is modeled bottom-up, not claimed as an external TAM.

| Lens | Method | Result | Honesty label |
|---|---|---:|---|
| Beta wedge | `5` issue communities x `200` monthly visitors x `3%` paid conversion x `$12` blended price | `$360/month` | [assumption: operator can recruit niche communities; conversion uses prior hurdle, not measured] |
| Operator-scale wedge | `100` niche campaigns/year x `100` paid events/campaign x `$12` blended price | `$120,000/year` | [assumption: repeatable issue-led acquisition exists; no proof yet] |
| Venture-scale candidate | `1,000,000` paid civic-letter events/year x `$12` blended price | `$12,000,000/year` | [assumption: illustrative ceiling requiring external validation] |

This is not yet a VC-scale market proof. It is a set of falsifiable acquisition and conversion gates. The next evidence that matters is not a larger spreadsheet; it is paid conversion, deliverability, and repeatable issue-channel sourcing.

## Revenue Model

CivicState is currently a one-time transaction product. The API defines `single`, `three_pack`, and `full_spread` tiers at `$5`, `$15`, and `$25` [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. There is no subscription in active scope [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

The financial model below is a beta operating case, not actual performance.

| Monthly mix | Units | Price | Revenue | App variable cost | Contribution before payment/fixed costs | Honesty label |
|---|---:|---:|---:|---:|---:|---|
| Single official | `50` | `$5` | `$250` | `$10` | `$240` | [assumption: beta units and arithmetic; price is evidence in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); cost estimate is evidence in [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts)] |
| Three officials | `30` | `$15` | `$450` | `$12` | `$438` | [assumption: beta units and arithmetic; price is evidence in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); cost estimate is evidence in [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts)] |
| Full spread | `20` | `$25` | `$500` | `$12` | `$488` | [assumption: beta units and arithmetic; price is evidence in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); cost estimate is evidence in [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts)] |
| Total | `100` | `$12` blended | `$1,200` | `$34` | `$1,166` | [assumption: beta mix and arithmetic across rows] |

The contribution math reconciles: `$250 + $450 + $500 = $1,200` and `$10 + $12 + $12 = $34` [assumption: arithmetic on beta case]. A placeholder card-processing fee of `$64.80` would reduce contribution to `$1,101.20` [assumption: common card-fee memory, not verified in workspace-only mode]. A planned DigitalOcean backend cost of about `$96/month` appears in planning docs but must be re-verified before use [assumption: [.planning/PROJECT.md](.planning/PROJECT.md) contains the plan; external price freshness unverified].

## Go To Market

The only credible launch motion is issue-led distribution:

- Recruit small, high-intent civic audiences around concrete issues, not generic democracy branding [assumption: consumer willingness to pay is most likely when the issue is immediate].
- Use the free preview as the conversion moment: user sees officials, citations, and letter quality before checkout [evidence: [apps/web/components/wizard/letter-preview.tsx](apps/web/components/wizard/letter-preview.tsx)].
- Track conversion from preview to checkout and from checkout to delivered letters as the first commercial funnel [assumption: no analytics export exists].
- Avoid public outrage loops and bulk-send mechanics until moderation, official trust, and deliverability are proven [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Initial success gates:

| Gate | Threshold | Why it matters |
|---|---:|---|
| Preview-to-paid conversion | `>=3%` | [evidence: prior planning hurdle in [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Government inbox placement | `>=85%` | [evidence: prior planning hurdle in [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Federal/state coverage | `>=95%` | [evidence: prior planning hurdle in [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Local coverage | `>=60%` | [evidence: prior planning hurdle in [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Chargeback rate | `<0.5%` | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

## Competition

Named competitors and substitutes:

- Resistbot: free or donation-supported civic messaging substitute; likely strongest consumer substitute [assumption: named in prior planning, external position not rechecked].
- Quorum, VoterVoice, Capitol Canary, and Phone2Action-style enterprise advocacy platforms: serve organizations rather than individual one-time letter buyers [assumption: category knowledge, no workspace evidence].
- Direct constituent email or webforms: free substitute with lower drafting and research support [assumption: obvious user behavior, not measured].
- Legal aid, local nonprofits, and issue organizations: higher-trust alternatives for sensitive topics [assumption: customer behavior needs interviews].
- Generic LLM chat plus manual email: cheap substitute if users can find officials and verify citations themselves [assumption: no user research yet].

CivicState's possible wedge is the integrated workflow: official targeting, citation verification, AI disclosure, payment-gated delivery, reply routing, and auditability in one flow [evidence: current app routes and workers]. That wedge only becomes a moat if official data quality, deliverability reputation, and citation verification improve with usage [assumption: data-network effect not yet proven].

## Risks And Anti-Plan

The skeptical partner case is strong:

- Consumers may not pay for something they believe should be free. The `$5` entry price is low, but free substitutes are abundant [assumption: no paid tests exist].
- Government offices may treat AI-assisted mass constituent email as spam, even when each message is individualized [assumption: deliverability not tested at production volume].
- The product sits near legal, lobbying, political, privacy, and harassment sensitivities without the institutional trust of a law firm or civic nonprofit [assumption: legal review absent].
- Citation quality is existential. A single fabricated legal citation could damage user trust and official trust [evidence: citation verifier exists because the repo treats this as a core risk].
- Official contact data, especially local data, may be too incomplete or stale for the promise to hold [evidence: local Cicero integration is currently a stub in [.planning/phases/02-ai-pipeline/02-02-SUMMARY.md](.planning/phases/02-ai-pipeline/02-02-SUMMARY.md)].
- There is a current product integration risk: the web preview uses tier keys `three` and `all`, while the API expects `three_pack` and `full_spread` [evidence: [apps/web/lib/api.ts](apps/web/lib/api.ts), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. This can break checkout for non-single tiers until fixed.

Anti-plan: do not pitch this as a VC-scale business until paid conversion, deliverability, and legal/compliance review exist. Keep it as a watchlist research asset, run a constrained beta, and kill or reposition if the first paid funnel cannot clear the gates above.

## Assumption Ledger

| ID | Assumption | Validation method | Kill or revise if |
|---|---|---|---|
| A-alpha | Users will pay at least `$5` for a single official letter [assumption: demand unvalidated] | Run issue-led beta with checkout | Preview-to-paid stays below `3%` [assumption: kill threshold from planning hurdle] |
| A-beta | Blended price can reach `$12` [assumption: beta model] | Observe tier mix | Users cluster almost entirely at `$5` [assumption: demand unvalidated] |
| A-gamma | Delivery reputation can support official inbox placement above `85%` [assumption: planning hurdle, not measured] | Seeded .gov/.us tests and Postmark events | Inbox placement misses threshold after domain warming |
| A-delta | Official lookup coverage can hit `95%` federal/state and `60%` local [assumption: planning hurdle, not measured] | ZIP sample across states and municipalities | Local data remains sparse or paid provider is too costly |
| A-epsilon | Citation verification can avoid hallucinated legal claims | Red-team issue set and manual legal review | Verified-citation yield is too low for persuasive letters |
| A-zeta | Operating costs stay near code-estimated `$0.20` to `$0.60` per job [evidence: [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts); assumption: real workload matches estimates] | Ledger analysis from real jobs | Median job cost exceeds budget ceiling pattern |

All ledger entries are [assumption: no production validation artifacts exist].

## Surprise Spikes

- The dispatch project is `brooks-history`, but the repo's product soul is CivicState [evidence: dispatch brief and repo files]. This should be resolved before wrk.vc presentation.
- `.planning/existing-state.md` says zero application source exists, but this worktree contains a built monorepo with API, web, worker, Prisma, tests, and compliance pages [evidence: [.planning/existing-state.md](.planning/existing-state.md), [apps](apps), [packages/shared](packages/shared)]. The audit is stale.
- `.planning/PROJECT.md` says Google Civic API is dead; `MASTER_PLAN.md` still references Google Civic Information API for official lookup [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md)]. The newer plan should supersede the old reference.
- Registry notes call this a watchlist personal/research asset; the business plan should not overclaim investibility [evidence: dispatch registry note].

## Evidence Sources

- Product plan and constraints: [.planning/PROJECT.md](.planning/PROJECT.md)
- Current roadmap baseline: [.planning/ROADMAP.md](.planning/ROADMAP.md)
- Master plan: [MASTER_PLAN.md](MASTER_PLAN.md)
- Prisma data model: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)
- Submission and moderation API: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)
- Payments API: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)
- Delivery worker: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)
- Treasury helper: [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts)

## Current Decision

Status as of `2026-06-22` [evidence: worker current_date]: conditional watchlist. The build is credible enough for a validation beta. It is not credible enough to pitch as investible without operator confirmation, real customer evidence, deliverability proof, and legal/compliance review [assumption: VC-grade threshold judgement].
