#!/usr/bin/env python3
"""CorpAssist 最小调用 — OpenAI SDK（base_url 指向 OpenAI 兼容网关）。"""
from __future__ import annotations

import os
import sys

from openai import OpenAI


def main() -> None:
    base = os.environ.get("CORPASSIST_LLM_BASE_URL", "").rstrip("/")
    key = os.environ.get("CORPASSIST_LLM_KEY", "")
    model = os.environ.get("CORPASSIST_LLM_MODEL", "qwen-plus")
    if not base or not key:
        print("请设置 CORPASSIST_LLM_BASE_URL 与 CORPASSIST_LLM_KEY", file=sys.stderr)
        sys.exit(1)

    client = OpenAI(api_key=key, base_url=base)
    question = sys.argv[1] if len(sys.argv) > 1 else "CorpAssist 制度问答适合流式还是非流式？"

    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": question}],
        stream=False,
        max_tokens=256,
        temperature=0.2,
    )
    print(resp.choices[0].message.content)
    if resp.usage:
        print(
            f"usage: prompt={resp.usage.prompt_tokens} "
            f"completion={resp.usage.completion_tokens}",
            file=sys.stderr,
        )


if __name__ == "__main__":
    main()
