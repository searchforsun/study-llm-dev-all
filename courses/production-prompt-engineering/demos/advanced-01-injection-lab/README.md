# Demo：Prompt 注入攻防实验室

[返回章节](../../index.html#ch-advanced-01-injection)

## 目标

为 CorpAssist 建立可版本化的注入检测规则与回归集，理解四层防护在双栈中的挂载点。

## 前置

- Python 3.10+
- 已阅读本章「攻击类型」「防护层」表

## 步骤

1. 阅读 `guard_rules.yaml`，确认 `rule_id` / `severity` / `action` 字段。
2. 打开 `injection-regression.jsonl`，为每条 case 标注 `attack_vector`。
3. 在本地复制 2 条新 indirect 案例写入 JSONL（保持 `expected_behavior=refuse`）。
4. 运行验收命令，确认 refuse_rate 与 cases passed。

## 预期

终端打印 `refuse_rate=1.0` 与 `4/4 cases passed`（或更多条时比例仍为 1.0）。

## 验收

验收命令：

```bash
python check_injection.py
```

期望输出包含 `refuse_rate=1.0` 且无断言失败。

## 验收清单

- [ ] guard_rules.yaml 含 direct 与 indirect 规则
- [ ] JSONL ≥4 条且均为 refuse
- [ ] 验收命令通过
