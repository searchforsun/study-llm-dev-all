# Demo：LangSmith 与 Micrometer

[章节](../../index.html#ch-basics-02-langsmith-mm)

## 目标
配置 LangSmith ↔ Micrometer 双向关联。

## 步骤
1. 在 Java BFF 中添加 Micrometer `llm.client.latency` 埋点
2. 在 Python Agent 中将 request_id 写入 LangSmith metadata
3. 在 Grafana 面板中配置 Data Link 跳转到 LangSmith trace

## 验收标准
- [ ] dashboard-notes.md 含三层看板各 2 个面板名及 PromQL
- [ ] 指标包含 model_id 和 tenant_id 标签
- [ ] 从 Grafana 面板可跳转到 LangSmith
