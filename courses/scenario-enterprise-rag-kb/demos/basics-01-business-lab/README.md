# Demo：企业知识库场景与 ROI

[章节](../../index.html#ch-basics-01-business)

## 目标
用 ROI 计算器验证企业知识库的投资回报率，画出合规边界三层模型。

## 文件
- `roi_calculator.py` — ROI 计算器脚本
- `compliance_model.py` — 合规边界三层模型生成器

## 验收标准
- 运行 ROI 计算器输出 3 组参数下的 ROI（不同员工数/命中率）
- 画出合规边界三层图（来源合规→访问合规→使用合规）
- 写一段面向 CIO 的 1 分钟 elevator pitch

## 运行
```bash
python roi_calculator.py --employees 1000 --rag_hit_rate 0.85
```
