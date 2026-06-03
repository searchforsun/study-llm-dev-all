# Demo：AI 生成文档与 OpenAPI Schema

对应章节：[AI 生成文档与 Schema](../../index.html#ch-practice-02)

## 环境

```bash
cd demos/practice-02-lab
pip install fastapi pydantic uvicorn ruff
```

## 任务

1. 为 `app/rag/router.py` 中**缺少 docstring** 的路由用 AI 补全 Google 风格说明
2. 为 `RagQueryRequest` 添加 `json_schema_extra.examples`
3. 运行 `python scripts/export_openapi.py` 导出契约
4. 与 `contracts/baseline-openapi.json` 做 diff（或更新 baseline 并写 ADR）

## 验收

```bash
ruff check app/ --select D
# 期望：无 D100/D103 等 docstring 告警

python scripts/export_openapi.py
python scripts/check_openapi_diff.py
# 期望：No incompatible OpenAPI changes（或已人工确认并更新 baseline）
```
