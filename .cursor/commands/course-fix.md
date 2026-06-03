# 按优化方案执行课程改进（多 Agent）

读取 `optimization-plan.json`，并行派发子 Agent 改稿，每批完成后重跑 Gate 并迭代（最多 2 轮/章）。

## 参数

- **必填**：课程 slug
- **可选**：`--tasks T1,T3` 仅执行指定任务；`--max-rounds 2` 返工上限

## 前置

1. 确认 `agent-workspace/course-quality/<slug>/optimization-plan.json` 存在；否则先 `/course-review`。
2. 读取 `programming-html-tutorial` skill（工作流 B + delivery-review + chapter-authoring）。

## 执行流程

### 1. 并行改稿

按 `tasks[].assignedAgent` 分组，同章串行、异章并行：

| assignedAgent | 职责 |
|---------------|------|
| `chapter-writer` | `chapters/<id>.html` |
| `quiz-writer` | `quiz.partial.html` + `course.json.quizzes` |
| `continuity-editor` | 跨章引用、CorpAssist 叙事 |
| `terms-enricher` | `course.json.terms` |
| `demo-fixer` | `demos/*/README.md` |

### 2. 每批 Gate 回归

```bash
node <skill-root>/scripts/assemble-index.mjs --dir courses/<slug>
node <skill-root>/scripts/validate-tutorial.mjs --dir courses/<slug> --strict
node <skill-root>/scripts/review-chapter.mjs --dir courses/<slug> --strict
```

- 全过 → Gate 3 快速复检
- 仍失败 → 失败章再开 1 轮（计入 max-rounds）
- 更新 `optimization-plan.json` 中 `tasks[].status`

### 3. 产出

写入 `agent-workspace/course-quality/<slug>/optimization-result.md`（摘要、变更文件、未解决项）。

## 改稿硬约束

1. 只改源 fragment，不手改 `index.html`
2. UTF-8；必填 DOM 块见 chapter-blocks-policy.md
3. 每章 5 道测验（单选/多选/填空）
4. 概念章：Mermaid + learn-compare + learn-scenario
5. 实践章：代码块 + steps-operate + demo-box
