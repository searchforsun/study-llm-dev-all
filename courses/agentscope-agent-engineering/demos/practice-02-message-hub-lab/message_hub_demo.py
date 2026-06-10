"""MsgHub 主管-工人协作 Demo."""
from __future__ import annotations

import argparse
import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeMultiAgentFormatter
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel
from agentscope.pipeline import MsgHub
from agentscope.tool import Toolkit, ToolResponse


async def create_calendar_event(title: str, start_time: str) -> ToolResponse:
    """创建日历事件。"""
    return ToolResponse(content=f"日历已创建：{title} @ {start_time}")


async def send_email(to: str, subject: str, body: str) -> ToolResponse:
    """发送邮件。"""
    return ToolResponse(content=f"邮件已发至 {to}：{subject}")


def _model():
    return DashScopeChatModel(
        model_name="qwen-max",
        api_key=os.environ.get("DASHSCOPE_API_KEY", "sk-demo"),
    )


def _worker(name: str, role: str, tool_fn) -> ReActAgent:
    tk = Toolkit()
    tk.register_tool_function(tool_fn)
    return ReActAgent(
        name=name,
        sys_prompt=f"你是 {name}，专职{role}。只处理本领域并简要汇报。",
        model=_model(),
        formatter=DashScopeMultiAgentFormatter(),
        toolkit=tk,
        max_iters=4,
    )


async def run(manual_broadcast: bool) -> None:
    supervisor = ReActAgent(
        name="Supervisor",
        sys_prompt="协调 Calendar/Mail 专家完成用户请求并汇总。",
        model=_model(),
        formatter=DashScopeMultiAgentFormatter(),
        max_iters=5,
    )
    calendar = _worker("CalendarWorker", "日历", create_calendar_event)
    mail = _worker("MailWorker", "邮件", send_email)
    user_text = "订明天 10 点会议室 A，并邮件通知 team@corp.com"

    if manual_broadcast:
        async with MsgHub(participants=[supervisor], enable_auto_broadcast=False) as hub:
            hub.add(calendar)
            await hub.broadcast(Msg("user", f"仅 Calendar 处理：{user_text}", "user"))
            await calendar()
        print("[manual] MailWorker 未参与")
        return

    async with MsgHub(
        participants=[supervisor, calendar, mail],
        announcement=Msg("user", user_text, "user"),
    ):
        await supervisor(Msg("system", "请调度专家", "system"))
        await calendar()
        await mail()
        final = await supervisor()
    print(final.get_text_content())


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manual-broadcast", action="store_true")
    args = parser.parse_args()
    await run(manual_broadcast=args.manual_broadcast)


if __name__ == "__main__":
    asyncio.run(main())
