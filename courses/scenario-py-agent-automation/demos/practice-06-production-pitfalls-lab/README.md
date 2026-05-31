# Demo：生产可靠性

对应章节：[生产可靠性](../../index.html#ch-advanced-01-reliability)

## 前置
- Python 3.12+

## 实验内容
1. 用 retry_with_backoff 装饰器包装不稳定调用
2. 实现熔断器验证 CLOSED-OPEN-HALF_OPEN 切换
3. 设计四级降级方案并编写切换代码

## 验收
- 指数退避重试生效（1s→2s→4s）
- 熔断器 5 次失败后打开，30s 后半开恢复
- 降级策略各层级切换正确

核心文件：`retry_strategy.py`, `circuit_breaker.py`
