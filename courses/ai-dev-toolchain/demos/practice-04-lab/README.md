# Demo：CorpAssist 开发效率提升（一周冲刺）

对应章节：[实战：CorpAssist 开发效率提升](../../index.html#ch-practice-04)

## 任务

1. 运行 `scripts/run_rag_eval.py` 查看 baseline hit_rate
2. 用 AI 完善 `app/rag/pipeline.py`（tenant 过滤、空 chunk 过滤）
3. 扩充 `evals/rag_golden.jsonl` 至 20 条
4. 填写 `dev-metrics-template.md` 并对比 AI 辅助前后数据

## 验收

```bash
pip install pytest
pytest tests/ -q
# 期望：2 passed

python scripts/run_rag_eval.py
# 期望：hit_rate >= 0.85（mock 环境）

# 提交 dev-metrics 复盘（复制 template 填写）
```
