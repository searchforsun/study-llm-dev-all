#!/usr/bin/env python3
"""CorpAssist privacy lab — PII redaction for logs (C28)."""
from __future__ import annotations

import re

PII_RULES = [
    (re.compile(r"\b1[3-9]\d{9}\b"), "[PHONE]"),
    (re.compile(r"\b\d{17}[\dXx]\b"), "[ID_CARD]"),
    (re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"), "[EMAIL]"),
]


def redact(text: str) -> str:
    out = text
    for pattern, repl in PII_RULES:
        out = pattern.sub(repl, out)
    return out


def main() -> int:
    raw = "用户 13800138000 邮箱 zhang@corp.com 身份证 110101199001011234 咨询续费"
    cleaned = redact(raw)
    for token in ("13800138000", "zhang@corp.com", "110101199001011234"):
        if token in cleaned:
            print(f"FAIL: PII still present: {token}")
            return 1
    for marker in ("[PHONE]", "[EMAIL]", "[ID_CARD]"):
        if marker not in cleaned:
            print(f"FAIL: missing marker {marker}")
            return 1
    print("OK: CorpAssist PII redaction passed (C28)")
    print(cleaned)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
