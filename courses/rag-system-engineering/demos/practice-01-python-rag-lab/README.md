# Demo：Python：LangChain RAG 实现

对应章节：[Python：LangChain RAG 实现](../../index.html#ch-practice-01-python-rag)

最小可运行 lab：`chain_stub.py`（检索 + 全链 Mock）、`app.py`（FastAPI `POST /v1/rag/ask`），与 Spring 双栈契约对齐。

## 可运行 Demo

```bash
cd demos/practice-01-python-rag-lab
pip install -r requirements.txt
pytest -q
python -c "from chain_stub import retriever_only; print(retriever_only('年假'))"
uvicorn app:app --port 8000
```

另开终端验收 API：

```bash
curl -s -X POST http://localhost:8000/v1/rag/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"年假几天","tenant_id":"corp-a"}'
```

**验收**：`pytest` 3 passed；`retriever_only('年假')` 有 `doc_id`；curl 返回非空 `answer` 与 `sources[].doc_id`。

## 目标

- 理解 `chain_stub.py` 中 RAG 查询返回结构（`answer` + `sources`）
- 掌握 Python 栈 RAG 响应必须携带引用来源的工程要求
- 能说明 `sources` 字段如何与 Spring `/v1/rag/ask` 响应对齐

## 步骤

1. 运行 `pytest -q`，确认 `test_retriever_only_returns_doc_id` 通过。
2. 阅读 `chain_stub.py` 中 `retriever_only` 与 `rag_query` 的分工。
3. 启动 `uvicorn app:app --port 8000`，用 curl 验收 JSON 契约。
4. 对照 `practice-02-spring-rag-lab`，比较两栈 `sources[].doc_id` 是否一致（parity）。

## 验收

- [ ] `pytest -q` 全部通过
- [ ] `retriever_only('年假')` 返回 `hr-policy-2024`
- [ ] curl `/v1/rag/ask` 返回非空 `sources`
- [ ] 完成章节测验
