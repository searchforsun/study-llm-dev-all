# Demo：Mock LLM 客户端

对应章节：[常用库与 HTTP 客户端](../../index.html#ch-basics-03-core-libs)

## 目标

- 用 httpx MockTransport + Pydantic 模拟 Chat Completions
- 打印 usage 字段供成本估算对照

## 依赖

仅需标准库 + 本机已安装的 `httpx`、`pydantic`（或通过 uv sync 安装 basics-01 demo 的 pyproject）。

```powershell
pip install httpx pydantic
cd demos/basics-03-core-libs-lab
python mock_llm_client.py
```

## 验收

- [ ] 无真实网络请求
- [ ] 输出 mock 回复与 usage
- [ ] 完成章节测验
