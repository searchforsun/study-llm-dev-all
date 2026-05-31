# Agent 分类体系实验室

## 目标
为 CorpAssist S2 客服和 S3 办公自动化场景选择合适的 Agent 范式并实现代码骨架。

## 前置条件
- Python 3.10+ 或 Java 17+
- LangGraph 0.2+ 或 Spring AI Alibaba 2026

## 练习
1. 列出 CorpAssist 中至少 3 个需要 Agent 的场景，为每个选择合适范式
2. 用 Python LangGraph 实现一个 ReAct Agent（含至少一个工具调用）
3. 将同一场景改为 Plan-Execute 实现
4. 在 ReAct Agent 上叠加 Reflexion 层

## 验收标准
- [ ] 能针对不同场景正确选择范式
- [ ] 至少一种范式的代码可运行
- [ ] 代码包含工具调用和步数控制

## 参考
- 章节: basics-01-agent-taxonomy
