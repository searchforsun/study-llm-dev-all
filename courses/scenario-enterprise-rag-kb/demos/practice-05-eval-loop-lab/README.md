# Demo：评测闭环与增量更新

[章节](../../index.html#ch-practice-05-eval-loop)

## 目标
运行评测管线，做坏例归因分析，实现增量索引和版本门禁。

## 文件
- `eval_metrics.py` — MRR/Recall/NDCG 评测
- `badcase_attribution.py` — 四阶段坏例归因
- `incremental_index.py` — 增量索引管理
- `regression_gate.py` — 版本门禁检查

## 验收标准
- 输出评测报告（MRR/Recall/NDCG）和归因分布图
- 增量索引对变更文档幂等写入
- RegressionGate 正确拦截不合格版本

## 运行
```bash
python eval_metrics.py --test_set ./data/test_set.json
```
