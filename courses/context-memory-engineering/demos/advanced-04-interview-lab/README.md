# Demo：面试：上下文爆窗排障

[返回章节](../../index.html#ch-advanced-04-interview)

## 目标

使用 WindowOverflowDiagnoser 诊断 20 轮爆窗案例，验证修复后 token 分布回归（生产监控见章节正文；本 lab 为**离线示意**）。

## 前置准备

- Python 3.10+

## 目录

| 路径 | 说明 |
|------|------|
| `overflow_diagnoser.py` | 诊断器 + 滑动窗口修复示意 |
| `overflow_case.json` | 健康 vs 爆窗 token 分布 |
| `alert_rules.yaml` | 告警规则示意 |
| [`debug-steps.md`](debug-steps.md) | 五步法速查 |

## 验收命令

```bash
cd demos/advanced-04-interview-lab
pip install -r requirements.txt
python -m pytest -q test_overflow_lab.py
```

期望：4 项测试全绿。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] Diagnoser 识别 history_spike / system_prompt_squeeze
- [ ] 修复后 History 占比下降
- [ ] alert_rules.yaml 含三条规则
