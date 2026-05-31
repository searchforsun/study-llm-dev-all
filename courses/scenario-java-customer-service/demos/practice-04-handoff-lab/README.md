# Demo：降级与人工转接

对应章节：[降级与人工转接](../../index.html#ch-practice-04-handoff)

## 前置

- JDK 17+（推荐 GraalVM JDK 21）
- Apache Maven 3.9+
- Docker Desktop（用于 Milvus/Qdrant/Redis 等基础设施）
- OpenAI API Key 或 DashScope API Key（通义千问）

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/.../HandoffService.java` | 转接服务 |
| `src/main/resources/application.yml` | Spring Boot 配置文件 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-java-customer-service/demos/practice-04-handoff-lab
mvn clean compile -DskipTests
copy src\main\resources\application-local.yml src\main\resources\application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### macOS / Linux
```bash
cd courses/scenario-java-customer-service/demos/practice-04-handoff-lab
mvn clean compile -DskipTests
cp src/main/resources/application-local.yml src/main/resources/application.yml
docker compose up -d milvus redis
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## 练习

### 练习 1：置信度转接
设置置信度阈值，低于阈值自动创建转接工单。
**验收标准**：低置信度查询触发工单创建，包含完整对话上下文。

### 练习 2：排队管理
实现客服排队系统，支持优先级队列和等待时间预估。
**验收标准**：API 返回排队位置和预估等待时间，VIP 用户自动前置。

### 练习 3：上下文移交
确保人工客服接管时获得完整的对话摘要与历史。
**验收标准**：移交内容包含意图、已尝试方案、对话历史。

## 验收

- [ ] 项目 Maven 编译通过，无依赖冲突
- [ ] Docker Compose 基础设施正常启动
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[客服效果评测](../../index.html#ch-practice-05-eval) · Demo：[客服效果评测](../practice-05-eval-lab/)
