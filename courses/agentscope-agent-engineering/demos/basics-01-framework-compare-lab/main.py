"""AgentScope 2.0 最小 Agent — 对照 LangGraph 心智模型。"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import build_agent, dashscope_model, is_mock, mock_msg, user_msg


async def main() -> None:
    if is_mock():
        print("Agent: CorpAssistCompare")
        print("Reply: AgentScope Msg 承载多模态块；LangGraph state 是图节点共享字典。")
        return
    agent = build_agent(
        "CorpAssistCompare",
        "你是 CorpAssist 选型助手，用一句话回答。",
        model=dashscope_model("qwen-turbo"),
        max_iters=3,
    )
    reply = await agent.reply(user_msg("AgentScope Msg 与 LangGraph state 有何不同？"))
    print(f"Agent: {agent.name}")
    print(f"Reply: {reply.get_text_content()}")


if __name__ == "__main__":
    asyncio.run(main())
