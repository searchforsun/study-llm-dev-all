# Demo：RAG 模式与架构

对应章节：[RAG 模式与架构](../../index.html#ch-basics-01-rag-pattern)

阅读 CorpAssist RAG 管线骨架，补全 Python 与 Spring 双栈在接入、索引、检索各阶段的分工说明。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 CorpAssist RAG 五阶段管线（接入 → 分块 → 索引 → 检索 → 生成+引用）
- 明确 Python 与 Spring 双栈在各阶段的职责边界
- 能在 `pipeline.md` 中写出可落地的双栈分工条目

## 步骤

1. 打开 `pipeline.md`，阅读现有五阶段管线描述。
2. 对照章节中 CorpAssist 双栈架构图，思考 Python 侧（索引 job、评测脚本）与 Spring 侧（在线查询 API、Advisor 链）各自负责哪些阶段。
3. 在 `pipeline.md` 末尾补一条「双栈分工」说明，标明每个阶段由哪一侧主责、另一侧如何配合。
4. 自检：分工条目是否覆盖索引与在线查询两条链路，且不与章节「单栈包办」反模式冲突。

## 验收

- [ ] verify.py 验收通过
- [ ] `pipeline.md` 已补充双栈分工条目，覆盖接入到生成各阶段
- [ ] 能口头说明 Python 与 Spring 在 RAG 管线中的职责差异
- [ ] 完成章节测验
