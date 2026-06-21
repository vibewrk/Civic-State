# CivicState Business Plan

## Doc Dates

- Current review date: 2026-06-21 [evidence: worker runtime context].
- Source plan date: 2026-04-25 [evidence: .planning/PROJECT.md].
- Intake brief date: 2026-04-10 [evidence: .planning/INTAKE-BRIEF.md].
- Freshness stance: workspace-only review; no network research was available, so all external market claims are marked as assumptions and need operator validation.

## Honesty Labels

- [evidence] means the claim comes from a repository file or code in this workspace.
- [assumption: basis] means the claim depends on external market, legal, vendor, or user behavior that was not verified in this workspace-only run.
- Factory output and AI synthesis are not treated as evidence unless they point to a concrete repo artifact.

## Executive Snapshot

CivicState is a civic letter automation product: a resident describes a civic concern, the system identifies officials, researches relevant regulations, drafts cited letters, takes payment, and sends individual emails. The repo now contains a real Next.js/Express/BullMQ/Prisma application surface, but no production usage evidence, no revenue evidence, and no validated customer demand evidence were found [evidence: apps/web/app/page.tsx; apps/api/src/index.ts; packages/shared/prisma/schema.prisma].

Investment stance as of 2026-06-21: watchlist research asset, not near-term investible BOS, unless the operator confirms the project should be pitched as an operating business and supplies validation data [evidence: registry note in dispatch].

## Thesis Current

The strongest thesis is not "AI civic tech wins broadly." It is narrower: ordinary US residents may pay a small one-time fee when CivicState collapses four high-friction tasks into one workflow: identify jurisdiction, find applicable law, draft professional language, and deliver to the right officials [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

The repo supports a credible product thesis, not yet a credible venture thesis. It has implemented components for submission, official lookup, moderation, payment, delivery, dashboards, admin, and compliance [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/api/src/routes/payments.ts; apps/api/src/routes/campaigns.ts; apps/api/src/routes/admin.ts; apps/api/src/routes/compliance.ts]. It does not show live traffic, conversion, deliverability, official response rate, customer acquisition cost, retention, or willingness-to-pay evidence [evidence: .planning/existing-state.md].

## Customer Definition

Primary customer: a US resident with a specific civic frustration who would contact government if research, drafting, routing, and delivery were handled for them [evidence: .planning/GENESIS.md].

Initial buyer behavior to validate: the resident will pay $5 for one official, $15 for three officials, or $25 for all matched officials after seeing draft value [evidence: apps/api/src/routes/payments.ts; apps/web/components/wizard/letter-preview.tsx].

Non-customers at launch: lobbying firms, law firms, campaigns, PACs, nonprofits needing enterprise workflows, and users seeking legal filings or regulatory claims [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

Sensitivity constraint: political opinion and civic complaint content can be sensitive personal data. The repo plans or implements application encryption, audit logs, moderation, AI disclosure, not-legal-advice language, and CCPA-style deletion flows, but this is not legal advice and has not been externally reviewed [evidence: packages/shared/prisma/schema.prisma; apps/api/src/routes/compliance.ts; apps/web/app/privacy/page.tsx].

## Product Reality

Built or present in the repo:

- Next.js frontend with home page, submit wizard, dashboard, admin pages, privacy, terms, sign-in, and sign-up surfaces [evidence: apps/web/app; apps/web/components].
- Express API with health, submissions, officials, payments, webhooks, campaigns, admin, and compliance routes [evidence: apps/api/src/index.ts].
- Prisma data model covering users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- BullMQ worker entrypoint with classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/index.ts].
- Stripe checkout tiers at 500 cents, 1500 cents, and 2500 cents [evidence: apps/api/src/routes/payments.ts].

Not yet proven from workspace evidence:

- Production deployment, real users, or real revenue [evidence: .planning/existing-state.md].
- Official directory coverage at federal, state, and local levels in production [assumption: external API availability and coverage must be tested].
- Inbox placement and response behavior from government domains [assumption: deliverability must be measured after domain warming].
- Legal/regulatory sufficiency of CAN-SPAM, CCPA, AI disclosure, and not-legal-advice controls [assumption: counsel review required].

## Market Sizing

Because network research is unavailable, this sizing is deliberately bottoms-up and assumption-led.

Launch serviceable market method: US residents with civic complaints who are willing to pay for a done-for-you letter, filtered by organic discoverability and trust. A conservative wedge is "paid submissions per month," not population TAM.

Operator-scale revenue bands:

| Monthly paid submissions | Average order value | Monthly revenue | Annualized revenue | Label |
|---:|---:|---:|---:|---|
| 100 [assumption: early SEO/local pilots] | $15 [evidence: pricing midpoint from payments route] | $1,500 [assumption: submissions x AOV] | $18,000 [assumption: monthly revenue x twelve months] | validation |
| 400 [assumption: .planning/existing-state.md month-twelve campaign scale] | $15 [evidence: pricing midpoint from payments route] | $6,000 [assumption: submissions x AOV] | $72,000 [assumption: monthly revenue x twelve months] | solo-operator side business |
| 1,000 [assumption: post-PMF niche SEO] | $15 [evidence: pricing midpoint from payments route] | $15,000 [assumption: submissions x AOV] | $180,000 [assumption: monthly revenue x twelve months] | small operating business |
| 5,000 [evidence: MASTER_PLAN.md scaling band] | $15 [evidence: pricing midpoint from payments route] | $75,000 [assumption: submissions x AOV] | $900,000 [assumption: monthly revenue x twelve months] | investibility test |

The investible case requires proof that demand scales beyond an operator-run niche, because the current model has low ticket sizes, legal-adjacent risk, and likely trust friction [assumption: civic/payment behavior must be validated].

## Revenue Model

Active revenue model: one-time checkout for email delivery packages [evidence: apps/api/src/routes/payments.ts].

| Tier | Price | Officials | Revenue recognition note |
|---|---:|---:|---|
| Single | $5 [evidence: apps/api/src/routes/payments.ts] | one official [evidence: apps/api/src/routes/payments.ts] | after Stripe payment webhook confirms fulfillment [evidence: apps/api/src/routes/webhooks.ts] |
| Three-pack | $15 [evidence: apps/api/src/routes/payments.ts] | three officials [evidence: apps/api/src/routes/payments.ts] | after Stripe payment webhook confirms fulfillment [evidence: apps/api/src/routes/webhooks.ts] |
| Full-spread | $25 [evidence: apps/api/src/routes/payments.ts] | all matched officials [evidence: apps/api/src/routes/payments.ts] | depends on official matching coverage [assumption: local data provider quality] |

Planned guardrails include a 40% net margin floor [evidence: .planning/PROJECT.md], an estimated 88-92% letter-package gross margin [evidence: MASTER_PLAN.md], a $1,500 Mercury reserve [evidence: .planning/PROJECT.md], $2,000 warning and $500 emergency balance alerts [evidence: .planning/ROADMAP.md], and a 150% job overage pause [evidence: .planning/REQUIREMENTS.md].

Financial reconciliation check: at 400 paid submissions per month [assumption: .planning/existing-state.md month-twelve campaign scale], a $15 average order value [evidence: pricing route midpoint] produces $6,000 monthly revenue [assumption: submissions x AOV]. If gross margin is 88% [evidence: MASTER_PLAN.md], gross profit is $5,280 and direct variable cost is $720 [assumption: revenue x margin]. This does not include fixed infrastructure or operator time.

## Go-To-Market

Current GTM hypothesis: SEO-first, based on opt-in public campaign pages and long-tail civic action searches [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. This is plausible but unvalidated.

Near-term validation should avoid broad consumer marketing. The pragmatic path is:

- Seed narrow use cases where the user has clear urgency, such as zoning, noise, school policy, public works, and agency non-response [assumption: common civic complaint categories].
- Run concierge or operator-reviewed pilots before scaling autonomous delivery [assumption: legal/trust risk is high before evidence exists].
- Measure visitor-to-preview conversion, preview-to-payment conversion, delivery success, bounce rate, official response rate, refund rate, and complaint rate [assumption: core funnel metrics].
- Treat paid ads and partnerships as later channels until unit conversion and trust copy are proven [evidence: .planning/GENESIS.md].

## Competition

Named competitors and substitutes:

- Resistbot: closest grassroots communication substitute, especially for low-friction messages to lawmakers [evidence: MASTER_PLAN.md].
- Change.org: petition and campaign-hosting substitute, not personalized researched letter delivery [evidence: MASTER_PLAN.md].
- LegalZoom: document-drafting substitute for users who think the problem is legal-document creation rather than constituent communication [evidence: MASTER_PLAN.md].
- Quorum and VoterVoice: enterprise civic advocacy categories, likely serving organizations rather than individual transactional buyers [assumption: market positioning requires external validation].
- Manual contact: resident searches officials, researches law, writes email, and sends directly [evidence: MASTER_PLAN.md].
- Generic AI chat plus email: a user asks ChatGPT/Claude for a letter and sends it themselves [assumption: obvious workflow substitute].

Differentiation only matters if citation verification, official targeting, and delivery tracking are measurably better than manual or generic AI workflows.

## Evidence Sources

- [MASTER_PLAN.md](MASTER_PLAN.md): original product architecture, business model, pricing philosophy, competition, infrastructure, and unit economics.
- [.planning/PROJECT.md](.planning/PROJECT.md): core value, requirements, assumptions, constraints, and validation gates.
- [.planning/GENESIS.md](.planning/GENESIS.md): target user, distribution, moat, and success metrics.
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md): implemented and pending requirement inventory.
- [apps/api/src/index.ts](apps/api/src/index.ts): live API surface.
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma): data model reality.
- [apps/web/app/page.tsx](apps/web/app/page.tsx): current user-facing positioning.

## Risks Anti-Plan

The kill-the-deal case is straightforward: this may be a useful personal research asset but a weak venture. The ticket size is low, the workflow is trust-sensitive, government deliverability is hard, and the customer may want civic action to be free. If preview-to-payment conversion is below 3% [evidence: .planning/PROJECT.md validation gate], official inbox placement is below 85% [evidence: .planning/PROJECT.md validation gate], or local official coverage is below 60% [evidence: .planning/PROJECT.md validation gate], the business should not be scaled.

Specific risks:

- Trust risk: users may not want AI-generated civic letters sent in their name [assumption: user trust behavior].
- Legal-adjacent risk: defamation, harassment, lobbying, CAN-SPAM, AI disclosure, and privacy obligations may require counsel and process discipline [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts].
- Deliverability risk: .gov and agency domains may filter repetitive or AI-written letters [assumption: government inbox behavior].
- Coverage risk: local official contact data may be incomplete, stale, or expensive [evidence: .planning/PROJECT.md].
- Competition risk: generic AI plus manual email may satisfy enough users at zero platform fee [assumption: buyer alternative].
- Operational risk: one operator may not keep up if flagged submissions, bounce handling, refund requests, and official opt-outs compound [evidence: .planning/GENESIS.md].
- Product risk: compliance data export route appears to select fields not present in the Prisma schema, which may break right-to-know flow until fixed [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].

Anti-plan: do not fund growth, paid acquisition, or broad public launch until the operator proves paid conversion, official coverage, deliverability, and refund/complaint rates with live users.

## Assumption Ledger

| Assumption | Basis | Validation needed |
|---|---|---|
| Consumers will pay for civic letter delivery | [assumption: low-friction paid civic action may have demand] | Live preview-to-payment conversion |
| SEO can acquire users cheaply | [assumption: long-tail local civic queries are underserved] | Search impressions, clicks, and signup/payment attribution |
| Official email delivery works reliably | [assumption: Postmark plus domain warming can reach agency inboxes] | Inbox placement and bounce tests |
| AI citations can be verified enough for production | [assumption: source APIs and curated cache cover common issues] | Citation failure rate by category |
| Local official data is affordable | [assumption: Cicero/BallotReady/local sources fit budget] | Vendor evaluation and coverage audit |
| One operator can run launch | [evidence: .planning/GENESIS.md] | Flagged queue volume and handling time |

## Surprise Spikes

- The older existing-state document says zero application code exists, but the repo now contains a substantial app skeleton and many routes [evidence: .planning/existing-state.md; apps/api/src/index.ts; apps/web/app; apps/worker/src/index.ts].
- The planning roadmap marks all phases complete, while the requirements file still lists many core requirements as pending [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md].
- Pricing key names differ between frontend and backend: the frontend uses single/three/all, while the API expects single/three_pack/full_spread, which can break checkout [evidence: apps/web/components/wizard/letter-preview.tsx; apps/api/src/routes/payments.ts].
- The registry note says this is a personal/research asset and not near-term investible BOS unless the operator confirms otherwise [evidence: dispatch registry note].

## Roadmap Buildable Shape

The next roadmap should stop claiming broad completion and focus on proof milestones:

- Fix checkout tier mismatch and compliance export schema mismatch [evidence: apps/web/components/wizard/letter-preview.tsx; apps/api/src/routes/payments.ts; apps/api/src/routes/compliance.ts].
- Validate official lookup coverage for a small ZIP sample [assumption: external API testing required].
- Run an end-to-end paid sandbox flow from submission to Stripe webhook to delivery queue [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/webhooks.ts; apps/worker/src/agents/delivery.ts].
- Add an operator pilot protocol before public launch [assumption: risk management].
- Update metrics instrumentation around conversion, deliverability, refunds, and complaints [assumption: data room readiness requirement].

