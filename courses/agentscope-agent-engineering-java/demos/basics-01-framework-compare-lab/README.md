# AgentScope Java 与 SAA Graph 对照实验室

## 目标
为 CorpAssist S3 三个子场景完成框架选型，并运行 AgentScope Java 最小 ReActAgent（mock 模式无需 API Key）。

## 前置条件
- JDK 17+
- 可选：`DASHSCOPE_API_KEY`（live 模式调用真实模型）

## 练习
1. 填写 `framework-choice.md` 中三个场景的 AgentScope Java / SAA Graph 选型及理由
2. 运行 `run.ps1` 或 `run.sh` 初始化 ReActAgent 并完成一次问答
3. 对照章节决策表，说明 Msg 与 Graph State messages 的映射

## 验收标准
- [ ] 运行脚本输出 Agent 名称与模型回复摘要
- [ ] 决策表至少 3 行场景结论
- [ ] 代码使用 ReActAgent.builder + DashScopeChatModel 模式（mock 或 live）

## 参考
- 章节: basics-01-framework-compare
