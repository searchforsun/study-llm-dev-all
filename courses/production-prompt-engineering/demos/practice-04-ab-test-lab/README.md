# A/B 与迭代流程实验室

CorpAssist Prompt A/B 实验计划与单变量校验。

## 文件

| 文件 | 说明 |
|------|------|
| `ab-plan.yaml` | 实验配置（control/treatment/stages） |
| `prompt-diff.txt` | v2 vs v3 差异摘要 |
| `check_ab_plan.py` | 校验实验配置完整性 |

## 任务

1. 填写 `ab-plan.yaml` 的 experiment 字段。
2. 确保 `prompt-diff.txt` 仅描述一处单变量变更。
3. 运行校验脚本。

## 验收命令

```bash
cd demos/practice-04-ab-test-lab
python check_ab_plan.py
```

期望输出：`PASS: experiment valid`
