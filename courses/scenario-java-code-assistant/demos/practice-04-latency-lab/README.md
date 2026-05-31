# Demo：延迟优化

对应章节：[延迟优化](../../index.html#ch-practice-04-latency)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../CacheService.java` | 缓存服务 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-code-assistant/demos/practice-04-latency-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-code-assistant/demos/practice-04-latency-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：缓存层
实现 Caffeine/Redis 缓存，减少重复请求延迟。
**验收标准**：缓存命中时响应时间 < 100ms，命中率 >= 30%。

### 练习 2：模型路由
实现路由策略，简单查询使用本地小模型，复杂使用云端大模型。
**验收标准**：70% 简单查询由轻量处理，P99 延迟降低 50%。

### 练习 3：JMeter 压测
使用 JMeter 进行并发压测，记录吞吐量数据。
**验收标准**：100 并发线程时 P99 < 3s，无 5xx 错误。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[IDE 集成概念验证](../../index.html#ch-practice-05-ide-bridge) · Demo：[IDE 集成概念验证](../practice-05-ide-bridge-lab/)
