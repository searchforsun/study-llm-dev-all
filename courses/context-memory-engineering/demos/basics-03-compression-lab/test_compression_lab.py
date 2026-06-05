"""压缩 lab 离线验收。"""
from __future__ import annotations

import json
from pathlib import Path

from compression import (
    CompressionTrigger,
    RuleBasedCompressor,
    entity_retention_rate,
    turns_token_count,
)

ROOT = Path(__file__).parent
WINDOW_LIMIT = 32000


def _load_dialog() -> dict:
    return json.loads((ROOT / "conversation-10turn.json").read_text(encoding="utf-8"))


def test_trigger_fires_at_eighty_percent_history_budget():
    data = _load_dialog()
    trigger = CompressionTrigger(window_limit=WINDOW_LIMIT, history_layer_ratio=0.35)
    tokens = turns_token_count(data["turns"])
    # 样例对话 token 较小，用更低 window 模拟超阈值
    small_trigger = CompressionTrigger(window_limit=200, history_layer_ratio=0.35)
    line = small_trigger.trigger_line
    assert small_trigger.should_compress(line)
    assert not small_trigger.should_compress(line - 1)
    assert tokens > 0


def test_compression_reduces_tokens():
    data = _load_dialog()
    # 重复对话模拟长会话，压缩收益更明显
    inflated_turns = data["turns"] * 3
    compressor = RuleBasedCompressor()
    result = compressor.compress(inflated_turns, data["constraints"])
    assert result.after_tokens < result.before_tokens
    assert result.savings_ratio > 0.5


def test_entity_retention_at_least_ninety_percent():
    data = _load_dialog()
    compressor = RuleBasedCompressor()
    expected = compressor.extract_entities(data["turns"], data["constraints"])
    result = compressor.compress(data["turns"], data["constraints"])
    rate = entity_retention_rate(expected, result.entities)
    assert rate >= 0.9


def test_summary_contains_order_and_constraints():
    data = _load_dialog()
    result = RuleBasedCompressor().compress(data["turns"], data["constraints"])
    assert "20240501" in result.summary
    assert "请始终使用中文回复" in result.summary
