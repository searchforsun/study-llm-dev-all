# Demo：性能与成本优化

对应章节：[性能与成本优化](../../index.html#ch-advanced-04-performance)

从性能优化策略清单中选取 1 条，为 CorpAssist RAG 写出预期收益与实施要点。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `perf-tactics.md` 中语义缓存、FAQ 小模型、预计算 embedding 三类优化策略
- 能为 CorpAssist RAG 选出 1 条最适合当前阶段的性能优化手段
- 能写出所选策略的预期收益（延迟、成本、吞吐）与实施前提

## 步骤

1. 打开 `perf-tactics.md`，阅读三条性能优化策略及其适用场景。
2. 对照 CorpAssist 当前 RAG 负载特征（高频 FAQ 重复查询、embedding 计算成本），评估各策略的收益与实施难度。
3. 选定 1 条优化策略，在 `perf-tactics.md` 末尾补充「CorpAssist 选型」：写明策略名称、预期收益（量化或定性）、实施前提与风险。
4. 思考：语义缓存与 FAQ 小模型是否可以组合使用？组合时的优先级如何？

## 验收

- [ ] verify.py 验收通过
- [ ] `perf-tactics.md` 已选定 1 条优化策略并写明预期收益
- [ ] 能说明所选策略的实施前提与潜在风险
- [ ] 完成章节测验
