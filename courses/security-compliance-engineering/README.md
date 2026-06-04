# 安全与合规工程

共用轨横切能力课：LLM 应用威胁模型、内容安全、注入防护、PII 脱敏、工具权限、价值观护栏、审计溯源、红队演练与 CorpAssist 安全基线。Python（LangChain/NeMo Guardrails）与 Java（Spring AI Advisor）双栈对照。

## 启动

```bash
cd courses
npx serve .
# 打开 http://localhost:3000/security-compliance-engineering/
```

## 大纲（13 章 · 3 阶段）

| 阶段 | 章节 |
|------|------|
| 威胁与模型 | 威胁模型 · 内容安全 · 注入越狱 · 隐私脱敏 |
| 控制措施 | 工具权限 · 价值观护栏 · 审计溯源 · 红队演练 · CorpAssist 安全基线 |
| 合规交付 | 行业合规 · 策略即代码 · 第三方出境 · 面试案例 |

## 前置

- 《大模型应用基础》
- 《生产级 Prompt 与对话工程》

## 维护

源文件：`chapters/*.html`、`welcome.partial.html`、`quiz.partial.html` → assemble → `index.html`（勿手改正文）

```bash
node .cursor/skills/programming-html-tutorial/scripts/assemble-index.mjs --dir courses/security-compliance-engineering
```
