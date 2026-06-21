# CivicState Business Plan

## Snapshot

As of 2026-06-21 [evidence: dispatch current_date], this repository is a CivicState product build despite the fleet label `brooks-history` [evidence: package.json; .planning/PROJECT.md]. CivicState turns a resident's civic concern into researched, citation-backed letters to government officials with one-time pricing at $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md].

Status: promising research asset, not an investible company yet [evidence: registry note in dispatch]. The repo contains a Next.js frontend, Express API, BullMQ worker agents, Prisma schema, Stripe/Postmark/Clerk integrations, admin/compliance routes, and tests [evidence: apps/web/app/page.tsx; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests/]. The data room does not show production users, production revenue, deployed infrastructure, or market validation [evidence: .planning/existing-state.md; .planning/PROJECT.md].

## Surprise Spikes

- The dispatch project id is `brooks-history`, but the repo product identity is CivicState [evidence: package.json; MASTER_PLAN.md; .planning/PROJECT.md]. This must be resolved before external presentation.
- `.planning/existing-state.md` says there is zero application code and $0 revenue [evidence: .planning/existing-state.md], while the current tree contains application code, tests, Prisma models, and route implementations [evidence: apps/; packages/shared/prisma/schema.prisma; tests/]. Treat older planning audits as stale where contradicted by code.
- `.planning/ROADMAP.md` marks all phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], but `.planning/REQUIREMENTS.md` still marks most product requirements pending [evidence: .planning/REQUIREMENTS.md]. The plan should use implemented-code evidence, not phase checkboxes, when assessing readiness.
- The code includes compliance and deletion routes, but one export path appears to select fields named `tier` and `body` that do not match the Prisma schema fields `pricingTier` and `content` [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma]. This is a launch-risk signal, not a business-proof signal.

## Current Truth

CivicState's current build is a civic-letter workflow: unauthenticated users can submit an issue and ZIP code, moderation can block or flag risky content, accepted submissions enqueue BullMQ classifier work, authenticated users can create Stripe Checkout sessions, and delivery workers can send Postmark emails after payment state exists [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts].

The product promise is narrower than legal tech: letters are constituent communications, not legal advice, claim filings, regulatory filings, lobbying representation, or automated legal demands [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The constraints matter because political opinion, civic identity, legal-adjacent language, and government-recipient email all raise trust and abuse risk [evidence: .planning/PROJECT.md; apps/api/src/lib/moderation.ts].

## Thesis

The investible thesis is conditional: if ordinary US residents will pay a low one-time fee for researched civic communication, and if official contact coverage plus email deliverability clear a high bar, CivicState can become a lightweight transaction business with a compounding officials/citation dataset [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

The current thesis is not proven. The repo's own market verdict calls the project a conditional go with 72% confidence and requires willingness-to-pay conversion of at least 3%, email inbox placement of at least 85% on government domains, federal/state official coverage of at least 95%, and local official coverage of at least 60% [evidence: .planning/PROJECT.md]. Those gates remain operator/market validation items, not facts.

## Customer Definition

Primary customer: a US resident with a specific civic frustration, such as noise, potholes, zoning, enforcement, school policy, or agency responsiveness, who would contact government if research, routing, drafting, and delivery were handled for them [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

Buyer/user definition for validation: mobile-first, non-expert, individual resident, one-off intent, pays per campaign rather than by subscription [evidence: .planning/PROJECT.md; .planning/GENESIS.md]. Exclusions are as important as inclusions: organizations, HOAs, nonprofits, multilingual expansion, subscriptions, legal filings, certified mail, public coalition features, and APIs are deferred until the individual paid loop works [evidence: .planning/REQUIREMENTS.md; .planning/GENESIS.md].

## Problem

The customer job has four steps: identify who has jurisdiction, find applicable law or policy, draft effective constituent language, and deliver it to verified contacts [evidence: .planning/GENESIS.md]. The repo's premise is that many residents abandon the task because the research and routing effort is higher than the perceived payoff [assumption: product thesis from repo planning, not externally validated in workspace].

Failure modes are concrete: hallucinated citations, wrong official targets, government spam filtering, threatening or defamatory user input, privacy mishandling, and user confusion with legal advice [evidence: .planning/PROJECT.md; apps/api/src/lib/moderation.ts; apps/worker/src/lib/legal/citation-verifier.ts].

## Product

Implemented or represented in code:

- Next.js app with home, submit, dashboard, admin, privacy, and terms pages [evidence: apps/web/app/].
- Express API with health, submissions, officials, payments, campaigns, admin, compliance, and webhooks routers [evidence: apps/api/src/index.ts].
- Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- BullMQ workers for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/index.ts].
- Moderation, citation verification, official lookup, Stripe Checkout, Postmark delivery, CCPA-style data export/deletion, and admin flagged-queue concepts [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/api/src/routes/payments.ts; apps/api/src/routes/compliance.ts; apps/api/src/routes/admin.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/delivery.ts].

Not proven in this repo: production deployment, real official coverage, live customer acquisition, live payment volume, live inbox placement, legal review, and repeatable support operations [evidence: .planning/existing-state.md; .planning/PROJECT.md].

## Market Sizing

Workspace-only sizing cannot rely on external market databases. Use a bottom-up validation ladder instead of a top-down TAM:

| Scope | Method | Annual Paid Submissions | Blended Price | Annual Revenue |
|---|---|---:|---:|---:|
| Operator proof | 25 paid submissions/month x 12 months [assumption: repo break-even target converted to annual volume] | 300 [assumption: arithmetic from validation ladder] | $15 [assumption: tier mix calculation using repo prices] | $4,500 [assumption: 300 x $15] |
| Local wedge | 250 paid submissions/month x 12 months [assumption: one-city organic/search wedge, no external source] | 3,000 [assumption: arithmetic] | $15 [assumption: tier mix calculation] | $45,000 [assumption: 3,000 x $15] |
| Niche national | 2,500 paid submissions/month x 12 months [assumption: niche SEO scale, no external source] | 30,000 [assumption: arithmetic] | $15 [assumption: tier mix calculation] | $450,000 [assumption: 30,000 x $15] |

The current investibility gate is not TAM size. It is whether the first wedge can show paid conversion of at least 3%, deliverability of at least 85%, and official coverage high enough to avoid refunds and reputational damage [evidence: .planning/PROJECT.md].

## Revenue Model

Launch revenue is transactional:

- Single official: $5 [evidence: apps/api/src/routes/payments.ts].
- Three officials: $15 [evidence: apps/api/src/routes/payments.ts].
- Full spread: $25 [evidence: apps/api/src/routes/payments.ts].

The active plan explicitly removed subscriptions from the launch scope [evidence: MASTER_PLAN.md]. Future API access for HOAs, nonprofits, or civic organizations is deferred until the citizen pipeline is stable [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

Pricing discipline: the original plan requires a 40% net margin floor after fees [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The implementation currently uses hardcoded tiers, not a dynamic pricer [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md].

## Financial Model

Base unit assumptions:

- Blended price: $15 [assumption: 30% single at $5, 40% three-pack at $15, 30% full-spread at $25; no live mix data].
- Variable AI/delivery cost: $0.75 per paid submission [assumption: high end of repo Genesis token-cost range of $0.35-$0.75, excluding unmodeled support cost].
- Backend infrastructure: about $96/month for the specified DigitalOcean droplet [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- Maximum planned burn: $132.50/month [evidence: .planning/PROJECT.md].
- Starting Mercury reserve: $1,500 [evidence: .planning/PROJECT.md].
- Alert thresholds: $2,000 warning and $500 emergency [evidence: .planning/PROJECT.md; apps/worker/src/lib/treasury.ts].

| Scenario | Paid Submissions / Month | Revenue | Variable Cost | Planned Burn | Contribution After Variable + Burn |
|---|---:|---:|---:|---:|---:|
| Proof | 25 [assumption: repo break-even validation target] | $375 [assumption: 25 x $15] | $18.75 [assumption: 25 x $0.75] | $132.50 [evidence: .planning/PROJECT.md] | $223.75 [assumption: arithmetic] |
| Beta | 100 [assumption: early wedge target] | $1,500 [assumption: 100 x $15] | $75 [assumption: 100 x $0.75] | $132.50 [evidence: .planning/PROJECT.md] | $1,292.50 [assumption: arithmetic] |
| Local wedge | 1,000 [assumption: city-scale target] | $15,000 [assumption: 1,000 x $15] | $750 [assumption: 1,000 x $0.75] | $132.50 [evidence: .planning/PROJECT.md] | $14,117.50 [assumption: arithmetic] |

The model reconciles mechanically, but it is fragile because it excludes human review labor, refund/chargeback costs, legal review, support, paid data providers, and deliverability remediation [assumption: financial diligence adjustment based on repo risk list].

## Go To Market

Primary GTM is organic search through issue-specific civic action content and opt-in public campaign pages [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. That flywheel is not implemented as a launch-critical feature; publisher/public campaign pages are deferred in `.planning/PROJECT.md` [evidence: .planning/PROJECT.md].

Practical validation sequence:

- Start with one state and a short list of local issue categories [assumption: reduces official coverage and legal-source variance].
- Recruit early users from operator-owned channels or direct civic issue communities [assumption: workspace has no external acquisition data].
- Measure preview completion, checkout conversion, citation verification pass rate, delivery success, bounce rate, spam complaints, refunds, and official replies [evidence: .planning/PROJECT.md; apps/worker/src/agents/delivery.ts].
- Delay SEO claims until public campaign publishing exists and creates indexable pages [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

## Competition

Named alternatives in the repo:

- Resistbot: closest lightweight constituent-letter alternative, but the repo positions CivicState as more research/citation-heavy [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- Change.org: petition hosting rather than individual researched letter delivery [evidence: MASTER_PLAN.md].
- LegalZoom: document drafting adjacency, not civic official routing [evidence: MASTER_PLAN.md].
- Quorum and VoterVoice: enterprise civic advocacy tooling for organizations, with pricing described in repo planning as $10k+/year [evidence: .planning/PROJECT.md; assumption: external pricing not verified in workspace].
- Manual contact: free direct outreach, with the user's time and expertise as the hidden cost [evidence: MASTER_PLAN.md].

Competitive risk: if Resistbot or an enterprise advocacy platform adds citation-backed AI drafting, CivicState's product moat is weak until it has real official-contact quality, verified citations, delivery history, and public content volume [assumption: competitive dynamics inferred from repo positioning].

## Risks And Anti-Plan

The skeptical partner case:

- This may be a feature, not a company: a better letter assistant inside an existing civic platform could absorb the use case [assumption: market structure concern].
- Users may not pay. The repo's own validation gate requires at least 3% willingness-to-pay conversion [evidence: .planning/PROJECT.md], which is unproven.
- Government inboxes may reject or ignore platform-generated mail. The repo's own gate requires at least 85% inbox placement on .gov domains [evidence: .planning/PROJECT.md].
- Legal-adjacent drafting creates liability and trust risk even with disclaimers [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- The SEO flywheel depends on public campaign publishing, but launch scope currently defers that mechanism [evidence: .planning/PROJECT.md].
- The repository identity mismatch (`brooks-history` versus CivicState) would confuse any investor or operator reviewing the data room [evidence: dispatch; package.json].
- The codebase has signs of integration drift, including compliance route field mismatches against the Prisma schema [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].

Anti-plan: do not fund paid acquisition, API expansion, certified mail, public coalition features, or multi-state scaling until one constrained geography proves paid conversion, citation quality, official coverage, and deliverability [assumption: risk-first operating plan].

## Assumption Ledger

| Assumption | Basis | Validation Test | Kill / Revise Trigger |
|---|---|---|---|
| Residents will pay $5-$25 for civic letters | Repo pricing and product thesis [evidence: apps/api/src/routes/payments.ts; .planning/GENESIS.md] | Run checkout-enabled beta | Conversion below 3% [evidence: .planning/PROJECT.md] |
| $15 blended price is plausible | Tier-mix assumption, no live sales data [assumption: 30% / 40% / 30% mix] | Compare actual tier selection | Blended price below $10 [assumption: contribution model threshold] |
| $0.75 variable cost is conservative enough | High end of repo token-cost range [evidence: .planning/GENESIS.md] | Track agent token and delivery spend | Cost above $2/submission [assumption: margin stress threshold] |
| Email-first delivery is enough | Launch scope excludes certified mail and fax [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md] | Measure .gov delivery and replies | Inbox placement below 85% [evidence: .planning/PROJECT.md] |
| Official lookup coverage can be adequate | Planned congress.gov, OpenStates, Cicero/BallotReady stack [evidence: .planning/PROJECT.md; apps/api/src/lib/officials/] | Coverage audit by ZIP sample | Local coverage below 60% [evidence: .planning/PROJECT.md] |
| One operator can manage exceptions | Repo assumption [evidence: .planning/GENESIS.md] | Track flagged queue age and count | Oldest flagged item above 24 hours or queue above 10 [evidence: .planning/ROADMAP.md] |

## Evidence Sources

Workspace evidence used:

- `package.json` for repo identity and product description [evidence: package.json].
- `MASTER_PLAN.md` for original business model, scope, infrastructure, pricing, and exclusions [evidence: MASTER_PLAN.md].
- `.planning/PROJECT.md`, `.planning/GENESIS.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, and `.planning/existing-state.md` for current planning claims and contradictions [evidence: .planning/].
- `apps/api/src`, `apps/worker/src`, `apps/web/app`, and `packages/shared/prisma/schema.prisma` for implemented surface [evidence: apps/; packages/shared/prisma/schema.prisma].
- Dispatch registry note for sensitivity and investibility posture [evidence: dispatch].

No network research was performed because the run is workspace-only. Any market sizing, competitive interpretation, or adoption forecast above is marked as an assumption.

## Roadmap Implications

The roadmap should stop celebrating phase completion and shift to proof gates. The next work should validate deployability, schema/API integrity, official coverage, citation verification, deliverability, and paid conversion before expanding features [evidence: .planning/REQUIREMENTS.md; apps/].

