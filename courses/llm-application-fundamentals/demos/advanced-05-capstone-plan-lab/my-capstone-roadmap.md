# 我的 CorpAssist 毕业路线图（从 `milestone-roadmap.md` 复制后填写）

| 里程碑 | 目标 | 计划完成 |
|--------|------|----------|
| M0 | 双栈冒烟 + 环境变量契约 | 2026-W24 |
| M1 | S1 最小 RAG（100 篇文档） | 2026-W26 |
| M2 | 评测集 v1 + 引用溯源 | 2026-W28 |
| M3 | Spring 生产接入 + 网关 | 2026-W30 |
| M4 | 可观测仪表盘 + 告警 | 2026-W32 |
| M5 | scenario-enterprise-rag-kb 答辩材料 | 2026-W34 |

## 交付物勾选（对照 `deliverables-checklist.md`）

### Python 栈

- [ ] rag-service 最小检索 API
- [ ] doc-ingest 流水线（100 篇）
- [ ] eval golden set v1

### Spring 栈

- [ ] corpassist-bff SSE 契约
- [ ] llm-gateway 统一计量
- [ ] dialog-orchestrator RAG 编排

## 发版门禁（对照 `capstone-release-gates.yaml`）

- [ ] 评测通过率 ≥ 基线 −2%
- [ ] P95 端到端 < 3s（S1）
- [ ] L3 数据零出网审计事件
