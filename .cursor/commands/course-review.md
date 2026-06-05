# 课程质量评审

**Gate 1、2、2b** 通过后，按技能包做 **Gate 3**（内容深度/广度）及 **demo 执行验收**；产出待办清单供 `/course-fix` 使用。

## 前置

1. 读取 skill：`programming-html-tutorial/SKILL.md`
2. `<skill-root>` 解析顺序见 `/course-gate`
3. 已跑 `/course-gate` 且无 blocking error；**否则**读 `<workspace>/.course-quality/<slug>/gate-report.json`，仅输出 L1–L2 待办，**不启动** Gate 3
4. 若存在 `gate-report.json`，Agent 不重复评审其中已列为 error 的量化项（如 `lines.*`、`demos.*`）
5. 按需读 `courses/<slug>/course.json`、课程 `demos/`
6. 量化数值 **仅以** `<skill-root>/config/chapter-quality.json` 为准（**勿**在 command / Agent prompt 中写死行数、题数等）

## 阶段 1：四 Agent 并行

`subagent_type: generalPurpose`。每个 Agent **只执行 skill 引用文档中的检查项**，不在 prompt 里自造标准：

| Agent | 必读 skill 文档 | 范围 |
|-------|----------------|------|
| A | `reference/chapter-quality-rubric.md` | 各章 `chapters/*.html` + 测验 → Gate 3 JSON（深度/广度/空泛；脚本已量化项不重复） |
| B | `reference/chapter-authoring.md`（章间引用、术语） | 本课各章互参、`course.json` outline |
| C | `example/java-distributed-architecture/`、`config/chapter-quality.json` | 与样例课对照；缺口项以 JSON 键为准（如 `lines.*`、`richness.*`） |
| D | `reference/delivery-review.md` §Gate 2b、`reference/chapter-authoring.md` §动手练习、`example/.../demos/` | 各 lab：**执行** README 验收命令（能跑则跑）；文档型 lab 按 checklist 抽检 |

Agent A 输出格式以 `chapter-quality-rubric.md` 为准。Agent D 单独汇总 lab **跑通**结果（与 Gate 2b 结构校验分工）。

## 阶段 2：待办清单

合并四 Agent 结果，写入 `.course-quality/<slug>/review-todos.md`（须含阻塞项、按章/lab 任务、优先级；**排除** `gate-report.json` 已覆盖项）。粒度对齐工作流 B-修订。

## 阶段 3：汇报

总评、必须修复项、可选改进；询问是否 `/course-fix`。

## 约束

见 skill `workflows.md`：返工上限、禁止手改 `index.html` 等。
