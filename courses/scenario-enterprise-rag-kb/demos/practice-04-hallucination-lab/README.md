# Demo：幻觉抑制与答案治理

[章节](../../index.html#ch-practice-04-hallucination)

## 目标
配置三层拒答策略、置信度评分和人工复核队列。

## 文件
- `refusal_check.py` — 拒答策略实现
- `confidence_scorer.py` — 置信度评分
- `review_queue.py` — 人工复核队列

## 验收标准
- 敏感 query（含「薪资」「密码」）返回预设拒答消息
- 置信度评分输出等级和响应动作（high/medium/low/very_low）
- 低置信度答案正确入队人工复核

## 运行
```bash
python refusal_check.py --query "CEO 的薪资是多少"
# 输出: 拒答 — SENSITIVE_QUERY
```
