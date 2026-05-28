# 能力清单与招聘对标

面向 **3–5 年大模型应用开发**（纯应用侧，不含算法/Infra）。业务案例统一为 **CorpAssist**。

## 37 项能力 → 课程

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
| C10 | 整体架构设计 | `llm-application-fundamentals`, `llm-composite-integration-workshop`, `llm-application-backend` | 高 |
| C11 | 多模型路由调度 | `multimodel-routing-multimodal`, `spring-ai-engineering` | 中 |
| C12 | Agent 任务规划执行 | `agent-orchestration-engineering`, `spring-ai-alibaba-engineering` | 高 |
| C13 | 多 Agent 协作编排 | 同 C12 | 高 |
| C14 | 多模态交互 | `multimodel-routing-multimodal`, `llm-application-fundamentals` | 中 |
| C15 | API 与第三方集成 | `python-engineering-for-llm`, `llm-application-backend` | 高 |
| C16 | 流式与异步 | `python-engineering-for-llm`, `llm-application-backend` | 高 |
| C17 | 微服务与容器化 | `llm-application-backend`, `python-engineering-for-llm` | 高 |
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

## JD 高频技能速查

| 技能 | 课程 |
|------|------|
| Python | `python-engineering-for-llm` + 全轨实践 |
| Java / Spring AI / 通义 | `spring-ai-engineering`, `spring-ai-alibaba-engineering` |
| RAG / 向量库 | `rag-system-engineering`, `retrieval-vector-platform` |
| Agent / MCP | `agent-orchestration-engineering`, `spring-ai-alibaba-engineering` |
| 评测 / 成本 / 安全 | `llm-evaluation-quality`, `observability-reliability-ops`, `security-compliance-engineering` |
| 双栈交付 | `llm-composite-integration-workshop`, `enterprise-llm-solution-delivery` |

**不包含**：预训练/RLHF 算法、CUDA/算子、千卡训练（应用岗边界）。

## 面试 TOP5 场景

| 场景 | 主题 | 企业落地课 | 机读详情 |
|------|------|------------|----------|
| S1 | RAG 知识库 | `scenario-enterprise-rag-kb` | `outline-specs.json` → `interviewScenarios.scenarios[0]` |
| S2 | 智能客服 | `scenario-enterprise-customer-service` | 同上 S2 |
| S3 | Agent 自动化 | `scenario-enterprise-agent-automation` | 同上 S3 |
| S4 | 代码助手 | `scenario-enterprise-code-assistant` | 同上 S4 |
| S5 | 内容生成 | `scenario-enterprise-content-studio` | 同上 S5 |

每门落地课三阶段：**业务架构 → 双栈实战 → 生产化/面试答辩**。横切：`llm-application-fundamentals`、`llm-composite-integration-workshop`、`enterprise-llm-solution-delivery`（`advanced-06-top5-defense`）。

场景字段含：`coreTopics`、`interviewQuestions`、`techStack`、`portfolioHints`、`capstoneChapters`、`landingCourse`。

维护：改 `outline-specs.json` 内 `interviewScenarios` → `node scripts/sync.mjs`。
