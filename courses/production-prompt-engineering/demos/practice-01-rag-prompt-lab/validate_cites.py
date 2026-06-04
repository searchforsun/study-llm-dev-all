#!/usr/bin/env python3
"""Validate RAG answer cites are grounded in CONTEXT blocks."""
import re
from pathlib import Path

CITE = re.compile(r"\[([^\]:]+):([^\]]+)\]")
CTX_DOC = re.compile(r"<<<CONTEXT doc_id=([^\s]+)")


def load_doc_ids(context_path: Path) -> set[str]:
    text = context_path.read_text(encoding="utf-8")
    return set(CTX_DOC.findall(text))


def load_cites(answer_path: Path) -> list[tuple[str, str]]:
    return CITE.findall(answer_path.read_text(encoding="utf-8"))


def main() -> None:
    root = Path(__file__).parent
    doc_ids = load_doc_ids(root / "sample-context.txt")
    cites = load_cites(root / "sample-answer.txt")
    errors = [f"UNKNOWN_DOC_ID:{d}" for d, _ in cites if d not in doc_ids]
    if errors:
        for e in errors:
            print(e)
        raise SystemExit(1)
    print("OK: all cites grounded")


if __name__ == "__main__":
    main()
