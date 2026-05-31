# Demo：内容质量评估

## 目标
实现 LLM-as-Judge 自动评分。

## 文件说明
- `rubric.md` — 五维 Rubric 表
- `README.md` — 本说明

## 操作步骤
1. 设计 5 维 Rubric（品牌一致/事实准确/可读性/合规/创意）
2. 用 LLM-as-Judge 对 5 条文案打分
3. 手动对同样文案评分，比较偏差
4. 录入坏例库

## 验收标准
- [ ] Rubric 各维有评分标准
- [ ] LLM-as-Judge 输出结构化分数
- [ ] 偏差 ≤ 1.0
