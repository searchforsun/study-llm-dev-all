#!/usr/bin/env python3
"""Validate Prompt debug interview case pack for advanced-07 lab."""
from pathlib import Path
import json

try:
    import yaml
except ImportError:
    yaml = None


def load_yaml(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if yaml:
        return yaml.safe_load(text)
    # minimal fallback for metric-delta.yaml
    data: dict = {"metrics": {}}
    current = None
    for line in text.splitlines():
        if not line.strip() or line.strip().startswith("#"):
            continue
        if not line.startswith(" "):
            key, _, val = line.partition(":")
            if val.strip():
                continue
            current = key.strip()
            data["metrics"][current] = {}
        elif current:
            key, _, val = line.strip().partition(":")
            data["metrics"][current][key.strip()] = float(val.strip())
    return data


def main() -> None:
    root = Path(__file__).parent
    lines = (root / "badcase-sample.jsonl").read_text(encoding="utf-8").strip().splitlines()
    assert len(lines) >= 1
    case = json.loads(lines[0])
    required = ["case_id", "prompt_version", "symptom", "root_cause_tag", "trace_id"]
    for k in required:
        assert k in case, f"badcase missing {k}"

    diff = (root / "prompt-diff.txt").read_text(encoding="utf-8")
    assert "Single variable" in diff or "single variable" in diff.lower()
    assert "cite" in diff.lower()

    metrics = load_yaml(root / "metric-delta.yaml").get("metrics", {})
    assert "cite_coverage" in metrics
    assert metrics["cite_coverage"].get("delta", 0) > 0

    star = (root / "star-p-answer.md").read_text(encoding="utf-8")
    for key in ["**S**ituation", "**T**ask", "**A**ction", "**R**esult", "**P**rompt"]:
        assert key in star, f"STAR-P missing {key}"

    print("PASS: interview case pack valid")


if __name__ == "__main__":
    main()
