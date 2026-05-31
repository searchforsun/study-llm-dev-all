# Demo：观测与调试

对应章节：[观测与调试](../../index.html#ch-advanced-03-obs)

## 目标
为 Agent 添加结构化日志和 Micrometer 埋点。

## 操作步骤
1. 在 Agent 执行中添加 StepRecord 日志（MDC 注入 request_id）
2. 添加 Micrometer 埋点记录步数和 Token 消耗
3. 配置 Prometheus 暴露 metrics 端点
4. 按 request_id 实现一次 Prompt 回放

## 验收
能按 request_id 搜索到 Agent 的完整执行轨迹。

## 练习
列出 Agent Trace 中必须包含的 5 个字段并说明各自用途。
