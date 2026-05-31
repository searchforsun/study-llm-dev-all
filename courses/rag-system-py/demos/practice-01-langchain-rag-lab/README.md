# Demo：LangChain RAG 实战

对应章节：[LangChain RAG 实战](../../index.html#ch-practice-01-langchain-rag)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `app.py` | FastAPI 问答服务 |
| `pipeline.py` | LCEL 管线定义 |
| `config.py` | 配置项 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/rag-system-py/demos/practice-01-langchain-rag-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/rag-system-py/demos/practice-01-langchain-rag-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：LCEL 管线构建
使用 LangChain LCEL 语法构建 retriever -> prompt -> llm -> output_parser 管线。
```bash
python app.py
# 访问 http://localhost:8000/docs 测试 /ask 端点
```
**验收标准**：POST `/ask` 返回非空答案，包含引用文档片段。

### 练习 2：流式输出
改造端点支持 Server-Sent Events 流式响应。
```bash
curl -N http://localhost:8000/ask/stream -d '{"question":"什么是 RAG？"}'
```
**验收标准**：响应以 `data:` 前缀逐块输出，客户端可逐步展示。

### 练习 3：引用溯源
在答案中嵌入引用标记，返回对应的源文档块列表。
```bash
python -c "from app import ask; print(ask('RAG 原理'))"
```
**验收标准**：答案包含 `[1]` `[2]` 等引用标记，响应 JSON 含 `citations` 数组。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[LlamaIndex RAG 实战](../../index.html#ch-practice-02-llamaindex-rag) · Demo：[LlamaIndex RAG 实战](../practice-02-llamaindex-rag-lab/)
