# Demo：意图识别与路由（Java）

对应章节：[意图识别与路由（Java）](../../index.html#ch-practice-01-intent-router)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../IntentClassifier.java` | 意图分类器 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-customer-service/demos/practice-01-intent-router-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-customer-service/demos/practice-01-intent-router-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：规则分类器
实现基于关键词/正则的规则意图分类器。
```bash
mvn test -Dtest=IntentClassifierTest
```
**验收标准**：常见客服意图（退款/改址/咨询）识别准确率 > 80%。

### 练习 2：LLM 分类器
使用 LLM 作为意图分类器，处理规则无法覆盖的边界情况。
**验收标准**：双校验（规则+LLM）一致则直接路由，不一致时标记待确认。

### 练习 3：兜底路由
实现兜底策略，无匹配意图时路由到通用问答或人工客服。
**验收标准**：兜底逻辑返回友好提示，不抛出异常。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[工具调用：订单/退款/改址](../../index.html#ch-practice-02-tools) · Demo：[工具调用：订单/退款/改址](../practice-02-tools-lab/)
