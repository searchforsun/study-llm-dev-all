# Demo：AI 生成 pytest 用例

对应章节：[AI 生成测试用例](../../index.html#ch-practice-01)

## 环境

```bash
cd demos/practice-01-lab
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -e ".[dev]"
```

## 任务

1. 阅读 `app/rag/router.py` 与 `app/rag/schemas.py`
2. 用 Cursor/Claude Code 生成 `tests/rag/test_query.py`（约束见章节 Prompt 模板）
3. 完善 `tests/conftest.py` 中的 `mock_rag_pipeline` 与 `client` fixture
4. 运行验收命令

## 验收

```bash
pytest tests/rag -q
# 期望：至少 6 passed，0 failed

pytest tests/rag -q --cov=app/rag --cov-report=term-missing --cov-fail-under=85
# 期望：TOTAL 行覆盖 ≥ 85%，无真实 LLM 外网请求

ruff check tests/ app/
# 期望：All checks passed
```

## 提示

- patch 路径应为 `app.rag.service.RagPipeline.arun`（与被测 import 一致）
- 边界用例参考章节「边界条件覆盖」表：空 query、超长、无 Key、空检索
