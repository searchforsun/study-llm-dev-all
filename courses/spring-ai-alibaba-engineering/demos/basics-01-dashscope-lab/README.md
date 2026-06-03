# Demo：DashScope/百炼接入

对应章节：[DashScope/百炼接入](../../index.html#ch-basics-01-dashscope)

**可运行工程**：[`../corpassist-saa-workbench/`](../corpassist-saa-workbench/)

## 离线验收（无需 Key）

```bash
cd ../corpassist-saa-workbench
mvn test
mvn spring-boot:run
# 另开终端
curl -s -X POST http://localhost:8080/api/agent/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"CorpAssist S3：查询年假政策摘要\"}"
```

## 百炼联调

```bash
export AI_DASHSCOPE_API_KEY=sk-xxx
cd ../corpassist-saa-workbench
mvn spring-boot:run -Plive -Dspring-boot.run.profiles=live
```

## 配置对照

- 根目录 `application.yml` — 与本文 `application.yml` 片段一致
- `CORPASSIST_AGENT_MODEL` 默认 `qwen-plus`

## 验收

- [ ] `mvn test` 全部通过
- [ ] 非流式 `/api/agent/chat` 返回 200
- [ ] 流式 `/api/agent/chat/stream` 有 SSE chunk
- [ ] 能说明 Key、model、temperature 三处配置
