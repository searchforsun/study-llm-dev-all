# Demo：实战：CorpAssist 记忆子系统

[返回章节](../../index.html#ch-practice-05-corpassist-memory)

## 目标

搭建 CorpAssist 端到端记忆子系统 API，运行多轮一致性评测，完成双栈对照实验。

## 前置准备

- Python 3.8+ 和 JDK 17+
- Redis、Milvus、PostgreSQL 实例
- 已完成 practice-01 到 practice-04 的代码

## 步骤

1. **搭建 API 端点**：实现 GET/POST /v1/session/{tenant}/{user_id}/messages 和 POST /v1/memory/{user_id}/recall。返回正确的 JSON 响应。

2. **实现评测套件**：编写 MemoryEvalSuite，运行 10 轮标准场景对话测试，输出多轮一致性指标。

3. **运行双栈对照实验**：分别用 Python 和 Java 实现同一组记忆操作任务，对比实现代码行数、执行时间和资源消耗。

4. **编写 handover 文档**：记录 API 端点、Redis key 约定、部署拓扑和 FAQ，供 RAG/Agent 课程团队使用。

## 预期输出

API 响应正确。多轮一致性 ≥ 95%。双栈对照数据展示 Python 和 Java 各自的优势。handover 文档完整。

## 验收清单

- [ ] API 端点全部实现且响应正确
- [ ] 多轮一致性 ≥ 95%
- [ ] 双栈对照数据完整
- [ ] Handover 文档包含全部必要信息
