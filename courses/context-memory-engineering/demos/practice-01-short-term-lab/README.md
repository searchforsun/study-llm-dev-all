# Demo：工作记忆与会话状态

[返回章节](../../index.html#ch-practice-01-short-term)

## 目标

使用 LangChain（Python）和 Spring AI（Java）分别实现会话记忆，统一 Redis session key 模式，验证双栈共享会话的连续性。

## 前置准备

- Python 3.8+ 和/或 JDK 17+
- Redis 实例（本地 docker 或远程）
- `pip install langchain redis` 或 Spring AI 依赖

## 步骤

1. **实现 Python 会话记忆**：使用 LangChain `ConversationBufferWindowMemory` + `RedisChatMessageHistory`，设定窗口 K=8，TTL 24h。session key 使用 `corpassist:session:{tenant}:{user_id}` 模式。

2. **实现 Java 会话记忆**：使用 Spring AI `RedisChatMemory` + `MessageChatMemoryAdvisor`，使用相同的 session key 模式。

3. **双栈验证**：用 Python 写入 3 轮对话，用 Java 读取同一 session key 的会话历史，验证内容一致。

4. **TTL 验证**：写入后检查 Redis TTL，确认 24h 后自动过期。

## 预期输出

Python 和 Java 都能从同一 Redis key 读写会话消息。Python 侧写入的轮次在 Java 侧可读取到完整内容的助理消息列表。

## 验收清单

- [ ] Python 会话记忆实现（窗口 K=8，TTL 24h）
- [ ] Java 会话记忆实现（同一 session key 模式）
- [ ] 双栈共享会话验证通过
- [ ] Redis TTL 正确设置
