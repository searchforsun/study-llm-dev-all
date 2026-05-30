"""SSE 流式 demo — 不调用真实 LLM"""
import asyncio
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()
SEM = asyncio.Semaphore(5)

async def gen():
    for t in ["token1", " token2", " token3"]:
        yield f"data: {t}\n\n"
        await asyncio.sleep(0.1)

@app.get("/stream")
async def stream():
    async with SEM:
        return StreamingResponse(gen(), media_type="text/event-stream")
