# Demo：第三方与数据出境

[章节](../../index.html#ch-advanced-03-third-party)

## 目标
评估第三方风险并设计数据出境方案。

## 步骤
1. 在 third-party-risk.md 中列出所有第三方依赖
2. 实现 Java DataCrossBorderController
3. 完成简化版 DPIA 报告

## 验收标准
- [ ] third-party-risk.md 含依赖清单和风险等级
- [ ] 数据出境控制三层：PII 检测→区域路由→阻断
- [ ] DPIA 报告结构完整

## 验收命令

```bash
# 文档型 lab：确认产物文件存在且非空
ls -la *.md *.rego 2>/dev/null | wc -l
# 期望：≥ 1；再按上方验收标准逐项勾选
```
