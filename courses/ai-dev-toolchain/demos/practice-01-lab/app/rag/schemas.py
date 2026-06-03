from pydantic import BaseModel, Field


class RagQueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=8000, description="用户问题")
    top_k: int = Field(3, ge=1, le=20, description="检索返回条数")


class Citation(BaseModel):
    doc_id: str
    snippet: str


class RagQueryResponse(BaseModel):
    answer: str
    citations: list[Citation]
