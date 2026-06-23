# CivicState — Business Plan

## Thesis

By 2026-09-30 [assumption: operator validation milestone], CivicState becomes a credible paid civic-action product only if individual U.S. residents will pay $15 average order value [assumption: derived from the repo's $5/$15/$25 tier plan in MASTER_PLAN.md] for researched, citation-backed constituent letters that reach the correct officials with verified delivery and human-reviewed safety gates.

## Problem & Customer

The core customer is a U.S. resident with a concrete civic issue, a ZIP code, and enough urgency to pay a small transactional fee instead of manually researching agencies, laws, officials, and formal letter conventions. This includes renters, parents, commuters, small business owners, neighborhood organizers, and residents facing service, enforcement, legislation, or budget concerns [assumption: customer segmentation from product scope; no live customer interviews found in workspace].

The painful job is not "write a letter." The painful job is converting frustration into a credible, correctly routed, non-threatening, citation-backed constituent communication without becoming a legal-services customer. Existing repo materials describe the value as AI-powered regulation research, verified citations, automatic official targeting from ZIP, and one-click delivery for $5 to $25 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [.planning/PROJECT.md](.planning/PROJECT.md)].

Current alternatives are manual official lookup, direct email to agencies, Resistbot, Change.org, LegalZoom-style document tools, ChatGPT-assisted drafting, and enterprise advocacy suites such as Quorum or VoterVoice [assumption: external competitor landscape; workspace-only mode, not independently refreshed]. The live repo contains a Next.js frontend, Express API, Prisma schema, Stripe Checkout route, Postmark delivery worker, Clerk auth, admin pages, and BullMQ worker agents [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

## Market

This is a bottom-up validation market, not a fundable top-down civic-tech TAM yet. As of 2026-06-23 [evidence: runner current_date], the repo has $0 revenue [evidence: [.planning/existing-state.md](.planning/existing-state.md)], zero workspace evidence of live traffic [evidence: [.planning/existing-state.md](.planning/existing-state.md)], and no proof of paid conversion [evidence: no revenue or customer files found in root soul/code scan].

| Layer | Method | Annual volume | Price | Revenue |
| --- | --- | ---: | ---: | ---: |
| TAM | U.S. paid civic-letter campaigns addressable through consumer web search and direct issue-intent channels | 1,000,000 campaigns [assumption: bottom-up placeholder requiring market research] | $18 average order value [assumption: blended price from repo tier plan] | $18,000,000 [assumption: arithmetic model] |
| SAM | English-language U.S. residents reachable through issue SEO, civic forums, tenant/parent/neighborhood channels, and launch partnerships | 120,000 campaigns [assumption: reachable share before local-provider depth is proven] | $18 average order value [assumption: blended price from repo tier plan] | $2,160,000 [assumption: arithmetic model] |
| SOM | First proof year after launch with narrow issue categories and manual quality review | 2,400 campaigns [assumption: validation target, not evidence] | $18 average order value [assumption: blended price from repo tier plan] | $43,200 [assumption: arithmetic model] |

The market-sizing method deliberately starts with paid campaign events rather than population. The first market proof is not a market report; it is whether CivicState can acquire at least 100 paying customers [assumption: practical proof threshold] while maintaining 85% inbox placement to government domains [assumption: deliverability gate from .planning/PROJECT.md], 3.0% free-preview-to-paid conversion [assumption: validation gate from .planning/PROJECT.md], and 95% federal/state official coverage [assumption: validation gate from .planning/PROJECT.md].

## Product & Moat

Real today: the repo includes a monorepo with web, API, worker, and shared packages [evidence: [package.json](package.json)]; a Prisma data model for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]; moderation, officials lookup orchestration, payment route, Stripe webhook, Postmark delivery worker, dashboard routes, admin routes, and compliance routes [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].

Not yet proven: live government inbox deliverability, paid conversion, local official data quality, citation accuracy at production scale, legal-risk comfort, and whether citizens will pay instead of using free tools [assumption: absence of workspace evidence is treated as not proven].

The moat hypothesis is operational, not technical magic: verified citation provenance, official contact freshness, bounce/opt-out history, moderation and audit logs, and reusable issue-category research can compound if real usage occurs [assumption: defensibility hypothesis]. The weakest moat risk is that a general AI assistant plus manual official lookup may be "good enough" for many users [assumption: external substitute risk].

## Platform Posture

The current repo builds its own Clerk auth, Stripe payment, Postmark delivery, and internal data model [evidence: [apps/api/src/index.ts](apps/api/src/index.ts), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)]. The wrk.dog platform posture should treat CivicState as a future WrkPlug client, not a platform owner: it should consume shared auth, billing, identity, login, and EAI Layer-Zero rails if WrkPlug Phase Zero is signed [assumption: WrkPlug Phase Zero not yet signed].

Cost consequence: shared rails could reduce duplicated infra and compliance work by replacing separate per-venture login, billing, identity, and operator controls [assumption: shared-rails cost thesis]. Moat consequence: one MCPWrk account and shared proof rails could lower CAC and increase portfolio-level trust if the operator decides CivicState belongs on the wrk.vc portfolio surface [assumption: portfolio distribution thesis].

## Business Model

CivicState is not near-term investible as a standalone BOS as of 2026-06-23 [evidence: registry note in dispatch; runner current_date]. It is a watchlist research asset until operator validation says it should pitch as a business [evidence: registry note in dispatch].

Revenue model: one-time delivery packages at $5, $15, and $25 [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. The base case uses $18 average order value [assumption: blended mix across the repo's tier plan], 92% gross margin per paid campaign [assumption: inherited from MASTER_PLAN.md unit economics, not validated in production], and customer acquisition primarily through SEO and issue-intent content [assumption: GTM hypothesis].

Unit economics per paid campaign:

| Item | Base |
| --- | ---: |
| Average order value | $18.00 [assumption: blended price hypothesis] |
| AI research and drafting cost | $0.75 [assumption: high-side of MASTER_PLAN.md complex package token cost] |
| Email delivery cost | $0.01 [assumption: MASTER_PLAN.md package estimate] |
| Stripe fee | $0.82 [assumption: 2.9% plus $0.30 on $18.00; pricing model] |
| Allocated hosting and monitoring | $0.20 [assumption: launch allocation] |
| Gross profit | $16.22 [assumption: arithmetic model] |
| Gross margin | 90.1% [assumption: arithmetic model] |

## Competition

Resistbot offers free or donation-supported messaging to officials and is the closest civic-action substitute [assumption: external competitor; https://resist.bot/ not accessed in workspace-only mode]. Change.org provides petition distribution, social proof, and media visibility rather than personalized citation-backed delivery [assumption: external competitor; https://www.change.org/ not accessed in workspace-only mode]. Quorum and VoterVoice sell advocacy and public-affairs tooling to organizations rather than individual transactional senders [assumption: external competitor; https://www.quorum.us/ and https://www.votervoice.net/ not accessed in workspace-only mode].

Generic AI assistants are the most dangerous substitute because they can draft letters instantly at low or zero incremental cost to the user [assumption: external substitute risk]. CivicState must win on verified citations, official routing, deliverability tracking, compliance, and completion of the full job rather than "better prose" [assumption: strategic positioning].

## Go-To-Market

The first 100 paying customers [assumption: launch proof threshold] should come from tightly scoped issue-intent wedges, not broad civic-tech branding. Candidate wedges are tenant habitability complaints, local infrastructure safety, school district service issues, municipal permitting/service failures, and state-agency enforcement concerns [assumption: wedge list from product scope].

Launch channels:

- Issue SEO pages created from opt-in public campaign summaries after paid sends, with no publication unless the user opts in [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Partnerships with local newsletters, tenant groups, parent groups, neighborhood associations, and civic educators [assumption: distribution hypothesis].
- Direct testing in one metro area before national expansion so official coverage and deliverability can be measured [assumption: operational validation plan].
- Product-led preview funnel: free issue entry and preview, payment before delivery [evidence: [apps/web/app/submit/page.tsx](apps/web/app/submit/page.tsx), [apps/web/components/wizard/letter-preview.tsx](apps/web/components/wizard/letter-preview.tsx)].

## Financial Model

The financial model is a validation sketch, not an approved forecast. Revenue reconciles as paid campaigns multiplied by average order value.

| Period | Paid campaigns | Average order value | Revenue | Variable cost | Fixed cost | Gross profit / loss |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Year ending 2027-06-30 | 2,400 [assumption: SOM proof target] | $18 [assumption: blended tier model] | $43,200 [assumption: campaigns times AOV] | $4,272 [assumption: $1.78 cost per campaign] | $18,000 [assumption: lean tools, hosting, provider minimums, operator support] | $20,928 [assumption: arithmetic model] |
| Year ending 2028-06-30 | 12,000 [assumption: post-validation expansion] | $19 [assumption: modest mix shift] | $228,000 [assumption: campaigns times AOV] | $22,800 [assumption: 10.0% variable cost ratio] | $72,000 [assumption: part-time ops and support] | $133,200 [assumption: arithmetic model] |
| Year ending 2029-06-30 | 36,000 [assumption: issue SEO plus partnerships] | $20 [assumption: mix shift toward broader sends] | $720,000 [assumption: campaigns times AOV] | $79,200 [assumption: 11.0% variable cost ratio] | $180,000 [assumption: support, compliance, data ops, infra] | $460,800 [assumption: arithmetic model] |

Revenue assumptions:

- Free-preview-to-paid conversion reaches 3.0% [assumption: .planning/PROJECT.md validation gate].
- Average order value starts at $18 [assumption: blended $5/$15/$25 tier mix].
- Organic and partnership channels can produce 2,400 paid campaigns by 2027-06-30 [assumption: SOM proof target].

Cost assumptions:

- Variable cost starts at $1.78 per campaign [assumption: AI, email, Stripe, hosting allocation].
- Fixed cost is $18,000 through 2027-06-30 [assumption: lean operator model, no full-time staff].
- Human review remains below 30 minutes per day [assumption: .planning/PROJECT.md operator constraint].

Sensitivity tests:

- Downside conversion at 1.0% [assumption: weak funnel case] reduces Year ending 2027-06-30 paid campaigns to 800 [assumption: one-third of base] and revenue to $14,400 [assumption: arithmetic model].
- Deliverability below 85% [assumption: .planning/PROJECT.md gate] makes the product non-launchable even if paid conversion works.
- Variable cost doubling to $3.56 per campaign [assumption: model or review escalation] still leaves positive gross margin, but support burden may kill the lean-operator thesis.

## Risks & Anti-Plan

The kill-the-deal case: CivicState is a thin civic-tech idea with a working-looking codebase but no proof that consumers pay, no proof that officials receive or value the emails, and no proof that legal/citation safety is adequate. A partner should not fund this as a venture until the core loop survives real usage [assumption: anti-plan judgment from workspace evidence].

Hole: citizens may not pay for something they can ask a general AI assistant to draft for free. Mitigation: require paid proof that verified citations, correct official routing, and delivery tracking lift willingness to pay. Residual risk: free substitutes may cap ARPU at less than $10 [assumption: price-risk hypothesis].

Hole: government deliverability can fail silently. Mitigation: domain warming, SPF/DKIM/DMARC, bounce thresholds, Postmark webhooks, and per-domain pause rules are in the plan and partial code [evidence: [scripts/setup-dns.md](scripts/setup-dns.md), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)]. Residual risk: inbox placement below 85% [assumption: .planning/PROJECT.md validation gate] kills trust.

Hole: citation-backed civic communication can blur into legal advice or lobbying. Mitigation: disclaimers, AI disclosure, moderation, audit logs, and "not legal advice" positioning are in code and docs [evidence: [apps/worker/src/agents/drafter.ts](apps/worker/src/agents/drafter.ts), [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx)]. Residual risk: a bad letter, fabricated citation, or harmful user submission can create brand or legal exposure [assumption: legal-risk thesis, not legal conclusion].

Hole: official data quality may be poor, especially local coverage. Mitigation: evaluate congress.gov, OpenStates, and Cicero/BallotReady, cache verified contacts, and show coverage confidence [evidence: [apps/api/src/lib/officials/lookup.ts](apps/api/src/lib/officials/lookup.ts), [.planning/PROJECT.md](.planning/PROJECT.md)]. Residual risk: poor local coverage limits use cases and conversion [assumption: data-risk thesis].

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
| --- | --- | --- | --- |
| Users will pay $18 average order value | Repo tier plan blends $5/$15/$25 | [assumption: price hypothesis from MASTER_PLAN.md] | Run paid preview funnel with 100 paid customers [assumption: proof threshold]. |
| Inbox placement must exceed 85% | Existing planning names deliverability as a validation gate | [assumption: .planning/PROJECT.md gate; no live test results] | Seed monitored sends to government domains before public launch. |
| Official coverage must exceed 95% federal/state | Existing planning names coverage as a validation gate | [assumption: .planning/PROJECT.md gate; no live test results] | Compare API results to manual official lookup in selected ZIP samples. |
| Gross margin can exceed 90.0% | MASTER_PLAN.md package economics and local pricing route | [assumption: arithmetic model; no production cost ledger] | Track actual model, email, support, and refund cost per paid campaign. |
| SEO can acquire meaningful demand | Product creates opt-in public campaign summaries | [assumption: distribution hypothesis] | Publish opt-in issue pages and track paid conversion over 90 days [assumption: validation window]. |
| Local official lookup will require a paid provider | Existing planning notes Cicero/BallotReady evaluation | [assumption: .planning/PROJECT.md provider hypothesis] | Complete provider spike and measure coverage/cost. |
| WrkPlug can lower duplicated venture infra | Platform posture from EIR brief | [assumption: WrkPlug Phase Zero not yet signed] | Operator decides whether CivicState should become a WrkPlug client. |

## Self-Valuation

Score: 42 out of 100 [assumption: EIR judgment scale]. CivicState has real product code and a crisp transactional thesis, but it remains a watchlist asset because market proof, legal comfort, deliverability, and paid conversion are absent from the workspace [evidence: registry note in dispatch; [.planning/existing-state.md](.planning/existing-state.md)].

Twelve-month bands under the $5,000,000 per-business program assumption [assumption: wrk.vc portfolio framing from brief]:

| Case | Value band | Method |
| --- | ---: | --- |
| BEAR | $0 to $150,000 [assumption: asset/IP value only] | Codebase plus research plan, no validated revenue. |
| BASE | $250,000 to $750,000 [assumption: early validated micro-SaaS/research asset] | Paid conversion, deliverability, and official coverage proven in one metro. |
| BULL | $1,500,000 to $3,000,000 [assumption: revenue multiple on niche civic workflow] | Repeatable acquisition and strong margins after compliance review. |

Comparables used directionally: Resistbot, Change.org, Quorum, and LegalZoom [assumption: external comparables; workspace-only mode]. What moves the valuation: evidence of paid conversion above 3.0% [assumption: .planning/PROJECT.md gate], deliverability above 85% [assumption: .planning/PROJECT.md gate], refund/chargeback rate below 0.5% [assumption: .planning/PROJECT.md constraint], and repeat purchase or referral behavior [assumption: retention proof].

## Milestones

- 2026-07-15 [assumption: next operator window]: reconcile root soul against implemented code and decide whether CivicState remains a research asset or becomes an active WrkPlug-client candidate.
- 2026-07-31 [assumption: next validation window]: run official coverage tests across selected ZIP codes and document federal, state, and local gaps.
- 2026-08-15 [assumption: next validation window]: complete deliverability warm-up proof with bounce, spam complaint, and inbox-placement reporting.
- 2026-08-31 [assumption: next validation window]: launch a limited paid preview funnel with human review and cap total live sends until safety data is reviewed.
- 2026-09-30 [assumption: thesis deadline]: decide continue, pivot, or archive based on paid conversion, inbox placement, citation QA, and operator burden.

## Surprise Spikes

The dispatch project id is `brooks-history`, while repo evidence names CivicState and package metadata describes a civic advocacy platform [evidence: [package.json](package.json), [.planning/PROJECT.md](.planning/PROJECT.md)]. This mismatch must be resolved before investor publication.

The old planning files claim all roadmap phases are complete [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but the requirements file still marks many user-facing requirements pending [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]. Source code shows meaningful implementation exists [evidence: [apps/api/src/index.ts](apps/api/src/index.ts)], so the honest posture is "implemented skeleton with unproven live loop," not "zero application" and not "fully launched."

Registry context says personal/research asset and not near-term investible BOS unless operator confirms a business pitch [evidence: registry note in dispatch]. This plan therefore does not claim approved investment readiness.
