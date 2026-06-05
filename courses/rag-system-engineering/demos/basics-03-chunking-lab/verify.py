#!/usr/bin/env python3
"""Lab acceptance: basics-03-chunking-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "chunk-compare.md"
    if not path.is_file():
        print("FAIL: chunk-compare.md missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: chunk-compare.md is empty", file=sys.stderr)
        return 1
    print("OK: chunk-compare.md non-empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
