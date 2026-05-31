# Demo：RAG 服务拆分实战

[章节](../../index.html#ch-practice-01-rag-split)

## 目标

实现 Python 索引管线 + Spring 问答编排的完整 RAG 分离架构。

## 操作步骤

### 1. 实现 Python 索引管线

```python
# 文档解析 → 分块 → 向量化 → 写入 Milvus
loader = UnstructuredFileLoader(file_path)
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = text_splitter.split_documents(documents)
vector_store = Milvus(embedding_function=embeddings, collection_name=f"kb_{kb_id}")
vector_store.add_documents(chunks)
```

### 2. 实现 Spring 问答编排

```java
List<Document> docs = vectorStore.similaritySearch(
    SearchRequest.query(query).withTopK(topK)
        .withFilterExpression("tenant_id == '" + tenantId + "'"));
String answer = chatClient.prompt()
    .user(u -> u.text("问题: {query}\n上下文: {context}")
        .param("query", query).param("context", context))
    .call().content();
```

### 3. 验证 rag-split-checklist

- [ ] 索引管线完整实现（解析→分块→向量化→写入）
- [ ] 问答编排实现（检索→组装→生成）
- [ ] 租户隔离生效（不同租户数据不交叉）
- [ ] 索引完成后可通过 BFF 查询到结果

## 验收标准

- [ ] 全部 rag-split-checklist 项勾选完成
- [ ] 索引→问答全流程验证通过

## 参考资料

- [Spring AI Milvus](https://docs.spring.io/spring-ai/reference/api/vectordbs/milvus.html)
- [LangChain Document Loaders](https://python.langchain.com/docs/modules/data_connection/document_loaders/)
