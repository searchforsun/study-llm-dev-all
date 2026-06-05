# Demo：结构化输出

对应章节：[结构化输出](../../index.html#ch-basics-04-structured-output)

对照 `LeaveRequest.json` 样例，理解 JSON mode 与 Bean 映射的字段约束。

## 步骤

1. 阅读 `LeaveRequest.json`，标出 `employeeId`、`startDate`、`days` 等必填字段。
2. 在笔记写一条校验失败时的重试策略（最多 2 次 + ProblemDetail）。
3. 说明 CorpAssist 请假表单抽取为何适合 structured output 而非自由文本。

## 验收

- [ ] 能说出 JSON 校验失败时的 2 种处理路径（重试 / 降级）
- [ ] 能对照 Demo JSON 解释 `employeeId` 字段来源
- [ ] 完成章节测验
