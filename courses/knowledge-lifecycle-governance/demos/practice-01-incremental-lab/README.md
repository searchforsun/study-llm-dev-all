# Demo：增量更新与重建

对应章节：[增量更新与重建](../../index.html#ch-practice-01-incremental)

## 目标

模拟 CorpAssist 增量 CDC diff、INDEX_PUBLISHED 事件 schema 与 rebuild 决策表填写。

## 前置

- Python 3.10+
- 已阅读正文「增量管道四步」Mermaid 与 `rebuild.yaml` 片段

## 步骤

```bash
cd demos/practice-01-incremental-lab
# 1. 编辑 incremental-flow.md：标注 delete / upsert 分支
# 2. 运行校验脚本
python validate_incremental.py
```

## 验收

| 命令 | 期望输出 |
|------|----------|
| `python validate_incremental.py` | `PASS: cdc diff ok, event schema ok` |

手动验收：

- [ ] `incremental-flow.md` 含 changed/deleted 两路说明
- [ ] 能写出 delete filter：`doc_id == "..." and index_version == "..."`
- [ ] 能说明 Embedding 变更为何必须 full rebuild

## 文件

| 文件 | 用途 |
|------|------|
| `incremental-flow.md` | 增量四步流程笔记 |
| `validate_incremental.py` | 事件 JSON 与 CDC 字段校验（占位脚本可本地扩展） |
