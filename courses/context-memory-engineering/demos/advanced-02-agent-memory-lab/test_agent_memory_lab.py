"""Agent 记忆 lab 离线验收。"""
from __future__ import annotations

from agent_memory import (
    AgentState,
    InMemoryCheckpointStore,
    PrivateAgentLog,
    SharedBlackboard,
)

SESSION = "corpassist:session:acme_corp:user_9527"
THREAD = SESSION  # thread_id 与 session_id 对齐


def test_checkpoint_save_and_resume():
    store = InMemoryCheckpointStore()
    state = AgentState(thread_id=THREAD, step=1, data={"order": "20240501"})
    store.save(state)

    state.step = 2
    state.data["status"] = "shipped"
    store.save(state)

    loaded = store.load(THREAD)
    assert loaded is not None
    assert loaded.step == 2
    assert loaded.data["order"] == "20240501"


def test_shared_blackboard_cross_agent():
    board = SharedBlackboard()
    board.write(SESSION, "order_status", "已发货")
    assert board.read(SESSION, "order_status") == "已发货"


def test_private_log_isolated_between_agents():
    priv = PrivateAgentLog()
    priv.append("agent_a", SESSION, "内部推理 A")
    assert priv.can_read("agent_a", "agent_a", SESSION)
    assert not priv.can_read("agent_b", "agent_a", SESSION)
    assert priv.read("agent_b", SESSION) == []


def test_thread_id_matches_session_id():
    store = InMemoryCheckpointStore()
    store.save(AgentState(thread_id=THREAD, step=1))
    assert store.load(SESSION) is not None
