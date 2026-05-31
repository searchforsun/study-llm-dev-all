# Demo：Spring AI 问答编排

[章节](../../index.html#ch-practice-02-qa-spring)

## 目标
启动 Spring AI 服务，实现带引用溯源和流式输出的问答端点。

## 文件
- `CorpAssistApplication.java` — Spring Boot 入口
- `QAController.java` — 问答 REST 控制器
- `CustomCitationAdvisor.java` — 引用溯源 Advisor

## 验收标准
- POST `/api/qa/ask` 返回带引用溯源的答案
- GET `/api/qa/stream` 返回 SSE 流式输出
- 不同角色的 FilterExpression 过滤生效

## 运行
```bash
mvn spring-boot:run
curl -N http://localhost:8080/api/qa/stream?question=年假几天
```
