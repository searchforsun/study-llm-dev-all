# Demo：Token 成本治理

[章节](../../index.html#ch-basics-04-token-cost)

## 目标
设计分租户 Token 计量及成本告警。

## 步骤
1. 在 metering-plan.md 中设计指标名称和标签
2. 写 Java 方法检查租户是否超 daily cap
3. 配置 Prometheus 告警：日用量超前 7 天均值 3 倍

## 验收标准
- [ ] metering-plan.md 含指标设计表和标签
- [ ] 实现 daily cap 检查方法
- [ ] 至少一条成本告警规则
