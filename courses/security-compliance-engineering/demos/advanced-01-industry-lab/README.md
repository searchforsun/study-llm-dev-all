# Demo：行业合规矩阵实验室

[返回章节](../../index.html#ch-advanced-01-industry)

## 目标

将金融/政务控制项映射为可机读的 12 行合规矩阵，供投标与测评抽检。

## 前置

- Node.js 18+

## 步骤

1. 打开 `matrix/fin-gov-controls.json`，为 `FIN-04`、`GOV-03` 补全 `evidence` 字段。
2. 运行 `node validate-matrix.mjs`，确保 12 条控制项均有 `id`、`industry`、`control`、`evidence`。
3. 在 `notes.md` 写 3 条「金融 vs 政务」差异要点（各 1 句）。

## 验收命令

```bash
cd demos/advanced-01-industry-lab
node validate-matrix.mjs
```

期望输出：`PASS: 12 controls mapped`

## 验收清单

- [ ] 控制台输出 `PASS: 12 controls mapped`
- [ ] JSON 中无空 `evidence`
- [ ] notes.md 含 3 条差异要点
