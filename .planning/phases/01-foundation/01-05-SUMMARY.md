---
phase: 01-foundation
plan: 05
subsystem: openclaw-agent-engine
tags: [bullmq, agents, state-machine, redis, worker, orchestration]
dependency_graph:
  requires: [pnpm-workspaces, prisma-schema, crypto-service, hmac-utilities, shared-types]
  provides: [redis-connection-factory, job-state-machine, agent-config, flow-producer, agent-logger, classifier-agent, researcher-agent, drafter-agent, delivery-agent, treasury-agent, worker-bootstrap]
  affects: [apps-worker, apps-api]
tech_stack:
  added: []
  patterns: [bullmq-flow-producer, parent-child-jobs, per-instance-redis-connections, state-machine-transitions, hmac-logged-actions]
key_files:
  created:
    - apps/worker/src/engine/connection.ts
    - apps/worker/src/engine/config.ts
    - apps/worker/src/engine/state-machine.ts
    - apps/worker/src/engine/flow-producer.ts
    - apps/worker/src/lib/logger.ts
    - apps/worker/src/agents/classifier.ts
    - apps/worker/src/agents/researcher.ts
    - apps/worker/src/agents/drafter.ts
    - apps/worker/src/agents/delivery.ts
    - apps/worker/src/agents/treasury.ts
  modified:
    - apps/worker/src/index.ts
decisions:
  - "Each BullMQ Worker, Queue, and FlowProducer gets its own Redis connection (per BullMQ docs Pitfall 2)"
  - "Treasury agent records ledger entries but does not perform primary state transitions"
  - "FlowProducer creates parent submission job with classifier as first child; additional children added dynamically"
metrics:
  duration: "3 minutes"
  completed: "2026-04-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 10
  files_modified: 1
---

# Phase 01 Plan 05: OpenClaw Agent Engine Summary

**One-liner:** BullMQ FlowProducer orchestration with 9-state job lifecycle machine, 5 agent skeletons (Classifier/Researcher/Drafter/Delivery/Treasury) with configurable Haiku/Sonnet model routing, per-agent Redis connections, and HMAC-secured action logging.

## What Was Built

Created the complete OpenClaw agent engine for CivicState:

- **Redis connection factory** (`connection.ts`): Returns a new Redis instance per call with `maxRetriesPerRequest: null` (BullMQ requirement). Never shared between BullMQ instances per Pitfall 2.
- **Agent configuration** (`config.ts`): All 5 agents with model routing -- Classifier/Delivery/Treasury use Haiku, Researcher/Drafter use Sonnet. `AGENT_MODEL_OVERRIDE` env var forces all agents to one model for testing. Prompt caching keys for system prompts (AGNT-04).
- **Job state machine** (`state-machine.ts`): 9 states per D-20 (submitted, classifying, researching, drafting, payment_pending, paid, delivering, delivered, failed). Validates transitions; logs every transition to agent_action_logs with HMAC checksum.
- **FlowProducer** (`flow-producer.ts`): Parent-child job flows per D-19. Submission is parent job; classifier is first child. Additional children added dynamically after classification.
- **Agent action logger** (`logger.ts`): Logs agent actions with token usage (inputTokens, outputTokens), duration, model used, and HMAC checksum for tamper detection.
- **5 agent workers**: Each creates its own BullMQ Worker with dedicated Redis connection, reads config via `getAgentConfig()`, processes jobs with state transitions and action logging. Phase 1 uses placeholder/mock results; Phase 2 will fill in real Anthropic API calls.
- **Worker bootstrap** (`index.ts`): Imports and registers all 5 workers. Graceful shutdown on SIGTERM/SIGINT closes all workers.

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create OpenClaw engine core | 66f2c69 | engine/connection.ts, engine/config.ts, engine/state-machine.ts, engine/flow-producer.ts, lib/logger.ts |
| 2 | Create 5 agent worker skeletons and wire bootstrap | 607473e | agents/classifier.ts, agents/researcher.ts, agents/drafter.ts, agents/delivery.ts, agents/treasury.ts, index.ts |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript duplicate property in FlowProducer**
- **Found during:** Task 1 (typecheck)
- **Issue:** `submissionId` was specified both explicitly and via spread of `data` object, causing TS2783
- **Fix:** Removed redundant explicit `submissionId` property, kept spread which already includes it
- **Files modified:** apps/worker/src/engine/flow-producer.ts
- **Commit:** 66f2c69

## Verification Results

- TypeScript typechecks pass for worker package (all 11 source files)
- All 5 agent files contain `new Worker` with `createRedisConnection()` (separate connections)
- State machine defines all 9 states with valid transition map
- Config has all 5 agents with correct model assignments (Haiku/Sonnet)
- FlowProducer creates parent-child submission flows
- Worker index registers all 5 agents with graceful shutdown

## Known Stubs

| File | Line | Stub | Reason |
|------|------|------|--------|
| agents/classifier.ts | 20-25 | Mock classification result | Phase 2 will add Anthropic API call |
| agents/researcher.ts | 18-22 | Placeholder research brief | Phase 2 will add research logic |
| agents/drafter.ts | 18-22 | Placeholder letter draft | Phase 2 will add drafting logic |
| agents/delivery.ts | 22-26 | Placeholder email delivery | Phase 3 will add Postmark integration |
| agents/treasury.ts | 21-27 | Placeholder ledger recording | Phase 3 will add real ledger entries |

All stubs are intentional Phase 1 skeletons. Token counts (inputTokens, outputTokens) are set to 0 and will be populated from API responses in Phase 2-3.

## Self-Check: PASSED

All 11 files verified present. Both task commits (66f2c69, 607473e) verified in git log.
