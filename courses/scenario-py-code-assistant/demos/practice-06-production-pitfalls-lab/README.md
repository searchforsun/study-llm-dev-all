# Demo：生产可靠性

对应章节：[生产可靠性](../../index.html#ch-advanced-01-accuracy)

## 前置
- Python 3.12+

## 实验内容
1. 构建评估数据集（EvalCase）
2. 运行基线评估并生成报告
3. 修改 Prompt 后对比基线效果

## 验收
- 评估报告包含准确率/步数/延迟
- 失败案例可逐条查看
- 两次评估结果可对比

核心文件：`eval_dataset.py`, `baseline_eval.py`
