# Demo：权限与多租户

对应章节：[权限与多租户](../../index.html#ch-practice-02-permission)

## 目标

为 CorpAssist 财务隔离场景编写 ACL filter 表达式，验证 employee 用户无法检索 finance 文档。

## 前置

- Python 3.10+
- 已阅读正文 `acl-filter.yaml` 与 Java `similaritySearch` 片段

## 步骤

```bash
cd demos/practice-02-permission-lab
# 1. 在 acl-filter.md 填写张三/李四 claims
# 2. 编写李四访问 FIN-TAX-2026 的 Milvus expr
python validate_acl.py --tenant corp-a --role employee
python validate_acl.py --tenant corp-a --role finance
```

## 验收

| 命令 | 期望输出 |
|------|----------|
| `python validate_acl.py --tenant corp-a --role employee` | `PASS: finance doc filtered` |
| `python validate_acl.py --tenant corp-a --role finance` | `PASS: finance doc visible` |

手动验收：

- [ ] filter 含 mandatory `tenant_id`
- [ ] 混合检索两路使用相同 ACL 规则（书面说明）

## 文件

| 文件 | 用途 |
|------|------|
| `acl-filter.md` | claims 与 expr 练习 |
| `validate_acl.py` | expr 语法与场景校验 |
