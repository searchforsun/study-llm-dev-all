# Demo：LangChain RAG 实战

对应章节：[LangChain RAG 实战](../../index.html#ch-practice-01-langchain-rag)

## 概述

本 Demo 实现 CorpAssist 知识库的 LangChain RAG 管线。核心组件包括文档加载（PyPDFLoader/DirectoryLoader）、递归字符切分（RecursiveCharacterTextSplitter）、向量存储（Chroma + text-embedding-3-small）、LCEL 声明式管线组装以及 FastAPI + SSE 流式输出。覆盖 Similarity/MMR/Ensemble/MultiQuery 四种 Retriever 类型对比。

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key
- Docker Desktop（可选，用于 Milvus/Qdrant）

## 文件

| 文件 | 说明 |
|------|------|
| `app.py` | FastAPI 问答服务，支持流式 SSE |
| `pipeline.py` | LCEL 管线定义（RunnableParallel + prompt + llm） |
| `documents.py` | 文档加载与切分 |
| `vector_store.py` | Chroma 向量存储与检索器 |
| `retrievers.py` | 多类型 Retriever 对比 |
| `config.py` | 配置项 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 练习

### 练习 1：构建 LCEL 管线
放置 PDF 文档到 `docs/`，运行文档加载与索引构建，测试 `/ask` 端点。**验收**：POST `/ask` 返回含引用片段的答案。

### 练习 2：流式输出
测试 `/ask/stream` 端点，验证 SSE 逐 token 输出。**验收**：curl -N 可看到逐块推送的 `data:` 消息，首 token 延迟 < 500ms。

### 练习 3：Retriever 对比
切换 Similarity/MMR/Ensemble 三种 Retriever，对同一问题对比召回差异。**验收**：MMR 检索结果多样性高于 Similarity。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[LlamaIndex RAG 实战](../../index.html#ch-practice-02-llamaindex-rag) · Demo：[LlamaIndex RAG 实战](../practice-02-llamaindex-rag-lab/)
