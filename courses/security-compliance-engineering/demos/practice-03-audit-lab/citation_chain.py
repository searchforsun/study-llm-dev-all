def build_citations(chunks: list[dict]) -> list[dict]:
    return [{"doc_id": c["doc_id"], "chunk_id": c["chunk_id"], "score": c.get("score", 0)} for c in chunks]
