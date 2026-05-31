# Demo：Spring AI Alibaba 上下文工程

[返回章节](../../index.html#ch-advanced-01-saa-context)

## 目标

配置 Spring AI Alibaba 的 ContextCompressAdvisor 和 ContextEditingAdvisor，使用 StateGraph 管理对话状态，启用 Checkpoint 持久化。

## 前置准备

- JDK 17+
- Spring AI Alibaba 依赖
- Redis 实例

## 步骤

1. **配置 ContextCompressAdvisor**：使用 builder 模式设定摘要压缩策略、80% token 阈值、保护 order_id 和 user_id 字段。

2. **配置 ContextEditingAdvisor**：添加字段截断（最大 500 字符）和 PII 脱敏（手机号和身份证号正则）。

3. **构建 StateGraph**：定义 ConversationState，配置 messages 使用 concatAndTrim reducer，memory 使用 lastWriteWins reducer。

4. **启用 Checkpoint**：设置 RedisCheckpointStore，验证断点恢复 —— 中断后从同一 thread_id 加载状态。

5. **集成测试**：在 CorpAssist 服务中串联所有 Advisor，验证压缩和编辑生效。

## 预期输出

Advisor 自动压缩超预算上下文。PII 信息被脱敏。Graph 状态正确合并。Checkpoint 可恢复。

## 验收清单

- [ ] ContextCompressAdvisor 正确触发
- [ ] ContextEditingAdvisor 截断和脱敏生效
- [ ] StateGraph 状态合并正确
- [ ] Checkpoint 恢复验证通过
