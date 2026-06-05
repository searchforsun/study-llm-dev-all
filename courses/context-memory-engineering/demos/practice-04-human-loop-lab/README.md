# Demo：人在回路与记忆编辑

[返回章节](../../index.html#ch-practice-04-human-loop)

## 目标

实现记忆审批队列、编辑回滚与 append-only 审计日志，验证置信度阈值分流（SQLite/PostgreSQL 生产实现见章节正文；本 lab 为**内存示意**）。

## 前置准备

- Python 3.10+

## 目录

| 路径 | 说明 |
|------|------|
| `human_loop.py` | 审批队列 / 编辑服务 / 审计存储 |
| [`audit-log.md`](audit-log.md) | 审计字段说明 |

## 验收命令

```bash
cd demos/practice-04-human-loop-lab
pip install -r requirements.txt
python -m pytest -q test_human_loop_lab.py
```

期望：5 项测试全绿；高置信自动写入、低置信审批、拒绝不写库、编辑可回滚。

## 步骤（扩展）

1. **ingest**：置信度 ≥0.9 自动写入；否则进入 `pending` 队列。
2. **approve / reject / edit_and_approve**：四种审批路径均写审计。
3. **MemoryEditService**：编辑递增 `version`；`rollback` 恢复上一版本。
4. **AuditLogStore**：仅 `append`，不可修改历史条目。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] 审批队列支持 submit / approve / reject / edit_and_approve
- [ ] 编辑带 version 且可 rollback
- [ ] 审计日志 append-only，含 before/after
