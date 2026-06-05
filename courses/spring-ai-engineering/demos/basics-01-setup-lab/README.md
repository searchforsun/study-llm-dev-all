# Demo：项目搭建与自动配置

对应章节：[项目搭建与自动配置](../../index.html#ch-basics-01-setup)

对照 `application.yml` 与 `pom.snippet.xml`，标出 CorpAssist Spring 父工程需新增的依赖与配置项。

## 步骤

1. 打开 `application.yml`，确认 `spring.ai.openai.base-url` 与 `CORPASSIST_LLM_BASE_URL` 环境变量映射。
2. 阅读 `pom.snippet.xml`，在笔记列出父 POM 需 `import` 的 `spring-ai-bom` 与子模块 Starter。
3. 画出 `corpassist-ai-chat` / `corpassist-ai-rag` / gateway 三模块职责边界。

## 验收

- [ ] 能写出 3 个 `spring.ai.openai.*` 配置键及对应环境变量
- [ ] 能说明 ChatModel Bean 由谁自动注册、ChatClient 由谁 `@Configuration` 构建
- [ ] 完成章节测验
