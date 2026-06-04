# Demo：Prompt 排障面试案例实验室

[返回章节](../../index.html#ch-advanced-07-interview)

## 目标

组装一条完整的 CorpAssist RAG cite 下降 badcase：分析归档、单变量 diff、metric delta 与 STAR-P 答辩稿。

## 前置

- Python 3.10+
- `pip install pyyaml`（可选，metric-delta 解析）
- 已阅读本章「坏例分析」「答题模板」

## 步骤

1. 阅读 `badcase-sample.jsonl` 字段与 `root_cause_tag`。
2. 对照 `prompt-diff.txt` 确认 Single variable 注释。
3. 查看 `metric-delta.yaml` 四项 Δ 与联看指标。
4. 用 `star-p-answer.md` 练习 15 分钟口述。
5. 运行验收命令。

## 预期

终端打印 `PASS: interview case pack valid`。

## 验收

验收命令：

```bash
python check_interview_case.py
```

期望输出包含 `PASS: interview case pack valid` 且无断言失败。

## 验收清单

- [ ] badcase JSONL 含 case_id 与 trace_id
- [ ] prompt-diff 含 cite 单变量改动
- [ ] metric-delta cite_coverage delta 为正
- [ ] STAR-P 五段齐全
- [ ] 验收命令通过
