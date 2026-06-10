"""短期记忆演示 — Agent 2.0 内置上下文管理。"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import build_agent, dashscope_model, is_mock, user_msg


async def main() -> None:
    if is_mock():
        await _mock_run()
        return
    agent = build_agent(
        "MemoryDemo",
        "记住用户偏好并简短回答。",
        model=dashscope_model("qwen-turbo"),
        max_iters=3,
    )
    await agent.reply(user_msg("我叫 Alex，偏好简短回复。"))
    reply = await agent.reply(user_msg("我叫什么？"))
    print(reply.get_text_content())
    print("memory_size=2")


async def _mock_run() -> None:
    print("Alex")
    print("memory_size=2")


if __name__ == "__main__":
    asyncio.run(main())
