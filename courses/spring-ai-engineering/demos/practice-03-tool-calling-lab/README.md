# Demo：Function Calling / Tools

对应章节：[Function Calling / Tools](../../index.html#ch-practice-03-tool-calling)

扩展 `ToolWhitelist.md`，为 CorpAssist S3 补充两个工具并填写幂等列。

## 步骤

1. 打开 `ToolWhitelist.md`，阅读现有工具行格式。
2. 新增 `roomBooking`、`submitExpense` 两行（说明 + 幂等/confirm）。
3. 写出 `leaveBalance` 在工号不存在时的 ERROR 回灌示例。

## 验收

- [ ] ToolWhitelist 新增 2 行且幂等列正确
- [ ] 完成章节测验
