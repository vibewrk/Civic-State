# Business Plan: CivicState / Brooks History

## Document Control

As of 2026-06-19 [evidence: worker current_date], this repo is treated as the data-room source for `brooks-history` even though the product language in the repo names the app `CivicState` [evidence: `package.json`]. The prior planning set is dated 2026-04-25 [evidence: `.planning/PROJECT.md`] and the raw intake brief is dated 2026-04-10 [evidence: `.planning/INTAKE-BRIEF.md`].

Honesty labels: `[evidence: path]` means the claim is directly supported by a repo file. `[assumption: basis]` means the claim is a market, financial, or operating estimate that has not been externally verified in this workspace-only run. Factory/AI output is not evidence unless it points to a repo file.

## Current Thesis

CivicState is a paid civic-communication tool: a resident submits a civic issue and ZIP code, the system researches relevant public-law sources, drafts official letters, takes Stripe payment, and sends email to government officials [evidence: `.planning/PROJECT.md`, `apps/api/src/routes/submissions.ts`, `apps/api/src/routes/payments.ts`, `apps/worker/src/agents/researcher.ts`, `apps/worker/src/agents/drafter.ts`].

The investibility thesis is **watchlist, not near-term investible BOS**. The registry note frames this as a personal/research asset and asks the operator to confirm whether it should pitch as a business [evidence: dispatch registry notes]. The product has a credible implementation skeleton, but the repo does not contain proof of paid demand, production deployment, official-data coverage, deliverability to `.gov` inboxes, or lawful operating posture at scale [evidence: `.planning/existing-state.md`, `.planning/REQUIREMENTS.md`].

## Customer Definition

Primary customer: a U.S. resident who wants a specific government action but lacks the time, confidence, legal/source research ability, or official-routing knowledge to write a strong constituent letter [evidence: `.planning/PROJECT.md`].

High-intent launch segments:

- Local infrastructure, housing, transit, school, utility, and enforcement complaints where the desired outcome can be stated concretely [assumption: common civic-letter use cases inferred from product scope, not validated demand].
- Residents willing to pay $5 [evidence: `apps/api/src/routes/payments.ts`] to $25 [evidence: `apps/api/src/routes/payments.ts`] for convenience and confidence, rather than free manual outreach [assumption: willingness to pay is unvalidated].
- Users who prefer a single transactional job over joining a political community or petition network [evidence: `MASTER_PLAN.md`].

Non-customers: people seeking legal advice, regulatory filings, benefits claims, lawsuit help, lobbying services, anonymous harassment, bulk political spam, or community social-network mechanics [evidence: `MASTER_PLAN.md`, `apps/web/app/terms/page.tsx`, `apps/api/src/lib/moderation.ts`].

## Problem

Constituent communication is operationally hard for ordinary residents: they must identify the right officials, understand jurisdiction, find relevant legal or policy references, write in a credible tone, and deliver the message without tripping spam or abuse filters [evidence: `.planning/PROJECT.md`, `MASTER_PLAN.md`].

The repo's own planning names three launch validation gates: willingness to pay at at least 3% conversion [assumption: target from `.planning/PROJECT.md`, not observed], `.gov` inbox placement at at least 85% [assumption: target from `.planning/PROJECT.md`, not measured], and official-data coverage at at least 95% for federal/state plus at least 60% local [assumption: targets from `.planning/PROJECT.md`, not measured].

## Solution and Product Reality

Implemented or substantially represented in code:

- Monorepo with web, API, worker, and shared packages [evidence: `pnpm-workspace.yaml`, `apps/web/package.json`, `apps/api/package.json`, `apps/worker/package.json`, `packages/shared/package.json`].
- Prisma data model for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`].
- Submission API with ZIP validation, moderation, audit logging, database writes, and BullMQ enqueue [evidence: `apps/api/src/routes/submissions.ts`].
- Worker state machine from submitted through delivered/failed [evidence: `apps/worker/src/engine/state-machine.ts`].
- Researcher agent constrained to provided eCFR, CourtListener, and state-cache search results with citation verification [evidence: `apps/worker/src/agents/researcher.ts`].
- Drafter agent that includes AI disclosure, not-legal-advice disclaimer, and CAN-SPAM footer text [evidence: `apps/worker/src/agents/drafter.ts`].
- Stripe Checkout route with hardcoded single, three-pack, and full-spread tiers [evidence: `apps/api/src/routes/payments.ts`].

Not yet evidenced as real:

- Production deployment, live domain, live DNS, live database, live Redis, live Clerk/Stripe/Postmark configuration, or production traffic [evidence: `.planning/existing-state.md`; assumption: no contrary production evidence found in repo].
- Real customer submissions, paid orders, conversion rate, chargebacks, deliverability, or official replies [evidence: `.planning/existing-state.md`; assumption: no runtime database export is present].
- A verified official-contact data source with measured federal/state/local coverage [evidence: `.planning/REQUIREMENTS.md`, `apps/api/src/lib/officials/lookup.ts`].

## Revenue Model

Current code has three one-time packages: single official at $5 [evidence: `apps/api/src/routes/payments.ts`], three officials at $15 [evidence: `apps/api/src/routes/payments.ts`], and full spread at $25 [evidence: `apps/api/src/routes/payments.ts`]. This diverges from `MASTER_PLAN.md`, which describes an Amplify package as five letters at $15 [evidence: `MASTER_PLAN.md`]. Treat the code as current product truth and the plan as historical intent until the operator resolves the package definition.

Revenue is transactional, not subscription-based in the active plan [evidence: `MASTER_PLAN.md`]. Future API access for nonprofits, HOAs, or civic organizations is explicitly deferred [evidence: `.planning/PROJECT.md`, `MASTER_PLAN.md`].

The launch margin target is a 40% net margin floor after Stripe fees [evidence: `.planning/PROJECT.md`, `MASTER_PLAN.md`]. The repo also claims modeled package gross margin near 92% for the $15 and $25 examples [assumption: model from `MASTER_PLAN.md`, not actual observed margin].

## Financial Model

All figures below are plan/model figures, not operating results.

| Line | Build | Monthly Revenue | Label |
| --- | --- | ---: | --- |
| Actual revenue in repo | No paid transaction export found | $0 [evidence: `.planning/existing-state.md`] | evidence |
| Post-launch low case | 50 paid submissions [assumption: `MASTER_PLAN.md` scenario] x $15 average order [assumption: `MASTER_PLAN.md` scenario] | $750 [assumption: 50 x $15] | assumption |
| Early SEO case | 120 paid submissions [assumption: `MASTER_PLAN.md` scenario] x $16 average order [assumption: `MASTER_PLAN.md` scenario] | $1,920 [assumption: 120 x $16] | assumption |
| Traction case | 400 paid submissions [assumption: `MASTER_PLAN.md` scenario] x $18 average order [assumption: `MASTER_PLAN.md` scenario] | $7,200 [assumption: 400 x $18] | assumption |
| Authority case | 1,200 paid submissions [assumption: `MASTER_PLAN.md` scenario] x $20 average order [assumption: `MASTER_PLAN.md` scenario] | $24,000 [assumption: 1,200 x $20] | assumption |

Unit economics from the repo model:

| Package | Price | Modeled Cost Stack | Modeled Gross Margin | Label |
| --- | ---: | --- | ---: | --- |
| Single | $5 [evidence: `apps/api/src/routes/payments.ts`] | $0.20 AI budget [evidence: `.planning/phases/03-payment-delivery/03-03-SUMMARY.md`] plus Stripe/Postmark not fully reconciled in code | not proven | mixed |
| Three-pack | $15 [evidence: `apps/api/src/routes/payments.ts`] | $0.40 AI budget [evidence: `.planning/phases/03-payment-delivery/03-03-SUMMARY.md`] plus modeled Stripe fee about $0.74 [assumption: `MASTER_PLAN.md` model] | about 92% [assumption: `MASTER_PLAN.md` model] | assumption |
| Full-spread | $25 [evidence: `apps/api/src/routes/payments.ts`] | $0.60 AI budget [evidence: `.planning/phases/03-payment-delivery/03-03-SUMMARY.md`] plus modeled Stripe fee about $1.03 [assumption: `MASTER_PLAN.md` model] | about 92% [assumption: `MASTER_PLAN.md` model] | assumption |

Fixed-cost assumptions in planning include a DigitalOcean backend around $96/mo [assumption: `.planning/PROJECT.md` plan, not invoice evidence], a pre-funded Mercury reserve of $1,500 [assumption: `.planning/PROJECT.md` plan, not bank evidence], and break-even MRR around $340/mo [assumption: `MASTER_PLAN.md` model].

Internal reconciliation: the revenue scenarios reconcile arithmetically because submissions x average order equals the revenue line. They do not prove demand.

## Market Sizing

No external market research was available in this workspace-only run, so market sizing is bottoms-up and explicitly assumption-led.

Method: annual qualified visits x paid conversion x average order value = annual revenue opportunity.

| Case | Qualified Visits | Paid Conversion | AOV | Annual Revenue |
| --- | ---: | ---: | ---: | ---: |
| Validation wedge | 20,000 [assumption: operator acquisition target, not market evidence] | 1.5% [assumption: conservative paid conversion target] | $15 [evidence: code tier] | $4,500 [assumption: 20,000 x 1.5% x $15] |
| Base niche | 100,000 [assumption: SEO/direct traffic target] | 3% [assumption: `.planning/PROJECT.md` validation gate] | $16 [assumption: `MASTER_PLAN.md` scenario] | $48,000 [assumption: 100,000 x 3% x $16] |
| Upside niche | 500,000 [assumption: strong long-tail civic-search traffic] | 5% [assumption: unvalidated upside conversion] | $18 [assumption: `MASTER_PLAN.md` scenario] | $450,000 [assumption: 500,000 x 5% x $18] |

This is not a TAM claim. It is an evidence-seeking plan for whether a narrow paid workflow can reach durable revenue. A VC-grade TAM requires external search volume, civic participation, petition/letter-writing, legal self-help, and paid advocacy-tool benchmarks that were not available to this worker.

## Competition

Named alternatives:

- Resistbot: free/low-friction letters to lawmakers; CivicState differentiation is citation-backed research and paid delivery workflow [evidence: `MASTER_PLAN.md`; assumption: current Resistbot feature set not externally verified].
- Change.org: petition hosting and signature aggregation; CivicState is letter delivery and research rather than petition virality [evidence: `MASTER_PLAN.md`; assumption: current Change.org feature set not externally verified].
- LegalZoom: paid legal-document brand; CivicState explicitly avoids legal advice and focuses on civic communications [evidence: `MASTER_PLAN.md`, `apps/web/app/terms/page.tsx`; assumption: current LegalZoom feature set not externally verified].
- Quorum and VoterVoice: organization/enterprise advocacy tooling; CivicState aims at individual residents [evidence: `.planning/PROJECT.md`; assumption: current pricing and feature sets not externally verified].
- Manual outreach: users can identify officials and send emails themselves for $0 [assumption: common substitute], which is the toughest price anchor.

## Go To Market

The repo's strongest go-to-market hypothesis is SEO from opt-in public campaign pages, regulation summaries, and official/citation metadata [evidence: `MASTER_PLAN.md`]. This is attractive because user work can generate long-tail content, but it is slow and unproven.

Near-term GTM should be validation-first:

- Launch private beta for a narrow geography or issue vertical with a manual operator review layer [assumption: reduces legal, deliverability, and official-data risk].
- Measure free preview-to-payment conversion against the 3% target [assumption: `.planning/PROJECT.md` validation gate].
- Measure `.gov` inbox placement against the 85% target before scaling traffic [assumption: `.planning/PROJECT.md` validation gate].
- Publish only opt-in, non-sensitive, reviewed pages until moderation and deletion workflows have been exercised [evidence: `MASTER_PLAN.md`, `apps/web/app/privacy/page.tsx`].

## Risks and Anti-Plan

The skeptic case is strong: this may be a useful research asset rather than a venture business. A partner trying to kill the deal would say the workflow monetizes a task many people expect to be free, targets a politically sensitive delivery channel, depends on fragile official-contact data, and risks being treated by recipients as AI-assisted civic spam. The model can look high-margin in a spreadsheet while failing on demand, trust, deliverability, chargebacks, or moderation load.

Hard risks:

- Willingness to pay is unproven at $5 to $25 [evidence: code pricing; assumption: demand unvalidated].
- Government email deliverability is the hardest operating dependency and is not evidenced with inbox placement data [evidence: `.planning/PROJECT.md`].
- Legal/compliance posture is asserted in product copy but not externally reviewed in repo evidence [evidence: `apps/web/app/terms/page.tsx`, `apps/web/app/privacy/page.tsx`; assumption: no legal opinion present].
- Official data coverage can break the core promise if local contacts are stale, missing, or opted out [evidence: `.planning/REQUIREMENTS.md`].
- AI citation mistakes remain existential even with verification, because users and officials will judge the product by the final letter [evidence: `apps/worker/src/agents/researcher.ts`, `apps/worker/src/agents/drafter.ts`].
- The registry note says personal/research asset and watchlist, not investible operating company [evidence: dispatch registry notes].

Anti-plan: do not raise venture capital, hire a team, build coalition/social features, launch a public political-content surface, or pitch enterprise APIs until paid demand, deliverability, compliance review, and operator workload are validated.

## Assumption Ledger

| Assumption | Basis | Validation Test | Kill / Continue Rule |
| --- | --- | --- | --- |
| Users will pay for letter delivery | $5 to $25 tiers exist in code [evidence: `apps/api/src/routes/payments.ts`] | Preview-to-payment beta | Kill paid consumer thesis if conversion remains below 3% [assumption: `.planning/PROJECT.md` target] after focused onboarding tests |
| Email delivery works to officials | Postmark delivery agent exists [evidence: `apps/worker/src/agents/delivery.ts`] | Seeded deliverability tests | Pause launch if inbox placement stays below 85% [assumption: `.planning/PROJECT.md` target] |
| Official lookup is good enough | Lookup code and requirements exist [evidence: `apps/api/src/lib/officials/lookup.ts`, `.planning/REQUIREMENTS.md`] | Coverage audit by ZIP sample | Do not scale if federal/state coverage is below 95% or local below 60% [assumption: `.planning/PROJECT.md` target] |
| Citation verification prevents damaging hallucinations | Verifier and researcher constraints exist [evidence: `apps/worker/src/lib/legal/citation-verifier.ts`, `apps/worker/src/agents/researcher.ts`] | Human audit of generated letters | Require manual review if any unverified citation reaches send path |
| SEO can acquire users cheaply | Plan emphasizes opt-in pages [evidence: `MASTER_PLAN.md`] | Publish reviewed pages and measure search impressions | Treat SEO as secondary if no qualified demand signal appears after initial content tests |

## Surprise Spikes

- Product name mismatch: the dispatch project is `brooks-history`, while the repo package and product docs call the product `CivicState` [evidence: dispatch context, `package.json`]. Operator should decide whether this is a repo/project alias or a branding mismatch.
- Planning conflict: `.planning/existing-state.md` says zero application code existed, but the repo now contains Next.js, Express, worker, Prisma, payment, delivery, admin, and legal pages [evidence: `.planning/existing-state.md`, `apps/`, `packages/shared/prisma/schema.prisma`]. Treat the audit as stale after later implementation.
- Package conflict: `MASTER_PLAN.md` describes a $15 five-letter Amplify tier [evidence: `MASTER_PLAN.md`], while code implements a $15 three-official tier [evidence: `apps/api/src/routes/payments.ts`].
- Stack drift: `MASTER_PLAN.md` says Next.js 14 [evidence: `MASTER_PLAN.md`], while `.planning/PROJECT.md` and package files indicate Next.js 15 [evidence: `.planning/PROJECT.md`, `apps/web/package.json`].

## Evidence Sources

- [`MASTER_PLAN.md`](MASTER_PLAN.md) - original product/business/financial blueprint.
- [`.planning/PROJECT.md`](.planning/PROJECT.md) - condensed product context, validation gates, constraints, and decisions.
- [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md) - requirement status and launch gate checklist.
- [`.planning/existing-state.md`](.planning/existing-state.md) - stale but important earlier audit of zero-app-code state.
- [`apps/api/src/routes/submissions.ts`](apps/api/src/routes/submissions.ts) - current submission, moderation, research-status, and preview API.
- [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts) - current Stripe tier implementation.
- [`packages/shared/prisma/schema.prisma`](packages/shared/prisma/schema.prisma) - current data model.

## Freshness and Next Evidence Needed

Fresh as of 2026-06-19 [evidence: worker current_date] for workspace inspection only. External market, legal, pricing, competitor, and deliverability claims are stale or unverified because this run had no network access.

Next evidence needed before pitching as a business:

- Live beta funnel with visitor, preview, checkout, paid-send, refund, and chargeback metrics.
- Deliverability report across official domains with bounce, inbox placement, spam complaint, and opt-out rates.
- Official-contact coverage audit by jurisdiction.
- Legal review of AI disclosure, CAN-SPAM treatment, not-legal-advice posture, privacy, deletion, political-content moderation, and child-safety/minor-user constraints.
- Operator ruling on whether `brooks-history` should remain a personal/research asset or become a commercial CivicState pitch.
