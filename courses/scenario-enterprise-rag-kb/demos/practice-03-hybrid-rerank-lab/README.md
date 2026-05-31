# Demo：混合检索 + Rerank 联调

[章节](../../index.html#ch-practice-03-hybrid-rerank)

## 目标
Python 索引和 Spring 问答共用索引，做 ablation 实验并控制延迟预算。

## 文件
- `ablation.py` — 消融实验框架
- `HybridSearchConfig.java` — Spring AI 混合检索配置
- `latency_monitor.py` — 延迟监控脚本

## 验收标准
- 输出 ablation 实验结果表（4 组配置的 MRR）
- 延迟分解：向量+BM25+RRF+Rerank+LLM 各阶段 P95
- 验证 Python-End 和 Spring-End 检索结果一致

## 运行
```bash
python ablation.py --test_file ./data/test_queries.json
```
