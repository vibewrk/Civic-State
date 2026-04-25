# Ultra Start Template — Capabilities

> **If this project already has its own CLAUDE.md conventions, those still apply.**
> This section adds the Ultra Start Template capabilities ON TOP of existing project rules.
> The full system documentation lives in `orchestrator/SYSTEM.md`.

## Hard rule — push + CI discipline (binary-star CONTRACT §12)

**Every commit reaches GitHub within 5 minutes. Every work unit is a PR. CI must pass before merge. Never force-push `main`.**

Full rules in `docs/first-run-checklist.md` § "The push + CI standing order". This is not advice — Portia monitors for violations and pings the operator when an agent leaves work stranded.

## STOP — read [docs/first-run-checklist.md](docs/first-run-checklist.md) first

Before doing ANY work in this repo, open `docs/first-run-checklist.md` and
pick your mode:

- **GREENFIELD** — fresh `npx ultra-start-init` project, no code yet → follow the Greenfield section
- **ULTRA OPTIMIZER** — template was pulled into an existing production repo via `ultra-start-upgrade` → follow the Ultra Optimizer section (layer template tooling ON TOP of existing code; augment, don't replace)
- **HYBRID** — existing code + new feature request → Ultra Optimizer steps first, then `npm run pipeline`

That file is **tools-category** — refreshed on every `ultra-start-upgrade`,
so it overrides any stale guidance in this file. **When this file and
`docs/first-run-checklist.md` disagree, trust the checklist.**

## Setup Check

If `.planning/` directory does not exist, run `npm run setup` silently before doing anything else.

## What You Can Do

### New Business → `npm run pipeline`
Record an idea → three models research, plan, build, ship, and continuously improve it.

### Existing Codebase → GSD Commands
- `/gsd-map-codebase` — deep parallel analysis (7 structured docs)
- `/gsd-scan` — rapid health check
- `/gsd-audit-fix` — autonomous find → classify → fix → test → commit
- `/gsd-code-review N` — structured review → REVIEW.md
- `/gsd-code-review-fix N` — auto-fix findings (atomic commits)
- `/gsd-add-tests` — generate missing tests
- `/gsd-intel` — query codebase intelligence

### Rebuild Existing Site → `npm run rebuild https://oldsite.com`
Capture → three-model analysis → POM votes on new stack → build with parity verification.

### Plurality of Models (POM) → `npm run pom "question"`
Ask all three top models, they research independently, vote 2-of-3. Use POM at any decision gate. When the user says "POM it" — run this instead of asking them.

### Continuous Improvement → `npm run pipeline:watcher`
The watcher loop: assess → adapt → dispatch → improve. Runs forever post-ship.

## All 70+ GSD Skills
Type `/gsd-help` to see them all. Key commands:
- `/gsd-new-project` — initialize with deep context gathering
- `/gsd-plan-phase N` — plan a phase
- `/gsd-execute-phase N` — execute a phase
- `/gsd-autonomous` — build all remaining phases
- `/gsd-verify-work` — verify everything works
- `/gsd-explore` — Socratic ideation before plans
- `/gsd-import --from file` — ingest external plans
- `/gsd-undo --last N` — safe revert with dependency checks

## Three-Model Team
- **You (Claude/Opus):** planning, architecture, review, deep reasoning
- **Gemini 3.1 Pro:** research, classification, codebase scanning
- **Codex (GPT 5.4):** fast execution, tests, practical perspective
- Cross-review rule: the model that writes code must NOT be its only reviewer

## Project Structure
- Application code → `src/`
- Tests → `tests/`
- Documentation → `docs/`
- Template system (don't modify) → `orchestrator/`, `autoux/`, `quality/`, `.claude/`, `.gemini/`, `.codex/`
- Pipeline artifacts → `.planning/`

## Key Principles
1. **Build fast, learn from real data.** Ship and let the watcher loop tell you if it's working.
2. **Evidence-driven roadmap.** PM reviews with real metrics. DECISIONS.md records why.
3. **Idle-time improvement.** The system never idles — cheapest model improves continuously.
4. **Models answer, not humans.** Consensus protocol + POM replace human decision-making.
5. **Trio mode: all three models on every step.** When Gemini and Codex are available, every pipeline step uses Lead + Challenger + Verifier in parallel. Claude leads deep reasoning, Gemini challenges with web research, Codex verifies practicality. See `orchestrator/multi-model-utilization.md`.

## Full System Documentation
See `orchestrator/SYSTEM.md` for: pipeline steps table, model routing, watcher loop details, quality layers, OpenClaw config, path conventions, and all orchestrator protocols.

---

## GSD Project: CivicState

**Status:** Initialized | Phase 1 of 4 | Ready to plan

**What:** Civic tech platform that turns civic concerns into researched, citation-backed letters delivered to government officials for $5-$25.

**Stack:** Next.js 15 (Vercel) + Express.js (DigitalOcean Docker) + PostgreSQL 16 + Redis/BullMQ + Clerk + Stripe + Postmark + Anthropic API

**Monorepo:** apps/web, apps/api, apps/worker, packages/shared

**Planning artifacts:**
- `.planning/PROJECT.md` — project context and decisions
- `.planning/REQUIREMENTS.md` — 92 v1 requirements across 14 categories
- `.planning/ROADMAP.md` — 4-phase roadmap
- `.planning/STATE.md` — current position and velocity
- `.planning/research/` — three-model research synthesis
- `.planning/consensus/` — 28 pre-approved decisions

**Phase overview:**
1. **Foundation** — Monorepo, Docker, CI/CD, database, auth, agent engine, domain warming (30 reqs)
2. **AI Pipeline** — Submission wizard, officials, research, citation verification, letter drafting (27 reqs)
3. **Payment & Delivery** — Stripe, treasury, Postmark delivery, bounce tracking (17 reqs)
4. **Dashboard & Compliance** — User dashboard, admin tools, legal pages, audit (18 reqs)

**Next step:** `/gsd-discuss-phase 1` or `/gsd-plan-phase 1`
