# Demo：回归门禁与发布

[章节](../../index.html#ch-advanced-01-regression)

## 内容
- `ci-gate.yaml` — 回归门禁配置
- `baseline.json` — baseline 报告

## 验收标准
1. yaml 含 required_checks + regression config
2. delta 计算代码可运行

## 操作步骤
1. 编辑 ci-gate.yaml 填写 required checks
2. 列出 2 个 required job
3. 解释 baseline pin 存在哪
