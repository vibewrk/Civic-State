# CivicState — Business Plan

Updated: 2026-06-21 [evidence: worker environment current_date]
Status: watchlist / operator-gated [evidence: dispatch registry note says "personal/research asset, not near-term investible BOS"]

## Thesis

CivicState can become a small, durable civic workflow business if individuals will pay one-time fees of $5, $15, or $25 [evidence: apps/api/src/routes/payments.ts] to convert a specific civic concern into a citation-checked constituent letter delivered to matched government officials; until willingness-to-pay, official data coverage, and government inbox deliverability are validated, it should remain a watchlist asset rather than a near-term investible company [evidence: dispatch registry note].

## Problem & Customer

The target customer is a US resident with a specific local, state, or federal civic issue who is willing to act but does not know which officials have jurisdiction, which citations are relevant, or how to write a professional request [evidence: .planning/PROJECT.md]. The launch job is narrow: gather the issue, desired outcome, ZIP code, and anonymity preference, then produce official-targeted letters with compliance language and delivery status [evidence: apps/api/src/routes/submissions.ts; apps/web/components/wizard/issue-form.tsx].

Customer segments:

| Segment | Pain | Current alternative | CivicState wedge |
|---|---|---|---|
| Individual resident | Researching officials and law is slow [assumption: common civic workflow friction; workspace-only no network] | Manual email, phone call, or no action [assumption: behavior estimate] | Guided submission plus official lookup and letter drafting [evidence: apps/api/src/routes/submissions.ts; apps/api/src/lib/officials/lookup.ts] |
| Neighborhood organizer | Needs repeatable, non-inflammatory letters [assumption: product hypothesis from MASTER_PLAN.md] | Shared templates, Change.org-style petition pages [assumption: external substitutes named from model knowledge] | Per-official letters and audit trail [evidence: packages/shared/prisma/schema.prisma] |
| Future civic organization | Wants lower-cost campaign tooling than enterprise advocacy suites [assumption: external market claim; workspace-only no network] | Quorum, VoterVoice, FiscalNote, manual CRM [assumption: named competitors from model knowledge] | Transactional letter engine before any organization API [evidence: .planning/PROJECT.md out-of-scope list] |

## Market

Market sizing is bottom-up because workspace-only mode provides no verified external market data. The sizing below is a validation target, not a proven TAM.

| Layer | Method | Annual value |
|---|---|---|
| TAM | 10,000,000 potential paid civic letter jobs per year [assumption: rough US adult civic-action frequency proxy; no network] x $13.60 average package price [assumption: blended mix of existing $5/$15/$25 tiers] | $136,000,000 [assumption: 10,000,000 x $13.60] |
| SAM | 1,000,000 reachable English-language digital-first jobs per year [assumption: early web/SEO reachable slice] x $13.60 [assumption: blended package price] | $13,600,000 [assumption: 1,000,000 x $13.60] |
| SOM | 25 paid submissions per month by launch validation [assumption: Genesis break-even proxy] x $13.60 [assumption: blended package price] x 12 months [assumption: annualized model] | $4,080 [assumption: 25 x $13.60 x 12] |

The investible question is not whether civic frustration exists; it is whether a customer will pay before seeing government response proof and whether official inbox delivery works at acceptable rates [assumption: EIR judgment based on product risk].

## Product & Moat

What is real today:

- A pnpm monorepo with Next.js frontend, Express API, worker process, shared Prisma schema, and tests exists [evidence: package.json; apps/web/app/page.tsx; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma].
- Pricing tiers of $5, $15, and $25 are implemented in the payment route [evidence: apps/api/src/routes/payments.ts].
- Submission intake, moderation, queueing, official lookup modules, research agent, drafter agent, delivery agent, treasury agent, compliance routes, and admin routes are present in source [evidence: apps/api/src/routes/submissions.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/delivery.ts; apps/api/src/routes/compliance.ts; apps/api/src/routes/admin.ts].
- Current production traction is not evidenced in the repo: no paid customers, revenue, deliverability dashboard, or deployed production metrics are present [evidence: absence of metric artifacts in repo; .planning/existing-state.md says revenue is $0 as a stale prior audit].

Moat hypothesis:

- Data moat: verified official contacts, bounce history, response rates, and opt-out suppression compound with volume [assumption: derived from schema fields and product design].
- Citation moat: a reusable citation library can reduce hallucination risk over time if verified outputs are stored and audited [assumption: derived from apps/worker/src/lib/legal/citation-verifier.ts].
- Content moat is not yet real because public campaign pages and SEO proof are not evidenced as live traffic assets [evidence: repo has no analytics/traffic artifact].

## Platform Posture

Target posture for wrk.vc should be "WrkPlug client" rather than independent platform stack: shared login, identity, billing, and EAI Layer-0 rails should reduce duplicate infrastructure and improve cross-portfolio CAC compounding [assumption: WrkPlug Phase 0 not yet signed; D-032 referenced by dispatch contract].

Surprise: the current code already uses Clerk authentication and Stripe Checkout directly [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts]. That is acceptable for the current prototype but should be treated as replaceable integration plumbing if the operator adopts WrkPlug. Do not hard-wire this business to its own auth or billing as a permanent moat [assumption: operator-gated platform strategy].

## Business Model

Launch revenue is transactional:

- Single official package: $5 [evidence: apps/api/src/routes/payments.ts].
- Three-official package: $15 [evidence: apps/api/src/routes/payments.ts].
- Full-spread package: $25 [evidence: apps/api/src/routes/payments.ts].
- Minimum margin rule: 40% net margin floor after fees is a prior plan constraint, not yet proven by live data [evidence: .planning/PROJECT.md records the constraint].

Unit economics model:

| Item | Base value | Label |
|---|---:|---|
| Average package price | $13.60 | [assumption: mix of 40% single, 40% three-pack, 20% full-spread] |
| AI/research/delivery variable cost per submission | $0.80 | [assumption: prior token-cost range plus email cost; no live usage export] |
| Gross profit per average submission | $12.80 | [assumption: $13.60 minus $0.80] |
| Gross margin | 94.1% | [assumption: $12.80 / $13.60] |
| Initial monthly fixed software/infrastructure | $300 | [assumption: droplet, email, monitoring, API overhead; workspace-only no vendor verification] |
| Break-even paid submissions per month | 24 | [assumption: $300 / $12.80 rounded up] |

Revenue expansion should wait until the individual workflow works. Subscriptions, organization API access, certified mail, fax, and public campaign SEO are explicitly deferred or future-state in the existing plan [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

## Competition

| Competitor or substitute | Position | CivicState differentiation |
|---|---|---|
| Resistbot | Constituent messaging via chat/SMS [assumption: external product knowledge; no network] | CivicState emphasizes researched citations and paid per-campaign delivery [evidence: MASTER_PLAN.md prior positioning] |
| Change.org | Public petition hosting [assumption: external product knowledge; no network] | CivicState sends targeted letters rather than only gathering signatures [assumption: product-positioning comparison] |
| Quorum / VoterVoice / FiscalNote | Enterprise advocacy and policy software [assumption: external market knowledge; no network] | CivicState starts with individuals at $5-$25 [evidence: apps/api/src/routes/payments.ts] |
| LegalZoom | Legal/document workflows [assumption: external product knowledge; no network] | CivicState must stay outside legal advice and claim filing [evidence: .planning/PROJECT.md constraints] |
| Manual email / phone call | Free but high-friction substitute [assumption: common customer behavior] | CivicState packages research, drafting, routing, and tracking [evidence: apps/api/src/routes/submissions.ts; packages/shared/prisma/schema.prisma] |

## Go-To-Market

First distribution wedge: issue-specific search pages and shareable campaign artifacts only after the core paid letter workflow is reliable [assumption: SEO content-loop hypothesis from .planning/GENESIS.md]. Because no traffic or indexed campaign archive is evidenced, the first operating goal is not scale; it is proof that a stranger pays and a government inbox accepts the message.

First customer plan:

- Recruit 20 beta users [assumption: practical manual outreach target] from local civic Facebook groups, neighborhood associations, and municipal issue forums [assumption: channel hypothesis; no network].
- Run 10 concierge submissions [assumption: validation batch size] before opening self-serve payment, so official matching and citation quality can be checked by the operator [assumption: risk-control method].
- Charge the real $5/$15/$25 tiers [evidence: apps/api/src/routes/payments.ts] rather than free beta access, because willingness-to-pay is the primary gate.
- Measure conversion, inbox acceptance, bounce rate, official replies, refund requests, and review queue load [assumption: operating metrics required for validation].

## Financial Model

All forecast figures are assumptions because the repo contains no live revenue export, customer cohort, or vendor invoices.

| Period | Paid submissions | Average price | Revenue | Variable cost | Fixed cost | Headcount cost | Operating result |
|---|---:|---:|---:|---:|---:|---:|---:|
| Launch validation ending 2026-09-30 [assumption: roadmap target] | 25/mo [assumption: break-even validation target] | $13.60 [assumption: blended tier mix] | $340/mo [assumption: 25 x $13.60] | $20/mo [assumption: 25 x $0.80] | $300/mo [assumption: lean infra/tooling] | $0/mo [assumption: founder-operated] | $20/mo [assumption: $340 - $20 - $300] |
| Base year ending 2027-12-31 [assumption: post-validation operating year] | 150/mo [assumption: SEO/manual distribution ramp] | $13.60 [assumption: unchanged mix] | $24,480/yr [assumption: 150 x $13.60 x 12] | $1,440/yr [assumption: 150 x $0.80 x 12] | $9,600/yr [assumption: higher vendor/API use] | $0/yr [assumption: founder-operated] | $13,440/yr [assumption: revenue - costs] |
| Upside year ending 2028-12-31 [assumption: repeatable acquisition] | 500/mo [assumption: meaningful SEO plus referrals] | $13.60 [assumption: unchanged mix] | $81,600/yr [assumption: 500 x $13.60 x 12] | $4,800/yr [assumption: 500 x $0.80 x 12] | $24,000/yr [assumption: paid local data plus monitoring] | $60,000/yr [assumption: part-time ops/legal review capacity] | -$7,200/yr [assumption: revenue - costs] |

Revenue assumptions:

- Package mix is 40% single, 40% three-pack, and 20% full-spread [assumption: no customer data].
- Average paid submissions grow from 25/mo to 150/mo to 500/mo across the periods shown [assumption: GTM model].
- Refunds and chargebacks remain below 1.0% [assumption: risk target; no payment history].

Cost assumptions:

- Variable cost averages $0.80 per paid submission [assumption: token, legal lookup, and email cost placeholder].
- Fixed operating cost starts at $300/mo and rises to $2,000/mo [assumption: vendor and data-provider scaling].
- Human review cost is $0/yr while founder-operated and $60,000/yr once volume requires paid capacity [assumption: staffing model].

Sensitivity tests:

- If average price falls to $8.00 [assumption: discount pressure], break-even rises to 42 submissions/mo [assumption: $300 / ($8.00 - $0.80)].
- If variable cost rises to $3.00 [assumption: legal data/API cost shock], base gross margin falls to 77.9% [assumption: ($13.60 - $3.00) / $13.60].
- If paid conversion is 1.0% [assumption: weak willingness-to-pay], 2,500 qualified monthly visitors are needed for 25 paid submissions/mo [assumption: 25 / 1.0%].

## Risks & Anti-Plan

A skeptical partner should try to kill this deal on these points:

| Hole | Why it could kill the business | Mitigation | Residual risk |
|---|---|---|---|
| People may not pay for civic letters | The customer can email officials for free, and outrage does not equal payment intent [assumption: buyer psychology risk] | Charge real $5/$15/$25 tiers in beta [evidence: apps/api/src/routes/payments.ts] | High until paid conversion is observed |
| Government deliverability may fail | .gov inboxes may block AI-looking or bulk-looking messages [assumption: deliverability risk] | SPF/DKIM/DMARC, Postmark, bounce suppression, per-domain thresholds [evidence: apps/worker/src/agents/delivery.ts] | High until live inbox acceptance is measured |
| Citation risk can create reputational or legal exposure | A bad legal citation or legal-advice tone undermines trust [assumption: legal/compliance risk] | Citation verifier strips unverified citations and flags failures [evidence: apps/worker/src/agents/researcher.ts] | Medium because source coverage can still be incomplete |
| Local official coverage may be too expensive or incomplete | Local data is the hardest part of the value proposition [assumption: data-provider risk] | Use federal/state first and evaluate local providers [evidence: .planning/PROJECT.md] | High until coverage meets user expectations |
| Registry says this may be personal/research, not a business | Operator intent may not support venture packaging [evidence: dispatch registry note] | Keep authority at needs-revision until operator merge [assumption: wrk.dog governance] | High until operator confirms business posture |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| Individuals will pay $5-$25 for a civic letter workflow | Existing product pricing | [evidence: apps/api/src/routes/payments.ts] plus [assumption: willingness-to-pay unproven] | Run paid beta and require payment before delivery |
| Average price is $13.60 | Tier mix model | [assumption: 40%/$5, 40%/$15, 20%/$25] | Compare first 50 paid checkouts [assumption: validation sample] |
| Variable cost is $0.80/submission | Token and email placeholder | [assumption: no vendor invoice in repo] | Export token logs and Postmark/lookup costs after beta |
| TAM is $136,000,000 | Bottom-up paid-job proxy | [assumption: 10,000,000 jobs x $13.60] | Replace with sourced market research when network allowed |
| Deliverability is existential | Government inboxes may filter aggressively | [assumption: email risk] and [evidence: delivery code has bounce threshold] | Track delivered/bounced/spam complaint events |
| Legal-advice boundary is non-negotiable | Existing plan excludes filings and legal advice | [evidence: .planning/PROJECT.md] | Review ToS, AI disclosures, and flagged submissions with counsel before public launch [assumption: counsel requirement] |
| WrkPlug should own auth/billing long-term | Portfolio platform posture | [assumption: WrkPlug Phase 0 not yet signed] | Operator decision before production migration |

## Self-Valuation

Score: 38/100 [assumption: EIR scoring rubric weighted toward traction, distribution proof, and legal/deliverability risk].

Twelve-month valuation bands under the $5,000,000-per-business program assumption [assumption: wrk.vc portfolio framing]:

| Case | Band | Basis |
|---|---:|---|
| Bear | $0-$50,000 | [assumption: no paid demand or deliverability failure] |
| Base | $150,000 | [assumption: 25-150 paid submissions/mo, founder-operated, limited moat] |
| Bull | $750,000 | [assumption: 500 paid submissions/mo, measurable SEO acquisition, verified official-response loop] |

Comparables used only as strategic analogs, not valuation multiples: Resistbot, Change.org, Quorum/VoterVoice, and LegalZoom [assumption: external product knowledge; no network]. What moves valuation: paid conversion above 3.0% [assumption: validation threshold from .planning/PROJECT.md], deliverability above 85.0% [assumption: threshold from .planning/PROJECT.md], and local official coverage above 60.0% [assumption: threshold from .planning/PROJECT.md].

## Milestones

| Date | Milestone | Pass/fail test |
|---|---|---|
| 2026-07-15 [assumption: near-term roadmap] | Evidence audit | Confirm which routes/agents pass tests and which are stubs [assumption: code audit task] |
| 2026-08-15 [assumption: beta readiness target] | Paid beta readiness | Stripe test payment, citation-verified preview, and Postmark sandbox delivery work end-to-end [assumption: validation criteria] |
| 2026-09-30 [assumption: launch validation target] | First paid delivery cohort | 25 paid submissions/mo [assumption: break-even proxy], bounce rate under 10.0% [evidence: apps/worker/src/agents/delivery.ts threshold], and manual review queue manageable by one operator [assumption: ops target] |
| 2026-12-31 [assumption: operator review date] | Investibility decision | Operator decides business vs personal/research posture based on paid demand and risk evidence [evidence: dispatch registry note] |

## Surprise Spikes

- Repo identity is inconsistent: dispatch says `brooks-history`, while the product artifacts describe CivicState [evidence: dispatch header; MASTER_PLAN.md; .planning/PROJECT.md].
- `.planning/existing-state.md` says zero application code and $0 revenue, but the repo now contains a substantial app scaffold with API routes, workers, Prisma schema, frontend pages, and tests [evidence: .planning/existing-state.md; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests].
- `.planning/ROADMAP.md` marks all four phases complete [evidence: .planning/ROADMAP.md], while `.planning/STATE.md` says only Phase 1 is complete [evidence: .planning/STATE.md]; source files show broad implementation, but no live customer or production metrics [evidence: repo source tree].
- Existing code uses direct Clerk and Stripe integrations even though the target wrk.vc posture should make this a WrkPlug client if the operator adopts the business [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts; assumption: WrkPlug Phase 0 not yet signed].
