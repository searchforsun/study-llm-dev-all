# AgentScope 与 LangGraph 对照实验室

## 目标
为 CorpAssist S3 三个子场景完成框架选型，并运行 AgentScope 2.0 最小 Agent。

## 前置条件
- Python 3.11+
- `pip install agentscope`
- 环境变量 `DASHSCOPE_API_KEY`

## 练习
1. 填写 `framework-choice.md` 中三个场景的 LangGraph / AgentScope 选型及理由
2. 运行 `main.py` 初始化 Agent 并完成一次 `UserMsg` 问答
3. 对照章节决策表，说明 Msg 与 LangGraph messages 的映射

## 验收标准
- [ ] 运行 main.py 输出 Agent 名称与模型回复摘要
- [ ] 决策表至少 3 行场景结论
- [ ] 代码使用 AgentScope `Agent` + `DashScopeChatModel`，非 LangGraph

## 参考
- 章节: basics-01-framework-compare
