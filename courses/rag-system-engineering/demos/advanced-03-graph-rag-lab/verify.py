#!/usr/bin/env python3
"""Lab acceptance: advanced-03-graph-rag-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "graph-governance-checklist.md"
    if not path.is_file():
        print("FAIL: graph-governance-checklist.md missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: graph-governance-checklist.md is empty", file=sys.stderr)
        return 1
    if "- [ ]" not in text and "- [x]" not in text.lower():
        print("FAIL: graph-governance-checklist.md must contain checklist items (- [ ])", file=sys.stderr)
        return 1
    print("OK: graph-governance-checklist.md non-empty with checklist")
    return 0


if __name__ == "__main__":
    sys.exit(main())
