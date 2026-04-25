# Ultra Start Template — Dogfood Refactor

## What This Is

An internal refactor of the Ultra Start Template (UST) that extracts shared shell plumbing from orchestrator scripts into dedicated library modules under `orchestrator/lib/`. The extraction work is already complete — this milestone is verification and two low-cost risk mitigations.

## Core Value

Confirm that the library extraction is correct and all 52+ existing tests pass, validating that shared plumbing was extracted without changing runtime behavior.

## Requirements

### Validated

- ✓ Library files extracted to `orchestrator/lib/` — existing (bootstrap.sh, trio.sh, checkpoint.sh, classify.sh)
- ✓ All orchestrator scripts source shared bootstrap.sh — existing (full-pipeline.sh, pom.sh, rebuild.sh)
- ✓ Source-order DAG is clean — existing (bootstrap → {run-llm, checkpoint, classify, model-routing-defaults} → trio)
- ✓ Bash 3.2 compatibility enforced — existing (2 dedicated bats tests)
- ✓ Test infrastructure in place — existing (30 bats + 22 pytest, Makefile bridge)
- ✓ Lint infrastructure in place — existing (ShellCheck + shfmt in Makefile)
- ✓ CI pipeline operational — existing (GitHub Actions runs bats + pytest + shellcheck)

### Active

- [ ] Source-order smoke test added to verify full lib chain
- [ ] Header warning added to classify.sh documenting implicit dependency
- [ ] Full test suite passes (`make test && make lint`)
- [ ] All extraction verified correct against Intake Brief

### Out of Scope

- Full 19-module step split — deferred to `refactor/step-module-split-v1`
- Gate implementations (`orchestrator/lib/gates/*.sh`) — deferred
- `orchestrator/run_review.sh` with re-prompt loop — deferred
- `quality/pre-commit-multi-llm.sh` fast-mode rewrite — deferred
- `scripts/rollback-on-fail.sh` — deferred
- `.github/workflows/dogfood.yml` — deferred
- Structured logging — deferred
- Checkpoint hardening / wiring checkpoint.sh into dispatch — deferred (unanimous consensus: Intake Brief is explicit)
- `autoux/` rewrite — deferred
- Function namespacing (ust_ prefix) — rejected for this milestone (unanimous consensus: internal tool, override pattern is intentional, scope discipline)

## Context

- **Type:** Internal developer tooling refactor — no user data, no secrets, no compliance requirements
- **Branch:** Building on Branch 1 foundation (tests + lint + CI + branch protection)
- **Stack:** Bash 3.2 (macOS-compatible), bats-core + pytest testing, ShellCheck + shfmt linting, GitHub Actions CI
- **State:** All 4 library files already extracted and following consistent module contracts. Research synthesis confirms "the remaining work is verification, not implementation."
- **Risk #1:** `classify.sh` has implicit dependency on `full-pipeline.sh` run_* functions — mitigated by header warning (Decision approved)
- **Risk #3:** Source-ordering regression — mitigated by smoke test (Decision approved)
- **Proprietary headers:** Preserve `© 2026 Sir KoKo, LLC` when creating/modifying files

## Constraints

- **Bash 3.2**: Must maintain macOS compatibility — no associative arrays, `${var^^}`, `mapfile`, or other bash 4+ features. Enforced by 2 dedicated bats tests.
- **Behavior unchanged**: Extract shared plumbing without changing runtime behavior of any orchestrator script.
- **Scope**: At most 2-3 GSD phases. Any phase touching files outside v1 list = scope creep, reject immediately.
- **Override pattern**: `pom.sh` and `rebuild.sh` deliberately override `log()` after sourcing `bootstrap.sh`. Do not add `readonly` to log functions.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Leave checkpoint.sh deferred | Intake Brief is explicit; wiring changes behavior; no test coverage for integration paths | — Pending |
| Add source-order smoke test | Two research tracks recommend; <20 LOC; catches "command not found" regressions; Risk #3 mitigation | — Pending |
| Add classify.sh header warning | Highest-severity risk (#1); zero cost; follows existing header-comment convention | — Pending |
| Keep bare function names (no namespacing) | Internal tool, not public library; override pattern is intentional; rename is scope creep | — Pending |
| Verification = `make test && make lint` | Intake Brief designates existing test suite; all 3 tracks confirm adequate; CI runs same gate | — Pending |
| Scope boundary: v1 = verify + 2 mitigations | Intake Brief is scope authority; GSD should produce ≤3 phases | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-25 after initialization*
