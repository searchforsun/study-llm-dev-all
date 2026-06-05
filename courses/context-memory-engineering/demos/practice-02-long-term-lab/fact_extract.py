"""规则型事实提取（Lab 示意；生产环境用 LLM + schema 校验）。"""
from __future__ import annotations

import re
from typing import Any

ORDER_RE = re.compile(r"\d{8}")
PREFERENCE_PATTERNS = [
    (re.compile(r"不喜欢(.+?)(?:包装|风格|颜色)"), "preference"),
    (re.compile(r"偏好(.+?)(?:接收|通知)"), "preference"),
    (re.compile(r"不要(.+?)(?:通知|短信)"), "constraint"),
    (re.compile(r"(简约风格)"), "preference"),
]


def extract_facts_from_dialog(dialog: dict[str, Any]) -> list[dict[str, str]]:
    tenant = dialog["tenant_id"]
    user = dialog["user_id"]
    facts: list[dict[str, str]] = []
    seen: set[str] = set()

    for turn in dialog.get("turns", []):
        if turn.get("role") != "user":
            continue
        text = turn["content"]

        for m in ORDER_RE.finditer(text):
            ft = f"订单 {m.group()}"
            if ft not in seen:
                facts.append(
                    {
                        "tenant_id": tenant,
                        "user_id": user,
                        "fact_text": ft,
                        "fact_type": "order",
                    }
                )
                seen.add(ft)

        for pattern, ftype in PREFERENCE_PATTERNS:
            m = pattern.search(text)
            if not m:
                continue
            snippet = m.group(0).strip()
            if snippet in seen:
                continue
            facts.append(
                {
                    "tenant_id": tenant,
                    "user_id": user,
                    "fact_text": snippet,
                    "fact_type": ftype,
                }
            )
            seen.add(snippet)

        if "邮箱" in text and "邮箱" not in seen:
            facts.append(
                {
                    "tenant_id": tenant,
                    "user_id": user,
                    "fact_text": "偏好邮箱接收报告",
                    "fact_type": "preference",
                }
            )
            seen.add("邮箱")

    return facts
