"""CorpAssist 测试 demo — 最小 FastAPI，供 pytest + 契约快照。"""
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="CorpAssist Python", version="0.1.0")


class RagQueryRequest(BaseModel):
    query: str = Field(min_length=1, max_length=2000)
    top_k: int = Field(default=5, ge=1, le=20)


class RagQueryResponse(BaseModel):
    answer: str
    sources: list[str]


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "corpassist-python"}


@app.post("/v1/rag/query", response_model=RagQueryResponse)
async def rag_query(body: RagQueryRequest) -> RagQueryResponse:
    return RagQueryResponse(
        answer=f"[demo] 收到: {body.query[:80]}",
        sources=["demo-doc-1"],
    )
