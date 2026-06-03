# Demo：生产 QPS 与缓存分层

对应章节：[QPS](../../index.html#ch-practice-04-qps)

```bash
cd ../corpassist-saa-workbench
mvn spring-boot:run
curl -s -X POST http://localhost:8080/api/qps/tasks \
  -H "Content-Type: application/json" \
  -d '{"prompt":"生成月度报销摘要"}'
# 用上一步 taskId
curl -s http://localhost:8080/api/qps/tasks/<taskId>
```

## 验收

- [ ] `POST /tasks` 返回 202 + `taskId`
- [ ] 轮询得到 `DONE` 与 stub 结果
- [ ] 能说明同步 Servlet vs 异步 Worker 分工
