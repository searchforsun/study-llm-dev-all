# Demo：观测与调试

对应章节：[观测](../../index.html#ch-practice-03-obs)

```bash
cd ../corpassist-saa-workbench
mvn spring-boot:run
curl -si -X POST http://localhost:8080/api/agent/chat \
  -H "Content-Type: application/json" \
  -H "X-CorpAssist-Tenant: tenant-a" \
  -d '{"message":"订明天10点会议室"}' | findstr /i "X-Trace-Id"
curl -s http://localhost:8080/api/obs/trace-context
```

## 验收

- [ ] 响应含 `X-Trace-Id`
- [ ] 日志行含 `traceId` 与 `tenantId`（见 `application.yml` logging.pattern）
- [ ] 能说明 Prompt 回放与 Trace 的关系
