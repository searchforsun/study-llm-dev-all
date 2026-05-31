# Demo：策略即代码

[章节](../../index.html#ch-advanced-02-policy-code)

## 目标
用 OPA/Rego 实现安全策略代码化。

## 步骤
1. 在 security-policy.rego 中写话题过滤和工具鉴权规则
2. 实现 Java OpaPolicyClient 的 evaluate 方法
3. 设计策略版本管理流程

## 验收标准
- [ ] security-policy.rego 含至少 3 条策略规则
- [ ] OPA 集成到 Spring AI 中
- [ ] 策略变更通过 CI/CD pipeline
