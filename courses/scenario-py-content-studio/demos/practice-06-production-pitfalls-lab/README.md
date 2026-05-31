# Demo：生产可靠性

对应章节：[生产可靠性](../../index.html#ch-advanced-01-compliance)

## 前置
- Python 3.12+

## 实验内容
1. 实现 ComplianceEngine 规则检查
2. 测试含敏感词内容的拦截效果
3. 用 EfficiencyReport 生成效率数据叙事

## 验收
- 含绝对用语/虚假宣传的内容被拦截
- 所有违规词都被准确检出
- 效率报告包含可引用的数据

核心文件：`compliance_engine.py`, `efficiency_report.py`
