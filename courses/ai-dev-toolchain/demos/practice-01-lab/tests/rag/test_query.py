import pytest
from unittest.mock import AsyncMock, patch


@pytest.mark.asyncio
async def test_query_returns_answer_and_citations(client):
    mock_out = {
        "answer": "年假政策见员工手册第 3 章。",
        "citations": [{"doc_id": "hr-001", "snippet": "年假 5 天起"}],
    }
    with patch("app.rag.service.RagPipeline.arun", new_callable=AsyncMock) as arun:
        arun.return_value = mock_out
        resp = await client.post("/v1/rag/query", json={"query": "年假", "top_k": 3})
    assert resp.status_code == 200
    body = resp.json()
    assert body["answer"] == mock_out["answer"]
    assert len(body["citations"]) >= 1


@pytest.mark.asyncio
@pytest.mark.parametrize(
    "payload",
    [
        {"query": "", "top_k": 3},
        {"query": "x" * 8001, "top_k": 3},
    ],
)
async def test_query_validation_errors(client, payload):
    resp = await client.post("/v1/rag/query", json=payload)
    assert resp.status_code == 422


@pytest.mark.asyncio
async def test_query_unauthorized_without_api_key():
    from httpx import ASGITransport, AsyncClient
    from app.main import app

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.post("/v1/rag/query", json={"query": "年假", "top_k": 3})
    assert resp.status_code == 401
