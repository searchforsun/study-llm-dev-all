# Demo：Micrometer 与可观测

对应章节：[Micrometer 与可观测](../../index.html#ch-advanced-03-micrometer)

对照 `metrics-list.md` 设计 CorpAssist LLM 指标面板与 trace 贯通检查单。

## 步骤

1. 阅读 `metrics-list.md`，标出 requests / tokens / latency 三类指标。
2. 在笔记写一条「从门户 requestId 查到 Python 检索 trace」的排障路径。
3. 说明 cache_hit tag 如何验证 NS3 语义缓存是否生效。

## 验收

- [ ] 能列出 3 个 `corpassist.chat.*` 指标名及用途
- [ ] 能解释 traceparent 与 X-Request-Id 的分工
- [ ] 完成章节测验
