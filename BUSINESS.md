# CivicState Business Plan

Last updated: 2026-06-19 [evidence: runner context]. Prior core planning artifacts were last updated in 2026-04-25 [evidence: .planning/PROJECT.md] and March 2026 [evidence: MASTER_PLAN.md]. This repo is dispatched as project `brooks-history`, but the actual product in code and planning artifacts is `CivicState` [evidence: CLAUDE.md; apps/web/app/page.tsx; .planning/PROJECT.md].

## Honesty Legend

- `[evidence: ...]` means the statement is observed in this repo, this worker dispatch, or arithmetic directly derived from repo facts.
- `[assumption: ...]` means the statement is a market, customer, conversion, pricing, cost, or strategic claim that has not been externally verified in workspace-only mode.
- Factory, model, or prior AI-generated planning output is evidence only that the repo asserted something, not evidence that a market claim is true.

## Executive Snapshot

CivicState is a transactional civic-letter product: a user describes a government problem, supplies a ZIP code, reviews AI-researched citations and official targets, pays a one-time package price, and CivicState sends professional constituent letters by email [evidence: .planning/PROJECT.md; MASTER_PLAN.md; apps/web/app/submit/page.tsx].

Investment posture: watchlist, not near-term investible. The dispatch registry labels this as a personal/research asset and asks the operator to confirm whether it should pitch as a business [evidence: dispatch registry note]. My EIR ruling is conditional: keep it as an evidence-gathering product until paid demand, official data coverage, and email deliverability are proven.

Current 10-second read: useful civic automation, plausible solo-operator cash-flow product, not yet a venture-scale company [assumption: no live customer, revenue, or market evidence present in workspace].

## Thesis

The narrow thesis is that a specific US resident will pay $5 to $25 per submission [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts] to avoid researching law, identifying officials, writing a formal letter, and managing delivery. The product wins only if the full workflow feels materially better than free manual outreach, Resistbot-style messaging, and petition platforms [assumption: competitor comparison inherited from repo plan and not externally verified].

The venture thesis is weak today. Even if the workflow works, the most likely near-term asset is a durable civic-operations dataset: official contacts, bounce history, verified citation snippets, and campaign outcomes [assumption: data compounding logic from .planning/GENESIS.md, unvalidated]. That can become defensible only after meaningful volume; the moat does not exist at launch [assumption: strategic inference].

## What Is Real Today

- The repo contains a Next.js frontend, Express API, BullMQ worker, Prisma/PostgreSQL schema, Redis-backed job state machine, Clerk auth paths, Stripe checkout route, content moderation, admin routes, citation verification, and agent skeletons [evidence: apps/web; apps/api; apps/worker; packages/shared/prisma/schema.prisma].
- The database model includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- Pricing tiers are implemented as `single` at $5, `three_pack` at $15, and `full_spread` at $25 [evidence: apps/api/src/routes/payments.ts].
- The planning system says Phase Foundation is complete, while the roadmap also marks later phases complete; that conflicts with the requirements file where most product requirements remain pending [evidence: .planning/STATE.md; .planning/ROADMAP.md; .planning/REQUIREMENTS.md].
- There is no evidence in the repo of live revenue, active customers, production traffic, signed partnerships, inbox placement results, or official response rates [evidence: repo inspection].

## Customer Definition

Primary customer: an individual US resident with a specific civic issue who knows what outcome they want but does not know the applicable law, official jurisdiction, or formal letter format [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

The first customer segment should be constrained to issues where email letters are appropriate constituent communication, not legal advice, claim filing, regulatory submission, business lobbying, harassment, or defamation-sensitive allegations [evidence: MASTER_PLAN.md section 5.3; apps/api/src/lib/moderation.ts].

Buyer/user distinction: the same individual is expected to submit, pay, receive delivery confirmation, and track replies [evidence: .planning/REQUIREMENTS.md]. Future HOA, nonprofit, and civic-organization API users are explicitly deferred [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

## Problem

Manual civic outreach is high-friction: identify the correct official, find the right jurisdiction and citations, draft a credible request, send it, and track responses [evidence: .planning/GENESIS.md]. The repo thesis is that many users abandon that process before sending anything [assumption: no user research in workspace].

The acute pain is not "write me a letter." It is "turn a local frustration into a credible, routed, non-inflammatory constituent communication" [assumption: EIR synthesis from code and planning docs].

## Product

Launch scope is intentionally thin:

- Guided submission wizard for issue description, desired outcome, ZIP code, anonymity preference, and preview [evidence: apps/web/app/submit/page.tsx; .planning/REQUIREMENTS.md].
- Official lookup using federal, state, and paid/local-provider sources, with a known unresolved local-provider evaluation [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].
- AI research constrained to sources returned by eCFR, CourtListener, and state cache modules [evidence: apps/worker/src/agents/researcher.ts].
- Citation verification before drafting and human review if all citations fail verification [evidence: apps/worker/src/agents/researcher.ts].
- Letter drafting with AI disclosure, not-legal-advice disclaimer, and CAN-SPAM footer [evidence: apps/worker/src/agents/drafter.ts].
- Stripe payment before delivery and Postmark email delivery in launch scope [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md].

Not launch scope: subscriptions, public comments, voting, co-signing, certified mail, fax, automated follow-ups, native mobile apps, legal filings, or API access [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; MASTER_PLAN.md].

## Revenue Model

Revenue is one-time transactional payment per campaign [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts].

| Package | Price | Delivery Scope | Source |
|---|---:|---|---|
| Single official | $5 [evidence: apps/api/src/routes/payments.ts] | One official [evidence: apps/api/src/routes/payments.ts] | Implemented route |
| Three officials | $15 [evidence: apps/api/src/routes/payments.ts] | Three officials [evidence: apps/api/src/routes/payments.ts] | Implemented route |
| Full spread | $25 [evidence: apps/api/src/routes/payments.ts] | All matched officials [evidence: apps/api/src/routes/payments.ts] | Implemented route |

The master plan also describes a 40% net margin floor [evidence: MASTER_PLAN.md], gross margins around 88% to 92% [assumption: inherited repo model, not verified against live bills], and typical per-job token costs from $0.10 to $0.40 [assumption: inherited repo model, no external price check in workspace-only mode].

Revenue quality concern: this is low-ticket, episodic, and likely issue-driven. Unless repeat behavior or organizational buying emerges, the business may remain a useful tool with modest cash flow rather than a fundable company [assumption: EIR judgment].

## Financial Model

Base arithmetic is built from the repo's implemented prices and inherited cost plan; every forward-looking line remains unvalidated.

| Scenario | Monthly paid submissions | Average order value | Gross revenue | Variable COGS | Fixed operating cost | Net before labor |
|---|---:|---:|---:|---:|---:|---:|
| Break-even test | 25 [assumption: inherited target from MASTER_PLAN.md section 19] | $15 [evidence: apps/api/src/routes/payments.ts] | $375 [assumption: 25 x $15] | $30 [assumption: 25 x $1.20 inherited COGS] | $200 [assumption: inherited fixed-cost model] | $145 [assumption: arithmetic] |
| Early organic | 120 [assumption: inherited Month 6 repo projection, not validated] | $16 [assumption: inherited repo projection] | $1,920 [assumption: 120 x $16] | $144 [assumption: 120 x $1.20 inherited COGS] | $200 [assumption: inherited fixed-cost model] | $1,576 [assumption: arithmetic before labor, refunds, tax, support] |
| Strong niche | 400 [assumption: inherited Month 12 repo projection, not validated] | $18 [assumption: inherited repo projection] | $7,200 [assumption: 400 x $18] | $480 [assumption: 400 x $1.20 inherited COGS] | $200 [assumption: inherited fixed-cost model] | $6,520 [assumption: arithmetic before labor, refunds, tax, support] |

Internal reconciliation: the revenue line is `monthly paid submissions x average order value`; variable COGS uses $1.20 per order [assumption: MASTER_PLAN.md unit economics]; net before labor subtracts variable COGS and fixed operating cost. This is a cash-flow sketch, not GAAP and not a forecast [assumption: EIR model].

Reserve policy: the plan requires a $1,500 Mercury reserve before accepting the first payment [evidence: MASTER_PLAN.md]. Daily token spend is capped at $300 [evidence: MASTER_PLAN.md]. Single-job token cost over $25 escalates to human review [evidence: MASTER_PLAN.md].

## Market Sizing

No external market research was available in workspace-only mode, so this is a bottom-up sizing frame to validate, not a TAM claim.

Beachhead method:

- Start with one metro and one issue cluster where CivicState can verify officials, citations, and email deliverability [assumption: GTM design].
- Assume 10,000 relevant annual search or social-intent visitors in that metro/issue wedge [assumption: placeholder to be replaced by Search Console and keyword data].
- Apply a 3% paid conversion gate because the repo already uses 3% as the willingness-to-pay validation hurdle [evidence: .planning/PROJECT.md].
- That yields 300 paid submissions per year [assumption: 10,000 x 3%].
- At $15 average order value [evidence: apps/api/src/routes/payments.ts], the beachhead is $4,500 annual gross revenue [assumption: 300 x $15].
- Scaling the same wedge across 50 comparable metro/issue combinations yields $225,000 annual gross revenue [assumption: 50 x $4,500].

Conclusion: the currently defensible bottom-up case is too small for a VC outcome unless the product proves repeat usage, organizational channels, higher-ticket compliance-adjacent use cases, or a data/API product [assumption: EIR conclusion].

## Competition

Named alternatives from the repo:

- Resistbot: closest citizen-to-lawmaker messaging substitute, but repo claims it lacks CivicState's research and citation layer [assumption: repo positioning not externally verified].
- Change.org: petition and visibility platform, not a routed, citation-backed paid letter workflow [assumption: repo positioning not externally verified].
- LegalZoom: document-drafting substitute, but not civic-specific constituent routing [assumption: repo positioning not externally verified].
- Quorum and VoterVoice: enterprise advocacy platforms serving organizations, with repo-claimed pricing above $10,000 per year [assumption: .planning/PROJECT.md claim not externally verified].
- Manual outreach: free but time-consuming; competes hard because users can always email officials themselves [assumption: EIR judgment].

The most dangerous competitor is not another startup. It is user inertia plus free manual email [assumption: EIR judgment].

## Go To Market

Do not launch nationally first. The practical GTM is a narrow validation loop:

- Pick one metro, one or two issue categories, and a small set of officials whose contact data can be manually verified before automation [assumption: operational design].
- Recruit 5 to 10 beta users [assumption: inherited soft-launch target from MASTER_PLAN.md] from local civic groups, neighborhood forums, or operator network.
- Measure completion, payment, successful delivery, bounce rate, official response, refund, and support burden before SEO scale-up [assumption: validation design].
- Publish only opt-in read-only campaign pages; no comments, votes, or co-signing [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
- Use SEO only after the first successful paid deliveries, because indexed pages without real outcomes may damage trust [assumption: EIR judgment].

Validation gates from the repo are willingness to pay at or above 3% conversion, inbox placement at or above 85% on government domains, and official data coverage at or above 95% federal/state and 60% local [evidence: .planning/PROJECT.md].

## Risks And Anti-Plan

Partner kill memo:

- This may be a feature, not a company. A low-ticket civic letter generator can be useful and still never become venture scale [assumption: EIR judgment].
- Email deliverability to government domains could kill the product. If officials never see the letters, the value proposition collapses regardless of AI quality [evidence: .planning/PROJECT.md identifies deliverability as hardest problem].
- The legal/compliance boundary is narrow. Users will bring defamation, legal-demand, harassment, private-individual, and business-advocacy cases that require human review [evidence: MASTER_PLAN.md section 5.3; apps/api/src/lib/moderation.ts].
- Citation reliability is existential. A single hallucinated statute in a public campaign can damage trust and increase liability [evidence: apps/worker/src/agents/researcher.ts verification logic].
- Local official data is unresolved. The repo states Google Civic Representatives shut down in April 2025 and that Cicero/BallotReady evaluation is needed [evidence: .planning/PROJECT.md].
- The SEO flywheel may not spin. Public civic issue pages may not rank, may be too thin, or may create moderation exposure before revenue scale [assumption: GTM risk].
- The registry note calls this watchlist and personal/research, not near-term investible [evidence: dispatch registry note].

Anti-plan: do not raise institutional capital, hire a team, build community mechanics, add certified mail, or expand issue coverage until paid delivery works in one constrained wedge [assumption: EIR recommendation].

## Assumption Ledger

| Assumption | Why It Matters | Current Basis | Test |
|---|---|---|---|
| Citizens will pay $5 to $25 for this job | Core revenue | Pricing exists in code [evidence: apps/api/src/routes/payments.ts] but demand is unproven | Run beta checkout with real payment |
| 3% conversion is achievable | Break-even and SEO economics | Repo validation gate [evidence: .planning/PROJECT.md] | Track visits to paid completions |
| Government inbox placement can reach 85% | Delivery value | Repo validation gate [evidence: .planning/PROJECT.md] | Seed deliverability tests by domain |
| Local official coverage can reach 60% | Product completeness | Repo validation gate [evidence: .planning/PROJECT.md] | Compare provider results against manual official list |
| Average order value can exceed $15 | Unit economics | Implemented tiers [evidence: apps/api/src/routes/payments.ts] | Observe package mix |
| Variable COGS stays near $1.20 | Margin | Inherited unit model [assumption: MASTER_PLAN.md] | Compare actual Stripe, AI, email, hosting allocation |
| One operator can handle review load | Margin and safety | Repo design [evidence: MASTER_PLAN.md] | Measure flagged queue volume and review minutes |

## Validation Plan

Minimum proof sequence:

- By 2026-07-15 [assumption: operator-chosen target], complete local-official provider spike and document coverage by ZIP.
- By 2026-07-31 [assumption: operator-chosen target], run end-to-end test from submission to verified citation to draft to Stripe to Postmark with a real operator-controlled account.
- By 2026-08-15 [assumption: operator-chosen target], complete 5 paid beta submissions [assumption: soft-launch design] and record conversion, delivery, bounce, refund, and support load.
- By 2026-09-01 [assumption: operator-chosen target], decide whether to keep as personal tool, run more beta, or pitch as a business.

## Surprise Spikes

- Project identity mismatch: dispatch says `brooks-history`, but every repo artifact points to CivicState [evidence: dispatch; repo inspection].
- The registry says personal/research watchlist, while older docs use venture-style language [evidence: dispatch registry note; MASTER_PLAN.md].
- Planning state conflicts: `.planning/ROADMAP.md` marks all phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/STATE.md` says Phase Foundation is the current focus on 2026-04-25 [evidence: .planning/STATE.md].
- Some older architecture language still references dynamic pricing and publisher agents, while `.planning/PROJECT.md` defers those to later phases [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

## Evidence Sources

- Dispatch registry note: watchlist, personal/research asset, thin soul of 3168b [evidence: dispatch registry note].
- `MASTER_PLAN.md`: original product, pricing, operating model, revenue scenarios, risks, and exclusions [evidence: MASTER_PLAN.md].
- `.planning/PROJECT.md`: current requirements, validation gates, constraints, unresolved provider risks, and market verdict [evidence: .planning/PROJECT.md].
- `.planning/REQUIREMENTS.md`: pending versus complete build requirements [evidence: .planning/REQUIREMENTS.md].
- `.planning/ROADMAP.md` and `.planning/STATE.md`: planning-state conflict and completion claims [evidence: .planning/ROADMAP.md; .planning/STATE.md].
- `apps/api`, `apps/worker`, `apps/web`, and `packages/shared/prisma/schema.prisma`: actual implemented product surface [evidence: repo source inspection].

## Freshness And Diligence Limits

No network research was used because the worker was instructed to run workspace-only. All external market, pricing, competitor, and legal-environment claims therefore remain assumptions unless they are direct repo-state facts [evidence: user brief].

Freshness risk is meaningful: key market facts and API availability may have changed after 2026-04-25 [assumption: temporal risk], and vendor pricing may have changed after March 2026 [assumption: temporal risk]. The next diligence pass should refresh vendor pricing, competitor positioning, legal disclosure obligations, official-data APIs, and email deliverability constraints before any investor-facing use [assumption: EIR recommendation].
