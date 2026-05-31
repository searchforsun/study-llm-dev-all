# Demo：Python 服务评测流水线

[章节](../../index.html#ch-practice-01-python-eval)

## 内容
- `test_regression_demo.py` — pytest 评测用例
- `ci-gate.yaml` — 阈值门禁配置

## 验收标准
1. pytest 可运行（mock 即可）
2. report.json 含 git_sha + dataset_version

## 操作步骤
1. 运行 `pytest test_regression_demo.py -m eval -v`
2. 查看生成的 report.json
3. 修改 ci-gate.yaml 中的阈值重新运行
