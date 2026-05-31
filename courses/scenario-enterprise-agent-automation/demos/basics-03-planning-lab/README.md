# Demo：任务规划与分解

[章节](../../index.html#ch-basics-03-planning)

## 目标

通过 Plan-and-Execute 实践，掌握任务分解、检查点设置和失败恢复策略。

## 练习内容

1. **计划编排填表**（plan-sample.md）：为「生成月度考勤报告并邮件发送」编写 Planner 分解，包含 5 个子任务和依赖关系
2. **代码实现**：实现带检查点的 Plan-and-Execute Graph，子任务失败后自动重试
3. **退避重试配置**：用 Spring Retry 配置指数退避策略

## 验收标准

- 子任务分解符合单一职责原则，依赖关系正确
- Plan-and-Execute 包含 Planner 和 Executor 两个节点
- 重试策略使用指数退避（1s → 2s → 4s），最多 3 次

## 子任务设计原则

- 单一职责：每个子任务只做一件事
- 可验证：每个子任务有明确完成标准
- 可独立重试：单个失败不影响其他成功子任务
- 依赖显式化：在 JSON plan 中声明 depends_on
