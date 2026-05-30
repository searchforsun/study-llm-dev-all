# Demo：FastAPI 路由与健康检查

对应章节：[FastAPI 路由与依赖注入](../../index.html#ch-practice-01-fastapi-intro)

## 运行

```powershell
cd demos/practice-01-fastapi-intro-lab
pip install fastapi uvicorn pydantic
uvicorn main:app --reload --port 8000
```

浏览器打开 http://127.0.0.1:8000/docs 试调接口。

## 验收

- [ ] `/health` 返回 200
- [ ] OpenAPI 文档可见 `RagQueryRequest` 字段约束
- [ ] 完成章节测验
