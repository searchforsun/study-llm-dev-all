# CorpAssist RAG 模块 Judge 评分卡

| 维度 | 权重 | blocker |
|------|------|---------|
| tenant 隔离 | 0.25 | 是 |
| async 正确性 | 0.20 | 是 |
| OpenAPI 一致 | 0.20 | 是 |
| 测试质量 | 0.20 | 否 |
| 可观测性 | 0.15 | 否 |

5 分：完全符合；1 分：严重缺陷。`weighted_total < 3.0` 或任一 blocker=1 分则 CI 失败。
