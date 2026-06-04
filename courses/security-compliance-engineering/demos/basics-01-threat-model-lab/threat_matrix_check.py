#!/usr/bin/env python3
"""CorpAssist threat model lab — validates STRIDE-style coverage for basics-01."""
from __future__ import annotations

REQUIRED_CATEGORIES = ("injection", "privilege", "leakage")


def main() -> int:
    matrix = {
        "injection": ["prompt_injection", "indirect_injection"],
        "privilege": ["tool_authz", "session_confusion"],
        "leakage": ["pii_in_output", "rag_cross_tenant"],
    }
    missing = [c for c in REQUIRED_CATEGORIES if c not in matrix]
    if missing:
        print(f"FAIL: missing categories {missing}")
        return 1
    total = sum(len(v) for v in matrix.values())
    print(f"OK: CorpAssist threat matrix covers {len(matrix)} pillars, {total} scenarios")
    for cat, items in matrix.items():
        print(f"  - {cat}: {', '.join(items)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
