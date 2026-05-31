# Demo：多 Agent 协作

对应章节：[多 Agent 协作](../../index.html#ch-practice-04-multi-agent)

## 前置
- Python 3.12+
- OpenAI API Key

## 实验内容
1. 实现 FinanceAgent / ProcurementAgent / LegalAgent
2. 实现 SupervisorAgent 任务分发和结果汇总
3. 模拟 Agent 结果冲突验证冲突裁决器

## 验收
- 三个 Agent 并行执行，Supervisor 汇总
- 冲突裁决结果符合业务逻辑

核心文件：`multi_agent.py`, `conflict_resolver.py`
