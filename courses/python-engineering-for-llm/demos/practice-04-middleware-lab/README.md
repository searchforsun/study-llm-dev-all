# Demo：中间件、鉴权与 CORS

对应章节：[中间件、鉴权与 CORS](../../index.html#ch-practice-04-middleware)

## 目标

- 演示 RequestId 中间件：读取或生成 `X-Request-Id` 并回写响应头
- 用 curl 验证 header 透传行为

## 步骤

```powershell
pip install fastapi uvicorn
cd demos/practice-04-middleware-lab
uvicorn middleware_demo:app --reload
```

另开终端：

```powershell
curl -i -H "X-Request-Id: abc-demo" http://127.0.0.1:8000/ping
```

## 验收

- [ ] 响应头含 `X-Request-Id: abc-demo`
- [ ] 未传 header 时服务自动生成 UUID 并回写
- [ ] 完成章节测验
