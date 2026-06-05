# CorpAssist AI 工具链合规检查清单

| # | 检查项 | 证据 |
|---|--------|------|
| 1 | 供应商 DPA 与零训练 | contracts/dpa-cursor-2026.pdf |
| 2 | 数据驻留区域 | config/llm-gateway-routing.yaml |
| 3 | 密钥未进入 Prompt | reports/gitleaks-latest.sarif |
| 4 | Skill/MCP 来源审批 | registry/approved-skills.json |
| 5 | 审计日志可还原 PR | siem/sample-export.json |
| 6 | 员工培训完成率 | lms/ai-tooling-training.csv |
| 7 | 泄露演练纪要 | docs/security/ai-drills/2026-q2.md |
