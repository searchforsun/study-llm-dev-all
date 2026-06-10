# ReAct 事件流实验室（Java）

## 目标
模拟消费 AgentScope Java `streamEvents`，在终端分别打印 TextDelta 与 ToolCall 事件。

## 前置条件
- JDK 17+
- 可选：`DASHSCOPE_API_KEY`（live 模式）

## 练习
1. 阅读 `EventStreamDemo.java` 中的事件序列
2. 对照章节 Event 表，为每种事件写一行 CorpAssist UI 文案
3. 说明 ToolCallStart 无 End 时的排查顺序

## 验收标准
- [ ] 运行脚本至少输出 1 次 ToolCall 事件
- [ ] 流式 TextDelta 增量可见（非一次性 dump）
- [ ] 输出包含 maxIterations 配置说明

## 参考
- 章节: basics-02-react-events
