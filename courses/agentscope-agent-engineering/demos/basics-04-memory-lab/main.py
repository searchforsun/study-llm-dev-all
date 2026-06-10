"""短期记忆 + 窗口裁剪演示。"""
from __future__ import annotations

import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeChatFormatter
from agentscope.memory import InMemoryMemory
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel


async def main() -> None:
    memory = InMemoryMemory()
    agent = ReActAgent(
        name="MemoryDemo",
        sys_prompt="记住用户偏好并简短回答。",
        model=DashScopeChatModel(model_name="qwen-turbo", api_key=os.environ["DASHSCOPE_API_KEY"]),
        formatter=DashScopeChatFormatter(),
        memory=memory,
        max_iters=3,
    )
    await agent(Msg("user", "我叫 Alex，偏好简短回复。", "user"))
    reply = await agent(Msg("user", "我叫什么？", "user"))
    print(reply.get_text_content())
    print(f"memory_size={len(await memory.get_memory())}")


if __name__ == "__main__":
    asyncio.run(main())
