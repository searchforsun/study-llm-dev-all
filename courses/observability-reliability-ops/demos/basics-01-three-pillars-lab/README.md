# Demo：日志、指标、追踪

[章节](../../index.html#ch-basics-01-three-pillars)

## 目标
配置三支柱基线并验证 traceparent 跨栈传播。

## 步骤
1. 打开 `fields.md`，为四个必含字段补充「写入方/消费方/缺失后果」
2. 在 BFF `application.yaml` 中配置 OTel endpoint 和采样率
3. 验证：`curl -H "X-Request-Id: test-001" http://localhost:8080/v1/chat` 并在日志中看到 trace_id

## 验收标准
- [ ] fields.md 四个字段各完成三列说明
- [ ] OTel 配置至少有 3 个相关键值对
- [ ] 一次请求的日志中包含 request_id 和 trace_id
