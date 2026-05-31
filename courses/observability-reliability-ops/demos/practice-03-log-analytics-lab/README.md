# Demo：日志分析

[章节](../../index.html#ch-practice-03-log-analytics)

## 目标
配置结构化日志并实现 Trace↔Log 关联。

## 步骤
1. 在 log-queries.md 中写 3 条 LogQL 查询
2. 为 BFF 配置 Logback JSON 输出
3. 为 Python Agent 配置 structlog 结构化日志

## 验收标准
- [ ] log-queries.md 含 3 条 LogQL 及场景说明
- [ ] 日志包含 trace_id、request_id、tenant_id
- [ ] 从 Tempo span 可跳转到关联日志
