# Demo：准确率评估与效能数据

[章节](../../index.html#ch-advanced-01-metrics)

## 实验目标

1. 构建企业代码评估集
2. 运行 CodeEvalExecutor 计算准确率
3. 分析多维度采纳率

## 步骤一：运行评估

```python
dataset = [
    {"prefix": "public int add(int a, int b) {\n  ",
     "suffix": "\n}", "expected": "return a + b;",
     "language": "java"},
    {"prefix": "def hello(name):\n    ",
     "suffix": "", "expected": "print(f'Hello, {name}')",
     "language": "python"},
]
executor = CodeEvalExecutor(dataset)
results = executor.evaluate_completion(model_client)
print(f"Avg Edit-Similarity: {results['avg_edit_similarity']:.2%}")
print(f"Exact Match: {results['exact_match_rate']:.2%}")
```

## 步骤二：采纳率分析

```java
var analyzer = new AcceptanceAnalyzer(logRepo);
var report = analyzer.analyze(LocalDate.now().minusDays(30),
                              LocalDate.now());
System.out.println("Overall: " + report.overallRate());
System.out.println("Java: " + report.languageRates().get("java"));
```

## 步骤三：对比表

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 采纳率 | 18% | 34% | +16pp |
| 补全 P50 | 320ms | 85ms | -73% |

## 验证标准

- 评估输出 Edit-Similarity 和 Exact Match
- 采纳率按语言维度可分析
- 对比表包含 Before/After 数据
