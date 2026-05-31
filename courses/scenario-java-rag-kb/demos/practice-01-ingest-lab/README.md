# Demo：文档接入与索引流水线（Java）

对应章节：[文档接入与索引流水线（Java）](../../index.html#ch-practice-01-ingest)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置，含 Spring AI 依赖 |
| `src/main/java/.../DocumentIngestion.java` | 文档接入与索引流水线 |
| `src/main/java/.../SplitterConfig.java` | 文档分块配置 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-rag-kb/demos/practice-01-ingest-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-rag-kb/demos/practice-01-ingest-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：文档接入管线
配置 Spring DocumentReader 与 Splitter，运行文档接入流水线。
```bash
mvn exec:java -Dexec.mainClass="...DocumentIngestion" -Dexec.args="--input ./docs"
```
**验收标准**：文档被正确读取和分块，Milvus 集合中可查到对应向量数据。

### 练习 2：元数据提取
实现 MetadataExtractor，为文档块提取文件名、标题、页号等元数据。
**验收标准**：每个文档块在向量库中关联 `source`、`page`、`heading` 等标量字段。

### 练习 3：权限标签
为文档块注入 ACL 标签，实现检索层权限过滤。
```bash
mvn test -Dtest=PermissionFilterTest
```
**验收标准**：不同角色的用户检索返回不同数量的结果，权限过滤生效。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[Spring AI 问答编排](../../index.html#ch-practice-02-qa-spring) · Demo：[Spring AI 问答编排](../practice-02-qa-spring-lab/)
