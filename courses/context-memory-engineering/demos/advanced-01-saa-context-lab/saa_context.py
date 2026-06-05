"""SAA Advisor 链示意：压缩、编辑、State Reducer（Python 离线对照 Java/SAA）。"""
from __future__ import annotations

import re
from dataclasses import dataclass

PHONE_RE = re.compile(r"1\d{10}")
ID_RE = re.compile(r"\d{17}[\dXx]")


@dataclass
class AdvisorResult:
    text: str
    compressed: bool = False
    redacted: bool = False


class ContextEditingAdvisor:
    def __init__(self, max_field_len: int = 500) -> None:
        self.max_field_len = max_field_len

    def edit(self, text: str) -> AdvisorResult:
        redacted = False
        if PHONE_RE.search(text):
            text = PHONE_RE.sub("[PHONE_REDACTED]", text)
            redacted = True
        if ID_RE.search(text):
            text = ID_RE.sub("[ID_REDACTED]", text)
            redacted = True
        if len(text) > self.max_field_len:
            text = text[: self.max_field_len] + "…[TRUNCATED]"
            redacted = True
        return AdvisorResult(text=text, redacted=redacted)


class ContextCompressAdvisor:
    def __init__(self, threshold: float = 0.8) -> None:
        self.threshold = threshold

    def should_compress(self, current_tokens: int, budget: int) -> bool:
        return current_tokens >= int(budget * self.threshold)

    def compress_messages(self, messages: list[str], protected: list[str]) -> AdvisorResult:
        joined = "\n".join(messages)
        kept = [p for p in protected if p in joined]
        summary = "[SUMMARY] " + " | ".join(kept + [messages[-1][:80]])
        return AdvisorResult(text=summary, compressed=True)


class StateGraphReducer:
    """示意 concatAndTrim + lastWriteWins。"""

    @staticmethod
    def concat_and_trim(messages: list[str], max_items: int = 8) -> list[str]:
        return messages[-max_items:]

    @staticmethod
    def last_write_wins(old: dict, new: dict) -> dict:
        merged = dict(old)
        merged.update(new)
        return merged


class InMemoryCheckpointStore:
    def __init__(self) -> None:
        self._state: dict[str, dict] = {}

    def save(self, thread_id: str, state: dict) -> None:
        self._state[thread_id] = dict(state)

    def load(self, thread_id: str) -> dict | None:
        saved = self._state.get(thread_id)
        return dict(saved) if saved else None
