# 课程质量全流程

校验 → 评审 → 修复（skill v3 单一质量策略）。

## 前置

`programming-html-tutorial/SKILL.md`、`reference/workflows.md` §Gate 总表；`<skill-root>` 见 `/course-gate`。

## 步骤

1. `/course-gate` — `course-gate.mjs --gate-report`（须无 blocking error）
2. `/course-review` — Gate 3 + demo 执行（读 `gate-report.json`，不重复 L1–L2）
3. `/course-fix` — 改稿后回归 `course-gate.mjs --gate-report`（`--skip-fix` 可跳过）
4. 终检：`gate-report.json` → `passed: true`；Gate 3 与 lab 执行通过

## 参数

- **必填**：`slug`
- **可选**：`--skip-fix`；`--chapter <id>`；`--tasks …`

## 产出（`<workspace>/.course-quality/<slug>/`）

| 文件 | 阶段 |
|------|------|
| `gate-report.json` | `/course-gate` |
| `review-todos.md` | `/course-review` |
| `fix-log.md` | `/course-fix`（可选） |
| `pipeline-report.md` | 全流程（可选） |
