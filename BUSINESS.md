# CivicState Business Plan

## Thesis Current

As of 2026-06-21 [evidence: dispatch current_date], this repository is best understood as CivicState: an AI-assisted civic communication product that turns a resident's issue, desired outcome, and ZIP code into researched, citation-backed letters to government officials, then sells one-time delivery packages priced from $5 to $25 [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

The investible thesis is conditional, not proven: CivicState can become a small, profitable civic-tech wedge if users will pay for the avoided work of researching jurisdiction, finding officials, drafting professionally, and sending letters. It is not currently a venture-scale company on evidence alone because the repo contains build artifacts and planning documents, but no customer traction, conversion cohort, live deliverability data, or paid usage history [evidence: .planning/REQUIREMENTS.md; .planning/STATE.md].

## Honesty Labels

Evidence means local repository or dispatch facts only. Assumption means an external market, behavior, pricing, conversion, or benchmark claim that could not be researched in this workspace-only run. Factory/AI output is not treated as market evidence.

Primary evidence reviewed: [MASTER_PLAN.md](MASTER_PLAN.md), [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md), [.planning/GENESIS.md](.planning/GENESIS.md), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), and app route/worker files under `apps/` [evidence: repo scan].

## Surprise Spikes

The registry says this is a watchlisted personal/research asset and "not near-term investible BOS" [evidence: dispatch registry notes]. The repo itself is not a history notebook; it is a monetized CivicState civic-letter platform with Stripe, Postmark, Clerk, Prisma, BullMQ worker agents, treasury, admin, privacy, and terms surfaces [evidence: package.json; apps/api/src/routes; apps/web/app; apps/worker/src].

The planning state is internally inconsistent. `.planning/STATE.md` says only Foundation is complete and the current focus is Phase Foundation as of 2026-04-25 [evidence: .planning/STATE.md]. `.planning/ROADMAP.md` says all planned phases are complete on 2026-04-25 [evidence: .planning/ROADMAP.md]. This plan treats the codebase as built-but-unvalidated, not commercially proven.

The original master plan contains specific external claims about API availability, legal transparency requirements, processor risk, and deliverability. Because this run has no network, those remain assumptions unless backed by repo implementation or operator confirmation [assumption: workspace-only limitation].

## Customer Definition

The launch customer is a US resident with a specific local, state, or federal civic concern who wants an official to act, but does not know the relevant law, jurisdiction, contact path, or persuasive letter format [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

The practical buyer is not an activist organization, lobbyist, law firm, or enterprise customer. The repo's v1 product is individual-first, transactional, authenticated before payment, and explicitly excludes legal filings, claim submissions, automated follow-ups, comments, votes, coalition mechanics, subscriptions, and third-party API access [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].

The first validation segment should be one metro area with issues where official contact data, citations, and delivery can be checked manually before scaling [assumption: narrow launch segment reduces deliverability and citation risk].

## Product And Build Reality

The repo contains a monorepo with web, API, worker, and shared packages; Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs; routes for submissions, officials, payments, campaigns, compliance, webhooks, health, and admin; and worker agents for classification, research, drafting, delivery, treasury, and reconciliation [evidence: package.json; packages/shared/prisma/schema.prisma; apps/api/src/routes; apps/worker/src/agents].

The product promise is concrete: a user submits issue text, desired outcome, ZIP code, and identity preferences; the system identifies officials, researches citations, drafts letters, shows preview and pricing, collects Stripe payment, sends via Postmark, records delivery, and exposes dashboard/admin workflows [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

The current build is not enough to claim live operations. Open items in `.planning/REQUIREMENTS.md` still mark many user-facing, payment, delivery, moderation, treasury, and legal requirements incomplete, even though `.planning/ROADMAP.md` marks phases complete [evidence: .planning/REQUIREMENTS.md; .planning/ROADMAP.md].

## Market Sizing

Bottom-up serviceable market method: assume 100,000 US residents per year would pay for a done-for-you civic letter if reached, with an average order value of $15, creating $1,500,000 annual gross revenue [assumption: behavioral demand proxy, no external source available]. This is not TAM; it is a validation-scale serviceable obtainable market hypothesis.

Validation-market method: assume one launch metro can produce 250 paid orders per month at a $15 average order value, creating $3,750 monthly gross revenue and $45,000 annual gross revenue [assumption: one-metro SEO/referral wedge; no external source available]. This is the first market-sizing test because it can be validated with real traffic, paid conversion, and delivery outcomes.

Venture-scale ceiling method: assume 50 active metros, each producing 250 paid orders per month at a $15 average order value, creating $187,500 monthly gross revenue and $2,250,000 annual gross revenue [assumption: replication of one-metro economics across many metros]. Even this case is more cash-flow business than VC-scale unless retention, repeat usage, organizational channels, or data products emerge.

## Revenue Model

The current revenue model is transactional letter delivery only. Planned package prices are Starter at $5, Amplify at $15, and Complex at $25 [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The pricing rule is a 40% net margin floor after Stripe fees [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

Future API access for HOAs, nonprofits, or civic organizations is explicitly deferred and should not be included in base-case revenue until the consumer workflow has stable paid demand [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

Crowdfunding adjacency is excluded from active revenue because the repo plan says no confirmed affiliate program or live searchable data access is validated [evidence: MASTER_PLAN.md].

## Unit Economics And Financial Model

| Case | Orders | AOV | Gross revenue | Variable cost and fees | Fixed operating cost | Contribution |
|---|---:|---:|---:|---:|---:|---:|
| Validation floor | 25 orders/month [assumption: break-even target volume] | $15 [evidence: package tier] | $375/month [assumption: orders x AOV] | $45/month [assumption: 12% of revenue] | $200/month [evidence: MASTER_PLAN.md break-even analysis] | $130/month [assumption: revenue minus costs] |
| Metro wedge | 250 orders/month [assumption: local launch target] | $15 [evidence: package tier] | $3,750/month [assumption: orders x AOV] | $450/month [assumption: 12% of revenue] | $300/month [assumption: fixed tooling above launch baseline] | $3,000/month [assumption: revenue minus costs] |
| Multi-metro | 12,500 orders/month [assumption: 50 metros x 250 orders] | $15 [evidence: package tier] | $187,500/month [assumption: orders x AOV] | $22,500/month [assumption: 12% of revenue] | $20,000/month [assumption: support, data, and ops staffing] | $145,000/month [assumption: revenue minus costs] |

Repo economics claim token plus email costs near $0.35 to $0.75 per job and gross margins near 88% to 92% [evidence: MASTER_PLAN.md; .planning/GENESIS.md]. Those figures remain unvalidated until real token usage, citation verification retries, human review rate, refunds, chargebacks, and government deliverability are measured in production.

Operational reserves matter. The master plan requires a $1,500 Mercury reserve, warning at $2,000, critical pause at $1,000, emergency pause at $500, daily token spend cap of $300, and max single-job token cost of $25 [evidence: MASTER_PLAN.md]. These are good controls for a constrained cash-flow product, not evidence of market demand.

## Go To Market

The repo's go-to-market is SEO-first: opt-in public campaign pages, regulation summaries, and official metadata create long-tail search pages as a byproduct of paid usage [evidence: MASTER_PLAN.md; .planning/GENESIS.md].

The first GTM motion should be constrained beta, not national launch: one metro, one or two issue categories, manual contact-data QA, manual review of flagged citations, and a small paid cohort [assumption: highest-risk loops are data quality and deliverability]. Success should require paid conversion, successful delivery, low refund rate, and actual official replies before expanding.

Paid acquisition should remain out of scope until organic conversion is measured because the average order value is only $15 [evidence: package tier], leaving little room for CAC without repeat behavior [assumption: paid acquisition economics are tight at low AOV].

## Competition

Resistbot is the closest constituent-contact competitor; it focuses on easy message sending but does not appear in the repo as a full citation-backed regulatory research and payment workflow [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

Change.org competes for civic intent and public petition distribution; CivicState differentiates by drafting and delivering individual letters to officials rather than hosting petitions [evidence: MASTER_PLAN.md].

Quorum, VoterVoice, and similar advocacy platforms compete for organizational advocacy budgets, not individual $5 to $25 transactions [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

Manual email, phone calls, and government web forms remain the strongest substitutes because they are free [assumption: free incumbent behavior]. CivicState must prove that convenience, citations, routing, and professionalism are worth payment.

## Risks And Anti-Plan

A skeptical partner should try to kill this deal on three points. First, willingness to pay may be weak: civic frustration is common, but paying $5 to $25 for a letter may feel unnecessary when officials can be emailed for free [assumption: consumer civic willingness-to-pay risk].

Second, the official-contact and deliverability problem may be harder than the AI problem. Government inboxes, web forms, staff screening, spam filtering, opt-outs, bounces, and local-contact gaps could destroy user trust even if the letters are well-written [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

Third, citation-backed drafting creates legal-adjacent risk. The product says it is not legal advice, not a filing, and not a demand notice, but users may submit unverifiable allegations, penalties, claims, or pending litigation. The human review queue may become the actual product bottleneck [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md].

Anti-plan: do not raise venture capital, hire sales, build community features, launch nationally, add certified mail, or sell API access until the product proves paid conversion, citation accuracy, email deliverability, refund control, and operator review load in a bounded beta [assumption: sequencing protects scarce operator time and brand trust].

## Assumption Ledger

| Assumption | Why it matters | Validation test |
|---|---|---|
| Users pay $5 to $25 for civic-letter delivery [evidence: package tiers; assumption: willingness to pay] | Core revenue | Run beta with real Stripe payment before delivery |
| Paid conversion can reach 3% [evidence: .planning/PROJECT.md market verdict] | SEO funnel viability | Track visitor-to-paid conversion by source |
| Inbox placement can reach 85% for government addresses [evidence: .planning/PROJECT.md market verdict] | Delivery value | Seed test sends and monitor bounces/replies |
| Official coverage can reach 95% federal/state and 60% local [evidence: .planning/PROJECT.md market verdict] | Routing promise | Manual audit of launch ZIP codes |
| Chargebacks stay below 0.5% [evidence: .planning/PROJECT.md; MASTER_PLAN.md] | Stripe survivability | Track disputes and proactive refunds |
| One operator can handle exceptions within 24 hours [evidence: MASTER_PLAN.md] | Operating model | Measure flagged queue depth and oldest item age |

## Evidence Sources And Freshness

Most business-plan evidence is stale as of 2026-06-21 [evidence: dispatch current_date]. The master plan says March 2026 [evidence: MASTER_PLAN.md]. Planning docs were generated or last updated on 2026-04-25 [evidence: .planning/PROJECT.md; .planning/GENESIS.md; .planning/REQUIREMENTS.md; .planning/ROADMAP.md; .planning/STATE.md].

Freshness risk is material because external API availability, model names/prices, payment processor rules, AI transparency law, and email-provider deliverability change over time [assumption: external vendor and regulatory facts are time-sensitive].

## Milestones That Matter

The next plan should be validation-first. Ship only what proves or disproves the thesis: paid beta funnel, official lookup QA, citation verification QA, Postmark deliverability, refunds/disputes, and operator review load [evidence: .planning/REQUIREMENTS.md; MASTER_PLAN.md].

The business is worth continuing only if a bounded beta shows real payment, successful delivery, and acceptable operational load. If those fail, preserve the code as a research/personal asset, matching the registry caution [evidence: dispatch registry notes].
