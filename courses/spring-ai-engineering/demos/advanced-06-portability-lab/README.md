# Demo：可移植性与供应商锁定

对应章节：[可移植性与供应商锁定](../../index.html#ch-advanced-06-portability)

基于 `model-migration.md` 扩展为 6 步迁移检查单，并模拟面试答法。

## 步骤

1. 阅读 `model-migration.md`，扩展为含 re-embed 与回滚的 6 步检查单。
2. 列出当前项目所有硬编码 model 名与 api-key 位置（应为零）。
3. 写 60 秒口语答案：「如何降低 LLM vendor lock-in？」

## 验收

- [ ] 迁移检查单含 6 步且每步有「必做回归」列
- [ ] 能对照 Spring ChatModel 与 Python SDK 写一层双栈对照
- [ ] 完成章节测验
