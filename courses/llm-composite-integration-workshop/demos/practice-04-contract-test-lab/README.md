# Demo：契约测试

[章节](../../index.html#ch-practice-04-contract-test)

## 目标

实现 Pact 消费者驱动契约测试，演示一次契约失败的处理流程。

## 操作步骤

### 1. Spring 端 Pact 消费者测试

编写 Pact 测试用例，定义 Spring 对 Python RAG API 的调用期望。

### 2. Python 端 Pact 提供者验证

使用 pact-python Verifier 验证 Python API 满足消费者契约。

### 3. 契约失败处理流程

当契约测试失败时：

1. CI 检测到 Pact 验证失败（如 Python 删除了 sources 字段）
2. CI Gate 阻断 PR 合并
3. 定位问题：Python 响应与 Spring 期望不一致
4. 决策：Python 恢复字段（向后兼容）或 Spring 升级 DTO
5. 修复后重新运行 Pact 验证 → 通过
6. PR 合并

### 4. 验证命令

```bash
# Newman 运行 Postman 集合
newman run postman/corpassist-ai.postman_collection.json \
  --env-var base_url=http://localhost:8001

# OpenAPI diff
npx openapi-diff openapi/v1.yaml openapi/v2.yaml
```

## 验收标准

- [ ] Spring 端 Pact 消费者测试编写并生成 Pact 文件
- [ ] Python 端 Pact 提供者验证通过
- [ ] 演示一次从「契约失败→阻断→修复→通过」的完整流程
- [ ] 列出 1 条契约失败处理流程

## 参考资料

- [Pact Docs](https://docs.pact.io/)
- [Newman CLI](https://learning.postman.com/docs/running-collections/using-newman-cli/)
