# Demo：权限、审计与多租户

[章节](../../index.html#ch-advanced-01-production)

## 目标
配置行级 ACL、验证审计日志、设计多租户逻辑隔离方案。

## 文件
- `AclAdvisor.java` — Spring AI ACL Advisor
- `AuditLogger.java` — 审计日志记录
- `TenantAwareConfig.java` — 多租户配置

## 验收标准
- 不同角色（employee/manager/hr）检索返回不同结果集
- 审计日志表中有完整的问答记录（who/what/when）
- 多租户 tenant_id 过滤正确隔离数据

## 运行
```bash
# 用不同角色 token 测试
curl -H "Authorization: Bearer <employee-token>" /api/qa/ask
curl -H "Authorization: Bearer <hr-token>" /api/qa/ask
```
