import json
from pathlib import Path

out = {
    "weighted_total": 2.8,
    "blockers": ["tenant 隔离"],
    "scores": {"tenant": 1, "async": 4, "openapi": 4, "tests": 3, "observability": 3},
}
root = Path(__file__).resolve().parents[1]
(root / "judge-output.json").write_text(json.dumps(out, indent=2), encoding="utf-8")
print("wrote judge-output.json")
