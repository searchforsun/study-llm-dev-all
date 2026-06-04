# Agent 与工具 Prompt 实验室

CorpAssist 订单查询 + 工单创建：工具 JSON Schema 与描述 checklist。

## 文件

| 文件 | 说明 |
|------|------|
| `tools.json` | query_order + create_ticket 工具定义 |
| `tool-desc-checklist.md` | 描述规范自检表 |
| `check_tool_desc.py` | 校验 required 字段与 description 长度 |

## 任务

1. 补全 `tools.json` 中 `create_ticket` 的 description 与 category enum。
2. 对照 `tool-desc-checklist.md` 勾选每项。
3. 运行校验脚本。

## 验收命令

```bash
cd demos/practice-02-agent-prompt-lab
python check_tool_desc.py
```

期望输出：`PASS: 2 tools validated`
