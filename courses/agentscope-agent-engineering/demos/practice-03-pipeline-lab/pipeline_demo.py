"""Pipeline sequential / fanout Demo."""
from __future__ import annotations

import argparse
import asyncio
import os

from agentscope.agent import ReActAgent
from agentscope.formatter import DashScopeChatFormatter
from agentscope.message import Msg
from agentscope.model import DashScopeChatModel
from agentscope.pipeline import fanout_pipeline, sequential_pipeline


def _agent(name: str, task: str) -> ReActAgent:
    return ReActAgent(
        name=name,
        sys_prompt=f"你是 {name}。{task} 用一两句话汇报进度。",
        model=DashScopeChatModel(
            model_name="qwen-max",
            api_key=os.environ.get("DASHSCOPE_API_KEY", "sk-demo"),
        ),
        formatter=DashScopeChatFormatter(),
        max_iters=2,
    )


async def run_sequential() -> None:
    hr = _agent("HR", "完成入职登记表")
    it = _agent("IT", "开通账号")
    admin = _agent("Admin", "发放设备")
    msg = Msg("user", "为新员工 Alice 办理入职", "user")
    result = await sequential_pipeline(agents=[hr, it, admin], msg=msg)
    print("[sequential]", result.get_text_content())


async def run_fanout() -> None:
    legal = _agent("Legal", "法务审阅")
    security = _agent("Security", "安全审阅")
    compliance = _agent("Compliance", "合规审阅")
    msg = Msg("user", "审阅远程办公政策草案", "user")
    reviews = await fanout_pipeline(
        agents=[legal, security, compliance],
        msg=msg,
        enable_gather=True,
    )
    for i, r in enumerate(reviews, 1):
        print(f"[fanout-{i}]", r.get_text_content())


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["sequential", "fanout"], default="sequential")
    args = parser.parse_args()
    if args.mode == "sequential":
        await run_sequential()
    else:
        await run_fanout()


if __name__ == "__main__":
    asyncio.run(main())
