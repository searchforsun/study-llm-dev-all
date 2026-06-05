#!/usr/bin/env python3
"""Lab acceptance: basics-02-ingestion-lab"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    path = ROOT / "sample-doc-meta.json"
    if not path.is_file():
        print("FAIL: sample-doc-meta.json missing", file=sys.stderr)
        return 1
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"FAIL: sample-doc-meta.json invalid JSON: {exc}", file=sys.stderr)
        return 1
    meta = data.get("meta")
    if not isinstance(meta, dict) or not meta:
        print("FAIL: sample-doc-meta.json must have non-empty meta object", file=sys.stderr)
        return 1
    print(f"OK: sample-doc-meta.json valid with meta fields: {', '.join(meta.keys())}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
