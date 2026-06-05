# Demo：测试策略

对应章节：[测试策略](../../index.html#ch-practice-03-testing)

## 目标

- 用 pytest + TestClient 测试 FastAPI 健康检查路由
- 理解 Mock LLM 与无网络单测的写法

## 步骤

```powershell
pip install pytest pytest-asyncio httpx fastapi
cd demos/practice-03-testing-lab
pytest -q
```

## 验收

- [ ] `pytest -q` 全部通过（exit code 0）
- [ ] 测试未发起真实 LLM 网络请求
- [ ] 完成章节测验
