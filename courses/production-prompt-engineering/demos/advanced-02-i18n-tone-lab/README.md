# Demo：语气合规多语言实验室

[返回章节](../../index.html#ch-advanced-02-i18n-tone)

## 目标

配置 CorpAssist tone-matrix 与 regulated-disclaimer，并用脚本校验 disclaimer 命中率与 locale 一致性。

## 前置

- Python 3.10+
- 已阅读本章「品牌语调」「合规话术」表

## 步骤

1. 打开 `tone-matrix.json`，为 web/im 渠道各补一条样本。
2. 确保每条 `disclaimer` 非空且与 locale 匹配。
3. 在 Prompt 草稿中引用 matrix 的 `channel` 字段做变量注入。
4. 运行验收命令查看 `disclaimer_hit` 与 `locale_consistency`。

## 预期

`disclaimer_hit=1.0` 且 `locale_consistency>=0.95`。

## 验收

验收命令：

```bash
python check_tone_compliance.py
```

## 验收清单

- [ ] tone-matrix 含 ≥3 条样本
- [ ] 每条含 disclaimer
- [ ] 验收命令通过
