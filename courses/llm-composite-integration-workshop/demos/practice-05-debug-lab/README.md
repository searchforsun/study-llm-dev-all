# Demo：联调排障手册

[章节](../../index.html#ch-practice-05-debug)

## 目标

实现全链路 Trace，编写排障 Runbook，验证一次从 trace_id 到定位根因的排障过程。

## 操作步骤

### 1. 实现 Spring Trace 过滤器

注入 trace_id 到 MDC，透传到下游服务：

```java
MDC.put("trace_id", traceId);
exchange.getRequest().mutate()
    .header("X-Request-Id", traceId)
    .build();
```

### 2. 实现 Python Trace 中间件

```python
structlog.contextvars.bind_contextvars(
    trace_id=request.headers.get("X-Request-Id"),
    service="python-rag")
```

### 3. debug-checklist

- [ ] Spring TraceFilter 实现（MDC + Header 透传）
- [ ] Python Trace 中间件实现（structlog 关联）
- [ ] 统一 JSON 日志格式（Logstash / structlog）
- [ ] 编写了排障 Runbook
- [ ] 验证 trace_id 贯通 Spring → Python

## 验收标准

- [ ] debug-checklist 所有项勾选完成
- [ ] 能按 trace_id 关联 Spring 和 Python 的日志

## 参考资料

- [OpenTelemetry](https://opentelemetry.io/docs/)
- [structlog](https://www.structlog.org/en/stable/)
