# Demo：S5 内容生成 Prompt 实验室

[返回章节](../../index.html#ch-advanced-06-content-generation)

## 目标

为 CorpAssist S5 内容工作室配置 style_profile、outline 规划、QA gate 与安全规则，理解长文创作 Prompt 的工程化落地。

## 前置

- Python 3.10+
- `pip install pyyaml`（可选，推荐）
- 已阅读本章「风格与结构 Prompt」「质量评估流水线」表

## 步骤

1. 阅读 `style_profile.yaml`，确认 `banned_phrases` 与 `required_blocks`。
2. 打开 `outline-plan.json`，理解 section 级 `target_words` 规划。
3. 对照 `qa-gates.yaml` 五类 gate 与正文阈值。
4. 检查 `content_safety_rules.yaml` 中 PII 规则。
5. 运行验收命令。

## 预期

终端打印 `PASS: S5 pipeline config valid`。

## 验收

验收命令：

```bash
python check_content_pipeline.py
```

期望输出包含 `PASS: S5 pipeline config valid` 且无断言失败。

## 验收清单

- [ ] style_profile 含禁用词与必备块
- [ ] outline ≥4 section 且含 target_words
- [ ] qa-gates 五类 gate 齐全
- [ ] 验收命令通过
