# Demo：价值观与输出护栏实验室

[返回章节](../../index.html#ch-practice-02-alignment-guard)

## 目标

编写 CorpAssist 客服政策模板、实现 refusal_code 拒答逻辑，验证 POLICY_VIOLATION 与 NO_EVIDENCE 场景。

## 前置准备

- Python 3.10+
- PyYAML

## 文件

| 文件 | 说明 |
|------|------|
| `corpassist-policy-customer-service.yaml` | 政策模板 |
| `refusal_guard.py` | 拒答码与用户话术 |
| `verify_refusal.py` | 验收脚本 |

## 步骤

1. 编辑政策 YAML，增加 `must_not` 条目。
2. 实现 `refuse(code, audit_ctx)` 写入 refusal_code。
3. 对违规输出样例触发 POLICY_VIOLATION。

## 验收

```bash
python verify_refusal.py
# 期望输出：PASS: POLICY_VIOLATION handled
```

- [ ] 政策 id 版本化
- [ ] 4 类 refusal_code 有话术
- [ ] audit_ctx 含 refusal_code
- [ ] 完成章节测验
