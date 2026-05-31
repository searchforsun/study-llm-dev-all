# Demo：Spring AI Alibaba Agent 对照

对应章节：[Spring AI Alibaba Agent 对照](../../index.html#ch-practice-02-saa-agent)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `agent.py` | Agent 定义 |
| `tools.py` | 工具函数 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-agent-automation/demos/practice-02-saa-agent-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-agent-automation/demos/practice-02-saa-agent-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：Agent 定义
定义 Agent，配置工具列表和 LLM 模型参数。
```bash
python agent.py --tools calendar,email --model qwen-max
```
**验收标准**：Agent 启动后可通过交互式会话调用工具。

### 练习 2：工具实现
实现日历查询和邮件发送两个工具函数。
```bash
python agent.py --tool-test calendar
```
**验收标准**：工具函数返回结构化数据，错误处理优雅。

### 练习 3：双框架对照
在 LangGraph 和 Spring AI Alibaba 中实现相同的 Agent 逻辑，对比差异。
**验收标准**：输出两种实现的对比表格，包括代码量、配置复杂度、执行效率。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[多工具协作与编排](../../index.html#ch-practice-03-multi-tool) · Demo：[多工具协作与编排](../practice-03-multi-tool-lab/)
