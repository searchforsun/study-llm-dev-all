# Demo：与 RAG/Agent 课集成验收

[返回章节](../../index.html#ch-advanced-05-capstone)

## 目标

OpenAPI 契约 + 跨课集成测试 + handoff 文档（CI/CD 绑定见章节正文；本 lab 复用 practice-05 API）。

## 前置准备

- Python 3.10+
- 已跑通 [`practice-05-corpassist-memory-lab`](../practice-05-corpassist-memory-lab/README.md)

## 目录

| 路径 | 说明 |
|------|------|
| `openapi.yaml` | 记忆 API 契约 |
| `capstone_integration.py` | RAG 连续性 / GDPR / 延迟 / 一致性 |
| [`handoff.md`](handoff.md) | 跨课交接文档 |

## 验收命令

```bash
cd demos/advanced-05-capstone-lab
pip install -r requirements.txt
python -m pytest -q test_capstone_lab.py
```

期望：6 项测试全绿；多轮一致性 ≥95%。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] OpenAPI 覆盖核心路径
- [ ] 集成测试（RAG 连续性、GDPR、延迟）通过
- [ ] handoff.md 含 API / Redis Key / FAQ
