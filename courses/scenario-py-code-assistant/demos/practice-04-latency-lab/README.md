# Demo：延迟优化

对应章节：[延迟优化](../../index.html#ch-practice-04-latency)

## 前置
- Python 3.12+

## 实验内容
1. 实现语义缓存（含 LRU 淘汰）
2. 实现模型路由（prefix < 200 chars 用小模型）
3. 测试缓存命中率和延迟指标

## 验收
- 缓存命中时 < 5ms
- 小模型路由约 50ms
- P99 延迟可统计报告

核心文件：`latency_optimizer.py`
