# Demo：RAG 评测实战

对应章节：[RAG 评测实战](../../index.html#ch-practice-04-rag-eval)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/test/java/.../RagEvalTest.java` | 评测集成测试 |
| `src/main/resources/test-dataset.json` | 评测数据集 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/rag-system-java/demos/practice-04-rag-eval-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/rag-system-java/demos/practice-04-rag-eval-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：Spring 集成测试
编写 Spring Boot 集成测试，对 RAG 管线进行端到端评测。
```bash
mvn test -Dtest=RagEvalTest
```
**验收标准**：测试覆盖问答流程，输出 success/failure 统计。

### 练习 2：RAGAS 指标计算
集成 Python RAGAS 命令行工具或 Java 实现，计算评测指标。
```bash
python -m ragas evaluate --dataset test_dataset.json
```
**验收标准**：Faithfulness > 0.8，Answer Relevancy > 0.9。

### 练习 3：双栈对照
在 Java 和 Python 中使用相同数据集运行评测，对比结果。
**验收标准**：同一问题在双栈上的答案质量评分差异 < 10%。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

