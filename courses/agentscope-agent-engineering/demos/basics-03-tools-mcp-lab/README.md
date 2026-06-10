# Tool / MCP 实验室

## 目标
实现 CorpAssist 工单 Toolkit，并模拟 MCP 远程工具接入与重试。

## 前置条件
- Python 3.11+ · agentscope
- 可选：`CORPASSIST_MCP_TOKEN`（模拟 MCP 鉴权）

## 练习
1. 实现 `create_ticket` / `query_ticket` 并注册 Toolkit
2. 阅读 `mock_mcp.py` 模拟 MCP list_tools 挂载
3. 为超时工具添加 retry 包装并触发一次失败

## 验收标准
- [ ] 运行 main.py 成功创建工单 ID
- [ ] 模拟 MCP 工具被 Agent 调用一次
- [ ] 无硬编码 API Key

## 参考
- 章节: basics-03-tools-mcp
