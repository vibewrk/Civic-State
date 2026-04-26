# tests/bash/helpers/common.bash — shared bats test harness.
#
# Provides setup_mock_env / teardown_mock_env that isolate each test:
#   - Creates a per-test sandbox under $BATS_TEST_TMPDIR
#   - Symlinks orchestrator scripts into the sandbox
#   - Late-binds CLAUDE_CMD / GEMINI_CMD / CODEX_CMD env vars at absolute
#     paths to the stub CLIs (NOT PATH shadowing — see tests/bash/test_mock_isolation.bats)
#   - Resets the mock call log
#
# Usage in a .bats file:
#   load 'helpers/common'
#   setup() { setup_mock_env; }
#   teardown() { teardown_mock_env; }

load '../vendor/bats-support/load'
load '../vendor/bats-assert/load'

# REPO_ROOT resolves to the repo root regardless of where bats is invoked from.
# BATS_TEST_DIRNAME is set by bats to the directory containing the .bats file.
REPO_ROOT="$(cd "$BATS_TEST_DIRNAME/../.." && pwd)"
export REPO_ROOT

setup_mock_env() {
  # Per-test sandbox directory (bats provides BATS_TEST_TMPDIR)
  export SANDBOX="$BATS_TEST_TMPDIR/sandbox"
  export PROJECT_DIR="$SANDBOX"
  export PLANNING_DIR="$SANDBOX/.planning"

  mkdir -p "$SANDBOX/.planning/pom" "$SANDBOX/orchestrator"

  # Symlink orchestrator code into the sandbox so PROJECT_DIR resolves to
  # $SANDBOX when the scripts are sourced and run.
  ln -sf "$REPO_ROOT/orchestrator/full-pipeline.sh" "$SANDBOX/orchestrator/"
  ln -sf "$REPO_ROOT/orchestrator/pom.sh" "$SANDBOX/orchestrator/"
  ln -sf "$REPO_ROOT/orchestrator/rebuild.sh" "$SANDBOX/orchestrator/"
  ln -sf "$REPO_ROOT/orchestrator/lib" "$SANDBOX/orchestrator/lib"
  if [ -f "$REPO_ROOT/orchestrator/model-routing.env" ]; then
    ln -sf "$REPO_ROOT/orchestrator/model-routing.env" "$SANDBOX/orchestrator/"
  fi

  # v2: late-bound CLI injection (NOT PATH shadowing).
  # This works even when orchestrator scripts cache command -v results
  # because Phase 0 refactored them to honor $CLAUDE_CMD / $GEMINI_CMD / $CODEX_CMD.
  export CLAUDE_CMD="$REPO_ROOT/tests/fixtures/stubs/claude"
  export GEMINI_CMD="$REPO_ROOT/tests/fixtures/stubs/gemini"
  export CODEX_CMD="$REPO_ROOT/tests/fixtures/stubs/codex"

  # Mock state dirs — stubs append here
  export MOCK_CALL_LOG="$BATS_TEST_TMPDIR/mock-calls.log"
  export MOCK_CALL_DIR="$BATS_TEST_TMPDIR/mock-call-details"
  mkdir -p "$MOCK_CALL_DIR"
  : >"$MOCK_CALL_LOG"

  # Fast mode: stubs return immediately unless a test explicitly scripts a delay
  export MOCK_CLAUDE_SLEEP=0
  export MOCK_GEMINI_SLEEP=0
  export MOCK_CODEX_SLEEP=0
  export MOCK_CLAUDE_EXIT=0
  export MOCK_GEMINI_EXIT=0
  export MOCK_CODEX_EXIT=0
}

teardown_mock_env() {
  : # bats auto-cleans BATS_TEST_TMPDIR
}

# Assertion helper: was a given CLI called at least once?
assert_mock_called() {
  local cli="$1"
  if ! grep -q "^$cli " "$MOCK_CALL_LOG" 2>/dev/null; then
    echo "Expected mock '$cli' to have been called. Call log:"
    cat "$MOCK_CALL_LOG" 2>/dev/null || echo "(empty)"
    return 1
  fi
}

# Assertion helper: the given CLI was called with a specific substring in argv
assert_mock_call_contains() {
  local cli="$1" substring="$2"
  if ! grep -F -- "$substring" "$MOCK_CALL_LOG" 2>/dev/null | grep -q "^$cli "; then
    echo "Expected mock '$cli' call containing '$substring'. Call log:"
    cat "$MOCK_CALL_LOG" 2>/dev/null || echo "(empty)"
    return 1
  fi
}

# Count calls to a given CLI (returns "0" on empty log, not "0\n0")
mock_call_count() {
  local cli="$1"
  local n
  if [ ! -f "$MOCK_CALL_LOG" ]; then
    echo 0
    return 0
  fi
  # grep -c exits 1 on no match, but we want the count regardless
  n=$(grep -c "^$cli " "$MOCK_CALL_LOG" 2>/dev/null) || n=0
  echo "${n:-0}"
}
