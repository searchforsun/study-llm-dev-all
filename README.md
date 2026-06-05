# 大模型应用开发 · 交互式课程

**33 门课 · 双轨（Python + Spring AI）· 一条 CorpAssist 案例线** — 给有 Java 分布式经验的工程师，用可离线打开的 HTML 教程站，从 LLM API 走到 RAG、Agent、企业场景落地。

> 应用工程视角：编排、数据、评测、合规、可观测。**不讲**预训练、CUDA、千卡训练。

---

## 立即开始

```powershell
# 仓库根目录
node scripts/serve-courses.mjs
```

浏览器打开 **http://localhost:3000/** → 课程中心 → 选课开学。

| 方式 | 进度保存到 `courses/<slug>/progress.local.json` |
|------|--------------------------------------------------|
| `node scripts/serve-courses.mjs` | ✅ 推荐 |
| `cd courses` + `npx serve .` | ❌ 仅浏览器缓存 |

端口被占用：`$env:PORT=3010; node scripts/serve-courses.mjs`

**注意：** 须在仓库根用 `serve-courses` 托管整个 `courses/`（不要只 serve 单课子目录）。IDE Live Preview 无法写入进度文件。细节见 [courses/README.md](courses/README.md)。

---

## 这门课解决什么问题

| 痛点 | 本仓库的做法 |
|------|----------------|
| 资料散、缺少项目叙事 | 全系列围绕企业助手 **CorpAssist**，从认知到交付一条线 |
| 只会调 API，不会工程化 | 测验、过关清单、`demos/` 实验、面试向章节 |
| Python 与 Java 各学各的 | **双轨并行**：Python 验证 RAG/评测，Spring AI 做企业接入 |
| 面试场景题没结构 | **TOP5 场景课**（S1～S5，Py/Java 各 5 门）对齐 [REFERENCE.md](courses/REFERENCE.md) |

**站内能力：** 分阶段大纲 · 章节测验 · 学习进度 · 划词术语提示 · Mermaid 图 · 代码复制 · 明暗主题。

---

## 建议怎么学

```text
① 大模型应用基础（共用轨，已发布 15 章）  →  ② Python 轨 ∥ Java 轨  →  ③ RAG / Agent / 生产化
                                                      →  ④ 场景课：必修 S1 + 选修 ≥1  →  ⑤ 毕业交付
```

- **入口课：** [llm-application-fundamentals](courses/llm-application-fundamentals/)
- **毕业规则与 40 项能力：** [courses/REFERENCE.md](courses/REFERENCE.md)
- **完整 8 阶段与 33 课清单：** [courses/README.md](courses/README.md) · 大纲真源 [outline-specs.json](courses/outline-specs.json)

<details>
<summary>8 阶段路线图（展开）</summary>

```mermaid
flowchart LR
  A[① 认知基座] --> B[② 工程基座]
  B --> C[③ 核心能力]
  C --> D[④ RAG]
  D --> E[⑤ 评测与 Agent]
  E --> F[⑥ 生产化]
  F --> G[⑦ 场景落地]
  G --> H[⑧ 毕业交付]
```

共用轨打基础后，Python / Java **二选一或并行**，在阶段七汇入场景课与交付课。

</details>

---

## 发布状态

| | |
|---|---|
| **可完整学习** | [llm-application-fundamentals](courses/llm-application-fundamentals/)（15/15 章） |
| **门户已上架、章节持续更新** | 其余 32 门（RAG 双轨、Agent、10 门场景课等） |

---

## 适合谁

- 3～5 年后端，有 **Spring Boot / 微服务** 经验，转向 **LLM 应用开发**
- 目标岗位涉及 **RAG、Agent、智能客服、知识库、Spring AI**
- 希望用 **统一项目（CorpAssist）** 准备系统设计面试，而不是零散博文

---

## 仓库一览

```text
scripts/serve-courses.mjs    # 本地学习入口（必读）
courses/index.html           # 课程中心
courses/<slug>/              # 单课：chapters/ · index.html · progress.local.json
courses/outline-specs.json  # 大纲规划真源
```

维护者：改大纲后 `node scripts/sync.mjs`；单课正文见 [courses/README.md](courses/README.md) 与根目录 [CLAUDE.md](CLAUDE.md)。

---

**打开终端，执行 `node scripts/serve-courses.mjs`，从 [大模型应用基础](http://localhost:3000/llm-application-fundamentals/) 开始。**
