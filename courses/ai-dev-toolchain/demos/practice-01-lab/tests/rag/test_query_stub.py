import pytest


@pytest.mark.asyncio
async def test_placeholder(client):
    """占位：请用 AI 生成完整 test_query.py 并删除本文件或替换内容。"""
    resp = await client.post("/v1/rag/query", json={"query": "年假", "top_k": 3})
    assert resp.status_code == 200
    body = resp.json()
    assert "answer" in body
    assert "citations" in body
