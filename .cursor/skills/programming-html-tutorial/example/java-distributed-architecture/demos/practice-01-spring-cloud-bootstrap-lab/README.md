# ShopFlow 脚手架起步实验室

对应章节：[Spring Boot 3.5 与 Spring Cloud 脚手架](../../index.html#ch-practice-01-spring-cloud-bootstrap)

本目录含**完整可运行** Maven 多模块工程 `shopflow/`，对齐章节 BOM 与模块分层约定。

## 前置条件

- JDK **21**（`java -version`）
- Maven **3.9+**
- 可选：curl 或浏览器

## 快速开始

```bash
cd demos/practice-01-spring-cloud-bootstrap-lab/shopflow
mvn -q -DskipTests install
cd shopflow-order-service
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

Windows PowerShell 若 `mvn` 报 JAVA_HOME 错误：

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
```

## 验收

```bash
# 终端 1：保持 order-service 运行

# 终端 2：
curl -s http://localhost:8081/actuator/health
# 期望 JSON 含 "status":"UP"

curl -s http://localhost:8081/orders/ping
# 期望 {"service":"order-service","status":"ok"}
```

改 `shopflow/shopflow-order-service/src/main/resources/application-local.yml` 中 `server.port` 为 `8082` 后重启，确认新端口 health 仍 UP。

全量编译含单元测试：

```bash
cd shopflow
mvn -q verify
# 期望 BUILD SUCCESS
```

## 目录说明

| 模块 | 说明 |
|------|------|
| `shopflow-common` | 错误码 + JSON 日志（logback-spring.xml） |
| `shopflow-order-api` | DTO 契约（无 Spring 运行时） |
| `shopflow-order-service` | 可启动的 order-service（8081） |
| `shopflow-inventory-*` / `payment-*` | 占位模块，practice-02 起填充 |

## 练习对照

- **理解练习 1～3**：对应上述编译、启动、改端口步骤
- **判断练习**：单模块 vs 多模块 — 参考答案见章节「判断练习」

## 下一章

完成 **practice-01 章节测验** 后，继续 [Eureka + Gateway 本地栈](../practice-02-discovery-gateway-lab/README.md)。
