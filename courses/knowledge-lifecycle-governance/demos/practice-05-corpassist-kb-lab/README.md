# Demo：CorpAssist KB 运营台

对应章节：[实战：CorpAssist KB 运营台](../../index.html#ch-practice-05-corpassist-kb)

## 目标

完成 S1 capstone 值班检查清单：quality approve → incremental delete → 看板 KPI 验证。

## 前置

- Bash 或 Git Bash（Windows）
- 已通读 practice 01～04 章及运营台主流程 Mermaid

## 步骤

```bash
cd demos/practice-05-corpassist-kb-lab
# 1. 勾选 console-checklist.md 18 项
# 2. 填写 approve API body（ticket QR-20260530-001）
bash validate_console.sh
```

## 验收

| 命令 | 期望输出 |
|------|----------|
| `bash validate_console.sh` | `PASS: checklist 18/18, workflow ok` |

手动验收：

- [ ] 能列出运营台 5 大模块
- [ ] 说明 governance API 禁止直连 Milvus 的原因
- [ ] reconcile 失败时 block alias switch

## 文件

| 文件 | 用途 |
|------|------|
| `console-checklist.md` | S1 值班与发布 checklist |
| `validate_console.sh` | checklist 完整性校验 |
