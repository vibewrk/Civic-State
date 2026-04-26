#!/usr/bin/env bats
# Parse every .sh file in the project with `bash -n` using whatever bash is
# on $PATH. On macOS CI runners (macos-latest), /bin/bash is 3.2, so this
# test is the specific catcher for pain point #1 (bash 3.2 parse errors in
# template scripts like ${var:-default with 'apostrophe'}).
#
# Uses `find` instead of ** globstar because bash 3.2 has no globstar and
# the glob would silently skip nested directories — per Codex v4 MAJOR #1.

load 'helpers/common'

@test "every .sh file parses under the current bash (macOS CI = 3.2)" {
  # Use while-read + process substitution so filenames with spaces work
  # (the repo path can contain spaces like 'Ultra Start Template').
  local failures=0
  local f
  local errfile="$BATS_TEST_TMPDIR/bash-n-err"
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if ! bash -n "$f" 2>"$errfile"; then
      echo "PARSE FAIL: $f"
      cat "$errfile"
      failures=$((failures + 1))
    fi
  done < <(
    find \
      "$REPO_ROOT/orchestrator" \
      "$REPO_ROOT/quality" \
      "$REPO_ROOT/scripts" \
      "$REPO_ROOT/tests/bash" \
      "$REPO_ROOT/tests/fixtures/stubs" \
      -type f \( -name '*.sh' -o -name '*.bash' \) 2>/dev/null
  )
  [ "$failures" -eq 0 ]
}

@test "executable stubs pass bash -n" {
  for f in "$REPO_ROOT/tests/fixtures/stubs/claude" \
           "$REPO_ROOT/tests/fixtures/stubs/gemini" \
           "$REPO_ROOT/tests/fixtures/stubs/codex"; do
    bash -n "$f" || { echo "PARSE FAIL: $f"; return 1; }
  done
}
