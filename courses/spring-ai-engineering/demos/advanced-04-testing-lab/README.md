# Demo：测试与本地替身

对应章节：[测试与本地替身](../../index.html#ch-advanced-04-testing)

用 `@MockBean` 替身跑通 CorpAssist RAG API 的 MockMvc 测试，CI 零密钥。

## 步骤

1. 阅读 `src/test/java/com/corpassist/lab/testing/MockChatModelTest.java`：`ChatModelPort` 对应生产环境的 Spring AI `ChatModel`。
2. 对照 `RagQueryService`，理解为何 Mock 模型层而非 Controller。
3. 在笔记列出 3 条应自动化测试的用例（空检索、注入拦截、降级响应）及各自用 MockBean 还是 Testcontainers。

## 验收命令

```bash
cd demos/advanced-04-testing-lab
mvn -q verify
```

## 验收

- [ ] `mvn verify` 通过（2 条 MockMvc 测试绿）
- [ ] 能解释 lab 中 `ChatModelPort` 与 Spring AI `ChatModel` 的映射
- [ ] 完成章节测验
