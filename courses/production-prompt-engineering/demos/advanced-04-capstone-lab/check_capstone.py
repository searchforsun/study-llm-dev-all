#!/usr/bin/env python3
import json
from pathlib import Path

REGISTRY = Path(__file__).parent / "prompt-registry.json"
MANIFEST = Path(__file__).parent / "eval-manifest.json"

def main():
    reg = json.loads(REGISTRY.read_text(encoding="utf-8"))
    man = json.loads(MANIFEST.read_text(encoding="utf-8"))
    templates = reg.get("templates", {})
    assert set(templates) >= {"s1-rag", "s2-agent", "s3-json"}, "missing capstone templates"
    assert man.get("prompt_version") == reg.get("release", {}).get("semver")
    assert man.get("dataset_version"), "missing dataset_version"
    print("capstone_bundle=ok")
    print("graduation_checklist=3/3 templates")

if __name__ == "__main__":
    main()
