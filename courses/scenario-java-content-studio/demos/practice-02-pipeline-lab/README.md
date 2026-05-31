# Demo：生成 + 审核流水线

对应章节：[生成 + 审核流水线](../../index.html#ch-practice-02-pipeline)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../ReviewController.java` | 审核流程控制器 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-content-studio/demos/practice-02-pipeline-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-content-studio/demos/practice-02-pipeline-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：内容安全审核
实现内容安全审核过滤器，拦截敏感内容。
**验收标准**：敏感内容被标记并触发驳回，安全内容正常通过。

### 练习 2：人工复核 API
实现复核 API，支持审核员查看、审批、驳回内容。
```bash
curl http://localhost:8080/review/pending
```
**验收标准**：API 支持 approve/reject 操作，驳回触发重新生成。

### 练习 3：驳回重写
实现驳回后自动重写，改进生成质量。
**验收标准**：重写后的内容保留上下文，50% 以上驳回通过重写达标。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[千人千面个性化](../../index.html#ch-practice-03-personalize) · Demo：[千人千面个性化](../practice-03-personalize-lab/)
