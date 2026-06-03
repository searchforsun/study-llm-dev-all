# Demo：面试答辩 Lab

对应章节：[面试](../../index.html#ch-advanced-01-interview)

用 workbench 全 API 演示 S3 四层架构（DashScope → Starter → 治理 → 观测）。

```bash
cd ../corpassist-saa-workbench
mvn test && mvn spring-boot:run
# 按顺序调用：/api/demo/info → /api/agent/chat → /api/admin/dsl/sample → /actuator/circuitbreakers
```

## 产出

在 `interview-outline.md` 或你的笔记中写一份 **STAR** 答辩稿（纪要→Jira 场景），包含：

1. 为何选 SAA 而非纯 LangGraph
2. 一个 productionPitfall 的检测信号与修复
3. 双栈 traceparent 如何贯通

## 验收

- [ ] 5 分钟内能口述 S3 五连问中的 3 题
- [ ] `mvn test` 通过（证明工程可交付）
