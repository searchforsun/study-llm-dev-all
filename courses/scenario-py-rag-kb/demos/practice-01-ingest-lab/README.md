# Demo：文档接入与索引流水线（Python）

对应章节：[文档接入与索引流水线（Python）](../../index.html#ch-practice-01-ingest)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `pipeline.py` | 索引管线核心逻辑 |
| `app.py` | FastAPI 应用入口 |
| `config.py` | 配置项与变量加载 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |
| `test_pipeline.py` | 管线单元测试 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-rag-kb/demos/practice-01-ingest-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-rag-kb/demos/practice-01-ingest-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：文档解析与分块
运行索引管线，将示例 PDF/Markdown 文件解析为文本块并写入向量库。
```bash
python pipeline.py --input ./docs --output milvus://localhost:19530
```
**验收标准**：控制台输出分块数量与元数据摘要，Milvus 集合中可查到对应数据。

### 练习 2：元数据提取
为每个文档块提取文件名、页号、标题层级等元数据，并写入向量库的标量字段。
```bash
python pipeline.py --extract-metadata
```
**验收标准**：Milvus 集合中每个 chunk 包含 `source`, `page`, `heading` 等字段。

### 练习 3：权限标签注入
为文档块注入组织级权限标签，验证检索时仅返回有权限的块。
```bash
python pipeline.py --inject-acl --user-role editor
```
**验收标准**：使用 `editor` 角色检索返回 10 条，`viewer` 角色仅返回 5 条。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[LangChain 问答编排](../../index.html#ch-practice-02-qa-langchain) · Demo：[LangChain 问答编排](../practice-02-qa-langchain-lab/)
