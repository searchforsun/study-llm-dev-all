# 课程 Demo 索引

Java 分布式架构 · ShopFlow 微服务配套练习。

| 章 | 目录 | 可运行工程 | 验收要点 |
|----|------|------------|----------|
| basics-01 | [basics-01-distributed-fundamentals-lab](./basics-01-distributed-fundamentals-lab/) | `partial-failure-lab/` | `mvn verify` + 幂等重试测试 |
| basics-02 | [basics-02-consistency-cap-lab](./basics-02-consistency-cap-lab/) | `read-replica-lab/` | 主从延迟 + CP/AP 测试 |
| basics-03 | [basics-03-architecture-styles-lab](./basics-03-architecture-styles-lab/) | `modular-monolith-lab/` | ArchUnit 边界 + `exec:java` |
| basics-04 | [basics-04-domain-api-lab](./basics-04-domain-api-lab/) | `reservation-api-stub/` | 201/409/422 + 幂等头 |
| basics-05 | [basics-05-communication-patterns-lab](./basics-05-communication-patterns-lab/) | `outbox-demo/` | Outbox 写入 + 异步投递 |
| practice-01 | [practice-01-spring-cloud-bootstrap-lab](./practice-01-spring-cloud-bootstrap-lab/) | `shopflow/` | `mvn install` + health UP |
| practice-02 | [practice-02-discovery-gateway-lab](./practice-02-discovery-gateway-lab/) | `shopflow/` | Eureka 2 应用 UP + Gateway curl |

**basics** 阶段：纯 Java 或轻量 Spring Boot，无 Docker 依赖。  
**practice** 阶段：完整 Spring Cloud 多模块工程。

启动课程站点：`cd courses && npx serve .`（示例课在技能包 `example/` 内）。
