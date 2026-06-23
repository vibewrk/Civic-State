# CivicState / Brooks History Business Plan

## Executive Snapshot

As of 2026-06-22 [evidence: dispatch current_date], this repo contains a substantially implemented CivicState web product, while the registry labels the project as `brooks-history`, a watchlisted personal/research asset rather than a near-term investible business [evidence: dispatch registry notes]. The investible thesis is therefore conditional: treat CivicState as a validation candidate, not a portfolio-ready company, until the operator confirms that this repo should pitch as a business [evidence: dispatch registry notes].

CivicState turns a resident's civic concern into researched, citation-backed letters to government officials, with a stated price band of $5-$25 [evidence: .planning/PROJECT.md]. The repo includes Next.js, Express, worker agents, Prisma schema, Stripe/Postmark/Clerk integrations, and tests [evidence: package.json; apps/; packages/shared/prisma/schema.prisma; tests/]. It does not include proof of live traffic, paid customers, production deployment, deliverability, or official data coverage [evidence: .planning/existing-state.md; repo code inspection].

## Business Definition

CivicState is best framed as a civic communication workflow product: it helps US residents describe an issue, identify relevant officials, generate researched letters, pay a one-time fee, and track delivery [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

The current repo should not pitch itself as legal advice, a lobbying firm, a claim-filing service, or a regulatory submission tool [evidence: MASTER_PLAN.md]. The practical product promise is narrow: make constituent communication faster and more complete than manual research and drafting [evidence: .planning/GENESIS.md].

## Evidence Base

Evidence available in workspace:

- Product narrative, scope, constraints, assumptions, and market verdict exist in `.planning/PROJECT.md` [evidence: .planning/PROJECT.md].
- Legacy roadmap claims all planned phases completed on 2026-04-25 [evidence: .planning/ROADMAP.md].
- Requirements still mark many product capabilities pending, including submission research, officials lookup, payments, delivery, dashboards, moderation, treasury, and legal compliance [evidence: .planning/REQUIREMENTS.md].
- Current code includes app directories for API, web, worker, shared Prisma schema, and route tests [evidence: apps/; packages/shared/; tests/].
- Local official lookup remains a Cicero stub that returns an empty array when not provisioned and still returns an empty array after the TODO branch [evidence: apps/api/src/lib/officials/cicero.ts].
- The dispatch registry states this is a watchlisted personal/research asset and asks operator confirmation before business pitching [evidence: dispatch registry notes].

External facts were not fetched because this worker is workspace-only [evidence: dispatch brief]. Any external market claim below is labeled as an assumption.

## Customer Definition

Primary customer: a US resident with a specific civic frustration who would contact government if research, routing, drafting, and delivery were handled for them [evidence: .planning/GENESIS.md]. The planned user is mobile-first, non-technical, and needs help translating an issue into a professional constituent letter [evidence: .planning/PROJECT.md].

Non-customer at launch: nonprofits, HOAs, advocacy organizations, businesses, legal claimants, and bulk senders [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md]. These groups increase compliance, spam, policy, and partnership risk before the individual workflow is proven [evidence: .planning/GENESIS.md].

Demand hypothesis: at least 3% preview-to-paid conversion is the stated validation gate [evidence: .planning/PROJECT.md]. No repository evidence proves this conversion has happened [evidence: .planning/existing-state.md; repo inspection].

## Market Sizing

The credible launch market is not "all civic participation." It is the reachable subset of US residents who both have a specific local/state/federal complaint and are willing to pay a small one-time fee to outsource the communication workflow [assumption: product definition plus transactional pricing in repo].

Bottom-up launch sizing method:

| Layer | Method | Working Figure |
|---|---|---|
| Reachable users | Start with organic and referral users who reach a preview page, not the full adult population | 10,000 qualified preview sessions/year [assumption: conservative early SEO/referral scenario, not repo evidence] |
| Paid conversion | Apply the repo's beta gate | 3% conversion [evidence: .planning/PROJECT.md] |
| Paid submissions | Qualified previews times conversion | 300 paid submissions/year [assumption: 10,000 sessions x 3% conversion] |
| Average order value | Use the roadmap's stated package band and model midpoint | $15 AOV [evidence: .planning/ROADMAP.md; MASTER_PLAN.md] |
| Year-one revenue | Paid submissions times AOV | $4,500 revenue/year [assumption: 300 x $15] |

This is a validation-sized wedge, not a venture-scale TAM. A venture-scale outcome would require the SEO/content flywheel and official directory data assets to compound far beyond the repo's current proof [assumption: standard marketplace/content compounding logic, not repo evidence].

## Product and Current State

Implemented or materially scaffolded:

- Next.js frontend with home, submit, dashboard, admin, privacy, and terms surfaces [evidence: apps/web/].
- Express API with health, submissions, officials, webhooks, payments, campaigns, admin, and compliance routers [evidence: apps/api/src/index.ts].
- Worker agents for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/agents/].
- Prisma schema for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- Treasury estimates of $0.20, $0.40, and $0.60 per job tier [evidence: apps/worker/src/lib/treasury.ts].

Not yet validated:

- Production traffic is $0 revenue and no live users in the stale audit record [evidence: .planning/existing-state.md].
- Local officials are not implemented because Cicero is a stub [evidence: apps/api/src/lib/officials/cicero.ts].
- OpenStates requires an API key and returns empty results when absent [evidence: apps/api/src/lib/officials/openstates.ts].
- Congress.gov lookup does not expose email addresses in the current implementation [evidence: apps/api/src/lib/officials/congress.ts].
- Mercury balance checks are placeholders [evidence: apps/worker/src/agents/reconciliation.ts].

## Revenue Model and Financial Figures

Revenue is transactional. Planned packages are $5 for single official, $15 for three-pack, and $25 for full-spread [evidence: .planning/REQUIREMENTS.md]. The master plan also describes dynamic pricing with a 40% net margin floor after fees [evidence: MASTER_PLAN.md].

Unit economics from the existing plan:

| Item | Figure | Label |
|---|---:|---|
| Single package price | $5 | [evidence: .planning/REQUIREMENTS.md] |
| Three-pack package price | $15 | [evidence: .planning/REQUIREMENTS.md] |
| Full-spread package price | $25 | [evidence: .planning/REQUIREMENTS.md] |
| Amplify token cost | ~$0.35 | [evidence: MASTER_PLAN.md] |
| Complex token cost | ~$0.75 | [evidence: MASTER_PLAN.md] |
| Stripe fee formula | 2.9% + $0.30 | [evidence: MASTER_PLAN.md] |
| Amplify gross margin | ~$13.80 and 92% | [evidence: MASTER_PLAN.md] |
| Complex gross margin | ~$23.06 and 92% | [evidence: MASTER_PLAN.md] |
| Fixed cost base | ~$200/month | [evidence: MASTER_PLAN.md] |
| Break-even MRR | ~$340/month | [evidence: MASTER_PLAN.md] |

Internal reconciliation check: at $15 AOV [evidence: MASTER_PLAN.md], 25 submissions/month [evidence: MASTER_PLAN.md] produce $375 gross receipts/month [assumption: $15 x 25], which is close to the master plan's ~$340/month break-even threshold after mix and fee assumptions [evidence: MASTER_PLAN.md]. That is arithmetically plausible, but not commercially proven [assumption: no paid customer data in repo].

## Go-to-Market

The repo's stated acquisition thesis is organic search and public campaign pages [evidence: .planning/GENESIS.md]. The more honest launch sequence is:

- Validate that users complete a preview and pay before scaling content [assumption: conversion must precede SEO investment].
- Use issue-specific landing pages only after moderation, privacy, and defamation risk controls are working [evidence: .planning/REQUIREMENTS.md].
- Start with a narrow geographic pilot where official coverage can be manually checked [assumption: local coverage is stubbed and federal email coverage is incomplete].
- Track paid submissions/month, preview-to-paid conversion, delivery success, official response rate, and moderation queue load [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

Initial go-to-market should avoid paid ads until the 3% conversion gate [evidence: .planning/PROJECT.md] and 85% inbox placement gate [evidence: .planning/PROJECT.md] are measured.

## Competition

Named competitors and substitutes:

| Competitor | Segment | CivicState Difference | Risk |
|---|---|---|---|
| Resistbot | Constituent messaging | CivicState adds researched citations and paid workflow [evidence: .planning/PROJECT.md; MASTER_PLAN.md] | Resistbot may be cheaper and already known [assumption: competitor has existing user awareness]. |
| Change.org | Petition hosting | CivicState sends individualized letters rather than hosting petitions [evidence: MASTER_PLAN.md] | Petitions may feel more social and viral [assumption: petition products optimize sharing]. |
| LegalZoom | Legal/document drafting | CivicState is civic-specific and explicitly not legal advice [evidence: MASTER_PLAN.md] | User confusion with legal help could create expectation risk [assumption: adjacent document drafting category]. |
| Manual outreach | Direct email or phone | CivicState handles research, routing, drafting, and delivery [evidence: .planning/GENESIS.md] | Free manual outreach always competes with $5-$25 pricing [evidence: .planning/REQUIREMENTS.md]. |
| Enterprise advocacy tools such as Quorum or VoterVoice | Organization advocacy workflows | CivicState targets individuals, not enterprise advocacy teams [evidence: .planning/PROJECT.md] | Enterprise vendors could offer consumer features if demand is proven [assumption: adjacent vendors can expand product scope]. |

## Risks and Anti-Plan

The skeptic case is strong: this may be an elegant tool for a behavior people claim to value but will not pay for. The registry already says personal/research asset, not near-term investible [evidence: dispatch registry notes]. If preview-to-paid conversion stays below 3% [evidence: .planning/PROJECT.md], the project should not be pitched as a business.

Hardest kill risks:

- Government email deliverability may fail despite SPF/DKIM/DMARC, especially if officials classify paid constituent letters as spam or commercial solicitation [assumption: deliverability risk from product channel].
- Official data may be incomplete: local lookup is unimplemented, OpenStates needs a key, and federal lookup lacks direct email [evidence: apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/openstates.ts; apps/api/src/lib/officials/congress.ts].
- Citation verification may be too brittle for arbitrary civic issues, creating user disappointment or legal-adjacent risk [assumption: broad legal/civic research is heterogeneous].
- The product may attract harassment, defamation, mass-mailing, or bad-faith submissions faster than a lean operator can review them [evidence: .planning/REQUIREMENTS.md].
- Organic SEO may not compound because public campaign pages require opt-in, privacy review, quality control, and enough volume to build authority [assumption: SEO flywheel requires volume and indexable content].
- The existing repo identity mismatch between `brooks-history` and CivicState may signal portfolio registry drift, not a clean company asset [evidence: dispatch project id; package.json].

Anti-plan: do not raise, hire, or broaden scope until one operator-run pilot proves paid conversion, official coverage, successful delivery, and low moderation burden [assumption: staged validation reduces downside].

## Assumption Ledger

| Assumption | Basis | Validation |
|---|---|---|
| Residents will pay $5-$25 for civic letters | Pricing stated in repo, no customer evidence | Run preview-to-paid pilot [evidence: .planning/REQUIREMENTS.md] |
| 3% conversion is enough for beta continuation | Stated validation gate | Instrument funnel and require observed conversion [evidence: .planning/PROJECT.md] |
| 85% inbox placement is achievable | Stated validation gate | Seed-list and real .gov deliverability testing [evidence: .planning/PROJECT.md] |
| Local coverage can be bought or built | Cicero/BallotReady named in plan, Cicero not implemented | Provider evaluation and API contract [evidence: .planning/PROJECT.md; apps/api/src/lib/officials/cicero.ts] |
| Unit costs stay under plan | Treasury estimates and master plan token costs | Compare actual ledger to model [evidence: apps/worker/src/lib/treasury.ts; MASTER_PLAN.md] |
| Operator load is manageable | Existing plan assumes a lean operator | Measure flagged queue per paid submission [evidence: MASTER_PLAN.md] |

## Roadmap Linkage

The next roadmap should serve the business thesis, not the legacy phase-complete narrative. The highest-value next buildable slice is a narrow validation loop: one issue type, one geography, verified officials, real payment, real delivery, and manual operator review where automation is uncertain [assumption: focused pilot isolates demand and delivery risk].

The root `ROADMAP.md` carries this into single-worker tasks tied back to the headings in this plan [evidence: ROADMAP.md].

## Surprise Spikes

- The dispatch project is `brooks-history`, but nearly all repo artifacts describe `CivicState` [evidence: dispatch project id; package.json; .planning/PROJECT.md].
- Registry says personal/research and not near-term investible, while `.planning/PROJECT.md` says conditional go with 72% confidence [evidence: dispatch registry notes; .planning/PROJECT.md].
- `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/REQUIREMENTS.md` still has many unchecked requirements [evidence: .planning/REQUIREMENTS.md].
- `.planning/existing-state.md` says zero application code [evidence: .planning/existing-state.md], but current repo contains application code across API, web, worker, shared schema, and tests [evidence: apps/; packages/shared/; tests/].

## Source Notes

Workspace-only sources used: dispatch brief and registry notes, `.planning/PROJECT.md`, `.planning/GENESIS.md`, `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, `.planning/existing-state.md`, `MASTER_PLAN.md`, `package.json`, `apps/`, `packages/shared/prisma/schema.prisma`, and `tests/` [evidence: repo inspection on 2026-06-22].

