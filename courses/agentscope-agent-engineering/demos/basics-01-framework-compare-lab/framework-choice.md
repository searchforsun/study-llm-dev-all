# CorpAssist S3 框架选型表

| 场景 | 推荐框架 | 理由 |
|------|----------|------|
| 单轮 FAQ（无工具） | 无 Agent 框架 / 直连 LLM | 无需 ReAct 循环 |
| 办公助手（日历/邮件/工单） | AgentScope ReActAgent | Msg + Toolkit 开箱即用 |
| 多 Agent 主管-工人 | AgentScope MsgHub | 显式广播优于手写 LangGraph 边 |

填写说明：对照章节决策表，为每行补充 1 句 CorpAssist 业务依据。
