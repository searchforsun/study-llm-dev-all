# Demo：RAG 评测闭环

对应章节：[RAG 评测闭环](../../index.html#ch-practice-05-eval-loop)

对照评测课所学，从 `eval-result.json` 中选出 2 个 RAG 必看指标并说明关注理由。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `eval-result.json` 中 faithfulness 与 context_recall 等指标的含义
- 能对照评测课程选出 2 个 RAG 评测必看指标
- 掌握指标异常时的排查方向与 CorpAssist 评测闭环流程

## 步骤

1. 打开 `eval-result.json`，阅读当前评测结果（faithfulness 0.88、context_recall 0.84）。
2. 对照章节与评测课内容，理解各指标定义：faithfulness 衡量答案是否忠于检索上下文，context_recall 衡量检索是否覆盖所需信息。
3. 选出 2 个 RAG 评测必看指标，为每个指标写一句「为何必看」及「指标低于阈值时的排查方向」。
4. 思考：若 CorpAssist faithfulness 降至 0.6，应优先检查检索质量还是 prompt 约束？

## 验收

- [ ] verify.py 验收通过
- [ ] 已写出 2 个 RAG 评测必看指标及关注理由
- [ ] 能说明各指标低于阈值时的排查方向
- [ ] 完成章节测验
