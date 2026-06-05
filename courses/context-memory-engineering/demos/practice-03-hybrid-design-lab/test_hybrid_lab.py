"""混合记忆 lab 离线验收。"""
from __future__ import annotations

from fact_store import InMemoryFactStore
from hybrid_memory import HybridMemoryReader, HybridMemoryWriter, MemRouter
from session_store import InMemorySessionStore

TENANT = "acme_corp"
USER = "user_9527"


def test_write_through_populates_session_and_long_term():
    session = InMemorySessionStore()
    long_term = InMemoryFactStore()
    writer = HybridMemoryWriter(session, long_term)

    writer.write_turn(
        TENANT,
        USER,
        "以后请用短信给我发报告。",
        "好的，已记录您偏好短信接收报告。",
    )

    history = session.load_history(TENANT, USER)
    assert len(history) == 2
    facts = long_term.recall(TENANT, USER, "preference")
    assert any("短信" in f for f in facts)


def test_read_merge_dedupes():
    session = InMemorySessionStore()
    long_term = InMemoryFactStore()
    writer = HybridMemoryWriter(session, long_term)
    reader = HybridMemoryReader(session, long_term)

    writer.write_turn(TENANT, USER, "查订单 20240501", "订单处理中")
    writer.write_turn(TENANT, USER, "还是查订单 20240501", "仍在处理")

    merged = reader.read_context(TENANT, USER, "查订单 20240501")
    assert "查订单 20240501" in merged
    assert len(merged) == len(set(merged))


def test_mem_router_skips_long_term_for_greeting():
    router = MemRouter()
    assert router.route("你好") == {"session"}
    assert "long_term" in router.route("帮我查上次说的订单")


def test_session_correction_overrides_long_term_preference():
    session = InMemorySessionStore()
    long_term = InMemoryFactStore()
    writer = HybridMemoryWriter(session, long_term)
    reader = HybridMemoryReader(session, long_term)

    writer.write_turn(
        TENANT,
        USER,
        "以后用短信发报告。",
        "已记录短信偏好。",
    )
    writer.write_turn(
        TENANT,
        USER,
        "我之前的偏好错了，应该是邮箱接收报告。",
        "好的，已改为邮箱接收报告。",
    )

    merged = reader.read_context(TENANT, USER, "报告偏好")
    active_facts = long_term.recall(TENANT, USER, "preference")
    assert any("邮箱" in f for f in active_facts)
    assert not any("短信" in f for f in active_facts)
    assert any("邮箱" in item for item in merged)
