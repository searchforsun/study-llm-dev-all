# Demo：asyncio 与并发

对应章节：[asyncio 与并发](../../index.html#ch-practice-02-async-io)

## 目标

- 用 FastAPI + StreamingResponse 演示 SSE 流式输出
- 理解 async 路由与 httpx AsyncClient 的配合方式

## 步骤

```powershell
pip install fastapi uvicorn
cd demos/practice-02-async-io-lab
uvicorn stream_demo:app --reload
```

浏览器访问 `http://127.0.0.1:8000/stream`，观察逐 chunk 返回的文本流。

## 验收

- [ ] 服务启动无报错
- [ ] `/stream` 返回 `text/event-stream` 且内容逐段输出
- [ ] 完成章节测验
