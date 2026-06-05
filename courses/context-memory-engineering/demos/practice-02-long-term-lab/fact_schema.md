# 事实库字段（corpassist-fact-v1）

| 字段 | 类型 | 说明 |
|------|------|------|
| tenant_id | string | 租户隔离键 |
| user_id | string | 用户隔离键 |
| fact_text | string | 事实正文 |
| fact_type | enum | preference / identity / order / constraint |
| expires_at | ISO8601 | 可选 TTL |
| source_turn | int | 可选，来源轮次 |

完整 schema 见 [`fact_schema.json`](fact_schema.json)。提取样例见 [`sample_dialog.json`](sample_dialog.json)。
