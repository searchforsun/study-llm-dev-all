"""CorpAssist 双栈共享会话存储 — Python 侧（与 java-reader 共用 JSON schema）。"""
from __future__ import annotations

import json
from typing import Any

SCHEMA_VERSION = "corpassist-session-v1"
SESSION_KEY_PATTERN = "corpassist:session:{tenant}:{user_id}"
TTL_SECONDS = 86400
MAX_TURNS = 8


def session_key(tenant: str, user_id: str) -> str:
    return SESSION_KEY_PATTERN.format(tenant=tenant, user_id=user_id)


def serialize_payload(turns: list[dict[str, str]]) -> str:
    trimmed = turns[-MAX_TURNS:]
    return json.dumps(
        {"schema": SCHEMA_VERSION, "turns": trimmed},
        ensure_ascii=False,
        separators=(",", ":"),
    )


def deserialize_payload(raw: str | bytes) -> list[dict[str, str]]:
    data = json.loads(raw)
    if data.get("schema") != SCHEMA_VERSION:
        raise ValueError(f"unsupported schema: {data.get('schema')}")
    turns = data.get("turns") or []
    for t in turns:
        if t.get("role") not in ("user", "assistant") or "content" not in t:
            raise ValueError(f"invalid turn: {t}")
    return turns


class SessionStore:
    """LangChain / Python 栈写入；Java 栈用相同 key + JSON 读取。"""

    def __init__(self, redis_client: Any) -> None:
        self._redis = redis_client

    def load_turns(self, tenant: str, user_id: str) -> list[dict[str, str]]:
        raw = self._redis.get(session_key(tenant, user_id))
        if raw is None:
            return []
        return deserialize_payload(raw)

    def save_turns(self, tenant: str, user_id: str, turns: list[dict[str, str]]) -> None:
        key = session_key(tenant, user_id)
        self._redis.set(key, serialize_payload(turns), ex=TTL_SECONDS)

    def append_turn(
        self, tenant: str, user_id: str, role: str, content: str
    ) -> list[dict[str, str]]:
        turns = self.load_turns(tenant, user_id)
        turns.append({"role": role, "content": content})
        if len(turns) > MAX_TURNS:
            turns = turns[-MAX_TURNS:]
        self.save_turns(tenant, user_id, turns)
        return turns
