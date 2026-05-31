# Demo：混合检索 + Rerank

对应章节：[混合检索 + Rerank](../../index.html#ch-practice-03-hybrid-rerank)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../HybridRetriever.java` | 混合检索器 |
| `src/main/java/.../RerankService.java` | Rerank 集成 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/rag-system-java/demos/practice-03-hybrid-rerank-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/rag-system-java/demos/practice-03-hybrid-rerank-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：混合检索配置
配置 BM25 + 向量混合检索器，实现 Elasticsearch 与 Milvus 联合检索。
```bash
mvn test -Dtest=HybridRetrievalTest
```
**验收标准**：返回结果同时包含关键词匹配与语义相似结果。

### 练习 2：Rerank 集成
在 Spring 管线中集成 BGE Reranker，对检索结果重新排序。
```bash
curl http://localhost:8080/rerank -d '{"query":"test","docs":[...]}'
```
**验收标准**：Rerank 后 NDCG@5 提升 >= 5%。

### 练习 3：Ablation 对比
通过参数切换进行消融实验，记录 Recall 与延迟变化。
**验收标准**：输出不同检索策略（纯向量/纯BM25/混合/Rerank）的对比报告。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[RAG 评测实战](../../index.html#ch-practice-04-rag-eval) · Demo：[RAG 评测实战](../practice-04-rag-eval-lab/)
