"""Pipeline sequential / fanout Demo（兼容层 shim）。"""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import (
    build_agent,
    dashscope_model,
    fanout_pipeline,
    is_mock,
    sequential_pipeline,
    user_msg,
)


def _agent(name: str, task: str):
    return build_agent(
        name,
        f"你是 {name}。{task} 用一两句话汇报进度。",
        model=dashscope_model("qwen-max"),
        max_iters=2,
    )


async def run_sequential() -> None:
    if is_mock():
        print("[sequential] HR→IT→Admin 入职流程已完成（mock）")
        return
    hr = _agent("HR", "完成入职登记表")
    it = _agent("IT", "开通账号")
    admin = _agent("Admin", "发放设备")
    msg = user_msg("为新员工 Alice 办理入职")
    result = await sequential_pipeline(agents=[hr, it, admin], msg=msg)
    print("[sequential]", result.get_text_content())


async def run_fanout() -> None:
    if is_mock():
        print("[fanout-1] 法务审阅通过（mock）")
        print("[fanout-2] 安全审阅通过（mock）")
        print("[fanout-3] 合规审阅通过（mock）")
        return
    legal = _agent("Legal", "法务审阅")
    security = _agent("Security", "安全审阅")
    compliance = _agent("Compliance", "合规审阅")
    msg = user_msg("审阅远程办公政策草案")
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
