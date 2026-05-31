# Demo：Spring AI Alibaba Agent 对照

对应章节：[Spring AI Alibaba Agent 对照](../../index.html#ch-practice-02-saa-agent)

## 前置
- Python 3.12+ / JDK 17+
- DashScope API Key

## 实验内容
1. Python 侧用 LangChain create_react_agent 实现
2. Java 侧用 Spring AI Alibaba ReactAgent 实现
3. 对比两种实现的 Prompt 格式和工具注册差异

## 验收
- 同一业务逻辑（查询订单）在两种语言中都能运行
- 理解 Python Agent 和 Java Agent 的架构差异

核心文件：`python_agent.py`, `java_agent/`, `compare.py`
