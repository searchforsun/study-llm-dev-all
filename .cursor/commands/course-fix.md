# 课程修复

按 `gate-report.json` / review 待办改稿，回归 Gate。

## 前置

1. `programming-html-tutorial/SKILL.md`
2. `<skill-root>` 见 `/course-gate`
3. `reference/workflow-b-checklist.md`、`reference/quality-policy.md`
4. 输入：`.course-quality/<slug>/gate-report.json`（优先）或 `review-todos.md` 或用户指定范围

## 执行

1. 工作流 B-修订：改 `chapters/`、`quiz.partial.html`、`course.json`、`demos/`（禁止手改 `index.html` 正文）
2. demo 变更：执行 README 验收命令
3. 回归：

```bash
node <skill-root>/scripts/course-gate.mjs --dir courses/<slug> --gate-report
```

4. 确认 `gate-report.json`：`passed: true` 且 `summary.errors === 0`
5. 正文大改补 Gate 3；demo 变更补 lab 执行验收

## 产出

`.course-quality/<slug>/fix-log.md`：已完成项、最新 gate 状态、变更路径。

## 交付

blocking 清除后使用 `delivery-review.md` §通过话术；仍有 Gate 3 待办则 `/course-review`。
