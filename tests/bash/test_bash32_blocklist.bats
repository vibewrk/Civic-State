#!/usr/bin/env bats
# bash 3.2 feature blocklist — grep-guard against features that don't work
# on macOS system bash (3.2.57). Per Gemini v2 MAJOR #7 and Codex v4 MAJOR #1.
#
# Forbidden features:
#   declare -A         — associative arrays (bash 4+)
#   mapfile / readarray — bash 4+
#   ${arr[-1]}         — negative array indexing (bash 4.3+)
#   coproc             — bash 4+
#   |&                 — stderr+stdout redirect shortcut (bash 4+)
#
# This test runs on whatever bash is available locally AND on the macOS CI
# runner, so it catches additions before they reach users.

load 'helpers/common'

# The source dirs we enforce this against. Excludes tests/vendor/ (third-party)
# and node_modules/.
SOURCE_DIRS=(
  "$REPO_ROOT/orchestrator"
  "$REPO_ROOT/quality"
  "$REPO_ROOT/scripts"
  "$REPO_ROOT/tests/bash"
)

_grep_in_sources() {
  local pattern="$1"
  # Use POSIX grep -n; restrict to .sh and .bash files; ignore binary, submodules
  find "${SOURCE_DIRS[@]}" -type f \( -name '*.sh' -o -name '*.bash' \) \
    -not -path '*/vendor/*' 2>/dev/null \
    | xargs -I{} grep -nE "$pattern" {} 2>/dev/null \
    || true
}

@test "no 'declare -A' (associative arrays — bash 4+)" {
  run _grep_in_sources 'declare\s+-A\b'
  # Expect zero matches — output should be empty
  [ -z "$output" ]
}

@test "no 'mapfile' (bash 4+)" {
  run _grep_in_sources '\bmapfile\b'
  [ -z "$output" ]
}

@test "no 'readarray' (bash 4+)" {
  run _grep_in_sources '\breadarray\b'
  [ -z "$output" ]
}

@test "no 'coproc' (bash 4+)" {
  run _grep_in_sources '\bcoproc\b'
  [ -z "$output" ]
}

@test "no '|&' stderr+stdout redirect shortcut (bash 4+)" {
  # Exclude comments; pipe2err pattern is `|&` as a bare operator
  run _grep_in_sources '[^|]\|&'
  # This is trickier — lots of false positives possible. For now, accept
  # that the pattern is rare and catch obvious uses only.
  # Empty output = pass.
  [ -z "$output" ]
}

@test "no negative array indexing \${arr[-1]}" {
  run _grep_in_sources '\$\{[A-Za-z_][A-Za-z0-9_]*\[-[0-9]+\]\}'
  [ -z "$output" ]
}
