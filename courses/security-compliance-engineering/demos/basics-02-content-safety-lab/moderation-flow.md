# CorpAssist 四层内容审核流程

## L1 — API Gateway
- 请求大小、Content-Type、基础 blocklist
- fail-closed：网关规则不可用时拒绝请求

## L2 — Spring AI Input Advisor
- InputModerationAdvisor 调用 Moderation API
- 记录 audit event_type=INPUT_MODERATION

## L3 — Python Middleware
- 与 Java 对称的 toxic / policy 检测
- 双栈共用 content-safety policy 版本号

## L4 — Output Advisor
- 输出 moderation + PII 正则（身份证/手机号）
- fail-closed：超时默认拦截并返回拒答模板
