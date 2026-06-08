# scripts 索引

Node.js 18+。`<skill-root>` = 本技能包根目录。

> **边界**：本目录脚本须为**任意教程工作区**可复用能力。仅服务当前仓库的脚本 → 放在 `<workspace>/scripts/`，见 [reference/skill-project-boundary.md](../reference/skill-project-boundary.md)。

## 日常（Agent / 维护者）

| 脚本 | 用途 |
|------|------|
| `assemble-index.mjs --dir <courses>/<slug>` | 生成单课 `index.html`（含 build-style-sheets、跨课 accent CSS） |
| `validate-tutorial.mjs --dir <courses>/<slug>` | Gate 1 校验（含标准 `.code-block` DOM，见 `lib/code-block-quality.mjs`） |
| `course-gate.mjs --dir <courses>/<slug> [--strict] [--gate-report]` | Gate 1→2→2b（**唯一推荐入口**）；报告 `.course-quality/<slug>/gate-report.json` |
| `review-chapter.mjs` | Gate 2（仅单章排障）；`--json-summary` |
| `review-demo.mjs` | Gate 2b（仅排障）；`--json-summary` |
| `sync-portal-shell.mjs` | 更新 `templates/portal.index.html` 的 shared/surfaces/风格包 |
| `sync-courses-index.mjs <workspace>/courses/index.html` | portal 模板 → 工作区课程中心（目录仅维护 `courses.json`） |
| `enrich-term-prompts.mjs --dir <courses>/<slug> [--force]` | 补齐 `course.json` 术语 `prompt`（含 Gate 2「误区」片段） |
| `build-style-sheets.mjs` | presets + pages → `templates/styles/*.css` + `shell.style-sheets.html` |
| `lib/ui-styles.mjs` | 从 `defaults.json` 生成风格菜单 / `UI_STYLE_IDS`（assemble & portal sync 共用） |
| `lib/course-ref-accent.mjs` | 从 `courses.json` + 各课 `theme.css` 生成跨课链接 accent（assemble 调用） |
| `lib/progress-file.mjs` | 创建/写入 `progress.local.json`（assemble / bootstrap 调用） |
| `serve-tutorial-root.mjs [--root example]` | 本地托管教程根目录 + 进度 PUT API（样例 `example/` 默认） |

**项目级脚本（不在 skill 包内）**：如 `<workspace>/scripts/sync.mjs`（outline → catalog）、`bootstrap-course-from-spec.mjs`、`serve-courses.mjs` — 可 import 上表 `lib/`，编排逻辑留在项目。

**改壳层 CSS 后推荐顺序**：bump `shellVersion` → `build-style-sheets`（assemble 内含）→ `sync-portal-shell` → `sync-courses-index` → 对各 slug `assemble-index`（可循环 `courses/*/course.json` 批量执行）。

**增删 UI 风格 id**：只改 `config/defaults.json` → `uiStyles` 与风格 CSS 源文件；菜单与 `UI_STYLE_IDS` 由 assemble / sync 自动生成。详见 [reference/shell-ui-styles.md §风格注册点](../reference/shell-ui-styles.md#风格注册点增删风格时)。

## 逆向 / 修复

| 脚本 | 用途 |
|------|------|
| `extract-from-index.mjs` | 从 `index.html` 拆回 partial |
| `extract-chapter-from-index.mjs` | 单章从 index 恢复 |
| `fix-invalid-html-tags.mjs` | 修复非法标签 |
| `bootstrap-templates.mjs` | 初始化模板文件 |
