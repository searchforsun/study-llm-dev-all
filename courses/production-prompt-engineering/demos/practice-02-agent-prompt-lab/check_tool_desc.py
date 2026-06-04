#!/usr/bin/env python3
import json
from pathlib import Path


def main() -> None:
    tools = json.loads((Path(__file__).parent / "tools.json").read_text(encoding="utf-8"))
    assert len(tools) == 2, "expected 2 tools"
    for t in tools:
        assert t.get("name"), "missing name"
        desc = t.get("description", "")
        assert len(desc) >= 20, f"{t['name']}: description too short"
        params = t.get("parameters", {})
        for req in params.get("required", []):
            assert req in params.get("properties", {}), f"{t['name']}: missing param {req}"
    print("PASS: 2 tools validated")


if __name__ == "__main__":
    main()
