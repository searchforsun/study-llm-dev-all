# Demo：LlamaIndex RAG 实战

对应章节：[LlamaIndex RAG 实战](../../index.html#ch-practice-02-llamaindex-rag)

## 概述

本 Demo 使用 LlamaIndex 为 CorpAssist 构建索引驱动 RAG 系统。核心展示 IngestionPipeline 的文档处理流程（SentenceSplitter + TitleExtractor + OpenAIEmbedding）、VectorStoreIndex 的构建与管理、RetrieverQueryEngine 的 5 种 ResponseMode 配置，以及 RouterQueryEngine 实现多策略查询路由（HR/IT/政策三类知识路由）。

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key

## 文件

| 文件 | 说明 |
|------|------|
| `ingestion.py` | IngestionPipeline 文档处理与索引构建 |
| `index_utils.py` | 索引加载/创建/统计工具 |
| `query_engine.py` | 多模式 Query Engine（compact/tree_summarize/HyDE） |
| `router.py` | RouterQueryEngine 多策略路由 |
| `app.py` | FastAPI 问答服务 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 练习

### 练习 1：索引构建与问答
启动 FastAPI 服务，测试基于向量检索的问答端点。**验收**：回答包含引用来源，响应时间 < 2s。

### 练习 2：检索策略对比
切换 COMPACT / REFINE / TREE_SUMMARIZE 三种 ResponseMode，对比答案质量。**验收**：输出三种模式的延迟与答案长度对比报告。

### 练习 3：多策略路由
构建 HR/IT/政策三个子索引，用 RouterQueryEngine 自动路由问题。**验收**：HR 问题路由到 HR 索引，IT 问题路由到 IT 索引。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[混合检索实现](../../index.html#ch-practice-03-hybrid-retrieval) · Demo：[混合检索实现](../practice-03-hybrid-retrieval-lab/)
