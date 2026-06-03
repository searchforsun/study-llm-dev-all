# 课程质量全流程

串联 skill 定义的校验 → 评审 → 修复。

## 前置

读取 `programming-html-tutorial/SKILL.md` 与 `reference/workflows.md` §Gate 总表；`<skill-root>` 见 `/course-gate`。量化阈值见 `config/chapter-quality.json`，**勿在 command 中写死**。

## 步骤

1. `/course-gate` — Gate 1 + Gate 2 + Gate 2b + Gate 1 清单（阈值由 `chapter-quality.json` 驱动）
2. `/course-review` — Gate 3（深度/广度语义）+ demo **执行**验收（四 Agent）；产出待办清单
3. `/course-fix` — 按待办改稿并回归 Gate 1/2/2b（用户 `--skip-fix` 时跳过）
4. 终检：Gate 1–3、2b 与 lab 执行验收均通过，或列出剩余项

## 参数

- **必填**：`slug`
- **可选**：`--skip-fix`；`--chapter <id>`；`--tasks …`（传给 fix 阶段）

## 产出

待办与修复记录放在 `agent-workspace/course-quality/<slug>/`（可选，供续跑）。

## 闸门速查

| 闸门 | 命令 / 阶段 | 覆盖 |
|------|-------------|------|
| 1 | assemble + validate | 结构、编码、必填块 |
| 2 | review-chapter | `chapter-quality.json` 驱动的章节量化（含 `lines.*` 等） |
| 2b | review-demo | README、验收命令、可运行工程结构 |
| 3 | course-review | 深度/广度/准确性；demo 命令**实际执行** |
