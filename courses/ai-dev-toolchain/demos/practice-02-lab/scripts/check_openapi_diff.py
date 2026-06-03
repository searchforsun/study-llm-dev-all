"""Compare exported OpenAPI with baseline (paths + required fields only)."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
BASELINE = ROOT / "contracts" / "baseline-openapi.json"
CURRENT = ROOT / "contracts" / "current-openapi.json"


def required_props(schema: dict) -> set[str]:
    return set(schema.get("required", []))


def check() -> int:
    if not CURRENT.exists():
        print("Run export_openapi.py first")
        return 1
    base = json.loads(BASELINE.read_text(encoding="utf-8"))
    cur = json.loads(CURRENT.read_text(encoding="utf-8"))
    base_path = base["paths"]["/v1/rag/query"]["post"]
    cur_path = cur["paths"]["/v1/rag/query"]["post"]
    base_req = base_path["requestBody"]["content"]["application/json"]["schema"]
    cur_req = cur_path["requestBody"]["content"]["application/json"]["schema"]
    removed = required_props(base_req) - required_props(cur_req)
    if removed:
        print(f"Incompatible: removed required fields {removed}")
        return 1
    print("No incompatible OpenAPI changes")
    return 0


if __name__ == "__main__":
    raise SystemExit(check())
