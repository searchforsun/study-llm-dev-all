"""混合记忆：写穿透、读合并、MemRouter。"""
from __future__ import annotations

import re
from typing import Literal

from fact_store import InMemoryFactStore
from session_store import InMemorySessionStore

Layer = Literal["session", "long_term"]


class MemRouter:
    _GREETING = re.compile(r"^(你好|hi|hello|嗨)\b", re.IGNORECASE)
    _PREFERENCE_CORRECTION = re.compile(r"偏好.*(错|改|应该)")

    def route(self, query: str) -> set[Layer]:
        layers: set[Layer] = {"session"}
        if not self._GREETING.match(query.strip()):
            layers.add("long_term")
        return layers

    @staticmethod
    def is_preference_correction(user_msg: str) -> bool:
        return bool(MemRouter._PREFERENCE_CORRECTION.search(user_msg))


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
        if MemRouter.is_preference_correction(user_msg):
            self.long_term.mark_superseded(tenant, user_id, "preference")
        facts = self._extract_facts(user_msg, ai_msg)
        for fact_text, fact_type in facts:
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
        self.router = MemRouter()

    def read_context(self, tenant: str, user_id: str, query: str) -> list[str]:
        layers = self.router.route(query)
        items: list[str] = []

        if "session" in layers:
            for turn in self.session.load_history(tenant, user_id):
                items.append(turn["content"])

        if "long_term" in layers:
            items.extend(self.long_term.recall(tenant, user_id, query))

        seen: set[str] = set()
        merged: list[str] = []
        for item in items:
            if item not in seen:
                seen.add(item)
                merged.append(item)
        return merged
