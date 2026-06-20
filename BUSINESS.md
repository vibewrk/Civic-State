# CivicState — Business Plan

## Thesis

CivicState will be worth building only if ordinary U.S. residents will pay for a citation-backed, jurisdiction-aware civic letter workflow that converts a specific complaint into verified official outreach faster than they can research, draft, and route it themselves. [assumption: workspace-only EIR synthesis from repo evidence and no live market research]

As of 2026-06-20, this is a built-but-unvalidated civic-tech asset, not a near-term investible BOS. [evidence: registry note in dispatch says "personal/research asset, not near-term investible BOS"; evidence: `.planning/STATE.md` says current focus was Phase 1 while `.planning/ROADMAP.md` says later phases completed]

## Problem & Customer

Primary customer: U.S. residents with a concrete, local or state-level civic issue who would contact government if research, legal citation, official targeting, and formal drafting were handled for them. [evidence: `.planning/PROJECT.md` Target User and What This Is]

Customer segments:

| Segment | Pain | Current alternative | Willingness signal |
|---|---|---|---|
| Time-poor civic complainants | They do not know jurisdiction, law, or official contacts. [evidence: `.planning/PROJECT.md`] | Manual search, complaint forms, email, phone calls, city portals. [assumption: model-memory substitute map, not externally verified] | They may pay $5-$25 per campaign. [evidence: `apps/api/src/routes/payments.ts`; evidence: `.planning/PROJECT.md`] |
| Repeat local advocates | They need professional, non-threatening, citation-backed letters across recurring issues. [assumption: inferred from product workflow and moderation code] | Resistbot, petitions, local advocacy groups, copy-pasted emails. [assumption: external substitutes named from model memory; not verified in workspace-only mode] | They may convert if previews prove quality before auth/payment. [evidence: `.planning/PROJECT.md` auth-at-payment decision] |
| Operators/admins | They need exception-based moderation, delivery, treasury, and suppression controls without full-time staffing. [evidence: `apps/api/src/routes/admin.ts`; evidence: `apps/worker/src/agents/treasury.ts`; evidence: `.planning/PROJECT.md`] | Manual queue review and direct email support. [assumption: inferred operating substitute] | The repo assumes <30 min/day routine operator load. [evidence: `.planning/PROJECT.md`] |

This is not legal advice, legal filing automation, lobbying compliance software, a petitions/social network product, or a campaign fundraising platform. [evidence: `.planning/PROJECT.md` Out of Scope; evidence: `.planning/GENESIS.md` Scope Exclusions]

## Market

No live market research was available in this worker run. All external market sizing is therefore an assumption, and the correct validation path is bottom-up demand testing, not top-down civic-tech category math. [assumption: workspace-only constraint from dispatch]

Bottom-up sizing method:

| Layer | Method | Annual transaction count | Blended price | Annual revenue pool |
|---|---|---:|---:|---:|
| TAM | Paid civic-letter occasions among U.S. residents who face a specific government issue and prefer done-for-me routing. [assumption: invented sizing basis pending survey/search data] | 1,000,000 submissions/year [assumption: placeholder bottom-up ceiling] | $13.00/submission [assumption: 40% single at $5, 40% three-pack at $15, 20% full-spread at $25 from code pricing] | $13,000,000/year [assumption: 1,000,000 x $13.00] |
| SAM | SEO-reachable issues where email-to-official is acceptable and legal-adjacent risk is manageable. [assumption: excludes filings, emergencies, threats, legal claims, and non-U.S. use] | 100,000 submissions/year [assumption: 10% of TAM placeholder] | $13.00/submission [assumption: same blend] | $1,300,000/year [assumption: 100,000 x $13.00] |
| 24-month SOM | Practical target after deliverability, official coverage, and preview conversion are proven. [assumption: operator capacity and organic acquisition unvalidated] | 12,000 submissions/year [assumption: 1,000/month run-rate] | $13.00/submission [assumption: same blend] | $156,000/year [assumption: 12,000 x $13.00] |

The old plan cited a 72% conditional-go confidence, 91% gross margin, $132.50/month max burn, break-even at 11 submissions, >=3% conversion, >=85% `.gov` inbox placement, >=95% federal/state official coverage, and >=60% local official coverage. [evidence: `.planning/PROJECT.md` Market Verdict] These are planning gates, not validated results. [evidence: `.planning/REQUIREMENTS.md` keeps most Phase 2-4 customer-facing requirements unchecked]

External orientation links, not used as evidence in workspace-only mode: https://resist.bot [assumption: known substitute from model memory], https://www.quorum.us [assumption: known enterprise incumbent from model memory], https://votervoice.net [assumption: known advocacy incumbent from model memory].

## Product & Moat

What is real today:

- Monorepo structure with `apps/web`, `apps/api`, `apps/worker`, and `packages/shared`. [evidence: `package.json`; evidence: `packages/shared/prisma/schema.prisma`]
- Express API with submissions, officials, payments, webhooks, campaigns, admin, compliance, and Bull Board routes. [evidence: `apps/api/src/index.ts`]
- Worker agents for classifier, researcher, drafter, delivery, treasury, and reconciliation. [evidence: `apps/worker/src/index.ts`]
- Prisma schema for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs. [evidence: `packages/shared/prisma/schema.prisma`]
- Citation verification tests and payment/compliance tests exist. [evidence: `tests/citation-verifier.test.ts`; evidence: `tests/payment.test.ts`; evidence: `tests/compliance.test.ts`]
- Web homepage exists with the $5-$25 promise. [evidence: `apps/web/app/page.tsx`]

What is not proven:

- Real user willingness to pay at $5, $15, or $25. [assumption: no payment/customer evidence found in workspace]
- Real government email deliverability. [assumption: Postmark code exists, but no production delivery data found]
- Official data coverage, especially local officials. [evidence: `.planning/PROJECT.md` identifies Cicero/BallotReady evaluation as a blocker]
- Citation quality in production against arbitrary civic issues. [assumption: tests cover verification logic, not broad market accuracy]
- SEO distribution and public campaign archive compounding. [assumption: described in `.planning/GENESIS.md`, not evidenced by deployed content]

Moat hypothesis: the only defensible asset is a verified official directory, bounce/response history, reusable citation library, moderation/audit record, and public campaign archive that compounds after real paid volume. [assumption: strategic synthesis; `.planning/GENESIS.md` names these assets but no volume exists]

## Platform Posture

Target posture: CivicState should be a WrkPlug client under D-032, draft/operator-gated, consuming shared auth, billing, identity, login, and EAI Layer-0 rails rather than hard-wiring its own independent platform chassis. [assumption: WrkPlug Phase 0 not yet signed]

Current posture: the repo already contains Clerk auth, Stripe payments, Postmark delivery, and direct Express/BullMQ/Prisma infrastructure. [evidence: `apps/api/src/index.ts`; evidence: `apps/api/src/routes/payments.ts`; evidence: `apps/worker/src/agents/delivery.ts`] That is useful prototype evidence, but it raises migration cost if the portfolio standard becomes shared WrkPlug rails. [assumption: architecture implication]

Cost/moat consequence if WrkPlug is adopted: shared login, billing, compliance posture, account identity, and workflow rails could lower duplicate infrastructure work and CAC while letting CivicState focus on civic issue data, official coverage, delivery reputation, and citation quality. [assumption: WrkPlug-client strategy, not implemented in repo]

## Business Model

Pricing exists in code:

- Single official: $5.00 for 1 official. [evidence: `apps/api/src/routes/payments.ts`]
- Three-pack: $15.00 for 3 officials. [evidence: `apps/api/src/routes/payments.ts`]
- Full-spread: $25.00 for all matched officials. [evidence: `apps/api/src/routes/payments.ts`]

Revenue streams:

- Per-campaign transactional fees. [evidence: `apps/api/src/routes/payments.ts`]
- Future organization/API access only after the citizen pipeline is stable. [evidence: `.planning/PROJECT.md` Out of Scope]
- Future certified mail/fax add-ons are deferred. [evidence: `.planning/REQUIREMENTS.md` v2 Enhanced Delivery]

Unit economics, unvalidated:

| Metric | Value | Label |
|---|---:|---|
| Blended ARPU | $13.00/submission | [assumption: tier mix of 40%/$5, 40%/$15, 20%/$25] |
| Variable AI and delivery cost | $0.45/submission | [assumption: midpoint informed by `.planning/GENESIS.md` $0.35-$0.75 token range and `tests/payment.test.ts` $0.20-$0.60 cost estimates] |
| Gross margin before fixed software/vendor costs | 96.5% | [assumption: ($13.00 - $0.45) / $13.00] |
| Stripe/payment friction | material but not modeled precisely | [assumption: no live Stripe fee schedule fetched in workspace-only mode] |
| Reserve | $1,500 Mercury reserve | [evidence: `.planning/PROJECT.md` Financial constraint] |
| Chargeback ceiling | <0.5% | [evidence: `.planning/PROJECT.md` Financial constraint] |

## Competition

Named competitors, incumbents, and substitutes:

| Player | Type | CivicState position |
|---|---|---|
| Resistbot | Citizen-to-official messaging substitute. [assumption: external competitor from model memory; not live-verified] | CivicState claims a research/citation layer and paid delivery workflow. [evidence: `.planning/PROJECT.md` Market Position] |
| Quorum | Enterprise public-affairs platform. [assumption: external incumbent from model memory; not live-verified] | CivicState targets individuals at $5-$25, not enterprise contracts. [evidence: `.planning/PROJECT.md`] |
| VoterVoice/FiscalNote-style advocacy tools | Organization advocacy software. [assumption: external incumbent category from model memory; not live-verified] | CivicState is transactional B2C, not association mobilization. [assumption: positioning synthesis] |
| Change.org / petition platforms | Public pressure and signature aggregation. [assumption: external substitute from model memory; not live-verified] | CivicState is private, official-targeted, citation-backed correspondence. [evidence: `.planning/GENESIS.md` excludes social mechanics early] |
| Manual government portals/email | Free substitute. [assumption: obvious workflow substitute] | CivicState must win on speed, jurisdiction matching, citations, and professional drafting. [assumption: product strategy] |

## Go-To-Market

First 100-customer validation path. [assumption: practical launch target, not market evidence]

1. Launch 20 concierge beta submissions with operator review before payment capture. [assumption: practical validation plan]
2. Recruit 50 users from local-issue communities, civic newsletters, neighborhood groups, and founder/operator networks. [assumption: channel plan, not evidenced]
3. Convert 30 users from long-tail SEO pages once public campaign pages are safe to publish. [assumption: `.planning/GENESIS.md` SEO hypothesis but no indexed pages found]

Channel tests:

| Channel | Test | Pass signal |
|---|---|---|
| Preview-led conversion | Show letter preview before auth/payment. [evidence: `.planning/PROJECT.md` auth-at-payment decision] | >=3% preview-to-paid conversion. [evidence: `.planning/PROJECT.md` validation gate] |
| Deliverability | Warm domain and send operator-approved beta letters. [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/submissions.ts`] | >=85% `.gov` inbox placement. [evidence: `.planning/PROJECT.md` validation gate] |
| Official coverage | Compare matched officials by ZIP against manual lookup. [assumption: validation method] | >=95% federal/state and >=60% local coverage. [evidence: `.planning/PROJECT.md` validation gate] |
| SEO | Publish safe, opt-in campaign pages after compliance review. [assumption: roadmap action from `.planning/GENESIS.md`] | 1,000 organic impressions/month by 2026-09-30. [assumption: validation milestone] |

## Financial Model

The model reconciles revenue as paid submissions x blended ARPU. It is not a forecast; it is a validation budget. [assumption: EIR model]

| Year | Paid submissions | Blended ARPU | Revenue | Variable cost | Fixed/vendor/op cost | Contribution after modeled costs |
|---|---:|---:|---:|---:|---:|---:|
| Y1 ending 2026-12-31 | 1,200 [assumption: beta ramp] | $13.00 [assumption: tier mix] | $15,600 [assumption: 1,200 x $13.00] | $540 [assumption: 1,200 x $0.45] | $8,400 [assumption: infra, paid local official data, email, compliance tooling] | $6,660 [assumption: revenue - variable - fixed] |
| Y2 ending 2027-12-31 | 6,000 [assumption: 500/month average] | $13.00 [assumption: tier mix] | $78,000 [assumption: 6,000 x $13.00] | $2,700 [assumption: 6,000 x $0.45] | $24,000 [assumption: vendors plus part-time support] | $51,300 [assumption: revenue - variable - fixed] |
| Y3 ending 2028-12-31 | 18,000 [assumption: 1,500/month average] | $13.00 [assumption: tier mix] | $234,000 [assumption: 18,000 x $13.00] | $8,100 [assumption: 18,000 x $0.45] | $72,000 [assumption: support, legal review, API/data vendors] | $153,900 [assumption: revenue - variable - fixed] |

Revenue assumptions:

- Tier mix is 40% single, 40% three-pack, and 20% full-spread. [assumption: no customer data]
- Paid conversion clears >=3% of previews. [evidence: `.planning/PROJECT.md` validation gate]
- No subscription revenue is counted in the first 3 years. [assumption: keep model tied to existing code]

Cost assumptions:

- Base infrastructure starts near $96/month for the DigitalOcean backend droplet before frontend/vendor extras. [evidence: `.planning/PROJECT.md` Hosting constraint]
- Local official data may require $100-$500/month. [evidence: `.planning/PROJECT.md` critical blocker]
- Operator review remains part-time until volume exceeds 1,000 submissions/month. [assumption: capacity threshold]

Sensitivity tests:

- If blended ARPU falls to $8.00, Y3 revenue becomes $144,000 on 18,000 submissions. [assumption: 18,000 x $8.00]
- If paid conversion is 1.0% instead of >=3%, acquisition must be rethought before paid buildout. [assumption: conversion sensitivity against `.planning/PROJECT.md` gate]
- If deliverability stays below 70%, the email-first model should pause and certified mail/fax alternatives become mandatory. [assumption: downside threshold; v2 delivery alternatives in `.planning/REQUIREMENTS.md`]
- If human review exceeds 5 minutes/submission, support cost dominates a $13.00 ARPU. [assumption: labor sensitivity]

## Risks & Anti-Plan

Real skeptic version: this may be a neat demo that fails because the buyer does not exist, the letters annoy officials, the legal citations create liability, and free substitutes are good enough.

| Hole | Why it could kill the deal | Mitigation | Residual risk |
|---|---|---|---|
| Willingness to pay is imaginary. | Civic frustration does not equal purchase intent, especially when email and complaint forms are free. [assumption: skeptic critique] | Run paid beta with no discounts and measure preview-to-paid conversion. [assumption: validation plan] | If conversion is <3%, stop growth work. [evidence: `.planning/PROJECT.md` gate] |
| Deliverability may fail. | Government domains may spam-filter or suppress repeated AI-assisted outreach. [evidence: `.planning/PROJECT.md` says deliverability is hardest] | Domain warming, Postmark webhooks, bounce thresholds, official opt-out suppression. [evidence: `apps/worker/src/agents/delivery.ts`; evidence: `packages/shared/prisma/schema.prisma`] | If inbox placement is <85%, value proposition collapses. [evidence: `.planning/PROJECT.md` gate] |
| Citation-backed letters may look like legal advice. | A consumer product that suggests legal authorities can cross trust, liability, or unauthorized-practice boundaries. [assumption: legal risk; no legal conclusion invented] | AI disclosure, not-legal-advice disclaimer, citation stripping, human review when verification fails. [evidence: `apps/worker/src/agents/researcher.ts`; evidence: `.planning/PROJECT.md`] | Regulatory/legal review remains required before launch. [assumption: sensitivity constraint] |
| Local official data may be too stale or expensive. | Bad targeting ruins the product and paid provider costs compress small-ticket economics. [evidence: `.planning/PROJECT.md` blocker] | Start with federal/state plus manual local audit; defer local breadth if data quality fails. [assumption: mitigation] | Local wedge may never clear. [assumption: residual risk] |
| The repo may be template-contaminated. | `.planning/INTAKE-BRIEF.md` describes a dogfood refactor, while product files describe CivicState. [evidence: `.planning/INTAKE-BRIEF.md`; evidence: `.planning/PROJECT.md`] | Treat CivicState code/planning as product truth and log surprise spike. [assumption: EIR decision] | Operator must confirm project identity before pitching. [evidence: registry note asks operator confirm if it should pitch as a business] |

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
|---|---|---|---|
| Users will pay $5-$25 for civic letter delivery. | Price exists in code and planning. | [evidence: `apps/api/src/routes/payments.ts`; assumption: no demand data] | 100 preview sessions with real checkout. [assumption: validation test] |
| Email-first delivery is enough. | Existing roadmap chose email-first. | [evidence: `.planning/GENESIS.md`; assumption: no production deliverability data] | Beta deliverability audit by domain. [assumption: validation test] |
| Official coverage can meet user expectations. | Hybrid provider plan exists. | [evidence: `.planning/PROJECT.md`; assumption: local data provider unknown] | Manual ZIP sample against federal/state/local official targets. [assumption: validation test] |
| Citation quality is defensible. | Verification pipeline exists. | [evidence: `apps/worker/src/agents/researcher.ts`; evidence: `tests/citation-verifier.test.ts`; assumption: broad issue accuracy unproven] | 50 issue corpus with human review. [assumption: validation test] |
| SEO can acquire users cheaply. | Genesis distribution hypothesis. | [evidence: `.planning/GENESIS.md`; assumption: no indexed pages or traffic data] | Publish opt-in pages and measure impressions by 2026-09-30. [assumption: milestone] |
| WrkPlug can reduce platform duplication. | Portfolio strategy in brief. | [assumption: WrkPlug Phase 0 not yet signed] | Operator architecture decision before production migration. [assumption: governance test] |

## Self-Valuation

Score: 2.1/5.0 as of 2026-06-20. [assumption: EIR qualitative score; evidence: repo has working modules but no market proof]

Under the $5,000,000-per-business program assumption, CivicState should be valued as an option, not a scaled business. [assumption: program valuation framing from brief]

| Case | 12-month band | Why |
|---|---:|---|
| BEAR | $0-$150,000 | [assumption: if conversion, deliverability, or legal review fails, code becomes a reusable civic-tech research asset only] |
| BASE | $250,000-$750,000 | [assumption: if paid beta proves conversion >=3%, deliverability >=85%, and operator load is manageable] |
| BULL | $1,250,000-$2,500,000 | [assumption: if CivicState reaches 1,000 paid submissions/month with low chargebacks and compounding SEO] |

Comparables used only as category orientation, not valuation evidence: Resistbot, Quorum, VoterVoice, and Change.org. [assumption: external comparables from model memory; not workspace-verified]

What moves valuation: real paid submissions, deliverability logs, official response rates, CAC by channel, legal review outcome, and proof that citation-backed letters produce better response rates than generic letters. [assumption: investor diligence criteria]

## Milestones

| Date | Milestone | Pass/fail standard |
|---|---|---|
| 2026-06-20 | Soul refresh complete. [evidence: environment_context current_date] | BUSINESS.md, ROADMAP.md, DECISIONS.md, and gate artifacts exist. [assumption: this work product] |
| 2026-07-15 | Operator identity ruling. [assumption: needed because registry flags project as personal/research] | Operator decides pitch/no-pitch and CivicState vs brooks-history naming. [assumption: governance milestone] |
| 2026-08-15 | Paid beta smoke. [assumption: next-quarter plan] | 20 paid or explicitly declined checkout attempts with reasons captured. [assumption: validation target] |
| 2026-09-30 | Delivery and coverage gate. [assumption: next-quarter plan] | >=85% inbox placement, >=95% federal/state coverage, >=60% local coverage, and <0.5% chargebacks. [evidence: `.planning/PROJECT.md` gates] |
| 2026-12-31 | Continue/kill decision. [assumption: EIR governance] | Continue only if revenue, deliverability, legal review, and operator workload support the base case. [assumption: investment discipline] |

## Surprise Spikes

- Project identity conflict: the dispatch project is `brooks-history`, while repo/product content names CivicState. [evidence: user dispatch; evidence: `package.json`; evidence: `.planning/PROJECT.md`]
- Planning state conflict: `.planning/STATE.md` says Phase 1 is complete and current focus is Phase 1, while `.planning/ROADMAP.md` marks Phases 1-4 complete. [evidence: `.planning/STATE.md`; evidence: `.planning/ROADMAP.md`]
- Requirements conflict: `.planning/REQUIREMENTS.md` leaves many Phase 2-4 requirements unchecked, but implementation files for payments, delivery, admin, compliance, and agents exist. [evidence: `.planning/REQUIREMENTS.md`; evidence: `apps/api/src/index.ts`; evidence: `apps/worker/src/index.ts`]
- Intake contamination: `.planning/INTAKE-BRIEF.md` describes an Ultra Start template refactor, not CivicState. [evidence: `.planning/INTAKE-BRIEF.md`]
- Registry posture conflict: registry notes say personal/research asset and not near-term investible BOS, while the original planning text uses a conditional-go market verdict. [evidence: registry note in dispatch; evidence: `.planning/PROJECT.md`]
