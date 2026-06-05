"""SAA 上下文 lab 离线验收。"""
from __future__ import annotations

from saa_context import (
    ContextCompressAdvisor,
    ContextEditingAdvisor,
    InMemoryCheckpointStore,
    StateGraphReducer,
)


def test_editing_advisor_redacts_pii_and_truncates():
    advisor = ContextEditingAdvisor(max_field_len=20)
    raw = "联系手机13800138000，" + "x" * 30
    result = advisor.edit(raw)
    assert "[PHONE_REDACTED]" in result.text
    assert result.redacted
    assert len(result.text) <= 40


def test_compress_advisor_triggers_at_eighty_percent():
    comp = ContextCompressAdvisor(threshold=0.8)
    budget = 1000
    assert comp.should_compress(800, budget)
    assert not comp.should_compress(700, budget)


def test_compress_protects_order_id():
    comp = ContextCompressAdvisor()
    messages = ["历史1", "历史2", "查订单 20240501"]
    result = comp.compress_messages(messages, protected=["20240501", "user_9527"])
    assert "20240501" in result.text
    assert result.compressed


def test_state_reducer_and_checkpoint():
    reducer = StateGraphReducer()
    msgs = reducer.concat_and_trim([f"m{i}" for i in range(12)], max_items=8)
    assert len(msgs) == 8
    mem = reducer.last_write_wins({"a": 1}, {"b": 2})
    assert mem == {"a": 1, "b": 2}

    ckpt = InMemoryCheckpointStore()
    ckpt.save("thread-1", {"step": 2, "order": "20240501"})
    loaded = ckpt.load("thread-1")
    assert loaded["step"] == 2
