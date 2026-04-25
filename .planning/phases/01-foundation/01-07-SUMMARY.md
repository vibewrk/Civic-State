---
phase: 01-foundation
plan: 07
subsystem: cicd-infra-delivery
tags: [github-actions, ci-cd, docker, ghcr, backup, dns, spf, dkim, dmarc, postmark, bullmq, submissions]
dependency_graph:
  requires:
    - phase: 01-foundation-02
      provides: prisma-schema, shared-types
    - phase: 01-foundation-03
      provides: docker-compose-stack, api-dockerfile, worker-dockerfile
    - phase: 01-foundation-04
      provides: clerk-backend-auth, health-endpoint
    - phase: 01-foundation-05
      provides: agent-config, flow-producer, classifier-agent
    - phase: 01-foundation-06
      provides: sentry-frontend, sentry-backend
  provides:
    - ci-pipeline
    - deploy-pipeline
    - backup-script
    - dns-setup-docs
    - submission-test-endpoint
    - postmark-test-endpoint
    - job-status-endpoint
  affects: [all-pr-checks, production-deployment, email-deliverability, end-to-end-testing]
tech_stack:
  added: []
  patterns: [github-actions-services, ghcr-image-push, ssh-deploy-with-rollback, s3cmd-backup, bullmq-queue-from-api]
key_files:
  created:
    - .github/workflows/ci.yml
    - .github/workflows/deploy.yml
    - scripts/backup.sh
    - scripts/setup-dns.md
    - apps/api/src/routes/submissions.ts
  modified:
    - apps/api/src/index.ts
key_decisions:
  - "Replaced template ci.yml with application-level CI (pnpm + Prisma + typecheck + test)"
  - "Test submission endpoint uses placeholder user with upsert to satisfy FK constraint"
  - "Zod v4 uses .issues not .errors for validation error details"
patterns_established:
  - "CI with PostgreSQL 16 + Redis 7 service containers for integration tests"
  - "Deploy with GHCR image push, SSH deploy to droplet, health check, and rollback"
  - "API endpoints can enqueue BullMQ jobs via own Queue instance (no worker import)"
requirements_completed: [INFRA-03, INFRA-08, DLVR-03, DLVR-04]
metrics:
  duration: 4min
  completed: 2026-04-25
  tasks_completed: 3
  tasks_total: 3
  files_created: 5
  files_modified: 1
---

# Phase 01 Plan 07: CI/CD + Backup + DNS + Submission Endpoint Summary

**GitHub Actions CI/CD (PR checks with Postgres/Redis services, GHCR deploy with rollback), pg_dump backup to DO Spaces, SPF/DKIM/DMARC DNS docs with domain warming strategy, and test submission endpoint with BullMQ enqueue and Postmark ping.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-25T22:14:12Z
- **Completed:** 2026-04-25T22:18:54Z
- **Tasks:** 3 (2 auto + 1 checkpoint auto-approved)
- **Files modified:** 6

## Accomplishments
- CI workflow runs lint, typecheck, and unit tests on PRs with PostgreSQL 16 and Redis 7 service containers
- Deploy workflow builds Docker images, pushes to GHCR with git SHA tags, SSHes to droplet, health checks, and rolls back on failure
- Database backup script with pg_dump from Docker container, upload to DigitalOcean Spaces, 30-day retention with automated cleanup
- SPF/DKIM/DMARC DNS documentation for civicstate.com with complete Postmark domain verification steps
- Domain warming strategy documented: warming begins when Clerk transactional emails route through Postmark post-deployment
- Test submission endpoint creates submission + job in DB, enqueues classifier via BullMQ (no worker import), returns status
- Postmark test email endpoint for verifying domain warming pipeline readiness

## Task Commits

Each task was committed atomically:

1. **Task 1: Create GitHub Actions CI and Deploy workflows** - `04ad928` (feat)
2. **Task 2: Create backup script, DNS setup docs, submission endpoint, Postmark test** - `44341df` (feat)
3. **Task 3: Checkpoint (auto-approved)** - No commit (verification checkpoint)

## Files Created/Modified
- `.github/workflows/ci.yml` - PR check pipeline: pnpm install, Prisma generate, typecheck, lint, unit tests with Postgres+Redis services
- `.github/workflows/deploy.yml` - Main branch deploy: GHCR image push, SSH deploy to DigitalOcean, health check, rollback
- `scripts/backup.sh` - pg_dump from Docker container, gzip, upload to DO Spaces, 30-day retention cleanup
- `scripts/setup-dns.md` - SPF/DKIM/DMARC record setup, Postmark verification steps, domain warming strategy
- `apps/api/src/routes/submissions.ts` - POST /api/submissions (test flow), GET /api/submissions/:id/status, POST /api/test/postmark-ping
- `apps/api/src/index.ts` - Mounted submissionsRouter after healthRouter

## Decisions Made
- Replaced the Ultra Start Template ci.yml (shell/python tests) with application-level CI since this file path is specified by the plan for the CivicState application CI
- Test submission endpoint upserts a placeholder test user (UUID zeros) to satisfy the Prisma FK constraint on Submission.userId -- production Phase 2 uses authenticated Clerk userId
- Used Zod v4 `.issues` property instead of `.errors` for validation error details

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Zod v4 .errors property does not exist**
- **Found during:** Task 2 (typecheck)
- **Issue:** `err.errors` does not exist on `ZodError` in Zod v4; the property is `err.issues`
- **Fix:** Changed `.errors` to `.issues` in the catch block
- **Files modified:** apps/api/src/routes/submissions.ts
- **Committed in:** 44341df

**2. [Rule 1 - Bug] Prisma FK constraint requires user for submission**
- **Found during:** Task 2 (typecheck)
- **Issue:** `Submission.create` requires `userId` which references a `User` record (FK constraint). The plan's code omitted this field.
- **Fix:** Added test user upsert (UUID zeros, clerkId 'test_placeholder') before submission creation. Documented as test-only.
- **Files modified:** apps/api/src/routes/submissions.ts
- **Committed in:** 44341df

---

**Total deviations:** 2 auto-fixed (2 bugs)
**Impact on plan:** Both fixes necessary for TypeScript compilation and runtime correctness. No scope creep.

## Known Stubs

| File | Line | Stub | Reason |
|------|------|------|--------|
| apps/api/src/routes/submissions.ts | 44-55 | Placeholder test user with UUID zeros | Phase 2 replaces with authenticated Clerk userId |
| apps/api/src/routes/submissions.ts | 46 | Tier 1 fields stored unencrypted | Explicitly documented as test-only; Phase 2 adds CryptoService encryption |

Both stubs are intentional and documented in code comments. They do not prevent the plan's goal (end-to-end agent pipeline verification).

## Threat Flags

None -- all files created match the threat model boundaries defined in the plan (T-01-22 through T-01-27).

## Issues Encountered
None

## User Setup Required
None - CI/CD workflows use GitHub Actions secrets (DROPLET_HOST, DROPLET_USER, DROPLET_SSH_KEY) which need to be configured in the GitHub repository settings before first deploy. DNS records need to be created at the domain registrar per scripts/setup-dns.md.

## Next Phase Readiness
- Phase 1 foundation is complete: monorepo, database, Docker, auth, agent engine, frontend, CI/CD, backups, DNS docs
- CI/CD pipelines ready for first PR and first deploy to DigitalOcean
- Domain warming can begin once Clerk is configured to route through Postmark and DNS records are live
- End-to-end test flow available via POST /api/submissions

## Self-Check: PASSED

---
*Phase: 01-foundation*
*Completed: 2026-04-25*
