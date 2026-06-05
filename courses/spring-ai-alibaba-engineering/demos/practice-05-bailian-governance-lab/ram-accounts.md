# CorpAssist 百炼 RAM 子账号权限表（练习模板）

| 环境 | 子账号 | 用途 | 最小权限策略要点 | DashScope Key |
|------|--------|------|------------------|---------------|
| dev | `corpassist-dev-llm` | 开发联调、单测 | `dashscope:CallModel`（限定 dev 模型列表）；禁止生产数据 | 独立 Key，配额低 |
| staging | `corpassist-stg-llm` | 预发回归、golden | 只读 staging 向量库；`dashscope:CallModel` + 账单只读 | 独立 Key |
| prod-online | `corpassist-prod-online` | 门户 Agent 实时路径 | 在线模型白名单；禁止 Batch API；RAM 按 tenant 打标 | **在线专用 Key** |
| prod-batch | `corpassist-prod-batch` | 离线索引、评测压测 | Batch/Embedding 高配额；禁止写门户会话 | **批处理专用 Key** |

## 练习

1. 为每行补全 Custom Policy 中应**拒绝**的动作（如 `DeleteSecret`、`*` on `*`）。
2. 说明为何 online/batch Key 必须分离（429 与成本隔离）。
