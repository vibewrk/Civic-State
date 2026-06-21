# CivicState / brooks-history Business Plan

## Document Control

As of 2026-06-21 [evidence: worker dispatch current date], this repository is registered as `brooks-history` while its implemented product and existing planning files describe CivicState, a civic letter drafting and delivery platform [evidence: registry dispatch; `.planning/PROJECT.md`; `apps/web/app/page.tsx`; `apps/api/src/index.ts`]. This plan treats CivicState as the real asset in the repository and flags the naming mismatch as a diligence issue, not a cosmetic issue.

The previous soul was thin and stale: `.planning/PROJECT.md` was last updated on 2026-04-25 [evidence: `.planning/PROJECT.md`], and `MASTER_PLAN.md` says last updated March 2026 [evidence: `MASTER_PLAN.md`]. All market, conversion, deliverability, pricing-cost, and legal/regulatory claims below are unvalidated unless explicitly tied to code or a repo file.

## Thesis Current

CivicState is a personal/research civic-tech asset with a plausible narrow revenue loop, but it is not yet a VC-grade investible business. The best current thesis is: validate whether ordinary US residents will pay $5 [assumption: repo pricing model, unvalidated willingness to pay], $15 [assumption: repo pricing model, unvalidated willingness to pay], or $25 [assumption: repo pricing model, unvalidated willingness to pay] for AI-assisted, citation-backed constituent letters before expanding into public campaign pages, subscriptions, or organizational sales.

The investible version needs proof across paid conversion, reliable official targeting, safe citation quality, and deliverability into government inboxes [assumption: EIR diligence framework]. The repo has meaningful product scaffolding for those fronts [evidence: Prisma models in `packages/shared/prisma/schema.prisma`; routes in `apps/api/src/routes`; workers in `apps/worker/src`], but it has no repo evidence of paying customers, live deliverability, or repeat usage.

## What Is Real Today

The shipped repo contains a Next.js frontend, Express API, Prisma/PostgreSQL schema, BullMQ worker entrypoint, Stripe Checkout route, compliance routes, official lookup route, submission route, payment route, dashboard pages, admin pages, and tests covering moderation, officials, payments, delivery, compliance, admin, campaigns, treasury, and API routes [evidence: `apps/web`; `apps/api/src`; `apps/worker/src`; `packages/shared/prisma/schema.prisma`; `tests`].

The implemented price tiers are `single` at $5 [evidence: `apps/api/src/routes/payments.ts`], `three_pack` at $15 [evidence: `apps/api/src/routes/payments.ts`], and `full_spread` at $25 [evidence: `apps/api/src/routes/payments.ts`]. The product promise on the live homepage copy is AI-powered research, verified citations, one-click delivery, and pricing from $5 to $25 [evidence: `apps/web/app/page.tsx`].

The database model supports users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`]. This is enough shape for an MVP data room, but not enough evidence of market traction.

## Customer Definition

Primary customer: a US resident with a specific civic issue, a desired outcome, and enough urgency to pay a small one-time fee instead of manually identifying officials, researching laws, drafting a formal letter, and sending it [assumption: inherited from `.planning/PROJECT.md` and `.planning/GENESIS.md`, not validated by customer interviews].

Primary buyer is the same person as the user. Government officials are recipients and risk stakeholders, not buyers [evidence: `.planning/PROJECT.md`]. The operator is a separate internal user who reviews flagged submissions, maintains officials, and handles delivery or moderation exceptions [evidence: `.planning/PROJECT.md`; `apps/web/app/admin`].

Do not pitch this as a broad civic engagement network yet. The repo's own scope excludes community features, public commenting, search-before-create, coalition mechanics, subscriptions, certified mail, and organizational APIs until the paid letter loop works [evidence: `.planning/GENESIS.md`; `MASTER_PLAN.md`].

## Problem And Workflow

The problem hypothesis is that citizens abandon civic action because the work is too fragmented: identify jurisdiction, find applicable authority, draft a professional message, and route it to the correct official [assumption: inherited repo thesis, needs interviews and funnel data]. CivicState compresses that workflow into issue intake, official lookup, research, citation verification, drafting, preview, payment, and email delivery [evidence: `.planning/PROJECT.md`; `apps/api/src/routes/submissions.ts`; `apps/api/src/routes/officials.ts`; `apps/api/src/routes/payments.ts`; `apps/worker/src/agents`].

The core product promise must stay narrow: constituent communications only, not legal advice, legal filings, lobbying representation, demand notices, or regulatory submissions [evidence: `apps/web/app/terms/page.tsx`; `MASTER_PLAN.md`].

## Market Sizing Method

No external market research was available in this workspace-only run. Therefore, top-down TAM claims are not used.

Bottom-up validation market for the next milestone: prove a small local acquisition loop with 50 paid submissions per month [assumption: inherited `MASTER_PLAN.md` month-three scenario, unvalidated] at an average realized price of $15 [assumption: inherited `MASTER_PLAN.md` scenario, unvalidated], producing $750 monthly revenue [assumption: 50 x $15 inherited scenario]. This is not TAM; it is the first validation hurdle.

Base-case learning market after early SEO: 120 paid submissions per month [assumption: inherited `MASTER_PLAN.md` month-six scenario, unvalidated] at $16 average revenue per submission [assumption: inherited scenario, unvalidated], producing $1,920 monthly revenue [assumption: 120 x $16 inherited scenario].

Stretch learning market: 400 paid submissions per month [assumption: inherited `MASTER_PLAN.md` month-twelve scenario, unvalidated] at $18 average revenue per submission [assumption: inherited scenario, unvalidated], producing $7,200 monthly revenue [assumption: 400 x $18 inherited scenario].

The only honest market-sizing conclusion as of 2026-06-21 [evidence: worker dispatch current date] is that CivicState should be treated as a paid-demand experiment, not a venture-scale civic platform.

## Revenue Model

Revenue is transactional, one-time payment before delivery [evidence: `apps/api/src/routes/payments.ts`; `.planning/PROJECT.md`]. The active tiers are:

| Tier | Price | Delivery Scope | Honesty Label |
|---|---:|---|---|
| Single | $5 | Most relevant official | [evidence: `apps/api/src/routes/payments.ts`] |
| Three Pack | $15 | Three officials | [evidence: `apps/api/src/routes/payments.ts`] |
| Full Spread | $25 | All matched officials | [evidence: `apps/api/src/routes/payments.ts`] |

The repo previously described different package copy, including Starter, Amplify, and Complex, with up to 10 letters [evidence: `MASTER_PLAN.md`]. The code currently implements `three_pack`, not a five-letter Amplify package [evidence: `apps/api/src/routes/payments.ts`]. That mismatch should be resolved before launch pricing is shown publicly.

Subscriptions, API access, partnerships, paid ads, and fundraising/crowdfunding adjacency are not in the current revenue model [evidence: `.planning/GENESIS.md`; `MASTER_PLAN.md`].

## Financial Model

The current model must reconcile from paid submissions to revenue. The table below is an operating learning model, not a forecast.

| Scenario | Paid Submissions | Avg Price | Revenue Build | Monthly Revenue | Variable Cost | Fixed Cost | Contribution After Costs |
|---|---:|---:|---|---:|---:|---:|---:|
| Validation | 50 [assumption: inherited scenario] | $15 [assumption: inherited scenario] | 50 x $15 [assumption: inherited scenario] | $750 [assumption: arithmetic from inherited scenario] | $90 [assumption: 12% of revenue from inherited 8% variable COGS plus 4% Stripe model] | $200 [assumption: inherited fixed-cost model] | $460 [assumption: $750 - $90 - $200] |
| Early SEO | 120 [assumption: inherited scenario] | $16 [assumption: inherited scenario] | 120 x $16 [assumption: inherited scenario] | $1,920 [assumption: arithmetic from inherited scenario] | $230.40 [assumption: 12% of revenue from inherited model] | $200 [assumption: inherited fixed-cost model] | $1,489.60 [assumption: $1,920 - $230.40 - $200] |
| Stretch | 400 [assumption: inherited scenario] | $18 [assumption: inherited scenario] | 400 x $18 [assumption: inherited scenario] | $7,200 [assumption: arithmetic from inherited scenario] | $864 [assumption: 12% of revenue from inherited model] | $200 [assumption: inherited fixed-cost model] | $6,136 [assumption: $7,200 - $864 - $200] |

The inherited plan claims 92% gross margin [assumption: inherited `MASTER_PLAN.md` unit-economics model, not externally verified], 40% net margin floor [evidence: `.planning/PROJECT.md` as an internal constraint], and break-even at about $340 MRR [assumption: inherited `MASTER_PLAN.md` model]. Those are useful hypotheses, but not evidence. Before investment, the operator needs actual Stripe data, actual token bills, actual Postmark bills, refund rates, and chargeback rates.

## Go To Market

The only credible near-term go-to-market is a narrow soft launch in one metro or issue cluster, then measure the full paid loop. The repo's inherited plan names SEO and public campaign pages as the primary distribution hypothesis [evidence: `.planning/GENESIS.md`; `MASTER_PLAN.md`], but the roadmap should not depend on SEO until there are real public pages, crawlable content, and proof that users opt in to publication.

Initial growth loop:

- Recruit a small beta cohort through direct outreach to civic-minded residents, neighborhood associations, and local issue communities [assumption: workspace-only GTM recommendation, unvalidated].
- Drive users to the existing submission flow and require payment before delivery [evidence: `apps/web/app/submit`; `apps/api/src/routes/payments.ts`].
- Track visitor-to-preview conversion, preview-to-payment conversion, delivered-letter rate, official response rate, refund rate, and moderation queue load [assumption: EIR recommended KPI set].
- Do not spend on paid acquisition until preview-to-payment conversion is at least 3% [assumption: inherited `.planning/PROJECT.md` validation gate, unvalidated].

## Competition

Named competitors and alternatives in the repo are Resistbot, Change.org, Quorum, and VoterVoice [evidence: `.planning/PROJECT.md`; `MASTER_PLAN.md`].

Competitive view:

| Alternative | Customer | Why It Matters | CivicState Wedge |
|---|---|---|---|
| Resistbot | Individuals contacting officials | Closest low-friction citizen letter tool [assumption: repo characterization, unverified externally] | Add citation-backed research and payment-funded delivery workflow [assumption: product positioning] |
| Change.org | Petition creators and signers | Captures public-signature behavior [assumption: repo characterization, unverified externally] | Deliver individualized constituent letters instead of only hosting petitions [assumption: product positioning] |
| Quorum | Organizations and public affairs teams | Enterprise advocacy/workflow budget holder [assumption: repo characterization, unverified externally] | Avoid enterprise sale, start with consumer transactions [assumption: product strategy] |
| VoterVoice | Organizations and advocacy campaigns | Existing advocacy software category [assumption: repo characterization, unverified externally] | Consumer-first, per-campaign pricing [assumption: product strategy] |

The competitive risk is not that no one can copy this. The risk is that the wedge is too small, willingness to pay is weak, and free or nonprofit tools satisfy enough of the market.

## Risks And Anti-Plan

Anti-plan, written as the skeptical partner case: do not invest if the first beta proves users like the letter preview but will not pay. A product that generates impressive civic drafts but cannot convert to payment is a demo, not a business.

Do not invest if deliverability into government inboxes fails. The inherited plan sets an 85% inbox-placement validation gate [assumption: `.planning/PROJECT.md` validation target, no live data]. If official domains block or spam-folder the product, the value proposition collapses.

Do not invest if citation verification is brittle. The product touches legal-adjacent claims, political opinions, and official communications. A single fabricated citation or unsafe harassment escalation can create reputational and platform risk.

Do not invest if local official coverage is poor. The inherited plan sets 95% federal/state coverage and 60% local coverage as validation gates [assumption: `.planning/PROJECT.md` targets, no live data]. If users cannot reach the right target, the product loses the trust moment before payment.

Do not invest if the operator burden exceeds 30 minutes per day [assumption: `.planning/PROJECT.md` operating target, no measured queue data]. The repo assumes exception-based operation, but moderation, refunds, bounced emails, opt-outs, and official data cleanup may make the business manually intensive.

Sensitivity constraints: political opinion data, civic targeting, user names, letter content, and ZIP codes are sensitive. The repo models encryption, audit logs, CCPA deletion, opt-outs, and AI disclosure [evidence: `packages/shared/prisma/schema.prisma`; `apps/api/src/routes/compliance.ts`; `apps/web/app/privacy/page.tsx`; `apps/web/app/terms/page.tsx`], but no legal conclusion is asserted here.

## Assumption Ledger

| Assumption | Current Basis | Validation Test | Kill Or Continue Threshold |
|---|---|---|---|
| People will pay for the workflow | [assumption: inherited repo thesis] | Run beta traffic to preview and payment | Continue only if preview-to-payment conversion reaches 3% [assumption: inherited validation gate] |
| Email delivery is sufficient | [assumption: `.planning/GENESIS.md`] | Measure delivery and bounce outcomes by official domain | Continue only if inbox placement reaches 85% [assumption: inherited validation gate] |
| Official lookup is accurate enough | [assumption: `.planning/PROJECT.md`] | Compare matched officials to manual review for sampled ZIP codes | Continue only if federal/state coverage reaches 95% and local coverage reaches 60% [assumption: inherited validation gates] |
| AI citations can be verified safely | [assumption: repo architecture] | Audit generated citations against verifier output and human review | Continue only if unverified citations are stripped before preview and delivery [evidence: `apps/worker/src/agents/researcher.ts`] |
| Unit economics support a small operator | [assumption: inherited `MASTER_PLAN.md` model] | Compare Stripe, Anthropic, Postmark, hosting, refunds, and operator time | Continue only if contribution after variable and fixed costs is positive at $340 MRR [assumption: inherited break-even model] |

## Surprise Spikes

The repo/project identity is inconsistent: registry says `brooks-history`, while the product, docs, package metadata, UI, API logs, and planning files say CivicState [evidence: registry dispatch; `package.json`; `.planning/PROJECT.md`; `apps/web/app/page.tsx`; `apps/api/src/index.ts`].

The code and planning disagree on package semantics: code has $15 for three officials [evidence: `apps/api/src/routes/payments.ts`], while `MASTER_PLAN.md` describes $15 for five letters [evidence: `MASTER_PLAN.md`]. That is a pricing, margin, and customer-promise issue.

The inherited plans state completed phases on 2026-04-25 [evidence: `.planning/ROADMAP.md`], but root soul files were missing before this upgrade [evidence: initial workspace scan]. That suggests a product build existed without a VC-grade data-room narrative.

## Evidence Sources And Freshness

Workspace sources used:

- [`MASTER_PLAN.md`](MASTER_PLAN.md) [evidence: inherited product, pricing, risk, and roadmap narrative]
- [`.planning/PROJECT.md`](.planning/PROJECT.md) [evidence: current project statement, constraints, validation gates, and decisions]
- [`.planning/GENESIS.md`](.planning/GENESIS.md) [evidence: original assumptions, value chain, target user, distribution hypothesis]
- [`.planning/ROADMAP.md`](.planning/ROADMAP.md) [evidence: completed build phases as recorded by prior planning]
- [`packages/shared/prisma/schema.prisma`](packages/shared/prisma/schema.prisma) [evidence: implemented data model]
- [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts) [evidence: implemented pricing and Stripe checkout route]
- [`apps/api/src/routes/compliance.ts`](apps/api/src/routes/compliance.ts) [evidence: implemented compliance endpoints]
- [`apps/worker/src/agents/researcher.ts`](apps/worker/src/agents/researcher.ts) [evidence: citation verification and stripping flow]

Freshness warning: no network research was available, so all external market, legal, API-availability, competitor, and vendor-pricing statements remain assumptions as of 2026-06-21 [evidence: worker dispatch current date].

## Roadmap Implications

The next roadmap should stop declaring the platform complete and instead focus on evidence production: resolve identity/pricing contradictions, instrument the paid funnel, run official coverage QA, run deliverability tests, collect real unit economics, and produce a launch/no-launch decision. The asset can become investible only after measured demand and risk controls replace inherited assumptions.
