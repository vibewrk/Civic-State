# CivicState Business Plan

## Snapshot

As of 2026-06-20 [evidence: user dispatch], CivicState is best classified as a watchlist research asset, not a near-term investible BOS company [evidence: user dispatch registry note]. The repo contains a real civic-tech monorepo with web, API, worker, Prisma, Stripe, Clerk, Postmark-facing, admin, moderation, and legal-page surfaces [evidence: [package.json](package.json), [schema.prisma](packages/shared/prisma/schema.prisma), [submissions route](apps/api/src/routes/submissions.ts), [payments route](apps/api/src/routes/payments.ts), [worker agents](apps/worker/src/agents/researcher.ts)].

The product promise is simple: a US resident describes a civic issue, CivicState researches relevant authority, identifies officials from a ZIP code, drafts citation-backed letters, takes one-time payment, and delivers the letters to officials [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [PROJECT.md](.planning/PROJECT.md), [ROADMAP.md](.planning/ROADMAP.md)].

The current paid offer is visible in code as $5 [evidence: apps/api/src/routes/payments.ts], $15 [evidence: apps/api/src/routes/payments.ts], and $25 [evidence: apps/api/src/routes/payments.ts] one-time packages. The investment posture is "prove demand and deliverability first"; the registry sensitivity is that this may remain a personal or research asset unless an operator confirms it should be pitched as a business [evidence: user dispatch registry note].

## Current Thesis

CivicState is not VC-ready today because the repo provides build evidence, not market evidence [evidence: .planning/PROJECT.md lists "Validated: None yet"]. The investible thesis would become credible only if the operator proves that ordinary US residents will pay a small one-time fee for research, drafting, routing, and delivery of civic correspondence [assumption: market demand is unvalidated in workspace-only mode].

The upside thesis is an option on a narrow consumer civic workflow: compress a multi-hour research and writing task into a guided purchase flow under $25 [evidence: PROJECT.md and MASTER_PLAN.md]. The downside thesis is harsh: citizens may not pay, government email deliverability may fail, official data may be incomplete, and AI legal-adjacent work may create review load that overwhelms the low price point [assumption: external market behavior and deliverability outcomes require live validation].

## Evidence Base

Primary evidence used:

- [MASTER_PLAN.md](MASTER_PLAN.md): product spec, architecture, pricing, infrastructure, unit-economics claims, and risk posture [evidence].
- [.planning/PROJECT.md](.planning/PROJECT.md): original business profile, constraints, assumptions, and validation gates [evidence].
- [.planning/ROADMAP.md](.planning/ROADMAP.md): prior phased delivery narrative and completion claims [evidence].
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md): requirement status, data retention, moderation, payment, delivery, admin, and compliance checklist [evidence].
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma): implemented data model for users, submissions, campaigns, letters, officials, payments, deliveries, ledgers, audits, agent logs, and jobs [evidence].
- [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts): implemented submission intake, moderation, audit logging, and queue handoff [evidence].
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts): implemented Stripe Checkout tier definitions at $5, $15, and $25 [evidence].

Workspace-only limitation: no network research was available. Any market, competitor, willingness-to-pay, or TAM statement not directly supported by repo files is labeled as an assumption [evidence: user dispatch].

## Product Reality

What is real in the repo:

- A pnpm monorepo with apps for web, API, and worker plus shared packages [evidence: package.json].
- Prisma models for User, Submission, Campaign, Letter, Official, Payment, Delivery, LedgerEntry, AuditLog, AgentActionLog, and Job [evidence: packages/shared/prisma/schema.prisma].
- Submission intake with ZIP validation, moderation, audit logging, placeholder unauthenticated user fallback, and BullMQ enqueueing [evidence: apps/api/src/routes/submissions.ts].
- Officials lookup route with rate limiting of 100 requests per 15 minutes [evidence: apps/api/src/routes/officials.ts].
- Payment tiers of $5, $15, and $25 through Stripe Checkout [evidence: apps/api/src/routes/payments.ts].
- Worker state transitions from submitted through delivered, with failed as a terminal state [evidence: apps/worker/src/engine/state-machine.ts].
- Researcher agent that searches eCFR, CourtListener, and a state cache, then verifies citations before downstream drafting [evidence: apps/worker/src/agents/researcher.ts].
- Terms and privacy pages with not-legal-advice, AI disclosure, retention, CCPA, and third-party service language [evidence: apps/web/app/terms/page.tsx, apps/web/app/privacy/page.tsx].

What is not yet proven:

- $0 production revenue is evidenced in repo context, not live financial records [evidence: .planning/existing-state.md].
- No validated customer conversion is recorded [evidence: .planning/PROJECT.md says no validated requirements].
- No measured official response rate, inbox placement rate, or organic acquisition rate is recorded [evidence: no analytics or production data file found in workspace].

## Customer Definition

Initial customer: a US resident with a specific civic problem who knows what outcome they want but does not know the law, jurisdiction, official contacts, or letter format [evidence: .planning/GENESIS.md and .planning/PROJECT.md].

High-intent early segments [assumption: segmentation inferred from product workflow, not validated]:

- Local enforcement complaints where the resident wants a documented request to an agency or elected office [assumption: common civic use case, unvalidated].
- Housing, zoning, school, transportation, noise, utility, and public-safety concerns that benefit from routing and citations [assumption: category demand not measured].
- Users willing to pay less than the time cost of doing research manually, with an average order value target around $13.50 [assumption: weighted midpoint of repo-coded tiers].

Non-customers:

- People needing legal advice, claims filing, regulatory filings, lobbying representation, or emergency response [evidence: MASTER_PLAN.md and apps/web/app/terms/page.tsx].
- Organizations needing enterprise grassroots advocacy tooling at launch [evidence: .planning/PROJECT.md marks API consumers as future].

## Market Sizing

Because no network research is available, the market model is bottom-up and scenario-based.

| Scenario | Paid orders per month | Average order | Monthly revenue | Annual revenue | Honesty label |
|---|---:|---:|---:|---:|---|
| Operator proof | 25 [assumption: minimum validation target from Genesis break-even framing] | $13.50 [assumption: midpoint mix across repo tiers] | $337.50 [assumption: 25 x $13.50] | $4,050 [assumption: $337.50 x 12] | Assumption |
| Watchlist traction | 400 [assumption: .planning/existing-state.md uses 400 monthly campaigns in scale estimate] | $13.50 [assumption: midpoint mix across repo tiers] | $5,400 [assumption: 400 x $13.50] | $64,800 [assumption: $5,400 x 12] | Assumption |
| Venture-shaped seed signal | 5,000 [assumption: repo scaling threshold, not demand evidence] | $13.50 [assumption: midpoint mix across repo tiers] | $67,500 [assumption: 5,000 x $13.50] | $810,000 [assumption: $67,500 x 12] | Assumption |

This is not a TAM claim. It is a validation ladder. A true TAM/SAM/SOM needs external data on US civic engagement, paid willingness to act, search demand, email deliverability, and repeat behavior [assumption: external research required].

## Revenue Model

Launch revenue is transactional. The implemented payment tiers are:

| Tier | Price | Unit delivered | Evidence |
|---|---:|---|---|
| Single official | $5 [evidence: apps/api/src/routes/payments.ts] | One official [evidence: apps/api/src/routes/payments.ts] | Code |
| Three officials | $15 [evidence: apps/api/src/routes/payments.ts] | Three officials [evidence: apps/api/src/routes/payments.ts] | Code |
| Full spread | $25 [evidence: apps/api/src/routes/payments.ts] | All matched officials [evidence: apps/api/src/routes/payments.ts] | Code |

The repo states a required 40% net margin floor after payment fees [evidence: .planning/PROJECT.md]. The plan also claims 88% to 92% gross margin on letter packages [evidence: MASTER_PLAN.md], but that claim remains unvalidated until production token, delivery, support, refund, and review costs are measured [assumption: margin depends on live costs].

Future revenue streams named in the repo include higher-touch review and API access for HOAs, nonprofits, or civic organizations [evidence: MASTER_PLAN.md], but neither should be sold before the consumer pipeline proves repeatable [assumption: sequencing judgment].

## Financial Plan

Financial figures from the repo:

| Item | Amount | Label |
|---|---:|---|
| Backend droplet plan | $96/month [evidence: MASTER_PLAN.md] | Evidence |
| Managed PostgreSQL upgrade | $50/month [evidence: MASTER_PLAN.md] | Evidence |
| Spaces storage add-on | $25/month [evidence: MASTER_PLAN.md] | Evidence |
| Load balancer add-on | $12/month [evidence: MASTER_PLAN.md] | Evidence |
| Mercury reserve target | $1,500 [evidence: .planning/PROJECT.md] | Evidence |
| Mercury warning alert | $2,000 [evidence: .planning/REQUIREMENTS.md] | Evidence |
| Mercury emergency alert | $500 [evidence: .planning/REQUIREMENTS.md] | Evidence |
| Reconciliation discrepancy threshold | $0.10 [evidence: .planning/REQUIREMENTS.md] | Evidence |

Illustrative contribution model:

| Case | Orders | Avg order | Revenue | Variable cost | Gross profit | Gross margin |
|---|---:|---:|---:|---:|---:|---:|
| Proof month | 25 [assumption: validation target] | $13.50 [assumption: tier mix] | $337.50 [assumption: 25 x $13.50] | $18.75 [assumption: 25 x $0.75] | $318.75 [assumption: $337.50 - $18.75] | 94.4% [assumption: $318.75 / $337.50] |
| Traction month | 400 [assumption: watchlist traction case] | $13.50 [assumption: tier mix] | $5,400 [assumption: 400 x $13.50] | $300 [assumption: 400 x $0.75] | $5,100 [assumption: $5,400 - $300] | 94.4% [assumption: $5,100 / $5,400] |
| Scale month | 5,000 [assumption: repo scaling threshold] | $13.50 [assumption: tier mix] | $67,500 [assumption: 5,000 x $13.50] | $3,750 [assumption: 5,000 x $0.75] | $63,750 [assumption: $67,500 - $3,750] | 94.4% [assumption: $63,750 / $67,500] |

This table reconciles mechanically, but it is not validated. The $0.75 variable-cost assumption is a placeholder derived from the Genesis token-economics range of $0.35 to $0.75 per job [evidence: .planning/GENESIS.md]. It excludes support time, refunds, chargebacks, paid local official data, compliance counsel, and domain deliverability remediation [assumption: excluded costs could dominate at low volume].

## Competition

Named alternatives in repo evidence:

| Competitor | Repo-described position | CivicState differentiation | Risk |
|---|---|---|---|
| Resistbot | SMS letters to lawmakers [evidence: MASTER_PLAN.md] | Research-backed citations and higher-context drafting [evidence: MASTER_PLAN.md] | Resistbot may remain simpler, cheaper, and more trusted [assumption: competitor traction not researched]. |
| Change.org | Petition hosting [evidence: MASTER_PLAN.md] | Direct letter delivery and routing [evidence: MASTER_PLAN.md] | Petitions may satisfy the user's emotional need without payment [assumption: willingness-to-pay unknown]. |
| LegalZoom | Document drafting [evidence: MASTER_PLAN.md] | Civic-specific constituent letters, not legal services [evidence: MASTER_PLAN.md] | Legal-adjacent confusion could hurt trust [assumption: messaging risk]. |
| Quorum | Enterprise advocacy tooling [evidence: .planning/PROJECT.md] | Individual consumer workflow [evidence: .planning/PROJECT.md] | Enterprise incumbents could add consumer funnels [assumption: strategic response unknown]. |
| VoterVoice | Enterprise advocacy tooling [evidence: .planning/PROJECT.md] | Individual transactional pricing [evidence: .planning/PROJECT.md] | Civic orgs may prefer established vendors [assumption: procurement behavior unknown]. |

The competitive moat is weak until CivicState accumulates real verified official-contact data, citation patterns, delivery outcomes, and user-visible trust [assumption: data moat requires volume].

## Go To Market

Primary GTM should be validation-first, not brand-first:

- Run a closed beta with hand-recruited users and operator-reviewed letters until the first 25 paid orders [assumption: minimum proof stage].
- Track conversion from preview to payment, refund rate, support minutes per order, and official delivery status before spending on acquisition [assumption: metrics needed for investibility].
- Publish no public campaign pages until legal, privacy, and moderation review are operationally reliable [assumption: publication raises privacy and defamation risk].
- Use content SEO only after successful letters create non-sensitive, user-approved, anonymized summaries [assumption: search strategy requires safe content supply].

Repo-supported GTM hypothesis: SEO and opt-in public campaign pages are the primary acquisition engine, with social sharing as secondary [evidence: .planning/GENESIS.md]. This remains an assumption until indexed pages and traffic exist [assumption: no analytics evidence in workspace].

## Risks And Anti-Plan

The partner-kill version:

- This may be a feature, not a company. A user who wants to contact an official can use free tools, templates, AI chat, or direct email, so the $5 to $25 price may be too small to support paid acquisition and too high versus free substitutes [assumption: demand not validated].
- The workflow may create legal-adjacent expectations. Even with disclaimers, users may treat citation-backed letters as legal advice, and officials may treat automated correspondence as spam [assumption: behavior untested].
- Government email deliverability could kill the product. If .gov inbox placement or bounce behavior is poor, the core promise fails even if drafting works [assumption: live deliverability not measured].
- Local official data may be expensive, stale, or incomplete. The repo already identifies the Google Civic API gap and local-provider evaluation need [evidence: .planning/PROJECT.md].
- Human review can destroy margins. If moderation, defamation review, citation failures, or user edits require operator time, the $5 tier may be uneconomic [assumption: review minutes unmeasured].
- The SEO flywheel may not spin. Civic complaints are sensitive, local, and often low-search-volume, so public pages may create risk without acquisition [assumption: no keyword data in workspace].

Mitigations:

- Keep launch explicitly transactional and operator-reviewed until repeatable metrics exist [assumption: operational control reduces risk].
- Treat all legal claims as citations requiring verification; strip unverified citations, as the worker already does [evidence: apps/worker/src/agents/researcher.ts].
- Do not pitch this as investible until live orders, delivery outcomes, and customer pull exist [evidence: user dispatch registry note].

## Assumption Ledger

| Assumption | Basis | Validation test | Kill threshold |
|---|---|---|---|
| Users will pay for civic correspondence help | Repo thesis only [evidence: .planning/GENESIS.md] | Closed beta paid orders | Fewer than 25 paid orders after targeted outreach [assumption: operator validation bar] |
| Average order can hold near $13.50 | Midpoint mix across code tiers [assumption] | Stripe order mix | Average order below $8 [assumption: margin and support risk] |
| Variable cost stays under $0.75 per job | Genesis token-cost range [evidence: .planning/GENESIS.md] | Ledger and token logs | Cost above $2 per job [assumption: tier economics break] |
| Official delivery is reliable | Product plan only [evidence: .planning/ROADMAP.md] | Postmark delivered and bounced statuses | Bounce or spam complaint pattern forces frequent suppression [assumption: deliverability break] |
| Citation verification is enough for trust | Implemented verifier pipeline [evidence: apps/worker/src/agents/researcher.ts] | User review and official response quality | Frequent human rewrites required [assumption: review load break] |
| SEO can acquire users | Genesis distribution hypothesis [evidence: .planning/GENESIS.md] | Indexed pages and organic conversions | No meaningful organic conversions after content indexation [assumption: external validation required] |

## Roadmap Linkage

The plan needs a buildable roadmap that overlaps the business headings. The immediate work should focus on proof, not expansion: product reality, customer validation, revenue model, financial controls, official delivery, risk controls, and evidence freshness. The aligned roadmap is maintained in [ROADMAP.md](ROADMAP.md) [evidence].

## Decision Gates

Do not pitch CivicState as a VC-grade business until the operator can show:

- Paid conversion from preview to checkout [assumption: core demand proof].
- At least 25 paid orders [assumption: minimum signal], with refund and support data.
- Delivered letters with low bounce and spam-complaint patterns [assumption: deliverability proof].
- Citation verification logs with few human escalations [assumption: quality proof].
- A clear answer on whether this is a personal/research asset or an operator-backed business [evidence: user dispatch registry note].

## Freshness And Dates

Document date: 2026-06-20 [evidence: user dispatch].

Existing planning baseline date: 2026-04-25 [evidence: .planning/PROJECT.md and .planning/ROADMAP.md].

Terms and privacy pages state last updated April 25, 2026 [evidence: apps/web/app/terms/page.tsx and apps/web/app/privacy/page.tsx].

Freshness risk: external claims about AI laws, government email practices, competitor positioning, and vendor pricing are stale or unverified because this runner has no network access [assumption: workspace-only limitation].

## Surprise Spikes

- The old existing-state audit says there is zero application code [evidence: .planning/existing-state.md], but the current repo contains substantial application code [evidence: apps and packages directories]. This means the soul must be upgraded from "greenfield plan" to "built but unvalidated product."
- The prior roadmap marks all phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while the requirements file still lists many launch requirements unchecked [evidence: .planning/REQUIREMENTS.md]. The new roadmap treats completion claims as planning history, not live market proof.
- Terms say official letters are not subject to CAN-SPAM [evidence: apps/web/app/terms/page.tsx], while planning docs classify full CAN-SPAM compliance as safer [evidence: .planning/PROJECT.md and .planning/REQUIREMENTS.md]. Operator counsel should resolve this before launch [assumption: legal interpretation requires professional review].
