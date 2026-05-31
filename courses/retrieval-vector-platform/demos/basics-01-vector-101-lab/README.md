# Demo：向量检索原理实验

**章节**：[../../index.html#ch-basics-01-vector-101]向量检索原理

## 目标

通过手写 Cosine / IP / L2 三种距离度量，理解向量检索的核心数学直觉，并在 CorpAssist 场景中比较不同度量对结果的影响。

## 实验内容

1. **距离度量对比**：阅读 `similarity-notes.md`（预置文档），运行 Python 代码计算同一组 query 与 3-5 条文档片段的 cosine / IP / L2 值，观察排序差异。
2. **HNSW 参数直觉**：使用模拟的 1000 条随机向量，分别以 ef_search=16, 64, 256 运行 ANN 搜索，测量 recall@10 与搜索延迟的 tradeoff 曲线。
3. **Recall 评估脚本**：利用暴力搜索结果作为 ground-truth，编写 recall_at_k 函数，输出 k=1,3,5,10 的召回率。
4. **CorpAssist 场景分析**：根据 doc 中的 business-context.md，选择 CorpAssist FAQ 场景的最优距离度量与 Top-K 值，写出选用理由。

## 验收标准

- `similarity-notes.md` 中补充了 cosine 与 IP 在 CorpAssist 文本检索中的选用条件（含 why 解释）。
- `eval.py` 能输出三种距离的排序结果和 recall@k 表格。
- 能回答：为什么文本 embedding 首选 COSINE 而非 L2？

## 延伸

对比 hnswlib 在不同 ef 参数下的 recall(recall) curve，与本实验的结果交叉验证。
