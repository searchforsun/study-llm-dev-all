# CorpAssist S3 — extensions 选型表（填空）

| 场景 | 推荐 extension / 能力 | 是否 human-approval | 备注 |
|------|------------------------|---------------------|------|
| PDF 制度 RAG | Tika Document Reader + text-embedding-v3 | 否 | 批处理建索引 |
| 拍照请假单 | qwen-vl-plus **或** OCR+文本 | 是（submit_leave） | 二选一并论证 |
| 日历查询 MCP | MCP Server 桥接 | 否 | dev 先启用 |
| 发邮件 MCP | MCP Server 桥接 | **是** | prod 须白名单 |
| 观测 Trace | OTLP 导出插件 | 否 | 衔接 practice-03 |

## 参考依赖（版本由 extensions-bom 管理）

- `spring-ai-alibaba-starter-dashscope`
- Spring AI `TikaDocumentReader` / ETL 管道
- Agent MCP 集成（见 agent-orchestration-java）
