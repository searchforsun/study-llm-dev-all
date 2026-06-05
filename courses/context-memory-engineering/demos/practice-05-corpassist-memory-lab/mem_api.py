"""CorpAssist 记忆子系统 API（内存示意，组合前几章 lab 能力）。"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any
from uuid import uuid4


@dataclass
class ApiResponse:
    ok: bool
    data: dict[str, Any] = field(default_factory=dict)


class InMemorySessionStore:
    def __init__(self) -> None:
        self._turns: dict[str, list[dict[str, str]]] = {}

    def _key(self, tenant: str, user_id: str) -> str:
        return f"{tenant}:{user_id}"

    def save_turn(
        self, tenant: str, user_id: str, user_msg: str, ai_msg: str
    ) -> list[dict[str, str]]:
        key = self._key(tenant, user_id)
        turns = self._turns.setdefault(key, [])
        turns.extend(
            [
                {"role": "user", "content": user_msg},
                {"role": "assistant", "content": ai_msg},
            ]
        )
        return turns

    def load_history(self, tenant: str, user_id: str) -> list[dict[str, str]]:
        return list(self._turns.get(self._key(tenant, user_id), []))


class InMemoryFactStore:
    def __init__(self) -> None:
        self._facts: list[dict[str, Any]] = []

    def upsert(self, payload: dict[str, Any]) -> None:
        self._facts.append({**payload, "fact_id": payload.get("fact_id", uuid4().hex[:8])})

    def recall(self, tenant_id: str, user_id: str, query: str, top_k: int = 5) -> list[str]:
        hits = [
            f["fact_text"]
            for f in self._facts
            if f["tenant_id"] == tenant_id
            and f["user_id"] == user_id
            and not f.get("superseded")
            and (query in f["fact_text"] or f.get("fact_type") in query)
        ]
        return hits[:top_k]

    def mark_superseded(self, tenant_id: str, user_id: str, fact_type: str) -> int:
        count = 0
        for f in self._facts:
            if (
                f["tenant_id"] == tenant_id
                and f["user_id"] == user_id
                and f.get("fact_type") == fact_type
                and not f.get("superseded")
            ):
                f["superseded"] = True
                count += 1
        return count


class HybridMemoryWriter:
    def __init__(
        self, session: InMemorySessionStore, long_term: InMemoryFactStore
    ) -> None:
        self.session = session
        self.long_term = long_term

    def write_turn(
        self, tenant: str, user_id: str, user_msg: str, ai_msg: str
    ) -> None:
        self.session.save_turn(tenant, user_id, user_msg, ai_msg)
        if "偏好" in user_msg and ("错" in user_msg or "应该" in user_msg):
            self.long_term.mark_superseded(tenant, user_id, "preference")
        for fact_text, fact_type in self._extract_facts(user_msg, ai_msg):
            self.long_term.upsert(
                {
                    "tenant_id": tenant,
                    "user_id": user_id,
                    "fact_text": fact_text,
                    "fact_type": fact_type,
                }
            )

    @staticmethod
    def _extract_facts(user_msg: str, ai_msg: str) -> list[tuple[str, str]]:
        text = f"{user_msg} {ai_msg}"
        facts: list[tuple[str, str]] = []
        if "20240501" in text:
            facts.append(("订单 20240501", "order"))
        if "加急" in text:
            facts.append(("订单 20240501 已加急", "order"))
        if "短信" in text and "报告" in text:
            facts.append(("用户偏好短信接收报告", "preference"))
        if "邮箱" in text and "报告" in text:
            facts.append(("用户偏好邮箱接收报告", "preference"))
        return facts


class HybridMemoryReader:
    def __init__(
        self, session: InMemorySessionStore, long_term: InMemoryFactStore
    ) -> None:
        self.session = session
        self.long_term = long_term

    def read_context(self, tenant: str, user_id: str, query: str) -> list[str]:
        items = [t["content"] for t in self.session.load_history(tenant, user_id)]
        if not query.strip().lower().startswith(("你好", "hi", "hello")):
            items.extend(self.long_term.recall(tenant, user_id, query))
        seen: set[str] = set()
        merged: list[str] = []
        for item in items:
            if item not in seen:
                seen.add(item)
                merged.append(item)
        return merged


class CorpAssistMemoryAPI:
    """REST 契约示意：/v1/session 与 /v1/memory。"""

    def __init__(self) -> None:
        self._session = InMemorySessionStore()
        self._facts = InMemoryFactStore()
        self._writer = HybridMemoryWriter(self._session, self._facts)
        self._reader = HybridMemoryReader(self._session, self._facts)

    def get_session_messages(self, tenant: str, user_id: str) -> ApiResponse:
        turns = self._session.load_history(tenant, user_id)
        return ApiResponse(ok=True, data={"messages": turns, "count": len(turns)})

    def post_session_messages(
        self, tenant: str, user_id: str, user_msg: str, ai_msg: str
    ) -> ApiResponse:
        self._writer.write_turn(tenant, user_id, user_msg, ai_msg)
        turns = self._session.load_history(tenant, user_id)
        return ApiResponse(ok=True, data={"messages": turns, "count": len(turns)})

    def post_memory_recall(
        self, tenant: str, user_id: str, query: str
    ) -> ApiResponse:
        items = self._reader.read_context(tenant, user_id, query)
        return ApiResponse(ok=True, data={"items": items, "query": query})

    def build_chat_context(self, tenant: str, user_id: str, query: str) -> str:
        return " ".join(self._reader.read_context(tenant, user_id, query))
