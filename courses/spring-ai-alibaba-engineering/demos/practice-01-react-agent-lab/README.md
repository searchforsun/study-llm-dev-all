# Demo：ReactAgent 基础

对应章节：[ReactAgent 基础](../../index.html#ch-practice-01-react-agent)

## 目标
实现带工单查询工具的 CorpAssist ReactAgent。

## 操作步骤
1. 定义 `@Tool(name = "query_ticket")` 方法模拟查数据库
2. 配置 ReactAgent，设置 maxSteps=8
3. 调用 `agent.execute()` 测试"查询工单 T001 的状态"
4. 观察每一步的思考内容和工具调用日志
5. 改为流式调用

## 验收
Agent 能正确回答工单状态信息。

## 练习
写一段话说明 maxSteps 设为特定值的决策理由（结合 CorpAssist 场景）。
