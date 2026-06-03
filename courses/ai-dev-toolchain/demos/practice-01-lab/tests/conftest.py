import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
def mock_rag_pipeline():
    """TODO: 用 patch('app.rag.service.RagPipeline.arun') 替换为 AsyncMock。"""
    yield None


@pytest.fixture
async def client(mock_rag_pipeline):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        ac.headers.update({"X-Api-Key": "test-key"})
        yield ac
