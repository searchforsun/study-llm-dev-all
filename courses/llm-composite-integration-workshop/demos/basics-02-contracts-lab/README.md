# Demo：OpenAPI 与契约

[章节](../../index.html#ch-basics-02-contracts)

## 目标

编写 CorpAssist 的 OpenAPI 3.1 规范文件，定义至少 2 个统一错误码。

## 操作步骤

### 1. 编写 OpenAPI 规范文件

在 `openapi/` 目录下创建 `corpassist-ai-v2.yaml`，包含：

- RAG Query API 的 POST 请求定义（请求体/响应体 Schema）
- 统一错误响应（ProblemDetail）
- 至少 2 个必含错误码

### 2. 必含错误码

| 错误码 | HTTP 状态码 | 含义 |
|--------|------------|------|
| `INVALID_QUERY` | 400 | 查询参数非法 |
| `RATE_LIMITED` | 429 | 请求频率超限 |
| `VECTOR_INDEX_EMPTY` | 422 | 向量索引为空 |
| `LLM_TIMEOUT` | 504 | LLM 调用超时 |

### 3. 验证契约

```bash
# 使用 redocly 验证
npx @redocly/cli lint openapi/corpassist-ai-v2.yaml
```

## 验收标准

- [ ] 编写完成 OpenAPI 3.1 YAML 文件
- [ ] 定义了至少 2 个业务错误码
- [ ] 使用 OpenAPI 验证工具通过校验

## 参考资料

- [OpenAPI 3.1 Specification](https://swagger.io/specification/)
- [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457)
