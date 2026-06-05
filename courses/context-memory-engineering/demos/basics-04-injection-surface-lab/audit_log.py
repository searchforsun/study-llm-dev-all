"""污染事件审计日志。"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone


@dataclass(frozen=True)
class AuditEntry:
    timestamp: str
    source: str
    pattern_id: str
    severity: str
    action: str
    snippet: str


class AuditLog:
    REQUIRED_FIELDS = ("timestamp", "source", "pattern_id", "severity", "action", "snippet")

    def __init__(self) -> None:
        self.entries: list[AuditEntry] = []

    def record(
        self,
        *,
        source: str,
        pattern_id: str,
        severity: str,
        action: str,
        snippet: str,
    ) -> AuditEntry:
        entry = AuditEntry(
            timestamp=datetime.now(timezone.utc).isoformat(),
            source=source,
            pattern_id=pattern_id,
            severity=severity,
            action=action,
            snippet=snippet[:120],
        )
        self.entries.append(entry)
        return entry
