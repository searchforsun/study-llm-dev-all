from typing import Any


def refuse(code: str, audit_ctx: dict[str, Any]) -> dict[str, Any]:
    audit_ctx["refusal_code"] = code
    messages = {
        "POLICY_VIOLATION": "该请求违反 CorpAssist 客服政策，无法执行。",
        "NO_EVIDENCE": "知识库中未找到可引用依据，无法回答。",
    }
    return {"refused": True, "code": code, "message": messages.get(code, "已拒答。"), "audit": audit_ctx}
