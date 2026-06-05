#!/usr/bin/env python3
"""Lab acceptance: basics-05-retrieval-gen-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "retrieval-flow.md"
    if not path.is_file():
        print("FAIL: retrieval-flow.md missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: retrieval-flow.md is empty", file=sys.stderr)
        return 1
    print("OK: retrieval-flow.md non-empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
