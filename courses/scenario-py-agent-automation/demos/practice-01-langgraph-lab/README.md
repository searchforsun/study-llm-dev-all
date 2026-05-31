# Demo：LangGraph 工作流实现（Python）

对应章节：[LangGraph 工作流实现（Python）](../../index.html#ch-practice-01-langgraph)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `graph.py` | Graph 工作流定义 |
| `nodes.py` | 图节点实现 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-agent-automation/demos/practice-01-langgraph-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-agent-automation/demos/practice-01-langgraph-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：Graph 工作流定义
使用 Graph DSL 定义状态机，包含 3 个以上节点和条件边。
```bash
python graph.py --visualize
```
**验收标准**：输出工作流 DOT 图，包含节点、边和条件分支。

### 练习 2：检查点与恢复
实现检查点机制，支持工作流中断后恢复。
```bash
python graph.py --checkpoint --interrupt --resume
```
**验收标准**：中断后恢复时状态完全正确，不会重复执行已完成步骤。

### 练习 3：条件路由
根据节点输出动态选择下一步路径。
**验收标准**：输入不同的测试数据，工作流走不同分支并输出正确的路径标记。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[Spring AI Alibaba Agent 对照](../../index.html#ch-practice-02-saa-agent) · Demo：[Spring AI Alibaba Agent 对照](../practice-02-saa-agent-lab/)
