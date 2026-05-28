# Demo：CorpAssist 可观测 SLI 与 Trace

对应章节：[效果、延迟与可观测入门](../../index.html#ch-practice-04-observability-intro)

## 文件

| 文件 | 说明 |
|------|------|
| `sli-dashboard-template.md` | 三条 SLI（P95 / Token / eval）填写模板 |
| `sample-request.log.json` | 与章节一致的示例结构化日志 |
| `promql-snippets.txt` | P95、Token 环比、eval 阈值告警思路 |

## 练习

1. 在 `sli-dashboard-template.md` 为场景 **S1 制度 RAG 问答** 填写 SLI 定义、SLO 目标、告警级别。
2. 打开 `sample-request.log.json`，在纸上画出 Trace：bff → orchestrator → rag → llm。
3. 从 `promql-snippets.txt` 选一条，说明触发 P2 时 on-call 第一步查什么 Span。

## 验收

- [ ] SLI 表三行已填，且 P95 注明 TTFT 或端到端
- [ ] 日志 JSON 字段能对应章节 Mermaid 中 ≥3 个 Span
- [ ] 能口述 eval loop 中「评测不通过则不回滚代码而是回滚 Prompt/索引」
