# Demo：IDE 集成概念验证

对应章节：[IDE 集成概念验证](../../index.html#ch-practice-05-ide-bridge)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../BridgeController.java` | IDE 桥接控制器 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-code-assistant/demos/practice-05-ide-bridge-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-code-assistant/demos/practice-05-ide-bridge-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：桥接服务
实现 JSON-RPC 桥接服务，模拟 IDE 插件通信。
```bash
mvn spring-boot:run
```
**验收标准**：协议涵盖 completion/hover/codeAction 请求。

### 练习 2：路由策略
实现本地/云端路由，简单补全本地处理，复杂问答云端处理。
**验收标准**：本地补全 < 500ms，云端问答流畅。

### 练习 3：隐私过滤
实现代码脱敏，移除敏感信息后发送到云端。
**验收标准**：API Key、密码等敏感信息被正确定位和替换。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生产坑：上下文、FIM 与工具环](../../index.html#ch-practice-06-production-pitfalls) · Demo：[生产坑：上下文、FIM 与工具环](../practice-06-production-pitfalls-lab/)
