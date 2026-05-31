# Demo：评测集构建

[章节](../../index.html#ch-basics-02-dataset)

## 内容
- `eval-sample.jsonl` — 评测样本文件

## 验收标准
1. jsonl 文件含 ≥3 条样本
2. 每条含 metadata.intent 字段
3. 至少 1 条拒答样本（requires_refusal=true）

## 操作步骤
1. 参照 JSONL 格式添加 3 条 S1 制度问答
2. 至少包含 1 条拒答题（gold_answer 为「未找到相关制度」）
3. 运行 `python validate_dataset.py` 检查格式
