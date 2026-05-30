# Demo：知识库可观测

对应章节：[知识库可观测](../../index.html#ch-practice-04-obs-kb)

## 目标

填写 S1 指标目标值，对样例 RAG 日志进行 empty_type 分型。

## 前置

- Python 3.10+
- 已阅读 coverage 公式与 `rag_log` yaml 字段说明

## 步骤

```bash
cd demos/practice-04-obs-kb-lab
# 1. 编辑 metrics-target.md：coverage_rate、recall_gap_rate 目标
# 2. 对 2 条样例日志判定 empty_type
python validate_metrics.py
```

## 验收

| 命令 | 期望输出 |
|------|----------|
| `python validate_metrics.py` | `PASS: 3 metrics, 2 empty types classified` |

手动验收：

- [ ] coverage_rate ≥ 75%、recall_gap_rate ≤ 8% 写入 targets
- [ ] ACL_FILTER 与 ZERO_HIT  remediation 不同

## 文件

| 文件 | 用途 |
|------|------|
| `metrics-target.md` | KPI 目标与样例日志 |
| `validate_metrics.py` | 目标与分型校验 |
