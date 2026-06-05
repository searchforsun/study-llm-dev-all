"""截断策略：FIFO、滑动窗口与约束检测（离线示意）。"""
from __future__ import annotations

from dataclasses import dataclass


def estimate_tokens(text: str) -> int:
    """粗算 token：约 4 字符 / token。"""
    return max(1, len(text) // 4)


def turns_token_count(turns: list[dict[str, str]]) -> int:
    return sum(estimate_tokens(t.get("content", "")) for t in turns)


@dataclass
class TrimResult:
    kept_turns: list[dict[str, str]]
    removed_turns: list[dict[str, str]]
    summary: str | None = None

    @property
    def token_count(self) -> int:
        total = turns_token_count(self.kept_turns)
        if self.summary:
            total += estimate_tokens(self.summary)
        return total


class FifoTruncation:
    def __init__(self, max_tokens: int) -> None:
        self.max_tokens = max_tokens

    def trim(self, turns: list[dict[str, str]]) -> TrimResult:
        kept: list[dict[str, str]] = []
        removed: list[dict[str, str]] = []
        for turn in reversed(turns):
            candidate = [turn, *kept]
            if turns_token_count(candidate) <= self.max_tokens:
                kept = candidate
            else:
                removed.insert(0, turn)
        removed = [t for t in turns if t not in kept]
        return TrimResult(kept_turns=kept, removed_turns=removed)


class SlidingWindow:
    def __init__(self, window_turns: int = 5) -> None:
        self.window_turns = window_turns

    def trim(self, turns: list[dict[str, str]]) -> TrimResult:
        if len(turns) <= self.window_turns:
            return TrimResult(kept_turns=list(turns), removed_turns=[])
        removed = turns[: -self.window_turns]
        kept = turns[-self.window_turns :]
        summary = self._summarize_removed(removed)
        return TrimResult(kept_turns=kept, removed_turns=removed, summary=summary)

    @staticmethod
    def _summarize_removed(removed: list[dict[str, str]]) -> str:
        snippets = [t["content"][:40] for t in removed if t.get("content")]
        return "摘要：" + "；".join(snippets[:4])


def assemble_context(
    constraints: list[str], result: TrimResult
) -> str:
    parts = ["[CONSTRAINTS]\n" + "\n".join(constraints)]
    if result.summary:
        parts.append(f"[SUMMARY]\n{result.summary}")
    for turn in result.kept_turns:
        role = turn.get("role", "user")
        parts.append(f"{role}: {turn.get('content', '')}")
    return "\n".join(parts)


def detect_constraint_loss(
    constraints: list[str], removed_turns: list[dict[str, str]]
) -> list[str]:
    """若约束关键词仅出现在被移除轮次中，报告丢失风险。"""
    removed_text = " ".join(t.get("content", "") for t in removed_turns)
    kept_in_removed_only: list[str] = []
    for c in constraints:
        keyword = c.split("：")[-1] if "：" in c else c
        if keyword in removed_text:
            kept_in_removed_only.append(c)
    return kept_in_removed_only
