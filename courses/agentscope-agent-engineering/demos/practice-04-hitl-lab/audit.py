"""HITL 审计日志 — append-only jsonl."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

AUDIT_PATH = Path(__file__).with_name("audit.jsonl")


def audit_hitl(record: dict) -> None:
    entry = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "session_id": record.get("session_id", "demo"),
        "tool": record["tool_name"],
        "original_args": record["original_args"],
        "modified_args": record.get("modified_args"),
        "decision": record["decision"],
        "operator": record.get("operator_id", "cli-user"),
        "trace_id": record.get("trace_id"),
    }
    with AUDIT_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    print("[audit]", json.dumps(entry, ensure_ascii=False))
