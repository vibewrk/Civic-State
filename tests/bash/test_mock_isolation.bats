#!/usr/bin/env bats
# Meta-test: proves CLAUDE_CMD / GEMINI_CMD / CODEX_CMD env var injection
# is the isolation mechanism — NOT PATH shadowing. This test catches the
# specific reviewer concern that tests could silently escape to real CLIs
# if we relied on $PATH after orchestrator scripts cached `command -v`.

load 'helpers/common'

setup() {
  setup_mock_env
}

teardown() {
  teardown_mock_env
}

@test "setup_mock_env sets CLAUDE_CMD to the stub absolute path" {
  [ -n "$CLAUDE_CMD" ]
  [ "$CLAUDE_CMD" = "$REPO_ROOT/tests/fixtures/stubs/claude" ]
  [ -x "$CLAUDE_CMD" ]
}

@test "setup_mock_env sets GEMINI_CMD to the stub absolute path" {
  [ -n "$GEMINI_CMD" ]
  [ "$GEMINI_CMD" = "$REPO_ROOT/tests/fixtures/stubs/gemini" ]
  [ -x "$GEMINI_CMD" ]
}

@test "setup_mock_env sets CODEX_CMD to the stub absolute path" {
  [ -n "$CODEX_CMD" ]
  [ "$CODEX_CMD" = "$REPO_ROOT/tests/fixtures/stubs/codex" ]
  [ -x "$CODEX_CMD" ]
}

@test "claude stub records its call to MOCK_CALL_LOG" {
  run "$CLAUDE_CMD" --print "hello world"
  assert_success
  assert_output "ok"
  assert_mock_called "claude"
  assert_mock_call_contains "claude" "hello world"
}

@test "gemini stub records its call to MOCK_CALL_LOG" {
  run "$GEMINI_CMD" --model gemini-3.1-pro-preview -p "test prompt"
  assert_success
  assert_mock_called "gemini"
  assert_mock_call_contains "gemini" "test prompt"
}

@test "codex stub records its call to MOCK_CALL_LOG" {
  run "$CODEX_CMD" exec --full-auto "test"
  assert_success
  assert_mock_called "codex"
}

@test "scripted MOCK_CLAUDE_EXIT makes claude stub fail" {
  MOCK_CLAUDE_EXIT=7 run "$CLAUDE_CMD" --print "hello"
  [ "$status" -eq 7 ]
}

@test "scripted MOCK_CLAUDE_STDOUT overrides default output" {
  MOCK_CLAUDE_STDOUT="custom output" run "$CLAUDE_CMD" --print "hello"
  assert_success
  assert_output "custom output"
}

@test "stub creates destination file when argv contains known path pattern" {
  mkdir -p "$SANDBOX/.planning/pom/test"
  run "$CLAUDE_CMD" --print "Write your answer to $SANDBOX/.planning/pom/test/opus.md"
  assert_success
  [ -f "$SANDBOX/.planning/pom/test/opus.md" ]
}

@test "mock_call_count returns 0 initially and increments with calls" {
  [ "$(mock_call_count claude)" = "0" ]
  "$CLAUDE_CMD" --print "call 1" >/dev/null
  [ "$(mock_call_count claude)" = "1" ]
  "$CLAUDE_CMD" --print "call 2" >/dev/null
  [ "$(mock_call_count claude)" = "2" ]
}
