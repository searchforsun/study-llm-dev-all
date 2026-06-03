# Demo：Embedding 与 Rerank（百炼）

对应章节：[Embedding 与 Rerank](../../index.html#ch-basics-05-embedding-rerank)

**可运行工程**：[`../corpassist-saa-workbench/`](../corpassist-saa-workbench/)（stub 模式无需 Key）

## 文件

| 文件 | 用途 |
|------|------|
| `embedding-rerank.yaml` | DashScope Embedding + pgvector + Rerank 参数模板 |
| `policy-chunk-metadata.json` | 制度库 chunk metadata 样例 |

## 运行

```bash
cd ../corpassist-saa-workbench
# stub 模式验证配置加载
mvn spring-boot:run -Dspring-boot.run.profiles=stub
```

对照 [`../spring-ai-engineering`](../../spring-ai-engineering/index.html#ch-practice-01-vectorstore) 的 VectorStore 章，补全百炼特有项（模型名、Rerank topN）。

## 验收

- [ ] `embedding-rerank.yaml` 中 `dimensions` 与 embedding 模型一致
- [ ] 能口述「Top-20 向量 → Top-5 Rerank」两阶段
- [ ] `policy-chunk-metadata.json` 含 tenant、version、effective_date、acl_roles
- [ ] 说明离线索引（Python）与在线检索（Java）分工
