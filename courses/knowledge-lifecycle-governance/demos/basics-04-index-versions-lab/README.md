# Demo：蓝绿索引与回滚

[章节](../../index.html#ch-basics-04-index-versions)

## 目标

模拟 HR v3.2 发布窗口，编写 **index reconcile** 与 **index rollback** 操作步骤。

## 步骤

1. 打开 [`rollback-steps.md`](rollback-steps.md)。
2. 写满 4 步回滚：含 alias 切回 blue、Spring refresh、smoke 复测、事件记录。
3. 在下方粘贴一行 reconcile **PASS** 样例（可摘自章节 JSON：`status: PASS`）。

## 验收

- [ ] rollback-steps.md 共 4 步且含 alias 命令或等价操作
- [ ] README 验收区有 reconcile PASS 一行
- [ ] 步骤顺序为：先恢复 alias，再删 green（若需删）

验收人签名与日期：________
