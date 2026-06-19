# CivicState Business Plan

**Document date:** 2026-06-19 [evidence: worker dispatch current-date context]  
**Project identity:** Repo dispatch says `brooks-history`; repo evidence says CivicState, a civic letter platform [evidence: package.json; .planning/PROJECT.md; MASTER_PLAN.md].  
**Authority status:** EIR draft for operator review. POM soul-review plus wrk.dog merge constitute adoption; until then this is not an adopted investment memo.

## Snapshot Thesis

CivicState is a personal/research civic-tech asset, not yet an investible company. The strongest current thesis is a narrow paid workflow: help a U.S. resident turn one civic concern into researched, citation-backed letters to the right officials, priced at `$5`, `$15`, or `$25` [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts]. The codebase already contains a Next.js web app, Express API, Prisma schema, BullMQ workers, Stripe checkout flow, Postmark delivery worker, and compliance pages [evidence: apps/web/app/page.tsx; apps/api/src/index.ts; packages/shared/prisma/schema.prisma; apps/worker/src/agents/delivery.ts].

The investibility question is not whether the repo can describe a product; it can. The question is whether individual citizens will pay for government correspondence and whether .gov deliverability, official targeting, and legal/compliance risk can be operated by a lean team. Those remain unvalidated as of `2026-06-19` [evidence: .planning/REQUIREMENTS.md; .planning/PROJECT.md].

## Evidence Base and Honesty Labels

The plan is workspace-only. Repo files are cited as [evidence]. External market claims are labeled [assumption: basis]. Factory/AI output is not treated as evidence.

Key repo evidence:

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence]
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) [evidence]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence]
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence]
- [apps/api/src/lib/officials/cicero.ts](apps/api/src/lib/officials/cicero.ts) [evidence]

## Customer Definition

Primary customer: a U.S. resident with a specific civic issue who wants a professional letter sent to elected officials or agencies but lacks time, procedural knowledge, or confidence. This is a consumer self-serve customer, not an enterprise advocacy buyer [evidence: .planning/PROJECT.md].

Best early wedge: people with time-sensitive local or state concerns where a concise, cited letter feels materially better than a free form email: housing, environment, public safety, government service failures, and local enforcement issues [evidence: apps/worker/src/lib/legal/state-cache.ts; apps/worker/src/agents/classifier.ts].

Not the launch customer: nonprofits, HOAs, campaigns, lobbying organizations, API buyers, or legal claimants. Those are deferred because the repo explicitly excludes third-party APIs, legal filings, regulatory submissions, and automated follow-up loops from v1 [evidence: .planning/REQUIREMENTS.md].

## Product Reality

What is real in code:

- Web landing, submit, dashboard, admin, privacy, and terms pages exist in the Next.js app [evidence: apps/web/app/page.tsx; apps/web/app/submit/page.tsx; apps/web/app/admin/page.tsx].
- Express mounts health, submissions, officials, payments, campaigns, admin, compliance, and webhook routes [evidence: apps/api/src/index.ts].
- Prisma models cover users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- BullMQ workers exist for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/index.ts; apps/worker/src/agents/researcher.ts].
- Stripe checkout tiers are hardcoded at `$5`, `$15`, and `$25` [evidence: apps/api/src/routes/payments.ts].

What is not yet proven:

- Production deployment, real user conversion, real .gov inbox placement, real official contact coverage, and real legal/compliance review are not evidenced in the repo [evidence: .planning/REQUIREMENTS.md; .planning/existing-state.md].
- Local official lookup is a Cicero stub returning an empty array unless future integration work is done [evidence: apps/api/src/lib/officials/cicero.ts].
- Federal lookup returns officials but Congress.gov email fields are empty in the implementation, so email delivery depends on additional contact enrichment [evidence: apps/api/src/lib/officials/congress.ts].

## Market Sizing

VC-grade answer: this is not yet a TAM story. Without network research, the honest sizing is a bottom-up validation model.

Launchable serviceable market for validation: `100` paid submissions in the first controlled cohort [assumption: operator can source from existing civic-tech, neighborhood, and personal networks without paid acquisition]. At an average order value of `$15` [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts], that produces `$1,500` gross revenue [assumption: 100 paid submissions x $15 AOV] and enough delivery data to measure conversion, coverage, bounce, complaint, and refund behavior.

Seed-scale wedge: `1,200` monthly submissions by month `24` is the repo's scenario target [evidence: MASTER_PLAN.md]. At `$20` average order value [evidence: MASTER_PLAN.md], that equals `$24,000` monthly revenue [evidence: MASTER_PLAN.md]. This is a bootstrap business signal, not venture scale, unless an enterprise/API or high-volume acquisition channel later validates [assumption: consumer paid civic letters alone are unlikely to support venture outcomes without much higher volume].

National TAM is intentionally not claimed. Any claim about U.S. civic complaint volume, voter engagement, or addressable households would require external sources and is therefore [assumption: no network research available].

## Revenue Model and Pricing

Revenue is one-time transactional checkout before delivery. Current code supports:

| Tier | Price | Included target count | Evidence |
| --- | ---: | ---: | --- |
| Single Official | `$5` [evidence: apps/api/src/routes/payments.ts] | `1` official [evidence: apps/api/src/routes/payments.ts] | Stripe checkout session |
| Three Officials | `$15` [evidence: apps/api/src/routes/payments.ts] | `3` officials [evidence: apps/api/src/routes/payments.ts] | Stripe checkout session |
| All Officials | `$25` [evidence: apps/api/src/routes/payments.ts] | all matched officials, represented as `-1` in code [evidence: apps/api/src/routes/payments.ts] | Stripe checkout session |

Planned margin floor is `40%` after fees [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. Tests use internal cost estimates of `$0.20`, `$0.40`, and `$0.60` per tier [evidence: tests/payment.test.ts; apps/worker/src/lib/treasury.ts]. Those estimates exclude real-world support, refunds, deliverability work, data-provider fees, and legal review [assumption: repo tests model direct processing cost only].

## Financial Model

The financial model is deliberately reconciliation-first. It connects volume, AOV, fees, direct processing cost, and gross margin.

| Scenario | Paid submissions | AOV | Gross revenue | Direct COGS basis | Estimated direct COGS | Gross profit |
| --- | ---: | ---: | ---: | --- | ---: | ---: |
| Validation cohort | `100` [assumption: controlled beta target] | `$15` [evidence: MASTER_PLAN.md] | `$1,500` [assumption: 100 x $15] | `$0.40` processing cost per three-pack plus payment/provider costs [evidence: apps/worker/src/lib/treasury.ts; assumption: Stripe/provider fees not externally verified] | `$120` [assumption: repo Month 3 COGS ratio near 8% applied to cohort] | `$1,380` [assumption: $1,500 - $120] |
| Month 3 plan | `50` [evidence: MASTER_PLAN.md] | `$15` [evidence: MASTER_PLAN.md] | `$750` [evidence: MASTER_PLAN.md] | fixed costs plus variable COGS | `$60` variable COGS [assumption: 8% variable COGS from MASTER_PLAN.md] | `$690` before fixed costs [assumption: $750 - $60] |
| Month 12 plan | `400` [evidence: MASTER_PLAN.md] | `$18` [evidence: MASTER_PLAN.md] | `$7,200` [evidence: MASTER_PLAN.md] | fixed costs plus variable COGS | `$576` variable COGS [assumption: 8% variable COGS from MASTER_PLAN.md] | `$6,624` before fixed costs [assumption: $7,200 - $576] |
| Month 24 plan | `1,200` [evidence: MASTER_PLAN.md] | `$20` [evidence: MASTER_PLAN.md] | `$24,000` [evidence: MASTER_PLAN.md] | fixed costs plus variable COGS | `$1,920` variable COGS [assumption: 8% variable COGS from MASTER_PLAN.md] | `$22,080` before fixed costs [assumption: $24,000 - $1,920] |

Fixed costs are planned at about `$200/mo` [evidence: MASTER_PLAN.md]. Break-even is modeled at about `$340/mo`, roughly `25` Amplify submissions per month [evidence: MASTER_PLAN.md]. Gross margin in the master plan is about `92%` on `$15` and `$25` packages [evidence: MASTER_PLAN.md]. Treat that margin as a direct-cost margin, not a company margin [assumption: support, legal, provider subscriptions, failed sends, refunds, and chargebacks are not fully loaded].

## Go To Market

Phase-one distribution should be operator-led and measurement-led:

- Recruit `25` to `50` known early users before opening broader access [assumption: enough to test end-to-end workflow without flooding moderation or delivery].
- Run issue-specific cohorts in housing, environment, and public safety because the curated state cache already contains those categories for CA, NY, and TX [evidence: apps/worker/src/lib/legal/state-cache.ts].
- Use SEO only after successful delivery data exists; the master plan names SEO as a byproduct, not the primary workflow [evidence: MASTER_PLAN.md].
- Avoid paid acquisition until willingness-to-pay is observed at or above `3%` conversion from preview to payment [evidence: .planning/PROJECT.md].

The first sales motion is not "change democracy"; it is "we will help you produce and send a serious, cited letter in minutes." Any broader civic movement positioning should wait for measured outcomes [assumption: trust is fragile in civic/political workflows].

## Competition

Named competitors and substitutes:

- Resistbot: closest civic letter substitute, but repo positioning says it lacks the research/citation layer [evidence: MASTER_PLAN.md; assumption: current product claims not externally verified].
- Change.org: petition hosting substitute, not one-to-one cited correspondence [evidence: MASTER_PLAN.md; assumption: current product claims not externally verified].
- LegalZoom: adjacent document automation substitute, but not civic-letter specific [evidence: MASTER_PLAN.md; assumption: current product claims not externally verified].
- Manual official contact forms and email: free substitute with the strongest price advantage [assumption: based on common constituent workflow, no network verification].
- Enterprise advocacy platforms such as Quorum and VoterVoice: organizational buyer substitutes, not individual transactional products [evidence: .planning/PROJECT.md; assumption: pricing and feature currentness not externally verified].

CivicState's defensible wedge, if any, is not AI drafting alone. It is a verified-citation pipeline, official targeting, delivery tracking, moderation, and treasury controls in one narrow workflow [evidence: apps/worker/src/agents/researcher.ts; apps/api/src/routes/officials.ts; apps/worker/src/agents/delivery.ts; apps/worker/src/lib/treasury.ts].

## Risks and Anti-Plan

A skeptical partner should try to kill the deal on these points:

- Nobody pays. The free alternative is writing an email or using a legislator's contact form. If preview-to-payment is below `3%` [evidence: .planning/PROJECT.md], the consumer thesis is probably dead.
- Official contact data is brittle. Congress.gov does not expose email in the current implementation [evidence: apps/api/src/lib/officials/congress.ts], state coverage requires an OpenStates key [evidence: apps/api/src/lib/officials/openstates.ts], and local lookup is a stub [evidence: apps/api/src/lib/officials/cicero.ts].
- .gov deliverability can break the core promise. The repo itself names `85%` inbox placement as a validation gate [evidence: .planning/PROJECT.md]. If inbox placement is lower, paid delivery becomes reputationally dangerous.
- Legal positioning is sensitive. The product touches political views, civic grievances, legal citations, and official communications. The repo says "not legal advice" and includes disclosure pages, but no legal opinion is evidenced [evidence: apps/web/app/terms/page.tsx; apps/web/app/privacy/page.tsx].
- Model hallucination or citation mismatch can damage trust. The code strips unverified citations and flags all-failed cases, but this must be tested against messy real issues [evidence: apps/worker/src/agents/researcher.ts].
- The current roadmap overstates completion in places. `.planning/ROADMAP.md` marks all phases complete [evidence], while `.planning/REQUIREMENTS.md` still shows many functional requirements pending [evidence]. The plan must use working-code verification, not checklist optimism.
- This may remain a personal research asset. Registry note says personal/research asset and "not near-term investible BOS" [evidence: worker dispatch registry notes].

## Assumption Ledger

| Assumption | Why it matters | Validation test |
| --- | --- | --- |
| Users will pay `$5` to `$25` for a better civic letter [evidence: current pricing; assumption: willingness unproven] | Core revenue model | `100` beta users, measure preview-to-payment conversion [assumption: controlled cohort] |
| Official targeting can reach usable coverage across federal/state/local [assumption: API coverage not proven] | Delivery value | Measure coverage by ZIP across `50` ZIP codes [assumption: sample size for spike] |
| .gov email deliverability reaches at least `85%` inbox placement [evidence: .planning/PROJECT.md] | Paid delivery trust | Seed test sends and bounce/complaint monitoring before public launch |
| Direct cost margin remains above `40%` [evidence: .planning/PROJECT.md] | Prevents loss-making jobs | Compare ledger costs to tier revenue for every paid job |
| Citation verification catches materially bad legal references [evidence: citation verifier exists] | Trust and liability | Manual review sample of `30` generated letters [assumption: enough for early defect discovery] |

## Milestones and Gates

The next operator gates should be:

- Gate A: Product can complete one real issue from submission to preview to Stripe checkout in staging by `2026-07-03` [assumption: two-week validation target].
- Gate B: Official lookup returns usable federal and state contacts for `80%` of sampled ZIP codes [assumption: minimum acceptable early coverage].
- Gate C: Paid delivery test reaches `85%` inbox placement and complaint rate stays below `0.5%` [evidence: .planning/PROJECT.md; assumption: complaint benchmark not externally verified].
- Gate D: Conversion from preview to paid checkout reaches `3%` or higher [evidence: .planning/PROJECT.md].
- Gate E: Operator review load stays under `30` minutes per day at controlled beta volume [evidence: .planning/PROJECT.md].

## Surprise Spikes

- Dispatch identity mismatch: worker says `brooks-history`, repo says CivicState. This should be resolved before public wrk.vc presentation [evidence: worker dispatch; package.json].
- Existing-state drift: `.planning/existing-state.md` says zero application code exists and mentions root `BUSINESS.md` and `DECISIONS.md`, but the current repo has substantial app code and no root soul files [evidence: .planning/existing-state.md; repo file scan].
- Product scope drift: master plan mentions dynamic pricing and more agents, while current code uses hardcoded tiers and a narrower worker set [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts; apps/worker/src/engine/config.ts].
- Compliance inconsistency: Terms say constituent letters are not CAN-SPAM, while project planning says treat all outbound letters as CAN-SPAM for safety [evidence: apps/web/app/terms/page.tsx; .planning/PROJECT.md]. The safer plan is to keep CAN-SPAM controls until legal review says otherwise.

## Recommendation

Keep CivicState on the watchlist as a validation-stage research asset. Do not pitch it as venture-ready until the operator proves paid conversion, official coverage, inbox placement, legal review posture, and low-touch operations. If those gates pass, the asset could become a cash-flowing civic workflow business; if they fail, the codebase is still a useful research artifact around AI-assisted civic correspondence.
