"""Minimal RAG eval — extend golden set to 20 rows for full lab."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from app.rag.pipeline import RagPipeline

GOLDEN = Path(__file__).resolve().parent.parent / "evals" / "rag_golden.jsonl"


def main() -> None:
    pipeline = RagPipeline()
    rows = [json.loads(line) for line in GOLDEN.read_text(encoding="utf-8").splitlines() if line.strip()]
    ok = 0
    for row in rows:
        out = pipeline.run(query=row["question"], top_k=3)
        hit = any(k in out["answer"] for k in row.get("must_contain", []))
        ok += int(hit)
    rate = ok / len(rows) if rows else 0.0
    print(f"hit_rate={rate:.2%} ({ok}/{len(rows)})")
    if rate < 0.85:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
