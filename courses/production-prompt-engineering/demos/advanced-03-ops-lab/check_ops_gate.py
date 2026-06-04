#!/usr/bin/env python3
import json
from pathlib import Path

SPEC = Path(__file__).parent / "prompt-spec.sample.json"

def main():
    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    assert spec.get("semver"), "missing semver"
    assert spec.get("eval_binding", {}).get("dataset_version"), "missing dataset_version"
    assert spec.get("change_log"), "missing change_log"
    print("ci_prompt_gate=pass")
    print("eval_binding_ok=1")

if __name__ == "__main__":
    main()
