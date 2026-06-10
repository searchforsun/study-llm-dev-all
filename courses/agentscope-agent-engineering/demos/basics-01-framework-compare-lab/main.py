"""AgentScope 2.0 最小 Agent — 对照 LangGraph 心智模型。"""
from __future__ import annotations

import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeChatFormatter
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel


async def main() -> None:
    agent = ReActAgent(
        name="CorpAssistCompare",
        sys_prompt="你是 CorpAssist 选型助手，用一句话回答。",
        model=DashScopeChatModel(
            model_name="qwen-turbo",
            api_key=os.environ["DASHSCOPE_API_KEY"],
        ),
        formatter=DashScopeChatFormatter(),
        max_iters=3,
    )
    reply = await agent(Msg("user", "AgentScope Msg 与 LangGraph state 有何不同？", "user"))
    print(f"Agent: {agent.name}")
    print(f"Reply: {reply.get_text_content()}")


if __name__ == "__main__":
    asyncio.run(main())
