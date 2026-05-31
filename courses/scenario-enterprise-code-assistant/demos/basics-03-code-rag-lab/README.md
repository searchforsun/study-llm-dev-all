# Demo：AST 切片与多语言索引

[章节](../../index.html#ch-basics-03-code-rag)

## 实验目标

1. 对不同语言代码进行 AST 切片
2. 生成完整的 chunk 元数据
3. 构建多语言索引配置

## 步骤一：运行 CodeChunker

```python
chunker = CodeChunker()
for file in ["UserService.java", "utils.py", "handler.go"]:
    chunks = chunker.chunk_file(f"src/{file}")
    for c in chunks:
        m = c["metadata"]
        print(f"[{m['language']}] {m['type']}:{m['name']} "
              f"({m['start_line']}-{m['end_line']})")
```

## 步骤二：生成引用元数据

每个 chunk 输出 JSON：

```json
{
  "metadata": {
    "path": "UserService.java",
    "start_line": 15,
    "end_line": 42,
    "type": "method_declaration",
    "name": "createUser",
    "language": "java"
  }
}
```

## 步骤三：编写多语言索引配置

参考 YAML 格式编写至少支持 3 种语言的索引配置。

## 验证标准

- Java/Python/Go 各生成正确的切片
- 元数据包含全部 6 个字段
- 每个函数/类为独立 chunk
