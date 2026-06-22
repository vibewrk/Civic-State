# CivicState / brooks-history Business Plan

## Snapshot

As of 2026-06-22 [evidence: dispatch current_date], the repository dispatched as `brooks-history` contains a CivicState application: a civic-tech platform that turns a resident's issue, desired outcome, and ZIP code into citation-backed letters for government officials. The repo evidence is application code, not market proof: Next.js, Express, Prisma, BullMQ worker agents, Stripe checkout, Postmark webhooks, compliance routes, and tests are present [evidence: [package.json](package.json), [Prisma schema](packages/shared/prisma/schema.prisma), [payment route](apps/api/src/routes/payments.ts), [webhook route](apps/api/src/routes/webhooks.ts)].

Investment stance: watchlist, not near-term investible, because the registry note says "personal/research asset" and asks the operator to confirm whether this should pitch as a business [evidence: dispatch registry note]. Revenue evidenced in the repo is $0 [evidence: [.planning/existing-state.md](.planning/existing-state.md)]. The business should be treated as a buildable thesis with open validation gates, not a validated company.

## Current Thesis

CivicState can be a paid workflow layer for ordinary United States residents who want to contact the right public officials but do not want to do the research, drafting, citation checking, and routing themselves. The paid product is a one-time civic letter campaign priced at $5, $15, or $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. The wedge is narrower than "civic participation": it is the moment when a resident has a concrete, local or policy-specific complaint and values completion more than DIY control [assumption: EIR interpretation of repo product flow].

The thesis is current only if users pay before delivery, official lookup coverage is good enough, citation quality avoids hallucination, and government email delivery works [assumption: EIR validation framing]. The planning file names validation gates of >=3% paid conversion, >=85% government-inbox placement, >=95% federal/state official coverage, and >=60% local official coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. None of those gates is proven by production data in this workspace [evidence: no production dataset or analytics export found in repo files].

## Product Reality

What is real: the monorepo declares `civicstate`, with web, API, worker, and shared packages [evidence: [package.json](package.json)]. The API validates submissions, moderates content, writes audit logs with HMAC, and enqueues classifier jobs [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)]. The database schema includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. The home page markets AI research, verified citations, one-click delivery, and $5 - $25 pricing [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx)].

What is not yet proven: live demand, live payment conversion, live deliverability, legal-citation accuracy at production scale, official response rates, and operator workload. The older planning audit dated 2026-04-25 [evidence: [.planning/existing-state.md](.planning/existing-state.md)] is stale because it says zero application source exists, while the current tree contains application source [evidence: [apps](apps), [packages](packages)].

## Customer Definition

The primary customer is a United States resident with a specific civic issue, a desired outcome, a valid ZIP code, and enough urgency to pay for a completed letter workflow instead of researching the issue manually [assumption: derived from repo product copy and submission schema]. The product should not target businesses, legal claimants, or groups seeking regulated lobbying services until the operator validates policy, legal, and compliance boundaries [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

The user is not "everyone frustrated with government." The initial customer is likely a resident with a time-sensitive local friction point: housing, public works, zoning, school policy, agency enforcement, or a benefits/process issue [assumption: use-case segmentation from product thesis, not external research]. A narrower beta should recruit residents already attempting to contact an official, because willingness to pay is otherwise speculative [assumption: EIR go-to-market judgment].

## Market Sizing

No external market research was available in this workspace-only run; external market claims are therefore assumptions, not evidence. The useful sizing method is bottom-up from paid submissions, because the product is transactional and the repo already fixes tier pricing.

| Scenario | Monthly paid submissions | Blended average selling price | Monthly revenue | Annual revenue run-rate | Honesty label |
|---|---:|---:|---:|---:|---|
| Beta proof | 25 | $15 | $375 | $4,500 | [assumption: scenario using repo pricing] |
| Operator side project | 100 | $15 | $1,500 | $18,000 | [assumption: scenario using repo pricing] |
| Small business | 400 | $15 | $6,000 | $72,000 | [assumption: scenario using repo pricing] |
| Venture-relevant seed | 2,500 | $15 | $37,500 | $450,000 | [assumption: scenario using repo pricing] |
| National niche | 10,000 | $15 | $150,000 | $1,800,000 | [assumption: scenario using repo pricing] |

This is not a TAM claim. It is a diligence ladder: if the product cannot reach the beta proof scenario, the rest of the market conversation is premature [assumption: EIR judgment].

## Revenue Model And Unit Economics

Revenue is one-time checkout for letter delivery: single official at $5, three officials at $15, and all matched officials at $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. The planning target is a 40% net margin floor after fees [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Payment tests encode cost estimates of $0.20, $0.40, and $0.60 per tier and assert >90% tier margin before full operating costs [evidence: [tests/payment.test.ts](tests/payment.test.ts)].

| Monthly paid submissions | Revenue formula | Revenue | Variable cost formula | Variable cost | Gross profit | Gross margin |
|---:|---|---:|---|---:|---:|---:|
| 25 | 25 x $15 | $375 | 25 x $0.60 | $15 | $360 | 96% |
| 100 | 100 x $15 | $1,500 | 100 x $0.60 | $60 | $1,440 | 96% |
| 400 | 400 x $15 | $6,000 | 400 x $0.60 | $240 | $5,760 | 96% |

Every figure in the table is [assumption: scenario model using repo pricing and test cost estimates], except the tier prices and test cost estimates, which are [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [tests/payment.test.ts](tests/payment.test.ts)]. The model reconciles internally as paid submissions multiplied by blended selling price equals revenue.

Fixed operating costs are not proven. Planning references a DigitalOcean backend at about $96 per month, a $1,500 Mercury reserve, a $2,000 warning balance, a $500 emergency balance, a max burn of $132.50 per month, and break-even around $340 MRR [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md)]. Treat these as planning figures until vendor bills and live usage exist.

## Go To Market

The repo's original go-to-market bet is organic search and public campaign pages, but public campaign publishing is not evidenced as shipped in the current schema or app surface [evidence: [.planning/GENESIS.md](.planning/GENESIS.md), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. The practical go-to-market should begin with concierge beta recruitment rather than SEO scale [assumption: EIR recommendation given no traffic evidence].

Initial channels should be operator-led: local civic forums, neighborhood groups, tenant associations, school-parent networks, and issue-specific communities [assumption: channel hypothesis]. The goal is not volume first; it is to validate the paid handoff, official lookup coverage, citation trust, and delivery performance. The first launch metric should be paid submissions per month, with delivery success and official replies tracked as secondary metrics [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].

## Competition

Named competitors and substitutes:

- Resistbot: closest consumer civic-contact substitute named by the repo; the plan claims it lacks CivicState's research/citation layer [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Quorum and VoterVoice: enterprise advocacy platforms named by the repo as organization-focused rather than individual transactional products [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Direct manual workflow: a resident uses search, public official directories, and email manually [assumption: obvious substitute category].
- General AI tools: a resident asks a chatbot to draft a letter, then manually finds officials and sends it [assumption: current software substitute category].
- Local legal or advocacy help: nonprofits, tenant groups, and issue-specific organizations may help users for free or as part of membership [assumption: service substitute category].

The competitive question is not whether CivicState can draft letters. The question is whether it can own trust and routing: verified official contacts, verified citations, delivery status, compliance, and a repeatable outcome loop [assumption: EIR analysis].

## Risks And Anti-Plan

The kill-case is strong: this may be a polished workflow for a task users think they want help with but will not pay for. The repo has no production revenue, no conversion history, no traffic, no measured response rate, and no evidence that officials will treat AI-assisted civic letters as valuable rather than spam [evidence: no production metrics in workspace; [apps/web/app/page.tsx](apps/web/app/page.tsx) shows promise, not traction].

Operational risks are serious. Government deliverability could fail even if Postmark works technically. Citation mistakes could create legal-adjacent harm and brand damage. Moderation could become a high-friction human queue. Stripe or email providers could view political/civic content as elevated risk. Planning already constrains chargebacks to <0.5%, bounce pause above 10%, and compliance deletion within 72 hours [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts)].

Technical risks are visible. The compliance export route selects fields named `tier`, `body`, and `deliveredAt`, while the Prisma models use `pricingTier`, `content`, and delivery timestamps under `Delivery`, not `Letter` [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]. That mismatch suggests the codebase needs end-to-end verification before it is represented as launch-ready.

Anti-plan: do not raise on market size, do not buy paid ads, do not add subscriptions, do not expand to organizations, do not add public campaign SEO pages, and do not automate follow-up until a small beta proves paid conversion, accurate citations, and deliverability [assumption: EIR anti-plan].

## Assumption Ledger

| Assumption | Current basis | Validation test |
|---|---|---|
| Residents will pay at least $5 for one completed civic letter | [assumption: product thesis; price evidenced in route] | Run a concierge beta with paid checkout before delivery |
| A blended $15 average selling price is reachable | [assumption: midpoint of repo pricing tiers] | Track tier mix from real Stripe sessions |
| Variable cost can stay near $0.60 per campaign | [evidence: test estimate, not production measurement] | Log actual LLM, email, and payment costs per campaign |
| Paid conversion can reach >=3% | [evidence: planning validation target] | Instrument preview-to-checkout conversion |
| Government inbox placement can reach >=85% | [evidence: planning validation target] | Seed delivery tests and bounce monitoring by domain |
| Federal/state official coverage can reach >=95% and local coverage can reach >=60% | [evidence: planning validation target] | Compare returned officials against manually verified ZIP samples |
| One operator can manage flagged content | [assumption: planning thesis] | Time-box review queue and measure minutes per flagged submission |

## Evidence Sources And Freshness

Workspace evidence used: dispatch registry note [evidence: prompt], [package.json](package.json), [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts), [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [tests/payment.test.ts](tests/payment.test.ts), [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md), and [.planning/existing-state.md](.planning/existing-state.md).

Freshness note: repo planning docs were last updated on 2026-04-25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/GENESIS.md](.planning/GENESIS.md)], while this EIR upgrade is dated 2026-06-22 [evidence: dispatch current_date]. Adoption authority remains provisional under the operator-ruling note dated 2026-06-12 [evidence: dispatch brief]. Because network access was unavailable, all external market claims are tagged as assumptions rather than evidence.

## Surprise Spikes

- Dispatch identity mismatch: the worker project is `brooks-history`, but the repo is a CivicState civic-letter application [evidence: dispatch project id, [package.json](package.json)].
- Registry sensitivity: the asset is watchlist/personal/research, so the soul should not pretend the operator has approved a venture pitch [evidence: dispatch registry note].
- Planning drift: `.planning/existing-state.md` says zero application source existed, but the current repo contains application source and tests [evidence: [.planning/existing-state.md](.planning/existing-state.md), [apps](apps), [tests](tests)].
- Launch-readiness gap: compliance export appears inconsistent with the Prisma schema [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

## Diligence Verdict

Provisional continue. The buildable asset is real enough to deserve validation, but the business is not VC-grade until the operator resolves the identity mismatch, confirms business intent, and produces live evidence for paid conversion, citation accuracy, deliverability, and compliance behavior. The next roadmap should be validation-first, not feature-expansion-first [assumption: EIR recommendation].
