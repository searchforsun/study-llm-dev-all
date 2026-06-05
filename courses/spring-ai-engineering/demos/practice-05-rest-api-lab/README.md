# Demo：暴露 REST 与 SSE

对应章节：[暴露 REST 与 SSE](../../index.html#ch-practice-05-rest-api)

使用 `chat-api.http` 调用本地 `/v1/chat` 与 `/v1/chat/stream`（需先启动 CorpAssist Spring 服务或使用 WireMock）。

## 步骤

1. 用 IDE 或 curl 执行 `chat-api.http` 中 stream 请求，确认收到 token 事件。
2. 发送空 `message`，确认返回 VALIDATION_ERROR（ProblemDetail 或统一 error code）。
3. 对照 OpenAPI 文档检查 RagResponse `citations` 字段。

## 验收

- [ ] stream 收到 token 事件
- [ ] 空 message 返回 VALIDATION_ERROR
- [ ] 完成章节测验
