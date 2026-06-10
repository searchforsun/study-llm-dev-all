# CorpAssist 框架选型矩阵（模板）

| 场景 | AgentScope Java | SAA Graph | LangGraph4j | 推荐 | 理由 |
|------|-----------------|-----------|-------------|------|------|
| S3 办公 ReAct + Sub-agent | 原生 ReAct + 事件流 | Graph 编排 + ReactAgent | 需 LangGraph4j 适配 | AgentScope Java | DashScope 原生、与 Python 双栈 |
| S2 客服固定流程 | 可行 | **首选** 显式图 | 可行 | SAA Graph | 分支清晰、审批节点成熟 |
| S1 FAQ 单轮 | 过重 | RAG 节点即可 | 过重 | SAA Graph + RAG | 无需 Agent 循环 |

## 必填维度（验收脚本检查）

- [x] 场景列 ≥ 3 行
- [x] 推荐列非空
- [x] 含迁移成本备注（见 migration-estimate.md）
