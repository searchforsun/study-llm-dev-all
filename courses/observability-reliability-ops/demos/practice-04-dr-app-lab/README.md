# Demo：应用层灾备与一致性

[章节](../../index.html#ch-practice-04-dr-app)

## 目标
设计幂等重试和 MQ 可靠性方案。

## 步骤
1. 在 dr-plan.md 中设计 tool 调用的幂等键方案
2. 画 MQ 消息流：BFF → Kafka → Agent
3. 列出 CorpAssist 的三级降级策略

## 验收标准
- [ ] dr-plan.md 含幂等键方案和降级路径
- [ ] MQ 可靠性配置（acks=all、去重表）
- [ ] 三级降级：从最佳到最差
