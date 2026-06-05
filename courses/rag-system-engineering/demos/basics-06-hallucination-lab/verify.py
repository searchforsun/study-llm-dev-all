#!/usr/bin/env python3
"""Lab acceptance: basics-06-hallucination-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "guard-config.yaml"
    if not path.is_file():
        print("FAIL: guard-config.yaml missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: guard-config.yaml is empty", file=sys.stderr)
        return 1
    if "min_score" not in text:
        print("FAIL: guard-config.yaml must define min_score", file=sys.stderr)
        return 1
    print("OK: guard-config.yaml non-empty with min_score")
    return 0


if __name__ == "__main__":
    sys.exit(main())
