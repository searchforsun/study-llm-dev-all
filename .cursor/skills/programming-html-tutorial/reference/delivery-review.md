# 交付前 Review（Agent 必做）

与用户「大纲审阅闸门」不同：这是 **Agent 在告知用户「已生成」之前** 的强制自检。

**Gate 总表、命令、返工规则的唯一真源在本文**；工作流步骤见 [workflows.md](workflows.md)，质量策略见 [quality-policy.md](quality-policy.md)。

## `--dir` 路径

`--dir` = [SKILL.md](../SKILL.md) §课程路径 中的 `courses/<slug>/`。

## Gate 总表（工作流 × 闸门）

| 工作流 | 时机 | Gate 1 | Gate 2 | Gate 2b | Gate 3 |
|--------|------|:------:|:------:|:-------:|:------:|
| **A** | 首次 welcome + assemble | ✓ | — | — | — |
| **A-修订** | 只改 `outline` 后 assemble | ✓ | — | — | — |
| **B** | 每章 HTML + quiz + assemble | ✓ | ✓ | ✓ | ✓ |
| **B-修订** | 改目标章 / quiz / demo | ✓ | ✓ | demo 变更时 ✓ | 正文大改时 ✓ |
| **C** | 仅改测验 | ✓ | ✓ | — | 正文未动可跳过 |

| 闸门 | 工具 / 动作 | 覆盖 |
|------|-------------|------|
| **Gate 1** | `course-gate` → `assemble-index.mjs` + `validate-tutorial.mjs` | 结构、编码、必填块、标准代码块 DOM（见下表） |
| **Gate 2** | `course-gate` → `review-chapter.mjs` | `chapter-quality.json` 量化 + 动手 DOM（见 [chapter-practice-dom.md](chapter-practice-dom.md)） |
| **Gate 2b** | `course-gate` → `review-demo.mjs` | lab README、验收命令、可运行工程结构 |
| **Gate 3** | `/course-review` + [chapter-quality-rubric.md](chapter-quality-rubric.md) | 深度/广度/准确性；**可运行 demo 执行**验收 |

返工后重跑 Gate 1～2；同一章建议最多 **2 轮**。

## Gate 1～2b（命令入口）

```bash
node <skill-root>/scripts/course-gate.mjs --dir <workspace>/courses/<slug>
node <skill-root>/scripts/course-gate.mjs --dir <workspace>/courses/<slug> --strict --gate-report
```

内部顺序：assemble → validate → review-chapter → review-demo。任一步失败即停。

- `--strict`：全部 warning 视同 error（见 [quality-policy.md](quality-policy.md)）
- `--gate-report`：写入 `<workspace>/.course-quality/<slug>/gate-report.json`（路径见 `chapter-quality.json` → `gateReport`）

**勿**在交付流程中混用 assemble / validate / review-* 分步命令，除非单章调试。

### 单章调试（仅排障）

```bash
node <skill-root>/scripts/review-chapter.mjs --dir <workspace>/courses/<slug> --chapter <chapterId>
```

## Gate 1 清单（validate 之外）

| # | 检查项 |
|---|--------|
| 1 | `welcome.partial.html` 含 `#outline-summary-body` |
| 2 | 欢迎片段勿用 `id="welcome"` |
| 3 | 无非法 HTML 标签 |
| 3b | 标准 `.code-block`：含 `.code-toolbar`（`lang-tag` + `btn-copy`）与 `language-*`（`validate-tutorial.mjs` / `review-chapter.mjs`） |
| 4 | 术语：见 [terms-policy.md](terms-policy.md) |
| 5 | enrichment 脚本已内联（`initChapterEnrichment`） |
| 6 | `outline` 与侧栏一致；`themePreset` 与 `theme.css` 一致 |
| 7 | demo 结构以 Gate 2b 为准 |
| 8 | UTF-8 / 乱码：`validate-tutorial.mjs` |
| 9 | 壳交互冒烟（有浏览器时） |

进度导出/导入见 [workflows.md](workflows.md) 附录（非 Gate）。

## Gate 3 前置

`/course-review` 须在 `course-gate` **无 blocking error** 后执行；读取 `gate-report.json`，不重复 L1–L2 已报项。

## 失败 / 通过话术

失败：说明未通过闸门与项；**不得**仅说「已生成」。

通过：

```text
「{章标题}」已生成，并通过 course-gate（L1–L2b）。
- 含章节测验（单选/多选/填空）
- 可选改进：{suggestions}
可回复：修订 / 继续下一章（建议：{下一章 title}，`#ch-{id}`）
```
