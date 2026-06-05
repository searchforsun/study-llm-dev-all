# Demo：生产 Advisor — 安全与护栏

对应章节：[生产 Advisor：安全与护栏](../../index.html#ch-advanced-01-advisors-prod)

用 `injection-patterns.txt` 样例验证 NS2 输入护栏应拦截的 Prompt 注入模式。

## 步骤

1. 阅读 `injection-patterns.txt` 至少 3 条注入样例。
2. 在笔记为 S2 客服 ChatClient 列出 Advisor 顺序：InputSanitizer → … → SafeComplete。
3. 说明输出审核失败时为何不能把模型原文返回给管理员门户。

## 验收

- [ ] 能解释 InputSanitizer 为何排在 QuestionAnswerAdvisor 之前
- [ ] 能列举 2 种应 BLOCK 的注入模式（见 demo 文件）
- [ ] 完成章节测验
