# Demo：其他向量库选型实验

**章节**：[../../index.html#ch-advanced-01-qdrant-alt]其他向量库选型

## 目标

上手 Qdrant 和 Chroma 两种备选向量数据库，对比 API 差异，写出一条迁移检查项。

## 实验内容

1. **Qdrant 部署**：用 Docker 启动 Qdrant（`docker run -p 6333:6333 qdrant/qdrant`）。
2. **Qdrant CRUD**：创建 collection，批量写入 100 条含 payload 的数据，搜索 + filter。
3. **Chroma 使用**：本地创建 PersistentClient，写入数据并搜索。
4. **API 对比表**：记录三种库（Milvus/Qdrant/Chroma）在创建、写入、搜索、filter 四个操作的 API 差异。
5. **迁移检查项**：写一条从 Milvus 迁移到 Qdrant 的检查项（如「向量维度和度量类型必须一致」）。

## 验收标准

- Qdrant 搜索返回含 payload 的结果。
- Chroma 本地持久化后可重启读取。
- API 对比表覆盖 4 个操作。
- 迁移检查项具体可执行。

## 延伸

用 Spring AI VectorStore 的抽象层切换 Milvus/Qdrant/Chroma 实现。
