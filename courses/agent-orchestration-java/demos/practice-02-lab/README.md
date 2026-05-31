# Demo：人在回路与审批

对应章节：[人在回路与审批](../../index.html#ch-practice-02)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../ApprovalService.java` | 审批服务 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/agent-orchestration-java/demos/practice-02-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/agent-orchestration-java/demos/practice-02-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：审批节点
在 Agent 工作流中插入人工审批节点。
**验收标准**：工具调用被暂停等待审批，通过后继续执行。

### 练习 2：中断恢复
实现中断后上下文压缩与恢复。
**验收标准**：恢复时上下文完整，无需用户重复输入。

### 练习 3：审计日志
记录审批操作的审计日志。
**验收标准**：审计日志持久化到数据库，支持查询。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[MCP 协议集成](../../index.html#ch-practice-03) · Demo：[MCP 协议集成](../practice-03-lab/)
