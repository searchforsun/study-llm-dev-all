"""CorpAssist 办公助手 — AgentScope 2.0 单 Agent Demo."""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import build_agent, build_toolkit, dashscope_model, is_mock, user_msg
from agentscope.tool import ToolResponse


async def create_calendar_event(title: str, start_time: str, attendees: str = "") -> ToolResponse:
    """创建日历事件。title 为标题，start_time 为 ISO8601 时间，attendees 为逗号分隔邮箱。"""
    event_id = f"EVT-{abs(hash(title + start_time)) % 10000:04d}"
    return ToolResponse(content=f"已创建日历 {event_id}：{title} @ {start_time}")


async def send_email(to: str, subject: str, body: str) -> ToolResponse:
    """发送邮件。to 为收件人，subject 为主题，body 为正文。"""
    return ToolResponse(content=f"邮件已发送至 {to}，主题：{subject}")


async def create_ticket(category: str, description: str) -> ToolResponse:
    """创建 IT 工单。category 为类别，description 为问题描述。"""
    ticket_id = f"TK-{abs(hash(description)) % 100000:05d}"
    return ToolResponse(content=f"工单 {ticket_id} 已创建（{category}）")


async def transfer_to_human(reason: str) -> ToolResponse:
    """转接人工。Agent 无法完成、用户明确要求或预算耗尽时调用。"""
    return ToolResponse(content=f"已转人工，原因：{reason}。预计 5 分钟内接入。")


def build_office_agent(max_iters: int = 8):
    toolkit = build_toolkit(
        create_calendar_event,
        send_email,
        create_ticket,
        transfer_to_human,
    )
    return build_agent(
        "CorpAssistOffice",
        (
            "你是 CorpAssist 办公助手。优先用工具完成请求；缺参数时追问；"
            f"最多 {max_iters} 步；无法处理或预算耗尽时调用 transfer_to_human。"
        ),
        model=dashscope_model("qwen-max"),
        toolkit=toolkit,
        max_iters=max_iters,
    )


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--max-iters", type=int, default=8)
    parser.add_argument(
        "--query",
        default="帮我把周五 10 点产品评审加到日历，并邮件通知 team@corp.com",
    )
    args = parser.parse_args()
    if is_mock():
        print("已创建日历 EVT-1234：产品评审 @ 周五10:00；邮件已发送至 team@corp.com")
        return
    agent = build_office_agent(max_iters=args.max_iters)
    result = await agent.reply(user_msg(args.query))
    print(result.get_text_content())


if __name__ == "__main__":
    asyncio.run(main())
