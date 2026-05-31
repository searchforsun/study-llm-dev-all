# Demo：研发效能场景与指标分析

[章节](../../index.html#ch-basics-01-business)

## 实验目标

1. 理解代码补全、仓库问答、Code Review 三种场景的核心指标
2. 使用采纳率分析脚本计算补全场景的采纳率
3. 使用 ROI 计算器估算代码助手的投入产出比
4. 产出一份场景选择报告

## 前置条件

- Python 3.9+ / Java 17
- 示例日志文件（见 `completion_logs.jsonl`）

## 步骤一：采纳率分析

运行以下 Python 脚本分析示例补全日志：

```python
# 示例日志格式
# {"timestamp": "2026-05-30T10:00:00", "language": "java",
#  "accepted": true, "suggestion_length": 45}

from collections import defaultdict
import json

def analyze(log_path):
    stats = defaultdict(lambda: {"total": 0, "accepted": 0})
    with open(log_path) as f:
        for line in f:
            entry = json.loads(line)
            lang = entry["language"]
            stats[lang]["total"] += 1
            if entry["accepted"]:
                stats[lang]["accepted"] += 1

    for lang, s in stats.items():
        rate = s["accepted"] / s["total"] * 100
        print(f"{lang}: {rate:.1f}% ({s['accepted']}/{s['total']})")

analyze("completion_logs.jsonl")
```

**预期输出**：总体采纳率 ≥ 30%，Java 和 Python 分别列出。

## 步骤二：ROI 计算

使用 Java ROI 计算器填入你的团队参数：

```java
var metrics = new CodeAssistantROI.ROIMetrics(
    500,            // 开发者数量
    18,             // 人均日节省分钟数
    80000,          // 月许可证成本
    150.0           // 平均时薪
);
System.out.println(metrics.report());
```

## 步骤三：场景选择报告

根据以下模板产出场景选择报告：

| 维度 | 选择 | 理由 |
|------|------|------|
| 第一场景 | 代码补全 | 采纳率≥30% 验证模型质量 |
| 第二场景 | 仓库问答 | 需要先建代码索引 |
| 第三场景 | Code Review | 需要集成 Git 流程 |

## 验证标准

- Python 脚本输出合法采纳率百分比
- ROI 计算器输出月节省时间和 ROI
- 场景选择报告包含至少 3 个决策理由
