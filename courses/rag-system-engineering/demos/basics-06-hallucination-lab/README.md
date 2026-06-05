# Demo：幻觉治理

对应章节：[幻觉治理](../../index.html#ch-basics-06-hallucination)

调整 `min_score` 阈值并分析对 CorpAssist 回答质量与用户体验的业务影响。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `guard-config.yaml` 中 `min_score` 与 `refusal_template` 的作用
- 能通过调整 `min_score` 在「拒答率」与「幻觉率」之间做权衡
- 能说明阈值变更对 CorpAssist 业务场景（如制度问答）的具体影响

## 步骤

1. 打开 `guard-config.yaml`，阅读当前配置（`min_score: 0.7`，拒答模板「未找到依据」）。
2. 假设 CorpAssist 制度问答出现较多无依据回答，尝试将 `min_score` 调高至 0.85；再假设用户抱怨「明明有制度却总说找不到」，尝试调低至 0.55。
3. 在 `guard-config.yaml` 旁附注或笔记中记录两次调整的业务影响：拒答率变化、幻觉风险变化、用户体验变化。
4. 给出 CorpAssist 制度问答场景的推荐 `min_score` 区间及理由。

## 验收

- [ ] verify.py 验收通过
- [ ] 已调整 `min_score` 并记录对拒答率与幻觉率的影响
- [ ] 能说明阈值变更对 CorpAssist 用户体验的业务影响
- [ ] 完成章节测验
