# Demo：首次打通模型调用

对应章节：[实战：首次打通模型调用](../../index.html#ch-practice-05-handson-first-call)

## 前置

- **OpenAI 兼容** 端点（通义 compatible-mode、DeepSeek、或公司 llm-gateway）
- 环境变量：`CORPASSIST_LLM_KEY`、`CORPASSIST_LLM_BASE_URL`、`CORPASSIST_LLM_MODEL`（见 `.env.example`）
- Python 3.10+（可选）：`pip install -r requirements.txt`

## 文件

| 文件 | 说明 |
|------|------|
| `.env.example` | 环境变量模板 |
| `chat-non-stream.sh` / `.ps1` | 非流式 curl / Invoke-RestMethod |
| `chat-stream.sh` / `.ps1` | 流式 SSE |
| `ask_httpx.py` | httpx 最小客户端（支持 `--stream`） |
| `ask_openai_sdk.py` | OpenAI SDK（`base_url` 指向网关） |
| `application.example.yml` | Spring AI 配置样例 |
| `dual-stack-compare.md` | curl / Python / Spring AI 对照表 |

## 快速开始（PowerShell）

```powershell
cd demos/practice-05-first-call-lab
Copy-Item .env.example .env
# 编辑 .env 填入真实 KEY 与 BASE_URL
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
  }
}
.\chat-non-stream.ps1
.\chat-stream.ps1
pip install -r requirements.txt
python ask_httpx.py "年假最多几天"
python ask_openai_sdk.py
```

## Bash

```bash
cd demos/practice-05-first-call-lab
cp .env.example .env
# 编辑 .env 后 source（或 export 各变量）
set -a && source .env && set +a
./chat-non-stream.sh
./chat-stream.sh
pip install -r requirements.txt
python ask_httpx.py "用一句话解释 RAG"
python ask_httpx.py --stream "用三句话介绍流式"
```

## 练习

1. 非流式 curl 与 Python 各跑通一次，记录 `usage.prompt_tokens` / `completion_tokens`。
2. 流式观察 `data:` 行与 `[DONE]`。
3. 填写 `dual-stack-compare.md` 三列配置项（base_url、key、model、超时）。
4. （可选）将 `application.example.yml` 合并进 Spring Boot 项目，访问冒烟接口。

## 验收

- [ ] 非流式 curl 或 Python 返回 `choices[0].message.content`
- [ ] 流式见过至少 3 个 SSE chunk 与 `[DONE]`
- [ ] `dual-stack-compare.md` 三行场景已填
- [ ] 完成章节测验
