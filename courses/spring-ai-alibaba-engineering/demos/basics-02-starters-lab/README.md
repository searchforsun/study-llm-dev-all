# Demo：Starter 与自动配置

对应章节：[Starter 与自动配置](../../index.html#ch-basics-02-starters)

**可运行工程**：[`../corpassist-saa-workbench/`](../corpassist-saa-workbench/)

## 任务

1. 阅读 `pom.xml` 中 BOM import 与 `spring-ai-client-chat` 依赖（stub 不拉 DashScope Starter）。
2. 阅读 `pom.snippet.xml` 对照 CorpAssist 父 POM 应如何合并。
3. 用 dev Profile 启动并对比模型名：

```bash
cd ../corpassist-saa-workbench
mvn spring-boot:run -Dspring-boot.run.profiles=dev,stub
curl -s http://localhost:8080/api/dualstack/config | jq .
```

## 验收

- [ ] 能说明 stub 与 live（`-Plive`）构建差异
- [ ] `application-dev.yml` 将 model 切为 `qwen-turbo`
- [ ] 环境变量 `AI_DASHSCOPE_API_KEY` 不进 Git
