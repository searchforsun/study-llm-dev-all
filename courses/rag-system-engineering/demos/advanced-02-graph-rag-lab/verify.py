#!/usr/bin/env python3
"""Lab acceptance: advanced-02-graph-rag-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "graph-vs-hybrid.md"
    if not path.is_file():
        print("FAIL: graph-vs-hybrid.md missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: graph-vs-hybrid.md is empty", file=sys.stderr)
        return 1
    print("OK: graph-vs-hybrid.md non-empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
