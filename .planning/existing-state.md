# Existing State Audit

## Infrastructure
- Current hosting: No production infrastructure deployed yet. Plan calls for DigitalOcean Droplet (8 vCPU / 16 GB RAM / 320 GB NVMe, NYC3, ~$96/mo) for backend + Vercel for Next.js frontend.
- Databases: None provisioned. Plan specifies PostgreSQL 16 (Docker container on droplet initially, managed PostgreSQL at scale) + Redis (Docker container for BullMQ job queue).
- CDN/DNS: Not configured. Plan specifies Nginx reverse proxy + Certbot SSL on droplet; Vercel for frontend CDN. Optional Cloudflare proxy for DDoS.
- Domains: civicstate.com (registrar unknown — not yet configured). api.civicstate.com planned for Express API.
- CI/CD: GitHub Actions CI exists for the template layer only (lint: shellcheck + shfmt + ruff; tests: bats + pytest). No application CI/CD yet. Template contamination gate workflow also present.

## Codebase
- Repository: https://github.com/vibewrk/Civic-State.git
- Framework: Ultra Start Template v1.2.0 (multi-LLM orchestrator shell — not application code). No application framework code exists yet.
- Language: Bash (26 .sh files), Python (8 .py files), JavaScript/Node (26 .js files), Bats (4 .bats test files). All are template/orchestrator tooling — zero application source code.
- Dependencies: pnpm-lock.yaml present (minimal). Git submodules: bats-core, bats-assert, bats-support (test framework). Python deps: ruff (linting). No application dependencies (no Next.js, Express, Prisma, etc. installed).
- Test coverage: 4 bats test files + 2 pytest files covering template orchestrator scripts only. No application tests.
- Last meaningful commit: 2026-04-24 — "Add CivicState.com Master Build Plan v2.1" (single commit on main).

## Data
- Database schemas: 0 tables implemented. Master Plan specifies 7 tables for launch: `users`, `campaigns`, `officials`, `letters`, `jobs`, `ledger_entries`, `treasury_snapshots`. All UUID primary keys, PostgreSQL with Prisma ORM. Schema is fully designed in MASTER_PLAN.md §16 but no Prisma schema or migration files exist.
- Content volume: Zero. No pages, posts, or media — nothing is built yet.
- User data: Zero users. Plan stores: email, display_name, zip_code, anonymous_default, stripe_customer_id, clerk_user_id.
- Exports available: N/A — no data exists to export.

### Planned Database Schema Detail (from MASTER_PLAN.md §16)

| Table | Key Columns | Purpose | Estimated Scale (Month 12) |
|-------|-------------|---------|---------------------------|
| `users` | id (UUID), email, zip_code, clerk_user_id, stripe_customer_id | User accounts | ~2,000–5,000 rows |
| `campaigns` | id, slug, user_id (FK), issue_description, desired_outcome, zip_code, status, publish_preference, seo_meta (JSONB) | Civic letter campaigns | ~4,800 rows (400/mo × 12) |
| `officials` | id, full_name, title, office, level, jurisdiction, email, response_rate | Government officials directory | ~5,000–50,000 rows |
| `letters` | id, campaign_id (FK), official_id (FK), content, status, sent_at, delivered_at | Individual letters per official | ~24,000 rows (avg 5/campaign) |
| `jobs` | id, job_type, submission_id, status, current_agent, tokens_used, context_snapshot (JSONB) | OpenClaw agent job queue | ~4,800 rows |
| `ledger_entries` | id, entry_type, amount, vendor, stripe_payment_intent_id, mercury_transaction_id, running_balance | Financial ledger | ~10,000 rows |
| `treasury_snapshots` | id, snapshot_date, total_revenue, total_expenses, closing_balance, gross_margin_pct | Daily financial snapshots | ~365 rows |

## Content (if content-based project)
- Total pages/posts: 0 — no application pages built
- Human-written: 0
- AI-generated: 0
- Media: 0 — no videos, images, or storage configured
- User-generated: 0

## Current Performance
- Traffic: Zero — site not live
- Revenue: $0 — no Stripe integration, no payments
- SEO standing: No domain authority, no rankings, no penalties. Greenfield domain.
- Page speed: N/A — no frontend deployed

## What Went Wrong (if recovery)
- Root cause: N/A — this is a greenfield build, not a recovery project
- Impact: N/A
- Timeline: N/A
- Recovery attempts: N/A

## Assets to Preserve
- **MASTER_PLAN.md (v2.1):** 63,569-byte comprehensive product spec covering architecture, database schema, API routes, agent pipeline, pricing, phased build plan, unit economics. This is the primary build blueprint — all implementation derives from it.
- **BUSINESS.md:** Business profile with target segment, value proposition, distribution hypothesis, moat analysis, key assumptions. Updated by PM after each iteration.
- **DECISIONS.md:** Append-only decision log with 5+ entries (DEC-000 through DEC-004+). Records architectural rationale. Must not be overwritten.
- **Ultra Start Template orchestrator (orchestrator/):** 2,678 lines of shell across 12 files — full-pipeline.sh (1,085 lines), pom.sh, rebuild.sh, and lib/ modules (bootstrap, trio, checkpoint, classify, run-llm, etc.). This is the build system, not application code.
- **INTAKE-BRIEF.md:** Scoped refactor brief for template library extraction (bootstrap.sh, trio.sh, checkpoint.sh, classify.sh). Defines what to extract and what to preserve.
- **Test suite (tests/):** 4 bats files + 2 pytest files + fixtures + vendor submodules (bats-core, bats-assert, bats-support). Validates template orchestrator behavior.
- **Quality tooling (quality/):** Pre-commit multi-LLM hook, review protocol, watcher launchd plist.
- **AutoUX (autoux/):** Self-improvement loop — run.py, evaluate.py, self_improve.py, setup.py. Template-level autonomous improvement system.
- **OpenClaw config (.openclaw/openclaw.json):** Agent engine configuration.
- **CI workflows (.github/workflows/):** ci.yml (lint + test) + template-contamination-gate.yml. Must be preserved and extended for application CI.

## Assets to Discard
- **src/ (empty directory):** Placeholder only — contains no files. Will be replaced by actual application code structured as a monorepo per MASTER_PLAN.md §14.1.
- **public/ (empty directory):** Placeholder only — will be populated during frontend build.
- **graphify-out/:** Knowledge graph output from a previous analysis run. Can be regenerated on demand.
- **DEC-000 (example decision):** Marked for deletion in DECISIONS.md once real decisions are recorded (real decisions DEC-001+ already exist, so DEC-000 example can be removed).

## Summary

This is a **greenfield application build** on top of an existing **template/build-system codebase**. The Ultra Start Template (orchestrator, quality, autoux, tests, CI) is fully functional and should be preserved as-is. Zero application code exists — no frontend, no backend, no database, no infrastructure. The entire CivicState product (Next.js frontend, Express API, OpenClaw agent engine, PostgreSQL database, Stripe/Postmark/Clerk integrations) needs to be built from scratch following the detailed specifications in MASTER_PLAN.md v2.1.
