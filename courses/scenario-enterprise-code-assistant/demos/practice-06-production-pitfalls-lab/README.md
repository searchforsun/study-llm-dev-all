# Demo：生产坑排查与诊断

[章节](../../index.html#ch-practice-06-production-pitfalls)

## 实验目标

1. 使用 TokenExplosionDetector 诊断爆窗风险
2. 分析 FIM/微调适用场景
3. 设计工具调用防死循环方案

## 步骤一：检测 Token 爆炸

```python
detector = TokenExplosionDetector(max_context=32000)
prompt_parts = {
    "system": "你是一个代码助手...",
    "retrieval": "class UserService... " * 100,
    "history": "Q: 怎么... A: 使用... " * 20,
}
result = detector.analyze_request(prompt_parts)
for risk in result["risks"]:
    print(f"风险: {risk}")
print(f"总使用率: {result['usage_pct']}%")
```

## 步骤二：技术决策表

为以下场景选择 FIM+RAG 还是微调：

| 场景 | 选择 | 理由 |
|------|------|------|
| 日常代码补全 | FIM+RAG | 无训练成本，采纳率 30%+ |
| 企业特有 ORM 框架 | LoRA 微调 | 高频模式，FIM 无法覆盖 |
| 全仓库代码补全 | FIM+RAG | 微调成本高，更新频繁 |

## 步骤三：LSP 验证闭环

画出验证闭环流程图：补全生成 → LSP 诊断 → 编译验证 → 展示/隐藏。

## 验证标准

- Token 爆炸检测正确识别超占比层
- 技术决策表有明确的场景区分依据
- 验证闭环流程图完整
