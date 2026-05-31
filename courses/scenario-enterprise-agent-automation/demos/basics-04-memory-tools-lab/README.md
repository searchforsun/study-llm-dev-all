# Demo：记忆与工具生态

[章节](../../index.html#ch-basics-04-memory-tools)

## 目标

掌握 Agent 记忆分层设计、MCP 工具集成和权限控制。

## 练习内容

1. **MCP 工具列表**（mcp-list.md）：列出 3 个办公 MCP Server 的配置（日历、邮件、工单），包含工具契约定义
2. **记忆分层实现**：用 Redis 实现一个滑动窗口短期记忆（max 20 轮），自动摘要归档
3. **权限矩阵设计**：为 3 个角色（员工、经理、HR）设计工具权限矩阵

## 验收标准

- MCP 配置包含 server 名称、command、args 和 env 变量
- 记忆实现包含短期窗口、摘要归档和长期存储三个层级
- 权限矩阵至少覆盖 3 种角色 × 5 种工具

## 关键概念

- `short long memory`：短期会话窗口 + 长期用户偏好 + 摘要归档
- `mcp eco`：MCP 协议标准化的企业工具集成
- `tool permission`：按角色分层的工具授权
