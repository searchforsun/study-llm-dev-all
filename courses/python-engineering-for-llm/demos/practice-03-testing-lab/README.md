# Demo：测试策略

对应章节：[测试策略](../../index.html#ch-practice-03-testing)

## 目标

- 用 pytest + ASGITransport 测试 FastAPI `/health`
- 用 MockTransport 模拟 LLM JSON 响应（零外网）
- 断言 OpenAPI 快照含 `/health` 与 `/v1/rag/query`

## 步骤

```powershell
uv pip install pytest pytest-asyncio httpx fastapi
cd demos/practice-03-testing-lab
python -m pytest -q
```

## 验收

- [ ] `python -m pytest -q` 全部通过（至少 3 passed）
- [ ] `test_mock_llm.py` 断言 `content == "mock answer"`
- [ ] `test_openapi_paths.py` 断言 `/v1/rag/query` 在 schema 中
- [ ] 测试未发起真实 LLM 网络请求
- [ ] 完成章节测验
