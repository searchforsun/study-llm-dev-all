# Demo：百炼安全与合规治理

对应章节：[百炼安全与合规治理](../../index.html#ch-practice-05-bailian-governance)

## 文件

| 文件 | 用途 |
|------|------|
| `ram-accounts.md` | dev/staging/prod-online/prod-batch 子账号权限表 |
| `key-rotation-runbook.md` | Key 轮换四阶段与回滚条件 |
| `governance-checklist.md` | 上线前 RAM/配额/多租户勾选清单 |

## 练习

1. 填写 `ram-accounts.md` 四类子账号的最小权限策略（Custom Policy 要点即可）。
2. 在 `key-rotation-runbook.md` 补全 T0–T3 与验证命令。
3. 设计 Micrometer tag：`tenant`、`scene`、`model`、`agent_version`。
4. 画多租户数据流：Gateway JWT → VectorStore filter → cost 报表。

## 验收

- [ ] RAM 表 4 行完整，在线/批处理 Key 分离
- [ ] 轮换 runbook 含双 Key 重叠窗口与回滚
- [ ] 配额审计三层（百炼账单 / Micrometer / Trace）已说明
- [ ] 多租户链路透传 tenantId，Studio 禁止直连 prod
