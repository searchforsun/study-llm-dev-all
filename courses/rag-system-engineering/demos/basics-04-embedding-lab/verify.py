#!/usr/bin/env python3
"""Lab acceptance: basics-04-embedding-lab"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "index-config.json"
    if not path.is_file():
        print("FAIL: index-config.json missing", file=sys.stderr)
        return 1
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"FAIL: index-config.json invalid JSON: {exc}", file=sys.stderr)
        return 1
    for key in ("model", "dim"):
        if key not in data:
            print(f"FAIL: index-config.json missing '{key}'", file=sys.stderr)
            return 1
    print(f"OK: index-config.json valid (model={data['model']}, dim={data['dim']})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
