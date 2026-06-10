"""HITL 审批 Demo — 模拟 ASK 流程与审计."""
from __future__ import annotations

import asyncio
import json

from audit import audit_hitl


async def send_email(to: str, subject: str, body: str) -> str:
    return f"邮件已发送至 {to}，主题：{subject}"


async def simulate_hitl_flow() -> None:
    """模拟 RequireUserConfirmEvent 处理（教学 stub，非完整 AgentScope 运行时）。"""
    original_args = {"to": "partner@external.com", "subject": "内部文档", "body": "..."}
    print("待审批工具: send_email")
    print("原参数:", json.dumps(original_args, ensure_ascii=False))
    decision = input("决裁 ALLOW/MODIFY/DENY [A/m/d]: ").strip().lower() or "a"

    modified = None
    if decision in ("m", "modify"):
        new_to = input("新收件人: ").strip() or original_args["to"]
        modified = {**original_args, "to": new_to}
        decision_label = "MODIFY"
        result_args = modified
    elif decision in ("d", "deny"):
        decision_label = "DENY"
        result_args = original_args
        print("已拒绝，不执行 send_email")
    else:
        decision_label = "ALLOW"
        result_args = original_args
        print(await send_email(**result_args))

    audit_hitl({
        "session_id": "hitl-demo-001",
        "tool_name": "send_email",
        "original_args": original_args,
        "modified_args": modified,
        "decision": decision_label,
        "operator_id": "cli-user",
    })


async def main() -> None:
    await simulate_hitl_flow()


if __name__ == "__main__":
    asyncio.run(main())
