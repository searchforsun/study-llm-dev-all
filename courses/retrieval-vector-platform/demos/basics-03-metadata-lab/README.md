# Demo：元数据过滤与多租户实验

**章节**：[../../index.html#ch-basics-03-metadata]元数据过滤与多租户

## 目标

理解 Pre-filter 和 Post-filter 的区别，写出防止跨部门检索的 filter 表达式，验证标量索引对过滤性能的影响。

## 实验内容

1. **Filter 表达式编写**：写出 `tenant_id == 1 AND dept == "HR" AND classification <= 2` 的 Milvus 兼容 filter。
2. **Pre-filter vs Post-filter 对比**：创建两个搜索脚本——一个带 filter（pre），一个搜完再过滤（post）。对比 top-5 的结果数和查询延迟。
3. **标量索引测试**：对 tenant_id 创建 INVERTED 索引前后，测试 filter 查询的延迟差异。
4. **跨部门 ACL 验证**：插入包含 HR 和 Engineering 两个部门的文档，写一条 filter 确保 HR 员工只能搜到 HR 文档。

## 验收标准

- Pre-filter 返回 5 条，Post-filter 可能不足 5 条（filter 后候选不够）。
- 标量索引后 filter 延迟降低 > 50%。
- 跨部门 filter 验证通过：HR 员工搜不到 Engineering 文档。

## 延伸

尝试将 filter 改为 OR 逻辑，观察结果数的变化。
