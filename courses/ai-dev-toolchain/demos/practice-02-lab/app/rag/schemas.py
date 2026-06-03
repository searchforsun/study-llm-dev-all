from pydantic import BaseModel, Field


class RagQueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=8000)
    top_k: int = Field(3, ge=1, le=20)


class RagQueryResponse(BaseModel):
    answer: str
    citations: list[dict]
