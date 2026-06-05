#!/usr/bin/env python3
"""Lab acceptance: practice-07-code-rag-lab"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "code-rag-notes.md"
    if not path.is_file():
        print("FAIL: code-rag-notes.md missing", file=sys.stderr)
        return 1
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        print("FAIL: code-rag-notes.md is empty", file=sys.stderr)
        return 1
    print("OK: code-rag-notes.md non-empty")
    return 0


if __name__ == "__main__":
    sys.exit(main())
