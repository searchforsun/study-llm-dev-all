# 大模型应用开发 · 课程中心

Python × Spring AI **双轨并行**，24 门课（含 5 门场景企业落地课）。面向 3–5 年工程经验（建议已有 Java 分布式基础）。

## 文件（约定）

| 文件 | 用途 |
|------|------|
| `courses.json` | **门户目录**（由脚本生成；页面 `fetch` 加载，符合 HTML 教程站规范） |
| `outline-specs.json` | **规划真源**：章节目录、`interviewScenarios`、CorpAssist、`globalRules` |
| `REFERENCE.md` | 37 项能力、JD、面试 TOP5 速查 |
| `index.html` | 课程选择页 |
| `<slug>/` | 单门课（`course.json`、`chapters/*.html`，工作流 A/B 生成） |

## 启动

在 **`courses/` 根目录**启动（勿只 serve 子目录，否则 `fetch('courses.json')` 失败）：

```powershell
Set-Location d:\project\study-profile-0\courses
npx --yes serve .
```

## 学习路径

| 阶段 | 内容 |
|------|------|
| 一 | `llm-application-fundamentals` → `python-engineering-for-llm` ‖ `spring-ai-engineering` |
| 二 | Prompt → 上下文记忆 → 评测 → RAG → KB 治理；并行：检索 ‖ SAA |
| 三 | Agent；多模态；汇合：集成实战 → 应用后端 |
| 三B | 五大场景落地 `scenario-enterprise-*`（S1–S5） |
| 四 | 微调 → 推理部署 → 可观测 ‖ 安全合规 |
| 五 | `enterprise-llm-solution-delivery` |

## 维护

改 `outline-specs.json` 后：

```powershell
node scripts/sync.mjs
```

## 生成单课（programming-html-tutorial）

**工作流 A**：从 `outline-specs.json` → `courses.<slug>` 复制 `outline` 到 `<slug>/course.json`；`meta` 含 `slug`、`outlineSpecVersion`；案例统一 **CorpAssist**。

**工作流 B**：写 `chapters/<id>.html` → `assemble` 生成 `index.html`（勿手改正文壳）。

章级可选字段：`scenarioId`（S1–S5）、`interviewFocus`。双栈按 `dualStackPolicy`（`shared` / `python` / `java` / `bridge`）。禁止覆盖 `globalRules.mustNotCover`（预训练算法、CUDA 内核、千卡训练等）。
