# Demo：Rerank 模型实验

**章节**：[../../index.html#ch-practice-02-rerank]Rerank 模型

## 目标

部署 BGE Reranker 模型，集成 Cross-encoder 精排，画精度曲线选择最佳 rerank_n，理解「为何不全库 Rerank」。

## 实验内容

1. **Reranker 部署**：用 sentence-transformers 加载 `BAAI/bge-reranker-v2-m3`，封装为 FastAPI HTTP 服务。
2. **ANN 召回 + Rerank**：从 Milvus 召回 50 条，对每对 (query, doc) 用 cross-encoder 打分，重排序后取 top-5。
3. **精度曲线**：分别精排 10/20/50/100 条候选，记录 top-5 精度，画 precision vs rerank_n 曲线。
4. **延迟测量**：记录不同 rerank_n 的耗时。
5. **结论输出**：在 `rerank-log.md` 中写入选择的 rerank_n 值及理由。

## 验收标准

- Rerank 后 top-5 与 ANN top-5 至少有 2 条不同（说明 rerank 有效）。
- 能解释：为何不全库 Rerank？因为 cross-encoder 延迟与候选数线性相关。
- 精度曲线显示精排 50 条后精度提升边际递减。

## 延伸

比较 BGE Reranker v2-m3 和 Cohere Rerank 3 的精度差异。
