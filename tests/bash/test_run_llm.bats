#!/usr/bin/env bats
# Regression tests for orchestrator/lib/run-llm.sh.
#
# The bugs this file locks in:
#   1. PID orphan: PID=$(run_llm_bg ...) returned a pid that was not a child
#      of the parent shell, so `wait $PID` always failed. Fixed by changing
#      the call pattern to `run_llm_bg ... ; PID=$!`.
#   2. eval+string concat broke multiline prompts. Fixed by using bash arrays
#      via _translate_llm_args.
#   3. Bash 3.2 apostrophe in ${var:-default} default value was a parse
#      error. Fixed by splitting into an if statement.
# Pain points #1 (bash 3.2), #2 (PID orphan), #3 (eval+multiline) from v5 plan.

load 'helpers/common'

setup() {
  setup_mock_env
}

teardown() {
  teardown_mock_env
}

# ─── run_llm_bg: correct usage ───────────────────────────────────────────────

@test "run_llm_bg: correct usage (PID=\$! after call) — wait succeeds" {
  run bash -c "
    set -euo pipefail
    PROJECT_DIR='$SANDBOX'
    PLANNING_DIR='$PROJECT_DIR/.planning'
    CLAUDE_CMD='$CLAUDE_CMD'
    GEMINI_CMD='$GEMINI_CMD'
    CODEX_CMD='$CODEX_CMD'
    MOCK_CALL_LOG='$MOCK_CALL_LOG'
    MOCK_CALL_DIR='$MOCK_CALL_DIR'
    export PROJECT_DIR PLANNING_DIR CLAUDE_CMD GEMINI_CMD CODEX_CMD MOCK_CALL_LOG MOCK_CALL_DIR
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'

    run_llm_bg 'test:bg' claude --print 'hello'
    PID=\$!

    # PID must be numeric
    case \"\$PID\" in
      ''|*[!0-9]*) echo \"PID not numeric: \$PID\"; exit 2 ;;
    esac

    # Critical assertion: wait must NOT error with 'not a child of this shell'
    wait \"\$PID\"
    echo \"wait_rc=\$?\"
  "
  assert_success
  assert_output --partial "wait_rc=0"
}

@test "run_llm_bg: PID is tracked as a child of the caller shell (ps visible)" {
  run bash -c "
    set -euo pipefail
    export CLAUDE_CMD='$CLAUDE_CMD'
    export MOCK_CALL_LOG='$MOCK_CALL_LOG'
    export MOCK_CALL_DIR='$MOCK_CALL_DIR'
    export MOCK_CLAUDE_SLEEP=0.2
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    run_llm_bg 'sleep:bg' claude --print 'slow call'
    PID=\$!
    # While the child is still running, it must be visible in ps
    ps -p \"\$PID\" >/dev/null && echo 'ps sees child'
    wait \"\$PID\"
    echo 'done'
  "
  assert_success
  assert_output --partial "ps sees child"
  assert_output --partial "done"
}

@test "no cmdsub-wrapped run_llm_bg anywhere in orchestrator/" {
  # Source-level regression guard. If someone reverts to PID=\$(run_llm_bg ...)
  # this test fails immediately without needing to run the pipeline.
  # Excludes lib/run-llm.sh itself, where the forbidden pattern is mentioned
  # in the header comment documenting why it's forbidden.
  run bash -c "
    grep -rn 'PID[_A-Z]*=\$(run_llm_bg' '$REPO_ROOT/orchestrator/' \
      --exclude=run-llm.sh | grep -v '^\\s*[^:]*:[0-9]*:\\s*#'
  "
  # bash -c exits 1 when the final grep finds no offending lines (good).
  # A successful find means a live call site was introduced → fail.
  [ "$status" -ne 0 ]
}

# ─── run_llm / _translate_llm_args: argument preservation ────────────────────

@test "run_llm: claude --print gets translated to --system-prompt + --max-turns + --print" {
  run bash -c "
    set -euo pipefail
    export CLAUDE_CMD='$CLAUDE_CMD'
    export MOCK_CALL_LOG='$MOCK_CALL_LOG'
    export MOCK_CALL_DIR='$MOCK_CALL_DIR'
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    run_llm 'test' claude --print 'the prompt'
  "
  assert_success
  assert_mock_called "claude"
  assert_mock_call_contains "claude" "--system-prompt"
  assert_mock_call_contains "claude" "--max-turns"
  assert_mock_call_contains "claude" "the prompt"
}

@test "run_llm: gemini --print gets translated to --approval-mode yolo -p" {
  run bash -c "
    set -euo pipefail
    export GEMINI_CMD='$GEMINI_CMD'
    export MOCK_CALL_LOG='$MOCK_CALL_LOG'
    export MOCK_CALL_DIR='$MOCK_CALL_DIR'
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    run_llm 'test' gemini --model foo --print 'the prompt'
  "
  assert_success
  assert_mock_call_contains "gemini" "--approval-mode"
  assert_mock_call_contains "gemini" "yolo"
  assert_mock_call_contains "gemini" "-p"
  # Original --print must NOT have leaked through
  run grep -c " --print " "$MOCK_CALL_LOG"
  assert_output "0"
}

@test "run_llm: codex --print gets translated to exec --full-auto" {
  run bash -c "
    set -euo pipefail
    export CODEX_CMD='$CODEX_CMD'
    export MOCK_CALL_LOG='$MOCK_CALL_LOG'
    export MOCK_CALL_DIR='$MOCK_CALL_DIR'
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    run_llm 'test' codex --print 'the prompt'
  "
  assert_success
  assert_mock_call_contains "codex" "exec"
  assert_mock_call_contains "codex" "--full-auto"
}

# ─── Multiline prompt preservation (regression for eval+concat bug) ──────────

@test "run_llm: multiline prompt is preserved (no eval string mangling)" {
  # Pain point #3: previously run_llm used eval+concat and broke multiline.
  local multiline=$'line one\nline two\n  indented line'
  run bash -c "
    set -euo pipefail
    export CLAUDE_CMD='$CLAUDE_CMD'
    export MOCK_CALL_LOG='$MOCK_CALL_LOG'
    export MOCK_CALL_DIR='$MOCK_CALL_DIR'
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    run_llm 'test' claude --print \"$multiline\"
  "
  assert_success
  # The mock should have received the full multiline argv — check the
  # call detail file for 'indented line'
  run grep -r "indented line" "$MOCK_CALL_DIR"
  assert_success
}

@test "run_llm: prompt with single quote passes through untouched" {
  # Single quote in prompt (would break naive eval)
  local prompt="What's the answer?"
  run bash -c "
    set -euo pipefail
    export CLAUDE_CMD='$CLAUDE_CMD'
    export MOCK_CALL_LOG='$MOCK_CALL_LOG'
    export MOCK_CALL_DIR='$MOCK_CALL_DIR'
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    run_llm 'test' claude --print \"$prompt\"
  "
  assert_success
  run grep -F "What's the answer?" "$MOCK_CALL_LOG"
  assert_success
}

# ─── Source-level guards (eval ban) ─────────────────────────────────────────

@test "run-llm.sh: uses bash arrays, not eval" {
  run grep -nE "^\\s*eval\\b" "$REPO_ROOT/orchestrator/lib/run-llm.sh"
  [ "$status" -eq 1 ]  # no matches → good
}

# ─── Late-bound CLI env vars ─────────────────────────────────────────────────

@test "_translate_llm_args: respects CLAUDE_CMD override" {
  run bash -c "
    export CLAUDE_CMD=/custom/path/to/claude
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    _translate_llm_args claude --print 'test'
    printf '%s\n' \"\${_LLM_CMD_ARGS[0]}\"
  "
  assert_output --partial "/custom/path/to/claude"
}

@test "_translate_llm_args: respects GEMINI_CMD override" {
  run bash -c "
    export GEMINI_CMD=/custom/gemini
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    _translate_llm_args gemini --print 'test'
    printf '%s\n' \"\${_LLM_CMD_ARGS[0]}\"
  "
  assert_output --partial "/custom/gemini"
}

@test "_translate_llm_args: respects CODEX_CMD override" {
  run bash -c "
    export CODEX_CMD=/custom/codex
    source '$REPO_ROOT/orchestrator/lib/run-llm.sh'
    _translate_llm_args codex --print 'test'
    printf '%s\n' \"\${_LLM_CMD_ARGS[0]}\"
  "
  assert_output --partial "/custom/codex"
}
