#!/usr/bin/env python3
"""Validate ticket JSON against ticket-schema.json (stdlib only)."""
import json
import re
import sys
from pathlib import Path

SCHEMA = json.loads((Path(__file__).parent / "ticket-schema.json").read_text(encoding="utf-8"))


def validate(data: dict) -> list[str]:
    errors: list[str] = []
    props = SCHEMA["properties"]
    for req in SCHEMA["required"]:
        if req not in data:
            errors.append(f"missing required: {req}")
    for key, val in data.items():
        if key not in props:
            errors.append(f"additional property: {key}")
            continue
        spec = props[key]
        if "enum" in spec and val not in spec["enum"]:
            errors.append(f"{key}: '{val}' not in {spec['enum']}")
        if spec.get("type") == "string":
            if "minLength" in spec and len(val) < spec["minLength"]:
                errors.append(f"{key}: length {len(val)} < {spec['minLength']}")
            if "pattern" in spec and not re.match(spec["pattern"], val):
                errors.append(f"{key}: pattern mismatch")
    return errors


def main() -> None:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("sample-valid.json")
    data = json.loads(path.read_text(encoding="utf-8"))
    errors = validate(data)
    if errors:
        for e in errors:
            print(e)
        raise SystemExit(1)
    print("PASS")


if __name__ == "__main__":
    main()
