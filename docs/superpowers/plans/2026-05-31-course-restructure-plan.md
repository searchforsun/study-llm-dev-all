# 32 门课程大纲深度重构 · 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 24 门课程大纲深度重构为 32 门（11 共享 + 6 Python + 5 Java + 10 场景），补全 9 项 2025 年热点内容，拆分为两条独立学习路径。

**Architecture:** 以 `outline-specs.json` 为唯一真源，通过 `sync.mjs` 生成 `courses.json` 门户索引，然后逐课生成 `course.json` + 章节 HTML + 测验 + 术语，最终通过 `assemble-index.mjs` 组装为完整课程页面。

**Tech Stack:** Node.js (sync/assemble scripts), JSON (data files), HTML/CSS/JS (course pages), Mermaid (diagrams), highlight.js (code)

**Assembly script path:** `C:\Users\sunshine\.claude\skills\programming-html-tutorial\scripts\assemble-index.mjs`

---

## File Structure Map

```
courses/
├── outline-specs.json          ← MODIFY: 32 courses, refactored
├── courses.json                ← REGENERATE: via sync.mjs
├── index.html                  ← MODIFY: portal for 32 courses
├── README.md                   ← MODIFY: updated conventions
├── REFERENCE.md                ← MODIFY: updated 37 capabilities mapping
├── scripts/
│   └── sync.mjs                ← MODIFY: new tracks, scenarios, mappings
├── llm-application-fundamentals/   ← MODIFY: 15→10 chapters
├── llamaindex-rag-engineering/     ← CREATE: new Python track course
├── rag-system-py/                  ← CREATE: split from rag-system-engineering
├── rag-system-java/                ← CREATE: split from rag-system-engineering
├── agent-orchestration-java/       ← CREATE: split from spring-ai-alibaba-engineering
├── ai-dev-toolchain/               ← CREATE: new Python track course
├── scenario-py-rag-kb/             ← CREATE: S1 Python version
├── scenario-java-rag-kb/           ← CREATE: S1 Java version
├── scenario-py-customer-service/   ← CREATE: S2 Python version
├── scenario-java-customer-service/ ← CREATE: S2 Java version
├── scenario-py-agent-automation/   ← CREATE: S3 Python version
├── scenario-java-agent-automation/ ← CREATE: S3 Java version
├── scenario-py-code-assistant/     ← CREATE: S4 Python version
├── scenario-java-code-assistant/   ← CREATE: S4 Java version
├── scenario-py-content-studio/     ← CREATE: S5 Python version
├── scenario-java-content-studio/   ← CREATE: S5 Java version
├── (existing courses modified as needed)
└── (legacy: llm-composite-integration-workshop/ → unlinked from portal)
```

---

## Phase A: 更新 outline-specs.json（真源）

### Task A1: 删除 llm-composite-integration-workshop

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 定位并删除课程定义**

在 `courses` 块中找到 key `"llm-composite-integration-workshop"`，删除整个课程对象（约 180 行，从 `"llm-composite-integration-workshop": {` 到对应的 `},`）。

- [ ] **Step 2: 从学习路径中移除引用**

在 `learningPath.stages[]` 中搜索所有 `"llm-composite-integration-workshop"` 并删除：
- `stage-3.bridge[]` 中移除 `"llm-composite-integration-workshop"`
- `capstoneModel.layers[1].course` 不再引用此课，改为 `null`（layer-2 将在各轨场景课中自然完成）

- [ ] **Step 3: 从面试场景交叉引用中移除**

在 `interviewScenarios.scenarios[].courses[]` 和 `capstoneChapters[]` 中搜索并移除所有对该课程的引用。

- [ ] **Step 4: 从 capability 映射中移除**

在 capability `C10` 和 `C15` 的 `primaryCourses` 或相关映射中移除该课程引用。

### Task A2: 移动 domain-model-adaptation 和 llm-serving 到 shared

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 修改 domain-model-adaptation 的 track**

```json
// 找到 "domain-model-adaptation"，将:
"track": "python"
// 改为:
"track": "shared"
```

同时将 `dualStackPolicy` 从 `"dual-compare"` 改为 `"shared"`。

- [ ] **Step 2: 修改 llm-serving-for-applications 的 track**

```json
// 找到 "llm-serving-for-applications"，将:
"track": "python"
// 改为:
"track": "shared"
```

同时将 `dualStackPolicy` 从 `"dual-compare"` 改为 `"shared"`。

- [ ] **Step 3: 从 Python 轨学习路径中移除**

在 `learningPath.stages[].parallel.python[]` 中移除这两个课程引用。

- [ ] **Step 4: 将两课添加到共享学习路径**

在 `learningPath.stages[]` 的合适 `shared[]` 数组中添加这两个课程。`domain-model-adaptation` 加入 stage-4 的 shared，`llm-serving-for-applications` 同样加入 stage-4 的 shared。

### Task A3: 精简 llm-application-fundamentals（15→10 章）

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 删除以下 5 个章节**

移除：
- `practice-04-observability-intro`（移入可观测课）
- `practice-05-handson-first-call`（移入各轨工程课）
- `advanced-03-system-design`（移入场景课 S1）
- `advanced-04-career-mapping`（移入企业交付课）
- `advanced-05-capstone-plan`（移入企业交付课）

在 `courses.llm-application-fundamentals.outline[]` 中找到对应 phase 的 chapters 数组，删除这些 entry。

- [ ] **Step 2: 重编号保留章节的 id**

保留的 10 章重新编号确保连续性：
```
basics-01 → basics-01 (不变)
basics-02 → basics-02 (不变)
basics-03 → basics-03 (不变)
basics-04 → basics-04 (不变)
basics-05 → basics-05 (不变)
practice-01 → practice-01 (不变)
practice-02 → practice-02 (不变)
practice-03 → practice-03 (不变)
advanced-01 → advanced-01 (不变)
advanced-02 → advanced-02 (不变)
```

- [ ] **Step 3: 更新 phase 结构**

原来是 3 个 phase（basics 5章 + practice 5章 + advanced 5章），现在改为：
- basics: 5 章（不变）
- practice: 3 章（原 practice-01, 02, 03）
- advanced: 2 章（原 advanced-01, 02）

删除空的 phase 和多余的章节定义。

### Task A4: 精简 spring-ai-alibaba-engineering（Agent 部分抽出）

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 从 SAA 课中移除 Agent/Graph 相关章节**

在 `spring-ai-alibaba-engineering.outline[]` 的 practice phase 中移除：
- `practice-01-react-agent`
- `practice-02-multi-agent`
- `practice-03-graph`
- `practice-04-human-loop`
- `practice-05-mcp`
- `practice-06-a2a-nacos`

在 advanced phase 中移除：
- `advanced-04-corpassist-agent`
- `advanced-05-compare-langgraph`

保留：
- basics 全部 4 章（DashScope/Starter/extensions/vs Python）
- practice 变为空 → 将原 advanced-01 (admin)、advanced-02 (resilience)、advanced-03 (obs)、advanced-06 (qps) 移至 practice
- advanced：保留 `advanced-07-interview`

- [ ] **Step 2: 调整章节编号**

重编号保留的章节，确保 basics 4章 + practice 4章 + advanced 1章 = 9章。

### Task A5: 新增 3 门课程定义到 outline-specs.json

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 新增 llamaindex-rag-engineering（Python 轨）**

在 `courses` 块中添加完整的课程定义，包含以下大纲：

```json
"llamaindex-rag-engineering": {
  "title": "LlamaIndex RAG 工程实践",
  "track": "python",
  "domainType": "B",
  "jdTags": ["python", "rag", "vector"],
  "dualStackPolicy": "python",
  "phaseGoals": {
    "basics": "掌握 LlamaIndex 核心抽象与索引类型",
    "practice": "实现高级 RAG 管线与 Agent 集成",
    "advanced": "多模态索引与生产部署"
  },
  "outline": [
    {
      "phaseId": "basics",
      "phaseTitle": "LlamaIndex 核心抽象",
      "chapters": [
        {"id": "basics-01", "title": "LlamaIndex 与 LangChain 对比", "sections": ["Document/Node/Index 模型", "与 LangChain LCEL 对照", "选型决策树", "CorpAssist 场景适配"]},
        {"id": "basics-02", "title": "IngestionPipeline 与文档解析", "sections": ["PDF/HTML/代码解析", "Unstructured 集成", "元数据提取策略", "CorpAssist 文档管线"]},
        {"id": "basics-03", "title": "索引类型选型", "sections": ["VectorStoreIndex", "SummaryIndex", "KeywordTableIndex", "索引选择决策表"]},
        {"id": "basics-04", "title": "查询引擎与路由", "sections": ["RouterQueryEngine", "SubQuestionQueryEngine", "响应合成模式", "与 Spring AI 查询对照"]},
        {"id": "basics-05", "title": "Embedding 与向量存储", "sections": ["Embedding 模型选择", "Milvus/Qdrant 集成", "批处理优化", "索引持久化"]}
      ]
    },
    {
      "phaseId": "practice",
      "phaseTitle": "高级 RAG 管线",
      "chapters": [
        {"id": "practice-01", "title": "高级检索策略", "sections": ["SentenceWindowNodeParser", "AutoMergingRetriever", "递归检索", "延迟与召回权衡"]},
        {"id": "practice-02", "title": "Agent + Tools 集成", "sections": ["FunctionTool 定义", "ReAct Agent with LlamaIndex", "MCP 工具接入", "工具调用错误处理"]},
        {"id": "practice-03", "title": "评测与迭代", "sections": ["LlamaIndex eval 模块", "与 RAGAS 结合", "Ablation 实验设计", "评测报告模板"]},
        {"id": "practice-04", "title": "多知识库与路由", "sections": ["意图路由实现", "权限过滤", "多租户索引隔离", "配置管理"]},
        {"id": "practice-05", "title": "实战：CorpAssist 知识库 Python 版", "sections": ["端到端管线", "FastAPI 服务化", "流式响应", "验收清单"]}
      ]
    },
    {
      "phaseId": "advanced",
      "phaseTitle": "生产化与多模态",
      "chapters": [
        {"id": "advanced-01", "title": "多模态索引与图文检索", "sections": ["图文混合 Embedding", "CLIP 模型集成", "OCR + 向量检索", "CorpAssist 附件问答"]},
        {"id": "advanced-02", "title": "生产部署与增量更新", "sections": ["增量索引策略", "索引版本管理", "蓝绿部署", "监控与告警"]},
        {"id": "advanced-03", "title": "性能与成本优化", "sections": ["缓存策略（精确+语义）", "小模型路由", "预计算热点问答", "Token 成本归因"]},
        {"id": "advanced-04", "title": "面试：LlamaIndex vs LangChain 架构题", "sections": ["选型叙事", "架构对比图", "迁移成本分析", "STAR 答题模板"]}
      ]
    }
  ],
  "capabilityIds": ["C2", "C8", "C15"],
  "interviewScenarios": ["S1", "S3"]
}
```

- [ ] **Step 2: 新增 agent-orchestration-java（Java 轨）**

```json
"agent-orchestration-java": {
  "title": "Agent 编排工程 · Spring AI Alibaba 版",
  "track": "java",
  "domainType": "B",
  "jdTags": ["java", "agent", "spring-ai", "mcp"],
  "dualStackPolicy": "java",
  "phaseGoals": {
    "basics": "掌握 ReactAgent 与 Graph 工作流",
    "practice": "多 Agent 协作、人在回路、MCP 集成",
    "advanced": "容灾降级、框架对比、生产调优"
  },
  "outline": [
    {
      "phaseId": "basics",
      "phaseTitle": "Agent 基础",
      "chapters": [
        {"id": "basics-01", "title": "ReactAgent 基础与 ReAct 循环", "sections": ["ReAct 思考-行动-观察", "工具定义规范", "停止条件与预算", "与 LangGraph 概念对照"]},
        {"id": "basics-02", "title": "Graph 工作流与状态管理", "sections": ["节点/边/条件路由", "状态定义与传递", "可视化调试", "与微服务 Saga 模式对照"]},
        {"id": "basics-03", "title": "工具调用与 Function Calling", "sections": ["@Tool 注解定义", "参数 schema 生成", "错误重试策略", "工具契约 OpenAPI 导出"]},
        {"id": "basics-04", "title": "会话与记忆管理", "sections": ["ChatMemory 类型选型", "Redis 持久化", "多租户 session 隔离", "记忆压缩策略"]}
      ]
    },
    {
      "phaseId": "practice",
      "phaseTitle": "多 Agent 编排与集成",
      "chapters": [
        {"id": "practice-01", "title": "多 Agent 编排模式", "sections": ["Sequential/Parallel/Routing", "主管-工人模式", "Handoff 交接", "状态共享与冲突解决"]},
        {"id": "practice-02", "title": "人在回路与审批", "sections": ["中断与恢复", "审批节点设计", "上下文压缩", "审计日志"]},
        {"id": "practice-03", "title": "MCP 协议集成", "sections": ["MCP Server/Client", "工具注册与发现", "鉴权与安全", "超时与降级"]},
        {"id": "practice-04", "title": "A2A 与 Nacos 分布式 Agent", "sections": ["分布式 Agent 架构", "服务发现与注册", "负载均衡", "与微服务网关集成"]},
        {"id": "practice-05", "title": "实战：CorpAssist 办公 Agent", "sections": ["日历/邮件/工单工具", "完整工作流 Demo", "步数/Token 监控", "验收清单"]}
      ]
    },
    {
      "phaseId": "advanced",
      "phaseTitle": "生产化与治理",
      "chapters": [
        {"id": "advanced-01", "title": "容灾、限流与降级", "sections": ["熔断策略", "模型 fallback 链路", "限流与削峰", "多活部署"]},
        {"id": "advanced-02", "title": "观测与调试", "sections": ["Micrometer 指标埋点", "OTel Trace 贯通", "Prompt 回放调试", "Dashboard 仪表盘"]},
        {"id": "advanced-03", "title": "多 Agent 框架对比", "sections": ["CrewAI vs AutoGen vs Dify", "LangGraph vs SAA Graph", "选型决策矩阵", "迁移成本评估"]},
        {"id": "advanced-04", "title": "面试：通义栈 Agent 架构五连问", "sections": ["Agent vs 纯对话", "多步规划与反思", "工具失败降级", "记忆系统设计", "MCP 协议深度"]}
      ]
    }
  ],
  "capabilityIds": ["C5", "C12", "C13"],
  "interviewScenarios": ["S3"]
}
```

- [ ] **Step 3: 新增 ai-dev-toolchain（Python 轨，P2）**

```json
"ai-dev-toolchain": {
  "title": "AI-native 开发工具链实战",
  "track": "python",
  "domainType": "F",
  "jdTags": ["python", "api"],
  "dualStackPolicy": "python",
  "phaseGoals": {
    "basics": "掌握 AI 辅助编码工具选型与工作流",
    "practice": "实现测试/文档/Review 的 AI 自动化",
    "advanced": "构建团队级 AI 开发规范"
  },
  "outline": [
    {
      "phaseId": "basics",
      "phaseTitle": "AI 编码工具全景",
      "chapters": [
        {"id": "basics-01", "title": "AI 辅助编码工具对比", "sections": ["Cursor/Copilot/Claude Code/Windsurf", "能力矩阵对比", "成本与隐私权衡", "企业采购评估"]},
        {"id": "basics-02", "title": "Prompt 驱动开发工作流", "sections": ["需求→设计→生成→审查闭环", "Context 工程 for AI Coding", ".cursorrules/claude.md 最佳实践", "与 CorpAssist 开发的结合"]},
        {"id": "basics-03", "title": "AI 生成代码的质量管控", "sections": ["生成代码的常见缺陷", "静态检查 + AI Review 双保险", "测试覆盖率监控", "可接受的 AI 代码比例"]},
        {"id": "basics-04", "title": "规则与约定驱动开发", "sections": ["项目级 Rules 编写", "代码风格自动对齐", "API 契约一致性", "与团队 Code Review 流程整合"]}
      ]
    },
    {
      "phaseId": "practice",
      "phaseTitle": "AI 自动化实践",
      "chapters": [
        {"id": "practice-01", "title": "AI 生成测试用例", "sections": ["pytest 用例自动生成", "边界条件覆盖", "Mock 与 Fixture 生成", "覆盖率报告解读"]},
        {"id": "practice-02", "title": "AI 生成文档与 Schema", "sections": ["docstring 自动化", "OpenAPI Schema 生成", "README 与 API 文档", "文档一致性校验"]},
        {"id": "practice-03", "title": "AI 辅助 Code Review 与调试", "sections": ["Bug 定位 Prompt 模式", "安全漏洞扫描 Review", "性能热点分析", "CI 中集成 AI Review"]},
        {"id": "practice-04", "title": "实战：CorpAssist 开发效率提升", "sections": ["AI 辅助 RAG 管线开发", "Agent 工作流生成", "评测脚本自动编写", "效率数据对比"]}
      ]
    }
  ],
  "capabilityIds": ["C15"],
  "interviewScenarios": []
}
```

### Task A6: 拆分 rag-system-engineering 并创建 RAG 实现课

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 精简 rag-system-engineering 为共享方法论课**

保留 basics 全部 6 章作为共享概念，移除 practice 中的双栈实现章节（`practice-01-python-rag`、`practice-02-spring-rag`），保留 `practice-03-hybrid`、`practice-04-multi-kb`、`practice-05-eval-loop`、`practice-07-code-rag` 作为通用概念章。

新增 advanced 章：`advanced-07-grounding`（Grounding/Citation 工程，P1）。

- [ ] **Step 2: 新增 rag-system-py（Python 轨）**

仅含实践实现章：
```
practice-01: LangChain RAG 实现（LCEL）
practice-02: LlamaIndex RAG 实现（对照）
practice-03: 混合检索接入（BM25+向量）
practice-04: RAG 评测闭环（RAGAS）
advanced-01: GraphRAG 实操（微软 GraphRAG 部署与成本）
advanced-02: Grounding/Citation 工程实践
```

- [ ] **Step 3: 新增 rag-system-java（Java 轨）**

仅含实践实现章：
```
practice-01: Spring AI RAG Pipeline
practice-02: VectorStore 实战（Milvus/Redis/Simple 切换）
practice-03: 混合检索与 Rerank
practice-04: RAG 评测闭环（集成测试 + Advisor 断言）
advanced-01: 多知识库与路由
advanced-02: GraphRAG 概念与 Java 消费契约
```

### Task A7: 拆分场景课（5 → 10）

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 为每个场景创建 Python 版和 Java 版定义**

5 个场景 × 2 个轨道 = 10 门课。每门课的 slug 命名规则：
- `scenario-py-rag-kb` / `scenario-java-rag-kb`
- `scenario-py-customer-service` / `scenario-java-customer-service`
- `scenario-py-agent-automation` / `scenario-java-agent-automation`
- `scenario-py-code-assistant` / `scenario-java-code-assistant`
- `scenario-py-content-studio` / `scenario-java-content-studio`

- [ ] **Step 2: Python 版场景课专用 features**

practice 阶段的章节使用 Python 技术栈：
- LangChain/LlamaIndex 实现
- FastAPI 服务化
- RAGAS 评测
- Python 生态数据叙事

- [ ] **Step 3: Java 版场景课专用 features**

practice 阶段的章节使用 Java 技术栈：
- Spring AI VectorStore/Advisor
- Spring Boot REST/SSE
- Micrometer 观测
- Java 生态数据叙事

- [ ] **Step 4: 删除原 scenario-enterprise-* 定义**

移除 5 个旧的 `scenario-enterprise-*` 课程定义，替换为 10 个新的。

- [ ] **Step 5: 更新学习路径中的场景引用**

在 `learningPath.stages[].scenarioMandatory[]` 和 `scenarioElective[]` 中替换为新的 slug。
在 `completionRule.requiredScenario` 中替换引用。

### Task A8: 注入 9 项新内容到现有课程

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: production-prompt-engineering 添加 Structured Output（P0）**

在 advanced phase 新增章：
```json
{"id": "advanced-05-structured-output", "title": "Structured Output 实战", "sections": ["OpenAI Structured Outputs 机制", "JSON Schema 约束设计", "Pydantic 校验与修复循环", "双轨实现对照（Python/Spring AI）"]}
```

- [ ] **Step 2: multimodel-routing-multimodal 添加 3 章（P0+P2+P3）**

在 practice phase 新增：
```json
{"id": "practice-05-vision-rag", "title": "VLM 视觉语言模型与图文问答", "sections": ["GPT-4V/通义VL 能力对比", "图文混合检索架构", "OCR+VLM 联合 Pipeline", "CorpAssist 附件问答实战"]}
```

在 advanced phase 新增：
```json
{"id": "advanced-05-prompt-caching", "title": "Prompt Caching 与成本优化", "sections": ["Anthropic/OpenAI Prompt Caching 机制", "缓存命中率策略", "动态 vs 静态前缀", "成本测算与 ROI"]},
{"id": "advanced-06-audio-agent", "title": "Audio/Voice Agent 入门", "sections": ["Whisper + TTS 链路", "Realtime API 架构", "语音打断与 VAD", "企业应用边界"]}
```

- [ ] **Step 3: observability-reliability-ops 扩展语义缓存（P1）**

将 `advanced-01-cache-cost` 从简单节扩展为完整章，增加：
```json
{"id": "advanced-01-semantic-cache", "title": "语义缓存深度实践", "sections": ["GPTCache 架构与部署", "相似度阈值调优", "缓存命中率 vs 质量权衡", "Redis/MongoDB 后端对比", "成本测算与 ROI 报告"]}
```

- [ ] **Step 4: context-memory-engineering 添加 Grounding 衔接（P1）**

在 advanced phase 新增 Grounding 概念章，衔接 RAG 课中的 Citation 实践：
```json
{"id": "advanced-06-grounding", "title": "Grounding 与引用溯源概念", "sections": ["幻觉与缺乏 Grounding", "引用溯源的技术路径", "与 RAG 课 Citation 实践的衔接", "面试：如何证明回答可信"]}
```

- [ ] **Step 5: agent-orchestration-engineering 添加框架对比（P1）**

新增章到 advanced phase（LangGraph 版）：
```json
{"id": "advanced-07-framework-compare", "title": "多 Agent 框架对比", "sections": ["CrewAI 角色分工模型", "AutoGen 对话驱动编排", "Dify 低代码 vs 自研", "选型决策矩阵与迁移成本"]}
```

Java 版（agent-orchestration-java）同样包含此章（已在 Task A5 Step 2 中定义）。

- [ ] **Step 6: 验证所有课程 capabilityIds 和 interviewScenarios 引用**

确保新增课程的能力映射和场景引用正确。更新 capabilityIds 的 JSON 数组为有效的 capability ID 字符串。

### Task A9: 更新学习路径 staging 结构

**Files:** Modify `courses/outline-specs.json`

- [ ] **Step 1: 重写 learningPath.stages[]**

新的 stages 结构：

```json
"stages": [
  {
    "id": "stage-1",
    "title": "阶段一 · 认知基座",
    "shared": ["llm-application-fundamentals"]
  },
  {
    "id": "stage-2",
    "title": "阶段二 · 工程基座",
    "parallel": {
      "python": ["python-engineering-for-llm", "ai-dev-toolchain"],
      "java": ["spring-ai-engineering", "spring-ai-alibaba-engineering"]
    }
  },
  {
    "id": "stage-3",
    "title": "阶段三 · 核心能力（共享）",
    "shared": ["production-prompt-engineering", "security-compliance-engineering", "context-memory-engineering"]
  },
  {
    "id": "stage-4",
    "title": "阶段四 · RAG 工程",
    "parallel": {
      "python": ["rag-system-py", "llamaindex-rag-engineering", "retrieval-vector-platform"],
      "java": ["rag-system-java", "llm-application-backend"]
    },
    "shared": ["rag-system-engineering", "knowledge-lifecycle-governance"]
  },
  {
    "id": "stage-5",
    "title": "阶段五 · 评测与 Agent",
    "shared": ["llm-evaluation-quality", "multimodel-routing-multimodal"],
    "parallel": {
      "python": ["agent-orchestration-engineering"],
      "java": ["agent-orchestration-java"]
    }
  },
  {
    "id": "stage-6",
    "title": "阶段六 · 生产化",
    "shared": ["domain-model-adaptation", "llm-serving-for-applications", "observability-reliability-ops"]
  },
  {
    "id": "stage-7",
    "title": "阶段七 · 场景落地",
    "scenarioMandatory": ["scenario-py-rag-kb", "scenario-java-rag-kb"],
    "scenarioElective": [
      "scenario-py-customer-service", "scenario-java-customer-service",
      "scenario-py-agent-automation", "scenario-java-agent-automation",
      "scenario-py-code-assistant", "scenario-java-code-assistant",
      "scenario-py-content-studio", "scenario-java-content-studio"
    ]
  },
  {
    "id": "stage-8",
    "title": "阶段八 · 毕业交付",
    "bridge": ["enterprise-llm-solution-delivery"]
  }
]
```

- [ ] **Step 2: 更新 completionRule**

```json
"completionRule": {
  "requiredTracks": "one",  // 改为选一轨即可毕业
  "requiredShared": "all",
  "requiredScenario": {
    "mandatory": ["scenario-py-rag-kb", "scenario-java-rag-kb"],
    "electiveMin": 1,
    "electiveFrom": ["..."]  // 8门场景课的 slug
  },
  "securityBasicsBeforeScenario": true,
  "capstoneLayersRequired": ["layer-1", "layer-2", "layer-3"]
}
```

- [ ] **Step 3: 更新 capstoneModel layers**

layer-2 不再指向 `llm-composite-integration-workshop`，改为在各轨场景课中自然完成双栈集成。

### Task A10: 验证 outline-specs.json 的 JSON 有效性

- [ ] **Step 1: JSON 格式验证**

```bash
node -e "const j = require('./courses/outline-specs.json'); console.log('Valid JSON, courses:', Object.keys(j.courses).length);"
```

Expected: `Valid JSON, courses: 32`

- [ ] **Step 2: 检查所有 course slug 是否与学习路径引用一致**

编写验证脚本：遍历 `learningPath.stages[]` 和 `completionRule` 中的所有课程引用，确保每个 slug 都存在于 `courses` 块中。

- [ ] **Step 3: 检查 capabilityIds 一致性**

确保所有课程引用的 capability ID 存在于 `REFERENCE.md` 的 37 项能力清单中。

- [ ] **Step 4: 提交**

```bash
git add courses/outline-specs.json
git commit -m "feat: restructure outline-specs to 32 courses with dual independent tracks"
```

---

## Phase B: 更新 sync.mjs 和生成 courses.json

### Task B1: 更新 sync.mjs

**Files:** Modify `courses/scripts/sync.mjs`

- [ ] **Step 1: 更新 track 类型映射**

在 sync.mjs 中更新 track 类型到标签的映射：

```javascript
const TRACK_LABELS = {
  shared: '共享能力课',
  python: 'Python 轨',
  java: 'Java 轨',
  scenario: '场景落地课',
};
```

- [ ] **Step 2: 更新 trackOrder 权重**

```javascript
const TRACK_ORDER = {
  shared: 0,
  python: 1,
  java: 2,
  scenario: 3,
};
```

- [ ] **Step 3: 更新课程摘要生成逻辑**

为新增的课程生成 summary 字段（从 course.json 的 meta 或硬编码映射中获取）。

- [ ] **Step 4: 更新 scenarioMeta 映射**

新增场景 slug 到 scenarioRole 的映射：
- 所有 `scenario-*-rag-kb` → `mandatory`
- 其余场景课 → `elective`

- [ ] **Step 5: 保留 legacy 课程在 portal 中的处理**

旧的 `scenario-enterprise-*` 和 `llm-composite-integration-workshop` 不再出现在 `courses.json` 中，但在 `outline-specs.json` 中也不存在（已删除）。

- [ ] **Step 6: 提交**

```bash
git add courses/scripts/sync.mjs
git commit -m "feat: update sync.mjs for 32-course dual-track structure"
```

### Task B2: 运行 sync 生成 courses.json

- [ ] **Step 1: 执行同步**

```bash
cd courses && node scripts/sync.mjs
```

- [ ] **Step 2: 验证输出**

```bash
node -e "const c = require('./courses/courses.json'); console.log('Courses in catalog:', c.courses.length); c.courses.forEach(c => console.log(c.slug, '-', c.track));"
```

Expected: `Courses in catalog: 32`

- [ ] **Step 3: 提交**

```bash
git add courses/courses.json
git commit -m "feat: regenerate courses.json for 32-course catalog"
```

---

## Phase C: 引导新课程目录

### Task C1: 批量创建新课程骨架

**Files:** Create 16 个新课程目录（10 场景 + 3 新增能力课 + 2 RAG 实现课 + 1 Agent Java 课）

- [ ] **Step 1: 为每个新 slug 运行 bootstrap**

> 注意：`bootstrap-course-from-spec.mjs` 的用法是 `node scripts/bootstrap-course-from-spec.mjs <slug>`

需要 bootstrap 的 slug 列表（16 个）：
```
llamaindex-rag-engineering
rag-system-py
rag-system-java
agent-orchestration-java
ai-dev-toolchain
scenario-py-rag-kb
scenario-java-rag-kb
scenario-py-customer-service
scenario-java-customer-service
scenario-py-agent-automation
scenario-java-agent-automation
scenario-py-code-assistant
scenario-java-code-assistant
scenario-py-content-studio
scenario-java-content-studio
```

对每个 slug 执行：
```bash
cd courses && node scripts/bootstrap-course-from-spec.mjs <slug>
```

- [ ] **Step 2: 验证所有目录均已创建**

```bash
ls -d courses/llamaindex-rag-engineering courses/rag-system-py courses/rag-system-java courses/agent-orchestration-java courses/ai-dev-toolchain courses/scenario-*-*/
```

- [ ] **Step 3: 提交**

```bash
git add courses/llamaindex-rag-engineering/ courses/rag-system-py/ courses/rag-system-java/ courses/agent-orchestration-java/ courses/ai-dev-toolchain/ courses/scenario-*-*/
git commit -m "feat: bootstrap 16 new course directories"
```

---

## Phase D: 更新文档

### Task D1: 更新 REFERENCE.md

**Files:** Modify `courses/REFERENCE.md`

- [ ] **Step 1: 更新 37 项能力→课程映射表**

更新受影响的 capability 映射行：
- C10: 新课程引用
- C11: 新课程引用
- C15, C16, C17: 分轨后的引用
- C18, C19: track 变更后的引用
- 新增：LlamaIndex 和 AI 工具链相关能力

- [ ] **Step 2: 更新 JD 高频技能速查表**

添加 LlamaIndex、AI 工具链等新技能行。

- [ ] **Step 3: 更新北极星能力→课程映射**

确认 NS1/NS2/NS3 的 primaryCourses 与新的课程 slug 一致。

- [ ] **Step 4: 更新三层毕业模型**

移除对 `llm-composite-integration-workshop` 的引用。

- [ ] **Step 5: 提交**

```bash
git add courses/REFERENCE.md
git commit -m "docs: update REFERENCE.md for 32-course restructure"
```

### Task D2: 更新 README.md

**Files:** Modify `README.md`

- [ ] **Step 1: 更新课程数量**

`24 门课 · 337 章` → `32 门课 · ~450 章`

- [ ] **Step 2: 更新拓扑图（Mermaid）**

替换学习路径的 Mermaid 图为新的双轨独立拓扑。

- [ ] **Step 3: 更新当前进度表**

反映新的完成状态。

- [ ] **Step 4: 更新学习路径描述**

添加两条独立路径的说明和选择指南。

- [ ] **Step 5: 提交**

```bash
git add README.md
git commit -m "docs: update README.md for 32-course dual-track structure"
```

### Task D3: 更新 courses/README.md

**Files:** Modify `courses/README.md`

- [ ] **Step 1: 更新维护约定**

反映新增的课程类型和 slug 命名规则。

- [ ] **Step 2: 提交**

```bash
git add courses/README.md
git commit -m "docs: update course maintenance conventions"
```

---

## Phase E: 生成课程内容（章节 HTML）

### 内容质量标准（来自参考课程）

每章必须包含：
- **5 个 section**（对应 outline 中的 sections 数组），每个 ~40-60 行
- **≥2 个 Mermaid 图表**（flowchart/sequenceDiagram/架构图）
- **≥3 个代码块**（带语言标签和复制按钮）
- **≥1 个 learn-scenario**（业务场景框，绑定 CorpAssist）
- **≥1 个 learn-compare**（对比表或 Good/Bad 对照）
- **≥1 个 learn-micro-check**（思考题）
- **≥1 个 outline-table** 或 learn-decision-table
- **章末 5 个 checklist + 3 个面试题**
- **术语标注**（`<span class="term" data-term-id="...">`）
- **学习提示**（`notice notice-why-learn`, `notice notice-outcome`）
- **总长**: 400-500 行 HTML

### Task E1-E32: 逐课生成章节内容

由于 32 门课 × 平均 12 章 = ~384 章，本章节以批处理方式组织。按优先级分为三批：

**第一批（P0）：核心基础课 + 新课程**（共 10 门）
**第二批（P1）：RAG 实现课 + 场景课**（共 16 门）
**第三批（P2）：其余课程**（共 6 门）

> 每门课的章节 HTML 生成作为独立 Task 分派给子 Agent。以下是第一批的详细 Task 定义模板：

### Task E-template: 生成 {course-slug} 全部章节 HTML

**Files:** Create `courses/{slug}/chapters/{chapter-id}.html` × N 章

对每章执行以下步骤：

- [ ] **Step 1: 从 outline-specs.json 读取该课程的 outline**

```bash
node -e "const spec=require('./courses/outline-specs.json'); const c=spec.courses['{slug}']; console.log(JSON.stringify(c.outline, null, 2));"
```

- [ ] **Step 2: 生成章节 intro（chapter-meta + notices）**

使用 `<div class="chapter-intro content-section">` 包含：
- `chapter-meta`: 阅读时间 + 阶段 + 能力目标
- `notice-why-learn`: 为什么学（2-3句，绑定 CorpAssist 场景）
- `notice-outcome`: 学完后能做什么（具体可验证的能力）
- `notice`: 本章核心要点（3-5 条）

- [ ] **Step 3: 为每个 section 生成 section-block（5个）**

每个 section 包含 `h3` + 多种呈现元素的组合：
- 正文段落（带术语标注）
- 至少 1 个 Mermaid 图
- 至少 1 个代码块
- 1 个表格或对比框
- 1 个 learn-scenario 或 learn-micro-check

**关键要求**：
- 所有概念用具体的技术细节说明，**禁止空洞描述**
- 禁止出现："可以通过配置实现" 而无具体配置示例
- 禁止出现："性能有所提升" 而无具体数据和条件
- 禁止出现："选择合适的方案" 而无选型矩阵和决策条件
- 每个 section 段落 ≥60 字

- [ ] **Step 4: 生成 chapter-conclusions（5条结论）**

```html
<div class="section-block chapter-conclusions-block notice">
  <h3>本章结论</h3>
  <ul class="chapter-conclusions-list">
    <li>具体结论1（含数据或条件）</li>
    ...
  </ul>
</div>
```

- [ ] **Step 5: 生成 learn-review-block**

含 3 个子块：
1. `learn-checklist`: 5 个可勾选的自检项
2. `learn-cheat-sheet`: 概念速查表（术语→一句话）
3. `learn-interview`: 3 个面试问题 + 折叠答案

- [ ] **Step 6: 生成 chapter-practice**

```html
<div class="chapter-practice">
  <h3>动手练习</h3>
  <div class="steps-operate">
    <h4>操作步骤</h4>
    <ol>
      <li>具体命令/操作</li>
      ...
    </ol>
  </div>
  <div class="steps-judgment-list">
    <h4>判断练习</h4>
    <details><summary>场景题</summary><p>答案</p></details>
    ...
  </div>
  <div class="demo-box">
    <h4>配套实验室</h4>
    <p>见 <code>demos/{chapter-id}-lab/</code></p>
    <ul class="demo-acceptance">
      <li>验收标准</li>
    </ul>
  </div>
</div>
```

- [ ] **Step 7: 生成 resources 和 cross-references**

```html
<div class="official-links content-section">
  <h3>官方参考</h3>
  <ul>
    <li><a href="具体URL">具体文档标题</a> — 说明为什么读</li>
  </ul>
</div>
<div class="resources content-section">
  <h3>延伸阅读</h3>
  <ul>
    <li>下一篇：<a href="#ch-{next-id}">标题</a></li>
  </ul>
</div>
```

- [ ] **Step 8: 验证章节**

检查清单：
- [ ] 450±50 行 HTML
- [ ] ≥2 Mermaid 图
- [ ] ≥3 代码块
- [ ] 5 个 checklist 项
- [ ] 3 个面试题
- [ ] 零空洞描述
- [ ] 所有技术名词有具体值/参数

- [ ] **Step 9: 为该课程的所有章重复 Step 2-8**

### 第一批生成计划（P0 优先）

| Task | 课程 slug | 章节数 | 分配给 |
|------|-----------|--------|--------|
| E1 | llm-application-fundamentals | 10 | subagent 1 |
| E2 | production-prompt-engineering | ~18 (+1 new) | subagent 2 |
| E3 | llamaindex-rag-engineering | 14 | subagent 3 |
| E4 | agent-orchestration-java | 13 | subagent 4 |
| E5 | ai-dev-toolchain | 8 | subagent 5 |
| E6 | multimodel-routing-multimodal | ~20 (+3 new) | subagent 6 |
| E7 | observability-reliability-ops | ~17 (+1 expanded) | subagent 7 |
| E8 | rag-system-py | 6 | subagent 8 |
| E9 | rag-system-java | 6 | subagent 9 |
| E10 | context-memory-engineering | ~18 (+1 new) | subagent 10 |

### 第二批生成计划（场景课）

| Task | 课程 slug | 章节数 | 分配给 |
|------|-----------|--------|--------|
| E11 | scenario-py-rag-kb | ~13 | subagent 11 |
| E12 | scenario-java-rag-kb | ~13 | subagent 12 |
| E13 | scenario-py-customer-service | ~13 | subagent 13 |
| E14 | scenario-java-customer-service | ~13 | subagent 14 |
| E15 | scenario-py-agent-automation | ~13 | subagent 15 |
| E16 | scenario-java-agent-automation | ~13 | subagent 16 |
| E17 | scenario-py-code-assistant | ~13 | subagent 17 |
| E18 | scenario-java-code-assistant | ~13 | subagent 18 |
| E19 | scenario-py-content-studio | ~13 | subagent 19 |
| E20 | scenario-java-content-studio | ~13 | subagent 20 |

### 第三批生成计划（现有课程更新）

| Task | 课程 slug | 变更 | 分配给 |
|------|-----------|------|--------|
| E21 | spring-ai-alibaba-engineering | 移除 Agent 章，精简为 9 章 | subagent 21 |
| E22 | spring-ai-engineering | 移除 Python 对照，纯 Java | subagent 22 |
| E23 | python-engineering-for-llm | 移除 Java 对照，纯 Python | subagent 23 |
| E24 | agent-orchestration-engineering | +P1 框架对比章 | subagent 24 |
| E25 | rag-system-engineering | 移除双栈实现章，+Grounding 章 | subagent 25 |
| E26 | domain-model-adaptation | track 改为 shared | subagent 26 |
| E27 | llm-serving-for-applications | track 改为 shared | subagent 27 |
| E28 | llm-evaluation-quality | 保持 | subagent 28 |
| E29 | security-compliance-engineering | 保持 | subagent 29 |
| E30 | knowledge-lifecycle-governance | 保持 | subagent 30 |
| E31 | retrieval-vector-platform | 保持 | subagent 31 |
| E32 | enterprise-llm-solution-delivery | 移除双栈集成章 | subagent 32 |

---

## Phase F: 生成 course.json（每课元数据）

### Task F-template: 为 {course-slug} 生成 course.json

**Files:** Modify `courses/{slug}/course.json`

对每门需要更新的课程：

- [ ] **Step 1: 从 outline-specs.json 提取元数据**

```bash
node -e "const spec=require('./courses/outline-specs.json'); const c=spec.courses['{slug}']; const out={meta:{title:c.title,slug:'{slug}',domain:c.title,themePreset:'{slug}',version:'2026-05-31',domainType:c.domainType||'F',selectionPromptTemplate:'',hljsLanguages:['python','java','yaml','bash','json'],learningNotes:{assumptions:['3-5年应用开发经验'],phaseGoals:c.phaseGoals||{}}},outline:c.outline,chapters:{},terms:{},quizzes:{}}; c.outline.forEach(p=>p.chapters.forEach(ch=>{out.chapters[ch.id]={title:ch.title,summary:ch.sections[0]}})); console.log(JSON.stringify(out,null,2));"
```

- [ ] **Step 2: 向 course.json 写入初始数据**

将 Step 1 的 JSON 输出写入 `courses/{slug}/course.json`。

- [ ] **Step 3: 添加术语定义**

为该课程涉及的技术术语（如 RAG、Embedding、LoRA、Agent、MCP 等）添加 `terms` 条目，每个包含 `label` 和业务场景相关的 `prompt`。

```json
"terms": {
  "token": {"label": "Token", "prompt": "在 CorpAssist 的客服场景中，Token 是如何影响回答质量的？如何平衡上下文长度和成本？"},
  ...
}
```

- [ ] **Step 4: 添加测验定义**

为每章创建 1 个 quiz（quizId = `{chapterId}-quiz`），每个 quiz 含 5-6 题。

```json
"quizzes": {
  "basics-01-quiz": {
    "chapterId": "basics-01",
    "title": "章节测验",
    "questions": [
      {"type": "single", "question": "...", "options": ["A", "B", "C", "D"], "answer": 0, "hint": "..."},
      {"type": "multi", "question": "...", "options": ["A", "B", "C", "D"], "answer": [0, 2], "hint": "..."},
      {"type": "fill", "question": "...", "answer": "具体答案", "hint": "..."}
    ]
  }
}
```

- [ ] **Step 5: 更新 chapters 映射**

确保 `course.json` 的 `chapters` 块中每章都有 `title` 和 `summary`。

---

## Phase G: 组装课程 index.html

### Task G-template: 组装 {course-slug} 的 index.html

**Files:** Create/Modify `courses/{slug}/index.html`

- [ ] **Step 1: 使用 assemble-index.mjs 脚本组装**

```bash
node "C:\Users\sunshine\.claude\skills\programming-html-tutorial\scripts\assemble-index.mjs" --dir "courses/{slug}"
```

- [ ] **Step 2: 验证 index.html 可正常打开**

在浏览器中打开 `courses/{slug}/index.html`：
- 所有章节可正常切换
- Mermaid 图表正常渲染
- 代码高亮正常
- 测验功能正常
- 进度保存正常

- [ ] **Step 3: 提交**

```bash
git add courses/{slug}/index.html
git commit -m "feat: assemble {slug} course page"
```

---

## Phase H: 更新门户 index.html

### Task H1: 更新课程中心首页

**Files:** Modify `courses/index.html`

- [ ] **Step 1: 确认 courses.json 已生成且包含 32 门课**

```bash
node -e "const c = require('./courses/courses.json'); console.log('Total courses:', c.courses.length);"
```

- [ ] **Step 2: 更新门户页面中的文字描述**

将 "24 门课" 改为 "32 门课"。

- [ ] **Step 3: 验证门户页面渲染**

在浏览器中打开 `courses/index.html`：
- 所有 32 门课程卡片正常显示
- 学习路径图正常渲染
- 轨道筛选功能正常

- [ ] **Step 4: 提交**

```bash
git add courses/index.html
git commit -m "feat: update portal for 32-course catalog"
```

---

## 实施优先级总结

### 关键路径

```
Phase A (outline-specs.json) → Phase B (sync/courses.json) → Phase C (bootstrap) → Phase D (docs) → Phase E (chapters HTML) → Phase F (course.json) → Phase G (assemble) → Phase H (portal)
```

### 并行化策略

- **Phase A**: 单人完成（outline-specs.json 是单文件，需顺序修改避免冲突）
- **Phase B**: 依赖 A 完成
- **Phase C**: 依赖 B 完成，可按课程并行
- **Phase D**: 可与 C 并行
- **Phase E**: 32 门课可全部并行分派给子 Agent
- **Phase F**: 可与 E 并行，但单门课需先完成 E
- **Phase G**: 依赖 F（单门课），32 门课可并行
- **Phase H**: 依赖 B（courses.json）

### 时间估算

| Phase | 并行度 | 单任务耗时 | 总耗时 |
|-------|--------|-----------|--------|
| A | 1 | 2-3h | 2-3h |
| B | 1 | 0.5h | 0.5h |
| C | 16 | 1min | 1min |
| D | 2 | 0.5h | 0.5h |
| E | 32 | 1-2h/课 | 1-2h (并行) |
| F | 32 | 0.5h/课 | 0.5h (并行) |
| G | 32 | 1min/课 | 1min (并行) |
| H | 1 | 0.5h | 0.5h |

**总墙钟时间**: ~5-7 小时（并行执行）
