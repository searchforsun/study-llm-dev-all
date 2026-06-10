# Demo：spring-ai-alibaba-starter-agentscope 集成

对应章节：[spring-ai-alibaba-starter-agentscope 集成](../../index.html#ch-practice-05-saa-starter)

## 前置

- JDK 17+
- Maven 3.9+
- `AI_DASHSCOPE_API_KEY`（可选，mock 模式可跳过真实模型）
- （联调）Python `agent-service` 运行于 `localhost:8081`

## 文件

| 文件 | 说明 |
|------|------|
| `AgentScopeStarterConfig.java` | AgentScopeAgent Bean 与 Graph 节点注册 |
| `GraphWorkflowSnippet.java` | SAA Graph 嵌入 AgentScope 节点片段 |
| `openapi-agent.yaml` | Agent REST 契约导出样例 |
| `PythonAgentClient.java` | WebClient 联调 Python Agent Service |
| `verify-graph.sh` / `verify-graph.ps1` | 启动后 curl 验收 |

## 快速开始

```powershell
cd demos/practice-05-saa-starter-lab
# 将片段复制到你的 Spring Boot 工程，或对照修改
.\verify-graph.ps1
```

```bash
cd demos/practice-05-saa-starter-lab
./verify-graph.sh
```

## 验收

- [ ] `curl -s http://localhost:8080/actuator/health` 返回 `UP`
- [ ] `curl -s -X POST http://localhost:8080/api/agent/run -H "Content-Type: application/json" -d '{"sessionId":"s1","message":"查工单"}'` 返回 JSON 含 `steps` 与 `traceId`
- [ ] `openapi-agent.yaml` 中 `/api/agent/run` 与章节接口表字段一致
- [ ] （可选）Python 联调：`curl -s http://localhost:8081/v1/chat/stream` 可被 `PythonAgentClient` 消费
