# CivicState (brooks-history) - Business Plan

## Thesis

CivicState wins if ordinary US residents with specific civic problems will pay a small transactional fee to turn intent into researched, citation-backed constituent letters delivered to the correct officials, while the operator proves delivery, citation quality, and paid demand before treating this as a venture-scale business. [assumption: commercial thesis synthesized from `.planning/PROJECT.md`, `.planning/GENESIS.md`, and registry note that the asset is personal/research rather than near-term investible]

As of 2026-06-23, the repo contains a real monorepo for a product named CivicState, while the fleet project id is brooks-history. [evidence: `package.json`, `.planning/PROJECT.md`, `.wrkdog-run/env-boundary.json`]

## Problem & Customer

The customer is a US resident with a concrete civic frustration who wants a government actor to respond but does not know jurisdiction, applicable law, official contacts, or formal letter structure. [evidence: `.planning/GENESIS.md` target user; `.planning/PROJECT.md` what-this-is]

Primary segment: individual constituents submitting one issue at a time, with a planned price band of $5, $15, or $25 per campaign tier. [evidence: `apps/api/src/routes/payments.ts`; `tests/payment.test.ts`]

Secondary future segment: HOAs, nonprofits, civic groups, or local advocacy operators that could reuse the research, routing, and delivery workflow after the individual pipeline proves quality. [assumption: `.planning/PROJECT.md` lists API consumers as future Phase 4+ stakeholders, but no organization product is implemented]

Alternatives today are manual search and email, free advocacy tools such as Resistbot, organization-grade advocacy suites such as Quorum, FiscalNote/VoterVoice, Phone2Action/Capitol Canary style tools, generic AI drafting in ChatGPT or Claude, and hiring a lawyer or consultant. [assumption: competitor set from model knowledge; no network access in this worker]

The practical pain is not "writing a letter"; it is the bundled work of identifying jurisdiction, finding usable citations, targeting officials, staying non-threatening/non-defamatory, paying only after preview, and tracking delivery. [evidence: `apps/api/src/routes/submissions.ts`, `apps/api/src/routes/officials.ts`, `apps/worker/src/agents/researcher.ts`, `apps/worker/src/agents/drafter.ts`, `apps/worker/src/agents/delivery.ts`]

## Market

Market sizing is bottom-up because no external research was available in this workspace-only run. All market-size numbers below are testable planning assumptions, not evidence.

| Layer | Method | Size |
| --- | --- | --- |
| TAM | 1,000,000 paid civic-letter submissions per year x $15 blended order value | $15,000,000 annual gross bookings [assumption: broad US civic-action demand model; no external source used] |
| SAM | 50,000 reachable high-intent submissions per year from SEO, social sharing, and civic issue search x $15 blended order value | $750,000 annual gross bookings [assumption: reachable organic wedge model from `.planning/GENESIS.md`] |
| SOM | 2,400 paid submissions per year after launch x $15 blended order value | $36,000 annual gross bookings [assumption: first operating year target for a single-operator product] |

This is not yet a VC-scale market under the current consumer-only transaction model. The venture case requires either much higher volume, organization/API expansion, or portfolio/shared-rail leverage through wrk.vc. [assumption: venture-scale judgment; registry note says "personal/research asset, not near-term investible BOS"]

The existing planning document claimed a conditional go with 72% confidence, 91% gross margin, $132.50 monthly max burn, and break-even at 11 submissions. [evidence: `.planning/PROJECT.md`] Those figures are treated here as historical planning claims, not validated market evidence.

## Product & Moat

What is real today:

- A pnpm monorepo with `apps/web`, `apps/api`, `apps/worker`, and `packages/shared`. [evidence: `package.json`, `pnpm-workspace.yaml`]
- Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs. [evidence: `packages/shared/prisma/schema.prisma`]
- Content moderation before submission creation, with block/flag/pass outcomes and HMAC audit logging. [evidence: `apps/api/src/routes/submissions.ts`, `apps/api/src/lib/moderation.ts`]
- Officials lookup route with rate limiting and source aggregation. [evidence: `apps/api/src/routes/officials.ts`]
- Researcher and drafter workers that restrict citations to retrieved legal-source results and strip unverified citations. [evidence: `apps/worker/src/agents/researcher.ts`, `apps/worker/src/lib/legal/citation-verifier.ts`, `apps/worker/src/agents/drafter.ts`]
- Stripe Checkout route with three hardcoded tiers: $5, $15, and $25. [evidence: `apps/api/src/routes/payments.ts`; `tests/payment.test.ts`]
- Postmark delivery worker with opt-out, invalid-email, and 10% domain-bounce-rate checks. [evidence: `apps/worker/src/agents/delivery.ts`]
- Admin, dashboard, treasury, and compliance routes/pages exist in code. [evidence: `apps/api/src/routes/admin.ts`, `apps/web/app/admin/page.tsx`, `apps/api/src/routes/compliance.ts`]

What is not proven:

- Production deliverability to government inboxes is unvalidated. [assumption: no live deliverability evidence found]
- Willingness to pay is unvalidated. [evidence: `.planning/PROJECT.md` says "None yet - ship to validate" under validated requirements]
- Local official coverage depends on a provider choice that prior planning still calls an evaluation spike. [evidence: `.planning/PROJECT.md`, `.planning/STATE.md`]
- The compliance export route appears to reference fields that do not exist in the current Prisma schema, so compliance is not launch-ready until tested and repaired. [evidence: `apps/api/src/routes/compliance.ts`; `packages/shared/prisma/schema.prisma`]

Moat hypothesis: the product could accumulate verified official contacts, bounce history, opt-out status, citation verification outcomes, reusable state-law cache entries, and campaign-delivery proof. [assumption: data-compounding model derived from repo architecture] The moat is weak below 1,000 monthly submissions and becomes meaningful only if official/contact and citation data compound faster than substitutes can copy. [assumption: scale threshold from planning model, not evidence]

## Platform Posture

WrkPlug posture: for wrk.vc portfolio alignment, CivicState should be evaluated as a client of the shared WrkPlug chassis rather than as a venture that must own standalone auth, billing, identity, and login forever. [assumption: WrkPlug Phase 0 not yet signed]

Current code reality is different: the repo directly uses Clerk for auth and Stripe for payments. [evidence: `apps/api/src/routes/payments.ts`, `apps/api/src/middleware/auth.ts`, `apps/web/app/sign-in/[[...sign-in]]/page.tsx`] If WrkPlug is adopted, the cost/moat consequence is lower duplicated infra, less bespoke customer-account work, and more shared-rails compounding across wrk.vc assets. [assumption: portfolio platform logic; no signed integration]

This plan does not authorize hard-wiring WrkPlug. The roadmap should first preserve current direct integrations, then add a reversible chassis boundary only after operator approval. [assumption: safest migration posture]

## Business Model

Launch revenue stream: consumer paid campaigns at $5 for one official, $15 for three officials, and $25 for all matched officials. [evidence: `apps/api/src/routes/payments.ts`; `tests/payment.test.ts`]

Blended order assumption: $15 average order value with a mix of single, three-pack, and full-spread orders. [assumption: midpoint model from implemented tiers]

Variable cost assumption: $0.60 per full-spread submission, $0.40 per three-pack submission, and $0.20 per single-official submission for model and delivery costs. [assumption: `tests/payment.test.ts` references these cost estimates; not audited against provider invoices]

Gross margin assumption: 90%+ contribution margin before support if the above cost estimates hold. [assumption: test file asserts margin structure but no production cost ledger exists]

Potential future streams:

- Organization pilot packages at $500 to $2,000 per month for small civic groups needing repeated campaigns. [assumption: model knowledge and future API-consumer stakeholder in `.planning/PROJECT.md`]
- API or managed workflow fee after the citizen pipeline reaches reliable citation/delivery thresholds. [assumption: future Phase 4+ scope in `.planning/PROJECT.md`]
- Optional physical mail/fax upsells only after email deliverability is proven. [assumption: `.planning/REQUIREMENTS.md` defers certified mail and fax]

## Competition

Resistbot is the closest free individual-user substitute, but the planned CivicState differentiation is legal/regulatory research with verified citations and paid delivery tracking. [assumption: competitor characterization from model knowledge; repo names Resistbot as closest in `.planning/PROJECT.md`]

Quorum, FiscalNote/VoterVoice, Phone2Action/Capitol Canary style tools, and other advocacy CRMs serve organizations with campaign-management workflows, not one-off individual users at $5 to $25. [assumption: model knowledge; `.planning/PROJECT.md` references enterprise platforms at $10,000+/year]

ChatGPT, Claude, Perplexity, and general search can draft or research, but they do not own official lookup, citation verification, payment gating, delivery, bounce tracking, opt-out enforcement, and audit trails in one pipeline. [assumption: model knowledge combined with repo implementation evidence]

Law firms, consultants, and local advocacy organizations are high-touch substitutes when the issue is legally sensitive or politically organized. [assumption: market structure judgment]

Positioning: CivicState should not claim to be legal advice, an advocacy network, a petition product, or a replacement for campaign software. It is a narrow transaction: "research, draft, route, deliver, and track a constituent letter." [evidence: `apps/worker/src/agents/drafter.ts`; `.planning/GENESIS.md`]

## Go-To-Market

First wedge: search and share intent around long-tail local civic problems, because the original plan assumes organic SEO and campaign-page sharing rather than paid acquisition. [evidence: `.planning/GENESIS.md`]

First one hundred paid users should come from narrow issue templates, not a generic civic-action landing page: noise complaints, zoning/enforcement failures, school-board policy, road maintenance, tenant/public works complaints, and public-records style requests. [assumption: segmentation model from target user definition]

Channel tests:

- SEO landing pages for 10 civic issue categories by 2026-07-31. [assumption: operator-buildable GTM test]
- Manual concierge beta for 25 submissions by 2026-08-31 to measure willingness to pay and delivery failures before self-serve scale. [assumption: validation design]
- Local civic-community outreach to 5 moderators, newsletter operators, or issue-specific groups by 2026-09-15. [assumption: low-cost distribution test]

The no-go signal is brutal: if fewer than 3% of preview users pay after seeing a draft, the consumer transaction model is probably too weak. [assumption: old plan used >=3% conversion as a gate in `.planning/PROJECT.md`]

## Financial Model

| Year | Revenue build | Revenue | Cost build | EBITDA-style result |
| --- | --- | --- | --- | --- |
| 2026 launch half-year | 200 paid submissions x $15 blended AOV + $0 organization revenue | $3,000 [assumption: launch validation case] | $2,400 fixed tools/hosting + $80 variable cost + $6,000 operator support allocation | -$5,480 [assumption: single-operator validation budget] |
| 2027 base | 3,000 paid submissions x $15 blended AOV + 2 organization pilots x $6,000/year | $57,000 [assumption: base adoption case] | $7,200 hosting/tools + $1,200 variable cost + $30,000 support/ops allocation | $18,600 [assumption: lean operator case] |
| 2028 base | 12,000 paid submissions x $15 blended AOV + 10 organization pilots x $12,000/year | $300,000 [assumption: expanded niche case] | $18,000 hosting/tools + $7,200 variable cost + $120,000 support/ops allocation | $154,800 [assumption: lean small-team case] |

Revenue assumptions:

- Consumer blended AOV is $15 because the implemented product has $5, $15, and $25 tiers. [evidence: `apps/api/src/routes/payments.ts`; assumption: mix]
- Organization pilots start only after delivery success and citation quality are measured. [assumption: staged GTM logic]
- No subscription revenue is counted before 2027. [assumption: consumer-first launch sequencing]

Cost assumptions:

- Hosting/tooling starts near the old plan's $132.50 per month burn and grows with production tooling. [evidence: `.planning/PROJECT.md`; assumption: later scale-up]
- Variable cost stays below $0.60 per campaign in the base case. [assumption: cost estimate referenced by `tests/payment.test.ts`]
- Support cost dominates if moderation, citation failures, or deliverability exceptions require human review. [assumption: operational-risk model]

Sensitivity tests:

- Bear: 1,000 paid submissions in 2027 x $15 and no organization pilots produces $15,000 revenue, likely not worth operating as a standalone venture. [assumption: downside adoption]
- Margin break: if human review averages $8 per paid campaign, the $5 and $15 tiers become unattractive even with low model cost. [assumption: support-cost stress test]
- GTM break: if preview-to-paid conversion is under 3%, self-serve consumer acquisition should pause. [assumption: `.planning/PROJECT.md` validation gate]
- Deliverability break: if .gov inbox placement is under 85%, delivery is not credible enough to charge at scale. [assumption: `.planning/PROJECT.md` validation gate]

## Risks & Anti-Plan

Hole 1: The consumer may not pay. The product might be useful but feel like a free civic utility, especially when a user can ask a general AI to draft a letter. Mitigation: run paid preview tests before scaling SEO. Residual risk: a 3% conversion gate may still not overcome low AOV. [assumption: demand-risk judgment]

Hole 2: Official email deliverability may kill the product. Government domains can silently spam-folder, bounce, or suppress messages, and "sent" is not the same as civic impact. Mitigation: require SPF/DKIM/DMARC, warming, bounce monitoring, and inbox-placement tests before paid launch. Residual risk: production deliverability could remain below 85%. [assumption: deliverability risk; `.planning/PROJECT.md` names this as hardest problem]

Hole 3: Citation-backed letters can create legal-adjacent trust and liability risk. A single hallucinated or misleading citation could damage credibility. Mitigation: only cite retrieved sources, strip unverified citations, and flag total citation failure for human review. Residual risk: verified citation existence does not prove legal applicability. [evidence: `apps/worker/src/agents/researcher.ts`; assumption: liability risk]

Hole 4: The current code may look more complete than it is. Planning marks all phases complete, but `STATE.md` is stale, requirements still contain many unchecked items, and the compliance route appears schema-inconsistent. Mitigation: run launch-readiness tests and reconcile docs before investor presentation. Residual risk: data-room readers distrust the asset if code and soul disagree. [evidence: `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, `apps/api/src/routes/compliance.ts`]

Hole 5: The market is too small as a standalone consumer product. Even 12,000 annual paid submissions at $15 is $180,000 consumer revenue before any organization expansion. Mitigation: treat consumer flow as proof/data wedge and decide whether to expand to organizations/API or keep as research asset. Residual risk: operator confirms it should not be pitched as a business. [assumption: market-size model; registry note]

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
| --- | --- | --- | --- |
| Users will pay after preview | Prior plan assumes willingness-to-pay gate | [assumption: no paid demand evidence found] | Track preview-to-paid conversion; pass if >=3% by 2026-08-31 |
| $15 blended AOV is plausible | Implemented pricing tiers are $5/$15/$25 | [evidence: `apps/api/src/routes/payments.ts`; assumption: mix] | Compare actual checkout mix after 100 previews |
| Email delivery can work | Code has Postmark worker and bounce checks | [evidence: `apps/worker/src/agents/delivery.ts`; assumption: inbox placement] | Measure .gov inbox placement; pass if >=85% |
| Citation quality can be controlled | Researcher strips unverified citations | [evidence: `apps/worker/src/agents/researcher.ts`] | Audit 50 generated letters for citation relevance and accuracy |
| Local official data can be covered | Planning names Cicero/BallotReady evaluation | [assumption: provider coverage not validated in repo] | Compare 100 ZIP lookups against known official directories |
| CivicState should use WrkPlug later | Portfolio shared-rail idea | [assumption: WrkPlug Phase 0 not yet signed] | Operator decision on chassis boundary by 2026-09-30 |
| The asset is not near-term investible | Registry note says watchlist/personal research | [evidence: dispatch registry notes] | Operator confirms whether to pitch, archive, or run validation |

## Evidence Sources

Primary workspace source links for the data-room reader:

- [Project planning](https://github.com/RPLogic-Inc/brookss-history/blob/main/.planning/PROJECT.md) [evidence: local `.planning/PROJECT.md` read in workspace]
- [Implemented payment tiers](https://github.com/RPLogic-Inc/brookss-history/blob/main/apps/api/src/routes/payments.ts) [evidence: local `apps/api/src/routes/payments.ts` read in workspace]
- [Prisma data model](https://github.com/RPLogic-Inc/brookss-history/blob/main/packages/shared/prisma/schema.prisma) [evidence: local `packages/shared/prisma/schema.prisma` read in workspace]
- [Researcher citation controls](https://github.com/RPLogic-Inc/brookss-history/blob/main/apps/worker/src/agents/researcher.ts) [evidence: local `apps/worker/src/agents/researcher.ts` read in workspace]

## Self-Valuation

Score: 42/100 as of 2026-06-23. [assumption: EIR scoring judgment based on code reality, stale docs, and no market validation]

Base 12-month value band: $50,000 to $250,000 under the $5M-per-business program assumption. [assumption: small validated asset with code but no revenue]

Bull 12-month value band: $750,000 to $1,500,000 if paid conversion exceeds 5%, deliverability exceeds 90%, and organization pilots produce $50,000+ ARR. [assumption: upside validation model]

Bear 12-month value band: $0 to $25,000 if the operator confirms this is only a personal/research asset or if paid conversion/deliverability fail. [assumption: downside model and registry note]

Comparables used for method: Resistbot as a free civic-action substitute, Quorum/FiscalNote/VoterVoice as organization advocacy suites, generic AI assistants as drafting substitutes, and small legal-tech/civic-tech workflow tools as category analogs. [assumption: model-knowledge comparables; no external research in workspace-only mode]

Method: value is not a revenue multiple yet; it is a probability-weighted option value on code completeness, validation gates, data compounding, and possible wrk.vc shared-rail leverage. [assumption: valuation method]

## Milestones

- 2026-07-15: reconcile launch-readiness reality by testing submission, officials lookup, research, draft, payment, webhook, delivery, dashboard, admin, and compliance export flows end-to-end. [assumption: buildable verification milestone]
- 2026-07-31: run 25 concierge or beta submissions and record preview-to-paid intent, moderation rate, citation failure rate, and official lookup coverage. [assumption: validation milestone]
- 2026-08-31: prove or kill paid self-serve with >=3% preview-to-paid conversion, >=85% .gov inbox placement, and no unresolved compliance-export schema defect. [assumption: old validation gates plus code-risk finding]
- 2026-09-30: operator decision: pitch as a wrk.vc business, keep as personal/research infrastructure, or pivot to organization/API wedge. [assumption: registry sensitivity requires operator confirmation]

## Surprise Spikes

- Product identity mismatch: the fleet project is brooks-history, but the repo, package, and planning docs describe CivicState. [evidence: `.wrkdog-run/env-boundary.json`, `package.json`, `.planning/PROJECT.md`]
- Planning status mismatch: `.planning/ROADMAP.md` marks all four phases complete, while `.planning/STATE.md` still says Phase 1 complete and `.planning/REQUIREMENTS.md` shows many unchecked requirements. [evidence: `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`]
- Registry posture mismatch: the dispatch note says watchlist/personal/research asset and not near-term investible BOS, so the plan must not pitch CivicState as investible until the operator confirms commercial intent. [evidence: dispatch registry notes]
- Compliance implementation risk: the compliance export route appears to select `tier`, `body`, and `deliveredAt`, while the schema uses `pricingTier`, `content`, and delivery records. [evidence: `apps/api/src/routes/compliance.ts`, `packages/shared/prisma/schema.prisma`]
