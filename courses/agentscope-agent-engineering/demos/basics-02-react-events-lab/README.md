# ReAct 事件流实验室

## 目标
消费 AgentScope `reply_stream`，在终端分别打印 TEXT 与 TOOL_CALL 事件。

## 前置条件
- Python 3.11+ · agentscope · `DASHSCOPE_API_KEY`

## 练习
1. 注册 `query_calendar` 工具到 Toolkit
2. 用 `reply_stream` 处理 `EventType.TEXT_BLOCK_DELTA` 与 `TOOL_CALL_START`
3. 对照章节 EventType 表，为每种事件写一行 UI 文案

## 验收标准
- [ ] 运行 main.py 至少输出 1 次工具调用事件
- [ ] 流式文本增量可见（非一次性 dump）
- [ ] `max_iters` 已设置

## 参考
- 章节: basics-02-react-events
