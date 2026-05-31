# Demo：工具调用：订单/退款/改址

对应章节：[工具调用：订单/退款/改址](../../index.html#ch-practice-02-tools)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../AgentConfig.java` | Agent 配置 |
| `src/main/java/.../Tools.java` | 工具定义 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-customer-service/demos/practice-02-tools-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-customer-service/demos/practice-02-tools-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：Agent 配置
配置 Spring AI ReactAgent，注册 2 个以上 @Tool 方法。
```bash
mvn spring-boot:run
```
**验收标准**：Agent 可通过 REST API 调用执行工具操作。

### 练习 2：多步推理
设计需要多步工具调用的任务，验证推理链路。
```bash
curl http://localhost:8080/agent/run -d '{"task":"查询明日日程并邮件通知"}'
```
**验收标准**：Agent 输出完整思考链，包含多步 Thought/Action/Observation。

### 练习 3：审批节点
实现人在回路审批节点，关键操作需要确认后执行。
**验收标准**：工具调用被暂停等待审批，通过后继续执行，拒绝后执行降级。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[Spring AI 客服 Agent](../../index.html#ch-practice-03-agent-dual) · Demo：[Spring AI 客服 Agent](../practice-03-agent-dual-lab/)
