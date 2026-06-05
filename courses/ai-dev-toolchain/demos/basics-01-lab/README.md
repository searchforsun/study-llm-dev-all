# Demo：AI 工具能力矩阵模板

对应章节：[AI 辅助编码工具对比](../../index.html#ch-basics-01)

## 目标

在 CorpAssist Python 团队场景下，对 Cursor / Copilot / Claude Code / Windsurf 做可复现的 POC 打分，产出「1 主 1 备」采购建议。

## 步骤

1. 复制 `tool-matrix-template.csv` 为 `tool-matrix-filled.csv`
2. 按章节「能力矩阵对比」6 维度（多文件编辑、Context、终端 Agent、规则、隐私、企业集成）各打 1～5 分
3. 用同一 Ticket（改 RAG schema + pytest）在 4 工具各试一次，记录耗时与返工次数
4. 填写 `poc-notes.md` 中的隐私与成本栏

## 验收

- [ ] CSV 含 4 工具 × 6 维度分数与权重列
- [ ] 写出 1 条「主选 + 备选」建议及触发条件（如必须 Privacy Mode）
- [ ] `poc-notes.md` 含内网 endpoint 是否进索引的结论

## 验收命令

```bash
# 无代码依赖；检查文件存在即可
test -f tool-matrix-filled.csv && test -f poc-notes.md
```
