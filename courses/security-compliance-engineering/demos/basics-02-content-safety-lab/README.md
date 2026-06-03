# Demo：内容安全检测

[章节](../../index.html#ch-basics-02-content-safety)

## 目标

配置四层内容审核规则（文档型 lab）。

## 步骤

1. 阅读 `moderation-flow.md`，对照正文四层审核表补全 L1–L4 职责。
2. 列出输入/输出 moderation 各 3 条规则（关键词或 API 策略）。

## 验收命令

```bash
grep -c "L[1-4]" moderation-flow.md
# 期望：≥ 4
```

## 验收标准

- [ ] moderation-flow.md 覆盖四层审核
- [ ] 输入与输出规则各 ≥ 3 条
