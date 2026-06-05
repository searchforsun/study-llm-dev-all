# CorpAssist 非流式 Chat Completions（OpenAI 兼容）
$ErrorActionPreference = "Stop"
$base = $env:CORPASSIST_LLM_BASE_URL
$key = $env:CORPASSIST_LLM_KEY
$model = if ($env:CORPASSIST_LLM_MODEL) { $env:CORPASSIST_LLM_MODEL } else { "qwen-plus" }
if (-not $base -or -not $key) {
  Write-Error "请设置 CORPASSIST_LLM_BASE_URL 与 CORPASSIST_LLM_KEY（见 .env.example）"
}
$body = @{
  model = $model
  stream = $false
  messages = @(
    @{ role = "system"; content = "你是 CorpAssist 企业助手。" }
    @{ role = "user"; content = "用一句话解释 RAG。" }
  )
} | ConvertTo-Json -Depth 5
$uri = "$($base.TrimEnd('/'))/chat/completions"
Invoke-RestMethod -Uri $uri -Method Post `
  -Headers @{ Authorization = "Bearer $key"; "Content-Type" = "application/json" } `
  -Body $body
