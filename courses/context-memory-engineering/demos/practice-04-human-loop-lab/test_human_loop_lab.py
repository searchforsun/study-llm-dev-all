"""人在回路 lab 离线验收。"""
from __future__ import annotations

from human_loop import (
    AuditLogStore,
    LongTermStore,
    MemoryApprovalQueue,
    MemoryEditService,
    MemoryFact,
)


def test_high_confidence_auto_writes():
    audit = AuditLogStore()
    store = LongTermStore()
    queue = MemoryApprovalQueue(store, audit)
    fact = MemoryFact(content="偏好邮箱接收报告", confidence=0.95, user_id="user_9527")
    status = queue.ingest(fact)
    assert status.value == "approved"
    assert fact.fact_id in store.facts
    assert any(e.event_type == "fact_auto_approved" for e in audit.entries)


def test_low_confidence_requires_approval():
    audit = AuditLogStore()
    store = LongTermStore()
    queue = MemoryApprovalQueue(store, audit)
    fact = MemoryFact(content="偏好早上8点收报告", confidence=0.75, user_id="user_9527")
    status = queue.ingest(fact)
    assert status.value == "pending"
    assert fact.fact_id not in store.facts
    queue.approve(fact.fact_id, "reviewer_a")
    assert fact.fact_id in store.facts


def test_reject_does_not_write():
    audit = AuditLogStore()
    store = LongTermStore()
    queue = MemoryApprovalQueue(store, audit)
    fact = MemoryFact(content="不确定的偏好", confidence=0.6, user_id="user_9527")
    queue.submit_for_review(fact)
    queue.reject(fact.fact_id, "reviewer_a", "证据不足")
    assert fact.fact_id not in store.facts
    assert any(e.event_type == "fact_rejected" for e in audit.entries)


def test_edit_and_approve_with_audit_trail():
    audit = AuditLogStore()
    store = LongTermStore()
    queue = MemoryApprovalQueue(store, audit)
    fact = MemoryFact(content="偏好短信", confidence=0.7, user_id="user_9527")
    queue.submit_for_review(fact)
    queue.edit_and_approve(fact.fact_id, "reviewer_b", "偏好邮箱接收报告")
    stored = store.facts[fact.fact_id]
    assert stored.content == "偏好邮箱接收报告"
    assert stored.version == 2
    assert len(audit.list_for_fact(fact.fact_id)) >= 1


def test_memory_edit_rollback():
    audit = AuditLogStore()
    store = LongTermStore()
    editor = MemoryEditService(audit)
    fact = MemoryFact(content="旧偏好", confidence=0.95, user_id="user_9527")
    store.write(fact)
    editor.edit(store, fact.fact_id, "新偏好", "admin")
    assert store.facts[fact.fact_id].content == "新偏好"
    editor.rollback(store, fact.fact_id, "admin")
    assert store.facts[fact.fact_id].content == "旧偏好"
