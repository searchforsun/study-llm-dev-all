# Demo：LangGraph 工作流实现

[章节](../../index.html#ch-practice-01-langgraph)

## 目标

用 LangGraph StateGraph 实现带检查点和人工审批的办公 Agent 工作流。

## 练习内容

1. **Graph 节点定义**（graph-nodes.md）：为请假流程定义 5 个节点（planner、check_balance、draft、approval、submit）和条件边
2. **Checkpoint 集成**：配置 MemorySaver 或 SqliteSaver，验证中断恢复
3. **审批节点实现**：使用 interrupt_before 在 submit 前实现人工审批

## 验收标准

- StateGraph 至少包含 4 个节点、3 条边、1 个条件边
- Checkpoint 能在进程重启后恢复执行状态
- interrupt_before 能正确中断并等待外部输入后恢复

## 关键概念

- `langgraph workflow`：StateGraph + Node + Edge 定义显式工作流
- `graph checkpoint`：自动保存每步状态，支持中断和恢复
- `human approval node`：interrupt_before 高风险工具，等待人工审批
