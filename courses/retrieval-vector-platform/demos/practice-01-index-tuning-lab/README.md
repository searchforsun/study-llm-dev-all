# Demo：索引参数调优实验

**章节**：[../../index.html#ch-practice-01-index-tuning]索引参数调优

## 目标

通过 Grid Search 扫描 ef_search 和 M 参数，输出 recall vs latency tradeoff 表，为 CorpAssist 场景选择最优参数。

## 实验内容

1. **Benchmark 脚本**：编写 Python 脚本，固定 100 条 query，遍历 ef=[16, 32, 64, 128, 256]，测量每个 ef 的 recall@10 和 p95 延迟。
2. **Ground Truth 准备**：用 brute-force（flat index）搜索得到精确 top-10。
3. **M 参数对比**：分别建 M=8, M=16, M=32 的索引，对比索引大小和 recall。
4. **决策输出**：读取 `tuning-log.md` 中的实验数据表格，根据 CorpAssist 的 SLO（recall > 0.95, p95 < 100ms）选出生产参数。

## 验收标准

- 输出 recall/latency 表格，含 ef=16/32/64/128/256 五组数据。
- 根据 SLO 选出的生产参数记录在 tuning-log.md 中。
- 能解释为什么选这个参数。

## 延伸

测试不同数据集规模（1万/10万/100万）对最优参数选择的影响。
