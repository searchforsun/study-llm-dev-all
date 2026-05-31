# Demo：上下文预算分配与文件选择

[章节](../../index.html#ch-basics-02-context)

## 实验目标

1. 为代码补全和问答场景设计 budget split
2. 实现 ContextBudget 验证器
3. 实现三级文件选择策略

## 步骤一：设计 Budget Split

为 32K 问答场景和 10K 补全场景各设计一套预算：

| 层级 | 补全 (10K) | 问答 (32K) |
|------|-----------|-----------|
| System | 1000 | 3200 |
| Cursor | 4000 | 1600 |
| Retrieval | 2500 | 16000 |
| History | 500 | 6400 |
| Tool | 1000 | 3200 |
| Reserve | 1000 | 1600 |

## 步骤二：运行 ContextBudget

```python
budget = ContextBudget("qa")
budget.add("system", "你是一个代码助手...")
budget.add("retrieval", "def calculate_total...")
budget.add("history", "Q: 怎么调用支付? A: 使用...")
result = budget.validate()
print(result)
```

## 步骤三：文件选择验证

使用 Java FileSelector 选择相关文件：

```java
var cursor = new CursorContext("OrderController.java",
    List.of("OrderService", "PaymentClient", "UserRepository"));
List<String> files = selector.selectFiles(cursor, 5);
```

## 验证标准

- 预算检查不溢出
- L1 精确匹配优先选中 import 文件
- L2 语义匹配作为补充
- 文件不超过 maxFiles 限制
