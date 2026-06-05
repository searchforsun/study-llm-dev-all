"""内存型会话存储（示意 Redis 会话层）。"""
from __future__ import annotations


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
