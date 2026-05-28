# Demo：网关契约速查与 curl 调用

对应章节：[API 契约与集成方式](../../index.html#ch-basics-05-api-contracts)

## 前置

- 可用的 **OpenAI 兼容** 端点（通义 compatible-mode、DeepSeek、或公司 llm-gateway）
- 环境变量：`CORPASSIST_LLM_KEY`、`CORPASSIST_LLM_BASE_URL`（见 `.env.example`）

## 文件

| 文件 | 说明 |
|------|------|
| `.env.example` | 环境变量模板 |
| `chat-non-stream.ps1` / `chat-non-stream.sh` | 非流式调用 |
| `chat-stream.ps1` / `chat-stream.sh` | 流式 SSE（`-N`） |
| `gateway-contract-template.md` | 网关契约表（场景 × stream × 超时 × 重试） |

## 快速开始（PowerShell）

```powershell
cd demos/basics-05-api-contracts-lab
Copy-Item .env.example .env
# 编辑 .env 填入真实 KEY 与 BASE_URL
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
  }
}
.\chat-non-stream.ps1
.\chat-stream.ps1
```

## 练习

1. 填写 `gateway-contract-template.md` 三行：Web 客服、夜间摘要、制度 RAG。
2. 对比流式与非流式响应体：何时出现 `usage`。
3. 模拟 429：将 `sleep` 设极短连续请求，观察是否应退避（勿压生产）。

## 验收

- [ ] 契约表三行已填，流式行注明 SSE / 关闭缓冲
- [ ] 成功跑通非流式或流式脚本之一
- [ ] 完成章节测验
