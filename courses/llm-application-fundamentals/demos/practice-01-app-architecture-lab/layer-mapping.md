# CorpAssist 服务分层映射（示例填写）

| 层 | 职责（一句话） | 我方服务/仓库 | 是否直连 llm-gateway |
|----|----------------|---------------|----------------------|
| 接入层 | 鉴权、SSE、密钥 | corpassist-bff | 否 |
| 编排层 | RAG 拼装、Agent、多轮 | dialog-orchestrator | 是（经网关） |
| 数据层 | 索引、文档版本、审计 | rag-service / doc-ingest | 否 |

## S1 制度问答 — 调用链标注

1. 客户端 → **corpassist-bff**（接入）
2. **dialog-orchestrator** → rag-service（编排/数据边界：检索 API 属 **数据层**）
3. **dialog-orchestrator** → llm-gateway → 模型
4. usage 写入 **llm-gateway 计量表 + dialog-orchestrator 日志**
