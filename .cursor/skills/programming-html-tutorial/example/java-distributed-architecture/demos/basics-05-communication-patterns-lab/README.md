# 通信模式选型实验室

对应章节：[通信模式：同步、异步与事件驱动](../../index.html#ch-basics-05-communication-patterns)

本章含**纸面练习** + **可运行代码** `outbox-demo/`（Spring Boot + H2，Outbox 模式演示）。

## 可运行 Demo

```bash
cd outbox-demo
mvn -q verify

# 启动后验收
mvn spring-boot:run
curl -s -X POST http://localhost:8095/orders \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ord-async-1","skuId":"sku-1","quantity":1}'
# 等待 ~1s 后
curl -s http://localhost:8095/orders/events
```

**验收**：`createOrder_writesOutbox_andPollerPublishesEvent` 通过；`/orders/events` 含 `OrderCreated` 事件。

## 目标

- 为 ShopFlow 集成点标注同步/异步
- 对比编排与编舞
- 说明 Outbox 与消费端幂等的配合

## 练习 1：集成点选型表

| 集成点 | 推荐模式 | 理由（一句话） |
|--------|----------|----------------|
| order → inventory 预留 | | |
| payment → order 支付结果 | | |
| order → 发送短信通知 | | |

参考答案要点：预留同步；支付结果异步事件；通知异步。

## 练习 2：编排 vs 编舞

用三句话说明 ShopFlow 为何采用「order 编排 + PaymentCompleted 编舞式订阅」混合方案。

## 练习 3：Outbox 草图

对照代码：

- `OrderOutboxService.createOrder` — 同事务写 `orders` + `outbox`
- `OutboxPoller` — 定时「投递」到 `InMemoryEventBus`（代替 Kafka）

## 练习 4：判断（与章节一致）

场景：order 同步阻塞等待 payment 渠道回调 30s。

- 列出 2 个风险
- 写出推荐替代方案

## 下一阶段

完成站点右侧 **basics-05 章节测验** 后，进入 [Spring Boot 3.5 与 Spring Cloud 脚手架](../practice-01-spring-cloud-bootstrap-lab/README.md)。
