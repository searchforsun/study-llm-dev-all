# Demo：Prompt 模板与 Advisor

对应章节：[Prompt 模板与 Advisor](../../index.html#ch-basics-03-prompt-advisor)

检查 `rag-system.st` 占位符与 Advisor 链顺序图是否对齐全课 SSOT。

## 步骤

1. 打开 `rag-system.st`，确认 `{context}`、`{query}`、`{sessionId}` 三个占位符。
2. 在笔记画出 InputSanitizer → Memory → RAG → Model → Output 顺序。
3. 说明 NS2 场景下 InputSanitizer 为何必须排在 Tool/RAG 之前。

## 验收

- [ ] 能解释 `{sessionId}` 在 practice-04 Memory 章的用途
- [ ] 能区分 system 消息与 user 消息在 S2 RAG 中的内容分工
- [ ] 完成章节测验
