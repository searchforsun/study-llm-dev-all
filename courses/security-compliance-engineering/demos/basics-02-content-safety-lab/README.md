# Demo：内容安全检测

[章节](../../index.html#ch-basics-02-content-safety)

## 目标
实现输入输出双向审核与双栈 Advisor 配置。

## 步骤
1. 实现 Spring AI InputModerationAdvisor
2. 实现 Python ContentSafetyMiddleware 的 check_input 方法
3. 配置输出审核规则：识别身份证和手机号

## 验收标准
- [ ] moderation-rules.yaml 含 4 层审核规则
- [ ] Input Advisor 拦截注入关键词
- [ ] Output Advisor 拦截敏感信息
