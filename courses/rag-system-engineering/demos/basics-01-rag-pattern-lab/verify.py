#!/usr/bin/env python3
"""Lab acceptance: basics-01-rag-pattern-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "pipeline.md"
    if not path.is_file():
        print("FAIL: pipeline.md missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: pipeline.md is empty", file=sys.stderr)
        return 1
    if "双栈" not in text and "Python" not in text:
        print("FAIL: pipeline.md must mention 双栈 or Python", file=sys.stderr)
        return 1
    print("OK: pipeline.md non-empty with dual-stack keywords")
    return 0


if __name__ == "__main__":
    sys.exit(main())
