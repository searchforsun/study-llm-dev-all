# Demo：检索、重排与生成

对应章节：[检索、重排与生成](../../index.html#ch-basics-05-retrieval-gen)

分析 TopK 召回数与最终进入 prompt 的文档条数之间的差异原因。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解检索管线中「召回 → 重排 → 生成」三阶段的数量变化
- 能解释 TopK（召回）与进 prompt 条数不一致的原因
- 掌握重排、去重、token 预算对最终上下文的影响

## 步骤

1. 打开 `retrieval-flow.md`，阅读当前管线描述（召回 20 → 重排 5 → 生成+引用）。
2. 对照章节中 CorpAssist 检索链路，分析为何召回 20 条但仅 5 条进入 prompt：考虑重排截断、相关性阈值、token 预算等因素。
3. 在 `retrieval-flow.md` 末尾补充说明：TopK 与进 prompt 条数的差异原因，以及各阶段各自的优化目标。
4. 思考：若将 TopK 从 20 提高到 50，对延迟与生成质量有何影响？

## 验收

- [ ] verify.py 验收通过
- [ ] 已写出 TopK 与进 prompt 条数差异的原因（含重排/token 等因素）
- [ ] 能说明召回数与最终上下文条数各自的优化目标
- [ ] 完成章节测验
