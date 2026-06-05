# CorpAssist RAG 五步流水线

1. **Ingest**：HR 上传 PDF/制度 → `DocumentReader` 输出 `Document` 列表。
2. **Split**：`TextSplitter`（如 500/50）切块并补齐 metadata（dept、documentId）。
3. **Index**：`EmbeddingModel` + `VectorStore.add` 写入索引（离线任务，不在 `/ask` 同步执行）。
4. **Retrieve**：用户提问 → `QuestionAnswerAdvisor` / `similaritySearch` 取 Top-K + filter。
5. **Generate**：`PromptTemplate` 填充 `{context}` → `ChatClient` → 响应映射 `citations[]`。

Advisor 注入点：第 4 步检索结果拼接进 prompt，第 5 步前须已完成输入 Sanitizer（见 advanced 护栏章）。
