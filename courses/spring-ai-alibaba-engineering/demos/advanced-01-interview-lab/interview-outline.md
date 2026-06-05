# S3 办公 Agent 面试答辩稿（模板）

> 填写后用于 5 分钟口述 + 3 个追问 defense。场景：**会议纪要 → Jira 子任务**。

## 1. 为何选 Spring AI Alibaba 而非纯 LangGraph

- **总**：双栈分工，不是语言优劣。
- **分**：Python LangGraph 做 Prompt/工具实验与 golden；Java SAA 做门户 IAM、Admin DSL、HITL、SLA、QPS 治理。
- **总**：OpenAPI 契约冻结后 Java 上线，Trace 与计费 tag 统一。

## 2. STAR 案例（步数失控 / 工具失败 二选一）

| 项 | 内容 |
|----|------|
| **S** | （填写：现象，如步数 15 轮未创建 Jira） |
| **T** | （填写：SLA / 业务目标） |
| **A** | （填写：StepBudget、truncate、HITL、熔断等工程手段） |
| **R** | （填写：P95、完成率、成本前后对比） |

## 3. productionPitfall defense

| 坑 | 检测信号 | 修复 |
|----|----------|------|
| （选 1） | | |
| （选 2） | | |

## 4. 双栈 traceparent

- BFF 注入 `traceparent` → Java Agent span →（可选）Python 实验服务 child span
- 排障入口：`X-Trace-Id` → Prompt 回放 → 步数/工具表

## 5. 白板四层架构（自测勾选）

- [ ] Gateway → AgentSvc → Graph/ReactAgent → DashScope
- [ ] Tool 白名单 + HITL 节点已标注
- [ ] Admin Studio + OTel 已标注
