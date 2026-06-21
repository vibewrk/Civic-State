# CivicState Business Plan

## Document Control

**Project:** CivicState / brooks-history.  
**Prepared:** 2026-06-21 [evidence: dispatch date].  
**Status:** Draft soul upgrade for wrk.dog review; not operator-adopted.  
**Freshness:** Workspace-only review on 2026-06-21; no network research was available, so external market claims are assumptions, not evidence [evidence: dispatch constraint].

## Current Thesis

CivicState is a civic-action workflow product: a resident submits a local, state, or federal concern, the system identifies relevant officials, researches applicable law, drafts citation-backed constituent letters, collects one-time payment, sends individual emails, and tracks delivery/replies [evidence: .planning/PROJECT.md; apps/api/src/index.ts; apps/worker/src/index.ts].

The investible thesis is conditional: if individuals will pay low-ticket prices for researched civic communication, CivicState can become a high-margin transactional civic workflow with a compounding officials directory and citation library. Today, the registry says this should be treated as a personal/research asset, not a near-term investible business, unless the operator confirms it should pitch as a business [evidence: dispatch registry note].

## What Is Real Today

The repo contains a TypeScript monorepo with `apps/web`, `apps/api`, `apps/worker`, and `packages/shared` workspaces [evidence: package.json; apps/api/package.json; apps/worker/package.json; apps/web/package.json]. The API mounts health, submissions, officials, payments, campaigns, admin, compliance, and webhook routes [evidence: apps/api/src/index.ts]. The worker registers classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/index.ts].

The Prisma schema includes users, submissions, campaigns, letters, officials, payments, deliveries, jobs, ledger entries, audit logs, and agent action logs [evidence: packages/shared/prisma/schema.prisma]. Payment code hardcodes `single` at $5.00, `three_pack` at $15.00, and `full_spread` at $25.00 [evidence: apps/api/src/routes/payments.ts]. The product still lacks workspace evidence of production traffic, paid submissions, live deliverability, active officials-data coverage, or customer retention [assumption: no production analytics, Stripe export, Postmark export, or user database dump exists in the workspace].

## Customer Definition

Primary customer: a US resident with a specific civic concern who would like to contact government officials but does not know the jurisdiction, the relevant rules, or how to write a formal letter [evidence: .planning/PROJECT.md].

Best initial segment: time-constrained residents with concrete service or enforcement problems, such as noise, zoning, school policy, code enforcement, accessibility, or public safety concerns [assumption: derived from repo examples and common civic-use patterns, unvalidated in this workspace]. Excluded customers are businesses, legal claimants, bulk campaign operators, and anyone seeking legal filings or legal advice [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

## Problem And Product

The product replaces a manual workflow that residents often abandon: determine jurisdiction, identify officials, research governing rules, draft a credible letter, and send it through a channel likely to be received [evidence: .planning/GENESIS.md]. CivicState's wedge is not "petition hosting"; it is researched constituent communication with source-verified citations, official targeting, payment-gated delivery, and status tracking [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/worker/src/agents/researcher.ts].

The product must avoid implying legal advice. Letters are constituent communications, not demand notices, filings, or attorney work product [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

## Market Sizing

Because no network research is available, this market size is a method-led estimate rather than a sourced market claim.

| Layer | Method | Annual Opportunity |
| --- | --- | --- |
| Initial beachhead | `10,000` annual paid US resident letter packages at a blended $13.50 average order value | $135,000 annual gross revenue [assumption: bottoms-up launch target, price blend from repo tiers] |
| Narrow serviceable market | `100,000` annual paid packages across SEO and social sharing | $1,350,000 annual gross revenue [assumption: 10x beachhead scaling case, unvalidated] |
| Wider serviceable market | `1,000,000` annual paid packages if civic-action search demand converts nationally | $13,500,000 annual gross revenue [assumption: scenario model, no external source in workspace] |

The implied price blend is $13.50: `40%` single at $5.00, `40%` three-pack at $15.00, and `20%` full-spread at $25.00 [assumption: illustrative mix; prices evidenced in apps/api/src/routes/payments.ts]. This is intentionally below enterprise civic-tech software; CivicState is a consumer transaction product, not a SaaS replacement for public-affairs teams.

## Revenue Model

Launch revenue is one-time package sales: $5.00 for one official, $15.00 for three officials, and $25.00 for all matched officials [evidence: apps/api/src/routes/payments.ts]. No subscriptions are in launch scope [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

Future revenue options include human-reviewed complex submissions, paid delivery add-ons, and organization API access, but those are not current plan commitments [evidence: .planning/REQUIREMENTS.md]. The operating rule is a `40%` net margin floor after payment and vendor costs [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts]. That floor is a policy target; the repo does not yet prove achieved margins in production [assumption: no live cost ledger or revenue export in workspace].

## Financial Model

| Metric | Base Case |
| --- | --- |
| Paid submissions per month | `1,000` [assumption: launch-scale scenario, not current traction] |
| Average order value | $13.50 [assumption: illustrative mix from repo prices] |
| Monthly gross revenue | $13,500 [assumption: `1,000` x $13.50] |
| Annual gross revenue | $162,000 [assumption: $13,500 x `12` months] |
| Variable AI and delivery cost per order | $0.75 [assumption: prior operator model in .planning/GENESIS.md; unverified] |
| Payment processing per order | $0.69 [assumption: common card-fee style model on $13.50; unverified] |
| Gross profit per order before fixed costs | $12.06 [assumption: $13.50 - $0.75 - $0.69] |
| Gross margin | `89.3%` [assumption: $12.06 / $13.50] |
| Fixed platform costs per month | $250 [assumption: hosting, email, monitoring, officials-data minimums; unverified] |
| Estimated monthly contribution after fixed costs | $11,810 [assumption: (`1,000` x $12.06) - $250] |

The reconciliation check is straightforward: monthly revenue equals `1,000` paid submissions times $13.50 AOV, or $13,500 [assumption: same model row]. This table is a validation target, not a claim of current financial performance.

## Go To Market

The launch plan should focus on search-led, issue-specific landing pages and public read-only campaign pages only after the core paid delivery loop works [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. The first validation motion is narrower: manually recruit `50` residents with specific civic problems, run a beta workflow, and measure payment conversion, citation quality, and deliverability [assumption: recommended EIR validation plan].

Operating milestones before scaling acquisition: first paid submission, `25` paid submissions, `100` paid submissions, then `1,000` paid submissions per month [assumption: staged validation plan]. Paid acquisition should remain off until conversion and deliverability are demonstrated [evidence: .planning/GENESIS.md].

## Competition

Resistbot is the closest civic-letter analogue; it focuses on low-friction advocacy messaging and does not appear in this workspace as a citation-backed paid research workflow [assumption: general market knowledge, unverified workspace-only]. Change.org competes for civic intent but centers petitions and social proof rather than researched individual letters [assumption: general market knowledge, unverified workspace-only]. Quorum, FiscalNote, VoterVoice, and Phone2Action-style tools serve organizations and advocacy teams, not $5.00 to $25.00 consumer transactions [assumption: general market knowledge, unverified workspace-only].

The stronger skeptical view is that the real competitor is manual email plus free generative AI: a motivated resident can ask a general AI tool for a draft and send it themselves for $0.00 [assumption: market behavior inference]. CivicState must win on official routing, citation verification, compliance guardrails, delivery tracking, and trust.

## Risks And Anti-Plan

Anti-plan: do not scale this as a venture-backed company until the product proves people pay. A `91%` modeled margin is irrelevant if consumer demand is thin, if letters are treated as spam, or if officials ignore AI-assisted constituent mail [assumption: prior model in .planning/GENESIS.md and skeptic analysis].

Major risks:

| Risk | Why It Can Kill The Deal | Mitigation |
| --- | --- | --- |
| Willingness to pay | Residents may want civic help but refuse even $5.00 | Charge before delivery in beta; measure paid conversion [evidence: apps/api/src/routes/payments.ts] |
| Deliverability | Government inboxes may filter repeated civic mail | SPF/DKIM/DMARC, per-domain bounce tracking, one-email-per-official design [evidence: scripts/setup-dns.md; .planning/REQUIREMENTS.md] |
| Citation liability | Bad citations or legal-adjacent language could create trust and legal risk | Verification pipeline, strip unverified citations, human review on failure [evidence: apps/worker/src/agents/researcher.ts] |
| Officials data | Local-official coverage may be expensive or inaccurate | Evaluate provider coverage before broad launch [evidence: .planning/STATE.md] |
| Watchlist sensitivity | Registry already flags this as personal/research, not near-term investible | Keep status draft until operator validation [evidence: dispatch registry note] |

## Assumption Ledger

| Assumption | Current Label | Validation Test |
| --- | --- | --- |
| Residents will pay $5.00 to $25.00 for researched civic letters | [assumption: repo thesis, unvalidated] | `50` recruited users; require payment before send |
| Organic search can acquire civic-intent users cheaply | [assumption: .planning/GENESIS.md distribution hypothesis] | Publish opt-in pages only after delivery works; track indexed impressions |
| AI citation verification can keep hallucination risk acceptable | [assumption: code path exists, production reliability unproven] | Run `100` seeded issues across federal/state/local categories |
| One operator can handle review load | [assumption: .planning/GENESIS.md operating hypothesis] | Track queue depth, oldest flagged item, and minutes per review |
| Local officials coverage can reach acceptable quality | [assumption: provider coverage unverified] | Compare Cicero/BallotReady/OpenStates output across `25` ZIP codes |

## Surprise Spikes

The older `.planning/existing-state.md` says zero application code existed, but the current repo now contains application code, a Prisma schema, API routes, worker agents, web pages, and tests [evidence: .planning/existing-state.md; apps/api/src/index.ts; packages/shared/prisma/schema.prisma]. The `.planning/STATE.md` says only Phase 1 was complete, while `.planning/ROADMAP.md` marks Phases 1 through 4 complete [evidence: .planning/STATE.md; .planning/ROADMAP.md]. This conflict must be resolved by operator review before treating the roadmap as authoritative.

The product name in repo docs is CivicState, while the dispatch project id is `brooks-history` and the repository slug is `brookss-history` [evidence: dispatch; .planning/PROJECT.md]. That naming mismatch should be treated as a data-room risk until the operator confirms whether this repo is the intended CivicState asset.

## Evidence Sources

- `.planning/PROJECT.md` for product definition, constraints, and decisions [evidence].
- `.planning/GENESIS.md` for original demand, distribution, moat, and economics hypotheses [evidence as internal plan; assumptions for market claims].
- `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md` for planned and completed work claims [evidence as internal planning state].
- `apps/api/src/index.ts`, `apps/api/src/routes/payments.ts`, `apps/api/src/routes/submissions.ts`, and `apps/api/src/routes/officials.ts` for implemented API surface [evidence].
- `apps/worker/src/index.ts` and `apps/worker/src/agents/researcher.ts` for implemented worker and citation-verification behavior [evidence].
- `packages/shared/prisma/schema.prisma` for persisted domain model [evidence].

## Decision Gates

CivicState should remain draft/watchlist until the operator validates `3` gates: paid conversion, deliverability, and citation reliability [assumption: EIR gate design]. A practical bar is `3%` paid conversion from preview to checkout, `85%` or better delivered status on government domains, and `95%` or better verified-citation retention on seeded test issues [assumption: validation thresholds, unverified]. Passing those gates would justify a business pitch; failing any one supports keeping this as a research asset.
