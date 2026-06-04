# Demo：审计与溯源实验室

[返回章节](../../index.html#ch-practice-03-audit)

## 目标

实现结构化 audit 事件 emit、RAG citation chain 绑定，并验证日志 PII 脱敏与等保字段映射。

## 前置准备

- Python 3.10+

## 文件

| 文件 | 说明 |
|------|------|
| `audit_event.schema.json` | 审计事件 schema |
| `audit_emit.py` | 事件写入（hash user_id） |
| `citation_chain.py` | 引用链构建 |
| `verify_audit.py` | 验收脚本 |

## 步骤

1. 补全 schema 必填字段。
2. 对样例 chunks 生成 citations。
3. 运行验收，确认无完整手机号。

## 验收

```bash
python verify_audit.py
# 期望输出：PASS: audit event valid, PII redacted
```

- [ ] audit 含 trace_id
- [ ] user_id 仅存 hash
- [ ] citation 含 doc_id + chunk_id
- [ ] 完成章节测验
