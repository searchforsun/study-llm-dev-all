#!/usr/bin/env python3
"""CorpAssist 最小调用 — httpx（与 curl / 章节代码同形）。"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys

import httpx

BASE_URL = os.environ.get("CORPASSIST_LLM_BASE_URL", "").rstrip("/")
API_KEY = os.environ.get("CORPASSIST_LLM_KEY", "")
MODEL = os.environ.get("CORPASSIST_LLM_MODEL", "qwen-plus")


async def chat_once(user_text: str, *, stream: bool = False) -> str:
    if not BASE_URL or not API_KEY:
        raise RuntimeError("请设置 CORPASSIST_LLM_BASE_URL 与 CORPASSIST_LLM_KEY（见 .env.example）")

    timeout = httpx.Timeout(60.0, connect=5.0)
    headers = {"Authorization": f"Bearer {API_KEY}"}

    async with httpx.AsyncClient(base_url=BASE_URL, headers=headers, timeout=timeout) as client:
        if not stream:
            r = await client.post(
                "/chat/completions",
                json={
                    "model": MODEL,
                    "stream": False,
                    "temperature": 0.2,
                    "max_tokens": 256,
                    "messages": [
                        {"role": "system", "content": "你是 CorpAssist 企业助手。"},
                        {"role": "user", "content": user_text},
                    ],
                },
            )
            r.raise_for_status()
            data = r.json()
            usage = data.get("usage", {})
            print(
                f"usage: prompt={usage.get('prompt_tokens')} "
                f"completion={usage.get('completion_tokens')}",
                file=sys.stderr,
            )
            content = data["choices"][0]["message"]["content"]
            print(content)
            return content

        parts: list[str] = []
        async with client.stream(
            "POST",
            "/chat/completions",
            json={
                "model": MODEL,
                "stream": True,
                "messages": [{"role": "user", "content": user_text}],
            },
        ) as r:
            r.raise_for_status()
            async for line in r.aiter_lines():
                if not line.startswith("data: "):
                    continue
                payload = line[6:].strip()
                if payload == "[DONE]":
                    break
                chunk = json.loads(payload)
                delta = chunk["choices"][0].get("delta", {})
                if text := delta.get("content"):
                    parts.append(text)
                    print(text, end="", flush=True)
                usage = chunk.get("usage")
                if usage:
                    print(f"\nusage: {usage}", file=sys.stderr)
        print()
        return "".join(parts)


def main() -> None:
    parser = argparse.ArgumentParser(description="CorpAssist httpx 最小客户端")
    parser.add_argument("question", nargs="?", default="用一句话解释 OpenAI 兼容 API")
    parser.add_argument("--stream", action="store_true", help="启用 SSE 流式")
    args = parser.parse_args()
    asyncio.run(chat_once(args.question, stream=args.stream))


if __name__ == "__main__":
    main()
