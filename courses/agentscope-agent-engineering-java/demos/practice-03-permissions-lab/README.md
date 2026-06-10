# Demo：Permissions HITL 实验室

对应章节：[Events + Permissions 与 HITL](../../index.html#ch-practice-03-permissions)

## 前置

- JDK 17+
- Apache Maven 3.9+
- 可选：`DASHSCOPE_API_KEY`（`--dry-run` 模拟审批流）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/com/corpassist/hitl/PermissionsDemo.java` | approve 权限 + CLI 审批 |
| `src/main/java/com/corpassist/hitl/HitlAuditService.java` | audit.jsonl 落盘 |

## 快速开始

```bash
cd courses/agentscope-agent-engineering-java/demos/practice-03-permissions-lab
mvn -q compile
mvn -q exec:java -Dexec.args="--dry-run"
# 交互模式（模拟 MODIFY）
mvn -q exec:java -Dexec.args="--dry-run --modify"
```

## 练习

### 练习 1：分级 Permission
将 query_calendar 设为 ALLOW、send_email 设为 APPROVE。
**验收标准**：仅 send_email 触发待审批事件。

### 练习 2：审计落盘
每次决裁写入 audit.jsonl，含 modified_args。
**验收标准**：MODIFY 后 audit 行含改后 to 字段。

## 验收

- [ ] `--dry-run` 触发 send_email approve 事件
- [ ] `--modify` 后 audit.jsonl 含 modified_args
- [ ] DENY 决裁同样写入 audit.jsonl
- [ ] 完成对应章节测验

## 下一章

[Agentic RAG 集成](../../index.html#ch-practice-04-agentic-rag) · Demo：[practice-04-agentic-rag-lab](../practice-04-agentic-rag-lab/)
