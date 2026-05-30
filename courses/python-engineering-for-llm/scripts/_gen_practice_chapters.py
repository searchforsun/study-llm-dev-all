# -*- coding: utf-8 -*-
"""Generate 5 practice chapters at example depth. Run once then delete."""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "chapters"

def write(name: str, content: str) -> None:
    path = OUT / f"{name}.html"
    path.write_text(content.strip() + "\n", encoding="utf-8")
    print(f"Wrote {path.name} ({len(content.splitlines())} lines)")
