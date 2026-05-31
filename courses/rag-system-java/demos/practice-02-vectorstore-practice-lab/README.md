# Demo：VectorStore 实战

对应章节：[VectorStore 实战](../../index.html#ch-practice-02-vectorstore-practice)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../VectorStoreConfig.java` | 向量存储配置 |
| `src/main/java/.../IndexManager.java` | 索引管理 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/rag-system-java/demos/practice-02-vectorstore-practice-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/rag-system-java/demos/practice-02-vectorstore-practice-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：VectorStore 配置
配置 Spring AI Milvus VectorStore，实现文档写入和相似度搜索。
```bash
mvn test -Dtest=VectorStoreTest
```
**验收标准**：写入 10 条文档后可搜索返回 top-3 相似结果。

### 练习 2：元数据过滤
在检索时添加元数据过滤条件（如按部门过滤）。
```bash
curl "http://localhost:8080/search?query=test&department=engineering"
```
**验收标准**：检索结果仅包含指定部门的文档。

### 练习 3：Python 索引互通
验证 Java 端可检索 Python 端创建的索引，反之亦然。
**验收标准**：跨栈检索结果与同栈检索结果一致。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[混合检索 + Rerank](../../index.html#ch-practice-03-hybrid-rerank) · Demo：[混合检索 + Rerank](../practice-03-hybrid-rerank-lab/)
