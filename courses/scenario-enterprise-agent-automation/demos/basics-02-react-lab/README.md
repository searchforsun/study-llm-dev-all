# Demo：ReAct 与 Agent 架构

[章节](../../index.html#ch-basics-02-react)

## 目标

通过绘制 ReAct 循环图和实现带步数预算的 Agent，掌握 Think-Act-Observe 核心范式。

## 练习内容

1. **流程图填空**（react-loop.md）：完成 ReAct 循环的 Think → Act → Observe 各环节标注，包含条件边和终止条件
2. **代码实现**：用 Python 或 Java 实现一个带步数预算（max_steps=10）和超时控制的 ReAct Agent
3. **状态机设计**：为「自动生成周报」场景设计 Agent 状态机，至少包含 3 个状态和 2 个条件转换

## 验收标准

- 流程图正确标注 Think/Act/Observe 三个核心环节和 continue/end 条件边
- Agent 代码包含步数计数器、超时检查和停止条件
- 状态机包含循环（Think → Act → Observe）和终止（已完成/超步数）

## 关键概念

- `think act observe`：Agent 的最小工作单元，每步必须观察才能继续
- `step budget`：max_steps=10~15 硬限制，配合超时终止
- `agent state machine`：StateGraph 显式定义状态转换，优于隐式 Prompt 控制
