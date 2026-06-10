# Demo：Agentic RAG 实验室

对应章节：[Agentic RAG 集成](../../index.html#ch-practice-04-agentic-rag)

## 前置

- JDK 17+
- Apache Maven 3.9+
- 可选：`DASHSCOPE_API_KEY`、百炼知识库 indexName
- 前置课：[rag-system-java](../../../rag-system-java/index.html) VectorStore 配置

## 文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven 项目配置 |
| `src/main/java/com/corpassist/kb/KbAgentDemo.java` | mock/grounding 检索 + ReActAgent |
| `src/main/java/com/corpassist/kb/MockVectorStore.java` | 内置 mock 文档（无索引时） |

## 快速开始

```bash
cd courses/agentscope-agent-engineering-java/demos/practice-04-agentic-rag-lab
mvn -q compile
mvn -q exec:java -Dexec.args="年假最多几天"
mvn -q exec:java -Dexec.args="火星移民政策"
mvn -q exec:java -Dexec.args="你好"
```

## 说明

- 默认使用 MockVectorStore 演示引用格式与拒答；有 rag-system-java 索引时可替换为 Spring VectorStore Bean。
- MIN_SCORE=0.65，低相关 query 触发拒答文案。

## 验收

- [ ] 「年假最多几天」输出含 [1] 引用与参考文献块
- [ ] 「火星移民政策」触发拒答或转人工建议
- [ ] 「你好」不触发检索（dry-run 日志无 search_knowledge_base）
- [ ] 完成对应章节测验

## 延伸

[RAG 系统（Java）](../../../rag-system-java/index.html) · [Agentic RAG（Python）](../../../agentscope-agent-engineering/index.html#ch-practice-05-agentic-rag)
