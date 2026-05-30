# 能力清单与招聘对标

面向 **3–5 年大模型应用开发**（纯应用侧，不含算法/Infra）。业务案例统一为 **CorpAssist**。

## 三座北极星能力（项目成败）

| ID | 能力 | 行业说法 | 主课程 | 场景中的典型「坑」 |
|----|------|----------|--------|-------------------|
| **NS1** | 模型与数据飞轮 | Eval Loop · Data Flywheel · Golden Set | `llm-evaluation-quality`、`domain-model-adaptation`、`knowledge-lifecycle-governance` | 只上线不回归；坏例不进 golden set；换 Embedding 未 re-embed |
| **NS2** | 概率→确定性桥梁 | Tool Use · Function Calling · Guardrails | `agent-orchestration-engineering`、`agent-orchestration-java`、`spring-ai-engineering` | 模型改订单；工具假执行；>3 步 Agent 无观察-反思 |
| **NS3** | 成本与延迟权衡 | Model Routing · Semantic Cache | `multimodel-routing-multimodal`、`observability-reliability-ops`、`llm-serving-for-applications` | 全站顶配模型；RAG 无缓存；截图直调贵视觉模型 |

真源：`outline-specs.json` → `northStarCapabilities`。

## 三层毕业模型（Capstone）

| 层 | 课程 | 交付 |
|----|------|------|
| **Layer 1** | 默认 `scenario-py-rag-kb`（必修）+ 可选 Java 版 `scenario-java-rag-kb` + 选修 ≥1 门场景 | 双栈 MVP + eval / 引用率 / P95 门禁 |
| **Layer 2** | 在各轨场景课中自然完成（RAG 分工 + Agent 分工） | 契约 + Trace + 灰度联调 |
| **Layer 3** | `enterprise-llm-solution-delivery` | TOP5 答辩 + `advanced-07-badcase-flywheel` |

真源：`outline-specs.json` → `capstoneModel`。

## 场景完成策略

| 类型 | 场景 | 说明 |
|------|------|------|
| **必修** | S1 企业 RAG 知识库 | 所有应用岗默认深度交付 |
| **选修 ≥1** | S2 客服 / S3 Agent / S4 代码 / S5 内容 | 按 JD 选 1 门做深；M2 未达标不开第二门 |
| **S5 子轨** | S5-A 企业营销（默认）/ S5-B 互动娱乐（选修） | 见 `interviewScenarios.scenarios[4].subTracks` |

每门场景课含 **`practice-06-production-pitfalls`**，对应 `productionPitfalls[]` 机读字段。

## 40 项能力 → 课程

| ID | 能力 | 主课程 | JD |
|----|------|--------|-----|
| C1 | 提示词工程 | `production-prompt-engineering` | 高 |
| C2 | RAG 工程 | `rag-system-engineering` | 高 |
| C3 | 上下文工程 | `context-memory-engineering` | 中高 |
| C4 | 混合记忆工程 | `context-memory-engineering` | 中高 |
| C5 | 工具调用 | `spring-ai-engineering`, `agent-orchestration-engineering` | 高 |
| C6 | 多源异构数据处理 | `rag-system-engineering`, `knowledge-lifecycle-governance` | 高 |
| C7 | 智能分块与语义处理 | `rag-system-engineering`, `knowledge-lifecycle-governance` | 高 |
| C8 | 向量管理与检索 | `retrieval-vector-platform`, `rag-system-engineering` | 高 |
| C9 | 知识库全生命周期 | `knowledge-lifecycle-governance` | 中高 |
| C10 | 整体架构设计 | `llm-application-fundamentals`, `rag-system-engineering`, `llm-application-backend` | 高 |
| C11 | 多模型路由调度 | `multimodel-routing-multimodal`, `spring-ai-engineering` | 中 |
| C12 | Agent 任务规划执行 | `agent-orchestration-engineering`, `spring-ai-alibaba-engineering` | 高 |
| C13 | 多 Agent 协作编排 | 同 C12 | 高 |
| C14 | 多模态交互 | `multimodel-routing-multimodal`, `llm-application-fundamentals` | 中 |
| C15 | API 与第三方集成 | `python-engineering-for-llm`, `llm-application-backend`, `ai-dev-toolchain` | 高 |
| C16 | 流式与异步 | `python-engineering-for-llm`, `llm-application-backend` | 高 |
| C17 | 微服务与容器化 | `python-engineering-for-llm` (Python轨), `llm-application-backend` (Java轨) | 高 |
| C18 | 推理引擎选型调优 | `llm-serving-for-applications` | 中 |
| C19 | 模型量化压缩 | `llm-serving-for-applications`, `domain-model-adaptation` | 中 |
| C20 | KV 缓存与内存优化 | `llm-serving-for-applications`（应用层） | 中 |
| C21 | 全链路监控追踪 | `observability-reliability-ops` | 高 |
| C22 | 日志收集分析 | `observability-reliability-ops` | 高 |
| C23 | 告警与故障恢复 | `observability-reliability-ops` | 中 |
| C24 | 版本管理与灰度 | `observability-reliability-ops`, `llm-serving-for-applications` | 中 |
| C25 | 灾备与数据一致性 | `observability-reliability-ops`, `llm-application-backend` | 中 |
| C26 | 内容安全过滤 | `security-compliance-engineering` | 中 |
| C27 | 注入与越狱防御 | `security-compliance-engineering`, `production-prompt-engineering` | 高 |
| C28 | 隐私脱敏 | `security-compliance-engineering` | 高 |
| C29 | 工具调用权限 | `security-compliance-engineering` | 中 |
| C30 | 输出对齐与价值观护栏 | `security-compliance-engineering` | 中 |
| C31 | 合规审计溯源 | `security-compliance-engineering`, `enterprise-llm-solution-delivery` | 中 |
| C32 | 端到端效果评估 | `llm-evaluation-quality` | 高 |
| C33 | 自动与人工评估体系 | `llm-evaluation-quality` | 高 |
| C34 | A/B 测试 | `llm-evaluation-quality`, `production-prompt-engineering` | 中 |
| C35 | 用户反馈迭代 | `llm-evaluation-quality` | 中 |
| C36 | Token 成本管理 | `observability-reliability-ops` | 高 |
| C37 | 算力与成本优化 | `observability-reliability-ops`, `multimodel-routing-multimodal` | 中 |
| C38 | LlamaIndex RAG 工程 | `llamaindex-rag-engineering`, `rag-system-engineering` | 中高 |
| C39 | RAG 系统实践 · Python 栈 | `rag-system-py`, `llamaindex-rag-engineering` | 高 |
| C40 | RAG 系统实践 · Java 栈 | `rag-system-java`, `llm-application-backend` | 高 |

## JD 高频技能速查

| 技能 | 课程 |
|------|------|
| Python | `python-engineering-for-llm` + 全轨实践 |
| Java / Spring AI / 通义 | `spring-ai-engineering`, `spring-ai-alibaba-engineering` |
| RAG / 向量库 | `rag-system-engineering`, `retrieval-vector-platform`, `llamaindex-rag-engineering` |
| Agent / MCP | `agent-orchestration-engineering`, `agent-orchestration-java`, `spring-ai-alibaba-engineering` |
| 评测 / 成本 / 安全 | `llm-evaluation-quality`, `observability-reliability-ops`, `security-compliance-engineering` |
| LlamaIndex | `llamaindex-rag-engineering` + 全轨实践 |
| AI 开发工具链 | `ai-dev-toolchain` |
| 双栈交付 | `rag-system-engineering`, `agent-orchestration-engineering`, `enterprise-llm-solution-delivery` |

**不包含**：预训练/RLHF 算法推导、CUDA/算子、千卡训练（应用岗边界）。**包含**：应用侧偏好对齐飞轮（DPO/RLAIF 概念，见 `domain-model-adaptation`）。

## 面试 TOP5 场景

| 场景 | 主题 | 行业说法 | 企业落地课 | 角色 | 生产坑（摘要） |
|------|------|----------|------------|------|----------------|
| S1 | RAG 知识库 | Enterprise RAG · Knowledge Base QA | `scenario-py-rag-kb` / `scenario-java-rag-kb` | 必修（选一轨） | ACL、脏 PDF、Graph、re-embed |
| S2 | 智能客服 | Conversational AI · DST | `scenario-py-customer-service` / `scenario-java-customer-service` | 选修 | DST 双校验、API 执行、截图路由 |
| S3 | Agent 自动化 | AI Agent · ReAct | `scenario-py-agent-automation` / `scenario-java-agent-automation` | 选修 | 反思循环、工具假执行、记忆溢出 |
| S4 | 代码辅助 | Code Copilot · Repo RAG | `scenario-py-code-assistant` / `scenario-java-code-assistant` | 选修 | AST RAG、FIM、LSP 闭环 |
| S5 | 内容生成 | AIGC · Brand Safety | `scenario-py-content-studio` / `scenario-java-content-studio` | 选修 | 真查库存、审核、S5-B 角色 OOC |

机读详情：`outline-specs.json` → `interviewScenarios.scenarios[]`（含 `productionPitfalls`、`northStarFocus`、`subTracks`）。

每门落地课三阶段：**业务架构 → 双栈实战（含 production-pitfalls）→ 生产化/面试答辩**。横切：`llm-application-fundamentals`、`enterprise-llm-solution-delivery`。

维护：改 `outline-specs.json` → `node scripts/sync.mjs`。
