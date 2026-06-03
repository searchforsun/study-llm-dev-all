from fastapi import APIRouter

from app.rag.schemas import RagQueryRequest, RagQueryResponse

router = APIRouter(prefix="/v1/rag", tags=["rag"])


@router.post("/query", response_model=RagQueryResponse)
async def rag_query(body: RagQueryRequest) -> RagQueryResponse:
    # 故意缺少 docstring — 请用 AI 补全
    return RagQueryResponse(answer="stub", citations=[])
