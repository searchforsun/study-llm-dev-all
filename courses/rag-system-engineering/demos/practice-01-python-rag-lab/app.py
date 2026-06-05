"""CorpAssist Python RAG Lab — 最小 FastAPI，契约与 Spring /v1/rag/ask 对齐。"""

from fastapi import FastAPI
from pydantic import BaseModel

from chain_stub import rag_query

app = FastAPI(title="CorpAssist Python RAG Lab")


class AskRequest(BaseModel):
    question: str
    tenant_id: str = "corp-a"


class SourceRef(BaseModel):
    doc_id: str
    snippet: str


class AskResponse(BaseModel):
    answer: str
    sources: list[SourceRef]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/v1/rag/ask", response_model=AskResponse)
def ask(req: AskRequest) -> AskResponse:
    out = rag_query(req.question)
    sources = [SourceRef(**s) for s in out["sources"]]
    return AskResponse(answer=out["answer"], sources=sources)
