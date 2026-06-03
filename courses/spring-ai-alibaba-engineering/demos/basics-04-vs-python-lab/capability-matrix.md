# CorpAssist S3 — Java SAA vs Python DashScope 能力矩阵

| 能力 | Java（Spring AI Alibaba） | Python（DashScope / OpenAI 兼容 SDK） | S3 典型归属 | 备注 |
|------|---------------------------|----------------------------------------|-------------|------|
| Chat / 流式 | DashScopeChatModel + ChatClient.stream | `Generation.call` / OpenAI SDK stream | **Java** 门户 SSE | 共用 `CORPASSIST_AGENT_MODEL` |
| Agent / Tool | ReactAgent、Graph、@Tool、MCP | LangGraph / 自研 ReAct | **Java** 生产 Agent | maxSteps 对齐 |
| Embedding / RAG | VectorStore + extensions Reader | 批量 embedding 脚本 | **Python** 建索引，**Java** 检索 | OpenAPI 索引 version |
| 多模态 VL | Media + qwen-vl-plus | multimodal API | 按 QPS 选栈 | 成本 VL > 文本 |
| 观测 / Admin | Actuator、SAA Admin、Trace | 脚本日志 | **Java** 必须 | practice 章展开 |

## 环境变量对照（填完说明列）

| 变量 | Java 映射 | Python 映射 | 说明 |
|------|-----------|-------------|------|
| `AI_DASHSCOPE_API_KEY` | `spring.ai.dashscope.api-key` | `api_key` | 分环境 Key |
| `CORPASSIST_AGENT_MODEL` | `chat.options.model` | `model=` | **CI 须一致** |
| `CORPASSIST_EMBEDDING_MODEL` | `embedding.options.model` | embedding 脚本参数 | text-embedding-v3 |
| `CORPASSIST_LLM_BASE_URL` | 兼容模式 openai starter | `OpenAI(base_url=...)` | compatible-mode/v1 |
| `CORPASSIST_AGENT_MAX_STEPS` | `spring.ai.tool.max-steps` | LangGraph recursion_limit | Agent 预算 |
| `CORPASSIST_JAVA_PROFILE` | `spring.profiles.active` | — | dev/staging/prod |
