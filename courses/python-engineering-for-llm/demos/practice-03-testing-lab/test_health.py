import pytest
from httpx import ASGITransport, AsyncClient
from main import app

@pytest.mark.asyncio
async def test_health_ok():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://t") as c:
        r = await c.get("/health")
    assert r.json()["status"] == "ok"
