# Demo：评测闭环与增量更新

对应章节：[评测闭环与增量更新](../../index.html#ch-practice-05-eval-loop)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../IncrementalIndexer.java` | 增量索引服务 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-rag-kb/demos/practice-05-eval-loop-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-rag-kb/demos/practice-05-eval-loop-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：评测集成测试
编写 Spring 集成测试，自动运行 RAG 评测。
```bash
mvn test -Dtest=EvalLoopTest
```
**验收标准**：测试报告包含 Recall/MRR/Faithfulness 指标。

### 练习 2：坏例归因
分析低分案例，定位问题来源。
**验收标准**：归因报告标注问题类别（分块/检索/生成）。

### 练习 3：增量索引
实现 Spring 调度增量索引任务。
**验收标准**：增量索引耗时 < 全量索引的 20%。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生产坑：数据、权限与索引](../../index.html#ch-practice-06-production-pitfalls) · Demo：[生产坑：数据、权限与索引](../practice-06-production-pitfalls-lab/)
