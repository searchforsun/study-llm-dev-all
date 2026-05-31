# Demo：Agent 分工

[章节](../../index.html#ch-practice-02-agent-split)

## 目标

实现 LangGraph Agent + Spring 会话管理的双栈 Agent 架构，写出 session_id 传递路径。

## 操作步骤

### 1. 实现 LangGraph Agent

- 构建包含 2 个工具（查订单、查工单）的 Agent 图
- 配置 checkpointer 实现状态持久化
- 实现 SSE 流式输出

### 2. 实现 Spring 会话管理

- Redis 存储会话元数据
- BFF 管理 thread_id 的创建和恢复
- 支持多次请求间保持会话状态

### 3. session_id 传递路径

```
客户端 Header: X-Session-Id
     ↓
Spring Gateway: 透传 (不修改)
     ↓
Spring BFF: 验证 + 写入 Redis (key: session:{tenant}:{user}:{session_id})
     ↓
Python Agent: LangGraph checkpointer 按 thread_id 恢复状态
     ↓
回复 SSE 流（携带 session_id）
```

## 验收标准

- [ ] LangGraph Agent 实现（2 个工具 + 状态管理）
- [ ] Spring BFF 会话管理实现（Redis 存储）
- [ ] SSE 代理转发正常
- [ ] 写出 session_id 的双栈传递路径图

## 参考资料

- [LangGraph](https://langchain-ai.github.io/langgraph/)
- [Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux.html)
