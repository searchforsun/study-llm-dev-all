#!/usr/bin/env python3
"""Lab acceptance: advanced-01-query-transform-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "rewrite-example.txt"
    if not path.is_file():
        print("FAIL: rewrite-example.txt missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: rewrite-example.txt is empty", file=sys.stderr)
        return 1
    print("OK: rewrite-example.txt non-empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
