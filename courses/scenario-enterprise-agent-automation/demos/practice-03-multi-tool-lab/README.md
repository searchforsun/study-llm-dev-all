# Demo：多工具协作与编排

[章节](../../index.html#ch-practice-03-multi-tool)

## 目标

掌握多工具的并行/串行编排、错误重试和部分失败处理。

## 练习内容

1. **工具编排图**（tool-flow.md）：为「安排会议」场景设计编排流程图，标注串行和并行区域
2. **并行调用实现**：用 Python asyncio 或 Java CompletableFuture 实现并行查询 3 人日历
3. **错误重试演练**：用指数退避重试模拟 3 次失败的邮件调用

## 验收标准

- 编排图中用不同颜色/形状区分串行和并行区域
- 并行查询包含超时控制和结果聚合
- 重试策略使用指数退避（base_delay=1s，multiplier=2）

## 关键概念

- `parallel serial`：无依赖并行、有依赖串行
- `tool retry`：指数退避重试策略
- `partial failure`：部分工具失败不影响已成功的部分
