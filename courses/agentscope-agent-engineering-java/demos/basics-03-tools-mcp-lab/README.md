# Tool / MCP 实验室（Java）

## 目标
演示 CorpAssist 工单 @Tool 注册、MCP 模拟挂载与 tools.json allowlist 校验。

## 前置条件
- JDK 17+
- 可选：`CORPASSIST_MCP_TOKEN`（模拟 MCP 鉴权）

## 练习
1. 阅读 `TicketTools.java` 的 @Tool 定义
2. 阅读 `mock_mcp.java` 模拟 MCP list_tools
3. 检查 `tools.json` 中 sendEmail=approve、deleteTicket=deny

## 验收标准
- [ ] 运行脚本成功创建工单 ID
- [ ] 模拟 MCP 工具 kb_search 被调用一次
- [ ] allowlist 拒绝 deleteTicket 并打印 deny 原因

## 参考
- 章节: basics-03-tools-mcp
