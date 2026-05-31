# Demo：多 Agent 编排

对应章节：[多 Agent 编排](../../index.html#ch-practice-02-multi-agent)

## 目标
构建 Planner-Executor-Reviewer 三 Agent 管线。

## 操作步骤
1. 定义三个 ReactAgent Bean
2. 配置 SequentialOrchestrator 将三者串联
3. 定义共享状态对象
4. 测试完整管线执行

## 验收
管线能正确执行三阶段流程并返回审核结果。

## 练习
画一个三 Agent 顺序流（Planner → Executor → Reviewer）的 Mermaid 图。
