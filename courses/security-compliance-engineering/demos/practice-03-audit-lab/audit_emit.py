import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

SCHEMA = json.loads((Path(__file__).parent / "audit_event.schema.json").read_text(encoding="utf-8"))


def emit(event_type: str, user_id: str, trace_id: str, citations=None) -> dict:
    event = {
        "trace_id": trace_id,
        "event_type": event_type,
        "user_id_hash": hashlib.sha256(user_id.encode()).hexdigest()[:16],
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "citations": citations or [],
    }
    required = set(SCHEMA["required"])
    if not required.issubset(event.keys()):
        raise ValueError("missing required audit fields")
    return event
