# Eureka + Gateway 本地栈实验室

对应章节：[服务注册发现与 API 网关](../../index.html#ch-practice-02-discovery-gateway)

本目录含**完整可运行** ShopFlow 多模块工程（含 Eureka、Gateway、order、inventory），可独立编译启动，无需先手动从 practice-01 复制代码。

## 前置条件

- JDK **21**、Maven **3.9+**
- 端口空闲：`8761`（Eureka）、`8080`（Gateway）、`8081`（order）、`8082`（inventory）
- 可选：Docker（仅 discovery-server 容器化）

## 步骤 0：编译

```bash
cd demos/practice-02-discovery-gateway-lab/shopflow
mvn -q verify
# 期望 BUILD SUCCESS（4 个 Spring Boot 模块上下文测试通过）
```

## 步骤 1～4：按顺序启动（4 个终端）

**终端 1 — Discovery**

```bash
cd shopflow/shopflow-discovery-server
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

浏览器打开 http://localhost:8761 确认 Eureka 控制台可用。

**终端 2 — Inventory**

```bash
cd shopflow/shopflow-inventory-service
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

**终端 3 — Order**

```bash
cd shopflow/shopflow-order-service
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

刷新 Eureka，应看到 `INVENTORY-SERVICE`、`ORDER-SERVICE` 各至少 1 个 UP 实例。

**终端 4 — Gateway**

```bash
cd shopflow/shopflow-gateway
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

或使用辅助脚本（Windows）：`.\scripts\start-local.ps1 -Service discovery` 等。

## 验收

```bash
curl -s http://localhost:8080/api/orders/actuator/health
curl -s http://localhost:8080/api/inventory/actuator/health
curl -s http://localhost:8080/api/orders/ping
curl -s http://localhost:8080/api/inventory/ping
```

期望 JSON 含 `"status":"UP"`（health）或 `"status":"ok"`（ping）。

**实例剔除观察**：停止 inventory 进程，等待约 30～90s 后再次 curl inventory 路由，应失败或超时。

## Docker（可选）

仅 Eureka 容器化示例：

```bash
docker compose build discovery-server
docker compose up -d discovery-server
```

业务服务仍建议 Maven 本地启动以便断点调试。

## 模块清单

| 模块 | 端口 | 说明 |
|------|------|------|
| `shopflow-discovery-server` | 8761 | Eureka Server |
| `shopflow-gateway` | 8080 | Spring Cloud Gateway + LoadBalancer |
| `shopflow-order-service` | 8081 | Eureka Client |
| `shopflow-inventory-service` | 8082 | Eureka Client |

Gateway 路由：`/api/orders/**` → `lb://order-service`（StripPrefix=1）；Actuator 经专用路由 StripPrefix=2 转发到 `/actuator/**`。

## 下一章

完成 **practice-02 章节测验** 后，继续 [OpenFeign 与服务间调用](../../index.html#ch-practice-03-sync-calls)。
