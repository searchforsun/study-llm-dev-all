"""消费 ReActAgent reply_stream 事件。"""
from __future__ import annotations

import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeChatFormatter
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel
from agentscope.tool import Toolkit, ToolResponse


async def query_calendar(date: str) -> ToolResponse:
    """查询指定日期的空闲会议室。"""
    return ToolResponse(content=f"{date} 10:00-11:00 会议室 A101 空闲")


async def main() -> None:
    tk = Toolkit()
    tk.register_tool_function(query_calendar)
    agent = ReActAgent(
        name="EventDemo",
        sys_prompt="调用工具回答用户。",
        model=DashScopeChatModel(model_name="qwen-turbo", api_key=os.environ["DASHSCOPE_API_KEY"]),
        formatter=DashScopeChatFormatter(),
        toolkit=tk,
        max_iters=5,
    )
    saw_tool = False
    async for event in agent.reply_stream(Msg("user", "查明天会议室", "user")):
        et = getattr(event, "type", str(event))
        print(f"EVENT: {et}")
        if "TOOL" in str(et).upper():
            saw_tool = True
    print(f"tool_event_seen={saw_tool}")


if __name__ == "__main__":
    asyncio.run(main())
