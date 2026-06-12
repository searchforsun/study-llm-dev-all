# Demo：Spring AI：RAG 实现

对应章节：[Spring AI：RAG 实现](../../index.html#ch-practice-02-spring-rag)

最小可运行 Spring Boot lab：`SpringRagDemo`（Advisor 契约示意）、`RagController`（`POST /v1/rag/ask`），与 `demos/practice-01-python-rag-lab/chain_stub.py` 双栈 parity 对齐。

## 可运行 Demo

```bash
cd demos/practice-02-spring-rag-lab
mvn -q test -Dtest=RagParityTest
mvn -q spring-boot:run
```

另开终端验收 API：

```bash
curl -s -X POST http://localhost:8080/v1/rag/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"年假几天","tenantId":"corp-a"}'
```

**验收**：`RagParityTest` 2 passed；curl 返回 `sources[].doc_id` 为 `hr-policy-2024`（与 Python lab 一致）。

## 目标

- 理解 Spring AI `QuestionAnswerAdvisor` + `VectorStore` 的 RAG 组装方式
- 能列出 Python 与 Spring RAG 响应必须对齐的 3 个字段（`answer`、`sources`、`doc_id`）
- 建立双栈契约一致性意识，避免前端因字段差异做两套适配

## 步骤

1. 运行 `mvn -q test -Dtest=RagParityTest`，确认 parity 测试通过。
2. 阅读 `src/main/java/com/corpassist/lab/rag/SpringRagDemo.java` 中 Advisor 挂载示意（源码在 lab 目录下）。
3. 启动 `mvn -q spring-boot:run`，用 curl 验收 JSON 契约。
4. 与 `practice-01-python-rag-lab` 对照同一问题的 `sources[].doc_id` 集合。

## 验收

- [ ] `mvn test -Dtest=RagParityTest` 通过
- [ ] curl `/v1/rag/ask` 返回非空 `sources[].doc_id`
- [ ] 能说明与 Python 对齐的 3 个响应字段
- [ ] 完成章节测验
