# CorpAssist 网关契约速查表

| 场景 | stream | 超时(s) | 可重试 | 负责服务 | SSE/缓冲备注 |
|------|--------|---------|--------|----------|--------------|
| Web 客服 | true | 120 | 429/5xx 退避 | dialog-bff → llm-gateway | proxy_buffering off |
| 夜间批处理摘要 | false | 300 | 否（改任务队列） | batch-worker | 整段 JSON |
| 制度 RAG 问答 | true | 90 | 有限次 | rag-orchestrator → gateway | 引用片段先入 prompt |

## 填写说明

- **可重试**：4xx 除 429 外一般不重试；超时需配合幂等 requestId
- **负责服务**：与章节 Mermaid「BFF → 网关 → 厂商」一致
