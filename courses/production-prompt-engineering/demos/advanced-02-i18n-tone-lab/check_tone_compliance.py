#!/usr/bin/env python3
import json
from pathlib import Path

MANIFEST = Path(__file__).parent / "tone-matrix.json"

def main():
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    hits = sum(1 for row in data["samples"] if row.get("disclaimer"))
    rate = hits / len(data["samples"])
    print(f"disclaimer_hit={rate:.1f}")
    ok = sum(1 for row in data["samples"] if row.get("locale") and row.get("disclaimer"))
    consistency = ok / len(data["samples"])
    print(f"locale_consistency={consistency:.2f}")
    assert rate >= 1.0 and consistency >= 0.95

if __name__ == "__main__":
    main()
