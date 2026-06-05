# Demo：VectorStore 与 Embedding

对应章节：[VectorStore 与 Embedding](../../index.html#ch-practice-01-vectorstore)

用内存向量库验证 **metadata filter 下推**：HR 问「年假」命中 pol-001，FIN 过滤不得返回 HR 制度。Lab 中 `VectorStorePort` 对应生产环境的 Spring AI `VectorStore`；`SearchRequest.deptFilter` 对应 `Filter.Expression.eq("dept", dept)`。

## 步骤

1. 阅读根目录 `sample-documents.json`，记录 pol-001 / pol-002 的 `dept` metadata。
2. 打开 `src/test/java/com/corpassist/lab/vectorstore/MetadataFilterTest.java`，理解两条验收断言。
3. 对照 `PolicySearchService.searchForDept`，在笔记写出生产环境 `SearchRequest.builder().filterExpression(...)` 等价写法。
4. 说明为何 filter 必须在 VectorStore 层下推，而非 similaritySearch 后 Java stream 过滤。

## 验收命令

```bash
cd demos/practice-01-vectorstore-lab
mvn -q verify
```

## 验收

- [ ] `mvn verify` 通过（2 条 metadata filter 测试绿）
- [ ] 能解释 lab 中 `VectorStorePort` 与 Spring AI `VectorStore` 的映射
- [ ] 完成 metadata 记录与过滤预期说明
- [ ] 完成章节测验
