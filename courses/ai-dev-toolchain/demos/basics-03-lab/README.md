# Demo：AI 代码异味自查表

对应章节：[AI 生成代码的质量管控](../../index.html#ch-basics-03)

## 目标

对 `sample_ai_diff.patch` 用章节「AI 代码异味」模式表做人工 + AI Review，区分 P0/P1。

## 步骤

1. 阅读 `sample_ai_diff.patch`（含 async 阻塞、臆造 env、弱测试等故意问题）
2. 填写 `review-checklist.md` 中 4 类异味是否命中
3. 用章节 Prompt 模板让 AI 输出 P0/P1（纸面粘贴到 `ai-review-output.md`）
4. 对比人工与 AI 是否一致

## 验收

- [ ] `review-checklist.md` 四项均有勾选与说明
- [ ] `ai-review-output.md` 至少 1 条 P0、1 条 P1
- [ ] 说明为何「pytest 全绿仍有问题」（若有）

## 验收命令

```bash
# 检查产物存在
test -f review-checklist.md && test -f ai-review-output.md
```
