# Demo：指标：准确、召回、忠实、延迟

[章节](../../index.html#ch-basics-01-metrics)

## 内容
- `metrics-schema.json` — 双栈共用指标 schema
- 编辑该文件，为 S1 制度问答填写可接受阈值

## 验收标准
1. aggregate 字段含 ≥5 个指标键（faithfulness, answer_relevancy, context_recall, citation_rate, refusal_correct_rate）
2. latency 字段含 p95_ms
3. README 中写明两条业务解释

## 操作步骤
1. 阅读 schema 各字段含义
2. 调整 thresholds 中的阈值（根据 S1 业务要求）
3. 运行 `python validate_schema.py` 检查格式
