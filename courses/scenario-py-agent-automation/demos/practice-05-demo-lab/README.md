# Demo：完整 Agent 演示链路

对应章节：[完整 Agent 演示链路](../../index.html#ch-practice-05-demo)

## 前置
- Python 3.12+, OpenAI API Key, Streamlit

## 实验内容
1. 启动 FastAPI Agent 演示服务（SSE 流式）
2. Streamlit 前端实时展示思考过程
3. MetricsCollector 监控步数和 Token

## 验收
- 流式展示 Thought-Action-Observation
- 步数和 Token 实时更新

核心文件：`demo_app.py`, `demo_ui.py`, `metrics_monitor.py`
