# Demo：多 Agent 协作

[章节](../../index.html#ch-practice-04-multi-agent)

## 目标

设计 Supervisor-Worker 多 Agent 架构，实现角色分工和冲突解决。

## 练习内容

1. **角色分工表**（roles.md）：为采购审批场景设计 3 个 Worker Agent（预算查询、库存查询、合规审核）的职责说明
2. **架构图绘制**：画出 Supervisor-Worker 架构，包含消息总线和聚合节点
3. **冲突解决规则**：编写至少 3 种冲突类型的解决策略（预算不足、数据不一致、权限冲突）

## 验收标准

- 每个 Worker 有明确的单一职责和工具列表
- 架构图包含 Supervisor、Worker、Message Bus、Aggregator 四大组件
- 冲突解决规则覆盖预算 vs 需求、数据不一致、权限冲突三类

## 关键概念

- `supervisor agent`：负责任务分解和分派的管控 Agent
- `message bus`：Agent 间异步通信通道（RocketMQ/Kafka）
- `conflict resolve`：Agent 决策不一致时的处理策略
