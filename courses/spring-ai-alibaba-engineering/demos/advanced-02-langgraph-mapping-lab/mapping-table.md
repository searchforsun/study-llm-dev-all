# LangGraph ↔ Spring AI Alibaba 六维对照

> CorpAssist S3 办公 Agent · 面试白板可抄写版

| 维度 | LangGraph (Python) | Spring AI Alibaba (Java) | CorpAssist S3 做法 |
|------|-------------------|--------------------------|-------------------|
| **编排** | `StateGraph`、conditional edge、`recursion_limit` | Graph DSL、ReactAgent、`StepBudgetAdvisor` | ≤10 步 ReAct；采购审批固定 Graph + HITL |
| **工具** | `@tool`、LangChain MCP | `FunctionTool`、MCP、OpenAPI Gateway | Jira/Confluence **写**仅 Java；Python Mock |
| **模型** | dashscope / OpenAI 兼容 SDK | `DashScopeChatModel` | 共用 `CORPASSIST_AGENT_MODEL` 等 env |
| **观测** | LangSmith、脚本日志 | OTel、Admin Prompt 回放 | 生产 Trace 以 Java 为准；traceparent 双栈 |
| **治理** | 外围自建 | Admin Studio、DSL Git、Advisor 链 | Prompt 变更 CI diff；禁止 Studio 连 prod |
| **场景** | 实验、批量仿真、评测 | 门户 SSE、企业 SSO、审计 | Python golden → Java DSL 上线 |

## 节点名对照（示例）

| LangGraph 节点 | SAA DSL 节点 | 说明 |
|----------------|--------------|------|
| `plan` | `type: llm` id plan | 任务分解 |
| `tools` | `type: tool` | Tool 白名单 |
| `human_approval` | `type: human_approval` | HITL |
| `__end__` | `type: end` | 终止 |

## MCP / OpenAPI

| 项 | LangGraph | SAA | 契约 |
|----|-----------|-----|------|
| Jira create | Python `@tool` | Java `FunctionTool` | OpenAPI `POST /jira/issues` |
| 制度检索 | 直连 VectorStore | `searchPolicy` Tool | 同 PGVector + tenant filter |

详见 [agent-orchestration-java](../../../agent-orchestration-java/index.html)。
