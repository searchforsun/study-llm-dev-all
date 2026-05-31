# Demo：检索监控实验

**章节**：[../../index.html#ch-practice-04-monitoring]检索监控

## 目标

为 Spring 搜索服务添加 Micrometer 埋点，配置 Prometheus 采集和 Grafana 展示，设置 4 条告警规则。

## 实验内容

1. **Micrometer 埋点**：在 Spring 搜索方法中添加 Timer（延迟）、Counter（搜索次数/空结果/错误）三种埋点。
2. **Prometheus 采集**：配置 Spring Actuator 暴露 `/actuator/prometheus`，Prometheus 抓取指标。
3. **Grafana 看板**：创建看板包含 4 个面板——延迟 P50/P95/P99、空结果率、QPS 按 tenant、错误率。
4. **告警规则**：在 Prometheus 中配置 3 条告警规则（延迟 > 200ms、空结果率 > 5%、错误率 > 0.1%）。
5. **补充告警阈值**：在 `alert-rules.yaml` 中补充一条你认为重要的告警（如索引新鲜度或 QPS 超限）。

## 验收标准

- `/actuator/prometheus` 返回 `retrieval_search_latency_seconds_*` 指标。
- Grafana 看板至少 4 个面板，展示实时数据。
- 告警规则中至少 4 条（含补充的那条）。

## 延伸

模拟 Milvus 宕机场景，观察延迟和错误率指标的实时变化。
