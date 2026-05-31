# Demo：生产坑：承诺、审核与记忆

对应章节：[生产坑：承诺、审核与记忆](../../index.html#ch-practice-06-production-pitfalls)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../PitfallScenario.java` | 生产坑复现 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-content-studio/demos/practice-06-production-pitfalls-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-content-studio/demos/practice-06-production-pitfalls-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：问题复现
运行含典型生产问题的代码，观察异常行为。
```bash
mvn test -Dtest=PitfallScenarioTest#testDirtyPdf
```
**验收标准**：问题被稳定复现，日志输出错误详情。

### 练习 2：修复验证
切换到修复方案，验证问题被正确解决。
```bash
mvn test -Dtest=PitfallScenarioTest#testDirtyPdfFixed
```
**验收标准**：修复后管线正常运行，输出符合预期。

### 练习 3：避坑清单
基于实践生成可复用的生产部署清单。
**验收标准**：`checklist.md` 包含 5 条以上经验证的最佳实践。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

