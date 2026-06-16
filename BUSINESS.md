# CivicState - Business Plan

Document date: 2026-06-16 [assumption: current worker runtime date]. Evidence freshness: workspace-only review on 2026-06-16 [assumption: current worker runtime date]; principal repo planning sources were dated 2026-04-25 [evidence: .planning/PROJECT.md] and 2026-04-25 [evidence: .planning/GENESIS.md]. Network research was unavailable by dispatch instruction, so every external market claim below is marked as an assumption.

## Thesis

CivicState can become a narrow, paid civic-action utility if it proves that ordinary US residents will pay $5 [evidence: apps/api/src/routes/payments.ts], $15 [evidence: apps/api/src/routes/payments.ts], or $25 [evidence: apps/api/src/routes/payments.ts] to convert a civic concern into a researched, citation-backed, correctly routed constituent letter, but the repo is not yet a near-term investible business because it has no workspace evidence of users, paid submissions, deliverability, or conversion.

## Problem & Customer

The repo defines CivicState as a web platform that turns civic concerns into researched letters delivered to the correct government officials [evidence: .planning/PROJECT.md]. The launch customer is a US resident with a specific local, state, or federal civic problem who is willing to pay for research, drafting, routing, and delivery rather than manually identify jurisdiction, find legal authority, draft the letter, and locate official contact channels [evidence: .planning/GENESIS.md].

The most likely initial customer segments are renters, parents, neighborhood advocates, small business owners, and residents dealing with municipal services or enforcement failures [assumption: civic-use-case inference from repo examples and common constituent-service categories]. The customer is individual and transactional, not an enterprise advocacy department; enterprise API access is deferred [evidence: .planning/PROJECT.md].

Current alternatives are manual email or webform submission to officials, free advocacy bots such as Resistbot [assumption: category knowledge, network disabled], nonprofit campaign tools such as Action Network [assumption: category knowledge, network disabled], and enterprise advocacy suites such as Quorum or VoterVoice [assumption: category knowledge, network disabled]. CivicState's intended wedge is not "send a message"; it is "research the authority, verify citations, draft the letter, and route delivery" [evidence: MASTER_PLAN.md].

## Market

This is a bottom-up directional market model, not validated market research. It uses explicit assumptions because network research is unavailable.

| Market layer | Method | Annual size |
| --- | --- | --- |
| TAM | 250,000,000 US adults with internet access [assumption: rounded public-demographic memory, not workspace evidence] x 2% annual paid civic-letter intent [assumption: EIR placeholder until survey data] x $15 average order value [evidence: apps/api/src/routes/payments.ts] | $75,000,000 [assumption: 250,000,000 x 2% x $15] |
| SAM | 50,000,000 civically engaged online residents [assumption: narrowed reachable audience placeholder] x 1% annual paid intent [assumption: lower-intent launch filter] x $15 average order value [evidence: apps/api/src/routes/payments.ts] | $7,500,000 [assumption: 50,000,000 x 1% x $15] |
| SOM | 10,000 paid submissions per year [assumption: stretch target after operational proof] x $15 average order value [evidence: apps/api/src/routes/payments.ts] | $150,000 [assumption: 10,000 x $15] |

The addressable market is therefore probably modest unless the product expands into recurring organization workflows, coalition pages, API access, or other retained use cases [assumption: EIR judgment]. That matches the registry sensitivity: this should be treated as a watchlist personal/research asset until operator validation says otherwise [evidence: dispatch registry note].

## Product & Moat

What is real in the repo as of 2026-06-16 [assumption: current worker runtime date]: a monorepo with Next.js app, Express API, worker agents, Prisma schema, Stripe checkout route, Postmark delivery route, admin review routes, citation verifier tests, and delivery/payment tests [evidence: apps/; packages/shared/prisma/schema.prisma; tests/payment.test.ts; tests/citation-verifier.test.ts; tests/delivery.test.ts].

The implemented product surface includes pricing tiers of $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts], job queues via BullMQ [evidence: apps/api/src/index.ts], official lookup clients for Congress, OpenStates, and Cicero [evidence: apps/api/src/lib/officials/], legal-source integration scaffolding for eCFR, CourtListener, and state cache [evidence: apps/worker/src/lib/legal/], and content moderation/admin review [evidence: apps/api/src/lib/moderation.ts; apps/api/src/routes/admin.ts].

What is not evidenced: production deployment, real official coverage, successful government inbox placement, paid customer demand, recurring acquisition, response rates, or legal/compliance review by counsel [evidence: no repo data files or production metrics found during workspace review].

The moat is weak today. Potential future moat comes from verified official contact data, deliverability history, citation reuse, and opt-in public campaign pages [evidence: .planning/GENESIS.md]. That moat only starts compounding after meaningful volume; at 0 paid submissions [evidence: no payment/revenue data found in workspace], it is still theoretical.

## Platform Posture

CivicState should be positioned as a WrkPlug client, not as a company that rebuilds auth, billing, identity, or login rails [assumption: dispatch instruction referencing WrkPlug posture and D-032, not evidenced in repo]. If WrkPlug Phase Zero is signed [assumption: not evidenced in workspace], CivicState should consume shared login through the MCPWrk account, shared billing, and EAI Layer Zero behind the contract rather than owning those rails.

The business consequence would be lower infrastructure burden and lower customer-acquisition friction because identity, billing, and operator workflows compound across shared rails [assumption: EIR interpretation of WrkPlug posture]. The current repo still contains Clerk, Stripe, and direct app-specific flows [evidence: apps/api/src/routes/payments.ts; apps/web/app/layout.tsx], so this is a future platform posture, not current implementation.

## Business Model

The current revenue model is one-time transaction pricing: single official at $5 [evidence: apps/api/src/routes/payments.ts], three officials at $15 [evidence: apps/api/src/routes/payments.ts], and full spread at $25 [evidence: apps/api/src/routes/payments.ts]. The repo planning documents also set a 40% net margin floor [evidence: .planning/PROJECT.md], while tests assert pricing margins above 90% against internal cost estimates [evidence: tests/payment.test.ts].

Internal cost estimates in worker treasury code are $0.20 for single, $0.40 for three-pack, and $0.60 for full-spread [evidence: apps/worker/src/lib/treasury.ts]. These are engineering cost estimates, not audited production costs. Stripe fees, support time, refunds, chargebacks, legal review, Postmark account health, and data maintenance may dominate actual cost [assumption: EIR operating-cost judgment].

Likely future revenue lines are organization dashboards, batch tools for local nonprofits, and API access [assumption: extension from MASTER_PLAN.md deferred enterprise API], but none should be pitched until the individual transaction loop works in production.

## Competition

Resistbot is the closest free substitute for user intent capture and routed civic messages [assumption: category knowledge, network disabled]. Its weakness relative to CivicState is the repo's planned research and verified citation layer [evidence: .planning/PROJECT.md].

Quorum, VoterVoice, FiscalNote, and Phone2Action-style advocacy suites serve organizations with advocacy CRM, list management, legislative tracking, and campaign tools [assumption: category knowledge, network disabled]. CivicState is weaker on enterprise workflow and stronger only if individual paid research/drafting proves useful.

Manual constituent services, official webforms, city help lines, and direct email remain the dominant substitute [assumption: civic workflow inference]. They are free in dollars but costly in time and expertise.

Legal self-help sites and general-purpose AI chatbots can draft letters [assumption: category knowledge, network disabled]. CivicState's differentiation must be verified citations, official targeting, payment-gated delivery, moderation, and auditability [evidence: apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/api/src/routes/webhooks.ts].

## Go-To-Market

The first wedge should be narrow and proof-oriented: launch in one state or city category [assumption: EIR recommendation] and measure whether users pay after preview. The first one hundred customers should come from founder-led distribution in local forums, neighborhood groups, civic newsletters, tenant/renter communities, and direct outreach to issue-specific communities [assumption: network-disabled GTM hypothesis].

Search can become a secondary channel if opt-in public campaign pages exist, but public pages are not enough by themselves because the repo has no evidence of domain authority or traffic [evidence: no traffic analytics or production metrics found in workspace]. Paid acquisition should remain off until conversion, refund, and deliverability data are measured [assumption: EIR capital discipline].

The critical launch funnel is: unpaid issue form, official match, research preview, letter preview, $5 or $15 checkout, delivery status, reply capture [evidence: .planning/PROJECT.md; apps/web/components/wizard/letter-preview.tsx; apps/api/src/routes/payments.ts]. The one metric that matters before scale is paid conversion from preview to checkout.

## Financial Model

This model is intentionally conservative and internally reconciles revenue as paid submissions x average order value. It is not a forecast; it is the validation budget implied by the repo.

| Year | Paid submissions | Average order value | Revenue | Direct COGS | Gross profit | Operating cost | Operating result |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Launch year | 600 [assumption: validation scenario] | $15 [evidence: apps/api/src/routes/payments.ts] | $9,000 [assumption: 600 x $15] | $360 [assumption: 600 x $0.60 stress cost] | $8,640 [assumption: $9,000 - $360] | $18,000 [assumption: low-cash operator/legal/tools budget] | -$9,360 [assumption: $8,640 - $18,000] |
| Expansion year | 2,400 [assumption: repeatable niche GTM scenario] | $15 [evidence: apps/api/src/routes/payments.ts] | $36,000 [assumption: 2,400 x $15] | $1,440 [assumption: 2,400 x $0.60 stress cost] | $34,560 [assumption: $36,000 - $1,440] | $36,000 [assumption: tooling, support, compliance, part-time ops] | -$1,440 [assumption: $34,560 - $36,000] |
| Scale test year | 7,200 [assumption: niche product working but not venture scale] | $15 [evidence: apps/api/src/routes/payments.ts] | $108,000 [assumption: 7,200 x $15] | $4,320 [assumption: 7,200 x $0.60 stress cost] | $103,680 [assumption: $108,000 - $4,320] | $72,000 [assumption: operator plus vendor/legal overhead] | $31,680 [assumption: $103,680 - $72,000] |

Revenue assumptions: average order value is $15 [evidence: apps/api/src/routes/payments.ts]; launch paid submissions are 600 [assumption: validation scenario]; expansion paid submissions are 2,400 [assumption: repeatable niche GTM scenario]; scale-test paid submissions are 7,200 [assumption: niche product working but not venture scale].

Cost assumptions: direct COGS uses $0.60 per submission [evidence: apps/worker/src/lib/treasury.ts] as the highest internal tier estimate; operating cost starts at $18,000 [assumption: tools, compliance, and manual operator time]; later operating cost reaches $72,000 [assumption: heavier support, data QA, compliance, and vendor spend].

Sensitivity tests: if paid conversion is below 3% [evidence: .planning/PROJECT.md], pause scale and run customer interviews; if government inbox placement is below 85% [evidence: .planning/PROJECT.md], stop taking payment for affected domains; if chargebacks exceed 0.5% [evidence: .planning/PROJECT.md], narrow use cases and revise refund policy; if actual direct COGS exceeds $3.00 per submission [assumption: cost shock test], the $5 tier becomes fragile.

## Risks & Anti-Plan

The strongest anti-plan is simple: people may not pay for civic letters. Free alternatives exist, civic intent is sporadic, and the product may convert outrage into a preview but not into checkout. Mitigation is a paid beta with real checkout and no vanity waitlist. Residual risk remains high until paid conversion is observed.

Government deliverability may kill the model. Official inboxes can filter automated civic email, and a small sender reputation problem could make "delivery" a promise the product cannot keep [assumption: deliverability risk inference]. The repo mitigates with Postmark, SPF/DKIM/DMARC setup, bounce tracking, and a 10% domain bounce pause [evidence: scripts/setup-dns.md; apps/worker/src/agents/delivery.ts], but residual risk remains high until inbox placement is measured.

Citation and legal-adjacent risk is existential. If the AI fabricates authority or drafts threatening legal language, the product loses trust and may create legal exposure. The repo mitigates with citation verification, unverified citation stripping, moderation, disclaimers, and human review flags [evidence: apps/worker/src/agents/researcher.ts; apps/api/src/lib/moderation.ts; apps/web/app/terms/page.tsx]. Residual risk remains material because legal review is not evidenced.

Official data coverage may be too poor for local issues. The repo has clients and caches, but coverage confidence and local provider economics are unproven [evidence: apps/api/src/lib/officials/; .planning/PROJECT.md]. If local targeting fails, the product is reduced to a generic letter writer.

The repo identity may be wrong for the registry. Dispatch identifies project `brooks-history`, while repo evidence overwhelmingly describes CivicState [evidence: dispatch context; package.json; .planning/PROJECT.md]. Until operator confirmation, wrk.vc should not pitch this as a clean business asset.

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
| --- | --- | --- | --- |
| Customers will pay $5 to $25 for routed civic letters | Pricing exists in code | $5, $15, $25 [evidence: apps/api/src/routes/payments.ts] | Run paid beta and measure preview-to-checkout conversion |
| Paid conversion must clear 3% | Planning gate | 3% [evidence: .planning/PROJECT.md] | Instrument wizard funnel |
| Email deliverability must clear 85% | Planning gate | 85% [evidence: .planning/PROJECT.md] | Send seeded test letters and monitor delivered/bounced status |
| SOM of $150,000 is plausible only after 10,000 paid submissions | Bottom-up scenario | $150,000 and 10,000 [assumption: EIR scenario] | Track monthly paid submissions and retention/repeat behavior |
| Direct COGS can stay under $0.60 per job | Treasury estimate | $0.60 [evidence: apps/worker/src/lib/treasury.ts] | Compare ledger API costs to estimates |
| WrkPlug can reduce duplicated auth/billing overhead | Dispatch platform posture | [assumption: WrkPlug Phase Zero not signed in workspace] | Operator confirms platform contract and migration path |

## Self-Valuation

Current score: 2 out of 10 [assumption: EIR judgment] as a venture-grade business, because implementation exists but demand, revenue, deliverability, and identity are unvalidated. Under the $5,000,000-per-business program assumption [assumption: dispatch program framing], the current base case should be watchlist, not investible.

Bear band: $0 to $50,000 [assumption: code/research asset only, no paid demand]. Base band: $150,000 to $400,000 [assumption: usable niche tool with limited revenue]. Bull band: $1,000,000 to $2,500,000 [assumption: repeatable paid conversion, official coverage, and deliverability with credible compliance]. Moving above that requires sustained revenue, repeat usage, and a defensible data asset [assumption: EIR valuation method].

Comparables used directionally: Resistbot as free civic routing substitute [assumption: category knowledge], Quorum/VoterVoice as enterprise advocacy tooling [assumption: category knowledge], and general AI writing assistants as horizontal draft substitutes [assumption: category knowledge]. These are positioning references, not transaction comps.

## Milestones

By 2026-07-15 [assumption: operator schedule], confirm whether this repo should be pitched as CivicState or whether the brooks-history registry mapping is wrong.

By 2026-07-31 [assumption: operator schedule], run an end-to-end local or staging payment/delivery rehearsal with $5 test checkout [evidence: apps/api/src/routes/payments.ts] and Postmark webhook capture [evidence: apps/api/src/routes/webhooks.ts].

By 2026-08-31 [assumption: operator schedule], complete a paid beta with at least 100 preview sessions [assumption: minimum funnel sample] and report preview-to-checkout conversion against the 3% gate [evidence: .planning/PROJECT.md].

By 2026-09-30 [assumption: operator schedule], prove at least 85% government inbox placement [evidence: .planning/PROJECT.md] or pause outbound delivery claims.

By 2026-12-31 [assumption: operator schedule], decide one of three paths: shut down, keep as personal/research asset, or fund a narrow civic-letter beta based on paid conversion, deliverability, refunds, and legal review.

## Surprise Spikes

The biggest spike is identity mismatch: the dispatch says project `brooks-history` and repo `RPLogic-Inc/brookss-history`, while the checked-out repository describes CivicState throughout package metadata, planning files, source paths, and UI text [evidence: dispatch context; package.json; .planning/PROJECT.md; apps/web/app/layout.tsx].

The second spike is planning drift: `.planning/existing-state.md` says there is zero application code [evidence: .planning/existing-state.md], but the current tree contains a substantial application monorepo [evidence: apps/; packages/shared/]. That stale file should not be used as the current build state.

The third spike is investibility posture: prior planning language has strong margin and market-confidence claims [evidence: .planning/PROJECT.md], but the registry labels this a watchlist personal/research asset and not near-term investible [evidence: dispatch registry note]. The upgraded soul resolves the conflict by treating CivicState as a validation candidate, not an investible company.

## Evidence Sources

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence]
- [.planning/GENESIS.md](.planning/GENESIS.md) [evidence]
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) [evidence]
- [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence]
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence]
- [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts) [evidence]
- [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts) [evidence]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence]
