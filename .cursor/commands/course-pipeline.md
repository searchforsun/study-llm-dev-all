# 课程质量全流程

串联 skill 定义的校验 → 评审 → 修复。

## 前置

读取 `programming-html-tutorial/SKILL.md` 与 `reference/workflows.md` §Gate 总表；`<skill-root>` 见 `/course-gate`。

## 步骤

1. `/course-gate` — Gate 1–2 + Gate 1 清单
2. `/course-review` — Gate 3 + demo 验收（四 Agent）；产出待办清单
3. `/course-fix` — 按待办改稿并回归 Gate（用户 `--skip-fix` 时跳过）
4. 终检：Gate 1–3 与 lab 验收均通过，或列出剩余项

## 参数

- **必填**：`slug`
- **可选**：`--skip-fix`；`--chapter <id>`；`--tasks …`（传给 fix 阶段）

## 产出

待办与修复记录放在 `agent-workspace/course-quality/<slug>/`（可选，供续跑）。
