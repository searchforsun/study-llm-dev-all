#!/usr/bin/env python3
"""Validate S5 content generation pipeline config for advanced-06 lab."""
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
    raise RuntimeError("PyYAML required: pip install pyyaml")


def main() -> None:
    root = Path(__file__).parent
    style = load_yaml(root / "style_profile.yaml")
    profile = style.get("s5_whitepaper_v2", style)
    assert "banned_phrases" in profile and len(profile["banned_phrases"]) >= 2
    assert "required_blocks" in profile and len(profile["required_blocks"]) >= 3

    outline = json.loads((root / "outline-plan.json").read_text(encoding="utf-8"))
    sections = outline.get("sections", [])
    assert len(sections) >= 4
    for sec in sections:
        assert "target_words" in sec, f"missing target_words in {sec.get('id')}"

    gates_doc = load_yaml(root / "qa-gates.yaml")
    gate_ids = {g["id"] for g in gates_doc.get("gates", [])}
    required_gates = {"structure", "readability", "brand_voice", "factuality", "dedup"}
    assert required_gates <= gate_ids, f"missing gates: {required_gates - gate_ids}"

    safety = load_yaml(root / "content_safety_rules.yaml")
    rule_ids = {r["id"] for r in safety.get("rules", [])}
    assert "CS-PII-01" in rule_ids

    print("PASS: S5 pipeline config valid")


if __name__ == "__main__":
    main()
