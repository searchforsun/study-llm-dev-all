import pytest

from app.rag.service import RagPipeline


class Chunk:
    def __init__(self, doc_id: str, text: str):
        self.doc_id = doc_id
        self.text = text


class FakeRetriever:
    async def aretrieve(self, query: str, top_k: int, tenant_id: str | None = None):
        return [Chunk("d1", "  ")]  # 空 chunk 触发 strip 风险


class FakeLLM:
    async def acomplete(self, context: str, query: str) -> str:
        return "ok"


@pytest.mark.asyncio
async def test_tenant_required():
    pipe = RagPipeline(FakeRetriever(), FakeLLM())
    with pytest.raises(ValueError, match="tenant_id"):
        await pipe.arun("q", tenant_id=None)


@pytest.mark.asyncio
async def test_empty_chunk_filtered():
    pipe = RagPipeline(FakeRetriever(), FakeLLM())
    # 修复后应过滤空 chunk 且不抛异常
    out = await pipe.arun("q", tenant_id="t1")
    assert out["answer"]
