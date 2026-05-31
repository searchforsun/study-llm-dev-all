# Demo：RAGAS 与自动评测

[章节](../../index.html#ch-basics-03-ragas)

## 内容
- `ragas_eval_demo.py` — RAGAS 评测脚本

## 验收标准
1. 能生成 eval_report.json 文件
2. 能解释每项指标含义

## 操作步骤
1. 配置 OPENAI_API_KEY 环境变量
2. 运行 `python ragas_eval_demo.py`
3. 阅读生成的 eval_report.json
4. 修改 temperature 参数，观察指标变化
