#!/usr/bin/env python3
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None


def parse_simple_yaml(text: str) -> dict:
    if yaml:
        return yaml.safe_load(text)
    exp: dict = {}
    current = exp
    stack = [exp]
    for line in text.splitlines():
        if not line.strip() or line.strip().startswith("#"):
            continue
        indent = len(line) - len(line.lstrip())
        key, _, val = line.strip().partition(":")
        if not val.strip():
            current[key] = {}
            stack.append(current[key])
            current = current[key]
        else:
            val = val.strip()
            if val.startswith("[") and val.endswith("]"):
                current[key] = [float(x) for x in val[1:-1].split(",")]
            elif val.isdigit():
                current[key] = int(val)
            else:
                current[key] = val.strip('"')
    return exp


def main() -> None:
    root = Path(__file__).parent
    plan = parse_simple_yaml((root / "ab-plan.yaml").read_text(encoding="utf-8"))
    exp = plan.get("experiment", plan)
    required = ["id", "control", "treatment", "split_key", "stages", "single_variable"]
    for k in required:
        assert k in exp, f"missing {k}"
    diff = (root / "prompt-diff.txt").read_text(encoding="utf-8")
    assert "Single variable" in diff or "single" in diff.lower()
    print("PASS: experiment valid")


if __name__ == "__main__":
    main()
