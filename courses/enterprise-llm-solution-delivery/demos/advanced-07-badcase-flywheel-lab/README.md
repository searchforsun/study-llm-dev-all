# Demo：坏例复盘与飞轮设计

[返回章节](../index.html#ch-advanced-07-badcase-flywheel)

## 目标

填写 3 条 Bad Case 模板、完成归因与 golden 更新、配置发版门禁。

## 验收标准

- [ ] `badcase-template.md` 含 3 条 BC
- [ ] 每条有 root-cause-4 归因
- [ ] ≥1 条 golden JSON 回归用例
- [ ] gate 阈值 2 项
- [ ] rollback 演练 5 行记录

## 产出物

| 文件 | 说明 |
|------|------|
| `badcase-template.md` | 3 条 BC + 归因 + golden |
| `release-gate-config.yaml` | 门禁阈值配置 |
| `rollback-drill-log.md` | 回滚演练记录 |

## 操作步骤

1. 复制 BC-0412/0418/0425 到模板
2. 为每条标 root-cause-4 层
3. 写 1 条 JSON 回归用例
4. 写 gate 阈值 2 项
5. 写 rollback 演练记录
