# Intake Brief — Dogfood Refactor

**Type:** internal refactor of this template itself
**Date:** 2026-04-10

## Scope

Add bootstrap extraction and remaining structural improvements to the
Ultra Start Template, building on the Branch 1 foundation (tests + lint
+ CI + branch protection).

## Goals

1. Extract shared plumbing from `orchestrator/full-pipeline.sh` into
   dedicated library modules under `orchestrator/lib/`:
   - `bootstrap.sh` — path resolution, constants, color defs, loggers
   - `trio.sh` — the `run_trio()` function
   - `checkpoint.sh` — checkpoint/resume helpers
   - `classify.sh` — protocol classifier + `--protocol` override logic

2. Reduce duplication across `full-pipeline.sh`, `pom.sh`, `rebuild.sh`
   by having all three source the shared `bootstrap.sh` instead of
   redeclaring the same color codes and log functions.

3. Verify every extraction with the existing bats + pytest test suite
   (30 bats + 22 pytest from Branch 1).

## Preserve

- `orchestrator/full-pipeline.sh` — keeps all 19 `run_<step>` functions
  and the top-level `case` dispatcher inside `main()`. Only shared
  plumbing is extracted.
- `orchestrator/pom.sh` — behavior unchanged, sources bootstrap.sh
- `orchestrator/rebuild.sh` — behavior unchanged, sources bootstrap.sh
- `orchestrator/lib/run-llm.sh` — already extracted, no changes
- `autoux/`, `.claude/`, `.gemini/`, `.codex/` — untouched
- All tests, lint configs, CI from Branch 1

## Allowed to create

- `orchestrator/lib/bootstrap.sh`
- `orchestrator/lib/trio.sh`
- `orchestrator/lib/checkpoint.sh`
- `orchestrator/lib/classify.sh`

## Out of scope

- Full 19-module step split (deferred to `refactor/step-module-split-v1`)
- Gate implementations (`orchestrator/lib/gates/*.sh`)
- `orchestrator/run_review.sh` with re-prompt loop
- `quality/pre-commit-multi-llm.sh` fast-mode rewrite
- `scripts/rollback-on-fail.sh`
- `.github/workflows/dogfood.yml`
- Structured logging, checkpoint hardening, autoux rewrite
