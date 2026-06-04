# Demo：工具调用权限实验室

[返回章节](../../index.html#ch-practice-01-tool-authz)

## 目标

为 CorpAssist 客服/售后 Agent 实现工具白名单、OAuth scope 映射与沙箱配置，验证越权工具调用被硬拒绝。

## 前置准备

- Python 3.10+
- 可选：JDK 17+ 用于 Spring AI 对照

## 文件

| 文件 | 说明 |
|------|------|
| `role-tool-matrix.yaml` | 角色-工具白名单矩阵 |
| `corpassist-tool-sandbox.yaml` | 沙箱超时、egress、脱敏配置 |
| `verify_tool_authz.py` | 验收脚本：客服角色不得调用 refund |

## 步骤

1. 填写 `role-tool-matrix.yaml` 中 `customer_service` 与 `after_sales` 工具集合。
2. 确认 OAuth scope 映射：`tools:order:read` 不含 write/admin。
3. 运行验收脚本，观察客服调用 `refund_order` 被拒绝。

## 验收

```bash
python verify_tool_authz.py
# 期望输出：PASS: cs_agent blocked refund_order
```

- [ ] 白名单矩阵与正文表一致
- [ ] 越权调用返回 403 / PermissionError
- [ ] 沙箱配置含 redact_fields
- [ ] 完成章节测验
