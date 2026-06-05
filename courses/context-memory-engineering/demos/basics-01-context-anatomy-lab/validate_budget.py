#!/usr/bin/env python3
"""校验 budget-template.yaml：各层 token 之和 ≤ window_limit。"""
from __future__ import annotations

import sys
from pathlib import Path

import yaml

TEMPLATE = Path(__file__).parent / "templates" / "budget-template.yaml"


def main() -> int:
    data = yaml.safe_load(TEMPLATE.read_text(encoding="utf-8"))
    limit = int(data["window_limit"])
    layers = data.get("layers") or {}
    total = sum(int(v.get("budget", 0)) for v in layers.values())
    ratio_sum = sum(float(v.get("ratio", 0)) for v in layers.values())
    print(f"window_limit={limit} layer_sum={total} ratio_sum={ratio_sum:.2f}")
    if total > limit:
        print(f"FAIL: layer budgets {total} exceed window {limit}", file=sys.stderr)
        return 1
    if abs(ratio_sum - 1.0) > 0.02:
        print(f"WARN: ratios sum to {ratio_sum:.2f}, expected ~1.0")
    print("OK: budget split valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
