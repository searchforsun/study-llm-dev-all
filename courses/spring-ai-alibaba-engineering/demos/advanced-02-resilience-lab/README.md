# Demo：容灾、限流与降级

对应章节：[容灾、限流与降级](../../index.html#ch-advanced-02-resilience)

## 目标
为 ChatModel 添加 Resilience4j 熔断保护。

## 操作步骤
1. 添加 `spring-cloud-starter-circuitbreaker-resilience4j` 依赖
2. 在 ChatModel 调用上添加 `@CircuitBreaker` 注解
3. 实现 fallbackMethod 切换备选模型（qwen-plus → qwen-turbo）
4. 配置语义缓存

## 验收
模拟 DashScope 限流后 Agent 自动降级到备选模型。

## 练习
写一段话说明 fallback 触发条件及相关场景（什么情况下主模型会降级）。
