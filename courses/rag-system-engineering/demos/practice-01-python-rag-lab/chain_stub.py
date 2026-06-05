"""CorpAssist Python RAG 链 stub — 对照 practice-01 章节 LCEL 与 API 契约。"""


def retriever_only(query: str) -> list[dict]:
    """仅检索，返回带 doc_id 的 sources 列表（链式调试第一步）。"""
    if "年假" in query:
        return [
            {
                "doc_id": "hr-policy-2024",
                "snippet": "带薪年休假制度第 3.2 条：员工工作满一年可享受年假…",
            }
        ]
    return [{"doc_id": "pol-1", "snippet": f"mock hit for: {query}"}]


def rag_query(q: str) -> dict:
    """全链 Mock：answer + sources，与 Spring AskResponse 同形。"""
    sources = retriever_only(q)
    return {"answer": "[demo]", "sources": sources}
