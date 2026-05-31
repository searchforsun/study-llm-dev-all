# Demo：内容质量评估

对应章节：[内容质量评估](../../index.html#ch-practice-04-eval)

## 前置
- Python 3.12+, OpenAI API Key

## 实验内容
1. 用 QualityEvaluator 自动打分
2. 查看人工 Rubric 评估维度
3. 对比不同 Prompt 生成的分数差异

## 验收
- 自动评分返回 grammar/coherence/relevance/readability
- 分数随生成质量变化
- 人工 Rubric 维度合理可用

核心文件：`quality_evaluator.py`
