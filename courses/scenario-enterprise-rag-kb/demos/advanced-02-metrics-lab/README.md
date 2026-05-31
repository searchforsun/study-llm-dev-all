# Demo：效果数据与优化复盘

[章节](../../index.html#ch-advanced-02-metrics)

## 目标
生成优化报告、成本模型和 SLA 承诺书。

## 文件
- `optimization_report.py` — 优化旅程报告生成器
- `cost_model.py` — 月度成本估算脚本
- `SlaMonitor.java` — SLA 监控配置

## 验收标准
- 输出优化报告（基线→最终 MRR，每步归因）
- 千人企业月度成本模型（基础设施+API+人力明细）
- 5 项 SLA 指标的目标值文档

## 运行
```bash
python optimization_report.py --output ./output/report.md
python cost_model.py --employees 1000
```
