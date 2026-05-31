# Demo：规模与分片实验

**章节**：[../../index.html#ch-advanced-02-scale]规模与分片

## 目标

创建多分片 collection 并验证 tenant 路由，估算 500 万向量的资源需求。

## 实验内容

1. **分片 Collection**：创建 `corpassist_kb_sharded` collection，`num_shards=4`，以 tenant_id 为 partition_key。
2. **按 tenant 写入**：写入多个 tenant 的测试数据，验证各分片数据均匀分布。
3. **路由验证**：搜索时通过 filter 限定 tenant_id，观察查询只命中对应分片。
4. **容量估算**：填写 `capacity-plan.md`，估算 500 万 768 维向量的存储需求（向量数据、HNSW 索引、元数据分别计算）。

## 验收标准

- 4 分片创建成功，写入后各分片数据量大致均匀。
- 容量估算表填写完整。
- 能回答「500 万向量需几分片」及简要理由。

## 延伸

创建 2 副本的 Resource Group，对比单副本和双副本的 QPS 差异。
