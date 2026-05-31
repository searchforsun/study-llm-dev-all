# Demo：分块策略设计

[章节](../../index.html#ch-basics-03-chunking)

## 目标
对比不同分块策略的切分效果，找到 CorpAssist 制度文档的最优参数。

## 文件
- `chunk_strategies.py` — 固定分块 vs 语义分块对比
- `chunk_experiment.py` — 参数扫描实验脚本
- `corporate_chunker.py` — 定制切分器（含表格/代码处理）

## 验收标准
- 输出不同 chunk_size 的 Recall@5 对比数据
- 验证表格按行保留表头、代码按函数独立切分
- 输出最优参数组合

## 运行
```bash
python chunk_experiment.py --doc_dir ./data/docs/
```
