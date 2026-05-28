#!/usr/bin/env python3
"""CorpAssist 日志脱敏示例 — practice-03-privacy-lab"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

# 顺序：先长模式（身份证）再短模式（手机），避免误匹配
_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\d{17}[\dXx]"), "[ID_CARD]"),
    (re.compile(r"(?<!\d)1[3-9]\d{9}(?!\d)"), "[PHONE]"),
    (re.compile(r"[\w.-]+@[\w.-]+\.\w+"), "[EMAIL]"),
]


def redact(text: str) -> str:
    out = text
    for pat, repl in _PATTERNS:
        out = pat.sub(repl, out)
    return out


def prompt_fingerprint(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()[:16]


def safe_log_event(
    request_id: str,
    data_class: str,
    provider: str,
    prompt: str,
    completion: str,
) -> dict:
    return {
        "event": "llm.completion",
        "requestId": request_id,
        "dataClass": data_class,
        "provider": provider,
        "promptLen": len(prompt),
        "completionLen": len(completion),
        "promptFingerprint": prompt_fingerprint(prompt),
        "redactedPreview": redact(prompt)[:120],
    }


def main() -> int:
    samples_path = Path(__file__).with_name("sample-prompts.txt")
    lines = samples_path.read_text(encoding="utf-8").splitlines()
    for i, line in enumerate(lines, 1):
        if not line.strip() or line.startswith("#"):
            continue
        print(f"--- sample {i} ---")
        print("redact:", redact(line))
        event = safe_log_event(
            request_id=f"req-demo-{i:02d}",
            data_class="L3",
            provider="qwen-private-vllm",
            prompt=line,
            completion="（示例回复，生产不记录正文）",
        )
        print("log extra:", json.dumps(event, ensure_ascii=False))
        if re.search(r"1[3-9]\d{9}", json.dumps(event)):
            print("FAIL: plaintext phone in log payload", file=sys.stderr)
            return 1
    print("\nOK: no plaintext PII in structured log fields")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
