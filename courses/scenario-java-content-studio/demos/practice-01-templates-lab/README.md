# Demo：模板引擎与批量生成（Java）

对应章节：[模板引擎与批量生成（Java）](../../index.html#ch-practice-01-templates)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../TemplateService.java` | 模板生成服务 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-content-studio/demos/practice-01-templates-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-content-studio/demos/practice-01-templates-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：模板引擎
使用 Pebble 模板引擎，实现变量替换。
```bash
curl http://localhost:8080/template/render -d '{"template":"welcome","vars":{"name":"张三"}}'
```
**验收标准**：模板变量正确替换，支持条件分支和循环。

### 练习 2：批量生成
从 CSV 读取数据批量渲染模板，生成文件。
```bash
curl -X POST http://localhost:8080/batch -F 'file=@users.csv'
```
**验收标准**：100 条记录在 30 秒内生成完毕。

### 练习 3：MQ 进度
集成消息队列，实现批量任务进度追踪。
**验收标准**：API 可查询任务进度，支持取消任务。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生成 + 审核流水线](../../index.html#ch-practice-02-pipeline) · Demo：[生成 + 审核流水线](../practice-02-pipeline-lab/)
