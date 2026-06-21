# CivicState Business Plan

Updated: 2026-06-21 [evidence: worker dispatch current_date]
Status: candidate soul, watchlisted until operator confirms this should pitch as a business [evidence: worker dispatch registry notes]
Source posture: workspace-only; external market claims are assumptions, not evidence [evidence: worker dispatch]

## Executive Snapshot

CivicState is an AI-assisted civic advocacy platform that turns a resident's civic issue, desired outcome, and ZIP code into researched, citation-backed letters addressed to relevant public officials [evidence: .planning/PROJECT.md; apps/web/app/page.tsx; apps/api/src/routes/submissions.ts]. The repo contains a real Next.js frontend, Express API, BullMQ worker, Prisma schema, payment routes, moderation tests, delivery concepts, admin views, and compliance pages [evidence: apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests/api-routes.test.ts; tests/payment.test.ts].

The investible thesis is not yet proven. The current registry classifies the asset as personal/research and not near-term investible unless the operator confirms it should be pitched as a business [evidence: worker dispatch registry notes]. The right posture is a paid-validation micro-business: prove that individual residents will pay $5 [evidence: tests/payment.test.ts], $15 [evidence: tests/payment.test.ts], or $25 [evidence: tests/payment.test.ts] for done-for-you civic outreach before claiming a venture-scale company.

## Current Thesis

Thesis: if a resident already has a specific civic demand but lacks time, law/context, official routing, or confidence, CivicState can convert that intent into a professional constituent communication at a low transactional price [evidence: .planning/PROJECT.md; .planning/GENESIS.md]. The product wedge is not generic letter writing. The wedge is the bundled workflow: issue intake, official lookup, legal/civic research, citation verification, moderation, payment gating, and deliverability tracking [evidence: .planning/REQUIREMENTS.md; packages/shared/prisma/schema.prisma].

As of 2026-06-21 [evidence: worker dispatch current_date], the strongest evidence is build progress, not market pull. The codebase has app structure and tests [evidence: apps/api/src/index.ts; apps/web/app/page.tsx; apps/worker/src/index.ts; tests/api-routes.test.ts], while no repository evidence shows paying customers, traffic, conversion, official response rates, or retained usage [evidence: .planning/existing-state.md; .planning/STATE.md].

## What Is Real Today

Real product surface:

- Root package identifies the project as CivicState and describes researched letters to officials [evidence: package.json].
- API routes mount health, submissions, officials, payments, campaigns, webhooks, admin, compliance, and Bull Board queue monitoring [evidence: apps/api/src/index.ts].
- Worker registers classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/index.ts].
- Prisma schema models users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- Tests cover moderation rejection, submission validation, pricing tiers, payment auth, webhook concepts, treasury, delivery, compliance, and admin flows [evidence: tests/api-routes.test.ts; tests/payment.test.ts; tests/compliance.test.ts].

Not real yet in the data room:

- No evidence of live traffic, paid revenue, customer interviews, or production deployment was found [evidence: .planning/existing-state.md; .planning/STATE.md].
- No external research was available in this workspace-only run, so demand, market size, competitor pricing, and legal interpretations remain assumptions [assumption: no network access in worker dispatch].

## Customer Definition

Primary customer: a United States resident with a concrete civic complaint or policy request who would contact government if research, formatting, routing, and delivery were handled for them [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

Best early segment: high-intent residents dealing with local enforcement failures, road/utility complaints, zoning concerns, school policy disputes, public-safety concerns, or agency responsiveness problems [assumption: EIR segmentation based on repo target-user language and common civic issue categories].

Excluded customers at launch: legal claimants, businesses seeking advocacy services, political campaigns, mass-mail organizers, users targeting private individuals, and users seeking legal advice or regulatory filings [evidence: MASTER_PLAN.md; .planning/GENESIS.md].

The customer is the payer. Government officials are recipients, not buyers [evidence: .planning/PROJECT.md].

## Product and Workflow

The core workflow is:

- Resident submits issue, desired outcome, ZIP code, and anonymity preference [evidence: .planning/REQUIREMENTS.md; apps/web/components/wizard/issue-form.tsx].
- Platform moderates threats and defamation-risk content before the agent pipeline runs [evidence: apps/api/src/lib/moderation.ts; tests/api-routes.test.ts].
- Officials are looked up across federal, state, and local sources, then cached and filtered for opt-outs or bounce risk [evidence: apps/api/src/lib/officials/lookup.ts; packages/shared/prisma/schema.prisma].
- Researcher and drafter agents create cited letters, with unverified citations stripped or escalated [evidence: .planning/REQUIREMENTS.md; apps/worker/src/lib/legal/citation-verifier.ts].
- Stripe payment gates delivery; the system should not send before webhook-confirmed payment [evidence: tests/payment.test.ts; apps/api/src/routes/payments.ts].
- Delivery status, replies, audit logs, and compliance controls are tracked [evidence: packages/shared/prisma/schema.prisma; apps/web/components/dashboard/delivery-status.tsx; apps/api/src/routes/compliance.ts].

## Market Sizing Method

No external market data is available in this worker boundary. The sizing below is a bottom-up validation model, not a sourced market claim [assumption: workspace-only constraint].

Formula: paid civic jobs per year x blended average order value = annual gross revenue [assumption: EIR sizing method].

Blended average order value:

| Tier | Price | Mix | Revenue contribution |
| --- | --- | --- | --- |
| Single official | $5.00 [evidence: tests/payment.test.ts] | 40.0% [assumption: launch tier-mix placeholder] | $2.00 [assumption: formula] |
| Three officials | $15.00 [evidence: tests/payment.test.ts] | 35.0% [assumption: launch tier-mix placeholder] | $5.25 [assumption: formula] |
| Full spread | $25.00 [evidence: tests/payment.test.ts] | 25.0% [assumption: launch tier-mix placeholder] | $6.25 [assumption: formula] |
| Blended AOV | $13.50 [assumption: formula from tier mix] | 100.0% [assumption: formula] | $13.50 [assumption: formula] |

Sizing scenarios:

| Scenario | Paid jobs per year | Gross revenue | Meaning |
| --- | --- | --- | --- |
| Validation floor | 1,200 jobs [assumption: first-city validation target] | $16,200 [assumption: 1,200 jobs x $13.50 AOV] | Enough to test conversion, support burden, and deliverability |
| Operator-scale base | 4,800 jobs [evidence: .planning/existing-state.md planned year scale] | $64,800 [assumption: 4,800 jobs x $13.50 AOV] | Matches the repository's prior campaign-volume planning |
| Venture-proxy TAM | 2,000,000 jobs [assumption: placeholder until external demand research] | $27,000,000 [assumption: 2,000,000 jobs x $13.50 AOV] | Only a hypothesis; not evidence of a fundable market |

The partner-kill version: without sourced search-volume, survey, or payment data, TAM is a scenario model. The next proof is paid conversion, not a prettier market slide.

## Revenue Model and Pricing

Launch revenue is one-time transactional payment per campaign package [evidence: .planning/PROJECT.md; tests/payment.test.ts]. The active tiers are:

- Single official: $5.00 [evidence: tests/payment.test.ts].
- Three officials: $15.00 [evidence: tests/payment.test.ts].
- Full spread: $25.00 [evidence: tests/payment.test.ts].

The repo explicitly defers subscriptions, API access, certified mail, fax, public campaign mechanics, coalition features, and AI reply summarization until after the core loop proves itself [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

Pricing risk: a very low entry price can validate willingness to pay, but it can also trap the brand in low-consideration support economics [assumption: EIR pricing judgment].

## Financial Model

Unit cost references in tests assume estimated variable costs of $0.20 [evidence: tests/payment.test.ts], $0.40 [evidence: tests/payment.test.ts], and $0.60 [evidence: tests/payment.test.ts] by tier. Payment processing reserve is modeled at $0.69 per blended order [assumption: $13.50 AOV x 2.9% plus $0.30 fixed fee, pending actual processor contract]. Blended variable platform cost is $0.37 [assumption: weighted formula from tier costs and tier mix].

| Metric | Value | Reconciliation |
| --- | --- | --- |
| Blended AOV | $13.50 [assumption: tier-mix formula] | $5.00 x 40.0% + $15.00 x 35.0% + $25.00 x 25.0% [assumption: formula] |
| Blended platform variable cost | $0.37 [assumption: tier-mix formula] | $0.20 x 40.0% + $0.40 x 35.0% + $0.60 x 25.0% [assumption: formula] |
| Payment reserve | $0.69 [assumption: processor placeholder] | $13.50 x 2.9% + $0.30 [assumption: common card-fee placeholder] |
| Contribution per paid job | $12.44 [assumption: formula] | $13.50 - $0.37 - $0.69 [assumption: formula] |
| Contribution margin | 92.1% [assumption: $12.44 / $13.50 formula] | Exceeds the 40.0% margin floor [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md] |

Fixed-cost view:

- Backend droplet plan: $96 per month [evidence: .planning/PROJECT.md].
- Local official provider placeholder: $100 to $500 per month [evidence: .planning/PROJECT.md].
- Operating reserve target: $1,500 [evidence: .planning/PROJECT.md; MASTER_PLAN.md].
- Reserve warning and emergency thresholds: $2,000 [evidence: .planning/REQUIREMENTS.md] and $500 [evidence: .planning/REQUIREMENTS.md].
- Break-even at low fixed cost: 16 paid jobs per month [assumption: $196 / $12.44 rounded up].
- Break-even at high fixed cost: 48 paid jobs per month [assumption: $596 / $12.44 rounded up].

This model reconciles internally, but it is still not investor-grade until the team proves checkout conversion, refund rate, complaint rate, support minutes per job, and deliverability [assumption: EIR validation standard].

## Go-To-Market

Primary GTM hypothesis: SEO-led acquisition around long-tail civic issue pages and public campaign records [evidence: .planning/GENESIS.md]. This is plausible only after the product has public, indexable, high-quality pages and a review policy that avoids defamation, harassment, and unsafe civic claims [assumption: SEO execution risk].

Launch sequence:

- Start with operator-curated issue categories and location pages rather than open-ended public publishing [assumption: risk-controlled launch plan].
- Run a paid beta with manual review on all outgoing letters until moderation, citation verification, and official routing data are reliable [assumption: EIR operating plan].
- Measure preview-to-payment conversion, official lookup coverage, delivery success, reply capture, refund requests, complaint rate, and support load [assumption: EIR metrics plan].
- Do not buy paid acquisition until organic intent and checkout conversion are proven [evidence: .planning/GENESIS.md].

## Competition

| Competitor | Position | CivicState difference | Risk |
| --- | --- | --- | --- |
| Resistbot | Constituent messaging automation [assumption: known civic-tech category] | CivicState adds research, citation verification, paid workflow, and delivery tracking [evidence: .planning/PROJECT.md] | Resistbot may already own low-friction advocacy behavior [assumption: competitive risk] |
| Change.org | Petition and campaign discovery platform [assumption: known civic-tech category] | CivicState focuses on individualized letters to officials, not petition signatures [evidence: MASTER_PLAN.md] | Petition platforms have audience and sharing mechanics [assumption: competitive risk] |
| Quorum | Enterprise public-affairs software [assumption: known public-affairs category] | CivicState targets individuals at $5.00 to $25.00 [evidence: tests/payment.test.ts] | Enterprise incumbents can copy features for organizations [assumption: competitive risk] |
| VoterVoice | Organization-led advocacy campaigns [assumption: known advocacy-tech category] | CivicState is citizen-paid and issue-by-issue [evidence: .planning/PROJECT.md] | Organizations may remain the real budget holders [assumption: competitive risk] |
| LegalZoom | Legal-document workflow brand [assumption: known legal-tech category] | CivicState avoids legal advice and focuses on constituent communications [evidence: .planning/GENESIS.md] | Users may confuse cited letters with legal help [assumption: liability and positioning risk] |
| Direct official websites | Free manual contact path [assumption: obvious substitute] | CivicState sells research, drafting, routing, and tracking convenience [evidence: .planning/GENESIS.md] | Free substitutes cap willingness to pay [assumption: pricing risk] |

## Risks and Anti-Plan

Anti-plan: do not pitch this as a VC-backable business yet. Pitching now would overclaim demand, legal safety, deliverability, and market size [evidence: worker dispatch registry notes; .planning/existing-state.md].

Hard risks:

- Demand risk: citizens may agree the tool is useful and still refuse to pay $5.00 [evidence: tests/payment.test.ts; assumption: willingness-to-pay risk].
- Free substitute risk: official contact forms, email, and advocacy groups cost $0.00 [assumption: obvious substitute].
- Deliverability risk: government inboxes may throttle, bounce, or spam-classify paid civic letters [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].
- Legal and safety risk: users can submit defamatory, threatening, harassing, or legal-adjacent content; the repo has moderation concepts, but production safety is unproven [evidence: tests/api-routes.test.ts; apps/api/src/lib/moderation.ts].
- Citation risk: a wrong or hallucinated citation harms trust and may create legal-adjacent exposure [evidence: .planning/REQUIREMENTS.md].
- Official-data risk: local official lookup depends on provider choice and cache quality [evidence: .planning/STATE.md; apps/api/src/lib/officials/cicero.ts].
- Business-form risk: the registry explicitly says personal/research asset and asks whether it should pitch as a business [evidence: worker dispatch registry notes].

Kill criteria before scaling:

- Checkout conversion below 3.0% [evidence: .planning/PROJECT.md validation gate].
- Chargeback rate above 0.5% [evidence: .planning/PROJECT.md].
- Government inbox placement below 85.0% [evidence: .planning/PROJECT.md].
- Federal/state official coverage below 95.0% [evidence: .planning/PROJECT.md].
- Local official coverage below 60.0% [evidence: .planning/PROJECT.md].
- Human review burden above 30 minutes per day at launch volume [evidence: .planning/PROJECT.md].

## Assumption Ledger

| Assumption | Basis | Test |
| --- | --- | --- |
| Residents will pay for convenience, research, and routing | [assumption: repo thesis, not customer evidence] | Paid beta with checkout events |
| AOV can hold at $13.50 | [assumption: tier-mix formula] | Track actual tier mix |
| Variable platform cost stays near $0.37 | [assumption: test cost references and tier mix] | Log tokens, delivery cost, retries, review cost |
| SEO can acquire high-intent users | [assumption: .planning/GENESIS.md GTM hypothesis] | Publish controlled pages and measure search impressions |
| Citation verification can make AI research trustworthy | [assumption: code and requirements exist, production accuracy unproven] | Blind review of sampled letters before send |
| One operator can run launch operations | [assumption: .planning/GENESIS.md] | Measure queue depth, oldest flagged item age, and support load |
| CivicState is a business, not just a personal research project | [assumption: operator decision pending] | Operator ruling and beta budget approval |

## Surprise Spikes

- Project identity mismatch: the dispatch says project brooks-history and repo RPLogic-Inc/brookss-history, while the product and package identify as CivicState [evidence: worker dispatch; package.json; .planning/PROJECT.md].
- Maturity mismatch: .planning/ROADMAP.md says all phases completed on 2026-04-25 [evidence: .planning/ROADMAP.md], while .planning/STATE.md says only foundation is complete [evidence: .planning/STATE.md] and requirements still list major product work as pending [evidence: .planning/REQUIREMENTS.md].
- Stale audit mismatch: .planning/existing-state.md says zero application code exists [evidence: .planning/existing-state.md], but the repo now has app, worker, Prisma, and test files [evidence: apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests/api-routes.test.ts].
- Business posture mismatch: the old project plan uses confident market and margin language [evidence: .planning/PROJECT.md], but the registry says watchlist and not near-term investible [evidence: worker dispatch registry notes].

## Evidence and Freshness

Evidence used:

- [package.json](package.json) for product name, package description, and workspace scripts [evidence].
- [.planning/PROJECT.md](.planning/PROJECT.md) for original business thesis, pricing, constraints, and validation gates [evidence].
- [.planning/GENESIS.md](.planning/GENESIS.md) for assumptions, distribution hypothesis, moat hypothesis, target user, and exclusions [evidence].
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) for requirements, payment tiers, compliance controls, moderation, treasury, and validation constraints [evidence].
- [.planning/STATE.md](.planning/STATE.md) for current phase and blocker notes [evidence].
- [.planning/ROADMAP.md](.planning/ROADMAP.md) for original build narrative and completion claims [evidence].
- [MASTER_PLAN.md](MASTER_PLAN.md) for broader architecture, business-model, and anti-scope context [evidence].
- [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), and [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) for current implementation reality [evidence].
- [tests/payment.test.ts](tests/payment.test.ts), [tests/api-routes.test.ts](tests/api-routes.test.ts), and [tests/compliance.test.ts](tests/compliance.test.ts) for tested behavior [evidence].

Freshness assessment: latest reliable repo planning date found was 2026-04-25 [evidence: .planning/STATE.md; .planning/ROADMAP.md]. The intake brief date observed was 2026-04-10 [evidence: .planning/INTAKE-BRIEF.md]. The EIR review date is 2026-06-21 [evidence: worker dispatch current_date]. Anything external to the repository is stale or unknown unless explicitly marked as an assumption [assumption: workspace-only run].

## Decision Needed

Operator decision required: confirm whether CivicState/Brooks History should be treated as a business candidate or remain a personal/research asset [evidence: worker dispatch registry notes]. Until that ruling and paid validation exist, the correct gate status is candidate, not adopted [evidence: worker dispatch gate instructions].
