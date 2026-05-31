# Demo：面试：集成架构答辩

[章节](../../index.html#ch-advanced-03-interview)

## 目标

准备 30 秒双栈架构口述稿，写出 3 个追问的回答要点。

## 操作步骤

### 1. 30 秒口述稿

> 「CorpAssist 采用 Spring + Python 双栈架构。Spring 层负责网关、鉴权、会话管理、服务编排等企业治理能力；Python 层负责 RAG 问答、Agent 推理、文档索引等 AI 能力。双栈通过 OpenAPI 3.1 契约通信，Gateway 统一 JWT 鉴权后通过可信 Header 传递用户上下文。离线任务通过 MQ 异步解耦。这个架构让我可以独立升级 AI 能力而不影响治理层。」

### 2. 三个追问回答要点

| 追问 | 回答框架 |
|------|----------|
| 为什么拆双栈？ | ① 生态差异（Python AI 库 vs Java 治理库）② 团队技能（各自擅长）③ 独立演进（AI 快速迭代，治理稳定） |
| Python 挂了怎么办？ | ① BFF 降级（缓存/提示）② Resilience4j 熔断器 ③ 多副本 + 健康检查 |
| 怎么保证接口一致？ | ① OpenAPI 唯一真相源 ② 契约优先开发 ③ Pact + openapi-diff CI 检测 |

### 3. 模拟面试

录音回答：「请设计一个企业级 LLM 问答系统」，限时 3 分钟。

## 验收标准

- [ ] 写出 30 秒双栈架构口述稿
- [ ] 准备 3 个追问的回答要点
- [ ] 完成一次模拟面试（可录音自检）

## 参考资料

- [ByteByteGo](https://bytebytego.com/)
- [System Design Interview](https://github.com/checkcheckzz/system-design-interview)
