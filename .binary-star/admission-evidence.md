# Binary Star Admission Evidence

## Admission

- Repository: `vibewrk/Civic-State`
- Issue: `#1` - Factory admission: Civic-State (brownfield)
- Admission type: brownfield
- Lifecycle phase: `BUILD`
- Verified HEAD: `5e30dbef98cff23f82e2be39eb0c5af634302d4d`
- Currency preflight: `/Users/billyprice/.binary-star/claim-runtime/claims/vibewrk-civic-state/issue-1/billy-mm-m4-54649/CURRENCY.md`
- Context mode: issue-schema-v1; no BinaryClaw `.context` packet was provided

## Adopted Thesis

- `MASTER_PLAN.md` version 2.1 is the primary business/build thesis.
- `.planning/PROJECT.md`, `.planning/ROADMAP.md`, and `.planning/STATE.md` are adopted as the existing planning context.
- Admission did not modify `MASTER_PLAN.md`, `.planning/`, product source files, or claim `.context` files.

## Added Runtime Scaffolding

- `.binary-star/progress.json`
- `.binary-star/lifecycle.json`
- `.ultra-start/lifecycle-phase.json`
- `.binary-star/admission-evidence.md`

## Readiness Fix

- Added `express-rate-limit` to `apps/api/package.json` and `pnpm-lock.yaml` because `apps/api/src/routes/officials.ts` imports it at runtime and the missing dependency blocked `pnpm -r run typecheck`.

## Verification Log

| Command | Result | Notes |
| --- | --- | --- |
| `git rev-parse HEAD` | passed | Matched currency preflight HEAD. |
| `pnpm install --frozen-lockfile` | passed | Installed from existing lockfile. Prisma emitted a Node support warning because local Node is `v25.8.1`; the install still completed. |
| `cd packages/shared && pnpm generate` | passed | Generated Prisma Client 7.8.0. |
| `pnpm -r run typecheck` | passed after readiness fix | Initial run failed on missing `express-rate-limit`; rerun passed after adding the API dependency. |
| `pnpm -r run build` | passed | Web, API, and worker builds completed. Web build emitted existing Sentry configuration/deprecation warnings. |
| `pnpm -r run test` | passed | API and worker used `vitest run --passWithNoTests`; no test files were present in those workspace test globs. |
| `pnpm -r run lint` | failed, non-blocking | Optional check failed because `apps/web` runs deprecated `next lint`, which prompts to configure ESLint interactively. CI already treats lint as less reliable per approved plan. |
| `git status --short` | passed with noted runtime-local files | Intended changes are admission scaffolding, captured proposal ledger updates, and the API dependency fix. Pre-existing untracked `.binary-star/plans/*` and `cache/` remain present. |

## Admission Notes

- The root `package.json` declares Ultra Start bin entries for `./bin/ultra-start-init.js` and `./bin/ultra-start-upgrade.js`, but `bin/` is absent in this checkout. This is recorded as admission context and was not patched because product/runtime script repair is outside the approved admission scope.
- Planning metadata has an existing inconsistency between `.planning/STATE.md` and `.planning/ROADMAP.md`; it was captured in `.binary-star/proposals/1.jsonl` and was not reconciled inline.
- Optional lint migration and Sentry instrumentation warnings were captured in `.binary-star/proposals/1.jsonl` because they are outside the admission slice and did not block build/test verification.

## Currency Check

Repo/context appears current enough for this admission slice. `CURRENCY.md` was generated on 2026-06-03T14:03:18Z, local HEAD matches the preflight default branch HEAD, no open PRs were visible in the preflight, and this work does not depend on production analytics, account truth, or stale external state.
