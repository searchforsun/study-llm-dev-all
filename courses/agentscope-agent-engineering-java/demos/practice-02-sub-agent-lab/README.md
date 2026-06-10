# Demo：Sub-agent 协作实验室

对应章节：[Sub-agent 多 Agent 协作](../../index.html#ch-practice-02-sub-agent)

## 前置

- JDK 17+
- Apache Maven 3.9+
- 可选：`DASHSCOPE_API_KEY`（无 key 时使用 `--dry-run` mock 模式）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/com/corpassist/subagent/SubAgentDemo.java` | Supervisor spawn 演示 |
| `workspace/subagents/calendar-worker.md` | 日历专家 Markdown 声明 |
| `workspace/subagents/mail-worker.md` | 邮件专家 Markdown 声明 |

## 快速开始

```bash
cd courses/agentscope-agent-engineering-java/demos/practice-02-sub-agent-lab
mvn -q compile
mvn -q exec:java -Dexec.args="--dry-run"
mvn -q exec:java -Dexec.args="--dry-run --background"
```

## 练习

### 练习 1：Markdown 声明
补全 `mail-worker.md` front matter 的 tools 列表。
**验收标准**：spawn mail-worker 时工具名与 Toolkit 注册一致。

### 练习 2：同步 vs 后台
对比默认 spawn 与 `--background` 日志差异。
**验收标准**：后台模式输出 task_id，无阻塞等待。

## 验收

- [ ] `mvn -q exec:java -Dexec.args="--dry-run"` 输出 calendar → mail 顺序 spawn 摘要
- [ ] `--background` 时 mail 任务显示 task_id 而非同步结果
- [ ] `workspace/subagents/*.md` 文件名与 agent_id 一致
- [ ] 完成对应章节测验

## 下一章

[Events + Permissions 与 HITL](../../index.html#ch-practice-03-permissions) · Demo：[practice-03-permissions-lab](../practice-03-permissions-lab/)
