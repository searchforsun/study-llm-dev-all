# Demo：双栈协作规范

对应章节：[双栈协作规范](../../index.html#ch-advanced-05-bridge-java)

## 目标

- 阅读 CorpAssist 双栈错误码对照表
- 将 Python `AppError` 与 Spring 枚举一一映射

## 步骤

1. 打开 `error_codes.md`，至少阅读 3 行错误码定义。
2. 对照正文「错误码统一」表，口头映射 `LLM_RATE_LIMIT` → HTTP 429。
3. 说明 BFF 转发 `X-Request-Id` 的必要性。

## 验收

- [ ] 能写出 `RAG_NOT_FOUND` 的 HTTP 状态与 body 字段
- [ ] 能说明 snake_case JSON 在 Java 侧的配置方式（`@JsonNaming`）
- [ ] 完成章节测验
