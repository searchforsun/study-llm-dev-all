#!/usr/bin/env python3
import json
from pathlib import Path

LAB_DIR = Path(__file__).parent
SPEC = LAB_DIR / "prompt-spec.local.json"
if not SPEC.exists():
    SPEC = LAB_DIR / "prompt-spec.sample.json"

def main():
    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    assert spec.get("semver"), "missing semver"
    assert spec.get("eval_binding", {}).get("dataset_version"), "missing dataset_version"
    assert spec.get("change_log"), "missing change_log"
    print("ci_prompt_gate=pass")
    print("eval_binding_ok=1")

if __name__ == "__main__":
    main()
