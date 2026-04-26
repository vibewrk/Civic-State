"""Regression tests for the /100 → /110 principle scoring drift.

When the 11th principle (SEO & Content Integrity) was added to
autoux/program.md, every hardcoded denominator in the Python code
had to move in lockstep. autoux/run.py and autoux/evaluate.py were
already updated (commit b111797), but autoux/self_improve.py still
has "/100" string literals at lines 194 and 368 that need to move
to "/110".

This test file is the red→green workflow for that fix: the test
asserts /100 is absent from all three autoux files, so it fails
until self_improve.py is patched.
"""

from __future__ import annotations

import re
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]
AUTOUX_DIR = REPO_ROOT / "autoux"


def _files_to_check() -> list[Path]:
    return [
        AUTOUX_DIR / "run.py",
        AUTOUX_DIR / "evaluate.py",
        AUTOUX_DIR / "self_improve.py",
    ]


@pytest.mark.parametrize("path", _files_to_check(), ids=lambda p: p.name)
def test_no_hundred_denominator_literal(path: Path) -> None:
    """Assert no '/100' literal appears in autoux Python files.

    The scale moved from 10 principles × 10 points (= 100) to 11
    principles × 10 points (= 110). Any remaining '/100' literal is
    drift from the pre-SEO era and will under-report scores.
    """
    src = path.read_text(encoding="utf-8")
    # Find lines containing /100 that are NOT part of * 100 or .100 etc.
    # We look for the literal string "/100" with a word boundary after.
    pattern = re.compile(r"/100\b")
    matches = []
    for i, line in enumerate(src.splitlines(), start=1):
        if pattern.search(line):
            matches.append(f"  {path.name}:{i}: {line.strip()}")
    assert not matches, (
        f"{path.name} contains /100 literal(s) — should be /110 per "
        f"autoux/program.md:11. Matches:\n" + "\n".join(matches)
    )


def test_program_md_declares_110_denominator() -> None:
    """program.md is the canonical source of truth for the /110 scale."""
    md = (AUTOUX_DIR / "program.md").read_text(encoding="utf-8")
    assert "/110" in md, "program.md should state the /110 denominator"
