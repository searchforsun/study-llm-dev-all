# 验收脚本 — 需本地 Spring Boot 已启动
$base = $env:AGENT_BASE_URL
if (-not $base) { $base = "http://localhost:8080" }
Write-Host "Health:" (Invoke-RestMethod "$base/actuator/health").status
$body = '{"sessionId":"demo-s1","message":"查询我的待办工单"}'
Invoke-RestMethod -Method Post -Uri "$base/api/agent/run" -ContentType "application/json" -Body $body
