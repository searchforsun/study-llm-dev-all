# 课程修复

按评审待办或用户指定范围改稿，并按 skill 回归 Gate。

## 前置

1. 读取 skill：`programming-html-tutorial/SKILL.md`
2. `<skill-root>` 解析顺序见 `/course-gate`
3. 打开 `reference/workflow-b-checklist.md`、`reference/delivery-review.md`；阈值查 `config/chapter-quality.json`（command 不写死数值）
4. 有待办清单（来自 `/course-review`）或用户明确修改范围

## 执行

1. 按 **工作流 B-修订** 修改源文件（`chapters/`、`quiz.partial.html`、`course.json`、`demos/` 等；细则见 skill reference，此处不列）
2. 涉及 demo 时：改完后执行 lab README 中的验收命令（与 Gate 3 / review Agent D 一致）
3. 每批改完回归 Gate（命令见 `delivery-review.md`）：

```bash
node <skill-root>/scripts/assemble-index.mjs --dir courses/<slug>
node <skill-root>/scripts/validate-tutorial.mjs --dir courses/<slug> [--strict]
node <skill-root>/scripts/review-chapter.mjs --dir courses/<slug> [--strict]
node <skill-root>/scripts/review-demo.mjs --dir courses/<slug> [--strict]
```

4. 正文大改时补做 Gate 3（`chapter-quality-rubric.md`：深度/广度）；demo 变更时补做 lab **执行**验收
5. 失败则返工，同一章/lab 遵循 skill 返工上限

## 产出

`agent-workspace/course-quality/<slug>/` 下简要记录：已完成任务、Gate 1/2/2b 结果、变更文件路径。

## 交付

全部 blocking 项清除后，使用 `delivery-review.md` §通过时话术。
