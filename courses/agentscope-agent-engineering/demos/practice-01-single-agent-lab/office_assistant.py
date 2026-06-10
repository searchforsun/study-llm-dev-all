"""CorpAssist 办公助手 — ReActAgent 单 Agent Demo."""
from __future__ import annotations

import argparse
import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeChatFormatter
from agentscope.memory import InMemoryMemory
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel
from agentscope.tool import Toolkit, ToolResponse


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


def build_agent(max_iters: int = 8) -> ReActAgent:
    toolkit = Toolkit()
    for fn in (create_calendar_event, send_email, create_ticket, transfer_to_human):
        toolkit.register_tool_function(fn)
    api_key = os.environ.get("DASHSCOPE_API_KEY", "sk-demo")
    return ReActAgent(
        name="CorpAssistOffice",
        sys_prompt=(
            "你是 CorpAssist 办公助手。优先用工具完成请求；缺参数时追问；"
            f"最多 {max_iters} 步；无法处理或预算耗尽时调用 transfer_to_human。"
        ),
        model=DashScopeChatModel(model_name="qwen-max", api_key=api_key),
        formatter=DashScopeChatFormatter(),
        memory=InMemoryMemory(),
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
    agent = build_agent(max_iters=args.max_iters)
    result = await agent(Msg("user", args.query, "user"))
    print(result.get_text_content())


if __name__ == "__main__":
    asyncio.run(main())
