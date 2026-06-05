import json

from main import app


def test_openapi_paths_snapshot():
    schema = app.openapi()
    assert schema["info"]["title"] == "CorpAssist Python"
    paths = schema["paths"]
    assert "/health" in paths
    assert "/v1/rag/query" in paths
    rag_post = paths["/v1/rag/query"]["post"]
    assert "RagQueryRequest" in json.dumps(rag_post)
