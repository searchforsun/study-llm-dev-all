# CAP 取舍与一致级别实验室

对应章节：[CAP、BASE 与一致性模型](../../index.html#ch-basics-02-consistency-cap)

本章含**纸面练习** + **可运行代码** `read-replica-lab/`（纯 Java，演示主从延迟与 CP/AP 分区取舍）。

## 可运行 Demo

```bash
cd read-replica-lab
mvn -q verify          # 4 tests passed
mvn -q exec:java       # 打印主从滞后与 CP/AP 对比
```

**验收**：`readReplica_lagsBehindMaster_afterWrite` 通过；理解写主后读从可能看到旧值。

## 目标

- 为 ShopFlow 关键接口标注分区时的 CP/AP 取向
- 区分强一致、最终一致与客户端「读己之写」
- 理解 fencing token 要解决的问题

## 练习 1：接口 CAP 标注

| 接口 / 场景 | 分区时偏 CP 还是 AP？ | 一句话理由 |
|-------------|----------------------|------------|
| `POST /reserve` 扣库存 | | |
| `GET /products/{id}` 商品详情 | | |
| 支付回调更新订单状态 | | |
| 大促期间订单列表（可略滞后） | | |

参考答案要点（先自己做再对照）：

- `/reserve` → 偏 **CP**（防超卖，宁可失败不可不确定扣减）
- 商品详情 → 偏 **AP**（可展示旧库存，异步校准）
- 支付回调 → **幂等 + 最终一致**（跨服务，非简单 CP/AP 二选一）
- 订单列表 → 偏 **AP** + 读己之写（体验上须看到自己刚下的单）

## 练习 2：读写分离时序

对照 `MasterReplicaInventory`：写主库后、调用 `syncReplica()` 前，读从库与主库不一致。

1. 用户在该时刻看到「有货」还是「无货」？与真实主库是否一致？
2. 列出两种缓解手段（读主、版本号、业务校验等）。

## 练习 3：fencing 口述

用 3 句话说明：为何仅有 Redis 锁值（UUID）不够？fencing token 在存储侧应如何校验？

## 下一章

完成 [架构风格：单体、SOA 与微服务](../../index.html#ch-basics-03-architecture-styles) 前，在站点右侧完成 **basics-02 章节测验** 自检。
