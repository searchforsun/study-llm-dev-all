# CorpAssist 流式 SSE（curl 更直观；此处用 curl 若已安装）
$ErrorActionPreference = "Stop"
$base = $env:CORPASSIST_LLM_BASE_URL
$key = $env:CORPASSIST_LLM_KEY
$model = if ($env:CORPASSIST_LLM_MODEL) { $env:CORPASSIST_LLM_MODEL } else { "qwen-plus" }
if (-not $base -or -not $key) {
  Write-Error "请设置 CORPASSIST_LLM_BASE_URL 与 CORPASSIST_LLM_KEY"
}
$json = (@{
  model = $model
  stream = $true
  messages = @(
    @{ role = "user"; content = "用三句话介绍 CorpAssist 知识库模块。" }
  )
} | ConvertTo-Json -Compress)
$uri = "$base.TrimEnd('/')/chat/completions"
if (Get-Command curl -ErrorAction SilentlyContinue) {
  curl.exe -N $uri `
    -H "Authorization: Bearer $key" `
    -H "Content-Type: application/json" `
    -d $json
} else {
  Write-Host "未找到 curl，请安装 curl 或使用 chat-non-stream.ps1"
}
