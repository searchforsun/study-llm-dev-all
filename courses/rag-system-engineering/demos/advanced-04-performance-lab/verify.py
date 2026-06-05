#!/usr/bin/env python3
"""Lab acceptance: advanced-04-performance-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "perf-tactics.md"
    if not path.is_file():
        print("FAIL: perf-tactics.md missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: perf-tactics.md is empty", file=sys.stderr)
        return 1
    print("OK: perf-tactics.md non-empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
