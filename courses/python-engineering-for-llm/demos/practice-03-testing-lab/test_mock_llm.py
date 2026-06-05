import httpx
import pytest


def handler(request: httpx.Request) -> httpx.Response:
    return httpx.Response(
        200,
        json={
            "choices": [{"message": {"content": "mock answer"}}],
            "usage": {"total_tokens": 12},
        },
    )


@pytest.mark.asyncio
async def test_llm_client_parses_mock():
    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport, base_url="http://llm") as client:
        resp = await client.post("/v1/chat/completions", json={"model": "demo"})
    assert resp.json()["choices"][0]["message"]["content"] == "mock answer"
