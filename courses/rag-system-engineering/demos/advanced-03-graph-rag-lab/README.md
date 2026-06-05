# Demo：GraphRAG 与知识库治理衔接

对应章节：[GraphRAG 与知识库治理衔接](../../index.html#ch-advanced-03-graph-rag)

勾选 GraphRAG 治理检查项，并补充一条 CorpAssist 知识库治理要求。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `graph-governance-checklist.md` 中图索引与向量索引版本对齐的必要性
- 掌握下线文档时同步删除图节点的治理流程
- 能为 CorpAssist 补充一条 GraphRAG 知识库治理检查项

## 步骤

1. 打开 `graph-governance-checklist.md`，阅读现有治理检查项（图与向量索引版本对齐、下线文档删图节点）。
2. 勾选你认同的检查项，并思考 CorpAssist 实际运维中还需哪些治理措施（如实体消歧、关系过期清理）。
3. 在 `graph-governance-checklist.md` 中补充 1 条治理项，写明检查内容、触发时机与责任人。
4. 自检：补充的治理项是否能防止 CorpAssist 图索引与向量索引出现版本漂移？

## 验收

- [ ] verify.py 验收通过
- [ ] 已勾选现有治理检查项并补充 1 条新治理项
- [ ] 能说明图索引与向量索引版本对齐的重要性
- [ ] 完成章节测验
