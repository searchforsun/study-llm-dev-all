# Session Key 约定

| 项 | 值 |
|----|-----|
| 模式 | `corpassist:session:{tenant}:{user_id}` |
| 示例 | `corpassist:session:acme_corp:user_9527` |
| JSON schema | `corpassist-session-v1` |
| TTL | 86400s（24h） |
| 最大轮次 | 8（超出截断最旧轮次） |

Python 与 Java 须使用相同 key 与 payload 格式，见 `session_store.py` / `java-reader/SessionMessages.java`。
