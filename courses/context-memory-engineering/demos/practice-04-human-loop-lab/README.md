# Demo：人在回路与记忆编辑

[返回章节](../../index.html#ch-practice-04-human-loop)

## 目标

实现记忆审批队列、记忆编辑服务和 append-only 审计日志，确保关键事实写入前经过人工审核。

## 前置准备

- Python 3.8+ 或 JDK 17+
- SQLite 或 PostgreSQL

## 步骤

1. **实现 MemoryApprovalQueue**：支持提交审批（submit_for_review）、批准（approve）、拒绝（reject）、编辑后批准（edit_and_approve）四种操作。置信度 >= 0.9 自动写入，低于 0.9 进入审批队列。

2. **实现 MemoryEditService**：支持事实编辑和回滚。每次编辑保留版本号，记录 before/after 内容。

3. **实现 AuditLogStore**：Append-only 审计日志，包含 event_type、fact_id、before_content、after_content、operator、reason、created_at。

4. **完整流程测试**：LLM 提取事实（置信度 0.75）→ 进入审批队列 → 管理员审核批准 → 写入长期记忆 → 审计日志记录全部操作。

## 预期输出

高置信度事实自动写入。低置信度事实进入审批。编辑后保留版本历史。审计日志不可篡改。

## 验收清单

- [ ] 审批队列支持 4 种操作
- [ ] 记忆编辑带版本号
- [ ] 审计日志 append-only
- [ ] 完整流程端到端通过
