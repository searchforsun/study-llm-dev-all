#!/usr/bin/env python3
"""Lab acceptance: practice-05-eval-loop-lab"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "eval-result.json"
    if not path.is_file():
        print("FAIL: eval-result.json missing", file=sys.stderr)
        return 1
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"FAIL: eval-result.json invalid JSON: {exc}", file=sys.stderr)
        return 1
    if "faithfulness" not in data:
        print("FAIL: eval-result.json missing 'faithfulness'", file=sys.stderr)
        return 1
    print(f"OK: eval-result.json valid (faithfulness={data['faithfulness']})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
