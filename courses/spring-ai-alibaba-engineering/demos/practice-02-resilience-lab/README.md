# Demo：容灾、限流与降级

对应章节：[容灾](../../index.html#ch-practice-02-resilience)

**可运行工程**：[`../corpassist-saa-workbench/`](../corpassist-saa-workbench/)

`resilience.yaml` 已合并进 workbench `application.yml`。

## 运行

```bash
cd ../corpassist-saa-workbench
mvn spring-boot:run
curl -s http://localhost:8080/actuator/circuitbreakers
curl -s -X POST http://localhost:8080/api/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"月底报销高峰测试"}'
```

## 验收

- [ ] Actuator 可见 `dashscopeChat` 断路器实例
- [ ] `AgentChatService` 带 `@CircuitBreaker` 注解
- [ ] 能说明语义缓存与多模型 fallback 配置项
