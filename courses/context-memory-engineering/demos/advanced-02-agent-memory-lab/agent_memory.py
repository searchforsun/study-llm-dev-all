"""Agent 记忆：Checkpoint、共享黑板、私有日志（内存示意）。"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class AgentState:
    thread_id: str
    step: int = 0
    data: dict[str, Any] = field(default_factory=dict)


class InMemoryCheckpointStore:
    def __init__(self) -> None:
        self._checkpoints: dict[str, AgentState] = {}

    def save(self, state: AgentState) -> None:
        self._checkpoints[state.thread_id] = AgentState(
            thread_id=state.thread_id,
            step=state.step,
            data=dict(state.data),
        )

    def load(self, thread_id: str) -> AgentState | None:
        saved = self._checkpoints.get(thread_id)
        if saved is None:
            return None
        return AgentState(thread_id=saved.thread_id, step=saved.step, data=dict(saved.data))


class SharedBlackboard:
    """session 级共享 Hash；多 Agent 读写协作字段。"""

    def __init__(self) -> None:
        self._boards: dict[str, dict[str, str]] = {}

    def write(self, session_id: str, key: str, value: str) -> None:
        self._boards.setdefault(session_id, {})[key] = value

    def read(self, session_id: str, key: str) -> str | None:
        return self._boards.get(session_id, {}).get(key)


class PrivateAgentLog:
    """Agent 私有执行日志，跨 Agent 不可见。"""

    def __init__(self) -> None:
        self._logs: dict[tuple[str, str], list[str]] = {}

    def append(self, agent_id: str, session_id: str, message: str) -> None:
        self._logs.setdefault((agent_id, session_id), []).append(message)

    def read(self, agent_id: str, session_id: str) -> list[str]:
        return list(self._logs.get((agent_id, session_id), []))

    def can_read(self, reader_agent: str, owner_agent: str, session_id: str) -> bool:
        if reader_agent != owner_agent:
            return False
        return (owner_agent, session_id) in self._logs
