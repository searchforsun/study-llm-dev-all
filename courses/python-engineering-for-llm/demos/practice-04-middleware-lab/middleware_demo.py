from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

class ReqIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        rid = request.headers.get("X-Request-Id", "demo-id")
        resp = await call_next(request)
        resp.headers["X-Request-Id"] = rid
        return resp

app = FastAPI()
app.add_middleware(ReqIdMiddleware)

@app.get("/ping")
async def ping():
    return {"ok": True}
