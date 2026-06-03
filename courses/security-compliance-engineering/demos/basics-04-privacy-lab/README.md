# Demo：隐私与脱敏

[章节](../../index.html#ch-basics-04-privacy)

## 目标
实现 PII 检测、日志脱敏和存储策略。

## 步骤
1. 在 privacy-plan.md 中写 PII 检测规则
2. 实现 Java PIIDetector 的身份证和手机号检测
3. 配置 Python structlog 的 redact_processor

## 验收标准
- [ ] privacy-plan.md 含 PII 规则、脱敏方式和保留策略
- [ ] PIIDetector 正确脱敏手机号和身份证
- [ ] 日志中不含原始 PII

## 验收命令

```bash
# 文档型 lab：确认产物文件存在且非空
ls -la *.md *.rego 2>/dev/null | wc -l
# 期望：≥ 1；再按上方验收标准逐项勾选
```
