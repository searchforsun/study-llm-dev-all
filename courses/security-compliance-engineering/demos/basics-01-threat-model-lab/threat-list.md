# CorpAssist 威胁登记表

## 1. Prompt 注入
- **检测信号**：入站 Advisor 命中 injection 关键词；红队语料 bypass 告警
- **负责角色**：应用安全工程师
- **首道防线**：L2 Input ModerationAdvisor + 指令层级分隔符

## 2. 工具越权
- **检测信号**：工具调用 scope 校验失败；OPA deny 日志
- **负责角色**：平台后端负责人
- **首道防线**：工具白名单 + OAuth scope 二次鉴权

## 3. 训练/知识库数据泄露
- **检测信号**：输出 moderation 命中 PII；RAG chunk 含敏感字段
- **负责角色**：数据合规专员
- **首道防线**：RAG 源审核 + 输出脱敏 Advisor

## 4. 日志 PII 泄露
- **检测信号**：SIEM 告警明文手机号；log redaction 规则未命中
- **负责角色**：SRE / 可观测负责人
- **首道防线**：应用层 log redaction + retention 分级
