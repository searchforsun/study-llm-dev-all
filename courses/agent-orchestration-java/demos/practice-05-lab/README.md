# Demo：实战：CorpAssist 办公 Agent

对应章节：[实战：CorpAssist 办公 Agent](../../index.html#ch-practice-05)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../DemoRunner.java` | 演示入口 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/agent-orchestration-java/demos/practice-05-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/agent-orchestration-java/demos/practice-05-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：端到端演示
运行完整演示，覆盖核心业务场景。
```bash
mvn spring-boot:run
```
**验收标准**：演示覆盖 3 个以上场景，输出详细执行日志。

### 练习 2：步数监控
集成 Micrometer 指标，统计 Agent 步数和 Token 消耗。
**验收标准**：`/actuator/metrics` 暴露 `agent.steps` 和 `agent.tokens` 指标。

### 练习 3：录屏回放
实现场景录制与回放功能。
**验收标准**：录制文件可被回放重现相同执行流程。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

