"""practice-01 lab 验收：chain_stub 与 FastAPI 契约。"""

from chain_stub import rag_query, retriever_only


def test_retriever_only_returns_doc_id():
    hits = retriever_only("年假")
    assert len(hits) >= 1
    assert hits[0]["doc_id"] == "hr-policy-2024"


def test_rag_query_has_answer_and_sources():
    out = rag_query("年假几天")
    assert out["answer"]
    assert len(out["sources"]) >= 1
    assert "doc_id" in out["sources"][0]


def test_fastapi_ask_endpoint():
    from fastapi.testclient import TestClient

    from app import app

    client = TestClient(app)
    resp = client.post(
        "/v1/rag/ask",
        json={"question": "年假几天", "tenant_id": "corp-a"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["answer"]
    assert body["sources"][0]["doc_id"]
