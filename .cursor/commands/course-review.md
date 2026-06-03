# 课程质量评审

Gate 1–2 通过后，按技能包做 **Gate 3** 及 **demo 验收**；产出待办清单供 `/course-fix` 使用。

## 前置

1. 读取 skill：`programming-html-tutorial/SKILL.md`
2. `<skill-root>` 解析顺序见 `/course-gate`
3. 已跑 `/course-gate` 且无 blocking error；否则只输出结构修复项
4. 按需读 `courses/<slug>/course.json`、课程 `demos/`（**勿**在 command 内重复 rubric 条文）

## 阶段 1：四 Agent 并行

`subagent_type: generalPurpose`。每个 Agent **只执行 skill 引用文档中的检查项**，不在 prompt 里自造标准：

| Agent | 必读 skill 文档 | 范围 |
|-------|----------------|------|
| A | `reference/chapter-quality-rubric.md` | 各章 `chapters/*.html` + 对应测验 → Gate 3 JSON |
| B | `reference/chapter-authoring.md`（章间引用、术语） | 本课各章互参、`course.json` outline |
| C | `example/java-distributed-architecture/`、`config/chapter-quality.json` | 与样例课对照的完整度与量化缺口 |
| D | `reference/delivery-review.md` §Gate 1 清单、`reference/chapter-authoring.md` §动手练习、`example/.../demos/` | 各 lab：README + **执行验收命令**（能跑则跑） |

Agent A 输出格式以 `chapter-quality-rubric.md` 为准。Agent D 单独汇总 lab 跑通结果。

## 阶段 2：待办清单

合并四 Agent 结果，写入 `agent-workspace/course-quality/<slug>/`（文件名自定，须含：阻塞项、按章/lab 任务、优先级）。任务粒度对齐 skill **工作流 B-修订**（章 / 测验 / demo / 术语）。

## 阶段 3：汇报

总评、必须修复项、可选改进；询问是否 `/course-fix`。

## 约束

见 skill `workflows.md`：返工上限、禁止手改 `index.html` 等。
