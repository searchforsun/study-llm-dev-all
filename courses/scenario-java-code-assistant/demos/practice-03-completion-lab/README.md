# Demo：补全与生成 Prompt

对应章节：[补全与生成 Prompt](../../index.html#ch-practice-03-completion)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../CompletionService.java` | 补全服务 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-code-assistant/demos/practice-03-completion-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-code-assistant/demos/practice-03-completion-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：FIM 补全
实现 Fill-in-the-Middle 代码补全服务。
**验收标准**：补全结果语法正确，与前后文衔接自然。

### 练习 2：上下文收集
实现代码上下文收集器，提取光标附近的相关代码。
**验收标准**：输出包含导入语句、当前函数签名和前 20 行上下文。

### 练习 3：风格约束
通过 Prompt 约束强制代码风格规范。
**验收标准**：生成代码符合 Google Java Style Guide。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[延迟优化](../../index.html#ch-practice-04-latency) · Demo：[延迟优化](../practice-04-latency-lab/)
