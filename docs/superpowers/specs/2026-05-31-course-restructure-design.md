# 大模型应用开发课程大纲 · 深度重构设计

> 日期：2026-05-31 | 状态：待实施 | 版本：v1

---

## 一、重构动机

上一轮评价确认当前课程大纲覆盖 9/10 主流方向，但存在以下结构性问题：

1. **双轨耦合过紧**：Python 和 Java 开发者需要交叉学习对方栈的内容才能完成场景课，抬高学习门槛
2. **缺失 2025 年关键热点**：Prompt Caching、Structured Output、LlamaIndex、语义缓存、VLM、Audio Agent、多 Agent 框架对比、AI 开发工具链
3. **桥接课冗余**：`llm-composite-integration-workshop` 在两条路径独立后失去存在意义

## 二、重构目标

- 拆分为 **两条独立学习路径**（Python 轨 / Java 轨），各自可独立完成并达到面试要求
- 保留共享能力层（语言无关的通用知识）
- 按优先级补全 9 项新增内容
- 场景课按轨道拆分，Python 版和 Java 版各 5 门

## 三、核心设计决策

| 决策 | 结论 |
|------|------|
| 路径独立性 | Python 轨和 Java 轨完全独立，各有完整学习和毕业路径 |
| 共享内容 | 横向能力课（Prompt、评测、安全、可观测等）保持共享 |
| 场景课拆分 | 每门场景课拆成 Python 版和 Java 版 |
| 废弃课程 | `llm-composite-integration-workshop`（双栈桥接已无意义） |
| 毕业门槛 | 每轨必修 S1 + 选修 ≥1 门，共享三层毕业答辩 |

## 四、课程体系总拓扑

```
┌──────────────────────────────────────────────────────────┐
│                    共享能力层（11门）                      │
│  大模型应用基础 │ Prompt工程 │ 评测质量 │ 安全合规        │
│  上下文记忆工程 │ 知识库治理 │ 多模型路由 │ 可观测性      │
│  领域模型适配 │ 推理服务 │ 企业解决方案交付               │
└──────────────────────────────────────────────────────────┘
          ↗                              ↖
┌──────────────────────┐    ┌──────────────────────┐
│   Python 轨（6门）    │    │   Java 轨（5门）      │
│                      │    │                      │
│  Python工程化开发     │    │  Spring AI工程化      │
│  LlamaIndex工程 🆕   │    │  SAA工程体系          │
│  RAG系统工程(Py版)    │    │  RAG系统工程(Java版)   │
│  向量检索平台         │    │  Agent编排(SAA版) 🆕  │
│  Agent编排(LangGraph) │    │  应用后端与分布式治理   │
│  AI开发工具链 🆕      │    │                      │
└──────────────────────┘    └──────────────────────┘
          ↓                              ↓
┌──────────────────────┐    ┌──────────────────────┐
│ 场景落地 Py版（5门）  │    │ 场景落地 Java版（5门） │
│ S1~S5 各一门的Python版│    │ S1~S5 各一门的Java版   │
└──────────────────────┘    └──────────────────────┘
          ↘                    ↙
┌─────────────────────────────────────────────────────────┐
│              三层毕业答辩（共享）                          │
│  单场景生产实战 → 企业方案评审 → TOP5总答辩 + 坏例飞轮     │
└─────────────────────────────────────────────────────────┘
```

**课程总数**：11 共享 + 6 Python + 5 Java + 10 场景 = **32 门**（当前 24 门）

## 五、新增内容优先级与落位

| 优先级 | 新内容 | 落位 | 形式 |
|--------|--------|------|------|
| P0 | Structured Output 专题 | 共享·Prompt 工程课 advanced 章 | 独立章节 |
| P0 | Prompt Caching 专题 | 共享·多模型路由课 advanced 章 | 独立章节 |
| P0 | LlamaIndex 工程 | Python 轨·新增独立课程 | 完整课程 |
| P1 | 语义缓存深化 | 共享·可观测课 advanced 章 | 扩展为完整章 |
| P1 | Grounding/Citation 工程 | 共享·RAG 方法论课 advanced 章 | 独立章节 |
| P1 | 多 Agent 框架对比 | Python/Java 轨 Agent 课各增对比章 | 独立章节 |
| P2 | VLM 视觉语言模型专题 | 共享·多模型路由课 practice 章 | 扩展为完整章 |
| P2 | AI 开发工具链 | Python 轨·新增独立课程 | 轻量课程（4章） |
| P3 | Audio/Voice Agent 入门 | 共享·多模型路由课 advanced 章 | 入门级章节 |

## 六、共享能力层（11门）详细设计

### 6.1 大模型应用基础（精简重编）
**slug**: `llm-application-fundamentals`  
**track**: `shared`  
**章节**: 15 → 10，移除双栈实现细节

| 阶段 | 章节 ID | 标题 | 要点 |
|------|---------|------|------|
| basics | basics-01 | 从大模型到应用工程 | 产业链位置、CorpAssist 全景、岗位地图 |
| basics | basics-02 | Token、上下文窗口与费用 | 计费模型、截断策略、成本估算 |
| basics | basics-03 | Transformer 应用层理解 | Attention 直觉、温度、幻觉、边界 |
| basics | basics-04 | 模型选型矩阵 | 商用 vs 开源、能力/价格/合规 |
| basics | basics-05 | API 契约与集成 | OpenAI 兼容协议、流式/非流式、错误重试 |
| practice | practice-01 | LLM 应用分层架构 | 接入层/编排层/数据层、同步异步 |
| practice | practice-02 | 面试 TOP5 场景预览 | S1~S5 快速过桥、能力→课程路线图 |
| practice | practice-03 | 数据隐私与合规入门 | 数据分级、出网私有化、日志脱敏 |
| advanced | advanced-01 | 多模态与国产化入门 | 图文 PDF、通义/昇腾、信创选型 |
| advanced | advanced-02 | 毕业项目路线图 | 里程碑、双轨交付物、评测指标 |

### 6.2 生产级 Prompt 与对话工程（增强）
**slug**: `production-prompt-engineering`  
**track**: `shared`  
**增强**: +Structured Output 专题章（P0）

| 新增 | 章节 ID | 标题 | 说明 |
|------|---------|------|------|
| 🆕 | advanced-05-structured-output | Structured Output 实战 | OpenAI Structured Outputs、JSON Schema 约束、Pydantic 校验、双轨实现对照 |

其余章节保持原结构不变。

### 6.3 评测、实验与用户反馈闭环
**slug**: `llm-evaluation-quality`  
**track**: `shared`  
**调整**: 无结构变化

### 6.4 安全与合规工程
**slug**: `security-compliance-engineering`  
**track**: `shared`  
**调整**: 无结构变化

### 6.5 上下文与混合记忆工程
**slug**: `context-memory-engineering`  
**track**: `shared`  
**调整**: 新增 Grounding/Citation 概念衔接（P1）

### 6.6 知识库全生命周期治理
**slug**: `knowledge-lifecycle-governance`  
**track**: `shared`  
**调整**: 无结构变化

### 6.7 多模型路由与多模态（扩展）
**slug**: `multimodel-routing-multimodal`  
**track**: `shared`  
**增强**: +VLM 专题 + Prompt Caching + Audio Agent 入门

| 新增 | 章节 ID | 标题 | 优先级 |
|------|---------|------|--------|
| 🆕 | practice-05-vision-rag | VLM 视觉语言模型与图文问答 | P2 |
| 🆕 | advanced-05-prompt-caching | Prompt Caching 与成本优化 | P0 |
| 🆕 | advanced-06-audio-agent | Audio/Voice Agent 入门 | P3 |

### 6.8 可观测性与可靠性运维（扩展）
**slug**: `observability-reliability-ops`  
**track**: `shared`  
**增强**: 语义缓存从节升级为完整章（P1）

| 变更 | 章节 ID | 说明 |
|------|---------|------|
| 扩展 | advanced-01-semantic-cache | 语义缓存深度：GPTCache、命中率、路由策略、成本测算 |

### 6.9 领域模型适配 · SFT 与 LoRA（移入共享层）
**slug**: `domain-model-adaptation`  
**track**: `shared`  
**说明**: 从 Python 轨移入共享层。LoRA/微调概念和流程语言无关，双轨学习者均需掌握。

| 阶段 | 章节 ID | 标题 | 要点 |
|------|---------|------|------|
| basics | basics-01 | 何时微调 vs RAG | 决策树、CorpAssist 案例 |
| basics | basics-02 | 语料构建与清洗 | 格式、去重、质量 |
| basics | basics-03 | SFT 与 LoRA 概念 | 参数、资源、效果预期 |
| basics | basics-04 | 微调评测 | 对比基线、回滚 |
| basics | basics-05 | 偏好数据飞轮（应用侧） | DPO/RLAIF 概念、话术对齐 |
| practice | practice-01 | Python：LoRA 训练流水线 | HF/PEFT、脚本、产物 |
| practice | practice-02 | DashScope 定制模型 | 上传、部署、Spring 调用 |
| practice | practice-03 | 合并、量化与接入 | GGUF/AWQ、vLLM 指向 |
| practice | practice-04 | 合规与偏见 | 过滤、人工审核 |
| advanced | advanced-01 | 模型版本与 A/B | 注册、切换 |
| advanced | advanced-02 | 训练与推理成本 | GPU 租约、云训练 |
| advanced | advanced-03 | 运维与监控 | 漂移、再训练触发 |
| advanced | advanced-04 | 面试：微调项目叙事 | 简历、追问 |
| advanced | advanced-05 | 明确边界：不做什么 | 算法岗差异 |

### 6.10 推理服务、量化与性能应用（移入共享层）
**slug**: `llm-serving-for-applications`  
**track**: `shared`  
**说明**: 从 Python 轨移入共享层。vLLM/量化/容器化概念通用，双轨均需理解。

| 阶段 | 章节 ID | 标题 | 要点 |
|------|---------|------|------|
| basics | basics-01 | Serving 模式 | API、私有化、混合 |
| basics | basics-02 | 容器化 LLM 服务 | 镜像、GPU 调度入门 |
| basics | basics-03 | vLLM 使用 | 启动、参数、OpenAI 兼容 |
| basics | basics-04 | 量化选型 | INT4/8、精度、硬件 |
| basics | basics-05 | KV 缓存与性能（应用层） | 直觉、参数、延迟与显存权衡 |
| practice | practice-01 | Python 指向推理集群 | 负载、超时 |
| practice | practice-02 | Spring AI 远程 ChatModel | 配置、fallback |
| practice | practice-03 | 流式与批处理 | 吞吐、并发 |
| practice | practice-04 | 灰度与版本 | 路由、回滚 |
| advanced | advanced-01 | TGI 与其他引擎 | 对比、选型 |
| advanced | advanced-02 | K8s 部署清单 | Service、Ingress、监控 |
| advanced | advanced-03 | 容量规划入门 | QPS 粗算、显存 |
| advanced | advanced-04 | 面试：私有化部署题 | 架构、坑 |

### 6.11 企业级大模型解决方案交付
**slug**: `enterprise-llm-solution-delivery`  
**track**: `shared`  
**调整**: 移除双栈集成章节（原内容移交各轨），聚焦 ToB 方法论与三层毕业答辩

---

## 七、Python 轨（6门）详细设计

### 7.1 Python 大模型应用工程化开发
**slug**: `python-engineering-for-llm`  
**track**: `python`  
**调整**: 移除与 Java 对照的桥接内容，保持 14 章结构

### 7.2 🆕 LlamaIndex RAG 工程（P0）
**slug**: `llamaindex-rag-engineering`  
**track**: `python`  
**domainType**: `B`

| 阶段 | 章节 ID | 标题 | 要点 |
|------|---------|------|------|
| basics | basics-01 | LlamaIndex 核心抽象 | Document/Node/Index、与 LangChain 模型对比 |
| basics | basics-02 | IngestionPipeline 与解析 | PDF/HTML/代码、Unstructured 集成 |
| basics | basics-03 | 索引类型选型 | VectorStoreIndex/SummaryIndex/KeywordTableIndex |
| basics | basics-04 | 查询引擎与 Router | RouterQueryEngine、SubQuestionQueryEngine |
| practice | practice-01 | 高级 RAG 管线 | SentenceWindowNodeParser、缓存策略 |
| practice | practice-02 | Agent + Tools | FunctionTool、ReAct Agent、MCP 接入 |
| practice | practice-03 | 评测与迭代 | LlamaIndex eval、与 RAGAS 结合 |
| advanced | advanced-01 | 多模态索引 | 图文混合检索、CLIP Embedding |
| advanced | advanced-02 | 生产部署 | 持久化索引、增量更新、FastAPI 集成 |

### 7.3 RAG 系统工程 · Python 实现版
**slug**: `rag-system-py`  
**track**: `python`  
**说明**: 与共享 RAG 方法论课配套，提供 LangChain + LlamaIndex 对照实现

| 阶段 | 章节 ID | 标题 |
|------|---------|------|
| practice | practice-01 | LangChain RAG 实现（LCEL） |
| practice | practice-02 | LlamaIndex RAG 实现（对照） |
| practice | practice-03 | 混合检索接入 |
| practice | practice-04 | RAG 评测闭环（RAGAS） |
| advanced | advanced-01 | GraphRAG 实操（微软 GraphRAG 部署与成本） |
| advanced | advanced-02 | Grounding/Citation 工程实践 |

### 7.4 向量检索与混合检索平台
**slug**: `retrieval-vector-platform`  
**track**: `python`  
**调整**: 保持原结构

### 7.5 Agent 编排（LangGraph）（增强）
**slug**: `agent-orchestration-engineering`  
**track**: `python`  
**增强**: +多 Agent 框架对比章（P1）

| 新增 | 章节 ID | 标题 |
|------|---------|------|
| 🆕 | advanced-07-framework-compare | 多 Agent 框架对比（CrewAI/AutoGen/Dify vs LangGraph） |

其余章节保持原结构。

### 7.6 🆕 AI-native 开发工具链（P2）
**slug**: `ai-dev-toolchain`  
**track**: `python`  
**domainType**: `F`

| 阶段 | 章节 ID | 标题 | 要点 |
|------|---------|------|------|
| basics | basics-01 | AI 辅助编码全景 | Cursor/Copilot/Claude Code/Windsurf 对比 |
| basics | basics-02 | Prompt 驱动开发工作流 | 需求→设计→生成→审查闭环 |
| practice | practice-01 | 测试与文档自动生成 | AI 生成 pytest/docstring/OpenAPI schema |
| practice | practice-02 | AI 辅助调试与 Code Review | 坏例分析、安全 Review、CI 集成 |

---

## 八、Java 轨（5门）详细设计

### 8.1 Spring AI 工程化开发
**slug**: `spring-ai-engineering`  
**track**: `java`  
**调整**: 移除 Python 对照内容，纯 Java 视角

### 8.2 Spring AI Alibaba 工程体系
**slug**: `spring-ai-alibaba-engineering`  
**track**: `java`  
**调整**: Agent/Graph 部分拆分到独立课（见 8.3），保留 DashScope/百炼/Admin/容灾

精简后的 SAA 课聚焦：
- DashScope/百炼接入
- Starter 与自动配置
- extensions（文档解析、多模态）
- Admin 与可视化
- 容灾与限流
- 观测与调试
- 生产 QPS 与缓存分层

### 8.3 🆕 Agent 编排 · Spring AI Alibaba 版（从 SAA 课拆分重构）
**slug**: `agent-orchestration-java`  
**track**: `java`  
**domainType**: `B`

| 阶段 | 章节 ID | 标题 | 要点 |
|------|---------|------|------|
| basics | basics-01 | ReactAgent 基础 | ReAct 循环、工具定义、停止条件 |
| basics | basics-02 | Graph 工作流 | 节点/边、条件路由、可视化 |
| practice | practice-01 | 多 Agent 编排 | Sequential/Parallel/Routing、状态管理 |
| practice | practice-02 | 人在回路 | 审批节点、上下文压缩、步数限制 |
| practice | practice-03 | MCP 集成 | 协议、工具注册、安全与鉴权 |
| practice | practice-04 | A2A 与 Nacos | 分布式 Agent、服务发现 |
| advanced | advanced-01 | 容灾、限流与降级 | 熔断、缓存、多模型 fallback |
| advanced | advanced-02 | 观测与调试 | 日志、Trace、Prompt 回放 |
| advanced | advanced-03 | 🆕 多 Agent 框架对比 | CrewAI/AutoGen/Dify vs SAA Graph（P1） |
| advanced | advanced-04 | 面试：通义栈架构题 | 答题框架、常见坑 |

### 8.4 RAG 系统工程 · Java 实现版
**slug**: `rag-system-java`  
**track**: `java`

| 阶段 | 章节 ID | 标题 |
|------|---------|------|
| practice | practice-01 | Spring AI RAG Pipeline |
| practice | practice-02 | VectorStore 实战（Milvus/Redis/Simple） |
| practice | practice-03 | 混合检索与 Rerank |
| practice | practice-04 | RAG 评测闭环（集成测试 + Advisor 断言） |
| advanced | advanced-01 | 多知识库与路由（意图路由、权限、租户） |
| advanced | advanced-02 | GraphRAG 概念与 Java 消费契约 |

### 8.5 大模型应用后端与分布式治理
**slug**: `llm-application-backend`  
**track**: `java`  
**调整**: 保持原结构，纯 Java 视角

---

## 九、场景落地课（10门 = 5场景 × 2版本）

### 统一结构模板

每门场景课三阶段：

| 阶段 | 内容 | Python 版特征 | Java 版特征 |
|------|------|---------------|-------------|
| basics (3-4章) | 业务分析、ROI、核心模块、架构选型 | 共享业务分析，通用架构图 | 同左 |
| practice (5-6章) | 双栈落地实战 | LangChain/LlamaIndex/ FastAPI 实现 | Spring AI/VectorStore/ Advisor 实现 |
| advanced (2-3章) | 生产化与面试答辩 | Python 生态数据叙事 | Java 生态数据叙事 |

### 九.1 场景矩阵

| 场景 | Python 版 slug | Java 版 slug | 必修/选修 |
|------|----------------|--------------|-----------|
| S1 企业 RAG 知识库 | `scenario-py-rag-kb` | `scenario-java-rag-kb` | **必修** |
| S2 智能客服 | `scenario-py-customer-service` | `scenario-java-customer-service` | 选修 |
| S3 Agent 自动化 | `scenario-py-agent-automation` | `scenario-java-agent-automation` | 选修 |
| S4 代码助手 | `scenario-py-code-assistant` | `scenario-java-code-assistant` | 选修 |
| S5 内容生成 | `scenario-py-content-studio` | `scenario-java-content-studio` | 选修 |

### 九.2 毕业门槛

- **必修**：S1（自己轨道版本）
- **选修**：≥1 门（自己轨道版本）
- M2 门禁：不达标不得并行第二个场景课
- 三层毕业答辩（共享 `enterprise-llm-solution-delivery`）

---

## 十、学习路径

### Python 轨
```
阶段一   共享：大模型应用基础（10章）
阶段二   Python 工程化开发 + AI 开发工具链
阶段三   共享：Prompt 工程 + 安全合规 + 上下文记忆
阶段四   Python：RAG 系统工程 + LlamaIndex 工程 + 向量检索平台
阶段五   共享：评测质量 + 知识库治理
阶段六   Python：Agent 编排(LangGraph) + 共享：多模型路由
阶段七   共享：领域模型适配 + 推理服务
阶段八   场景落地：S1(Py版·必修) + ≥1 选修(Py版)
阶段九   共享：可观测性 + 企业解决方案交付（三层毕业）
```

### Java 轨
```
阶段一   共享：大模型应用基础（10章）
阶段二   Java：Spring AI 工程化 + SAA 工程体系
阶段三   共享：Prompt 工程 + 安全合规 + 上下文记忆
阶段四   Java：RAG 系统工程 + 应用后端与分布式治理
阶段五   共享：评测质量 + 知识库治理
阶段六   Java：Agent 编排(SAA版) + 共享：多模型路由
阶段七   共享：领域模型适配 + 推理服务
阶段八   场景落地：S1(Java版·必修) + ≥1 选修(Java版)
阶段九   共享：可观测性 + 企业解决方案交付（三层毕业）
```

---

## 十一、迁移摘要

| 操作 | 内容 |
|------|------|
| **删除** | `llm-composite-integration-workshop`（双栈桥接无意义） |
| **新增** | `llamaindex-rag-engineering`（Python 轨·P0） |
| **新增** | `agent-orchestration-java`（Java 轨·从 SAA 拆分重构） |
| **新增** | `ai-dev-toolchain`（Python 轨·P2） |
| **拆分** | `rag-system-engineering` → 共享方法论 + `rag-system-py` + `rag-system-java` |
| **拆分** | 5 门 `scenario-enterprise-*` → 10 门 `scenario-py-*` + `scenario-java-*` |
| **移入共享** | `domain-model-adaptation`、`llm-serving-for-applications` 从 Python 轨移入共享层 |
| **精简** | `llm-application-fundamentals` 15→10 章 |
| **精简** | `spring-ai-alibaba-engineering` Agent 部分抽出到 `agent-orchestration-java` |
| **增强** | 9 项新内容注入到各课（见第五节） |

---

## 十二、37 项能力 → 课程映射更新

原 37 项能力映射需同步更新，核心变化：

| 能力 | 旧课程 | 新课程 |
|------|--------|--------|
| C10 整体架构设计 | fundamentals + composite + backend | fundamentals + backend（Java 轨） |
| C11 多模型路由 | multimodel-routing + spring-ai | multimodel-routing（共享） |
| C15 API 与第三方集成 | python-eng + llm-backend | python-eng（Py 轨）+ llm-backend（Java 轨） |
| C17 微服务与容器化 | llm-backend + python-eng | python-eng（Py 轨）+ llm-backend（Java 轨） |
| 新增 | — | LlamaIndex 相关能力（Py 轨） |
| 新增 | — | AI 工具链能力（Py 轨） |

---

## 十三、实施步骤

1. 更新 `outline-specs.json`：新增/删除/拆分课程、调整章节
2. 更新 `courses.json`：门户目录元数据同步
3. 更新 `REFERENCE.md`：能力清单与学习路径
4. 更新 `README.md`：仓库说明与拓扑图
5. 执行 `node courses/scripts/sync.mjs` 同步
6. 为新增课程创建目录结构和 `course.json`
