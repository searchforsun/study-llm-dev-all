# Agent 记忆与上下文管理实验室

## 目标
为 CorpAssist Agent 实现三层记忆系统。

## 练习
1. 使用滑动窗口实现短期记忆（最大 10 轮）
2. 连接 Redis 或 Vector DB 实现长期记忆
3. 使用 LangGraph Checkpointer 保存状态
4. 测试跨会话恢复

## 验收标准
- [ ] Agent 能在跨会话中正确回忆历史信息
- [ ] 有限的历史轮次不会撑爆上下文
- [ ] Checkpoint 支持中断恢复

## 参考
- 章节: basics-04-memory-context
