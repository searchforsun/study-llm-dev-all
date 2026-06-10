# Agent Service REST/SSE 契约

## POST /v1/chat/stream

| Header | 说明 |
|--------|------|
| X-Tenant-Id | 租户 ID |
| Content-Type | application/json |

### Request

```json
{ "session_id": "s1", "message": "用户输入" }
```

### SSE 事件

| event | data 字段 |
|-------|-----------|
| message | `{ "type": "text", "delta": "..." }` |
| tool_call | `{ "type": "tool_call", "name": "...", "args": {} }` |
| done | `{ "session_id": "s1", "usage": { "tokens": 123 } }` |

### 错误码

| HTTP | 含义 |
|------|------|
| 400 | session_id 缺失 |
| 401 | 租户未授权 |
| 429 | 限流 |
| 500 | Agent 内部错误 |
