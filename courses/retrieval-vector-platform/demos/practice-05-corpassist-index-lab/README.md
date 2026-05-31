# Demo：CorpAssist 索引工程实验

**章节**：[../../index.html#ch-practice-05-corpassist-index]CorpAssist 索引工程实战

## 目标

完成全量索引构建 Job、CDC 增量更新和 Alias 版本切换，编写标准的 index-runbook.md。

## 实验内容

1. **全量索引 Job**：编写 Python 脚本从模拟数据源读取文档 → chunk → embed → 写入 Milvus，batch=1000。
2. **CDC 增量处理**：模拟文档新增/更新/删除事件，实时 upsert 到 Milvus。
3. **Alias 切换**：创建 v1 和 v2 两个 collection，用 `utility.create_alias` 切换别名指向 v2。
4. **Index Runbook**：编写 `index-runbook.md`，包含全量构建步骤、增量监控、版本切换和回滚操作。
5. **Spring 只读验证**：用 Java 服务搜索验证索引切换后数据可查。

## 验收标准

- 全量 Job 成功写入 ≥ 100 条数据到 Milvus。
- CDC 增量处理 insert/delete 后 query 验证数据变更。
- Alias 切换后搜索请求自动路由到新 collection。
- index-runbook.md 勾选了所有关键检查项。

## 延伸

测试 Alias 切换期间搜索请求是否有中断（期望零中断）。
