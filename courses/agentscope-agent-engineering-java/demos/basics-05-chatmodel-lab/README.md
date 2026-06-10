# ChatModel 与 ModelRegistry 实验室

对应章节：[ChatModel 与 ModelRegistry](../../index.html#ch-basics-05-chatmodel)

## 目标

跑通 DashScope 显式 Builder、retry/fallback 与 turbo/plus 双 Agent 路由。

## 前置

- JDK 17+、Maven 3.9+
- `DASHSCOPE_API_KEY`

## 快速开始

```powershell
cd courses/agentscope-agent-engineering-java/demos/basics-05-chatmodel-lab
mvn -q compile exec:java
```

## 验收标准

- [ ] 输出 `[route]` 行含 classify 结果与 worker 模型选择
- [ ] 输出 `[worker]` 行含办公助手回复
- [ ] 无 API Key 时进程以明确错误退出

## 参考

- 官方：[Model](https://java.agentscope.io/v2/en/docs/building-blocks/model.html)
