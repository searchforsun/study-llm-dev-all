# Session 与 Memory 实验室

对应章节：[Session 与 Memory 基础](../../index.html#ch-basics-04-session-memory)

## 目标

验证 AgentScope Java `RuntimeContext` + `JsonFileAgentStateStore` 多轮会话恢复。

## 前置

- JDK 17+、Maven 3.9+
- 环境变量 `DASHSCOPE_API_KEY`

## 快速开始

```powershell
cd courses/agentscope-agent-engineering-java/demos/basics-04-session-memory-lab
mvn -q compile exec:java
```

## 练习

1. 运行 Demo，第二轮应引用「华东区 / 张三」
2. 检查 `~/.agentscope/sessions-demo/` 下是否生成 state 文件
3. 修改 `sessionId` 为全新值，确认历史不串会话

## 验收标准

- [ ] `mvn -q compile exec:java` 输出含「华东」或「张三」
- [ ] 控制台打印 state-store 路径且目录存在 JSON 状态
- [ ] 换 `sessionId` 后第二轮不再引用上一轮实体

## 参考

- 官方：[Agent — AgentStateStore](https://java.agentscope.io/v2/en/docs/building-blocks/agent.html)
