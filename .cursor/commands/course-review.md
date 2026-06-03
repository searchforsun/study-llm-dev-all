# 课程全量质量评审（多 Agent）

对一门课程做**结构 → 语义 → 衔接度 → 深度广度**评审，产出优化方案 JSON，供 `/course-fix` 执行。

## 参数

- **必填**：课程 slug（如 `spring-ai-alibaba-engineering`）
- **可选**：`--chapter <id>` 仅评单章；`--phase basics|practice|advanced` 仅评某阶段

## 阶段 0：准备

1. 读取 `courses/<slug>/course.json`、`courses/outline-specs.json`（`courses.<slug>` + `learningPath`）、`courses/REFERENCE.md`。
2. 运行 Gate 1–2（见 `/course-gate` 的三条命令，`--strict`）。
3. Gate 1 失败 → **停止**语义评审，先输出结构修复清单。

## 阶段 1：并行 Sub-Agent（Gate 3–5）

**同时**启动以下子 Agent（`subagent_type: generalPurpose`，只读除非写报告）：

### Agent A — Gate 3 章节语义

参照 `programming-html-tutorial/reference/chapter-quality-rubric.md`，对每章 `chapters/<id>.html` 评分：大纲覆盖、教学节奏、可检验性、空泛度、准确性、反例对比、章间一致。

### Agent B — Gate 4 课程衔接度

从 `outline-specs.json` 提取：

- `learningPath.stages` 中该课所在阶段 → **前置课**（之前各 stage 的 slug）、**后续课**
- `courses.<slug>`：`dualStackPolicy`、`phaseGoals`、`jdTags`
- 同 stage 的 parallel peers（如 `spring-ai-engineering`）
- `interviewScenarios.scenarios` 中含该 slug 的场景与 `coreTopics`
- `globalRules.mustNotCover`、`northStarCapabilities`

| 检查项 | 数据源 |
|--------|--------|
| 前置课是否重复讲 | 前置课对应章节 |
| 是否为后续课铺垫 | 后续课 + 场景 coreTopics |
| 双栈策略一致 | dualStackPolicy |
| 阶段 peers 不冲突 | 同 stage parallel |
| 禁止话题未越界 | mustNotCover |
| 北极星能力触点 | northStarCapabilities + REFERENCE.md |

输出 `continuity`：`{ "type": "gap|overlap|misalign", "severity": "blocker|major|minor", "detail": "...", "affectedChapters": [] }`

### Agent C — Gate 5 深度与广度

对照金标准 `java-distributed-architecture`（380–500 行/章、~25–30 术语/课、5 题/章）：

- 各章行数（`<380` 为 thin）
- `course.json` terms / quizzes
- `phaseGoals`、`jdTags` 覆盖
- `demos/` README 可运行性

输出 `depthBreadth`：`{ "overall": "adequate|thin|shallow", "gaps": [], "strengths": [] }`

## 阶段 2：汇总优化方案

写入 `agent-workspace/course-quality/<slug>/optimization-plan.json`：

```json
{
  "slug": "...",
  "generatedAt": "ISO8601",
  "gate1Passed": true,
  "gate2Passed": false,
  "overallVerdict": "needs-optimization|acceptable|ready",
  "summary": "...",
  "blockers": [],
  "tasks": [{ "id": "T1", "priority": "P0", "scope": "chapter", "target": "...", "action": "...", "description": "...", "assignedAgent": "chapter-writer" }],
  "chapterReviews": {},
  "continuity": [],
  "depthBreadth": {}
}
```

## 阶段 3：向用户汇报

1. 总评（ready / needs-optimization）
2. P0 阻塞项、P1 质量债、P2 可选增强
3. 询问是否执行 `/course-fix`

## 约束

- 同一章返工上限 **2 轮**
- 不手改 `index.html`；改 `chapters/*.html`、`quiz.partial.html`、`course.json`
- 改稿规范：`programming-html-tutorial` 工作流 B
