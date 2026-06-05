"""压缩触发器与规则型摘要（离线示意，无 LLM 调用）。"""
from __future__ import annotations

import re
from dataclasses import dataclass

ORDER_RE = re.compile(r"\d{8}")
ADDRESS_RE = re.compile(r"[\u4e00-\u9fff]{2,}(?:路|街|号|区)")


def estimate_tokens(text: str) -> int:
    return max(1, len(text) // 4)


def turns_token_count(turns: list[dict[str, str]]) -> int:
    return sum(estimate_tokens(t.get("content", "")) for t in turns)


@dataclass
class CompressionResult:
    summary: str
    entities: list[str]
    before_tokens: int
    after_tokens: int

    @property
    def savings_ratio(self) -> float:
        if self.before_tokens == 0:
            return 0.0
        return 1 - self.after_tokens / self.before_tokens


class CompressionTrigger:
    """History 层 token 超过 layer_budget × threshold 时触发。"""

    def __init__(
        self,
        window_limit: int,
        history_layer_ratio: float = 0.35,
        threshold: float = 0.8,
    ) -> None:
        self.layer_budget = int(window_limit * history_layer_ratio)
        self.threshold = threshold

    def should_compress(self, current_tokens: int) -> bool:
        return current_tokens >= int(self.layer_budget * self.threshold)

    @property
    def trigger_line(self) -> int:
        return int(self.layer_budget * self.threshold)


class RuleBasedCompressor:
    """规则提取关键实体并生成摘要（Lab 示意）。"""

    def extract_entities(
        self, turns: list[dict[str, str]], constraints: list[str]
    ) -> list[str]:
        found: list[str] = []
        text = " ".join(t.get("content", "") for t in turns)
        for c in constraints:
            if c not in found:
                found.append(c)
        for m in ORDER_RE.finditer(text):
            entity = m.group()
            if entity not in found:
                found.append(entity)
        for m in ADDRESS_RE.finditer(text):
            if m.group() not in found:
                found.append(m.group())
        if "加急" in text and "加急" not in found:
            found.append("加急")
        return found

    def compress(
        self, turns: list[dict[str, str]], constraints: list[str]
    ) -> CompressionResult:
        before = turns_token_count(turns)
        entities = self.extract_entities(turns, constraints)
        compact = " | ".join(entities[:8])
        summary = f"[COMPRESSED_HISTORY] {compact} [/COMPRESSED_HISTORY]"
        after = estimate_tokens(summary)
        return CompressionResult(
            summary=summary,
            entities=entities,
            before_tokens=before,
            after_tokens=after,
        )


def entity_retention_rate(expected: list[str], retained: list[str]) -> float:
    if not expected:
        return 1.0
    hit = sum(1 for e in expected if any(e in r or r in e for r in retained))
    return hit / len(expected)
