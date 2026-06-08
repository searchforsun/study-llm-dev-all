# 限界上下文与 API 契约实验室

对应章节：[领域建模、边界上下文与 API 契约](../../index.html#ch-basics-04-domain-api)

本章含**纸面练习** + **可运行代码** `reservation-api-stub/`（Spring Boot 实现 OpenAPI 契约）。

## 可运行 Demo

```bash
cd reservation-api-stub
mvn -q verify

# 启动后验收（另开终端）
mvn spring-boot:run
curl -s -X POST http://localhost:8094/api/v1/reservations \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: demo-key-1" \
  -d '{"orderId":"ord-1","skuId":"sku-laptop-15","quantity":1}'
```

**验收**：HTTP 201；重复同一 `Idempotency-Key` 返回相同 `reservationId`；超量 quantity 返回 409（`SF-INV-409`）。

OpenAPI 参考片段：[`inventory-reservation.yaml`](./inventory-reservation.yaml)

## 目标

- 识别 ShopFlow 三大限界上下文的职责与数据所有权
- 编写最小 OpenAPI 片段（预留库存 + 幂等头）
- 设计统一错误码并判断「跨上下文直接改表」是否可接受

## 练习 1：上下文职责填空

| 上下文 | 核心聚合 | 是否应直接读写 order 表 | 对外集成方式 |
|--------|----------|-------------------------|--------------|
| Order | | | |
| Inventory | | | |
| Payment | | | |

参考答案要点：仅 Order 拥有 order 表；Inventory 通过 API 暴露 reserve；Payment 通过事件通知 Order。

## 练习 2：OpenAPI 片段

本目录已提供：

- YAML 契约：[`inventory-reservation.yaml`](./inventory-reservation.yaml)
- Java 实现：`reservation-api-stub/`（`POST /api/v1/reservations` + `Idempotency-Key`）

至少包含：201 / 409 / 422 响应。

## 练习 3：错误码设计

对照 `ReservationService` 与 `ErrorResponse`：

1. 库存不足 → `SF-INV-409`
2. 重复幂等请求 → 返回同一 `reservationId`（非错误）
3. 参数校验 → `SF-COMMON-422`

## 练习 4：边界审查（判断）

阅读场景：「payment-service 在收到渠道回调后，直接用 JDBC 更新 order 库的 status 字段。」

- 列出 2 个违反本章原则的理由
- 写出推荐替代方案（API 或事件）

## 下一章

完成站点右侧 **basics-04 章节测验** 后，继续 [通信模式：同步、异步与事件驱动](../../index.html#ch-basics-05-communication-patterns)。
