# 课程质量全流程（校验 → 评审 → 优化）

一键编排：**Gate 1–2** → **多 Agent 评审** → **按方案优化** → **终检**。

## 参数

- **必填**：课程 slug
- **可选**：`--skip-fix` 仅评审不改稿；`--tasks T1,T2`；`--chapter <id>`

## 流水线

```
/course-gate  →  /course-review  →  /course-fix
                      │                  │
           optimization-plan.json  optimization-result.md
```

## 步骤

### Step 1 — `/course-gate`

运行技能包三条 Gate 命令（`--strict`）。Gate 1 失败则先修结构再继续。

### Step 2 — `/course-review`

并行 Agent A/B/C → 产出 `agent-workspace/course-quality/<slug>/optimization-plan.json`。

若 `overallVerdict` 为 `ready` 且无 blockers → 跳过 Step 3。

### Step 3 — `/course-fix`（除非 `--skip-fix`）

P0 → P1 → P2，每章最多 2 轮返工。

### Step 4 — 终检汇报

| 输出 | 路径 |
|------|------|
| 优化方案 | `agent-workspace/course-quality/<slug>/optimization-plan.json` |
| 执行结果 | `agent-workspace/course-quality/<slug>/optimization-result.md` |

## 环境

- Node.js 18+；技能包路径见 `/course-gate`
- 参照：`courses/REFERENCE.md`、`courses/outline-specs.json`、金标准 `java-distributed-architecture`

## 示例

```
/course-pipeline spring-ai-alibaba-engineering
/course-pipeline spring-ai-alibaba-engineering --skip-fix
```
