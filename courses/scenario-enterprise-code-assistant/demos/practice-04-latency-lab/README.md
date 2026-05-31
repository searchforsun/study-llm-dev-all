# Demo：延迟优化与缓存策略

[章节](../../index.html#ch-practice-04-latency)

## 实验目标

1. 实现语义缓存
2. 实现智能模型路由
3. 设计延迟预算表

## 步骤一：实现语义缓存

```python
cache = SemanticCache(redis_client, embed_model)
cache.set("public User getU", "serById(Long id)")
result = cache.get("public User getUser")
print(f"Cache hit: {result}")
```

## 步骤二：模型路由测试

```java
var router = new ModelRouter(smallModel, mediumModel, largeModel);
var req = new CompletionRequest("user.", "...", 5);
ModelClient model = router.route(req);
// 简单补全 → smallModel
```

## 步骤三：延迟预算表

| 环节 | 补全预算 | 问答预算 |
|------|---------|---------|
| 上下文组装 | < 10ms | < 30ms |
| 检索 | < 30ms | < 100ms |
| 模型 TTFT | < 100ms | < 500ms |
| 生成 | < 50ms | < 2s |
| 网络 | < 20ms | < 100ms |

## 验证标准

- 语义缓存命中率 > 30%
- 简单补全走小模型
- P99 补全 < 500ms
