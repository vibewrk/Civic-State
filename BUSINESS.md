# Business Plan: CivicState

Prepared: 2026-06-20 [evidence: system current date; worker dispatch context reported 2026-06-19]

## Snapshot Thesis

CivicState is a code-present civic advocacy workflow: a resident describes a civic concern, enters a ZIP code, receives official targeting, gets AI-assisted legal-source research and citation-backed draft letters, pays through Stripe, and tracks delivery [evidence: package.json; .planning/PROJECT.md; apps/web/app/submit/page.tsx; apps/api/src/routes/submissions.ts; apps/api/src/routes/payments.ts; packages/shared/prisma/schema.prisma]. The investible thesis is not yet proven: paid conversion, official coverage, government-inbox deliverability, and legal/compliance posture remain unvalidated [evidence: .planning/PROJECT.md; apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/congress.ts].

Current recommendation: keep on the wrk.vc watchlist as a personal/research asset until the operator confirms whether `brooks-history` should be pitched as a business and until a paid beta clears the gates below [evidence: registry dispatch].

## Evidence Base and Honesty Labels

This plan uses workspace-only research. Repo and registry facts are tagged `[evidence: ...]`; market claims, future outcomes, customer behavior, and unverified external competitor statements are tagged `[assumption: ...]`.

Primary sources read:

- `MASTER_PLAN.md` [evidence: repo plan]
- `.planning/PROJECT.md` [evidence: repo plan]
- `.planning/GENESIS.md` [evidence: repo plan]
- `.planning/ROADMAP.md` [evidence: repo plan]
- `.planning/STATE.md` [evidence: repo plan]
- `package.json` [evidence: code metadata]
- `packages/shared/prisma/schema.prisma` [evidence: data model]
- `apps/api/src/routes/submissions.ts` [evidence: API implementation]
- `apps/api/src/routes/officials.ts` [evidence: API implementation]
- `apps/api/src/routes/payments.ts` [evidence: API implementation]
- `apps/api/src/lib/officials/cicero.ts` [evidence: API implementation]
- `apps/api/src/lib/officials/congress.ts` [evidence: API implementation]
- `apps/worker/src/agents/researcher.ts` [evidence: worker implementation]
- `tests/payment.test.ts` [evidence: test expectations]

## Customer Definition

Primary customer: an individual U.S. resident with a concrete civic concern, desired government outcome, and ZIP code who wants a researched, professional letter sent to relevant government officials [evidence: .planning/PROJECT.md; .planning/GENESIS.md; apps/api/src/routes/submissions.ts].

Buyer/user boundary: the payer is the resident submitting the concern through a one-time checkout, not an enterprise customer in the launch plan [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md].

Excluded customers and jobs: legal advice seekers, claim filers, regulatory filing users, lobbying firms, businesses advocating as businesses, private-individual targets, threats, harassment, and automated follow-up campaigns [evidence: MASTER_PLAN.md; .planning/PROJECT.md; apps/api/src/lib/moderation.ts].

## Product Reality

What is real in the repo:

- Next.js web app with a homepage and guided submission flow [evidence: apps/web/app/page.tsx; apps/web/app/submit/page.tsx].
- Express API routes for submissions, officials, payments, campaigns, admin, webhooks, compliance, and health [evidence: apps/api/src/routes].
- Prisma data model covering users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- BullMQ-style job states from `submitted` through `delivered` and `failed` [evidence: apps/worker/src/engine/state-machine.ts].
- Researcher agent constrained to cite only returned search results and strip unverified citations [evidence: apps/worker/src/agents/researcher.ts].
- Fixed Stripe pricing tiers: $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].

What is not yet proven:

- Production paid demand is absent; planning files say validated requirements are none [evidence: .planning/PROJECT.md].
- Local official lookup is explicitly a stub returning an empty array unless later implemented [evidence: apps/api/src/lib/officials/cicero.ts].
- Congress.gov lookup leaves `email` blank, which weakens an email-delivery product promise [evidence: apps/api/src/lib/officials/congress.ts].
- The planned dynamic margin floor is not implemented in the payment route; checkout uses fixed tiers [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts].

## Market Sizing

No top-down TAM is claimed because the runner is workspace-only and has no current external market research [assumption: no network research available]. The only defensible sizing is a bottom-up validation model:

| Scenario | Build | Revenue |
|---|---:|---:|
| Beta proof | 100 paid submissions [assumption: controlled beta sample] x $15 average order value [assumption: tier-mix midpoint from $5/$15/$25 code prices; evidence: apps/api/src/routes/payments.ts] | $1,500 gross revenue [assumption: arithmetic] |
| Break-even proof | 25 paid submissions [evidence: .planning/GENESIS.md] x $13.60 average order value [assumption: derived from $340 divided by 25] | $340 monthly revenue [evidence: .planning/GENESIS.md] |
| One-metro seed | 1,000 qualified visitors [assumption: operator-owned local funnel] x 3% paid conversion [evidence: .planning/PROJECT.md] x $15 average order value [assumption: tier-mix midpoint] | $450 monthly revenue [assumption: arithmetic] |
| Multi-metro option | 25 metros [assumption: expansion case] x 1,000 qualified visitors per metro [assumption: local SEO and outreach] x 3% paid conversion [evidence: .planning/PROJECT.md] x $15 average order value [assumption: tier-mix midpoint] | $11,250 monthly revenue [assumption: arithmetic] |

The near-term market question is not “how big is civic tech?” The question is whether a narrow cohort pays for a faster, safer civic correspondence workflow when free manual email exists [assumption: free substitute].

## Revenue Model and Pricing

Revenue model: one-time Stripe Checkout transactions for letter campaigns [evidence: apps/api/src/routes/payments.ts].

Current code tiers:

| Tier | Customer promise | Revenue |
|---|---|---:|
| Single | Send to one official [evidence: apps/api/src/routes/payments.ts] | $5.00 [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] |
| Three-pack | Send to three officials [evidence: apps/api/src/routes/payments.ts] | $15.00 [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] |
| Full spread | Send to all matched officials [evidence: apps/api/src/routes/payments.ts] | $25.00 [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] |

Planned controls: pricing should enforce a 40% net margin floor after fees [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. Current gap: the API route does not calculate live Stripe fees, token costs, delivery costs, or per-campaign margin before checkout [evidence: apps/api/src/routes/payments.ts].

## Financial Model

The table below reconciles revenue from volume x price and separates repo-evidenced figures from assumptions.

| Case | Revenue build | COGS build | Gross profit | Fixed cost | Operating contribution |
|---|---:|---:|---:|---:|---:|
| Beta proof | 100 submissions [assumption: beta sample] x $15.00 AOV [assumption: tier mix] = $1,500 [assumption: arithmetic] | 100 submissions [assumption: beta sample] x $1.20 COGS [evidence: MASTER_PLAN.md] = $120 [assumption: arithmetic] | $1,380 [assumption: arithmetic] | $200/month [evidence: MASTER_PLAN.md] | $1,180 [assumption: arithmetic] |
| Break-even proof | 25 submissions [evidence: .planning/GENESIS.md] x $13.60 AOV [assumption: derived] = $340 [evidence: .planning/GENESIS.md] | 25 submissions [evidence: .planning/GENESIS.md] x $1.20 COGS [evidence: MASTER_PLAN.md] = $30 [assumption: arithmetic] | $310 [assumption: arithmetic] | $200/month [evidence: MASTER_PLAN.md] | $110 [assumption: arithmetic] |
| One-metro seed | 30 submissions [assumption: 1,000 visitors x 3% conversion] x $15.00 AOV [assumption: tier mix] = $450 [assumption: arithmetic] | 30 submissions [assumption: conversion model] x $1.20 COGS [evidence: MASTER_PLAN.md] = $36 [assumption: arithmetic] | $414 [assumption: arithmetic] | $200/month [evidence: MASTER_PLAN.md] | $214 [assumption: arithmetic] |

Other relevant financial constraints: backend droplet cost is approximately $96/month [evidence: .planning/PROJECT.md; MASTER_PLAN.md], Mercury reserve target is $1,500 [evidence: .planning/PROJECT.md], chargeback rate must remain under 0.5% [evidence: .planning/PROJECT.md], and tests model tier cost estimates of $0.20, $0.40, and $0.60 [evidence: tests/payment.test.ts].

## Go To Market

Do not lead with SEO until the core promise works. The repo’s older hypothesis is SEO-first through opt-in public campaign pages [evidence: .planning/GENESIS.md; MASTER_PLAN.md], but the current code and registry note require a more conservative launch [evidence: registry dispatch; apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/congress.ts].

Recommended launch motion:

- Start with one operator-recruited metro or issue cohort [assumption: controlled validation path].
- Recruit residents with concrete, non-legal civic issues such as housing enforcement, noise, local safety, permitting, or public works [assumption: common civic categories; evidence: .planning/GENESIS.md].
- Run a paid beta with 100 checkout attempts [assumption: enough signal for early conversion read].
- Measure preview-to-paid conversion against 3% [evidence: .planning/PROJECT.md].
- Measure government inbox placement against 85% [evidence: .planning/PROJECT.md].
- Measure federal/state coverage against 95% and local coverage against 60% [evidence: .planning/PROJECT.md].
- Hold public SEO expansion until delivery, coverage, response handling, and support load are quantified [assumption: risk-controlled sequencing].

## Competition

Competitive alternatives:

- Resistbot: closest civic correspondence substitute, but repo planning positions CivicState around richer research and citation-backed drafting [evidence: .planning/PROJECT.md; MASTER_PLAN.md; assumption: current competitor capabilities not externally verified].
- Change.org: petition hosting and distribution alternative, not the same paid letter-delivery workflow [evidence: MASTER_PLAN.md; assumption: current competitor capabilities not externally verified].
- Quorum and VoterVoice: enterprise advocacy tools aimed at organizations, not individual transactional buyers in launch scope [evidence: .planning/PROJECT.md; assumption: current pricing/features not externally verified].
- LegalZoom, lawyers, and document services: more formal document-help substitutes, but legal advice is out of scope for CivicState [evidence: MASTER_PLAN.md; assumption: substitute framing].
- Manual official email/contact forms: free and structurally dangerous as a competitor because it can make $5 feel unnecessary [assumption: common free substitute].

Positioning that survives scrutiny: CivicState is not “AI lobbying.” It is a paid, consumer-grade constituent correspondence workflow with verified citations, official routing, payment, delivery, and tracking [evidence: .planning/PROJECT.md; apps/api/src/routes/submissions.ts; apps/worker/src/agents/researcher.ts].

## Risks and Anti-Plan

A skeptical partner should try to kill this on these grounds:

- Users may not pay because manual official email is free, and civic frustration does not always translate into payment intent [assumption: willingness-to-pay risk].
- The delivery promise may fail because local official lookup is a stub and federal officials may lack direct email addresses in the current integration [evidence: apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/congress.ts].
- Government inboxes may classify AI-assisted civic mail as spam or low-value bulk mail even when the sender paid [assumption: deliverability/reputation risk].
- The product is legally adjacent: users may try to send demand letters, accusations, or claim-like language despite disclaimers [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts].
- The repo identity is confused: dispatch says `brooks-history`/`brookss-history`, while product files say CivicState [evidence: registry dispatch; package.json; .planning/PROJECT.md].
- The roadmap is stale: `.planning/ROADMAP.md` marks all phases complete, while `.planning/STATE.md` says Phase 1 is complete and Phase 2 planning is next [evidence: .planning/ROADMAP.md; .planning/STATE.md].
- The original plan’s 91% gross margin and 72% confidence are planning assertions, not measured outcomes [evidence: .planning/PROJECT.md; assumption: unvalidated forecast].

Anti-plan: do not raise capital, buy traffic, or pitch this as a scalable civic-tech company until a controlled beta proves paid conversion, official data coverage, inbox placement, citation safety, and operator workload [assumption: VC-grade validation sequence].

## Assumption Ledger

| Assumption | Basis | Test | Kill/continue rule |
|---|---|---|---|
| Residents will pay $5-$25 for civic letter delivery [assumption: unvalidated demand] | Pricing exists in code [evidence: apps/api/src/routes/payments.ts] | Paid beta checkout funnel | Continue only if preview-to-paid conversion reaches 3% [evidence: .planning/PROJECT.md] |
| Official coverage is good enough [assumption: API coverage unproven] | Hybrid lookup planned [evidence: .planning/PROJECT.md] | ZIP audit across target geography [assumption: operator test] | Continue only if federal/state reaches 95% and local reaches 60% [evidence: .planning/PROJECT.md] |
| Government deliverability works [assumption: .gov inbox behavior unknown] | Postmark/DNS plan exists [evidence: scripts/setup-dns.md; .planning/PROJECT.md] | Seeded inbox and bounce monitoring [assumption: operator test] | Continue only if inbox placement reaches 85% [evidence: .planning/PROJECT.md] |
| Fixed tiers preserve margin [assumption: live COGS not measured] | Tiers and tests exist [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts] | Campaign-level treasury reconciliation [evidence: packages/shared/prisma/schema.prisma] | Continue only if net margin remains above 40% [evidence: .planning/PROJECT.md] |
| One operator can handle review [assumption: workload unproven] | Planning expects exception-based workflow [evidence: .planning/PROJECT.md] | Track flagged queue age and manual minutes [assumption: beta instrumentation] | Continue only if review SLA stays under 24 hours [evidence: .planning/PROJECT.md] |

## Milestones and Gates

Near-term gates, as of 2026-06-20 [evidence: system current date]:

- Identity ruling: decide whether the public asset is `CivicState`, `brooks-history`, or another name before wrk.vc exposure [evidence: registry dispatch; package.json].
- Coverage gate: verify real official contacts for the launch geography before taking public payments [assumption: launch readiness condition; evidence: apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/congress.ts].
- Payment gate: prove a user can move from preview to paid checkout and webhook-confirmed delivery [evidence: apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts].
- Safety gate: run adversarial citation and moderation cases before public usage [assumption: trust/safety necessity; evidence: apps/worker/src/agents/researcher.ts; apps/api/src/lib/moderation.ts].
- Operator gate: confirm support, flagged review, and legal/compliance review ownership [assumption: operating prerequisite].

## Surprise Spikes

- The registry frames this as a watchlist personal/research asset and explicitly asks whether it should pitch as a business [evidence: registry dispatch].
- The project name in code and planning is CivicState, not Brooks History [evidence: package.json; .planning/PROJECT.md].
- The repo contains much more implementation than the thin-soul registry note suggests [evidence: apps/; packages/; tests/].
- The internal planning state conflicts on completion status [evidence: .planning/ROADMAP.md; .planning/STATE.md].
- The current product can look build-complete while the riskiest business dependencies remain outside the repo: demand, government inbox acceptance, official-contact coverage, and counsel review [assumption: validation gap].

## Recommendation

Treat CivicState as a real prototype with a plausible wedge, not a venture-ready company. The next value-creating work is not more broad feature build; it is a disciplined validation pass over identity, paid conversion, official data coverage, deliverability, citation safety, and operator burden [evidence: .planning/PROJECT.md; registry dispatch; apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/congress.ts].
