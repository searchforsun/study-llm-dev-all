# Demo：千人千面个性化

对应章节：[千人千面个性化](../../index.html#ch-practice-03-personalize)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../PersonalizeService.java` | 个性化服务 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-content-studio/demos/practice-03-personalize-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-content-studio/demos/practice-03-personalize-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：用户画像 API
实现用户画像 CRUD RestController。
```bash
curl -X POST http://localhost:8080/profile -d '{"userId":"001","industry":"IT"}'
```
**验收标准**：画像数据持久化到 Redis/PostgreSQL，支持查询和更新。

### 练习 2：动态 Prompt 拼装
根据用户画像动态生成 SystemPrompt，实现个性化内容生成。
**验收标准**：不同用户对同一模板生成的内容在风格上有明显差异。

### 练习 3：A/B 测试
设置实验组和对照组，对比个性化效果。
**验收标准**：个性化组通过率提升 >= 10%。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[内容质量评估](../../index.html#ch-practice-04-eval) · Demo：[内容质量评估](../practice-04-eval-lab/)
