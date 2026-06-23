# CivicState - Business Plan

As of 2026-06-23 [evidence: worker session date], this soul upgrades the prior CivicState plan into a watchlist-grade, VC-scrutable plan. The repo and registry context say the asset should be treated as personal/research and not near-term investible until operator and market validation change that status [evidence: dispatch registry notes].

Local evidence links used in this workspace-only review include [MASTER_PLAN.md](MASTER_PLAN.md) [evidence], [.planning/PROJECT.md](.planning/PROJECT.md) [evidence], [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence], and [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence].

## Thesis

CivicState can become a profitable narrow civic workflow if ordinary United States residents will pay $5, $15, or $25 [evidence: `apps/api/src/routes/payments.ts`] for researched, citation-backed constituent letters that are routed to the right officials, while the operator keeps the product explicitly outside legal advice, lobbying representation, and claim filing.

## Problem & Customer

The target customer is a United States resident with a concrete civic complaint, policy request, or enforcement concern who lacks the time, confidence, legal citation knowledge, or official-routing knowledge to write to government offices alone [assumption: customer definition synthesized from product scope and no external research in workspace-only mode]. Existing repo planning defines the product as a web platform that turns civic concerns into researched, citation-backed letters delivered to officials for $5-$25 [evidence: `.planning/PROJECT.md`].

Primary segments:

- Individual civic complainants who want one researched letter campaign without joining an organization [assumption: inferred from user-facing flow].
- Local issue advocates who need official routing and formal wording, not social petition virality [assumption: inferred from product positioning].
- Future nonprofit or HOA buyers are explicitly out of active launch scope [evidence: `.planning/PROJECT.md`].

Alternatives today are manual email, Resistbot, Change.org, LegalZoom-style document tools, and enterprise advocacy platforms. The repo plan names Resistbot, Change.org, LegalZoom, and manual contact as the closest comparables or substitutes [evidence: `MASTER_PLAN.md`].

## Market

Workspace-only market sizing uses a bottom-up method and treats all external population and behavior figures as assumptions.

| Scope | Method | Annual value |
|---|---|---:|
| TAM | 258,000,000 United States adults [assumption: rounded public-population memory] x 1 civic issue/year [assumption: behavior placeholder] x $15 average package [evidence: midpoint of repo pricing tiers] | $3,870,000,000 [assumption: arithmetic from assumptions and repo pricing] |
| SAM | 258,000,000 adults [assumption] x 10% willing to use a paid digital civic tool [assumption: placeholder pending survey] x $15 [evidence] | $387,000,000 [assumption: arithmetic] |
| SOM | 25,800,000 SAM users [assumption: TAM adults x 10%] x 0.5% reachable in early organic/partner channels [assumption: placeholder] x $15 [evidence] | $1,935,000 [assumption: arithmetic] |

The real investment question is not whether civic frustration exists; it is whether paid conversion clears 3% [assumption: validation gate preserved from `.planning/PROJECT.md`] and deliverability clears 85% inbox placement on government domains [assumption: validation gate preserved from `.planning/PROJECT.md`].

## Product & Moat

Real today in the repo:

- A monorepo with Next.js frontend, Express API, worker app, shared package, Prisma schema, tests, Docker files, and workspace scripts [evidence: `package.json`].
- Submission creation, validation, moderation, audit logging, and BullMQ enqueueing exist in API code [evidence: `apps/api/src/routes/submissions.ts`].
- Stripe checkout tiers of $5, $15, and $25 exist in API code [evidence: `apps/api/src/routes/payments.ts`].
- Prisma models exist for users, submissions, campaigns, letters, officials, payments, deliveries, audit logs, ledger entries, agent logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`].
- Researcher and Drafter workers include citation-source constraints, citation verification, AI disclosure, disclaimer, and CAN-SPAM footer logic [evidence: `apps/worker/src/agents/researcher.ts`; `apps/worker/src/agents/drafter.ts`].

The moat is not foundational AI. It is a narrow workflow with verified citations, official routing, compliance controls, delivery telemetry, and a growing operations dataset about which civic communications are deliverable and useful [assumption: moat thesis]. That moat is weak until real users pay and official-domain deliverability is measured.

## Platform Posture

CivicState should be treated as a WrkPlug client rather than an independent identity, billing, auth, or login platform. Under the draft platform posture, shared chassis adoption would reduce duplicative infrastructure and allow single-login compounding through the broader MCPWrk account layer [assumption: WrkPlug Phase 0 not yet signed]. Until that operator decision is made, the repo's current implementation uses Clerk, Stripe, Vercel, DigitalOcean, PostgreSQL, Redis, BullMQ, Prisma, and Postmark-oriented delivery [evidence: `MASTER_PLAN.md`; `package.json`].

## Business Model

Revenue is transactional: a user pays once for a letter campaign. Current tiers are single official at $5, three officials at $15, and full spread at $25 [evidence: `apps/api/src/routes/payments.ts`]. Subscriptions, API access, coalition features, certified mail, and automated follow-up loops are deferred [evidence: `MASTER_PLAN.md`; `.planning/PROJECT.md`].

Unit economics model:

| Item | Base case |
|---|---:|
| Average order value | $15.00 [evidence: midpoint active tier] |
| AI plus delivery variable cost | $0.35/order [assumption: repo notes AI near $0.20/submission plus email/vendor buffer] |
| Payment processing | $0.75/order [assumption: Stripe-style card fee estimate in workspace-only mode] |
| Gross profit | $13.90/order [assumption: arithmetic] |
| Gross margin | 92.7% [assumption: arithmetic] |
| Minimum margin guardrail | 40% [evidence: `.planning/PROJECT.md`] |

The business is viable only if paid conversion, low complaint rates, and official-domain deliverability hold together at modest volume. A strong margin on paper does not rescue a workflow nobody trusts or officials ignore.

## Competition

Named competitors and substitutes:

| Alternative | Position | CivicState response |
|---|---|---|
| Resistbot | Low-friction constituent messaging | CivicState aims for researched, citation-backed letters [evidence: `MASTER_PLAN.md`]. |
| Change.org | Petition hosting and public aggregation | CivicState focuses on direct official delivery rather than petition virality [evidence: `MASTER_PLAN.md`]. |
| LegalZoom | Document preparation | CivicState stays civic-specific and must avoid legal-advice positioning [evidence: `MASTER_PLAN.md`]. |
| Quorum / VoterVoice | Enterprise advocacy software | CivicState starts as individual transactional workflow [assumption: competitor category from repo context]. |
| Manual official contact | Free but effortful | CivicState sells research, routing, drafting, and tracking [evidence: `.planning/PROJECT.md`]. |

The riskiest competitor is not a named vendor; it is free manual outreach plus user skepticism that AI-generated letters will be treated as spam [assumption: anti-plan risk].

## Go-To-Market

First distribution should avoid broad political branding. Start with nonpartisan, local, service-delivery issues where a respectful, cited letter feels useful: code enforcement, transit, public works, licensing, utilities, school-board process, and accessibility complaints [assumption: channel hypothesis].

First customer motion:

- Recruit 25 beta users [assumption: operator-led reachable cohort] from local civic forums, neighborhood groups, and professional networks.
- Run 100 letter previews [assumption: enough to observe routing, citations, and user trust] before paid scale.
- Gate launch on 3% paid conversion [assumption: preserved validation gate], 85% deliverability [assumption: preserved validation gate], and chargebacks below 0.5% [evidence: `.planning/PROJECT.md`].
- Publish only opt-in, read-only examples after legal and privacy review [evidence: `MASTER_PLAN.md`].

## Financial Model

Revenue build reconciles as paid campaigns x average order value.

| Period | Paid campaigns | AOV | Revenue | Variable cost | Fixed ops cost | Gross profit before labor |
|---|---:|---:|---:|---:|---:|---:|
| Validation period | 1,000 [assumption] | $15 [evidence] | $15,000 [assumption: campaigns x AOV] | $1,100 [assumption: $1.10/order variable cost] | $3,000 [assumption: six months of software/vendor overhead] | $10,900 [assumption: revenue minus listed costs] |
| Launch year | 6,000 [assumption] | $15 [evidence] | $90,000 [assumption: campaigns x AOV] | $6,600 [assumption] | $12,000 [assumption] | $71,400 [assumption] |
| Scale year | 30,000 [assumption] | $15 [evidence] | $450,000 [assumption: campaigns x AOV] | $33,000 [assumption] | $60,000 [assumption] | $357,000 [assumption] |

Revenue assumptions:

- AOV stays at $15 [evidence: current tier midpoint].
- Paid conversion must meet or exceed 3% [assumption: validation gate preserved from planning].
- Full-spread uptake is not modeled as upside until observed [assumption: conservative model].

Cost assumptions:

- Variable cost stays near $1.10/order [assumption: $0.35 AI/delivery plus $0.75 payment processing].
- Baseline hosting starts around $96/month [evidence: `MASTER_PLAN.md`].
- Paid local-official data may add $100-$500/month [assumption: `.planning/PROJECT.md` notes paid local provider range].

Sensitivity tests:

- If conversion is 1% instead of 3% [assumption], revenue falls by about 67% [assumption: arithmetic].
- If deliverability is below 85% [assumption], paid launch pauses even if conversion is acceptable.
- If variable cost reaches $3.00/order [assumption], gross margin remains high on $15 AOV [evidence + assumption], but support burden may still kill the model.

## Risks & Anti-Plan

The strongest skeptic's case: this is a polished workflow for a behavior that may not monetize. Citizens already can email officials for free. Officials may discount AI-assisted letters. Government mail servers may suppress or bounce bulk-like traffic. A single moderation failure, threat, defamation issue, privacy breach, or legal-advice ambiguity could erase the upside. The registry is right to call it watchlist and not near-term investible [evidence: dispatch registry notes].

Holes, mitigations, and residual risks:

| Hole | Mitigation | Residual risk |
|---|---|---|
| Willingness to pay unproven | Charge before delivery and measure preview-to-paid conversion | Users may like previews but refuse payment [assumption]. |
| Deliverability unknown | Warm domain, monitor bounces, suppress opt-outs, pause at complaint signals | Official domains may block the category [assumption]. |
| Legal/compliance boundary | Clear AI disclosure, not-legal-advice disclaimer, moderation, audit trail | Boundary can still be challenged [assumption]. |
| Official data coverage | Federal/state APIs plus paid local provider evaluation | Local data may be incomplete or stale [assumption]. |
| Spam/perception risk | Nonpartisan framing and per-official individual sends | AI-authored civic email may be reputationally fragile [assumption]. |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| Users will pay $15 on average | Current tier midpoint | [evidence: `apps/api/src/routes/payments.ts`] | Measure paid checkout completion. |
| SAM is $387,000,000 | Bottom-up placeholder | [assumption: adult population x adoption x AOV] | Replace with survey and traffic data. |
| 3% conversion is enough to continue | Planning gate | [assumption: preserved from `.planning/PROJECT.md`] | Beta funnel cohort. |
| 85% deliverability is required | Planning gate | [assumption: preserved from `.planning/PROJECT.md`] | Seed tests across government domains. |
| CivicState is not legal advice | Product boundary | [evidence: `MASTER_PLAN.md`] | Counsel review before launch. |
| WrkPlug client posture lowers infra/CAC | Shared-rails theory | [assumption: WrkPlug Phase 0 not yet signed] | Operator architecture decision. |

## Self-Valuation

Current score: 42/100 [assumption: EIR judgment from repo maturity plus unvalidated demand]. The repo has real product infrastructure, but the registry note, missing market validation, and deliverability/compliance risk keep it below investible threshold [evidence: dispatch registry notes; repo implementation].

Twelve-month value bands under the $5,000,000-per-business program assumption [assumption: dispatch program framing]:

| Band | Value | Rationale |
|---|---:|---|
| Bear | $50,000 [assumption] | Repo remains research asset; no paid validation. |
| Base | $400,000 [assumption] | Working beta, some paid campaigns, unresolved repeatability. |
| Bull | $1,500,000 [assumption] | Paid conversion above 3% [assumption], deliverability above 85% [assumption], and repeatable channel. |

Comparables used qualitatively: Resistbot, Change.org, LegalZoom, and Quorum/VoterVoice [evidence: `MASTER_PLAN.md`; assumption: enterprise category mapping]. What moves valuation is evidence of paid conversion, deliverability, low moderation incidents, and repeatable acquisition.

## Milestones

| Date | Milestone | Pass/fail evidence |
|---|---|---|
| 2026-07-15 [assumption: proposed target] | Operator confirms whether CivicState should pitch as a business or remain personal/research | Registry status decision logged. |
| 2026-08-15 [assumption: proposed target] | Manual beta produces 25 user interviews and 100 previews [assumption] | Interview notes, funnel data, defect log. |
| 2026-09-15 [assumption: proposed target] | Deliverability and payment gate review | Conversion, inbox, bounce, complaint, and chargeback metrics. |

## Surprise Spikes

The prior planning files present CivicState as conditionally launchable with strong unit economics and completed roadmap phases [evidence: `.planning/PROJECT.md`; `.planning/ROADMAP.md`]. The registry note says the asset is personal/research, watchlisted, thin-soul, and not near-term investible without operator confirmation [evidence: dispatch registry notes]. This soul preserves the product ambition but explicitly downgrades the investment posture until operator and market validation are real.
