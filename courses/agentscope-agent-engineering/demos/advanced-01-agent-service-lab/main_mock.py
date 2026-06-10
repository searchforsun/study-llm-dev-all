"""Mock Agent Service — 演示 SSE 事件流，无需 AgentScope。"""
import json
import asyncio
from fastapi import FastAPI, Header
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI(title="CorpAssist Agent Service Mock")


class ChatRequest(BaseModel):
    session_id: str
    message: str
    max_iters: int = 8


@app.post("/v1/chat/stream")
async def chat_stream(
    req: ChatRequest,
    x_tenant_id: str = Header(..., alias="X-Tenant-Id"),
    x_trace_id: str | None = Header(None, alias="X-Trace-Id"),
):
    async def generate():
        events = [
            {"event_type": "text", "payload": {"content": "正在理解您的请求…"}},
            {"event_type": "tool_call", "payload": {"tool_name": "search_policy", "arguments": {"q": req.message[:20]}}},
            {"event_type": "tool_result", "payload": {"tool_name": "search_policy", "result": "年假 15 天"}},
            {"event_type": "text", "payload": {"content": f"已处理：{req.message}"}},
        ]
        for step, ev in enumerate(events, 1):
            payload = {
                **ev,
                "session_id": req.session_id,
                "step": step,
                "trace_id": x_trace_id,
                "tenant_id": x_tenant_id,
            }
            yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"
            await asyncio.sleep(0.3)
        yield f"event: done\ndata: {json.dumps({'usage': {'prompt_tokens': 100, 'completion_tokens': 50}})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
