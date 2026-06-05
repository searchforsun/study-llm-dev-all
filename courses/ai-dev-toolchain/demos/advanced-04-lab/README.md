# Demo：企业 AI 工具链安全与合规

对应章节：[企业级 AI 工具链安全与合规](../../index.html#ch-advanced-04)

## 目标

配置 `.cursorignore`、填写合规检查清单，并说明审计字段如何与 `request_id` 关联。

## 步骤

1. 复制 `.cursorignore.example` 为 `.cursorignore`
2. 打开 `docs/ai-compliance-checklist.md`，为至少 3 项填写证据路径
3. 阅读 `audit-event.example.json`，补全 `request_id` 与 `prompt_sha256`
4. 列出 1 条 Coder 公有云 + Judge 私有混用的风险（纸面）

## 验收

- [ ] `.cursorignore` 排除 `.env`、`secrets/`、`data/customers/`
- [ ] 合规清单 ≥3 项有证据路径
- [ ] `audit-event.example.json` 字段完整

## 验收命令

```bash
test -f .cursorignore
grep -c "证据" docs/ai-compliance-checklist.md
```
