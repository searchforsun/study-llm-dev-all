# Demo：检索管线编排实验

**章节**：[../../index.html#ch-practice-03-query-pipeline]检索管线编排

## 目标

实现 Query Rewrite + 多路召回 + RRF 融合 + Rerank 的完整检索管线，理解 DAG 编排和降级处理。

## 实验内容

1. **Query Rewrite**：用 OpenAI API 实现 MultiQuery 改写，生成 3 个查询变体。
2. **多路召回**：并行执行向量检索（Milvus）和关键词检索（ES BM25），各召回 50 条。
3. **RRF 融合**：用 reciprocal rank fusion 合并两路结果，去重后取 top-50。
4. **Rerank**：Cross-encoder 精排 top-50 → top-5。
5. **Pipeline 配置**：在 `pipeline.yaml` 中列出 rewrite → parallel → fuse → rerank 四个阶段。

## 验收标准

- MultiQuery 改写后的 3 个变体覆盖原始意图。
- 多路召回融合后结果覆盖比单一路径多 20%+。
- pipeline.yaml 包含 4 个完整阶段。

## 延伸

增加一路规则召回（标签匹配），测试三路融合效果。
