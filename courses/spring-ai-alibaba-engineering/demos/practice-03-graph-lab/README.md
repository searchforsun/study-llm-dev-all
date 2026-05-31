# Demo：Graph 工作流

对应章节：[Graph 工作流](../../index.html#ch-practice-03-graph)

## 目标
构建请假审批 Graph（含条件路由）。

## 操作步骤
1. 定义 LeaveState Record
2. 实现 validate / managerApprove / hrCheck / notify 四个节点
3. 添加条件边：通过 / 驳回两个分支
4. 构建 Graph 并测试两个分支
5. 导出 Mermaid 可视化

## 验收
请假审批 Graph 能正确走通"通过"和"驳回"两个分支。

## 练习
为 CorpAssist 工单 Agent 列出至少 4 个 Graph 节点及各自职责。
