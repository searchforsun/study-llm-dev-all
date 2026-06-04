# Demo：安全案例面试实验室

[返回章节](../../index.html#ch-advanced-04-interview)

## 目标

产出两份可答辩的面试稿（注入五步法 + PII 事件 STAR），并通过结构校验。

## 前置

- Node.js 18+

## 步骤

1. 在 `scripts/injection-five-step.md` 填写五步法口述稿（含量化数字与控制项 ID）。
2. 在 `scripts/pii-star.md` 填写 STAR 稿，并列出 3 个证据附件文件名。
3. 运行 `node check-interview-docs.mjs`。

## 验收命令

```bash
cd demos/advanced-04-interview-lab
node check-interview-docs.mjs
```

期望输出：`PASS: 2 scripts ready`

## 验收清单

- [ ] 两份 markdown 各 ≥ 400 字符
- [ ] injection 稿含 `CTRL-` 或 `OWASP`
- [ ] pii 稿含 `STAR` 或四段标题
- [ ] 校验脚本输出 PASS
