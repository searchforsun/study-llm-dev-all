# Demo：仓库问答 API（Python）

对应章节：[仓库问答 API（Python）](../../index.html#ch-practice-02-qa-api)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `app.py` | FastAPI 问答服务 |
| `pipeline.py` | 检索管线 |
| `config.py` | 配置项 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-code-assistant/demos/practice-02-qa-api-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-code-assistant/demos/practice-02-qa-api-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：基本检索与生成
启动 FastAPI 服务，测试基于向量检索的问答端点。
```bash
uvicorn app:app --reload --port 8000
```
**验收标准**：访问 `/ask?question=什么是大模型` 返回包含引用的答案。

### 练习 2：检索策略对比
切换不同检索器（向量/BM25/混合），对比答案质量差异。
```bash
python pipeline.py --retriever hybrid --top-k 5
```
**验收标准**：生成三种检索器的答案对比报告，包含延迟与召回数据。

### 练习 3：流式问答
实现流式响应接口，评估首 Token 延迟。
**验收标准**：流式 SSE 首 Token 延迟 < 500ms，完整响应 < 5s。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[补全与生成 Prompt](../../index.html#ch-practice-03-completion) · Demo：[补全与生成 Prompt](../practice-03-completion-lab/)
