#!/usr/bin/env python3
"""Lab acceptance: practice-04-multi-kb-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "kb-routing.yaml"
    if not path.is_file():
        print("FAIL: kb-routing.yaml missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: kb-routing.yaml is empty", file=sys.stderr)
        return 1
    if "knowledge_bases" not in text:
        print("FAIL: kb-routing.yaml must define knowledge_bases", file=sys.stderr)
        return 1
    print("OK: kb-routing.yaml non-empty with knowledge_bases")
    return 0


if __name__ == "__main__":
    sys.exit(main())
