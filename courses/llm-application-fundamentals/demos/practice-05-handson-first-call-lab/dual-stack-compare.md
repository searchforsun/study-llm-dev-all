# CorpAssist 双栈对照表（首次打通）

填写你本机实际值；三端应一致，否则优先排查 **base_url** 与 **api-key**。

| 配置项 | curl / 环境变量 | Python | Spring AI |
|--------|-----------------|--------|-----------|
| Base URL | `CORPASSIST_LLM_BASE_URL` | 同左 / `OpenAI(base_url=...)` | `spring.ai.openai.base-url` |
| API Key | `CORPASSIST_LLM_KEY` | 同左 / `api_key=` | `spring.ai.openai.api-key` |
| Model | `CORPASSIST_LLM_MODEL` | `model=` 字段 | `spring.ai.openai.chat.options.model` |
| 读超时 | — | `httpx.Timeout(60, connect=5)` | `spring.ai.openai.*` / RestClient 超时 |
| 非流式 | `"stream": false` | `stream=False` | `.call().content()` |
| 流式 | `curl -N` + SSE | `--stream` / `client.stream` | `.stream().content()` |

## 场景练习（各填一行实际观察）

| 场景 | 用流式？ | 本次 prompt_tokens | 本次 completion_tokens | 备注 |
|------|----------|-------------------|------------------------|------|
| Web 客服首问 | 是 / 否 | | | |
| 夜间批处理摘要 | 是 / 否 | | | |
| 制度 RAG 单轮 | 是 / 否 | | | |

## 联调记录

- 非流式首次成功时间：
- 流式是否见到 `[DONE]`：
- 401/429 若出现，处理动作：
