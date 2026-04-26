"""Unit tests for scripts/parse-review.py.

Covers the review schema parser's happy path, LLM drift tolerance
(markdown fences, JSON array fallback), manifest validation, schema
validation, dedup across models, and exit-code contract.
"""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
PARSE_REVIEW = REPO_ROOT / "scripts" / "parse-review.py"
FIXTURES = REPO_ROOT / "tests" / "fixtures" / "review"


# ─── Helpers ─────────────────────────────────────────────────────────────────


def _load_module():
    """Load scripts/parse-review.py as a module (it has a hyphen)."""
    if "parse_review" in sys.modules:
        return sys.modules["parse_review"]
    spec = importlib.util.spec_from_file_location("parse_review", PARSE_REVIEW)
    assert spec is not None and spec.loader is not None
    mod = importlib.util.module_from_spec(spec)
    # Register BEFORE exec so @dataclass can resolve cls.__module__
    sys.modules["parse_review"] = mod
    spec.loader.exec_module(mod)
    return mod


def _run_cli(*args: str) -> tuple[int, str, str]:
    """Invoke parse-review.py as a subprocess and return (rc, stdout, stderr)."""
    proc = subprocess.run(
        [sys.executable, str(PARSE_REVIEW), *args],
        capture_output=True,
        text=True,
        check=False,
    )
    return proc.returncode, proc.stdout, proc.stderr


# ─── Markdown fence + preamble stripping ─────────────────────────────────────


def test_strip_markdown_and_preamble() -> None:
    mod = _load_module()
    raw = 'Here are my findings:\n\n```json\n{"a": 1}\n```'
    cleaned = mod.strip_markdown_and_preamble(raw)
    assert cleaned == '{"a": 1}'


def test_strip_handles_jsonl_fence() -> None:
    mod = _load_module()
    raw = '```jsonl\n{"a": 1}\n{"b": 2}\n```'
    cleaned = mod.strip_markdown_and_preamble(raw)
    assert cleaned == '{"a": 1}\n{"b": 2}'


# ─── Schema validation ──────────────────────────────────────────────────────


def test_validate_record_happy_path() -> None:
    mod = _load_module()
    rec = {
        "file": "src/foo.ts",
        "line": 42,
        "severity": "major",
        "finding": "bug",
        "rec": "fix it",
    }
    assert mod.validate_record(rec) is None


def test_validate_record_missing_field() -> None:
    mod = _load_module()
    rec = {"file": "src/foo.ts", "line": 42, "severity": "major", "finding": "bug"}
    reason = mod.validate_record(rec)
    assert reason is not None
    assert "rec" in reason


def test_validate_record_empty_field() -> None:
    mod = _load_module()
    rec = {
        "file": "src/foo.ts",
        "line": 42,
        "severity": "major",
        "finding": "",
        "rec": "fix",
    }
    reason = mod.validate_record(rec)
    assert reason is not None
    assert "finding" in reason


def test_validate_record_invalid_severity() -> None:
    mod = _load_module()
    rec = {
        "file": "src/foo.ts",
        "line": 42,
        "severity": "CRITICAL",
        "finding": "bug",
        "rec": "fix",
    }
    reason = mod.validate_record(rec)
    assert reason is not None
    assert "severity" in reason


def test_validate_record_non_integer_line() -> None:
    mod = _load_module()
    rec = {
        "file": "src/foo.ts",
        "line": "forty-two",
        "severity": "major",
        "finding": "bug",
        "rec": "fix",
    }
    reason = mod.validate_record(rec)
    assert reason is not None
    assert "line" in reason


# ─── Fingerprint + dedup ────────────────────────────────────────────────────


def test_fingerprint_is_stable_across_formatting() -> None:
    mod = _load_module()
    f1 = mod.Finding("src/a.ts", 10, "minor", "Unused import", "remove it", ["opus"])
    f2 = mod.Finding("src/a.ts", 10, "minor", "unused import", "REMOVE IT", ["gemini"])
    f3 = mod.Finding("src/a.ts", 10, "minor", "Unused  import!", "remove", ["codex"])
    # All three should fingerprint identically (normalization strips case +
    # whitespace + punctuation)
    assert f1.fingerprint() == f2.fingerprint() == f3.fingerprint()


def test_dedupe_findings_merges_sources() -> None:
    mod = _load_module()
    findings = [
        mod.Finding("a.ts", 1, "minor", "bad", "fix", ["opus"]),
        mod.Finding("a.ts", 1, "minor", "bad", "fix differently", ["gemini"]),
        mod.Finding("a.ts", 2, "minor", "other", "fix", ["codex"]),
    ]
    deduped = mod.dedupe_findings(findings)
    assert len(deduped) == 2
    line1 = next(f for f in deduped if f.line == 1)
    assert sorted(line1.sources) == ["gemini", "opus"]


def test_dedupe_findings_preserves_highest_severity() -> None:
    """Codex review finding #3: if opus says 'blocker' and gemini says 'minor'
    for the same fingerprint, the deduped result must be 'blocker', not
    whichever file was processed first."""
    mod = _load_module()
    findings = [
        mod.Finding("a.ts", 10, "minor", "data loss bug", "fix", ["gemini"]),
        mod.Finding("a.ts", 10, "blocker", "data loss bug", "fix now", ["opus"]),
        mod.Finding("a.ts", 10, "major", "data loss bug!", "fix asap", ["codex"]),
    ]
    deduped = mod.dedupe_findings(findings)
    assert len(deduped) == 1
    assert deduped[0].severity == "blocker"
    assert sorted(deduped[0].sources) == ["codex", "gemini", "opus"]


# ─── End-to-end CLI behavior against fixtures ───────────────────────────────


def test_cli_valid_jsonl_exits_zero() -> None:
    rc, out, _err = _run_cli("--strict", str(FIXTURES / "valid.jsonl"))
    assert rc == 0
    lines = [ln for ln in out.splitlines() if ln.strip()]
    assert len(lines) == 3
    for line in lines:
        json.loads(line)  # must parse


def test_cli_drifted_fenced_exits_zero() -> None:
    rc, out, _err = _run_cli("--strict", str(FIXTURES / "drifted-fenced.txt"))
    assert rc == 0
    lines = [ln for ln in out.splitlines() if ln.strip()]
    assert len(lines) == 2


def test_cli_drifted_array_exits_zero() -> None:
    rc, out, _err = _run_cli("--strict", str(FIXTURES / "drifted-array.txt"))
    assert rc == 0
    lines = [ln for ln in out.splitlines() if ln.strip()]
    assert len(lines) == 2


def test_cli_drifted_bad_severity_exits_two() -> None:
    rc, _out, err = _run_cli("--strict", str(FIXTURES / "drifted-bad-severity.txt"))
    assert rc == 2
    assert "invalid severity" in err
    assert "CRITICAL" in err


def test_cli_stale_manifest_exits_four() -> None:
    rc, _out, err = _run_cli(
        "--strict",
        "--manifest",
        str(FIXTURES / "manifest-head.json"),
        "--head",
        "different_sha",
        str(FIXTURES / "valid.jsonl"),
    )
    assert rc == 4
    assert "stale" in err.lower() or "does not match" in err.lower()


def test_cli_matching_manifest_exits_zero() -> None:
    rc, _out, err = _run_cli(
        "--strict",
        "--manifest",
        str(FIXTURES / "manifest-head.json"),
        "--head",
        "abc123def456",
        str(FIXTURES / "valid.jsonl"),
    )
    assert rc == 0, f"stderr: {err}"


def test_cli_blocker_exits_three() -> None:
    # Generate a fixture with a blocker on the fly
    tmp = FIXTURES / "_tmp_blocker.jsonl"
    tmp.write_text(
        '{"file": "a.ts", "line": 1, "severity": "blocker", '
        '"finding": "data loss bug", "rec": "fix now"}\n',
        encoding="utf-8",
    )
    try:
        rc, _out, err = _run_cli("--strict", str(tmp))
        assert rc == 3
        assert "blocker" in err.lower() or "threshold" in err.lower()
    finally:
        tmp.unlink(missing_ok=True)


def test_cli_invalid_usage_exits_one() -> None:
    # No files provided
    rc, _out, _err = _run_cli()
    assert rc == 1 or rc == 2  # argparse may print to stderr and exit 2


def test_cli_dedup_across_fixture_files() -> None:
    # Create two fake per-model fixtures with the same finding
    tmp_opus = FIXTURES / "_tmp_opus.jsonl"
    tmp_gemini = FIXTURES / "_tmp_gemini.jsonl"
    tmp_opus.write_text(
        '{"file": "a.ts", "line": 10, "severity": "minor", '
        '"finding": "Unused import", "rec": "Remove the lodash import"}\n',
        encoding="utf-8",
    )
    tmp_gemini.write_text(
        '{"file": "a.ts", "line": 10, "severity": "minor", '
        '"finding": "unused import!", "rec": "remove it"}\n',
        encoding="utf-8",
    )
    try:
        rc, out, err = _run_cli("--strict", "--dedupe", str(tmp_opus), str(tmp_gemini))
        assert rc == 0, f"stderr: {err}"
        records = [json.loads(ln) for ln in out.splitlines() if ln.strip()]
        assert len(records) == 1
        # sources[] should contain both
        assert sorted(records[0]["sources"]) == ["_tmp_gemini", "_tmp_opus"]
    finally:
        tmp_opus.unlink(missing_ok=True)
        tmp_gemini.unlink(missing_ok=True)
