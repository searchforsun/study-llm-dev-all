"""MsgHub 主管-工人协作 Demo（兼容层 MsgHub shim）。"""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import (
    MsgHub,
    build_agent,
    build_toolkit,
    dashscope_model,
    is_mock,
    system_msg,
    user_msg,
)
from agentscope.tool import ToolResponse


async def create_calendar_event(title: str, start_time: str) -> ToolResponse:
    """创建日历事件。"""
    return ToolResponse(content=f"日历已创建：{title} @ {start_time}")


async def send_email(to: str, subject: str, body: str) -> ToolResponse:
    """发送邮件。"""
    return ToolResponse(content=f"邮件已发至 {to}：{subject}")


def _worker(name: str, role: str, tool_fn):
    return build_agent(
        name,
        f"你是 {name}，专职{role}。只处理本领域并简要汇报。",
        model=dashscope_model("qwen-max"),
        toolkit=build_toolkit(tool_fn),
        max_iters=4,
    )


async def run(manual_broadcast: bool) -> None:
    user_text = "订明天 10 点会议室 A，并邮件通知 team@corp.com"
    if is_mock():
        if manual_broadcast:
            print("[manual] MailWorker 未参与")
            print("日历已创建：会议室 A @ 明天10:00")
        else:
            print("Supervisor: 已协调 Calendar/Mail 完成预订与通知")
        return

    supervisor = build_agent(
        "Supervisor",
        "协调 Calendar/Mail 专家完成用户请求并汇总。",
        model=dashscope_model("qwen-max"),
        max_iters=5,
    )
    calendar = _worker("CalendarWorker", "日历", create_calendar_event)
    mail = _worker("MailWorker", "邮件", send_email)

    if manual_broadcast:
        async with MsgHub(participants=[supervisor], enable_auto_broadcast=False) as hub:
            hub.add(calendar)
            await hub.broadcast(user_msg(f"仅 Calendar 处理：{user_text}"))
            await calendar.reply()
        print("[manual] MailWorker 未参与")
        return

    async with MsgHub(
        participants=[supervisor, calendar, mail],
        announcement=user_msg(user_text),
    ):
        await supervisor.reply(system_msg("请调度专家"))
        await calendar.reply()
        await mail.reply()
        final = await supervisor.reply()
    print(final.get_text_content())


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manual-broadcast", action="store_true")
    args = parser.parse_args()
    await run(manual_broadcast=args.manual_broadcast)


if __name__ == "__main__":
    asyncio.run(main())
