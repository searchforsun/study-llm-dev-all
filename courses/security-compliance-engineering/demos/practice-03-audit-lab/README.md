# Demo：审计与溯源

[章节](../../index.html#ch-practice-03-audit)

## 目标
设计不可篡改的审计日志和引用链。

## 步骤
1. 在 audit-schema.json 中设计审计日志 JSON Schema
2. 实现 Java AuditService 的 recordChat 方法
3. 设计不可篡改存储方案

## 验收标准
- [ ] audit-schema.json 含 who/what/citations/tool_calls
- [ ] 审计日志含引用链（chunk_id、document_id）
- [ ] 不可篡改：Kafka + Object Store 双存储

## 验收命令

```bash
# 文档型 lab：确认产物文件存在且非空
ls -la *.md *.rego 2>/dev/null | wc -l
# 期望：≥ 1；再按上方验收标准逐项勾选
```
