# Demo：Starter 与自动配置

对应章节：[Starter 与自动配置](../../index.html#ch-basics-02-starters)

## 目标
配置多环境 Profile，验证 SAA Starter 自动装配。

## 操作步骤
1. 在 `dependencyManagement` 中添加 `spring-ai-alibaba-bom`
2. 配置 `application-dev.yml`（qwen-turbo）和 `application-prod.yml`（qwen-max）
3. 通过 `--debug` 启动查看 Condition 匹配日志
4. 切换 Profile 验证模型变更

## 验收
- Dev/Prod 使用不同模型和 API Key
- ChatModel Bean 自动注入成功

## 练习
对照 Spring AI 官方 Starter，写出 SAA Starter 的差异（至少 2 点）。
