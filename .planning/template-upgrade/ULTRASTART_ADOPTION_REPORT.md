# UltraStart Adoption Report

**Updated:** 2026-06-05
**Template source inspected:** `/Users/billyprice/.binary-star/cache/ultra-start-template/448ed2f0b1d1573ab8ea7d5eab4f3e4790cfed95`
**Template commit:** `448ed2f0`
**Scope:** Issue #20 bounded BUILD execution.

## Summary

CivicState already carries UltraStart-style package scripts for `ultra-start-init`, `ultra-start-upgrade`, manifest checks, pipeline, POM, AutoUX, and quality hooks, but the referenced local directories are absent from the repo. The missing active paths include `bin/`, `orchestrator/`, `quality/`, `autoux/`, and several docs/tooling directories.

This execution did not merge template schema, lifecycle, workflow, authority, runner, credential, or policy files. The claim and POM gate feedback explicitly prohibit ordinary protected-path writes.

## Safe To Adopt In A Follow-Up

These paths appear non-protected and can be copied or manually merged in a dedicated tooling issue if the owner wants the package scripts to work:

| Template path | Purpose | Adoption mode |
|---------------|---------|---------------|
| `bin/ultra-start-init.js` | Template initialization CLI referenced by `package.json`. | Copy if still desired. |
| `bin/ultra-start-upgrade.js` | Template upgrade/manifest CLI referenced by `package.json`. | Copy if still desired. |
| `quality/pre-commit-multi-llm.sh` | Local pre-commit quality hook referenced by `quality:install-hooks`. | Copy/manual review. |
| `quality/review-protocol.md` | Review protocol docs. | Copy/manual review. |
| `autoux/*.py` | AutoUX scripts referenced by package scripts. | Copy/manual review. |
| Selected `docs/*.md` | UltraStart operational docs. | Copy/manual review; avoid overwriting product docs. |
| Selected `orchestrator/*.md` | Planning/orchestration references. | Copy/manual review. |

## Protected Or Authority-Bearing Items

These must remain sidecar-only until explicit elevated authorization is granted:

| Template path | Reason |
|---------------|--------|
| `.ultra-start/**` | Lifecycle, thesis, business, next, and learning authority state. |
| `schemas/**` | Schema authority and validation contracts. |
| `.github/workflows/**` | Active CI/deploy policy. |
| `effective*.json` | Protected change/authority policy. |
| `orchestrator/effective-constitution.md` | Constitutional authority. |
| `orchestrator/model-routing.env` | Runtime model/policy environment. |
| Credential-bearing config | Account/secret authority. |

## Current Package Script Risk

`package.json` declares scripts that currently point at missing files. Running scripts such as `manifest:check`, `upgrade`, `pipeline`, `pom`, `autoux:*`, and `quality:install-hooks` will fail until the corresponding tooling paths are adopted or those scripts are pruned.

This issue records the mismatch but does not change package scripts because doing so could alter project policy and developer workflow outside the roadmap refresh scope.

## Recommended Next Action

Create a dedicated tooling issue to either:

1. Copy non-protected UltraStart tooling paths and verify the declared scripts, while sidecarring protected changes; or
2. Remove stale UltraStart script declarations from `package.json` if CivicState should not carry that tooling.

Do not combine that tooling decision with production launch or product roadmap work.
