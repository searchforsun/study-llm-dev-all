# Demo：生产 QPS 与缓存分层

对应章节：[生产 QPS 与缓存分层](../../index.html#ch-advanced-06-qps)

## 目标
优化 Agent 服务 QPS。

## 操作步骤
1. 配置 HTTP 连接池 max-connections=500
2. 启用虚拟线程
3. 实现三层缓存（Caffeine L1 + 语义 L2 + 结果 L3）
4. 用 wrk/jmeter 压测验证 QPS 提升

## 验收
压测后 QPS 提升至少 50%。

## 练习
写 1 条非基础设施层面的 QPS 优化措施并说明预期效果。
