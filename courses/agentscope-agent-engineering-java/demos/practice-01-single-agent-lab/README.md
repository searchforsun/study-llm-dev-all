# CorpAssist 办公助手实验室

对应章节：[单 Agent：CorpAssist 办公助手](../../index.html#ch-practice-01-single-agent)

## 目标

用 `@Tool` 注册日历/邮件/工单/转人工，跑通 ReActAgent 多步工具链与事件流。

## 前置

- JDK 17+、Maven 3.9+
- `DASHSCOPE_API_KEY`

## 快速开始

```powershell
cd courses/agentscope-agent-engineering-java/demos/practice-01-single-agent-lab
mvn -q compile exec:java
```

复合请求（默认）应依次打印 `[tool] create_calendar_event` 与 `[tool] send_email`。

## 预算降级测试

```powershell
mvn -q compile exec:java -Dexec.args="2 帮我把周五评审加日历并发邮件"
```

`maxIters=2` 时应在步数耗尽前调用 `transfer_to_human` 或提前终止。

## 验收标准

- [ ] 默认命令输出至少 2 条 `[tool]` 事件
- [ ] `[done] maxIters=8` 出现在末尾
- [ ] `maxIters=2` 时不无限循环

## 参考

- 官方：[Agent / Tool](https://java.agentscope.io/v2/en/docs/building-blocks/agent.html)
