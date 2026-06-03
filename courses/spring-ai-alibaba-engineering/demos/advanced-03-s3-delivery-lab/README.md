# Demo：CorpAssist S3 交付清单

对应章节：[CorpAssist S3 交付清单](../../index.html#ch-advanced-03-s3-delivery)

**Workbench**：[`../corpassist-saa-workbench/`](../corpassist-saa-workbench/) — stub 冒烟 + Admin DSL 样例

## 文件

| 文件 | 用途 |
|------|------|
| `delivery-checklist.md` | Layer 1 四层交付 + 指标 + 四坑飞轮 |

## 练习

1. 逐项勾选 `delivery-checklist.md`，为每项填写「证据链接」占位（如 `CI#123`、`Grafana/dashboard/s3`）。
2. 画 S1/S2/S3 路由图（共享 VectorStore，隔离 write Tool）。
3. 虚构 3 条 Badcase JSON（含 pitfall 标签与 fix）。
4. 对照 [scenario-java-agent-automation](../../../scenario-java-agent-automation/index.html) 与 [agent-orchestration-java](../../../agent-orchestration-java/index.html) 补集成项。
5. 准备 Layer 3 面试：TOP5 题 + 1 个 STAR + 1 个 pitfall defense。

## 验收

- [ ] checklist 四层 + 场景衔接 + 指标表完整
- [ ] 6 项验收指标有目标值与数据来源
- [ ] Badcase 飞轮图 + 3 条样例
- [ ] 能说明「Demo ≠ 交付」的 3 个反例
