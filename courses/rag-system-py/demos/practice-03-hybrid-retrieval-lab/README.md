# Demo：混合检索实现

对应章节：[混合检索实现](../../index.html#ch-practice-03-hybrid-retrieval)

## 概述

本 Demo 实现 BM25 + 语义向量的双通道混合检索管线。核心组件包括 BM25Retriever 关键词通道、Chroma 向量检索语义通道、RRF（Reciprocal Rank Fusion）融合算法、BGE-Reranker 交叉编码器精排。提供 alpha 参数扫描工具，帮助找到最优的稀疏-密集权重配比。

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key
- 需安装 `pip install rank_bm25 sentence-transformers`

## 文件

| 文件 | 说明 |
|------|------|
| `hybrid_retriever.py` | BM25 + 向量双通道检索器 |
| `rrf_fusion.py` | RRF 与线性融合算法实现 |
| `reranker.py` | BGE-Reranker 交叉编码器精排 |
| `alpha_sweep.py` | 权重参数扫描工具 |
| `app.py` | FastAPI 混合检索服务 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 练习

### 练习 1：双通道融合检索
配置混合检索器，同时执行 BM25 和向量检索。**验收**：返回结果同时包含关键词命中结果和语义相似结果。

### 练习 2：Rerank 集成
在 top-20 结果上叠加 BGE-Reranker 重排。**验收**：Rerank 后前三结果 NDCG@3 提升 >= 5%。

### 练习 3：权重调优
扫描 alpha 从 0.0 到 1.0，记录 Recall@10 与延迟。**验收**：输出 alpha-Recall-延迟对照表，推荐最优 alpha。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[RAG 评测实践](../../index.html#ch-practice-04-rag-eval) · Demo：[RAG 评测实践](../practice-04-rag-eval-lab/)
