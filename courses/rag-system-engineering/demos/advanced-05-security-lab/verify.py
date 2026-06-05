#!/usr/bin/env python3
"""Lab acceptance: advanced-05-security-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "acl-filter.example.txt"
    if not path.is_file():
        print("FAIL: acl-filter.example.txt missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: acl-filter.example.txt is empty", file=sys.stderr)
        return 1
    print("OK: acl-filter.example.txt non-empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
