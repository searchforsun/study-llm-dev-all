from app.rag.pipeline import RagPipeline


def test_pipeline_returns_answer():
    out = RagPipeline().run("年假有几天")
    assert "5" in out["answer"]
    assert out["citations"]


def test_unknown_query_safe_fallback():
    out = RagPipeline().run("火星年假")
    assert "未找到" in out["answer"]
