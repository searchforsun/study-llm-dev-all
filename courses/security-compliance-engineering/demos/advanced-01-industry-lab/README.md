# Demo：行业合规差异

[章节](../../index.html#ch-advanced-01-industry)

## 目标
理解金融和政务行业的合规差异。

## 步骤
1. 在 industry-compliance-plan.md 中对比金融和政务要求
2. 实现 Java FinancialAuditSigner 签名方法
3. 配置政务场景 LLM 提供商白名单

## 验收标准
- [ ] industry-compliance-plan.md 含对比表和配置
- [ ] 审计日志签名方案完整
- [ ] 行业配置可切换

## 验收命令

```bash
# 文档型 lab：确认产物文件存在且非空
ls -la *.md *.rego 2>/dev/null | wc -l
# 期望：≥ 1；再按上方验收标准逐项勾选
```
