from fastapi import APIRouter, Depends, Header, HTTPException

from app.rag.schemas import RagQueryRequest, RagQueryResponse
from app.rag.service import RagPipeline, get_pipeline

router = APIRouter(prefix="/v1/rag", tags=["rag"])


@router.post("/query", response_model=RagQueryResponse)
async def rag_query(
    body: RagQueryRequest,
    pipeline: RagPipeline = Depends(get_pipeline),
    x_api_key: str | None = Header(default=None, alias="X-Api-Key"),
) -> RagQueryResponse:
    if not x_api_key:
        raise HTTPException(status_code=401, detail={"error_code": "missing_api_key"})
    result = await pipeline.arun(query=body.query, top_k=body.top_k)
    return RagQueryResponse(**result)
