# Demo：LangGraph 工作流实现

对应章节：[LangGraph 工作流实现](../../index.html#ch-practice-01-langgraph)

## 前置

- Python 3.12+
- OpenAI API Key
- `pip install langgraph langchain-openai`

## 实验内容

1. 运行 `graph.py` 构建报销审批 StateGraph
2. 测试 StateGraph 的节点流转和条件边
3. 启用 SqliteSaver 检查点，验证崩溃恢复
4. 添加人工审批节点，测试中断和恢复流程

## 验收标准

- 工作流崩溃后可从最后检查点恢复
- 人工审批节点可中断等待
- 审批通过/驳回两种路径都能正确执行

核心文件：`graph.py`, `nodes.py`, `app.py`
