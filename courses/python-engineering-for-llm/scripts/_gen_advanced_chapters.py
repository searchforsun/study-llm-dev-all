# -*- coding: utf-8 -*-
"""One-off generator for advanced chapters — run then delete."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "chapters"

def write(name: str, content: str) -> None:
    path = ROOT / f"{name}.html"
    path.write_text(content.strip() + "\n", encoding="utf-8")
    lines = len(content.strip().splitlines())
    print(f"Wrote {path.name}: {lines} lines")

# Content loaded from external files in same dir for maintainability
for ch in [
    "advanced-01-performance",
    "advanced-02-background-jobs",
    "advanced-03-packaging",
    "advanced-04-corpassist-api",
    "advanced-05-bridge-java",
]:
    src = Path(__file__).parent / f"_content_{ch}.html"
    if src.exists():
        write(ch, src.read_text(encoding="utf-8"))
