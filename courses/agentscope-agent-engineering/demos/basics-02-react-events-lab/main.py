"""消费 Agent reply_stream 事件。"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import (
    build_agent,
    build_toolkit,
    dashscope_model,
    is_mock,
    user_msg,
)
from agentscope.tool import ToolResponse


async def query_calendar(date: str) -> ToolResponse:
    """查询指定日期的空闲会议室。"""
    return ToolResponse(content=f"{date} 10:00-11:00 会议室 A101 空闲")


async def main() -> None:
    if is_mock():
        print("EVENT: text")
        print("EVENT: tool_call")
        print("tool_event_seen=True")
        return
    agent = build_agent(
        "EventDemo",
        "调用工具回答用户。",
        model=dashscope_model("qwen-turbo"),
        toolkit=build_toolkit(query_calendar),
        max_iters=5,
    )
    saw_tool = False
    async for event in agent.reply_stream(user_msg("查明天会议室")):
        et = getattr(event, "type", str(event))
        print(f"EVENT: {et}")
        if "TOOL" in str(et).upper():
            saw_tool = True
    print(f"tool_event_seen={saw_tool}")


if __name__ == "__main__":
    asyncio.run(main())
