# Demo：DashScope/百炼接入

对应章节：[DashScope/百炼接入](../../index.html#ch-basics-01-dashscope)

## 目标
配置 DashScope API Key，完成第一次流式聊天调用。

## 前置条件
- Java 17+ / Spring Boot 3.4+
- DashScope API Key（[控制台申请](https://dashscope.aliyun.com/)）
- Maven/Gradle

## 操作步骤
1. 环境变量注入 `DASHSCOPE_API_KEY`
2. 创建 Spring Boot 项目，添加 `spring-ai-alibaba-starter-dashscope` 依赖
3. 编写 `application.yml` 配置 DashScope（model: qwen-plus）
4. 注入 `ChatModel` Bean，实现 `/chat` 接口
5. 改为 `StreamingChatModel` 流式版本

## 验收
```bash
curl -X POST http://localhost:8080/chat -d "你好"
# 应返回流式 SSE 响应
```

## 练习
列出 3 个应放环境变量而非硬编码的密钥项。
