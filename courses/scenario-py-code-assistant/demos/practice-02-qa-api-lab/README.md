# Demo：仓库问答 API

对应章节：[仓库问答 API](../../index.html#ch-practice-02-qa-api)

## 前置
- Python 3.12+, Milvus, OpenAI API Key

## 实验内容
1. 构建 CodeRetriever 从 Milvus 检索代码
2. 启动 FastAPI 问答服务
3. 测试流式 SSE 输出

## 验收
- POST /qa 返回带引用的答案
- POST /qa/stream 流式输出 token
- 引用包含文件路径和行号

核心文件：`code_qa_api.py`
