# Demo：VectorStore 与 Embedding

对应章节：[VectorStore 与 Embedding](../../index.html#ch-practice-01-vectorstore)

阅读 `sample-documents.json`，在笔记中写出 pol-001 / pol-002 的 metadata 与 HR/FIN 过滤验收预期。

## 步骤

1. 打开 `sample-documents.json`，记录两条制度的 `dept` 字段。
2. 手写 SearchRequest：`dept == 'HR'` + query「年假」，预期 top1 为 pol-001。
3. 将 filter 改为 FIN，确认不应返回 HR 年假文本。

## 验收

- [ ] 完成 metadata 记录与过滤预期说明
- [ ] 完成章节测验
