# 工作流（Agent 逐步清单）

课程路径与目录结构：[SKILL.md](../SKILL.md) §课程路径、§目录结构（**不在本文重复**）。

Gate **总表、命令、返工规则**：[delivery-review.md](delivery-review.md)（**唯一真源**）。**勿通读**整个 `reference/` 目录。

## 产品约定

| 项 | 约定 |
|----|------|
| 章节测验 | **默认每章必带**（工作流 B 与正文同次写入 `quiz.partial.html` + `course.json.quizzes`）。仅当用户**明确**不要测验时可省略。 |
| 概念章篇幅 | **不设最少字数**；设 **正文 `section-block` 物理行数**下限（见 `lines.countScope` / `lines.*`）。是否讲透由 Gate 3 判断。 |

## Gate

各工作流挂载哪道闸门、命令与返工上限 → **[delivery-review.md](delivery-review.md) §Gate 总表**（不在本文重复）。

---

## 工作流 A：初始化大纲

1. 在 `<workspace>/courses/<slug>/` 创建课程目录（结构见 [SKILL.md](../SKILL.md) §目录结构）。
2. 若 `<workspace>/courses/index.html` 不存在，从 `templates/portal.index.html`、`courses-catalog.template.json`、`courses-README.template.md` 初始化课程中心（见 [portal-maintenance.md](portal-maintenance.md)）。
3. 确认领域、是否含 demo；**测验默认开启**（用户明确不要时可关）。
4. **WebSearch** → `course.json` 的 `meta`（版本、官方文档）。
5. [theme-colors.md](theme-colors.md) → `theme.css`。
6. 大纲：必读 [phase-design-prompts.md](phase-design-prompts.md)；章数见 `config/defaults.json`。
7. 初始化 `course.json`（`terms` 见 [terms-policy.md](terms-policy.md) 工作流表 **A**；可选 `meta.selectionPromptTemplate` / `selectionPromptEnabled`，见 [course-data-schema.md](course-data-schema.md)）、`theme.css`、`welcome.partial.html`（含 `#outline-summary-body`）、`README.md`（[tutorial-readme-template.md](tutorial-readme-template.md)）。
8. assemble → validate（Gate 1）。
9. 在 `courses/courses.json` 注册该课（[courses-catalog-schema.md](courses-catalog-schema.md)）。
10. **暂停**，用户确认大纲后再生成章节。

**A-修订**：只改 `course.json` → `outline` 后 assemble；保留已有 `chapters/*.html`。

---

## 工作流 B：生成单章（含测验）

按 [workflow-b-checklist.md](workflow-b-checklist.md) 逐步执行（每次一章）。

**B-修订**：改目标章 / quiz / demo 时同样走 checklist；正文大改时 Gate 3 不可跳过（见 [delivery-review.md](delivery-review.md) §Gate 总表）。

---

## 工作流 C：仅改测验

正文不动，只改 `quiz.partial.html` 与 `course.json.quizzes`。参考 [quiz-template.md](quiz-template.md)。完成后 Gate 见 [delivery-review.md](delivery-review.md)（工作流 C）。

---

## 附录：进度导出 / 导入 / 课程目录 `progress.local.json`（非生产工作流）

进度由 `templates/shell.app.js` 维护；课程目录内 **`progress.local.json`** 由 bootstrap / assemble **自动创建**（已存在不覆盖）。

| 机制 | 说明 |
|------|------|
| `localStorage` | 页内实时状态；与文件通过 `exportedAt` 协调 |
| `courses/<slug>/progress.local.json` | 真源备份；**打开页时**若文件较新则载入；学习过程 **防抖 + 定时 PUT** 写回 |
| 开发服务 | 消费方仓库 `node scripts/serve-courses.mjs`（勿仅用 `npx serve`，否则无法 PUT） |
| 顶栏「导出 / 导入进度」 | 手动下载 / 选文件；**导入会覆盖** localStorage 并 **立即写回** `progress.local.json`（需 `serve-courses`） |

`progress.local.json` 字段：`courseId`、`exportedAt`、`completedChapters`、`visitedChapters`、`storage`、`theme`、`uiStyle`。导入不校验 `courseId`，勿跨课混用。

**已有课补齐进度文件**：对该课执行 `assemble-index`（或项目 `bootstrap-course-from-spec.mjs`），会自动 `ensure` `progress.local.json`。

**改间隔**：`config/defaults.json` → `progressAutoSync` 或 `course.json` → `meta.progressAutoSync`；bump `shellVersion` 后 `assemble-index`。
