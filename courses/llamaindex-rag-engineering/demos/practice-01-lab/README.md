# Demo：高级检索策略

对应章节：[高级检索策略](../../index.html#ch-practice-01)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `app.py` | FastAPI 服务 |
| `pipeline.py` | 检索管线与策略 |
| `config.py` | 配置项 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/llamaindex-rag-engineering/demos/practice-01-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/llamaindex-rag-engineering/demos/practice-01-lab
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

### 练习 2：检索策略切换
切换 SentenceWindowNodeParser / AutoMergingRetriever 等高级策略。
```bash
python pipeline.py --retriever auto-merging --chunk-size 1024
```
**验收标准**：不同策略的答案质量和延迟对比数据。

### 练习 3：延迟与召回权衡
调整检索参数（top-k、相似度阈值），观察延迟和召回率变化。
```bash
python pipeline.py --sweep --top-k 3 5 10
```
**验收标准**：输出 top-k vs Recall@k vs P99 延迟权衡曲线。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[Agent + Tools 集成](../../index.html#ch-practice-02) · Demo：[Agent + Tools 集成](../practice-02-lab/)
