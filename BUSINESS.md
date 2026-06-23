# CivicState Business Plan

Document date: 2026-06-23 [evidence: dispatch current_date]. Status: provisional watchlist asset [evidence: dispatch registry note].

## Snapshot

CivicState turns a resident's civic concern into a researched, citation-backed letter campaign delivered to relevant government officials. The current repo contains a real Next.js web app, Express API, Prisma data model, BullMQ worker, moderation flow, official lookup, Stripe Checkout, Postmark delivery, admin surfaces, and compliance routes [evidence: `apps/web/app/page.tsx`, `apps/api/src/index.ts`, `packages/shared/prisma/schema.prisma`, `apps/worker/src/index.ts`].

This should not be pitched as a near-term investible business without operator confirmation. The registry marks it as a personal/research asset and not a near-term investible BOS [evidence: dispatch registry note]. The investible version requires proof that residents will pay, government email delivery works, and official/contact coverage is reliable.

## Thesis

The thesis, as of 2026-06-23 [evidence: dispatch current_date], is that CivicState can collapse a multi-hour civic communication task into a priced workflow: describe issue, identify officials, research applicable law, draft letters, collect payment, and deliver. The repo's own core value states the intended offer as AI-powered regulation research, verified citations, ZIP-based official targeting, and one-click delivery for $5-$25 [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/payments.ts`].

The business is conditionally plausible because the implementation already covers the core loop in code, not only narrative [evidence: `apps/api/src/routes/submissions.ts`; evidence: `apps/worker/src/agents/researcher.ts`; evidence: `apps/worker/src/agents/drafter.ts`; evidence: `apps/worker/src/agents/delivery.ts`]. The market and demand claims remain assumptions because this workspace run has no network access, no customer data, no revenue records, and no independent market research [assumption: workspace-only review].

## Current Reality

What is real:

- Web surface: homepage, submission wizard, dashboard, admin, privacy, terms, success/cancel screens [evidence: `apps/web/app/page.tsx`; evidence: `apps/web/app/submit/page.tsx`; evidence: `apps/web/app/dashboard/page.tsx`; evidence: `apps/web/app/admin/page.tsx`].
- API surface: health, submissions, officials, payments, campaigns, webhooks, admin, compliance routes [evidence: `apps/api/src/index.ts`].
- Data model: users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`].
- Agent loop: Classifier, Researcher, Drafter, Delivery, Treasury, and reconciliation workers are registered [evidence: `apps/worker/src/index.ts`].
- Payment tiers are implemented as $5, $15, and $25 [evidence: `apps/api/src/routes/payments.ts`; evidence: `tests/payment.test.ts`].

What is not proven:

- Production deployment, live traffic, and live revenue are not evidenced in the repo [evidence: `.planning/existing-state.md`; assumption: no deployment telemetry in workspace].
- Deliverability to government domains is not proven by inbox placement data [assumption: no Postmark production metrics in workspace].
- External official data coverage is not proven beyond source integrations and tests [evidence: `apps/api/src/lib/officials/lookup.ts`; assumption: no live coverage report in workspace].
- Market size and willingness to pay are unvalidated [assumption: no customer interviews, analytics, payments, or conversion report in workspace].

## Product and Customer Definition

Primary customer: a United States resident with a specific civic issue who wants a government actor to take action but is unlikely to research law, identify jurisdiction, draft the message, and route it manually [evidence: `.planning/GENESIS.md`].

Initial job-to-be-done: "I want a credible letter sent to the right officials without learning government structure or legal citation conventions" [assumption: synthesized from repo product docs].

Excluded customers and use cases:

- Legal claimants seeking legal advice or filings [evidence: `.planning/GENESIS.md`; evidence: `MASTER_PLAN.md`].
- Organizations buying advocacy software at enterprise scale [assumption: current code and pricing are consumer transactional].
- Social movement communities requiring comments, votes, coalition mechanics, or moderation-heavy community tools [evidence: `.planning/GENESIS.md`].

## Market Sizing

Known market size: unknown. No external market research was performed in this workspace-only run [assumption: network disabled by dispatch].

Bottom-up validation market:

| Market layer | Method | Figure |
|---|---|---|
| Break-even wedge | Repo plan says break-even is about $340/month and about 25 Amplify submissions/month | $340/month and 25 submissions/month [evidence: `MASTER_PLAN.md` section 19.3] |
| Visitor requirement | At the repo's 3% willingness-to-pay gate, about 850 qualified visitors/month would be needed for about 25 paid submissions | 3% and 850 visitors/month [evidence: `.planning/PROJECT.md`; assumption: arithmetic using 25 / 0.03, rounded] |
| Early revenue check | 50 submissions at $15 average order value | $750/month [evidence: `MASTER_PLAN.md` section 19.2] |
| Year-one upside case | 400 submissions at $18 average order value | $7,200/month [evidence: `MASTER_PLAN.md` section 19.2] |
| Later upside case | 1,200 submissions at $20 average order value | $24,000/month [evidence: `MASTER_PLAN.md` section 19.2] |

This is not a TAM claim. It is a validation ladder. The only honest market-sizing conclusion is that CivicState has a small, testable paid wedge; the size of the broader market is an assumption until traffic, conversion, and retention data exist.

## Revenue Model and Unit Economics

Revenue model: one-time transactional letter packages. The active code implements single, three-pack, and full-spread tiers at $5, $15, and $25 [evidence: `apps/api/src/routes/payments.ts`].

Financial build:

| Package | Revenue | COGS basis | Contribution | Margin |
|---|---:|---:|---:|---:|
| Single | $5.00 | direct cost estimate above $0.20 | positive and above 90% in tests | above 90% [evidence: `tests/payment.test.ts`] |
| Amplify | $15.00 | $1.20 total COGS | $13.80 | 92% [evidence: `MASTER_PLAN.md` section 19.1] |
| Complex | $25.00 | $1.94 total COGS | $23.06 | 92% [evidence: `MASTER_PLAN.md` section 19.1] |

Internal reconciliation: Amplify revenue of $15.00 less $1.20 COGS equals $13.80 contribution; Complex revenue of $25.00 less $1.94 COGS equals $23.06 contribution [evidence: `MASTER_PLAN.md` section 19.1]. Stripe, token, hosting, and email costs must be revalidated against live invoices before investor-facing use [assumption: repo estimates are not invoices].

Reserve and burn constraints: the planning docs call for a $1,500 Mercury reserve, $2,000 warning alert, $500 emergency alert, and a $96/month DigitalOcean backend baseline [evidence: `.planning/PROJECT.md`; evidence: `.planning/REQUIREMENTS.md`; evidence: `MASTER_PLAN.md`]. These figures are planning constraints, not bank evidence.

## Competition

Named competitive set:

| Competitor | Repo-stated role | CivicState differentiation |
|---|---|---|
| Resistbot | Closest citizen letter tool | CivicState intends citation-backed research and richer per-issue context [evidence: `.planning/PROJECT.md`; assumption: competitor behavior not independently verified] |
| Change.org | Petition hosting | CivicState sends individualized letters rather than only hosting petitions [evidence: `MASTER_PLAN.md`; assumption: competitor behavior not independently verified] |
| LegalZoom | Document drafting | CivicState is civic-communication-specific and avoids legal advice [evidence: `MASTER_PLAN.md`; assumption: competitor behavior not independently verified] |
| Quorum / VoterVoice | Enterprise advocacy platforms | CivicState targets individuals at transactional prices rather than organization contracts [evidence: `.planning/PROJECT.md`; assumption: competitor behavior not independently verified] |
| Manual outreach | User researches and emails officials directly | CivicState bundles research, drafting, routing, delivery, and tracking [evidence: `.planning/GENESIS.md`] |

Competitive risk: if the core value is just "AI writes a letter," the product is weak. The defensible version depends on verified official routing, citation verification, deliverability history, response tracking, and a growing evidence library [assumption: moat reasoning from `.planning/GENESIS.md`].

## Go-to-Market

Primary GTM: organic search from public, opt-in civic campaign pages and issue/reference pages [evidence: `.planning/GENESIS.md`; evidence: `MASTER_PLAN.md`]. This remains speculative until indexed pages, impressions, conversion rate, and paid submissions exist [assumption: no analytics evidence in workspace].

Secondary GTM: social sharing of public campaign pages and reply updates [evidence: `.planning/GENESIS.md`; assumption: no sharing data in workspace].

Near-term validation sequence:

- Recruit a small beta cohort manually rather than wait for SEO [assumption: workspace has no audience evidence].
- Measure visitor-to-paid conversion against the 3% gate [evidence: `.planning/PROJECT.md`].
- Measure government email inbox placement against the 85% gate [evidence: `.planning/PROJECT.md`].
- Measure official coverage against 95% federal/state and 60% local gates [evidence: `.planning/PROJECT.md`].

## Evidence Sources

Workspace evidence used:

- [`MASTER_PLAN.md`](MASTER_PLAN.md) [evidence]
- [`.planning/PROJECT.md`](.planning/PROJECT.md) [evidence]
- [`.planning/GENESIS.md`](.planning/GENESIS.md) [evidence]
- [`.planning/ROADMAP.md`](.planning/ROADMAP.md) [evidence]
- [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md) [evidence]
- [`packages/shared/prisma/schema.prisma`](packages/shared/prisma/schema.prisma) [evidence]
- [`apps/api/src/index.ts`](apps/api/src/index.ts) [evidence]
- [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts) [evidence]
- [`apps/worker/src/index.ts`](apps/worker/src/index.ts) [evidence]
- [`tests/payment.test.ts`](tests/payment.test.ts) [evidence]

No external source links are included because the dispatch required workspace-only operation with no network research [evidence: dispatch instruction].

## Assumption Ledger

| Assumption | Basis | Validation needed |
|---|---|---|
| Residents will pay $5-$25 for civic letters | Repo thesis and implemented pricing [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/payments.ts`] | Paid beta conversion, refunds, repeat usage |
| SEO can acquire qualified demand cheaply | Repo GTM hypothesis [evidence: `.planning/GENESIS.md`] | Search Console impressions, landing page conversion, paid submission attribution |
| Government email delivery works at scale | Postmark delivery flow exists [evidence: `apps/worker/src/agents/delivery.ts`] | Inbox placement and bounce data by government domain |
| Official data coverage can be good enough | Official lookup orchestration exists [evidence: `apps/api/src/lib/officials/lookup.ts`] | Coverage audit by ZIP and jurisdiction |
| AI legal/citation research is acceptable for civic communication | Researcher and citation verifier exist [evidence: `apps/worker/src/agents/researcher.ts`; evidence: `apps/worker/src/lib/legal/citation-verifier.ts`] | Human review of sampled letters and citation failures |
| One operator can handle flagged submissions | Admin and moderation flows exist [evidence: `apps/api/src/lib/moderation.ts`; evidence: `apps/api/src/routes/admin.ts`] | Queue volume and review time under beta traffic |

## Risks and Anti-Plan

The strongest case against CivicState:

- The product may be a convenience feature, not a business. Users may like the idea but refuse to pay even $5 [assumption: demand unvalidated].
- Officials may ignore, filter, or resent AI-assisted mass-looking mail, making "delivered" a vanity metric [assumption: no inbox or response evidence].
- The citation layer may create more liability than trust if a letter overstates law or implies legal advice [assumption: legal risk not independently reviewed].
- Official lookup, especially local coverage, may be too sparse for satisfying results [evidence: `.planning/PROJECT.md` flags local provider evaluation; assumption: no coverage report].
- SEO may be too slow or too competitive for a self-funded operator; the plan has no paid acquisition fallback beyond manual beta [assumption: no traffic evidence].
- A general AI assistant plus a government website may be good enough for motivated users, while unmotivated users may not pay for any workflow [assumption: market behavior unvalidated].
- The registry note is right: this may be best treated as a personal/research asset unless an operator chooses to run a serious demand test [evidence: dispatch registry note].

Kill criteria:

- Paid conversion below 3% after the beta funnel receives qualified traffic [evidence: `.planning/PROJECT.md`].
- Government inbox placement below 85% after domain warming and delivery tuning [evidence: `.planning/PROJECT.md`].
- Official coverage below 95% federal/state or 60% local in target ZIP samples [evidence: `.planning/PROJECT.md`].
- Average operator review time or legal review burden makes the low-price model irrational [assumption: ops burden unvalidated].

## Surprise Spikes

- `.planning/existing-state.md` says zero application code exists, but the current worktree includes app code, Prisma schema, routes, workers, tests, Docker, and web pages [evidence: `.planning/existing-state.md`; evidence: `apps/`; evidence: `packages/shared/prisma/schema.prisma`]. The stale audit should not be used as the current data-room truth.
- The code has a compliance export selector that appears to reference fields not present in the Prisma schema, including `tier`, `body`, and `deliveredAt` on selected models [evidence: `apps/api/src/routes/compliance.ts`; evidence: `packages/shared/prisma/schema.prisma`]. This is a launch-risk bug, not a business proof point.
- The submission route can fall back to a placeholder test user when auth is absent or misconfigured [evidence: `apps/api/src/routes/submissions.ts`]. That may be acceptable for development, but it is not production-grade identity handling.

## Freshness and Honesty Labels

Freshness: repo planning docs are dated 2026-04-25 [evidence: `.planning/PROJECT.md`; evidence: `.planning/STATE.md`]. The operator-adoption rule referenced by the gate artifact is dated 2026-06-12 [evidence: dispatch gate instruction]. This review is dated 2026-06-23 [evidence: dispatch current_date]. External market claims were not refreshed because network access was prohibited [evidence: dispatch instruction].

Honesty label rules used here:

- `[evidence: path]` means the claim is supported by a repository or dispatch artifact.
- `[assumption: basis]` means the claim is a reasoned inference or an external market statement not independently verified in this run.
- Planning figures, including $5, $15, $25, $340/month, $7,200/month, 3%, 85%, 90%, 92%, 95%, and 60%, are not live operating results unless explicitly tied to code or repository docs [evidence: files cited above].

## Decision Gates

Provisional go for research and beta only. Not a VC-ready go.

Required operator/market validation:

- Confirm whether this should be operated as a business or retained as a personal/research asset [evidence: dispatch registry note].
- Run paid beta conversion against the 3% gate [evidence: `.planning/PROJECT.md`].
- Run government deliverability against the 85% inbox-placement gate [evidence: `.planning/PROJECT.md`].
- Run official coverage audit against 95% federal/state and 60% local gates [evidence: `.planning/PROJECT.md`].
- Fix launch-risk code issues before handling real users or sensitive political content [assumption: code review from current workspace].
