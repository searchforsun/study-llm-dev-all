# 技能包 vs 项目目录边界

**Agent 修改 `<skill-root>` 内任何文件之前必读。** 技能包面向**任意工作区**的静态 HTML 教程站；不得嵌入单一课程库、业务案例或仓库专有流程。

---

## 决策规则（硬约束）

在改 `templates/`、`scripts/`、`config/`、`reference/` 之前，先问：

> **换一门技术、换一个 `<workspace>`，这个改动还有意义吗？**

| 结论 | 落点 |
|------|------|
| **是** → 做成通用能力 | 改 `<skill-root>/`（必要时同步 `example/` 验证） |
| **否** → 不能通用化 | **只**改 `<workspace>/` 项目目录，**禁止**写入 skill |

**默认**：Agent **勿改** skill 包；除非用户明确要求维护技能包，或改动经上表判定为通用且与现有壳层/工作流一致。

---

## 技能包内（通用）

| 类别 | 路径 | 说明 |
|------|------|------|
| 壳层与组装 | `templates/`、`scripts/assemble-index.mjs` 等 | 任意 slug、任意 `courses/<slug>/` |
| 校验与 Gate | `course-gate.mjs`、`config/chapter-quality.json`（v3 单一策略） | 与具体课程大纲无关的量化/结构规则 |
| 写作规范 | `reference/chapter-*.md`、`chapter-practice-dom.md`、`quiz-template.md` 等 | DOM、测验、术语；Gate 总表见 `delivery-review.md` |
| 默认配置 | `config/defaults.json` | 中性键名（如 `html-tutorial_theme`）、阶段 id、CDN 版本 |
| 只读样例 | `example/` | 演示密度与结构；**非**某消费方项目的真源 |

通用脚本须：**参数化**（`--dir`、读 `course.json`）、**无硬编码 slug/案例名/仓库路径**、**文档示例用虚构课名**（见 [chapter-authoring.md](chapter-authoring.md) §跨课程引用）。

---

## 项目目录内（专有）

写入 `<workspace>/`，**不得**塞进 skill：

| 类别 | 典型路径 | 示例 |
|------|----------|------|
| 课程正文与元数据 | `courses/<slug>/chapters/`、`course.json` | 各章 HTML、统一业务案例正文 |
| 多课目录与路线图 | `courses/courses.json`、项目级 outline 主文件 | 多课 catalog、学习路径 |
| 项目级脚本 | `<workspace>/scripts/*.mjs` | 从 master spec 同步 catalog、批量 bootstrap 等 |
| 项目 Cursor 命令 | `.cursor/commands/course-*.md` | 只调用 `course-gate.mjs`，不重复 rubric |
| 质量报告目录（可选） | `<workspace>/.course-quality/` 或项目自定路径 | 通过 `--gate-report <path>` 传入，skill 默认 `.course-quality` |
| 项目规则 | `CLAUDE.md`、`AGENTS.md` | 仓库级 curriculum、毕业规则、禁讲清单 |

消费方可在 `scripts/` **import** skill 的 `lib/*.mjs`（如 `course-ref-accent.mjs`），但**业务编排与批量修复逻辑留在项目**。

---

## 改 skill 时的自检清单

1. 是否引入特定 slug、课程标题、业务案例名（如 AcmeAssist）为**默认值**？→ 移到项目或仅保留在 `example/` 样例正文。
2. 是否硬编码 `d:/project/...` 或某仓库名？→ 改为 `<workspace>` / `--dir` 占位。
3. 是否依赖项目级 master schema（curriculum spec、track 策略等）？→ 留在 `<workspace>/scripts/`。
4. 新脚本是否只服务当前仓库的一次性批处理？→ 放 `<workspace>/scripts/`，用完可删或长期保留在项目；**勿**提交进 skill。
5. 改 `config/defaults.json` 的键名/壳版本后，是否需跑 `build-style-sheets` → `sync-portal-shell` → 各课 `assemble`？→ 见 [shell-ui-styles.md](shell-ui-styles.md)。

---

## 反例（禁止写入 skill）

- 从项目级 `curriculum-spec.json` 生成 `courses.json` 的编排脚本
- 默认跨课链接指向消费方真实 slug（reference 示例应使用虚构课名，如 `intro-to-docker`）
- localStorage 键名 `my-workspace_theme` 等消费方项目前缀（skill 默认 `html-tutorial_theme`）
- 仅某仓库使用的 slug 通配规则（如 `track-a-*`；由项目脚本处理即可）
- 一次性 `_fix-foo.mjs` 排障脚本

---

## 相关文档

- 课程写入路径：[SKILL.md](../SKILL.md) §课程路径
- 脚本索引：[scripts/README.md](../scripts/README.md)
- 壳层维护：[shell-maintenance.md](shell-maintenance.md)
