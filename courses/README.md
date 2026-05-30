# 大模型应用开发 · 课程中心

Python × Spring AI **双轨并行**，33 门课（12 门共享 + 6 门 Python 轨 + 5 门 Java 轨 + 10 门场景落地课（5 场景 × 2 轨））。面向 3–5 年工程经验（建议已有 Java 分布式基础）。

## 文件（约定）

| 文件 | 用途 |
|------|------|
| `courses.json` | **门户目录**（由脚本生成；页面 `fetch` 加载，符合 HTML 教程站规范） |
| `outline-specs.json` | **规划真源**：章节目录、`interviewScenarios`、CorpAssist、`globalRules` |
| `REFERENCE.md` | 40 项能力、JD、面试 TOP5 速查 |
| `index.html` | 课程选择页 |
| `<slug>/` | 单门课（`course.json`、`chapters/*.html`，工作流 A/B 生成） |

## 启动

在 **`courses/` 根目录**启动（勿只 serve 子目录，否则 `fetch('courses.json')` 失败）：

```powershell
Set-Location d:\project\study-profile-0\courses
npx --yes serve .
```

## 学习路径

真源：`outline-specs.json` → `learningPath`（`schemaVersion: 2`）。`node scripts/sync.mjs` 同步到 `courses.json`。

**8 阶段双轨独立路径**：Python 轨和 Java 轨从阶段二开始分叉，各自独立完成工程基座 → RAG → Agent，场景课提供双版本。

| 阶段 | 共享内容 | Python 轨 | Java 轨 |
|------|----------|-----------|---------|
| 一 · 认知基座 | `llm-application-fundamentals` | — | — |
| 二 · 工程基座 | — | `python-engineering-for-llm`, `ai-dev-toolchain` | `spring-ai-engineering`, `spring-ai-alibaba-engineering` |
| 三 · 核心能力 | `production-prompt-engineering`, `security-compliance-engineering`, `context-memory-engineering` | — | — |
| 四 · RAG 工程 | `rag-system-engineering`, `knowledge-lifecycle-governance` | `rag-system-py`, `llamaindex-rag-engineering`, `retrieval-vector-platform` | `rag-system-java`, `llm-application-backend` |
| 五 · 评测与 Agent | `llm-evaluation-quality`, `multimodel-routing-multimodal` | `agent-orchestration-engineering` | `agent-orchestration-java` |
| 六 · 生产化 | `domain-model-adaptation`, `llm-serving-for-applications`, `observability-reliability-ops` | — | — |
| 七 · 场景落地 | — | 必修 `scenario-py-rag-kb` + 选修 ≥1 | 必修 `scenario-java-rag-kb` + 选修 ≥1 |
| 八 · 毕业交付 | `enterprise-llm-solution-delivery` | — | — |

**毕业规则**：完成共享全部课程 + 至少一轨的全部课程 + 必修场景 + 选修 ≥1 场景；详见 `REFERENCE.md` 与 `courses.json` → `learningPath.completionRule`。

**北极星能力**：NS1 飞轮 / NS2 确定性桥梁 / NS3 成本延迟 — 见 `REFERENCE.md`。

## 维护

改 `outline-specs.json` 后：

```powershell
node scripts/sync.mjs
```

单课生成流水线（bootstrap → 章节/demo → merge → enrich → assemble）见各课 `README.md`；常驻脚本：

| 脚本 | 用途 |
|------|------|
| `sync.mjs` | `outline-specs.json` → `courses.json` |
| `bootstrap-course-from-spec.mjs` | 从 spec 初始化单课目录 |
| `merge-course-manifests.mjs` | 合并 manifest-*.json → course.json |
| `enrich-term-prompts.mjs` | 补全术语 tip / prompt |

## 生成单课（programming-html-tutorial）

**工作流 A**：从 `outline-specs.json` → `courses.<slug>` 复制 `outline` 到 `<slug>/course.json`；`meta` 含 `slug`、`outlineSpecVersion`；案例统一 **CorpAssist**。

**工作流 B**：写 `chapters/<id>.html` → `assemble` 生成 `index.html`（勿手改正文壳）。

章级可选字段：`scenarioId`（S1–S5）、`interviewFocus`。双栈按 `dualStackPolicy`（`shared` / `python` / `java` / `bridge`）。禁止覆盖 `globalRules.mustNotCover`（预训练算法、CUDA 内核、千卡训练等）。

## Slug 命名约定

| 前缀 | 用途 | 示例 |
|------|------|------|
| `scenario-py-*` | Python 轨场景落地课 | `scenario-py-rag-kb`, `scenario-py-agent-automation` |
| `scenario-java-*` | Java 轨场景落地课 | `scenario-java-rag-kb`, `scenario-java-agent-automation` |
| `rag-system-py` | Python 栈 RAG 实践课 | `rag-system-py` |
| `rag-system-java` | Java 栈 RAG 实践课 | `rag-system-java` |
| `*-java` | Java 轨特有课程 | `agent-orchestration-java` |

**注意**：`llm-composite-integration-workshop` 已废弃，其内容分散至各轨场景课中。
