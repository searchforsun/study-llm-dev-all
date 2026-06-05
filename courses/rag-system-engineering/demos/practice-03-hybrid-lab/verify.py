#!/usr/bin/env python3
"""Lab acceptance: practice-03-hybrid-lab"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "hybrid-config.json"
    if not path.is_file():
        print("FAIL: hybrid-config.json missing", file=sys.stderr)
        return 1
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"FAIL: hybrid-config.json invalid JSON: {exc}", file=sys.stderr)
        return 1
    for key in ("bm25_weight", "vector_weight"):
        if key not in data:
            print(f"FAIL: hybrid-config.json missing '{key}'", file=sys.stderr)
            return 1
    print(
        f"OK: hybrid-config.json valid "
        f"(bm25_weight={data['bm25_weight']}, vector_weight={data['vector_weight']})"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
