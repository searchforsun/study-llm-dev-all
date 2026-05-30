# CorpAssist RAG 流水线
1. 上传制度 PDF → DocumentReader
2. Splitter → 500 tokens / overlap 50
3. EmbeddingModel → VectorStore
4. 用户提问 → 检索 topK → Advisor 注入 → ChatModel
5. 返回答案 + citations
