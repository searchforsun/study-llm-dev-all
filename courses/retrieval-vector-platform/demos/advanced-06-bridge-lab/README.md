# Demo：与 Spring VectorStore 对齐实验

**章节**：[../../index.html#ch-advanced-06-bridge]与 Spring VectorStore 对齐

## 目标

设计 Contract 字段映射表，实现 Integration Test 验证双栈一致性，运行 Dual Read 对比。

## 实验内容

1. **Contract 映射表**：画出 Python Collection 字段 → Milvus 字段 → Spring DTO 字段的三栏映射表。
2. **Integration Test**：写 Spring Boot 测试，验证 collection schema 包含预期的 6 个字段（id, embedding, chunk_text, source, tenant_id, dept）。
3. **Dual Read 对比**：用同一 query 向量分别在 Python 和 Java 中搜索，对比 top-5 的 id 列表。
4. **字段对齐检查**：列出 3 个必须对齐的 metadata 字段（如 source、tenant_id、dept），说明对齐要求。

## 验收标准

- 字段映射表三栏对齐，字段名完全一致。
- Integration Test 断言通过（6 字段验证）。
- Dual Read 对比结果至少有 4/5 的 id 一致。
- 3 个 metadata 字段的对齐要求具体可执行。

## 延伸

故意引入一个 field 名不一致（如把 chunk_text 写成 content），观察 Integration Test 失败。
