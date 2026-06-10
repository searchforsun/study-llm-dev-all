"""DashScope 模型无关编程 — 切换 model_name。"""
from __future__ import annotations

import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeChatFormatter
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel


async def run_with_model(model_name: str, prompt: str) -> None:
    agent = ReActAgent(
        name=f"Model-{model_name}",
        sys_prompt="一句话回答。",
        model=DashScopeChatModel(model_name=model_name, api_key=os.environ["DASHSCOPE_API_KEY"]),
        formatter=DashScopeChatFormatter(),
        max_iters=2,
    )
    reply = await agent(Msg("user", prompt, "user"))
    print(f"[{model_name}] {reply.get_text_content()}")


async def main() -> None:
    await run_with_model("qwen-turbo", "CorpAssist 路由：简单问答用哪个模型？")
    await run_with_model("qwen-max", "CorpAssist 路由：复杂多步任务用哪个模型？")


if __name__ == "__main__":
    asyncio.run(main())
