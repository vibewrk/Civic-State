# CivicState Business Plan

Document date: 2026-06-22 [evidence: worker dispatch current_date]. Evidence mode: workspace-only; repo files are evidence, and all external market claims are assumptions.

## Snapshot

CivicState is a civic letter delivery product: a user describes a local, state, or federal civic concern, enters a ZIP code, reviews citation-backed letters, pays a one-time fee, and the system sends emails to matched government officials. This is real in the repo as a Next.js web app, Express API, BullMQ worker, Prisma schema, Stripe Checkout route, Postmark delivery path, officials lookup, moderation, citation verification, and admin tooling [evidence: package.json; apps/web/app/page.tsx; apps/api/src/index.ts; packages/shared/prisma/schema.prisma; apps/worker/src/agents/researcher.ts].

The current investment posture is watchlist, not near-term investible. The registry note says this may be a personal/research asset rather than a business; the repo also contains conflicting state signals, with `.planning/ROADMAP.md` marking Phase 1 through Phase 4 complete while `.planning/STATE.md` says Phase 1 is complete and Phase 2 planning is next [evidence: registry note in dispatch; .planning/ROADMAP.md; .planning/STATE.md].

Thesis current: CivicState may become a small transactional civic-tech business if users will pay $5, $15, or $25 per campaign [evidence: apps/api/src/routes/payments.ts], but it is not fundable until paid demand, official-data coverage, citation quality, and deliverability are validated.

## Product Reality

What is implemented or specified:

- Monorepo with `apps/web`, `apps/api`, `apps/worker`, and `packages/shared` [evidence: package.json; pnpm-workspace.yaml].
- Public landing page and submission wizard describing the $5 to $25 paid civic-letter flow [evidence: apps/web/app/page.tsx; apps/web/app/submit/page.tsx].
- Express API routes for submissions, officials, payments, webhooks, campaigns, admin, compliance, and health [evidence: apps/api/src/index.ts].
- PostgreSQL schema for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].
- Worker-side research agent that searches eCFR, CourtListener, and a state cache, then strips unverified citations [evidence: apps/worker/src/agents/researcher.ts].
- Payment tiers of $5 single, $15 three-pack, and $25 full-spread [evidence: apps/api/src/routes/payments.ts].
- Planned infrastructure: DigitalOcean droplet with 8 vCPU, 16 GB RAM, 320 GB NVMe SSD, NYC3, and about $96/month [evidence: MASTER_PLAN.md §4].

What is not proven:

- No repo evidence of production traffic, paid customers, conversion, official response rates, domain warming completion, or deployed infrastructure [evidence: .planning/existing-state.md; .planning/STATE.md].
- No repo evidence that the `brooks-history` name matches the CivicState implementation; the code and docs consistently describe CivicState [evidence: package.json; MASTER_PLAN.md; .planning/PROJECT.md].

## Customer Definition

Primary customer: a US resident with a specific civic problem who wants a government official to act but does not know the correct jurisdiction, legal citation, recipient, or formal letter format [evidence: .planning/GENESIS.md; .planning/PROJECT.md].

Beachhead customer: mobile-first individuals facing practical, non-legal civic issues such as zoning, roads, noise, public services, school policy, or agency enforcement failures [assumption: inferred from product copy and Genesis examples, not validated by users].

Excluded customers: people seeking legal advice, insurance claim help, regulatory filings, medical content, or automated legal demands [evidence: MASTER_PLAN.md §1; .planning/PROJECT.md].

Buyer/user split: the citizen is both user and payer in launch scope; officials are passive recipients, not customers [evidence: .planning/PROJECT.md].

## Problem And Job To Be Done

The job is not "write a letter." The job is: identify the right officials, locate credible legal or policy references, draft a non-inflammatory request, and deliver it in a trackable way. The repo's value proposition is strongest where a citizen's willingness to act is blocked by uncertainty and friction rather than lack of caring [evidence: .planning/GENESIS.md].

The risk is that users may prefer free direct email, free templates, or public petitions, especially if they do not trust AI-generated civic correspondence [assumption: product-market behavior risk based on common consumer software adoption dynamics].

## Market Sizing

Because network research is unavailable, this plan does not claim a top-down TAM. It uses a bottom-up validation model.

Launch revenue threshold:

| Input | Value | Honesty label |
|---|---:|---|
| Average paid order | $16.00 | [assumption: mix of 20% single at $5, 50% three-pack at $15, 30% full-spread at $25] |
| Paid orders needed for $4,000 monthly gross revenue | 250/month | [assumption: $4,000 divided by $16.00] |
| Paid orders needed for $16,000 monthly gross revenue | 1,000/month | [assumption: $16,000 divided by $16.00] |
| Initial organic visitor target | 25,000/month | [assumption: 500 indexed locality/issue pages at 50 visits/page/month] |
| Paid conversion target | 3.0% | [assumption: validation gate from .planning/PROJECT.md] |
| Revenue at target traffic and conversion | $12,000/month | [assumption: 25,000 visitors times 3.0% conversion times $16.00 AOV] |

This sizing is intentionally modest. If CivicState cannot reach 250 paid orders/month [assumption: validation threshold] through SEO and direct sharing, it should stay a personal/research asset. If it reaches 1,000 paid orders/month [assumption: scale threshold], then the directory, citation cache, and deliverability data may become compounding assets.

## Revenue Model

Launch revenue is one-time transactional payment, not subscription. The repo implements three Stripe Checkout tiers: $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts]. The earlier plan also mentions subscriptions and organization/API access, but those are deferred or removed from the active plan [evidence: MASTER_PLAN.md changelog; .planning/GENESIS.md].

Illustrative monthly model:

| Line | Calculation | Amount | Honesty label |
|---|---:|---:|---|
| Paid orders | operating case | 250 | [assumption: validation operating case] |
| Weighted average order | tier mix | $16.00 | [assumption: 20%/$5, 50%/$15, 30%/$25 tier mix] |
| Gross revenue | 250 x $16.00 | $4,000 | [assumption: reconciles to order volume and AOV] |
| Stripe fees | 2.9% + $0.30/order | $191 | [assumption: common card-not-present fee memory; must be verified with Stripe before launch] |
| AI plus email variable cost | $0.75/order | $188 | [assumption: higher than Genesis $0.35-$0.75/job range to avoid underpricing] |
| Gross contribution | revenue minus variable costs | $3,621 | [assumption: $4,000 - $191 - $188] |
| Gross contribution margin | contribution / revenue | 90.5% | [assumption: $3,621 / $4,000] |
| Fixed monthly tooling | DO $96 + local data $500 + misc $150 | $746 | [evidence: MASTER_PLAN.md for $96 DO; assumption: local data and misc ops] |
| Net before labor | contribution minus fixed tooling | $2,875 | [assumption: $3,621 - $746] |

The model reconciles mechanically, but none of the demand inputs are validated. The most dangerous hidden cost is not tokens; it is human review, deliverability maintenance, official-data cleanup, and complaint handling [assumption: operating-risk inference from repo design].

## Go To Market

Primary channel: SEO pages generated from opt-in public campaign records [evidence: .planning/GENESIS.md; MASTER_PLAN.md §9]. This is plausible only after real paid submissions exist; publishing synthetic or low-quality pages would weaken the asset and may create trust risk [assumption: SEO quality risk].

Secondary channel: shareable campaign pages and official reply updates [evidence: .planning/GENESIS.md].

Near-term GTM tests:

- Validate one complete paid delivery for a non-sensitive civic issue by 2026-07-15 [assumption: operator-selected target date].
- Run a concierge beta of 25 paid submissions at $5 to $25 [assumption: small batch sized for one operator].
- Measure preview-to-payment conversion against a 3.0% minimum gate [assumption: gate from .planning/PROJECT.md].
- Measure government-email bounce rate and pause any domain above 10% bounce rate [evidence: .planning/ROADMAP.md Phase 3 criteria].
- Log official response rate and user refund/complaint rate before adding public SEO pages [assumption: sequence to protect trust].

## Competition

Named alternatives:

| Competitor | Customer served | Strength | CivicState angle |
|---|---|---|---|
| Resistbot | individual constituents | free or low-friction lawmaker messaging | CivicState adds researched citations and paid delivery workflow [assumption: external competitor characterization from existing project docs] |
| Change.org | petition creators and signers | broad petition distribution | CivicState sends individualized letters rather than collecting signatures [assumption: external competitor characterization from existing project docs] |
| Quorum | advocacy organizations | enterprise government-affairs tooling | CivicState targets individuals at $5 to $25 instead of enterprise contracts [assumption: external competitor characterization from existing project docs] |
| VoterVoice | advocacy organizations | campaign management and constituent activation | CivicState is self-serve for individuals [assumption: external competitor characterization from existing project docs] |
| LegalZoom | consumers needing legal documents | brand trust and document workflows | CivicState explicitly avoids legal advice and filings [assumption: external competitor characterization from existing project docs] |
| Manual email/templates | any citizen | free | CivicState must justify price through routing, citation quality, tone, and delivery tracking [evidence: .planning/GENESIS.md] |

The hard truth: none of these competitors needs to copy the entire system to blunt CivicState. A free template library plus official lookup may be "good enough" for many users [assumption: anti-plan competitor risk].

## Evidence Sources

- [MASTER_PLAN.md](MASTER_PLAN.md): original product spec, architecture, pricing philosophy, infrastructure, and deferred scope [evidence].
- [.planning/PROJECT.md](.planning/PROJECT.md): current project definition, constraints, assumptions, validation gates, and decisions [evidence].
- [.planning/GENESIS.md](.planning/GENESIS.md): value chain, distribution hypothesis, target user, moat hypothesis, and exclusions [evidence].
- [.planning/ROADMAP.md](.planning/ROADMAP.md): claimed implementation roadmap and success criteria [evidence].
- [.planning/STATE.md](.planning/STATE.md): contradictory state snapshot showing Phase 1 complete and later phases pending [evidence: .planning/STATE.md].
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma): implemented data model [evidence].
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts): implemented pricing tiers and Stripe Checkout [evidence].
- [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts): implemented research/citation verification behavior [evidence].

## Surprise Spikes

- Project identity mismatch: dispatch names `brooks-history`, but the repository content is CivicState throughout [evidence: dispatch; package.json; MASTER_PLAN.md]. This needs operator confirmation before any public wrk.vc positioning.
- Completion mismatch: `.planning/ROADMAP.md` marks Phase 1 through Phase 4 complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/STATE.md` says Phase 1 complete and Phase 2 planning needed on 2026-04-25 [evidence: .planning/STATE.md].
- Asset-stage mismatch: registry says watchlist/personal/research asset [evidence: dispatch], while the old plan uses business language such as high margin, SEO flywheel, and autonomous treasury [evidence: MASTER_PLAN.md; .planning/GENESIS.md].
- Existing-state drift: `.planning/existing-state.md` says zero application code existed [evidence: .planning/existing-state.md], but the current tree contains app code, tests, Prisma schema, API routes, and workers [evidence: apps/; packages/shared/; tests/].

## Risks And Anti-Plan

The kill-case is simple: CivicState may be a polished demo for a behavior people do not pay for. Citizens with enough motivation may email officials for free, and citizens without motivation may not pay any amount. A $5 to $25 price point [evidence: apps/api/src/routes/payments.ts] is low enough to require volume but high enough to trigger skepticism.

The second kill-case is trust. If a letter contains a bad citation, targets the wrong official, sounds AI-generated, or creates a spam complaint, the product loses the very credibility it sells. The repo has citation verification and moderation [evidence: apps/worker/src/agents/researcher.ts; apps/api/src/routes/submissions.ts], but production accuracy is unproven.

The third kill-case is channel fragility. SEO may take months, public campaign pages may not rank, and government inboxes may suppress bulk-looking mail. The original plan expects domain warming, SPF/DKIM/DMARC, and bounce monitoring [evidence: scripts/setup-dns.md; .planning/ROADMAP.md], but there is no evidence those are live.

The fourth kill-case is regulatory and reputational ambiguity. Civic letters about politics, policy, and enforcement can contain sensitive personal and political data. The product must keep its "not legal advice" boundary, opt-out handling, AI disclosure, retention policy, and human review discipline [evidence: apps/web/app/privacy/page.tsx; .planning/PROJECT.md].

## Assumption Ledger

| Assumption | Why it matters | Validation |
|---|---|---|
| Users will pay $5 to $25 for civic letter delivery | Core revenue model | 25 paid concierge submissions [assumption: near-term validation design] |
| Preview-to-payment conversion can reach 3.0% | Determines whether SEO can work | Track wizard starts, previews, and paid sessions [assumption: metric gate from .planning/PROJECT.md] |
| Email delivery to officials can remain below 10% bounce rate | Protects sender reputation | Domain-level bounce monitoring and pauses [evidence: .planning/ROADMAP.md] |
| Citation verification prevents credibility failures | Core trust claim | Audit a sample of generated letters before delivery [assumption: QA method] |
| One operator can handle flagged queue within 24 hours | Keeps labor out of unit economics | Measure flagged volume and oldest flagged age [evidence: .planning/ROADMAP.md] |
| SEO pages can produce 25,000 monthly visits | Supports acquisition economics | Publish only real opt-in pages and measure impressions [assumption: GTM model] |

## Milestones And Dates

- 2026-04-25: repo planning files record CivicState initialization and Phase 1 completion [evidence: .planning/STATE.md; .planning/PROJECT.md].
- 2026-06-22: EIR soul upgrade created in workspace-only mode [evidence: worker dispatch current_date].
- 2026-07-15: target date for one paid end-to-end delivery validation [assumption: operator validation milestone].
- 2026-08-15: target date for a 25-submission concierge beta readout [assumption: operator validation milestone].

## Investment View

Status: provisional watchlist. CivicState is not a VC-grade investible business today because demand, deliverability, official-data coverage, and production economics are not validated [evidence: dispatch registry note; repo lacks production metrics]. It can become a credible small business if the next validation sprint proves users pay, letters arrive, officials respond, and the operator workload stays bounded.

Operator ruling needed: confirm whether this repository should be pitched as CivicState, renamed from `brooks-history`, or treated as a personal/research asset with no near-term investment narrative [evidence: dispatch registry note].
