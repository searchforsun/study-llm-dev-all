# Demo：毕业项目：全栈集成

[章节](../../index.html#ch-advanced-04-capstone)

## 目标

按演示脚本完成一次端到端彩排，记录演示指标。

## 演示清单

- [ ] docker compose up（启动 10 个服务）
- [ ] S1 RAG 问答（索引文档 → 提问验证）
- [ ] S2 Agent SSE（流式推理 → 工具调用）
- [ ] 转人工（触发 handoff 信号）
- [ ] 灰度切换（50% 流量走新管线）
- [ ] Trace 排障（按 trace_id 查日志）
- [ ] 指标展示（对比基线数据）

## 记录指标

| 指标 | 基线 | 演示值 |
|------|------|--------|
| RAG P95 延迟 | < 5s | |
| Agent 完成率 | > 85% | |
| 接口错误率 | < 1% | |
| 启动时间 | < 15 分钟 | |

## 验收标准

- [ ] 按 demo script 完成一次完整彩排
- [ ] 记录了与基线的对比指标
- [ ] 演示清单全部勾选完成

## 参考资料

- [Docker Compose](https://docs.docker.com/compose/)
- [Spring Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
