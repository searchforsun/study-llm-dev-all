"""Tool / Skill 注册最小示例。"""
from __future__ import annotations

import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeChatFormatter
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel
from agentscope.tool import Toolkit, ToolResponse

from mock_mcp import search_kb


async def mcp_search(query: str) -> ToolResponse:
    """MCP 知识库检索（本 Demo 调用 mock_mcp）。"""
    return ToolResponse(content=search_kb(query))


async def main() -> None:
    tk = Toolkit()
    tk.register_tool_function(mcp_search)
    agent = ReActAgent(
        name="McpDemo",
        sys_prompt="用 mcp_search 回答政策问题。",
        model=DashScopeChatModel(model_name="qwen-turbo", api_key=os.environ["DASHSCOPE_API_KEY"]),
        formatter=DashScopeChatFormatter(),
        toolkit=tk,
        max_iters=4,
    )
    reply = await agent(Msg("user", "年假怎么算？", "user"))
    print(reply.get_text_content())


if __name__ == "__main__":
    asyncio.run(main())
