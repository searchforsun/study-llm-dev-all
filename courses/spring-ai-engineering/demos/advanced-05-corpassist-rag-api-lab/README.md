# Demo：实战：CorpAssist Spring RAG API

对应章节：[实战：CorpAssist Spring RAG API](../../index.html#ch-advanced-05-corpassist-rag-api)

勾选 delivery-checklist，并对照 `rag-api-stub` 最小 Spring Boot 工程验收 NS1 契约。

## 步骤

1. 运行 `rag-api-stub` 验收命令，确认 `POST /v1/rag/query` 返回 `answer` + `sources[]`。
2. 打开 `delivery-checklist.md`，逐项勾选并补全缺失证据。
3. 对照 `rag-response.sample.json` 与 stub 响应字段，写 Python `doc_id` ↔ Spring `docId` 映射表。

## 验收命令

```bash
cd demos/advanced-05-corpassist-rag-api-lab/rag-api-stub
mvn -q verify
```

本地冒烟（可选）：

```bash
mvn -q spring-boot:run
curl -s -X POST http://localhost:8080/v1/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"年假如何申请？"}'
```

## 验收

- [ ] `mvn verify` 通过
- [ ] 响应含 `sources[0].docId` 与 `requestId`
- [ ] `delivery-checklist.md` 全部勾选
- [ ] 完成章节测验
