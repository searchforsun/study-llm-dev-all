# Demo：代码索引流水线

[章节](../../index.html#ch-practice-01-index)

## 实验目标

1. 实现 Git 增量索引
2. 配置 Milvus 集合 Schema
3. 实现 ACL 过滤搜索

## 步骤一：增量索引

```python
indexer = IncrementalIndexer("/path/to/repo", chunk_indexer)
stats = indexer.process_push("abc123", "def456")
print(f"变更: {stats['files_changed']} 文件, "
      f"+{stats['chunks_added']} chunks")
```

## 步骤二：Milvus 集合

创建集合的 Schema 包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| chunk_id | VarChar | 唯一标识 |
| embedding | FloatVector(768) | 向量 |
| repo_id | VarChar | 仓库 ID |
| file_path | VarChar | 文件路径 |
| language | VarChar | 语言 |
| visibility | VarChar | 权限 |

## 步骤三：ACL 搜索

```java
var manager = new MilvusCollectionManager(client);
var result = manager.searchWithACL(
    "tenant_1", queryVector, "developer", 5);
```

## 验证标准

- 增量索引只处理变更文件
- Milvus Schema 包含所有标量字段
- ACL 搜索能过滤不可见的代码
