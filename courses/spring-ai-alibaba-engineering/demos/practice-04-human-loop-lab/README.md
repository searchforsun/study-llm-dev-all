# Demo：人在回路与上下文工程

对应章节：[人在回路与上下文工程](../../index.html#ch-practice-04-human-loop)

## 目标
实现带审批节点的报销 Graph。

## 操作步骤
1. 在 Graph 中添加 InterruptNode 作为审批节点
2. 配置审批通过/驳回的条件路由
3. 设置审批超时 1 小时，超时自动驳回
4. 实现 /approve/{executionId} 和 /reject/{executionId} 端点

## 验收
审批节点能暂停等待并正确恢复执行。

## 练习
列出 2 个应人工审批的工具，说明为什么它们需要审批。
