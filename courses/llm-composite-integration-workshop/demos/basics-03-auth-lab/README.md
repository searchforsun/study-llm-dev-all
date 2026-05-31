# Demo：统一鉴权

[章节](../../index.html#ch-basics-03-auth)

## 目标

实现 Spring Gateway 的 JWT 校验与 Header 注入，让 Python 服务从可信 Header 读取用户上下文。

## 操作步骤

### 1. Python 服务必须读取的 3 个 Header

| Header | 来源 | 说明 |
|--------|------|------|
| `X-User-Id` | Gateway 从 JWT sub 注入 | 用户唯一标识 |
| `X-Tenant-Id` | Gateway 从 JWT tenant_id 注入 | 企业租户标识 |
| `X-Request-Id` | Gateway 生成 | 全链路追踪 ID |

### 2. 实现 Spring Gateway JWT 过滤器

编写 `JwtAuthFilter` 实现 `GlobalFilter`，完成：
- 从 Authorization Header 提取 JWT
- 调用 ReactiveJwtDecoder 校验令牌
- 注入 X-User-Id / X-Tenant-Id / X-Request-Id

### 3. 实现 Python Header 读取

编写 FastAPI 的 Depends 函数，从 Header 读取用户上下文。

## 验收标准

- [ ] 写出 Python 服务必须读取的 3 个可信 Header 及其业务含义
- [ ] 实现 Gateway 的 JWT 校验过滤器代码
- [ ] 实现 Python 的 Header 读取依赖注入代码

## 参考资料

- [Spring Security JWT](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html)
- [FastAPI Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
