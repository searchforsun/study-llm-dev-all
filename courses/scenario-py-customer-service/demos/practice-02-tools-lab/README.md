# Demo：工具调用：订单/退款/改址

对应章节：[工具调用：订单/退款/改址](../../index.html#ch-practice-02-tools)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `agent.py` | Agent 定义与工具注册 |
| `tools.py` | 工具函数实现 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-customer-service/demos/practice-02-tools-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-customer-service/demos/practice-02-tools-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：工具定义与注册
实现 2-3 个业务工具函数（如日历查询、邮件发送），注册到 Agent 工具列表。
```bash
python app.py
# 测试工具调用
```
**验收标准**：Agent 可根据用户指令自动选择合适的工具并返回结构化结果。

### 练习 2：多步推理
设计需要多步工具调用的任务，验证 Agent 的推理链路。
```bash
python agent.py --task '查询明日日程并邮件通知'
```
**验收标准**：Agent 输出完整的思考链（Thought -> Action -> Observation -> ...）。

### 练习 3：错误重试与优雅降级
模拟工具调用失败场景（断开网络、超时），验证 Agent 重试和降级行为。
**验收标准**：Agent 在工具失败后最多重试 3 次，最终给出友好提示而非崩溃。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[LangGraph 客服 Agent](../../index.html#ch-practice-03-agent-dual) · Demo：[LangGraph 客服 Agent](../practice-03-agent-dual-lab/)
