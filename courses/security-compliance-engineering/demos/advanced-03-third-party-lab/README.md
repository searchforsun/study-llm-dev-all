# Demo：供应商评估实验室

[返回章节](../../index.html#ch-advanced-03-third-party)

## 目标

对云 LLM 子处理器清单做字段完整性检查，生成 `assessment-report.json`。

## 前置

- Python 3.10+

## 步骤

1. 查看 `cloud-a-subs.json`，故意缺失的字段应在报告中列出 `gaps`。
2. 补全子处理器条目必填字段：`region`、`purpose`、`data_categories`、`dpa_covered`。
3. 运行 `vendor_assessment.py`（见下方验收命令），确认 `"pass": true`。

## 验收命令

```bash
cd demos/advanced-03-third-party-lab
python vendor_assessment.py
```

期望：标准输出含 `"pass": true`，并生成 `assessment-report.json`。

## 验收清单

- [ ] `assessment-report.json` 存在
- [ ] `"pass": true`
- [ ] `gaps` 为空数组
