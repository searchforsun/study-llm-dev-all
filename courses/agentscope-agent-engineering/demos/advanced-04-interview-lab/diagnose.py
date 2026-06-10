"""AgentScope Trace 简易诊断 — 对应 advanced-04-interview 章。"""
import json
import sys
from pathlib import Path


def detect_loop(events: list) -> bool:
    calls = [
        (e["payload"]["tool_name"], json.dumps(e["payload"].get("arguments", {}), sort_keys=True))
        for e in events
        if e.get("event_type") == "tool_call"
    ]
    if len(calls) < 3:
        return False
    return len(set(calls[-3:])) == 1


def detect_fake(events: list, final_text: str) -> bool:
    has_book = any(
        e.get("event_type") == "tool_call" and e["payload"]["tool_name"] == "book_meeting_room"
        for e in events
    )
    claims_booked = "预订" in final_text or "A301" in final_text
    return claims_booked and not has_book


def diagnose(trace: dict) -> dict:
    events = trace.get("events", [])
    final = trace.get("final_text", "")
    if detect_loop(events):
        return {"verdict": "LOOP_DETECTED", "fix": "充实 tool_result 或合并重复工具"}
    if detect_fake(events, final):
        return {"verdict": "FAKE_EXECUTION", "fix": "强制 tool_call 审计 + 禁止 Prompt 假设执行"}
    return {"verdict": "OK", "fix": "无"}


if __name__ == "__main__":
    path = Path(sys.argv[1])
    trace = json.loads(path.read_text(encoding="utf-8"))
    result = diagnose(trace)
    print(json.dumps(result, ensure_ascii=False, indent=2))
