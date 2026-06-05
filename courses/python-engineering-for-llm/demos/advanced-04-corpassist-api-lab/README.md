# Demo：实战：CorpAssist Python 服务 API

对应章节：[实战：CorpAssist Python 服务 API](../../index.html#ch-advanced-04-corpassist-api)

## 目标

- 离线导出 OpenAPI 3.x JSON（无需启动完整服务）
- 验证 `/health` 路径与 `info.version` 字段存在

## 步骤

```powershell
pip install fastapi pydantic
cd demos/advanced-04-corpassist-api-lab
python export_openapi.py
```

生成 `openapi.demo.json` 后可用编辑器或 `jq` 查看。

## 验收

- [ ] 生成 `openapi.demo.json` 且无报错
- [ ] JSON 含 `/health` 路径与 `info.version`
- [ ] 完成章节测验
