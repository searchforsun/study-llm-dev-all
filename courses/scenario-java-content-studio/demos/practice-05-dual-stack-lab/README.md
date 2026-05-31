# Demo：双栈创作 API 联调

对应章节：[双栈创作 API 联调](../../index.html#ch-practice-05-dual-stack)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../DualStackController.java` | 双栈编排控制器 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-content-studio/demos/practice-05-dual-stack-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-content-studio/demos/practice-05-dual-stack-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：Python 客户端
在 Spring 侧配置 WebClient 调用 Python 生成服务。
```bash
curl http://localhost:8080/generate -d '{"prompt":"写一篇通知"}'
```
**验收标准**：Spring 成功调用 Python 服务并返回结果。

### 练习 2：编排逻辑
实现 Spring 编排层，组合多个 Python 服务调用。
**验收标准**：一次编排调用组合了 2 个以上 Python 服务的结果。

### 练习 3：流式贯通
实现 Spring -> Python -> 前端的完整流式链路。
**验收标准**：端到端首字延迟 < 1s。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生产坑：承诺、审核与记忆](../../index.html#ch-practice-06-production-pitfalls) · Demo：[生产坑：承诺、审核与记忆](../practice-06-production-pitfalls-lab/)
