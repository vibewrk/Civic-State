# CivicState Business Plan

Document date: 2026-06-22 [assumption: runtime current date]. Status: watchlist / research asset, not operator-approved investible BOS [evidence: registry note in wrk.dog dispatch]. Repo identity note: the dispatch project is `brooks-history`, while the repository-local product, code, and planning files describe CivicState [evidence: `.planning/PROJECT.md`, `package.json`, `apps/web/app/page.tsx`].

## Honesty Labels

Every quantitative claim in this document is labeled:

- `[evidence: <repo path>]` means the number is present in repo-local or dispatch evidence.
- `[assumption: <basis>]` means the number is an EIR model input or external-market placeholder because this worker is workspace-only with no network.

Factory output, model memory, and general internet knowledge are not evidence here.

## Current Thesis

CivicState is a paid constituent-communications tool: a U.S. resident enters a civic concern and ZIP code, the system identifies officials, researches relevant legal/regulatory context, drafts citation-backed letters, and delivers them after payment [evidence: `.planning/PROJECT.md`].

The investible thesis is conditional, not current. A small paid wedge may exist if individual citizens will pay `$5`, `$15`, or `$25` for high-quality, correctly routed civic letters [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/payments.ts`]. The repo already implements meaningful parts of the architecture, but it still needs market proof, deliverability proof, and official-data coverage proof before it should be pitched as a near-term venture-scale business [evidence: registry note in wrk.dog dispatch; evidence: `.planning/PROJECT.md`].

As of 2026-06-22 [assumption: runtime current date], this should be presented on wrk.vc as a research-backed watchlist asset, not as a financed operating company [evidence: registry note in wrk.dog dispatch].

## Product Reality

What is real in the repo:

- Express API entrypoint with security middleware, Clerk middleware, public routes, admin routes, Bull Board queue monitoring, and Sentry error handling [evidence: `apps/api/src/index.ts`].
- Submission creation, moderation, audit logging, placeholder dev user fallback, and BullMQ classifier enqueue path [evidence: `apps/api/src/routes/submissions.ts`].
- Stripe Checkout session creation for fixed tiers of `$5`, `$15`, and `$25` [evidence: `apps/api/src/routes/payments.ts`].
- OpenClaw worker process registering classifier, researcher, drafter, delivery, treasury, and reconciliation workers: `6` worker classes in the current entrypoint [evidence: `apps/worker/src/index.ts`].
- Prisma schema for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs: `10` models [evidence: `packages/shared/prisma/schema.prisma`].
- Frontend landing page with the core offer and pricing copy [evidence: `apps/web/app/page.tsx`].

What is not yet proven:

- Production traffic is `0` and revenue is `$0` in the repo audit [evidence: `.planning/existing-state.md`].
- Official-data provider coverage is unresolved, especially local officials [evidence: `.planning/PROJECT.md`; evidence: `.planning/STATE.md`].
- Government email deliverability is called out as the hardest problem, with a `2-4` week warming dependency [evidence: `.planning/PROJECT.md`; evidence: `.planning/REQUIREMENTS.md`].
- Willingness to pay is not validated; the repo lists `>=3%` paid conversion as a future validation gate, not a result [evidence: `.planning/PROJECT.md`].

## Customer Definition

Primary customer: an ordinary U.S. resident with a concrete civic issue, limited knowledge of jurisdiction/official routing, and willingness to pay a small transactional fee for research, drafting, and delivery [evidence: `.planning/PROJECT.md`].

Initial customer boundary:

- Individuals only, not organizations, businesses, parties, campaigns, or lobbying shops [evidence: `.planning/REQUIREMENTS.md`; evidence: `MASTER_PLAN.md`].
- English-language web flow only; multilingual and native mobile are out of scope [evidence: `.planning/REQUIREMENTS.md`].
- Constituent communications only, not legal filings, claim submissions, demand letters, or regulatory filings [evidence: `.planning/REQUIREMENTS.md`; evidence: `MASTER_PLAN.md`].

The buying job is not "send an email." The buying job is "turn my civic frustration into a credible, routed, citation-backed constituent communication without learning the law or finding every official myself" [evidence: `.planning/PROJECT.md`].

## Market Sizing

Because network research is unavailable, this sizing is bottom-up from repo constraints and explicit assumptions.

| Layer | Method | Revenue Implication |
|---|---|---|
| Launch capacity case | `5,000` submissions/month capacity target from the plan [evidence: `.planning/PROJECT.md`] x `$14.50` weighted AOV [assumption: `35%` single at `$5`, `45%` three-pack at `$15`, `20%` full-spread at `$25`] x `12` months [assumption: annualization] | `$870,000` annual gross revenue [assumption: formula] |
| Year-one base case | `4,800` campaigns/year from the repo's planned month-`12` scale table [evidence: `.planning/existing-state.md`] x `$14.50` weighted AOV [assumption: tier mix] | `$69,600` annual gross revenue [assumption: formula] |
| Validation floor | `11` paid submissions/month break-even claim [evidence: `.planning/PROJECT.md`] x `$14.50` weighted AOV [assumption: tier mix] x `12` months [assumption: annualization] | `$1,914` annual gross revenue at claimed break-even volume [assumption: formula] |
| Venture-scale proxy | `1,000,000` paid submissions/year [assumption: scenario for judging ceiling, not evidence] x `$14.50` weighted AOV [assumption: tier mix] | `$14,500,000` annual gross revenue [assumption: formula] |

Conclusion: the validated opportunity is likely a niche paid civic utility until volume and repeat behavior are proven. The product could become investible only if organic acquisition, repeat civic usage, or organization/API expansion create a credible path beyond the low-priced transactional ceiling [assumption: EIR interpretation of model].

## Revenue Model

Launch revenue is transactional:

- Single official: `$5` [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/payments.ts`].
- Three officials: `$15` [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/payments.ts`].
- All matched officials: `$25` [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/payments.ts`].

Base-case tier mix assumption:

| Tier | Mix | Price | Revenue at model volume |
|---|---:|---:|---:|
| Single | `35%` [assumption: conservative entry-tier skew] | `$5` [evidence: `apps/api/src/routes/payments.ts`] | `$1,750` [assumption: formula] |
| Three-pack | `45%` [assumption: expected default middle choice] | `$15` [evidence: `apps/api/src/routes/payments.ts`] | `$6,750` [assumption: formula] |
| Full-spread | `20%` [assumption: lower share for highest price] | `$25` [evidence: `apps/api/src/routes/payments.ts`] | `$5,000` [assumption: formula] |
| Weighted total | `100%` [assumption: tier mix sums to full paid cohort] | `$14.50` AOV [assumption: formula] | `$14,500` [assumption: formula] |

Future revenue streams in the repo include higher-touch review and API access, but they are not launch-scope evidence [evidence: `MASTER_PLAN.md`].

## Financial Figures

EIR model, reconciled to pricing:

| Metric | Base Case |
|---|---:|
| Paid campaigns/year | `4,800` [evidence: `.planning/existing-state.md`] |
| Weighted AOV | `$14.50` [assumption: tier-mix formula from repo prices] |
| Gross revenue | `$69,600` [assumption: `4,800 x $14.50`] |
| AI cost/submission | `$0.20` [evidence: `.planning/PROJECT.md`] |
| AI cost/year | `$960` [assumption: `4,800 x $0.20`] |
| Starting backend droplet | `$96`/month [evidence: `.planning/PROJECT.md`; evidence: `MASTER_PLAN.md`] |
| Hosting/year | `$1,152` [assumption: `$96 x 12`] |
| Modeled AI + hosting cost | `$2,112` [assumption: `$960 + $1,152`] |
| Gross contribution after modeled AI + hosting | `$67,488` [assumption: `$69,600 - $2,112`] |
| Contribution margin after modeled AI + hosting | `97.0%` [assumption: formula] |

Legacy financial claims to validate:

- `91%` gross margin, `$132.50`/month max burn, and break-even at `11` submissions are planning claims, not operating results [evidence: `.planning/PROJECT.md`].
- The plan requires a `$1,500` Mercury reserve and chargebacks below `0.5%` [evidence: `.planning/PROJECT.md`].
- Treasury alerts are planned at `$2,000` warning and `$500` emergency balance thresholds [evidence: `.planning/REQUIREMENTS.md`].

The financial table excludes taxes, payment processing, support labor, Postmark volume pricing, legal review, insurance, and paid acquisition because those are not evidenced in the workspace [assumption: scoped model].

## Go To Market

The repo's existing GTM is mostly implicit: low-friction web onboarding, paid preview-to-delivery conversion, and optional public civic content/SEO later [evidence: `MASTER_PLAN.md`; evidence: `.planning/PROJECT.md`].

Practical validation sequence:

- Prove `>=3%` paid conversion from preview to checkout in a small beta [evidence: `.planning/PROJECT.md`].
- Prove `>=85%` inbox placement to `.gov` domains before scaling delivery [evidence: `.planning/PROJECT.md`].
- Prove `>=95%` federal/state official coverage and `>=60%` local official coverage [evidence: `.planning/PROJECT.md`].
- Run a narrow launch around `3` issue clusters where citations and official routing are reliable [assumption: EIR wedge to reduce research/coverage risk].
- Avoid paid acquisition until unit economics include payment fees, support time, and moderation review time [assumption: EIR operating constraint].

Distribution assumptions:

- Organic search may matter if public campaign pages exist, but launch requirements defer public campaign publishing and discovery search [evidence: `.planning/REQUIREMENTS.md`].
- Community virality is not a launch plan; the current repo intentionally excludes a social network [evidence: `.planning/REQUIREMENTS.md`; evidence: `MASTER_PLAN.md`].

## Competition

The repo names these competitors or adjacent alternatives:

| Competitor | Why It Matters | CivicState Difference |
|---|---|---|
| Resistbot | Closest individual constituent-contact tool [evidence: `.planning/PROJECT.md`; evidence: `MASTER_PLAN.md`] | CivicState claims research-backed, citation-verified letters rather than simple routing [evidence: `.planning/PROJECT.md`] |
| Change.org | Petition hosting and mobilization adjacency [evidence: `MASTER_PLAN.md`] | CivicState sends individual letters rather than hosting petitions [evidence: `MASTER_PLAN.md`] |
| LegalZoom | Document drafting adjacency [evidence: `MASTER_PLAN.md`] | CivicState is civic-specific and excludes legal advice/filings [evidence: `.planning/REQUIREMENTS.md`] |
| Quorum / VoterVoice | Enterprise advocacy software with `$10k+` annual pricing claim [evidence: `.planning/PROJECT.md`] | CivicState targets individuals at `$5-$25` per campaign [evidence: `.planning/PROJECT.md`] |
| Manual direct outreach | Free substitute [assumption: obvious customer alternative] | CivicState must justify payment through research quality, official routing, and convenience [evidence: `.planning/PROJECT.md`] |

Competitive risk: the highest-risk competitor is free manual outreach, not enterprise advocacy software. If customers do not value citation-backed polish enough to pay, the business collapses into a convenience feature [assumption: EIR skepticism].

## Risks And Anti-Plan

The skeptic case is strong:

- People may not pay for civic letters. The repo has no revenue, no traffic, and no conversion evidence: `$0` revenue and `0` traffic [evidence: `.planning/existing-state.md`].
- Email deliverability to government domains may fail. If `.gov` inbox placement misses the `>=85%` gate, the core promise is broken even if the drafting is excellent [evidence: `.planning/PROJECT.md`].
- Local official data may be unreliable or expensive. The repo names Cicero/BallotReady as unresolved local-provider options and marks this as a spike [evidence: `.planning/PROJECT.md`; evidence: `.planning/STATE.md`].
- Citation-backed civic drafting can drift into unauthorized legal advice, defamation, harassment, or regulatory-demand territory; the repo correctly excludes legal filings and demand notices, but enforcement must be ruthless [evidence: `.planning/REQUIREMENTS.md`; evidence: `MASTER_PLAN.md`].
- The price ceiling is low. At `$14.50` AOV [assumption: tier mix], even `100,000` paid campaigns/year [assumption: scale scenario] is only `$1,450,000` gross revenue [assumption: formula].
- The registry note says this may be personal/research, not near-term investible [evidence: registry note in wrk.dog dispatch]. Ignoring that would be a fundraising-error, not optimism.

Anti-plan: do not pitch as a VC-ready company until paid conversion, deliverability, and official coverage clear the repo's own gates. Do not add subscriptions, community features, crowdfunding, certified mail, or organization APIs to compensate for weak consumer demand. If the individual paid wedge fails, archive as research/IP or reposition as internal civic-drafting infrastructure [assumption: EIR recommendation].

## Assumption Ledger

| Assumption | Why It Exists | Validation Needed |
|---|---|---|
| `$14.50` AOV [assumption: tier mix] | The repo has prices but no mix | Measure checkout selections in beta |
| `35% / 45% / 20%` tier mix [assumption: conservative model] | Needed to reconcile revenue | Track first `100` paid campaigns [assumption: minimum useful sample] |
| `4,800` campaigns/year is plausible [evidence: `.planning/existing-state.md`] | Existing planning table uses it | Compare to actual funnel and acquisition |
| `>=3%` conversion is the first paid gate [evidence: `.planning/PROJECT.md`] | Existing plan sets it | Instrument preview-to-checkout conversion |
| `>=85%` `.gov` inbox placement is required [evidence: `.planning/PROJECT.md`] | Existing plan sets it | Seed-list and production deliverability tests |
| Local coverage can reach `>=60%` [evidence: `.planning/PROJECT.md`] | Existing plan sets it | Provider spike with Cicero/BallotReady or replacement |
| Human review can stay below `30` minutes/day [evidence: `.planning/PROJECT.md`] | Existing operator constraint | Measure moderation queue depth and review time |

## Roadmap Link

The buildable roadmap now focuses on validation, not feature breadth. See [ROADMAP.md](ROADMAP.md).

## Surprise Spikes

- Dispatch identity mismatch: the worker was assigned `brooks-history`, but repo-local evidence describes CivicState throughout [evidence: wrk.dog dispatch; evidence: `.planning/PROJECT.md`; evidence: `package.json`].
- Existing-state mismatch: `.planning/existing-state.md` says zero app code existed, while the current repo contains application workspaces, routes, workers, tests, and a Prisma schema [evidence: `.planning/existing-state.md`; evidence: `apps/api/src/index.ts`; evidence: `packages/shared/prisma/schema.prisma`].
- Roadmap mismatch: `.planning/ROADMAP.md` marks all `4` phases complete [evidence: `.planning/ROADMAP.md`], while `.planning/REQUIREMENTS.md` still shows many product requirements unchecked [evidence: `.planning/REQUIREMENTS.md`]. The new roadmap treats completion as unvalidated until end-to-end proof exists.
- Pricing mismatch: `MASTER_PLAN.md` discusses a dynamic Pricer agent [evidence: `MASTER_PLAN.md`], but current implementation uses hardcoded tiers [evidence: `apps/api/src/routes/payments.ts`]. Hardcoded pricing is acceptable for validation, but it should not be represented as autonomous pricing.

## Evidence Sources

- [`.planning/PROJECT.md`](.planning/PROJECT.md) [evidence].
- [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md) [evidence].
- [`.planning/ROADMAP.md`](.planning/ROADMAP.md) [evidence].
- [`.planning/existing-state.md`](.planning/existing-state.md) [evidence].
- [`MASTER_PLAN.md`](MASTER_PLAN.md) [evidence].
- [`apps/api/src/index.ts`](apps/api/src/index.ts) [evidence].
- [`apps/api/src/routes/submissions.ts`](apps/api/src/routes/submissions.ts) [evidence].
- [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts) [evidence].
- [`apps/worker/src/index.ts`](apps/worker/src/index.ts) [evidence].
- [`packages/shared/prisma/schema.prisma`](packages/shared/prisma/schema.prisma) [evidence].
