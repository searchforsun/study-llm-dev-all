# Demo：Milvus 部署与 CRUD 实验

**章节**：[../../index.html#ch-basics-02-milvus]Milvus 部署与 CRUD

## 目标

用 Docker Compose 部署 Milvus Standalone，通过 PyMilvus 完成 Schema 设计、数据写入和向量搜索，并用 Java Spring MilvusClientV2 验证只读查询。

## 实验内容

1. **Docker Compose 启动**：编写 docker-compose.yml 包含 etcd + MinIO + Milvus 三个服务，启动后验证 `/health` 端点。
2. **Schema 设计**：用 PyMilvus 创建 `corpassist_kb` collection，包含 id、embedding(768维)、chunk_text、source、tenant_id、created_at 共 6 个字段，HNSW 索引（COSINE）。
3. **Bulk Insert**：批量写入 1000 条测试数据（随机向量），执行 flush 后用 query 验证数据可见。
4. **向量搜索**：用 ef=64 执行搜索，输出 top-5 的 id 和 score。
5. **Java 只读验证**：用 MilvusClientV2 连接同一 collection，执行同款搜索，对比结果。

## 验收标准

- `docker compose up -d` 后 `curl :9091/health` 返回 `{"status":"ok"}`。
- PyMilvus 写入 1000 条并 flush 后 Java 搜索至少能查到数据。
- Java 搜索返回的 top-5 id 列表与 Python 搜索至少有 4/5 一致。

## 延伸

测试不同 ef 值（16/64/256）对 top-5 结果的影响。
