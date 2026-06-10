"""Tool / Skill 注册最小示例。"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import build_agent, build_toolkit, dashscope_model, is_mock, user_msg
from agentscope.tool import ToolResponse

from mock_mcp import search_kb


async def mcp_search(query: str) -> ToolResponse:
    """MCP 知识库检索（本 Demo 调用 mock_mcp）。"""
    return ToolResponse(content=search_kb(query))


async def main() -> None:
    if is_mock():
        print("年假：工龄 1-10 年享有 10 天带薪年假。")
        return
    agent = build_agent(
        "McpDemo",
        "用 mcp_search 回答政策问题。",
        model=dashscope_model("qwen-turbo"),
        toolkit=build_toolkit(mcp_search),
        max_iters=4,
    )
    reply = await agent.reply(user_msg("年假怎么算？"))
    print(reply.get_text_content())


if __name__ == "__main__":
    asyncio.run(main())
