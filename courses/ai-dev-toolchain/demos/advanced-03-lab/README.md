# Demo：Model-as-Judge 评分卡

对应章节：[Model-as-Judge 代码质量门禁](../../index.html#ch-advanced-03)

## 目标

编写 5 维 Judge 评分卡，对 `sample.diff` 输出合法 JSON 评分（可用 mock）。

## 步骤

1. 阅读 `config/judge_scorecard.md`，理解 blocker 维度
2. 阅读 `sample.diff`，人工预判各维度 1～5 分
3. 运行 `scripts/mock_judge.py` 生成 JSON 评分文件（脚本写入 lab 根目录）
4. 对比人工与 mock 是否一致（允许 1 维偏差）

## 验收

- [ ] `config/judge_scorecard.md` 含 5 维权重与 blocker 说明
- [ ] 运行 mock 脚本后生成的 JSON 含 weighted_total 与 blockers 数组
- [ ] 记录 1 条误报调优想法（写入 `tuning-notes.md`）

## 验收命令

```bash
python scripts/mock_judge.py
ls judge-output.json
```
