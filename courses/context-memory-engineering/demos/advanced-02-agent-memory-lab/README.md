# Demo：Agent 场景记忆

[返回章节](../../index.html#ch-advanced-02-agent-memory)

## 目标

使用 LangGraph Checkpoint 持久化 Agent 状态，实现多 Agent 共享黑板书，验证中断恢复功能。

## 前置准备

- Python 3.8+
- `pip install langgraph redis`
- Redis 实例

## 步骤

1. **构建 Agent Graph**：使用 LangGraph 构建三步 Agent（查询订单 → 检查库存 → 生成回复）。每步保存 Checkpoint 到 Redis。

2. **实现中断恢复**：在第 2 步后模拟中断，使用同一 thread_id 恢复 Agent，验证状态正确。

3. **实现 SharedBlackboard**：使用 Redis Hash 实现多 Agent 共享上下文。Agent A 写入查询结果，Agent B 读取并使用。

4. **Scope 管理**：实现黑板书（共享）和私有执行日志（隔离）。验证 Agent B 无法读取 Agent A 的私有日志。

## 预期输出

Agent 从 Checkpoint 恢复后继续执行。多 Agent 通过黑板书共享中间结果。私有记忆跨 Agent 隔离。

## 验收清单

- [ ] LangGraph Checkpoint 保存/恢复正确
- [ ] 共享黑板书读写正常
- [ ] 私有记忆跨 Agent 隔离
- [ ] thread_id 与 session_id 对齐
