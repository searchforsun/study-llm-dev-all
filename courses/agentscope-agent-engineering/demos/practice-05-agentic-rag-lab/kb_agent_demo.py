"""Agentic RAG — 知识库 Agent Demo（含 mock fallback）."""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _corpassist_compat import build_agent, build_toolkit, dashscope_model, is_mock, user_msg
from agentscope.tool import ToolResponse

MIN_SCORE = 0.65

MOCK_DOCS = [
    {
        "source": "员工手册.pdf",
        "page": 12,
        "score": 0.92,
        "text": "年假：工龄 1-10 年享有 10 天带薪年假，需提前 3 个工作日申请。",
    },
    {
        "source": "员工手册.pdf",
        "page": 13,
        "score": 0.88,
        "text": "年假不可跨年累计超过 5 天，离职按比例折算。",
    },
]


def _mock_search(query: str) -> list[dict]:
    q = query.lower()
    if any(k in q for k in ("年假", "休假", "假期")):
        return MOCK_DOCS
    return []


async def search_knowledge_base(query: str) -> ToolResponse:
    """检索 CorpAssist 企业知识库。返回带 source/page/score 的片段。"""
    docs = _mock_search(query)
    if not docs:
        return ToolResponse(content="未找到相关文档，请换关键词或转人工。")
    filtered = [d for d in docs if d.get("score", 1.0) >= MIN_SCORE]
    if not filtered:
        return ToolResponse(
            content=f"检索置信度均低于 {MIN_SCORE}，无法可靠回答。"
        )
    blocks = []
    for i, doc in enumerate(filtered, 1):
        blocks.append(
            f"[{i}] source={doc['source']} page={doc['page']} score={doc['score']}\n{doc['text']}"
        )
    return ToolResponse(content="\n---\n".join(blocks))


def build_kb_agent():
    return build_agent(
        "CorpAssistKB",
        (
            "你是 CorpAssist 知识库助手。事实性问题必须先调用 search_knowledge_base；"
            "回答用 [n] 标注引用；无依据时拒答；末尾输出 ### 参考文献。"
        ),
        model=dashscope_model("qwen-max"),
        toolkit=build_toolkit(search_knowledge_base),
        max_iters=6,
    )


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("query", nargs="?", default="年假最多几天")
    args = parser.parse_args()
    if is_mock():
        docs = _mock_search(args.query)
        if docs:
            print("[1] 年假：工龄 1-10 年享有 10 天带薪年假。")
            print("### 参考文献\n[1] 员工手册.pdf p.12")
        else:
            print("未找到相关文档，请换关键词或转人工。")
        return
    agent = build_kb_agent()
    result = await agent.reply(user_msg(args.query))
    print(result.get_text_content())


if __name__ == "__main__":
    asyncio.run(main())
