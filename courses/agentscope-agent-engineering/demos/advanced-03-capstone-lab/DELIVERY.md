# CorpAssist S3 短链路 Capstone 交付文档

## 1. 场景与范围

- 场景：________
- 不在范围：________

## 2. 架构

- Agent 类型：ReActAgent / MsgHub / Pipeline
- 工具列表：________

## 3. 指标

| 指标 | 目标 | 实测 |
|------|------|------|
| success_rate | ≥ 0.9 | |
| avg_steps | ≤ 8 | |
| p95_latency_s | ≤ 30 | |

## 4. 运行方式

```bash
pytest eval_capstone.py -v
```

## 5. 风险与降级

- 工具失败 → ________
- 预算耗尽 → 转人工

## 6. 升级路径

长任务 / 多阶段 → `agentscope-harness-engineering`
