# CivicState Business Plan

## Snapshot

**Document date:** 2026-06-21 [evidence: dispatch current_date]. **Project id:** brooks-history [evidence: dispatch]. **Operating name in repo:** CivicState [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [package.json](package.json)]. **Authority status:** proposed soul upgrade, not operator-adopted [evidence: dispatch].

CivicState is an AI-assisted constituent communication product: a resident submits a civic concern and ZIP code, the system moderates the content, identifies public officials, researches legal/regulatory context, drafts citation-backed letters, takes one-time payment, and sends emails through Postmark [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].

**Ten-second thesis:** CivicState is a real civic-action MVP with strong workflow completeness, but it remains a watchlist/research asset until demand, local official coverage, deliverability, and legal/compliance posture are externally validated [evidence: dispatch registry note; assumption: no customer, revenue, or production delivery data was present in workspace].

## Thesis Current

The investible thesis is not "AI writes letters." The stronger thesis is that a paid, auditable workflow can turn an abandoned civic task into a completed constituent communication: issue intake, official routing, source-constrained research, citation verification, compliance text, payment gating, and delivery tracking [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)].

The repo supports a **conditional watchlist** view, not a priced venture round. The codebase shows a buildable product surface and backend architecture [evidence: [apps](apps), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)], but the registry explicitly flags the asset as "personal/research" and "not near-term investible BOS" unless the operator confirms it should pitch as a business [evidence: dispatch registry note]. The current plan should therefore frame CivicState as an EIR validation candidate.

## Product Reality

What exists in the repository:

- Monorepo with `apps/web`, `apps/api`, `apps/worker`, and `packages/shared` [evidence: [package.json](package.json)].
- Express API routes for submissions, officials lookup, payments, campaigns, admin, compliance, and webhooks [evidence: [apps/api/src/index.ts](apps/api/src/index.ts)].
- Next.js app surfaces for submit, dashboard, admin, privacy, terms, and about pages [evidence: [apps/web/app](apps/web/app)].
- Worker agents for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: [apps/worker/src/agents](apps/worker/src/agents)].
- Prisma schema covering users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Hardcoded Stripe tiers: `$5.00`, `$15.00`, and `$25.00` [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Local official lookup is still a Cicero stub returning no officials until an API key and implementation exist [evidence: [apps/api/src/lib/officials/cicero.ts](apps/api/src/lib/officials/cicero.ts)].

Surprise spike: existing planning docs claim phase completion across the roadmap [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while the requirements file still marks many launch requirements unchecked [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]. The business plan should treat the implementation as MVP-code-present, not product-market-fit-present.

## Customer Definition

Primary customer: a U.S. resident with a specific civic complaint or request who is willing to pay a small one-time fee to avoid researching jurisdiction, finding officials, drafting formal language, and managing delivery [evidence: [.planning/GENESIS.md](.planning/GENESIS.md); assumption: willingness to pay remains unvalidated].

Initial use cases:

- Local service failures such as noise, code enforcement, road maintenance, school policy, zoning, housing habitability, or environmental complaints [evidence: [.planning/GENESIS.md](.planning/GENESIS.md); assumption: these are representative high-intent civic categories].
- Users who want help communicating, not legal advice, regulatory filings, lobbying representation, or claim submission [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx)].

Non-customers at launch:

- Campaign organizations needing bulk advocacy tooling [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- People seeking legal representation or filings [evidence: [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx)].
- Officials, who are recipients and compliance stakeholders rather than paying users [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Market Sizing

Workspace-only constraint: no live market databases, competitor traffic tools, government datasets, or paid research were available. All market sizing below is an assumption model, not evidence.

Bottom-up wedge model:

| Segment | Annual addressable users | Conversion | Average order | Annual revenue |
|---|---:|---:|---:|---:|
| Validation wedge: high-intent organic visitors | 10,000 [assumption: narrow SEO pilot basis] | 3% [assumption: existing planning target] | `$15.00` [evidence: pricing tier in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] | `$4,500` [assumption: 10,000 x 3% x $15] |
| Early repeatable niche | 100,000 [assumption: broader long-tail civic search wedge] | 3% [assumption: same conversion gate] | `$15.00` [evidence] | `$45,000` [assumption: 100,000 x 3% x $15] |
| Scaled consumer civic workflow | 1,000,000 [assumption: national long-tail ceiling, not TAM evidence] | 2% [assumption: lower mature conversion] | `$15.00` [evidence] | `$300,000` [assumption: 1,000,000 x 2% x $15] |

This is deliberately not a top-down TAM. The usable question is whether CivicState can acquire enough high-intent residents at low cost and produce reliable official delivery. The first commercial gate should be **300 paid orders/year** [assumption: 10,000 visitors x 3% conversion], not a billion-dollar TAM narrative.

## Revenue Model

Launch revenue is one-time transaction revenue:

- Single official: `$5.00` [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Three officials: `$15.00` [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Full spread: `$25.00` [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].

Future revenue streams remain speculative:

- Priority human review at a premium price [assumption: based on MASTER_PLAN.md narrative, not implemented as a differentiated SKU].
- Organization/API plans for HOAs, nonprofits, or civic groups [assumption: documented as out of scope/future in [.planning/PROJECT.md](.planning/PROJECT.md)].
- Certified mail or fax add-ons [assumption: deferred in [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

Revenue-model risk: a one-time payment model avoids subscription friction, but it may not support venture-scale retention unless organic acquisition compounds or the product expands into repeat civic workflows [assumption: business-model inference].

## Financial Model

The repo contains pricing and cost-control logic, but no actual revenue, customer, CAC, bank, Stripe balance, or production cost evidence [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts)]. The following table is an assumption-led operating model.

| Metric | Conservative | Base | Aggressive |
|---|---:|---:|---:|
| Orders/month | 25 [assumption: first traction gate] | 100 [assumption: repeatable wedge] | 500 [assumption: early scale] |
| Average order | `$15.00` [evidence: middle tier] | `$15.00` [evidence] | `$15.00` [evidence] |
| Gross revenue/month | `$375` [assumption: 25 x $15] | `$1,500` [assumption: 100 x $15] | `$7,500` [assumption: 500 x $15] |
| Variable cost/order | `$0.60` [evidence: full-spread estimate in [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts); assumption: use highest coded estimate] | `$0.60` [evidence/assumption] | `$0.60` [evidence/assumption] |
| Variable cost/month | `$15` [assumption: 25 x $0.60] | `$60` [assumption: 100 x $0.60] | `$300` [assumption: 500 x $0.60] |
| Gross profit before fixed costs | `$360` [assumption: $375 - $15] | `$1,440` [assumption: $1,500 - $60] | `$7,200` [assumption: $7,500 - $300] |
| Gross margin before fixed costs | 96% [assumption: $360 / $375] | 96% [assumption: $1,440 / $1,500] | 96% [assumption: $7,200 / $7,500] |
| Fixed platform cost/month | `$150` [assumption: lean hosting/email/tooling floor based on MASTER_PLAN.md, not invoice evidence] | `$250` [assumption: added monitoring/email volume] | `$500` [assumption: more infrastructure/support] |
| Contribution after fixed costs | `$210` [assumption: $360 - $150] | `$1,190` [assumption: $1,440 - $250] | `$6,700` [assumption: $7,200 - $500] |

Internal reconciliation check: in every scenario, orders x average order equals gross revenue; gross revenue minus variable cost equals gross profit; gross profit minus fixed cost equals contribution [assumption: arithmetic model].

## Go To Market

The plan should begin with validation, not scale:

1. Ship a closed beta to a geographically constrained set of users where official coverage can be manually audited before payment [assumption: de-risks local official data].
2. Use long-tail SEO pages only after legal/compliance review of public campaign content [evidence: public-campaign concept in [MASTER_PLAN.md](MASTER_PLAN.md); assumption: publication is not yet proven safe].
3. Track conversion from preview to payment as the core demand metric, with a first gate of 3% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); assumption: threshold was not validated].
4. Track email delivery and bounce by government domain; pause domains above 10% bounce rate [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
5. Add partnerships only after the consumer workflow proves response, deliverability, and refund behavior [assumption: avoids enterprise distraction].

## Competition

Named competitive set:

- Resistbot: closest free/low-friction constituent messaging analogue, but existing docs position CivicState as differentiated by research and citation-backed drafting [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); assumption: current Resistbot capabilities were not externally verified].
- Change.org: petition hosting and signature gathering analogue, while CivicState emphasizes direct letters to officials [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); assumption: current Change.org product scope was not externally verified].
- Quorum / VoterVoice-style enterprise advocacy tools: organization-oriented advocacy software, not individual pay-per-letter workflow [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); assumption: current pricing and feature scope were not externally verified].
- Manual constituent outreach: free alternative with high user effort [assumption: behavioral competitor].
- Generic AI writing tools: can draft text, but do not own official routing, payment-gated delivery, citation verification, or dashboard workflow [assumption: product comparison].

Competitive risk: the workflow moat is weak before volume. The repo's claimed moat depends on accumulating officials directory quality, citation libraries, bounce history, and public campaign content [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. At low volume, a motivated competitor can copy the product shape [assumption: market risk].

## Risks And Anti-Plan

A skeptical partner should try to kill this deal on the following grounds:

- **Demand may be fake.** Civic frustration is abundant, but paying `$5.00` to `$25.00` for a letter is unproven [evidence: pricing exists; assumption: willingness to pay unknown].
- **Officials may ignore or suppress AI-assisted mass-style messages.** If response rates are low or offices classify messages as spam, the user value collapses [assumption: deliverability and response behavior not validated].
- **Local official coverage is not real yet.** Federal/state lookup exists, but local lookup is a Cicero stub returning empty results [evidence: [apps/api/src/lib/officials/cicero.ts](apps/api/src/lib/officials/cicero.ts)].
- **Legal/compliance risk can swamp a small operator.** Political opinion data, public campaign pages, defamation-risk allegations, child-safety topics, privacy deletion, AI disclosure, and email compliance all need operator-grade controls [evidence: [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx), [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx), [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)].
- **The economics are cheap but may be too small.** High gross margin does not solve acquisition, repeat frequency, support load, or legal review cost [assumption: business-model risk].
- **The repo may be overbuilt for a research asset.** The registry says personal/research and not near-term investible unless operator confirms business intent [evidence: dispatch registry note].

Anti-plan: do not pitch as venture-ready until the operator validates business intent, at least one paid cohort, delivery performance, local official coverage, and compliance posture [assumption: investment-readiness gate].

## Assumption Ledger

| Assumption | Basis | Validation test |
|---|---|---|
| Users will pay at least `$5.00` [evidence: price exists] for a completed civic letter workflow | [assumption: documented hypothesis in [.planning/GENESIS.md](.planning/GENESIS.md)] | Run beta with payment required after preview |
| 3% preview-to-payment conversion is sufficient for initial traction | [evidence: target in [.planning/PROJECT.md](.planning/PROJECT.md); assumption: threshold unvalidated] | Measure conversion on first 1,000 qualified visitors [assumption: sample target] |
| Email to officials is acceptable launch delivery | [evidence: delivery architecture in [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts); assumption: government inbox behavior unknown] | Track delivered, bounced, spam complaint, and replies by domain |
| Citation verification can keep legal references trustworthy | [evidence: [apps/worker/src/lib/legal/citation-verifier.ts](apps/worker/src/lib/legal/citation-verifier.ts)] | Audit sampled outputs against source documents |
| One operator can manage flagged submissions | [evidence: admin queue exists in [apps/api/src/routes/admin.ts](apps/api/src/routes/admin.ts); assumption: volume and review complexity unknown] | Time-box flagged-review SLA during beta |
| SEO can acquire customers cheaply | [evidence: SEO strategy in [MASTER_PLAN.md](MASTER_PLAN.md); assumption: not validated] | Publish limited compliant pages and measure qualified organic leads |

## Evidence Sources And Freshness

Workspace evidence used:

- Dispatch registry note and current date, received 2026-06-21 [evidence: user message].
- Existing project plan last updated 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Genesis context generated 2026-04-25 [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].
- Requirements defined 2026-04-25 [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- Existing roadmap with phase completion dates of 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)].
- Code inspection of API, web, worker, and Prisma files on 2026-06-21 [evidence: workspace files].

Freshness warning: no network research was available. Any external market, competitor, legal, regulatory, model-pricing, or deliverability claim is stale unless tagged as an assumption and rechecked before fundraising [assumption: workspace-only mode].

## Decision

VC-grade answer as of 2026-06-21 [evidence: dispatch current_date]: keep CivicState on the watchlist as a serious EIR validation candidate, not a near-term investible company [evidence: dispatch registry note]. The repo has unusually complete product and operational scaffolding for a research asset [evidence: source tree], but the missing proof points are exactly the ones that determine venture quality: paid demand, repeatable acquisition, official coverage, delivery success, response value, and regulatory/compliance risk.
