"""内存型长期事实库（示意 Milvus + DB）。"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass
class StoredFact:
    tenant_id: str
    user_id: str
    fact_text: str
    fact_type: str = "preference"
    superseded: bool = False


class InMemoryFactStore:
    def __init__(self) -> None:
        self._facts: list[StoredFact] = []

    def upsert(self, payload: dict[str, Any]) -> None:
        self._facts.append(
            StoredFact(
                tenant_id=payload["tenant_id"],
                user_id=payload["user_id"],
                fact_text=payload["fact_text"],
                fact_type=payload.get("fact_type", "preference"),
            )
        )

    def recall(self, tenant_id: str, user_id: str, query: str, top_k: int = 5) -> list[str]:
        hits = [
            f.fact_text
            for f in self._facts
            if f.tenant_id == tenant_id
            and f.user_id == user_id
            and not f.superseded
            and (query in f.fact_text or f.fact_type in query)
        ]
        return hits[:top_k]

    def mark_superseded(self, tenant_id: str, user_id: str, fact_type: str) -> int:
        count = 0
        for f in self._facts:
            if (
                f.tenant_id == tenant_id
                and f.user_id == user_id
                and f.fact_type == fact_type
                and not f.superseded
            ):
                f.superseded = True
                count += 1
        return count
