# Demo：Spring AI 问答编排

对应章节：[Spring AI 问答编排](../../index.html#ch-practice-02-qa-spring)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../QAController.java` | 问答 API 控制器 |
| `src/main/java/.../RagService.java` | RAG 服务层 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-rag-kb/demos/practice-02-qa-spring-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-rag-kb/demos/practice-02-qa-spring-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：问答 API 实现
实现 Spring 控制器，通过 VectorStore + QuestionAnswerAdvisor 构建问答端点。
```bash
curl http://localhost:8080/ask -d '{"question":"什么是 RAG？"}'
```
**验收标准**：返回非空答案，包含 `citations` 引用数组。

### 练习 2：流式 SSE
将端点改造为 SSE 流式响应。
```bash
curl -N http://localhost:8080/ask/stream -d '{"question":"RAG 原理"}'
```
**验收标准**：响应以 `data:` 前缀逐字输出。

### 练习 3：引用溯源
配置 Advisors 链，在答案中嵌入引用标记并返回源文档。
**验收标准**：答案格式如 `RAG 是一种模式[1][2]`，响应包含 `citations` 数组。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[混合检索 + Rerank 联调](../../index.html#ch-practice-03-hybrid-rerank) · Demo：[混合检索 + Rerank 联调](../practice-03-hybrid-rerank-lab/)
