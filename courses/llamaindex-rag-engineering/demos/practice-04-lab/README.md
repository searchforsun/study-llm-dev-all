# Demo：多知识库与路由

对应章节：[多知识库与路由](../../index.html#ch-practice-04)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `router.py` | 路由分发逻辑 |
| `classifier.py` | 意图分类器 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/llamaindex-rag-engineering/demos/practice-04-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/llamaindex-rag-engineering/demos/practice-04-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：意图路由实现
实现基于 LLM 分类的知识库路由，根据问题意图选择目标知识库。
```bash
python router.py --query '公司年假政策'
```
**验收标准**：问题被正确路由到 HR 知识库，返回相关答案。

### 练习 2：权限过滤
在路由层实现文档级访问控制，过滤无权限内容。
```bash
python router.py --query '薪资数据' --role employee
```
**验收标准**：无权限返回空结果或无权限提示，不泄露内容。

### 练习 3：多租户索引隔离
为不同租户维护独立索引空间，路由层根据租户 ID 选择索引。
```bash
python router.py --tenant tenant_a --query '订单查询'
```
**验收标准**：不同租户查询相同问题得到不同的隔离结果。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[实战：CorpAssist 知识库 Python 版](../../index.html#ch-practice-05) · Demo：[实战：CorpAssist 知识库 Python 版](../practice-05-lab/)
