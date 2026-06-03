import logging

logger = logging.getLogger(__name__)


class RagPipeline:
    def __init__(self, retriever, llm):
        self.retriever = retriever
        self.llm = llm

    async def arun(self, query: str, top_k: int = 3, tenant_id: str | None = None) -> dict:
        # 故意缺陷：未校验 tenant_id、未过滤空 chunk
        chunks = await self.retriever.aretrieve(query=query, top_k=top_k)
        context = "\n".join(c.text.strip() for c in chunks)
        logger.info("rag query=%s", query)
        answer = await self.llm.acomplete(context=context, query=query)
        return {
            "answer": answer,
            "citations": [{"doc_id": c.doc_id, "snippet": c.text[:200]} for c in chunks],
        }
