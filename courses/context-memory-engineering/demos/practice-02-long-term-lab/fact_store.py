"""内存型事实库（模拟 Milvus + 结构化存储；带租户/用户过滤与 TTL）。"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any


@dataclass
class StoredFact:
    tenant_id: str
    user_id: str
    fact_text: str
    fact_type: str = "preference"
    expires_at: datetime | None = None

    def is_alive(self, now: datetime) -> bool:
        return self.expires_at is None or self.expires_at > now


class InMemoryFactStore:
    def __init__(self) -> None:
        self._facts: list[StoredFact] = []

    def upsert(self, payload: dict[str, Any], ttl: timedelta | None = None) -> None:
        expires = None
        if ttl is not None:
            expires = datetime.now(timezone.utc) + ttl
        self._facts.append(
            StoredFact(
                tenant_id=payload["tenant_id"],
                user_id=payload["user_id"],
                fact_text=payload["fact_text"],
                fact_type=payload.get("fact_type", "preference"),
                expires_at=expires,
            )
        )

    def recall(self, tenant_id: str, user_id: str, query: str, top_k: int = 5) -> list[str]:
        now = datetime.now(timezone.utc)
        hits = [
            f
            for f in self._facts
            if f.tenant_id == tenant_id
            and f.user_id == user_id
            and f.is_alive(now)
            and query in f.fact_text
        ]
        return [f.fact_text for f in hits[:top_k]]

    def gdpr_delete(self, tenant_id: str, user_id: str) -> int:
        before = len(self._facts)
        self._facts = [
            f for f in self._facts if not (f.tenant_id == tenant_id and f.user_id == user_id)
        ]
        return before - len(self._facts)

    def purge_expired(self, now: datetime | None = None) -> int:
        now = now or datetime.now(timezone.utc)
        before = len(self._facts)
        self._facts = [f for f in self._facts if f.is_alive(now)]
        return before - len(self._facts)
