import json
from pathlib import Path

# 最小 schema 示意
schema = {
    "openapi": "3.1.0",
    "info": {"title": "CorpAssist Python", "version": "0.1.0"},
    "paths": {"/health": {"get": {"responses": {"200": {}}}}},
}
Path("openapi.demo.json").write_text(json.dumps(schema, indent=2), encoding="utf-8")
print("wrote openapi.demo.json")
