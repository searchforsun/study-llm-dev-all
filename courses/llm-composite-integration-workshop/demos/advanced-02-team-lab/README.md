# Demo：团队拓扑与交付协作

[章节](../../index.html#ch-advanced-02-team)

## 目标

设计双栈团队的资产所有权矩阵，填写 RAG 索引职责归属。

## 操作步骤

### 1. 填写资产所有权矩阵

| 资产 | 主责团队 | 协作团队 | 理由 |
|------|----------|----------|------|
| OpenAPI 契约文件 | 平台架构组 | AI 工程组 | 契约需要中立维护 |
| Spring Gateway | 平台工程组 | - | 基础设施 |
| Spring BFF | 平台工程组 | AI 工程组 | 需要 AI 接口需求 |
| Python RAG API | AI 工程组 | 平台工程组 | AI 核心资产 |
| 索引 Pipeline | AI 工程组 | - | 依赖 Python 生态 |

### 2. 填写 RAG 索引职责

> **RAG 索引 Pipeline 归 AI 工程组负责**
> 
> 理由：索引需要 Python 的文档解析生态（Unstructured）、本地嵌入模型（Sentence-Transformers）、向量化算法。这些技术栈在 AI 工程组。平台工程组运维向量库基础设施（Milvus），但索引逻辑的开发和维护由 AI 工程组完成。

### 3. 选择代码库策略

推荐 Multi-Repo 架构：契约独立仓库 + Java 仓 + Python 仓 + 部署仓。

## 验收标准

- [ ] 完成资产所有权矩阵（至少 6 行）
- [ ] 填写了 RAG 索引职责归属并说明理由

## 参考资料

- [Team Topologies](https://teamtopologies.com/)
- [Conway's Law](https://conway.me/)
