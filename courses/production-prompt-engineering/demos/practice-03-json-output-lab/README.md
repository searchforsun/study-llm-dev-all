# 结构化输出 Prompt 实验室

CorpAssist IT 工单 JSON Schema 校验与样例。

## 文件

| 文件 | 说明 |
|------|------|
| `ticket-schema.json` | 工单 JSON Schema |
| `sample-valid.json` | 合法样例 |
| `sample-invalid.json` | 故意违规样例 |
| `validate_ticket.py` | Schema 校验脚本 |

## 任务

1. 阅读 `ticket-schema.json` 理解 enum 与 required。
2. 运行校验脚本分别验证 valid/invalid 样例。
3. 修正 `sample-invalid.json` 直至 PASS（练习用）。

## 验收命令

```bash
cd demos/practice-03-json-output-lab
python validate_ticket.py sample-valid.json
```

期望输出：`PASS`
