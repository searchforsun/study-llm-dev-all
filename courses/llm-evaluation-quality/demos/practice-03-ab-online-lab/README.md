# Demo：线上 A/B 与灰度

[章节](../../index.html#ch-practice-03-ab-online)

## 内容
- `experiment.yaml` — A/B 实验配置
- `traffic_split_demo.py` — 分流实现

## 验收标准
1. yaml 含 variants + guardrails
2. Python 分流代码可运行

## 操作步骤
1. 编辑 experiment.yaml 填写 variants 权重
2. 运行 `python traffic_split_demo.py` 测试分流
3. 写 2 条 guardrail 条件
