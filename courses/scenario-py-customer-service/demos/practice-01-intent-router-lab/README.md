# Demo：意图识别与路由（Python）

对应章节：[意图识别与路由（Python）](../../index.html#ch-practice-01-intent-router)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `classifier.py` | 意图分类器 |
| `router.py` | 路由分发逻辑 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-customer-service/demos/practice-01-intent-router-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-customer-service/demos/practice-01-intent-router-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：规则+模型双校验
实现规则分类器搭配 LLM 分类器，双重校验意图。
```bash
python classifier.py --query '我要退款'
```
**验收标准**：规则和模型结果一致则直接输出，不一致时标记待人工确认。

### 练习 2：兜底策略
当意图识别置信度低于阈值时，触发通用问答或转接人工。
**验收标准**：无匹配意图时返回通用话术并提示转接人工，不抛出异常。

### 练习 3：意图识别指标监控
记录识别准确率、召回率、平均处理时间等指标到 Prometheus。
**验收标准**：`/metrics` 端点暴露 `intent_accuracy`、`intent_latency_seconds` 等指标。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[工具调用：订单/退款/改址](../../index.html#ch-practice-02-tools) · Demo：[工具调用：订单/退款/改址](../practice-02-tools-lab/)
