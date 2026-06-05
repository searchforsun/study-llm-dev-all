"""人在回路：审批队列、记忆编辑与 append-only 审计。"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any
from uuid import uuid4

AUTO_APPROVE_THRESHOLD = 0.9


class ApprovalStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    EDITED = "edited"


@dataclass
class MemoryFact:
    content: str
    confidence: float
    user_id: str
    fact_id: str = field(default_factory=lambda: f"fact_{uuid4().hex[:8]}")
    version: int = 1


@dataclass(frozen=True)
class AuditEntry:
    event_type: str
    fact_id: str
    before_content: str | None
    after_content: str | None
    operator: str
    reason: str
    created_at: str


class AuditLogStore:
    """Append-only；不支持 update/delete。"""

    def __init__(self) -> None:
        self._entries: list[AuditEntry] = []

    def append(
        self,
        *,
        event_type: str,
        fact_id: str,
        before_content: str | None,
        after_content: str | None,
        operator: str,
        reason: str = "",
    ) -> AuditEntry:
        entry = AuditEntry(
            event_type=event_type,
            fact_id=fact_id,
            before_content=before_content,
            after_content=after_content,
            operator=operator,
            reason=reason,
            created_at=datetime.now(timezone.utc).isoformat(),
        )
        self._entries.append(entry)
        return entry

    def list_for_fact(self, fact_id: str) -> list[AuditEntry]:
        return [e for e in self._entries if e.fact_id == fact_id]

    @property
    def entries(self) -> list[AuditEntry]:
        return list(self._entries)


class LongTermStore:
    def __init__(self) -> None:
        self.facts: dict[str, MemoryFact] = {}

    def write(self, fact: MemoryFact) -> None:
        self.facts[fact.fact_id] = fact


class MemoryEditService:
    def __init__(self, audit: AuditLogStore) -> None:
        self.audit = audit
        self._history: dict[str, list[MemoryFact]] = {}

    def edit(
        self, store: LongTermStore, fact_id: str, new_content: str, operator: str
    ) -> MemoryFact:
        old = store.facts[fact_id]
        self._history.setdefault(fact_id, []).append(old)
        updated = MemoryFact(
            content=new_content,
            confidence=old.confidence,
            user_id=old.user_id,
            fact_id=fact_id,
            version=old.version + 1,
        )
        store.write(updated)
        self.audit.append(
            event_type="fact_edited",
            fact_id=fact_id,
            before_content=old.content,
            after_content=new_content,
            operator=operator,
        )
        return updated

    def rollback(self, store: LongTermStore, fact_id: str, operator: str) -> MemoryFact:
        history = self._history.get(fact_id, [])
        if not history:
            raise ValueError("no history to rollback")
        prev = history.pop()
        store.write(prev)
        self.audit.append(
            event_type="fact_rollback",
            fact_id=fact_id,
            before_content=store.facts[fact_id].content,
            after_content=prev.content,
            operator=operator,
            reason="rollback",
        )
        return prev


class MemoryApprovalQueue:
    def __init__(self, long_term: LongTermStore, audit: AuditLogStore) -> None:
        self.long_term = long_term
        self.audit = audit
        self.pending: list[dict[str, Any]] = []

    def ingest(self, fact: MemoryFact, operator: str = "system") -> ApprovalStatus:
        if fact.confidence >= AUTO_APPROVE_THRESHOLD:
            self.long_term.write(fact)
            self.audit.append(
                event_type="fact_auto_approved",
                fact_id=fact.fact_id,
                before_content=None,
                after_content=fact.content,
                operator=operator,
            )
            return ApprovalStatus.APPROVED
        self.submit_for_review(fact)
        return ApprovalStatus.PENDING

    def submit_for_review(self, fact: MemoryFact) -> None:
        self.pending.append({"fact": fact, "status": ApprovalStatus.PENDING})

    def _find(self, fact_id: str) -> dict[str, Any]:
        for entry in self.pending:
            if entry["fact"].fact_id == fact_id:
                return entry
        raise KeyError(fact_id)

    def approve(self, fact_id: str, reviewer: str) -> None:
        entry = self._find(fact_id)
        fact: MemoryFact = entry["fact"]
        entry["status"] = ApprovalStatus.APPROVED
        self.long_term.write(fact)
        self.audit.append(
            event_type="fact_approved",
            fact_id=fact_id,
            before_content=None,
            after_content=fact.content,
            operator=reviewer,
        )

    def reject(self, fact_id: str, reviewer: str, reason: str) -> None:
        entry = self._find(fact_id)
        entry["status"] = ApprovalStatus.REJECTED
        self.audit.append(
            event_type="fact_rejected",
            fact_id=fact_id,
            before_content=entry["fact"].content,
            after_content=None,
            operator=reviewer,
            reason=reason,
        )

    def edit_and_approve(
        self, fact_id: str, reviewer: str, edited_content: str
    ) -> None:
        entry = self._find(fact_id)
        old: MemoryFact = entry["fact"]
        updated = MemoryFact(
            content=edited_content,
            confidence=old.confidence,
            user_id=old.user_id,
            fact_id=fact_id,
            version=old.version + 1,
        )
        entry["fact"] = updated
        entry["status"] = ApprovalStatus.EDITED
        self.long_term.write(updated)
        self.audit.append(
            event_type="fact_edited_approved",
            fact_id=fact_id,
            before_content=old.content,
            after_content=edited_content,
            operator=reviewer,
        )
