# Demo：GraphRAG 概念与边界

对应章节：[GraphRAG 概念与边界](../../index.html#ch-advanced-02-graph-rag)

分析 CorpAssist S1 场景（企业 RAG 知识库）是否需要引入 GraphRAG，并给出明确结论。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `graph-vs-hybrid.md` 中单跳 FAQ 与多跳制度关联的选型差异
- 能评估 CorpAssist S1 场景（企业 RAG 知识库）的查询特征
- 能对「S1 是否必须 GraphRAG」给出有依据的结论

## 步骤

1. 打开 `graph-vs-hybrid.md`，阅读 hybrid 与 Graph 各自的适用场景。
2. 回顾章节中 CorpAssist S1 场景描述：以企业制度/FAQ 问答为主，查询以单跳检索居多。
3. 在 `graph-vs-hybrid.md` 末尾补充「S1 选型结论」：写明 S1 是否需要 GraphRAG、理由（查询跳数、维护成本、收益比）。
4. 思考：若 S1 未来出现「制度 A 引用制度 B 的连带条款」类多跳查询，何时应重新评估 GraphRAG？

## 验收

- [ ] verify.py 验收通过
- [ ] `graph-vs-hybrid.md` 已写明 CorpAssist S1 是否需要 GraphRAG 及结论理由
- [ ] 能说明单跳 FAQ 与多跳关联场景对选型的影响
- [ ] 完成章节测验
