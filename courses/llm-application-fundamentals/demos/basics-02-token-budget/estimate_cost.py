#!/usr/bin/env python3
"""CorpAssist Token 费用粗算（教学 Demo，不发起网络请求）。"""
from __future__ import annotations

import argparse

# 示例单价：元 / 百万 Token（请按采购合同替换）
PRICING: dict[str, dict[str, float]] = {
    "corpassist-fast": {"input": 0.8, "output": 2.0},
    "corpassist-long": {"input": 2.0, "output": 6.0},
    "qwen-plus": {"input": 0.4, "output": 1.2},
}


def estimate_cost(
    prompt_tokens: int, completion_tokens: int, model: str = "corpassist-fast"
) -> float:
    if model not in PRICING:
        raise KeyError(f"未知模型 {model}，可选: {list(PRICING)}")
    p = PRICING[model]
    return (prompt_tokens * p["input"] + completion_tokens * p["output"]) / 1_000_000


def main() -> None:
    parser = argparse.ArgumentParser(description="CorpAssist Token 费用粗算")
    parser.add_argument("--prompt", type=int, default=3500, help="输入 Token 数")
    parser.add_argument("--completion", type=int, default=600, help="输出 Token 数")
    parser.add_argument("--model", default="corpassist-fast")
    parser.add_argument("--daily-requests", type=int, default=0, help=">0 时估算日/月费")
    args = parser.parse_args()

    once = estimate_cost(args.prompt, args.completion, args.model)
    print(f"模型: {args.model}")
    print(f"输入 Token: {args.prompt:,}  输出 Token: {args.completion:,}")
    print(f"单次费用（元）: {once:.4f}")

    if args.daily_requests > 0:
        daily = once * args.daily_requests
        print(f"日请求 {args.daily_requests:,} 次 → 约 {daily:.2f} 元/天，约 {daily * 30:.2f} 元/月（30 天）")

    print("\n场景对照（默认 corpassist-fast 单价）:")
    scenarios = [
        ("S1 RAG 问答", 4500, 500),
        ("S2 客服 8 轮", 9000, 350),
        ("全量 PDF 进 prompt", 120000, 800),
        ("RAG top-5 片段", 3200, 500),
    ]
    for name, pt, ct in scenarios:
        c = estimate_cost(pt, ct, args.model)
        print(f"  {name:20s} in={pt:>6,} out={ct:>4,} → {c:.4f} 元")


if __name__ == "__main__":
    main()
