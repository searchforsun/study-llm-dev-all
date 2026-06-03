# CorpAssist Spring AI Alibaba Workbench

本目录为课程 **9 个 Demo Lab 的统一可运行工程**：默认 **stub 模式**（无需 API Key），设置百炼 Key 后可切换 **live** 联调。

## 环境

- JDK 17+
- Maven 3.9+
- （可选）百炼 RAM 子账号 `AI_DASHSCOPE_API_KEY`

## 快速验收（离线）

```bash
cd demos/corpassist-saa-workbench
mvn -q test
# 期望：BUILD SUCCESS，≥6 个测试通过

mvn -q spring-boot:run
# 另开终端：
curl -s http://localhost:8080/api/demo/info
curl -s -X POST http://localhost:8080/api/agent/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"CorpAssist S3：查询年假政策摘要\"}"
```

## 百炼联调（live）

构建须加 **`-Plive`** 以引入 `spring-ai-alibaba-starter-dashscope`：

```bash
# Windows PowerShell
$env:AI_DASHSCOPE_API_KEY="sk-xxx"
.\scripts\run-live.ps1

# macOS/Linux
export AI_DASHSCOPE_API_KEY=sk-xxx
mvn spring-boot:run -Plive -Dspring-boot.run.profiles=live
```

## API 一览

| 能力 | 方法 | 路径 |
|------|------|------|
| 对话（阻塞） | POST | `/api/agent/chat` |
| 流式 SSE | POST | `/api/agent/chat/stream` |
| Admin DSL 样例 | GET | `/api/admin/dsl/sample` |
| 文档解析 stub | POST | `/api/extensions/parse` |
| 双栈配置对照 | GET | `/api/dualstack/config` |
| 异步任务（削峰示意） | POST | `/api/qps/tasks` |
| Trace 上下文 | GET | `/api/obs/trace-context` |
| Demo 元信息 | GET | `/api/demo/info` |

响应头含 `X-Trace-Id`；日志 pattern 含 `traceId`、`tenantId`。

## 与各 Lab 对应

| Lab 目录 | 本章验收 |
|----------|----------|
| `basics-01-dashscope-lab` | `/api/agent/chat` + `/chat/stream` |
| `basics-02-starters-lab` | `application-dev.yml` 多环境 + `pom.xml` |
| `basics-03-extensions-lab` | `POST /api/extensions/parse` |
| `basics-04-vs-python-lab` | `GET /api/dualstack/config` + `scripts/dualstack_probe.py` |
| `practice-01-admin-lab` | `GET /api/admin/dsl/sample` |
| `practice-02-resilience-lab` | `application.yml` 中 resilience4j + 熔断健康指标 |
| `practice-03-obs-lab` | `X-Trace-Id` + `/api/obs/trace-context` |
| `practice-04-qps-lab` | `POST /api/qps/tasks` 异步受理 |
| `advanced-01-interview-lab` | 用本工程 API 演示 S3 四层架构答辩 |

## 脚本

- `scripts/run-stub.ps1` / `run-stub.sh` — 离线启动
- `scripts/run-live.ps1` / `run-live.sh` — 百炼联调（需 Key）
- `scripts/smoke-test.ps1` / `smoke-test.sh` — 启动后冒烟
