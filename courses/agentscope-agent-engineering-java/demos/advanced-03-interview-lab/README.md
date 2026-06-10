# Demo：AgentScope Java 生产排障样例

对应章节：[面试：AgentScope Java 排障](../../index.html#ch-advanced-03-interview)

## 前置

- 熟悉 AgentScope Java Event 日志格式
- 无需启动完整 Agent，对照 Trace JSON 即可

## 文件

| 文件 | 说明 |
|------|------|
| `sample-traces/event-disconnect.json` | SSE 事件流断连样例 |
| `sample-traces/tool-deny.json` | 工具权限拒绝样例 |
| `sample-traces/session-lost.json` | Session Redis 丢失样例 |
| `sample-traces/sub-agent-deadlock.json` | Sub-agent 死锁样例 |
| `diagnose.ps1` | 对样例 Trace 输出排障建议 |

## 验收

- [ ] 运行 `.\diagnose.ps1 event-disconnect` 输出「检查 SSE 超时与 cancellation」
- [ ] 四类样例 JSON 均存在且含 `trace_id`
- [ ] 完成章节测验
