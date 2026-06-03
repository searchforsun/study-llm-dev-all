# CorpAssist S3 交付清单（Layer 1 基线）

> 签字前每项需附证据链接（CI 报告 / Grafana / Git tag / Runbook）

## 1. 功能

- [ ] 纪要解析 → 抽取 action items（extensions 或 Confluence Tool）
- [ ] Jira 创建子任务（写 Tool + 审计日志）
- [ ] 制度检索 Tool（VectorStore + Rerank + citation）
- [ ] 会议室/日历类只读 Tool（可选）
- [ ] golden 轨迹集 ≥20 条，通过率 ≥85%

## 2. 治理

- [ ] RAM 子账号：online / batch 分离（见 practice-05）
- [ ] tenantId 全链路透传（Gateway → RAG → cost tag）
- [ ] Admin DSL Git 管理；Prompt 变更 CI diff
- [ ] HITL：采购/超标金额审批节点
- [ ] Tool 白名单；写操作禁止语义缓存

## 3. 非功能

- [ ] P95 端到端 ≤15s（含 2 次 Tool）
- [ ] StepBudget：超限转 HITL 或模板答复
- [ ] Tool 返回截断 ≤2k 字符 + doc_id
- [ ] 熔断/降级：429 → turbo 或静态 FAQ
- [ ] Trace staging 100% 采样；prod 按 tenant 采样

## 4. 运维

- [ ] Key 轮换 runbook
- [ ] 429 / DashScope 故障 runbook
- [ ] checkpoint Redis 清理策略
- [ ] Badcase 飞轮：每周 Top10 失败 → golden

## 5. 场景衔接

- [ ] intent 路由：S1 FAQ / S2 客服 / S3 办公 分离
- [ ] 与 [scenario-java-agent-automation](../../../scenario-java-agent-automation/index.html) 场景用例对齐
- [ ] 制度 index_version 与 basics-05 索引发布流程一致

## 6. 验收指标（staging）

| 指标 | 目标 |
|------|------|
| 任务成功率 | ≥85% |
| HITL 触发率 | 5–15% |
| P95 延迟 | ≤15s |
| 步数超限率 | <3% |
| Token/成功任务 | 较基线 ±10% |
| 429 率 | <1% |

## 7. S3 四坑 ↔ 飞轮

| 坑 | 检测 | 飞轮动作 |
|----|------|----------|
| 偏航 | maxSteps 无 tool_calls | golden + Plan 节点 |
| 假执行/过长 | 无 HTTP audit / >2k | truncate + 对账 |
| 记忆过载 | session tokens 涨 | memory TTL |
| 无降级 | 429→503 | 熔断链 |
