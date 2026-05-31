# Demo：Elasticsearch 混合检索实验

**章节**：[../../index.html#ch-basics-04-es-hybrid]Elasticsearch 混合检索

## 目标

创建 ES index 含 dense_vector 字段，执行 BM25 + kNN 混合检索并用 RRF 融合，理解混合权重对结果的影响。

## 实验内容

1. **Index Mapping**：创建 `corpassist_index`，声明 chunk_text（text）和 embedding（dense_vector, dims=768, similarity=cosine）。
2. **数据写入**：写入 100 条测试文档，同时存入文本和向量。
3. **BM25 搜索**：执行关键词搜索（如 "POL-2024-001"），观察精确匹配效果。
4. **kNN 搜索**：用随机向量执行向量搜索，观察语义相似效果。
5. **RRF 融合**：混合 BM25 + kNN，使用 rank.rrf 参数，观察融合后的排序变化。
6. **权重调优**：分别设 rank_constant=30, 60, 100，观察 top-5 结果的变化。

## 验收标准

- BM25 对精确编号查询效果显著优于 kNN。
- RRF 融合后排名兼顾两路检索结果。
- 能回答：何时提高 BM25 权重？何时提高 kNN 权重？

## 延伸

对比带 filter 和不带 filter 的混合检索结果差异。
