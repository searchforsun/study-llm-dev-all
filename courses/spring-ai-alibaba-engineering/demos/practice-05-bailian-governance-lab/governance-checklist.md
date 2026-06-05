# CorpAssist S3 百炼治理上线清单

## RAM 与 Key

- [ ] dev / staging / prod-online / prod-batch 四类子账号已创建
- [ ] 在线与批处理 Key 分离，无共用
- [ ] `AI_DASHSCOPE_API_KEY` 仅来自 Secret Manager，未提交 Git
- [ ] Key 轮换 runbook 已演练（含双 Key 重叠窗口）

## 配额与审计

- [ ] 百炼控制台配额告警已配置（日 Token、QPS）
- [ ] Micrometer tags：`tenant`、`scene`、`model`、`agent_version`
- [ ] Trace 采样：error 全采 + 高步数 Agent 全采
- [ ] 账单与 Trace 可按 tenant 对账

## 多租户

- [ ] Gateway JWT → `X-CorpAssist-Tenant` 透传
- [ ] VectorStore metadata filter 含 `tenant`
- [ ] Admin Studio 禁止直连 prod（只读 staging）
- [ ] 跨 tenant 访问尝试有审计日志
