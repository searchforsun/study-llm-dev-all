# Demo：AI 辅助 Code Review 与调试

对应章节：[AI 辅助 Code Review 与调试](../../index.html#ch-practice-03)

## 任务

1. 阅读 `sample.pr.diff`（含故意缺陷：空 chunk、tenant 未过滤、日志泄露 query）
2. 用章节「四段式 Bug 定位 Prompt」或 OWASP 表让 AI 产出 Review Markdown
3. 至少修复 1 条「重要」问题并补 pytest

## 验收

```bash
# 阅读 diff 后交给 AI Review，人工确认产出 ≥1 重要 + ≥2 轻微
type sample.pr.diff   # Windows
# 或 cat sample.pr.diff

pytest tests/test_service.py -q
# 期望：修复 tenant 过滤后 2 passed
```

## 样例 AI Review 输出格式

```markdown
| 等级 | 位置 | 问题 | 建议 |
|------|------|------|------|
| 高 | service.py L12 | 检索未带 tenant_id | 强制 filter |
```
