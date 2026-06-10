# Demo：CorpAssist Agent Service 最小 FastAPI

对应章节：[Agent Service 服务化入门](../../index.html#ch-advanced-01-agent-service)

## 前置

- Python 3.12+
- `pip install fastapi uvicorn pydantic`
- （可选）AgentScope 2.0 + DashScope Key

## 文件

| 文件 | 说明 |
|------|------|
| `main_mock.py` | Mock Agent SSE 服务（无需 AgentScope） |
| `curl-stream.sh` / `curl-stream.ps1` | 消费 SSE 流 |
| `spring-client-snippet.java` | Spring WebClient 消费片段 |
| `contract.md` | REST/SSE 契约与错误码 |

## 快速开始

```powershell
cd demos/advanced-01-agent-service-lab
pip install fastapi uvicorn
uvicorn main_mock:app --port 8080
# 另开终端
.\curl-stream.ps1
```

```bash
cd demos/advanced-01-agent-service-lab
pip install fastapi uvicorn
uvicorn main_mock:app --port 8080
./curl-stream.sh
```

## 验收

- [ ] `curl -N -X POST http://localhost:8080/v1/chat/stream -H "X-Tenant-Id: demo" -H "Content-Type: application/json" -d '{"session_id":"s1","message":"你好"}'` 可见 ≥2 条 `data:` 与 `event: done`
- [ ] `contract.md` 中 SSE payload 字段与章节表一致
- [ ] 完成章节测验
