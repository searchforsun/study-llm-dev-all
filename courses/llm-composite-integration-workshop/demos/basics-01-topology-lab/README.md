# Demo：CorpAssist 双栈拓扑

[章节](../../index.html#ch-basics-01-topology)

## 目标

画出 CorpAssist 双栈拓扑架构图，理解 Spring 治理面与 Python 能力面的职责分工。

## 操作步骤

### 1. 画双栈三层架构图

在白板或 Draw.io 上画出以下节点，标注端口和通信协议：

```
客户端（Web/IM） → Spring Gateway (8080) → Spring BFF (8081) → Python AI 服务 (8001/8002) → Milvus (19530)
```

### 2. 标注每一层的职责

| 层 | 职责 | 技术栈 |
|----|------|--------|
| 网关层 | 路由、鉴权、限流 | Spring Cloud Gateway |
| BFF 层 | 双栈桥接、会话管理、请求转发 | Spring Boot WebFlux |
| AI 层 | RAG 问答、Agent 推理、索引 | FastAPI + LangChain |
| 数据层 | 向量存储、会话缓存、业务数据 | Milvus + Redis + PostgreSQL |

### 3. 写出一次 RAG 问答的完整数据流路径

从用户发起请求到收到响应，列出所有经过的服务节点和每个节点的操作（参考章节正文的数据流图）。

## 验收标准

- [ ] 画出包含 6 个以上服务节点的拓扑图
- [ ] 明确标注 Spring/Python 的边界
- [ ] 标注所有服务间通信的端口号
- [ ] 写出一次 RAG 问答的完整数据流路径（7 个节点）

## 参考资料

- [Spring Cloud Gateway](https://docs.spring.io/spring-cloud-gateway/reference/)
- [FastAPI](https://fastapi.tiangolo.com/)
