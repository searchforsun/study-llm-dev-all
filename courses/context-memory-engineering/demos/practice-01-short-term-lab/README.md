# Demo：工作记忆与会话状态

[返回章节](../../index.html#ch-practice-01-short-term)

## 目标

使用 Python 写入、Java 读取同一 Redis session key（`corpassist-session-v1` JSON），验证双栈共享会话连续性。完整 Spring AI / LangChain 集成见章节正文；本 lab 提供**可运行最小契约**。

## 前置准备

- Python 3.10+
- JDK 17+、Maven 3.9+（Java 契约测试）
- Redis（可选：`docker compose up -d`）

## 目录

| 路径 | 说明 |
|------|------|
| `session_store.py` | Python 侧 key + JSON schema |
| `dual_stack_lab.py` | 对真实 Redis 的 write/read CLI |
| `test_dual_stack.py` | 离线 pytest（fakeredis） |
| `java-reader/` | Java 解析同一 JSON 的 `mvn test` |
| [`session-key.md`](session-key.md) | key 约定速查 |

## 验收命令

**离线（无需 Redis）：**

```bash
cd demos/practice-01-short-term-lab
pip install -r requirements.txt
pytest -q test_dual_stack.py
cd java-reader && mvn -q test
```

**联调（需 Redis）：**

```bash
docker compose up -d
export CORPASSIST_REDIS_URL=redis://localhost:6379/0
python dual_stack_lab.py write
python dual_stack_lab.py read
cd java-reader && mvn -q test
```

期望：`pytest` 全绿；`read` 输出含订单 `20240501`；`mvn test` 通过契约测试。

## 步骤（扩展）

1. **Python 写入**：`dual_stack_lab.py write` 向 `corpassist:session:acme_corp:user_9527` 写入 3 轮对话，TTL 24h，窗口最多 8 轮。
2. **Java 读取**：`SessionMessages.parse` 解析 Python JSON（生产环境接 Spring `ChatMemoryRepository`）。
3. **双栈验证**：Python `read` 与 Java 测试均能看到相同订单上下文。
4. **TTL**：`test_dual_stack.py::test_ttl_set_on_save` 验证 `EX` 已设置。

## 验收清单

- [ ] 离线 pytest 套件通过（见上方验收命令）
- [ ] java-reader 目录 mvn test 通过
- [ ] （可选）Redis 联调 `write` + `read` 通过
- [ ] 理解单一写入方与统一 JSON schema 的必要性
