# Demo：幻觉抑制与答案治理

对应章节：[幻觉抑制与答案治理](../../index.html#ch-practice-04-hallucination)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../HallucinationGuard.java` | 幻觉检测守卫 |
| `src/main/java/.../CitationValidator.java` | 引用校验器 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-rag-kb/demos/practice-04-hallucination-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-rag-kb/demos/practice-04-hallucination-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：拒答守卫
实现检索置信度检查，低于阈值时拒绝回答。
```bash
curl http://localhost:8080/ask -d '{"question":"无关问题"}'
```
**验收标准**：低置信度时返回 4xx 状态码和拒答提示。

### 练习 2：引用强制
实现 CitationValidator，确保答案的每个陈述都有来源。
**验收标准**：无引用的陈述被 filter 拦截，最终输出全部包含可验证引用。

### 练习 3：人工复核
将低置信度问答对写入 Redis 复核队列，提供复核 API。
**验收标准**：Redis `review:queue` 中包含待审核条目，支持 approve/reject 操作。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[评测闭环与增量更新](../../index.html#ch-practice-05-eval-loop) · Demo：[评测闭环与增量更新](../practice-05-eval-loop-lab/)
