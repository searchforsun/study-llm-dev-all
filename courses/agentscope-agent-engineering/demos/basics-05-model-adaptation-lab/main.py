"""DashScope 模型无关编程 — 切换 model。"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import build_agent, dashscope_model, is_mock, user_msg


async def run_with_model(model: str, prompt: str) -> None:
    if is_mock():
        print(f"[{model}] mock: {prompt[:20]}...")
        return
    agent = build_agent(
        f"Model-{model}",
        "一句话回答。",
        model=dashscope_model(model),
        max_iters=2,
    )
    reply = await agent.reply(user_msg(prompt))
    print(f"[{model}] {reply.get_text_content()}")


async def main() -> None:
    await run_with_model("qwen-turbo", "CorpAssist 路由：简单问答用哪个模型？")
    await run_with_model("qwen-max", "CorpAssist 路由：复杂多步任务用哪个模型？")


if __name__ == "__main__":
    asyncio.run(main())
