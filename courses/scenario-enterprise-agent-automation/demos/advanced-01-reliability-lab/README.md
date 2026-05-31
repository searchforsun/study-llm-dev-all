# Demo：可靠性：重试、熔断与人工兜底

[章节](../../index.html#ch-advanced-01-reliability)

## 目标

为办公 Agent 设计完整的可靠性策略：工具重试、熔断、超时控制、降级和人工兜底。

## 练习内容

1. **可靠性配置**（reliability.yaml）：编写完整的可靠性配置，包含重试策略、熔断参数、超时设置、降级策略
2. **熔断实现**：用 Python 或 Resilience4j 实现带 Closed-Open-HalfOpen 状态的 Circuit Breaker
3. **人工兜底流程**：设计工具失败后的兜底流程：重试 → 降级 → 人工工单

## 验收标准

- 可靠性配置覆盖 retry、circuit_breaker、timeout、fallback、audit 五个部分
- 熔断实现在 3 次连续失败后打开，60s 后半开探测
- 人工兜底包含自动工单创建和结果通知机制

## 关键策略

- 超时控制：邮件 30s、日历 15s、考勤 10s
- 降级兜底：缓存 → 延迟队列 → 人工工单
- 审计日志：全量 tool I/O 写入 Elasticsearch，保留 90 天
