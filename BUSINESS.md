# CivicState Business Plan

## Document Control

As of 2026-06-19 [assumption: session date], this soul upgrades the brooks-history registry entry into a VC-grade but honesty-labeled business plan. The repository evidence names the product CivicState, not Brooks History [evidence: package.json; .planning/PROJECT.md]. The latest root planning date found in the repository is 2026-04-25 [evidence: .planning/PROJECT.md].

Status: proposed, not adopted [evidence: registry dispatch in worker brief]. Registry sensitivity: Watchlist; personal/research asset; not near-term investible until the operator confirms whether this should pitch as a business [evidence: registry dispatch in worker brief].

## Thesis Current

CivicState is a transactional civic-tech product: a US resident describes a civic concern, enters a ZIP code, reviews AI-researched and citation-backed letters, pays for a delivery package, and the system sends individualized constituent communications to matched government officials [evidence: MASTER_PLAN.md; apps/api/src/routes/submissions.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts].

The investible thesis is not "AI writes letters." The thesis is that CivicState can collapse research, jurisdiction routing, citation verification, payment, delivery, and status tracking into a low-friction workflow whose paid output is worth $5, $15, or $25 to an individual constituent [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md].

Current verdict: buildable research asset, not yet a venture-grade company. The repo now contains a real monorepo, Prisma schema, Express routes, worker agents, Stripe/Postmark paths, admin routes, and tests [evidence: package.json; packages/shared/prisma/schema.prisma; apps/api/src/index.ts; apps/worker/src/index.ts; tests]. It does not contain evidence of production traffic, paid users, official response rates, or repeatable acquisition [evidence: .planning/existing-state.md; .planning/STATE.md].

## Customer Definition

Primary customer: an individual US resident with a specific civic frustration who would contact a government official if research, drafting, routing, and delivery were handled for them [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

Initial buyer is likely an issue-motivated, one-time purchaser rather than a habitual subscription user [assumption: derived from the repo's decision to remove subscriptions and use one-time packages]. The customer is not an enterprise advocacy team, a law firm, or a regulated filing customer in the launch scope [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

The highest-signal early segment is residents acting on local quality-of-life, school, zoning, public safety, housing, transit, or enforcement concerns where the desired outcome is a constituent request, not legal advice [assumption: product wedge inferred from repository scope and legal-risk exclusions].

## Product Evidence

Implemented surfaces include an Express API, Clerk-aware route middleware, submission creation with moderation, official lookup, campaign APIs, Stripe Checkout session creation, Stripe and Postmark webhooks, admin review endpoints, compliance endpoints, BullMQ workers, and a Prisma schema for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: apps/api/src/index.ts; apps/api/src/routes; apps/worker/src; packages/shared/prisma/schema.prisma].

The AI pipeline is architected around classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/index.ts]. The researcher searches eCFR, CourtListener, and a state cache, then strips unverified citations before drafting [evidence: apps/worker/src/agents/researcher.ts; apps/worker/src/lib/legal/citation-verifier.ts].

The delivery path sends individual Postmark emails, tracks bounces and spam complaints, suppresses opted-out officials, and pauses delivery for domains above a 10% bounce threshold [evidence: apps/worker/src/agents/delivery.ts]. That is operationally meaningful, but deliverability has not been proven against live government inboxes [assumption: no production delivery evidence found in repo].

## Revenue Model

Launch revenue is transactional: single-official package at $5, three-official package at $15, and full-spread package at $25 [evidence: apps/api/src/routes/payments.ts]. The repo also carries a 40% net margin floor as a product constraint [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

Future revenue streams named in the plan include priority complex review and API access for organizations, but those are out of launch scope [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md]. They should remain optional expansion paths, not underwriting assumptions.

The model only works if users pay before delivery, Stripe webhooks are reliable, official email coverage is high enough to create perceived value, and human review does not consume the margin on low-ticket transactions [assumption: operational synthesis from payment, official lookup, moderation, and delivery code].

## Financial Model

This is a validation model, not a forecast. It reconciles package mix to revenue so the next operator can test whether the unit economics deserve a business pitch.

| Line | Conservative validation case |
| --- | --- |
| Paid submissions | 100 per month [assumption: validation cohort size, not market evidence] |
| Package mix | 50 at $5, 30 at $15, 20 at $25 [assumption: illustrative mix using implemented prices] |
| Revenue build | 50 x $5 + 30 x $15 + 20 x $25 = $1,200 per month [assumption: arithmetic from implemented prices] |
| AI and delivery variable cost | $1.00 per paid submission, or $100 per month [assumption: placeholder pending live token/Postmark data] |
| Payment processing | $0.50 per paid submission, or $50 per month [assumption: placeholder pending actual Stripe fee export] |
| Hosting base | $96 per month backend droplet [evidence: MASTER_PLAN.md; .planning/PROJECT.md] |
| Optional managed database | $50 per month when scale requires it [evidence: MASTER_PLAN.md] |
| Optional object storage | $25 per month when archival storage is needed [evidence: MASTER_PLAN.md] |
| Optional load balancer | $12 per month in later scaling path [evidence: MASTER_PLAN.md] |
| Validation gross margin before fixed hosting | ($1,200 - $100 - $50) / $1,200 = 87.5% [assumption: arithmetic from validation model] |
| Validation contribution after base hosting | $1,200 - $100 - $50 - $96 = $954 per month [assumption: arithmetic from validation model] |

Treasury controls named in the repository include a $1,500 reserve, a $2,000 warning threshold, a $500 emergency threshold, a $0.10 reconciliation discrepancy flag, and a 150% job-budget overage pause [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; apps/worker/src/agents/treasury.ts].

## Market Sizing

Because this worker is workspace-only, no external market research was performed. External claims about the number of eligible US residents, civic complaints, advocacy-tech spend, or competitor traffic would be assumptions rather than evidence.

Bottom-up launch sizing method:

| Scope | Method | Result |
| --- | --- | --- |
| Alpha proof | Operator recruits issue-motivated users and measures paid conversion on the existing $5/$15/$25 ladder [assumption: practical validation method] | 25 paid submissions in a month is the first viability signal [assumption: minimum signal chosen to exceed hobby usage] |
| Local wedge | Repeat the alpha in one geography and measure official coverage, bounce rate, and response rate [assumption: geography-first testing avoids national hand-waving] | 100 paid submissions in a month supports the validation model above [assumption: validation cohort size] |
| Venture question | Only after live conversion, response, and retention exist, estimate reachable demand from observed channel throughput [assumption: market should be inferred from observed acquisition, not top-down TAM] | TAM/SAM/SOM intentionally withheld until live evidence exists |

The repository's older confidence and market-size language should not be reused as proof. The plan mentions 72% confidence, 91% gross margin, 3% conversion, 85% inbox placement, 95% federal/state coverage, and 60% local coverage [evidence: .planning/PROJECT.md], but the repo does not include market evidence validating those thresholds [assumption: no supporting dataset found].

## Competition

Named competitive set: Resistbot, Change.org, LegalZoom, VoterVoice, Quorum, and manual constituent outreach [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

Positioning hypothesis:

| Alternative | Customer job | CivicState wedge |
| --- | --- | --- |
| Resistbot | Fast constituent messaging [assumption: competitor characterization from repo plan, not current external research] | More research, citations, and workflow depth [evidence: MASTER_PLAN.md] |
| Change.org | Public petition gathering [assumption: competitor characterization from repo plan, not current external research] | Direct individualized official delivery [evidence: MASTER_PLAN.md] |
| LegalZoom | General document drafting [assumption: competitor characterization from repo plan, not current external research] | Narrow civic communications, not legal services [evidence: MASTER_PLAN.md] |
| VoterVoice / Quorum | Organization advocacy operations [assumption: competitor characterization from repo plan, not current external research] | Individual transactional buyer at $5-$25 [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts] |
| Manual outreach | User finds officials, law, and wording alone [assumption: customer workflow inference] | Compression of research, drafting, routing, and delivery [evidence: .planning/GENESIS.md] |

The honest concern is that competitors may already own habit, brand trust, official deliverability, or institutional workflows. CivicState's moat is not present at launch; it would have to be earned through verified official contact data, reusable citation results, and trusted delivery history [assumption: moat analysis inferred from .planning/GENESIS.md].

## Go To Market

Primary launch motion should be manual and narrow, not national SEO. The operator should recruit issue-motivated users in one geography, run the full workflow, and instrument conversion, delivery, bounce, official response, refund, and review load [assumption: validation-first GTM].

SEO can become a second motion only after opt-in public campaign pages exist and the product has enough successful campaigns to publish without creating privacy, defamation, or spam risk [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

Paid acquisition should stay off until the funnel proves that a paid click can recover at least the $5 entry package and support the 40% margin floor [assumption: conservative acquisition constraint using repo margin floor].

## Risks And Anti-Plan

The partner-kill case is strong:

- Users may agree that the workflow is useful but refuse to pay even $5 [assumption: willingness-to-pay unvalidated].
- Government inbox deliverability may fail because individual email delivery still looks like platform-generated advocacy at scale [assumption: deliverability risk from Postmark path and government-recipient workflow].
- Official lookup may be too incomplete locally to justify the promise of correct targeting [evidence: .planning/PROJECT.md; apps/api/src/lib/officials/lookup.ts].
- Legal-adjacent content, defamation risk, threats, and public accusations may push too much volume into human review for a low-ticket business [evidence: apps/api/src/lib/moderation.ts; apps/api/src/routes/admin.ts].
- AI citation verification can reduce hallucination risk, but it does not make the product legal advice-safe or factually complete [evidence: apps/worker/src/lib/legal/citation-verifier.ts; apps/worker/src/agents/drafter.ts].
- The current repo has implementation bugs and unproven integration paths; for example, the compliance export route selects fields that do not match the Prisma schema [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].
- The registry mismatch between brooks-history and CivicState may indicate this repo is a personal research asset rather than an operator-backed startup [evidence: registry dispatch in worker brief; package.json].

Anti-plan: do not pitch this as investible until live paid delivery exists, at least one official lookup provider is production-proven, compliance routes typecheck against the schema, and the operator confirms this is meant to be a company rather than a research build [assumption: investment readiness criteria].

## Assumption Ledger

| Assumption | Why it matters | Validation path |
| --- | --- | --- |
| People will pay $5-$25 for constituent-letter workflow [evidence: apps/api/src/routes/payments.ts] | Core revenue | Run manual beta and measure paid checkout completion [assumption: validation method] |
| Official coverage is high enough to feel complete | Product trust | Log coverage by ZIP and source for every lookup [evidence: apps/api/src/lib/officials/lookup.ts] |
| Government deliverability is acceptable below a 10% bounce threshold [evidence: apps/worker/src/agents/delivery.ts] | Delivery promise | Domain warming plus bounce/complaint monitoring [assumption: operational method] |
| Human review stays manageable | Margin | Track flagged submissions per paid job [evidence: apps/api/src/lib/moderation.ts] |
| Citation verification meaningfully reduces trust failures | Product quality | Compare verified and stripped citations in live jobs [evidence: apps/worker/src/agents/researcher.ts] |
| SEO can acquire users later | Scale | Publish opt-in campaign pages only after privacy review [evidence: .planning/GENESIS.md] |

## Surprise Spikes

- Project identity conflict: the dispatch project is brooks-history, while every repo artifact inspected describes CivicState [evidence: registry dispatch in worker brief; package.json; MASTER_PLAN.md].
- Stale planning conflict: .planning/STATE.md says only foundation is complete, while .planning/ROADMAP.md marks all phases complete and source files show broad implementation [evidence: .planning/STATE.md; .planning/ROADMAP.md; apps/api/src; apps/worker/src].
- The prior existing-state audit says no application code exists, but this checkout contains application code, tests, Prisma schema, API routes, worker agents, and frontend scaffolding [evidence: .planning/existing-state.md; apps; packages; tests].
- The watchlist registry note is commercially material: this may be an artifact to preserve rather than a company to finance [evidence: registry dispatch in worker brief].

## Evidence Sources

- [evidence: MASTER_PLAN.md] Product architecture, pricing, infrastructure, competition, and deferred scope.
- [evidence: .planning/PROJECT.md] Core value, requirements, constraints, validation thresholds, and registry-like planning notes.
- [evidence: .planning/GENESIS.md] assumptions, target user, value chain, distribution, moat, and exclusions.
- [evidence: .planning/REQUIREMENTS.md] implemented and planned requirements by module.
- [evidence: packages/shared/prisma/schema.prisma] implemented data model.
- [evidence: apps/api/src/routes] API behavior for submissions, officials, payments, webhooks, campaigns, compliance, and admin.
- [evidence: apps/worker/src] implemented agent and delivery architecture.
- [evidence: tests] local test coverage surface.
