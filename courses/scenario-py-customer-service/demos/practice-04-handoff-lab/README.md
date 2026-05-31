# Demo：降级与人工转接

对应章节：[降级与人工转接](../../index.html#ch-practice-04-handoff)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `router.py` | 转接路由逻辑 |
| `ticket.py` | 工单系统集成 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-customer-service/demos/practice-04-handoff-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-customer-service/demos/practice-04-handoff-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：置信度阈值转接
设置置信度阈值，低于阈值时自动转接人工客服。
```bash
python router.py --threshold 0.7
```
**验收标准**：低置信度查询触发工单创建，包含完整对话上下文。

### 练习 2：排队与优先级
实现排队系统，VIP 用户优先接入，等待时间预估。
```bash
uvicorn app:app --reload --port 8000
```
**验收标准**：API 返回排队位置与预估等待时间，VIP 用户自动前置。

### 练习 3：上下文移交
确保人工客服接管时能获取完整的对话摘要与历史。
```bash
python router.py --handoff --session-id sess_001
```
**验收标准**：移交内容包括用户意图、已尝试方案、关键上下文，不含冗余 Token。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[客服效果评测](../../index.html#ch-practice-05-eval) · Demo：[客服效果评测](../practice-05-eval-lab/)
