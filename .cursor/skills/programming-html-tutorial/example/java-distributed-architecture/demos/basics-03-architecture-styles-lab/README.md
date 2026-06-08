# 架构形态与团队拓扑实验室

对应章节：[架构风格：单体、SOA 与微服务](../../index.html#ch-basics-03-architecture-styles)

本章含**纸面练习** + **可运行代码** `modular-monolith-lab/`（多模块 Maven + ArchUnit 边界测试）。

## 可运行 Demo

```bash
cd modular-monolith-lab
mvn -q verify                              # ArchUnit + 编译
mvn -q -pl shopflow-app exec:java          # 单进程下单演示
```

**验收**：`inventoryMustNotDependOnOrderDomain` 通过；`ShopFlowApp` 输出 `placeOrder=true`。

## 目标

- 区分分层单体与模块化单体的模块依赖规则
- 用康威定律检查服务边界是否与团队对齐
- 在「立即拆微服务」与「模块化单体」之间做有依据的选择

## 练习 1：模块化单体依赖图

工程结构：

```text
modular-monolith-lab/
  shopflow-order      → 依赖 shopflow-inventory（仅 InventoryFacade）
  shopflow-inventory  → 禁止依赖 order.domain
  shopflow-payment    → 独立占位
  shopflow-app        → 启动器
  shopflow-arch-tests → ArchUnit 规则
```

用箭头标出**允许**的依赖，并对照 `ModularMonolithArchitectureTest` 中的禁止规则。

## 练习 2：团队拓扑对照

| 上下文 | 理想负责团队 | 当前是否独立小队？ | 是否适合独立部署？ |
|--------|--------------|--------------------|------------------|
| Order | | | |
| Inventory | | | |
| Payment | | | |

若三行「独立小队」均为否，写下你推荐的架构形态（单体 / 模块化单体 / 微服务）与一句理由。

## 练习 3：拆分决策（判断）

场景：7 人团队、日订单约 200、领域模型每周大改。

- 方案 A：立即拆 5 个微服务
- 方案 B：模块化单体 + ArchUnit 约束

先独立完成章节「判断练习」，再对照正文决策表。

## 下一章

完成站点右侧 **basics-03 章节测验** 后，继续 [领域建模、边界上下文与 API 契约](../../index.html#ch-basics-04-domain-api)。
