# Demo：混合检索与 Rerank

[章节](../../index.html#ch-basics-04-retrieval)

## 目标
配置混合检索管线，对比纯向量、纯 BM25、混合三种模式，集成 BGE-Reranker。

## 文件
- `hybrid_retrieval.py` — 混合检索实现
- `reranker.py` — BGE-Reranker 精排集成
- `diagnose_retrieval.py` — 检索失败诊断脚本

## 验收标准
- 输出纯向量、纯 BM25、混合三种模式的 MRR@10 对比
- 验证 Rerank 前后的 MRR 差异（预期 +0.07~+0.10）
- 用 diagnose_query 排查一条失败查询并给出根因

## 运行
```bash
python hybrid_retrieval.py --query "HR-001 号文件年假规定"
```
