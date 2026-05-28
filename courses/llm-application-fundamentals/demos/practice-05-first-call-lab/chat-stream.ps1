# CorpAssist 流式 SSE（需 curl.exe；Windows 10+ 自带）
$ErrorActionPreference = "Stop"
$base = $env:CORPASSIST_LLM_BASE_URL
$key = $env:CORPASSIST_LLM_KEY
$model = if ($env:CORPASSIST_LLM_MODEL) { $env:CORPASSIST_LLM_MODEL } else { "qwen-plus" }
if (-not $base -or -not $key) {
  Write-Error "请设置 CORPASSIST_LLM_BASE_URL 与 CORPASSIST_LLM_KEY"
}
$uri = "$($base.TrimEnd('/'))/chat/completions"
$json = (@{
  model = $model
  stream = $true
  messages = @(@{ role = "user"; content = "用三句话介绍流式输出" })
} | ConvertTo-Json -Compress)
curl.exe -N $uri `
  -H "Authorization: Bearer $key" `
  -H "Content-Type: application/json" `
  -d $json
