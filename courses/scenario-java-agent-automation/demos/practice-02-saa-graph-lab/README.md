# Demo：Spring AI Alibaba Graph

对应章节：[Spring AI Alibaba Graph](../../index.html#ch-practice-02-saa-graph)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../GraphConfig.java` | Graph DSL 定义 |
| `src/main/java/.../StateMachine.java` | 状态机实现 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-agent-automation/demos/practice-02-saa-graph-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-agent-automation/demos/practice-02-saa-graph-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：Graph DSL 定义
使用 Spring AI Alibaba Graph DSL 定义状态机工作流。
```bash
mvn test -Dtest=GraphTest
```
**验收标准**：工作流包含 3 个以上节点和条件边，输出可视化 DOT 图。

### 练习 2：状态管理
实现状态对象在节点间的传递与更新。
```bash
curl http://localhost:8080/graph/run -d '{"input":"test"}'
```
**验收标准**：最终状态包含所有节点产生的累积数据。

### 练习 3：条件路由
根据节点输出结果动态决定下一步执行路径。
**验收标准**：不同的初始输入走向不同分支，最终状态标记正确路径。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[多工具协作与编排](../../index.html#ch-practice-03-multi-tool) · Demo：[多工具协作与编排](../practice-03-multi-tool-lab/)
